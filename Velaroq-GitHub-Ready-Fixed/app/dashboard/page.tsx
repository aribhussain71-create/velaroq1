'use client'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import AppNav from '@/components/AppNav'
import { createClient } from '@/lib/supabase/client'
import type { Lead } from '@/lib/types'

export default function DashboardPage() {
  const router=useRouter()
  const [leads,setLeads]=useState<Lead[]>([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{void load()},[])
  async function load(){
    const supabase=createClient()
    const {data:{user}}=await supabase.auth.getUser()
    if(!user){router.push('/login');return}
    const {data}=await supabase.from('leads').select('*').order('created_at',{ascending:false})
    setLeads((data||[]) as Lead[]);setLoading(false)
  }

  const active=leads.filter(l=>!['Vunnet','Tapt'].includes(l.status)).length
  const followup=leads.filter(l=>['Ny','Kontaktet','Møte','Tilbud'].includes(l.status)).length
  const won=leads.filter(l=>l.status==='Vunnet').length
  const pipeline=useMemo(()=>leads.filter(l=>!['Tapt'].includes(l.status)).reduce((a,l)=>a+Number(l.value||0),0),[leads])

  return <main className="wrap">
    <AppNav/>
    <h1>Revenue Dashboard</h1>
    {loading ? <div className="card">Loading...</div> :
    <>
      <div className="grid">
        <div className="card"><div className="muted">Active leads</div><div className="metric">{active}</div></div>
        <div className="card"><div className="muted">Needs attention</div><div className="metric">{followup}</div></div>
        <div className="card"><div className="muted">Won deals</div><div className="metric">{won}</div></div>
        <div className="card"><div className="muted">Pipeline value</div><div className="metric">{pipeline.toLocaleString()}</div></div>
      </div>
      <div className="card"><h2>Next action</h2><p className="muted">{followup ? `You have ${followup} lead(s) worth reviewing.` : 'Add your first lead to start building a pipeline.'}</p></div>
    </>}
  </main>
}
