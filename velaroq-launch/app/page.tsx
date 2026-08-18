import Link from 'next/link'

export default function Home() {
  return <main className="wrap">
    <nav className="nav">
      <div className="brand">VELAROQ</div>
      <div className="navlinks">
        <Link href="/login">Log in</Link>
        <Link className="btn" href="/signup">Start free</Link>
      </div>
    </nav>
    <section className="hero">
      <span className="badge">AI REVENUE AGENT</span>
      <h1>Turn more leads into revenue.</h1>
      <p className="muted" style={{fontSize:20,maxWidth:720}}>
        Velaroq gives small teams one place to track prospects, prioritize follow-up and draft personalized sales messages with AI.
      </p>
      <div className="row" style={{marginTop:24}}>
        <Link className="btn" href="/signup">Create account</Link>
        <Link className="btn secondary" href="/login">Log in</Link>
      </div>
    </section>
    <section className="grid">
      <div className="card"><h3>Pipeline</h3><p className="muted">Track leads, value and status.</p></div>
      <div className="card"><h3>AI follow-up</h3><p className="muted">Draft outreach without inventing facts.</p></div>
      <div className="card"><h3>Private by default</h3><p className="muted">Supabase RLS keeps each user's leads separated.</p></div>
    </section>
  </main>
}
