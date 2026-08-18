export type Currency = 'USD' | 'EUR' | 'GBP' | 'NOK'
export type LeadStatus = 'Ny' | 'Kontaktet' | 'Møte' | 'Tilbud' | 'Vunnet' | 'Tapt'

export type Lead = {
  id: number
  user_id: string
  name: string
  company: string
  email: string | null
  phone: string | null
  status: LeadStatus
  value: number
  currency: Currency
  notes: string | null
  last_contacted_at: string | null
  created_at: string
  updated_at: string
}
