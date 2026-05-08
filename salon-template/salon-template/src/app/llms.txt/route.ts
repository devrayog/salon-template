import { NextResponse } from 'next/server'
import { llmsTxt, site, contact, seo } from '@/lib/config'

export async function GET() {
  const content = llmsTxt || `${site.name} is a salon located at ${contact.address}. Phone: ${contact.phone}. ${seo.description}`
  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain' }
  })
}
