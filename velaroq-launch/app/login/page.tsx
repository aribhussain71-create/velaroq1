'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)

  async function login(e:React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase=createClient()
    const { error }=await supabase.auth.signInWithPassword({email,password})
    setLoading(false)
    if(error){setError(error.message);return}
    router.push('/dashboard')
    router.refresh()
  }

  return <main className="wrap">
    <div className="card" style={{maxWidth:460,margin:'72px auto'}}>
      <div className="brand">VELAROQ</div>
      <h1>Welcome back</h1>
      <form onSubmit={login}>
        <label>Email</label><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
        <label>Password</label><input className="input" type="password" required value={password} onChange={e=>setPassword(e.target.value)}/>
        {error && <div className="error">{error}</div>}
        <button className="btn" disabled={loading}>{loading?'Logging in...':'Log in'}</button>
      </form>
      <p className="muted">No account? <Link href="/signup">Create one</Link></p>
    </div>
  </main>
}
