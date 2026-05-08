'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { services, brand, site, getBookingUrl, unsplash } from '@/lib/config'
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

export default function ServicesPage() {
  useReveal()
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-20 text-center" style={{ background: brand.panel }}>
        <p className="section-label mb-4">What We Offer</p>
        <div className="gold-line mx-auto mb-6" />
        <h1 className="font-display text-5xl lg:text-6xl mb-6" style={{ color: brand.text }}>Our Services</h1>
        <p className="max-w-lg mx-auto" style={{ color: brand.muted }}>Every service at {site.name} is delivered with precision, care, and professional-grade products.</p>
      </section>

      {/* Services grid */}
      <section className="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="reveal card-hover group" style={{ transitionDelay: `${i * 0.08}s`, background: brand.panel, border: '1px solid rgba(201,169,110,0.1)', overflow: 'hidden' }}>
              <div className="relative overflow-hidden" style={{ height: 260 }}>
                <img src={unsplash(s.image, 600, 400)} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,14,13,0.95), transparent 50%)' }} />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-sm font-medium" style={{ color: brand.primary }}>{s.price}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl mb-3" style={{ color: brand.text }}>{s.name}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: brand.muted }}>{s.desc}</p>
                <a href={getBookingUrl(s.name)} target="_blank" rel="noreferrer" className="btn-gold text-xs w-full text-center block">Book This Service</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center reveal" style={{ background: brand.panel, borderTop: '1px solid rgba(201,169,110,0.1)' }}>
        <h2 className="font-display text-3xl mb-4" style={{ color: brand.text }}>Not sure which service?</h2>
        <p className="mb-8" style={{ color: brand.muted }}>WhatsApp us and we'll guide you to the right treatment.</p>
        <a href={getBookingUrl()} target="_blank" rel="noreferrer" className="btn-gold">Chat with Us →</a>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
