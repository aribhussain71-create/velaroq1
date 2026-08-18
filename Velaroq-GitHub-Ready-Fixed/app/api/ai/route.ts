import OpenAI from 'openai'
import { NextResponse } from 'next/server'

export async function POST(req:Request){
  try{
    const body=await req.json()
    const {name,company,status,notes}=body
    if(!name||!company) return NextResponse.json({error:'Missing lead data.'},{status:400})

    if(!process.env.OPENAI_API_KEY){
      return NextResponse.json({
        message:`Hi ${name}, I wanted to follow up and see whether ${company} would be open to a short conversation. If it makes sense, would a 15-minute call this week work for you?`
      })
    }

    const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY})
    const response=await client.responses.create({
      model:'gpt-5',
      input:`Write a concise professional sales follow-up in English.
Lead: ${name}
Company: ${company}
Pipeline status: ${status || 'unknown'}
Notes: ${notes || 'none'}

Rules:
- Do not invent facts about the person or company.
- Keep it under 120 words.
- Be helpful, not pushy.
- End with a low-friction call to action.
Return only the message.`
    })
    return NextResponse.json({message:response.output_text})
  }catch(error){
    console.error(error)
    return NextResponse.json({error:'AI generation failed.'},{status:500})
  }
}
