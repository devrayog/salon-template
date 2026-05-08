'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { site, brand, getBookingUrl } from '@/lib/config'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ]
  return (
    <nav style={{ background: scrolled ? 'rgba(15,14,13,0.97)' : brand.panel, backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,169,110,0.15)', transition: 'all 0.4s ease' }} className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5 flex items-center justify-between">
      <Link href="/" className="font-display text-2xl tracking-wide" style={{ color: brand.text }}>{site.name}</Link>
      <div className="hidden lg:flex items-center gap-8">
        {links.map(l => (
          <Link key={l.href} href={l.href} className="section-label hover:text-gold transition-colors" style={{ color: brand.muted }}>{l.label}</Link>
        ))}
        <a href={getBookingUrl()} target="_blank" rel="noreferrer" className="btn-gold text-xs">Book Now</a>
      </div>
      <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col gap-1.5">
        <span style={{ width: 24, height: 1, background: brand.primary, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none', display: 'block' }} />
        <span style={{ width: 24, height: 1, background: brand.primary, opacity: open ? 0 : 1, transition: 'all 0.3s', display: 'block' }} />
        <span style={{ width: 24, height: 1, background: brand.primary, transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none', display: 'block' }} />
      </button>
      {open && (
        <div style={{ background: brand.panel, position: 'fixed', inset: 0, zIndex: 40 }} className="flex flex-col items-center justify-center gap-8 lg:hidden">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl" style={{ color: brand.text }}>{l.label}</Link>
          ))}
          <a href={getBookingUrl()} target="_blank" rel="noreferrer" className="btn-gold mt-4" onClick={() => setOpen(false)}>Book Appointment</a>
        </div>
      )}
    </nav>
  )
}
