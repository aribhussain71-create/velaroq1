'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AppNav() {
  const router = useRouter()
  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }
  return <nav className="nav">
    <Link className="brand" href="/">VELAROQ</Link>
    <div className="navlinks">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/leads">Leads</Link>
      <button className="btn secondary" onClick={logout}>Log out</button>
    </div>
  </nav>
}
