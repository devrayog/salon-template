'use client'
import { useEffect } from 'react'
import { contact, social, brand, site, getBookingUrl } from '@/lib/config'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function ContactPage() {
  useReveal()
  return (
    <>
      <Navbar />
      <section className="pt-40 pb-16 px-6 text-center" style={{ background: brand.panel }}>
        <p className="section-label mb-4">Get in Touch</p>
        <div className="gold-line mx-auto mb-6" />
        <h1 className="font-display text-5xl lg:text-6xl" style={{ color: brand.text }}>Contact Us</h1>
      </section>

      <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* Info */}
        <div className="reveal-left space-y-8">
          <div>
            <p className="section-label mb-3">Visit Us</p>
            <p style={{ color: brand.muted }}>{contact.address}</p>
          </div>
          <div>
            <p className="section-label mb-3">Call / WhatsApp</p>
            <a href={`tel:${contact.phoneRaw}`} className="block hover:text-gold transition-colors" style={{ color: brand.muted }}>{contact.phone}</a>
          </div>
          <div>
            <p className="section-label mb-3">Email</p>
            <a href={`mailto:${contact.email}`} className="hover:text-gold transition-colors" style={{ color: brand.muted }}>{contact.email}</a>
          </div>
          <div>
            <p className="section-label mb-3">Hours</p>
            <p style={{ color: brand.muted }}>Mon–Fri: {contact.hoursWeekday}</p>
            <p style={{ color: brand.muted }}>Sat–Sun: {contact.hoursWeekend}</p>
          </div>
          {contact.branch2.name && (
            <div style={{ background: brand.panel, border: '1px solid rgba(201,169,110,0.15)', padding: 24 }}>
              <p className="section-label mb-3">Branch 2 — {contact.branch2.name}</p>
              <p style={{ color: brand.muted }}>{contact.branch2.address}</p>
              <a href={`tel:${contact.branch2.phone}`} className="block mt-2 hover:text-gold" style={{ color: brand.muted }}>{contact.branch2.phone}</a>
            </div>
          )}
          <div className="flex gap-4">
            {social.instagram && <a href={social.instagram} target="_blank" rel="noreferrer" className="btn-outline text-xs">Instagram</a>}
            {social.facebook && <a href={social.facebook} target="_blank" rel="noreferrer" className="btn-outline text-xs">Facebook</a>}
          </div>
        </div>

        {/* Map + Book */}
        <div className="reveal-right space-y-8">
          {contact.mapEmbed && (
            <iframe src={contact.mapEmbed} width="100%" height="300" style={{ border: 0, filter: 'grayscale(0.3)' }} allowFullScreen loading="lazy" />
          )}
          <div style={{ background: brand.panel, border: '1px solid rgba(201,169,110,0.15)', padding: 32 }}>
            <h3 className="font-display text-2xl mb-4" style={{ color: brand.text }}>Book an Appointment</h3>
            <p className="text-sm mb-6" style={{ color: brand.muted }}>The fastest way to book is via WhatsApp. We usually respond within minutes.</p>
            <a href={getBookingUrl()} target="_blank" rel="noreferrer" className="btn-gold block text-center">Book on WhatsApp →</a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
