import Link from 'next/link'
import { site, contact, social, brand } from '@/lib/config'

export default function Footer() {
  return (
    <footer style={{ background: brand.panel, borderTop: '1px solid rgba(201,169,110,0.15)' }} className="py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl mb-3" style={{ color: brand.text }}>{site.name}</p>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: brand.muted }}>{site.shortDesc}</p>
          <div className="flex gap-4">
            {social.instagram && <a href={social.instagram} target="_blank" rel="noreferrer" className="section-label text-[10px] hover:text-gold transition-colors" style={{ color: brand.muted }}>Instagram</a>}
            {social.facebook && <a href={social.facebook} target="_blank" rel="noreferrer" className="section-label text-[10px] hover:text-gold transition-colors" style={{ color: brand.muted }}>Facebook</a>}
            {social.youtube && <a href={social.youtube} target="_blank" rel="noreferrer" className="section-label text-[10px] hover:text-gold transition-colors" style={{ color: brand.muted }}>YouTube</a>}
          </div>
        </div>
        <div>
          <p className="section-label mb-4">Quick Links</p>
          {[['Home', '/'], ['Services', '/services'], ['About', '/about'], ['Gallery', '/gallery'], ['Contact', '/contact']].map(([label, href]) => (
            <Link key={href} href={href} className="block text-sm mb-2 hover:text-gold transition-colors" style={{ color: brand.muted }}>{label}</Link>
          ))}
        </div>
        <div>
          <p className="section-label mb-4">Contact</p>
          <div className="space-y-3">
            <p className="text-sm" style={{ color: brand.muted }}>{contact.address}</p>
            <a href={`tel:${contact.phoneRaw}`} className="block text-sm hover:text-gold transition-colors" style={{ color: brand.muted }}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="block text-sm hover:text-gold transition-colors" style={{ color: brand.muted }}>{contact.email}</a>
            <p className="text-sm" style={{ color: brand.muted }}>Mon–Fri: {contact.hoursWeekday}</p>
            <p className="text-sm" style={{ color: brand.muted }}>Sat–Sun: {contact.hoursWeekend}</p>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(201,169,110,0.1)', marginTop: 40, paddingTop: 24 }} className="flex flex-col lg:flex-row justify-between gap-4">
        <p className="text-xs" style={{ color: brand.muted }}>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p className="text-xs" style={{ color: brand.muted }}>Est. {site.established} · {site.city}</p>
      </div>
    </footer>
  )
}
