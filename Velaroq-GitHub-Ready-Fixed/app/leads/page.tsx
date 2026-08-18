'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AppNav from '@/components/AppNav'
import { createClient } from '@/lib/supabase/client'
import type { Currency, Lead, LeadStatus } from '@/lib/types'

const statuses:LeadStatus[]=['Ny','Kontaktet','Møte','Tilbud','Vunnet','Tapt']
const currencies:Currency[]=['USD','EUR','GBP','NOK']

export default function LeadsPage(){
  const router=useRouter()
  const [leads,setLeads]=useState<Lead[]>([])
  const [loading,setLoading]=useState(true)
  const [name,setName]=useState('')
  const [company,setCompany]=useState('')
  const [email,setEmail]=useState('')
  const [value,setValue]=useState('0')
  const [currency,setCurrency]=useState<Currency>('USD')
  const [ai,setAi]=useState('')
  const [aiLead,setAiLead]=useState<Lead|null>(null)

  useEffect(()=>{void load()},[])

  async function load(){
    const supabase=createClient()
    const {data:{user}}=await supabase.auth.getUser()
    if(!user){router.push('/login');return}
    const {data,error}=await supabase.from('leads').select('*').order('created_at',{ascending:false})
    if(!error)setLeads((data||[]) as Lead[])
    setLoading(false)
  }

  async function addLead(e:React.FormEvent){
    e.preventDefault()
    const supabase=createClient()
    const {error}=await supabase.from('leads').insert({
      name,company,email:email||null,value:Number(value||0),currency,status:'Ny'
    })
    if(!error){setName('');setCompany('');setEmail('');setValue('0');await load()}
    else alert(error.message)
  }

  async function changeStatus(id:number,status:LeadStatus){
    const supabase=createClient()
    const {error}=await supabase.from('leads').update({status}).eq('id',id)
    if(!error)await load(); else alert(error.message)
  }

  async function remove(id:number){
    if(!confirm('Delete this lead?')) return
    const supabase=createClient()
    const {error}=await supabase.from('leads').delete().eq('id',id)
    if(!error)await load(); else alert(error.message)
  }

  async function generate(lead:Lead){
    setAiLead(lead);setAi('Generating...')
    const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
      name:lead.name,company:lead.company,status:lead.status,notes:lead.notes
    })})
    const data=await res.json()
    setAi(data.message||data.error||'Could not generate message.')
  }

  return <main className="wrap">
    <AppNav/>
    <h1>Leads</h1>

    <div className="card">
      <h2>Add lead</h2>
      <form onSubmit={addLead}>
        <div className="grid">
          <div><label>Name</label><input className="input" required value={name} onChange={e=>setName(e.target.value)}/></div>
          <div><label>Company</label><input className="input" required value={company} onChange={e=>setCompany(e.target.value)}/></div>
          <div><label>Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div><label>Value</label><input className="input" type="number" min="0" value={value} onChange={e=>setValue(e.target.value)}/></div>
          <div><label>Currency</label><select className="select" value={currency} onChange={e=>setCurrency(e.target.value as Currency)}>{currencies.map(c=><option key={c}>{c}</option>)}</select></div>
        </div>
        <button className="btn">Add lead</button>
      </form>
    </div>

    <div className="card">
      {loading ? 'Loading...' : leads.length===0 ? <p className="muted">No leads yet.</p> :
      <table>
        <thead><tr><th>Lead</th><th>Status</th><th>Value</th><th>Actions</th></tr></thead>
        <tbody>{leads.map(lead=><tr key={lead.id}>
          <td><strong>{lead.name}</strong><div className="muted">{lead.company}</div><div className="muted">{lead.email||''}</div></td>
          <td><select className="select" value={lead.status} onChange={e=>changeStatus(lead.id,e.target.value as LeadStatus)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></td>
          <td>{Number(lead.value).toLocaleString()} {lead.currency}</td>
          <td><div className="row"><button className="btn" onClick={()=>generate(lead)}>AI follow-up</button><button className="btn danger" onClick={()=>remove(lead.id)}>Delete</button></div></td>
        </tr>)}</tbody>
      </table>}
    </div>

    {aiLead && <div className="card">
      <h2>AI follow-up for {aiLead.name}</h2>
      <textarea className="textarea" value={ai} onChange={e=>setAi(e.target.value)}/>
      <p className="muted">Review and edit every generated message before sending.</p>
    </div>}
  </main>
}
