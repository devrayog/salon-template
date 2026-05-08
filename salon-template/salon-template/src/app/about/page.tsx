'use client'
import { useEffect } from 'react'
import { about, brand, site, stats, unsplash, getBookingUrl } from '@/lib/config'
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

export default function AboutPage() {
  useReveal()
  return (
    <>
      <Navbar />
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-20" style={{ background: brand.panel }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">Our Story</p>
            <div className="gold-line mb-6" />
            <h1 className="font-display text-5xl lg:text-6xl mb-6" style={{ color: brand.text, lineHeight: 1.1 }}>{about.headline}</h1>
            <p className="text-lg leading-relaxed" style={{ color: brand.muted, fontStyle: 'italic' }}>{about.subheadline}</p>
          </div>
          <div>
            <img src={unsplash(about.image, 800, 600)} alt={about.headline} className="w-full object-cover" style={{ height: 400 }} />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 lg:px-20 max-w-4xl mx-auto">
        <div className="space-y-6 reveal">
          <p className="text-lg leading-relaxed" style={{ color: brand.muted }}>{about.p1}</p>
          <p className="text-lg leading-relaxed" style={{ color: brand.muted }}>{about.p2}</p>
          <p className="text-lg leading-relaxed" style={{ color: brand.muted }}>{about.p3}</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-3 gap-6 reveal">
          {[about.usp1, about.usp2, about.usp3].filter(Boolean).map((u, i) => (
            <div key={i} style={{ background: brand.panel, border: '1px solid rgba(201,169,110,0.15)', padding: '24px 20px' }}>
              <span style={{ color: brand.primary, fontSize: 20 }}>✓</span>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: brand.muted }}>{u}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      {about.founderName && (
        <section style={{ background: brand.panel, borderTop: '1px solid rgba(201,169,110,0.1)', borderBottom: '1px solid rgba(201,169,110,0.1)' }} className="py-20 px-6 lg:px-20">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <img src={unsplash(about.founderImage, 600, 700)} alt={about.founderName} className="w-full object-cover" style={{ height: 480 }} />
            </div>
            <div className="reveal-right">
              <p className="section-label mb-6">Meet the Founder</p>
              <div className="gold-line mb-8" />
              <p className="font-display text-2xl italic leading-relaxed mb-8" style={{ color: brand.text }}>"{about.founderQuote}"</p>
              <p className="font-medium" style={{ color: brand.primary }}>{about.founderName}</p>
              <p className="text-sm mt-1" style={{ color: brand.muted }}>{about.founderTitle}</p>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="py-16 px-6 lg:px-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <p className="font-display text-4xl" style={{ color: brand.primary }}>{s.number}{s.suffix}</p>
              <p className="section-label text-[10px] mt-2" style={{ color: brand.muted }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
