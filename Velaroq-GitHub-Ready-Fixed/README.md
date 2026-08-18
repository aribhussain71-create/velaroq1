# Velaroq — Launch Candidate

This version is wired to the real Supabase project already created for Velaroq.

## Included
- Real Supabase email/password authentication
- Sign up, log in, log out
- Real lead CRUD
- Per-user data isolation through existing Row Level Security policies
- Dashboard backed by real lead data
- Lead status changes
- Multi-currency lead values: USD, EUR, GBP, NOK
- AI follow-up route using the OpenAI Responses API
- Safe fallback follow-up when no OpenAI API key is configured
- Responsive UI

## Run locally
1. Install Node.js 20+
2. Run `npm install`
3. The included `.env.local` already contains the Supabase Project URL and publishable key.
4. Add `OPENAI_API_KEY=...` to `.env.local` if you want live AI generation.
5. Run `npm run dev`
6. Open http://localhost:3000

## Supabase
The production database already has:
- `profiles`
- `leads`
- RLS enabled
- Per-user select/insert/update/delete policies
- Currency fields added for international use

## Before public launch
- Add a real domain and hosting (for example Vercel)
- Configure Supabase Auth Site URL / redirect URLs for the production domain
- Add an OpenAI API key as a server-side environment variable
- Add Terms, Privacy Policy, support email, and basic abuse/rate limiting
- Add billing only after validating that early users want to pay
Production build
