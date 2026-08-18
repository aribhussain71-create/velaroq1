'use client'
import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState('')
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)

  async function signup(e:React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(''); setMessage('')
    const supabase=createClient()
    const { data,error }=await supabase.auth.signUp({email,password})
    setLoading(false)
    if(error){setError(error.message);return}
    if(data.session) setMessage('Account created. You can now open the dashboard.')
    else setMessage('Account created. Check your email to confirm the account, then log in.')
  }

  return <main className="wrap">
    <div className="card" style={{maxWidth:460,margin:'72px auto'}}>
      <div className="brand">VELAROQ</div>
      <h1>Create account</h1>
      <form onSubmit={signup}>
        <label>Email</label><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
        <label>Password</label><input className="input" type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        <button className="btn" disabled={loading}>{loading?'Creating...':'Create account'}</button>
      </form>
      <p className="muted">Already registered? <Link href="/login">Log in</Link></p>
    </div>
  </main>
}
