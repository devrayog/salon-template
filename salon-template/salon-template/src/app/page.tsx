'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { site, contact, social, stats, hero, announcements, about, services, testimonials, brand, getBookingUrl, unsplash } from '@/lib/config'

// ── Reveal hook ──────────────────────────────────────────
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

// ── Counter ───────────────────────────────────────────────
function Counter({ target, suffix }: { target: string; suffix: string }) {
  const [val, setVal] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const num = parseFloat(target.replace(/,/g, ''))
      const isDecimal = target.includes('.')
      let start = 0
      const duration = 1500
      const step = (timestamp: number, startTime: number) => {
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const current = num * progress
        setVal(isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString())
        if (progress < 1) requestAnimationFrame(t => step(t, startTime))
      }
      requestAnimationFrame(t => step(t, t))
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── Announcement Bar ─────────────────────────────────────
function AnnouncementBar() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)
  useEffect(() => {
    if (announcements.length <= 1) return
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => { setIdx(i => (i + 1) % announcements.length); setFade(true) }, 400)
    }, 4000)
    return () => clearInterval(t)
  }, [])
  if (!announcements.length) return null
  const ann = announcements[idx]
  return (
    <div style={{ background: brand.panel, borderBottom: '1px solid rgba(201,169,110,0.2)' }} className="py-2 px-4 text-center text-xs tracking-widest">
      <a href={ann.link} style={{ color: brand.primary, opacity: fade ? 1 : 0, transition: 'opacity 0.4s' }} className="block">
        {ann.text}
      </a>
    </div>
  )
}

// ── Navbar ───────────────────────────────────────────────
function Navbar() {
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
    <nav style={{ background: scrolled ? 'rgba(15,14,13,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : 'none', transition: 'all 0.4s ease' }} className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5 flex items-center justify-between">
      <Link href="/" className="font-display text-2xl tracking-wide" style={{ color: brand.text }}>
        {site.name}
      </Link>
      {/* Desktop */}
      <div className="hidden lg:flex items-center gap-8">
        {links.map(l => (
          <Link key={l.href} href={l.href} className="section-label hover:text-gold transition-colors" style={{ color: brand.muted }}>
            {l.label}
          </Link>
        ))}
        <a href={getBookingUrl()} target="_blank" rel="noreferrer" className="btn-gold text-xs">Book Now</a>
      </div>
      {/* Mobile */}
      <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col gap-1.5" style={{ color: brand.text }}>
        <span style={{ width: 24, height: 1, background: brand.primary, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
        <span style={{ width: 24, height: 1, background: brand.primary, opacity: open ? 0 : 1, transition: 'all 0.3s' }} />
        <span style={{ width: 24, height: 1, background: brand.primary, transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
      </button>
      {open && (
        <div style={{ background: brand.panel }} className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl" style={{ color: brand.text }}>{l.label}</Link>
          ))}
          <a href={getBookingUrl()} target="_blank" rel="noreferrer" className="btn-gold mt-4" onClick={() => setOpen(false)}>Book Appointment</a>
        </div>
      )}
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────
function Hero() {
  const [imgIdx, setImgIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % hero.images.length), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background slideshow */}
      {hero.images.map((id, i) => (
        <div key={id} style={{ opacity: i === imgIdx ? 1 : 0, transition: 'opacity 1.5s ease' }} className="absolute inset-0">
          <img src={unsplash(id, 1920, 1080)} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(15,14,13,0.92) 45%, rgba(15,14,13,0.5) 100%)' }} />
      <div className="relative z-10 px-6 lg:px-20 w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Left */}
        <div className="max-w-2xl">
          <p className="section-label animate-fadeInUp delay-1 mb-6">{hero.label}</p>
          <h1 className="font-display animate-fadeInUp delay-2 mb-6" style={{ fontSize: 'clamp(3rem,7vw,6rem)', lineHeight: 1.05, color: brand.text }}>
            {hero.headline1}<br />
            <span style={{ color: brand.primary, fontStyle: 'italic' }}>{hero.headline2}</span>
          </h1>
          <p className="animate-fadeInUp delay-3 mb-10 max-w-lg" style={{ color: brand.muted, lineHeight: 1.8, fontSize: 16 }}>{hero.subtext}</p>
          <div className="flex flex-wrap gap-4 animate-fadeInUp delay-4">
            <a href={getBookingUrl()} target="_blank" rel="noreferrer" className="btn-gold">{hero.btn1Text}</a>
            <Link href={hero.btn2Link} className="btn-outline">{hero.btn2Text}</Link>
          </div>
        </div>
        {/* Right — Google rating card */}
        <div className="hidden lg:block float-anim animate-fadeInUp delay-5">
          <div style={{ background: 'rgba(26,24,20,0.9)', border: '1px solid rgba(201,169,110,0.3)', backdropFilter: 'blur(12px)' }} className="p-6 rounded w-56">
            <p className="section-label mb-2">Google Rating</p>
            <p className="font-display text-5xl mb-1" style={{ color: brand.primary }}>{social.rating}</p>
            <p className="text-xs mb-3" style={{ color: brand.primary }}>{'★'.repeat(5)}</p>
            <p className="text-xs" style={{ color: brand.muted }}>{social.reviewCount} verified reviews</p>
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(201,169,110,0.15)' }}>
              <p className="text-xs leading-relaxed italic" style={{ color: brand.muted }}>"{testimonials[0]?.text?.slice(0, 80)}..."</p>
              <p className="text-xs mt-2" style={{ color: brand.primary }}>— {testimonials[0]?.name}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: brand.muted }}>
        <p className="section-label text-[10px]">Scroll</p>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${brand.primary}, transparent)` }} />
      </div>
    </section>
  )
}

// ── Stats ────────────────────────────────────────────────
function Stats() {
  return (
    <div style={{ background: brand.panel, borderTop: '1px solid rgba(201,169,110,0.15)', borderBottom: '1px solid rgba(201,169,110,0.15)' }} className="py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="text-center reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
            <p className="font-display text-4xl mb-1" style={{ color: brand.primary }}>
              <Counter target={s.number} suffix={s.suffix} />
            </p>
            <p className="section-label text-[10px]" style={{ color: brand.muted }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── About snippet ─────────────────────────────────────────
function AboutSnippet() {
  return (
    <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal-left">
          <div className="relative">
            <img src={unsplash(about.image, 800, 900)} alt={about.headline} className="w-full object-cover" style={{ height: 520 }} />
            <div style={{ position: 'absolute', bottom: -24, right: -24, background: brand.panel, border: `1px solid rgba(201,169,110,0.2)`, padding: '20px 28px' }}>
              <p className="font-display text-4xl" style={{ color: brand.primary }}>{site.established}</p>
              <p className="section-label text-[10px] mt-1" style={{ color: brand.muted }}>Est. in {site.city}</p>
            </div>
          </div>
        </div>
        <div className="reveal-right">
          <p className="section-label mb-4">Who We Are</p>
          <div className="gold-line mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl mb-6" style={{ color: brand.text, lineHeight: 1.15 }}>
            {about.subheadline}
          </h2>
          <p className="mb-4 leading-relaxed" style={{ color: brand.muted }}>{about.p1}</p>
          <p className="mb-8 leading-relaxed" style={{ color: brand.muted }}>{about.p2}</p>
          <div className="space-y-3 mb-10">
            {[about.usp1, about.usp2, about.usp3].filter(Boolean).map((u, i) => (
              <div key={i} className="flex items-start gap-3">
                <span style={{ color: brand.primary, marginTop: 2 }}>✓</span>
                <p className="text-sm" style={{ color: brand.muted }}>{u}</p>
              </div>
            ))}
          </div>
          <Link href="/about" className="btn-outline">Read Our Story</Link>
        </div>
      </div>
    </section>
  )
}

// ── Services ─────────────────────────────────────────────
function Services() {
  return (
    <section style={{ background: brand.panel }} className="py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">What We Do</p>
          <div className="gold-line mx-auto mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl" style={{ color: brand.text }}>Our Services</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="card-hover reveal group" style={{ transitionDelay: `${i * 0.08}s`, background: brand.dark, border: '1px solid rgba(201,169,110,0.1)', overflow: 'hidden' }}>
              <div className="relative overflow-hidden" style={{ height: 220 }}>
                <img src={unsplash(s.image, 600, 400)} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,14,13,0.9), transparent)' }} />
                <span className="absolute bottom-4 left-4 text-2xl">{s.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl mb-2" style={{ color: brand.text }}>{s.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: brand.muted }}>{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: brand.primary }}>{s.price}</span>
                  <a href={getBookingUrl(s.name)} target="_blank" rel="noreferrer" className="section-label text-[10px] hover:text-gold transition-colors" style={{ color: brand.muted }}>Book →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 reveal">
          <Link href="/services" className="btn-outline">View All Services</Link>
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0)
  return (
    <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
      <div className="text-center mb-16 reveal">
        <p className="section-label mb-4">Client Love</p>
        <div className="gold-line mx-auto mb-6" />
        <h2 className="font-display text-4xl lg:text-5xl" style={{ color: brand.text }}>What They Say</h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((t, i) => (
          <div key={i} className="reveal card-hover" style={{ transitionDelay: `${i * 0.1}s`, background: brand.panel, border: '1px solid rgba(201,169,110,0.1)', padding: '32px 28px' }}>
            <p className="mb-1" style={{ color: brand.primary, fontSize: 14 }}>{'★'.repeat(5)}</p>
            <p className="leading-relaxed mb-6 italic font-display text-lg" style={{ color: brand.text }}>"{t.text}"</p>
            <div style={{ borderTop: '1px solid rgba(201,169,110,0.15)', paddingTop: 16 }}>
              <p className="font-medium text-sm" style={{ color: brand.primary }}>{t.name}</p>
              <p className="text-xs mt-1" style={{ color: brand.muted }}>{t.role}</p>
            </div>
          </div>
        ))}
      </div>
      {social.googleReview && (
        <div className="text-center mt-10 reveal">
          <a href={social.googleReview} target="_blank" rel="noreferrer" className="btn-outline">Leave a Google Review</a>
        </div>
      )}
    </section>
  )
}

// ── Founder quote ─────────────────────────────────────────
function FounderQuote() {
  if (!about.founderName) return null
  return (
    <section style={{ background: brand.panel, borderTop: '1px solid rgba(201,169,110,0.1)', borderBottom: '1px solid rgba(201,169,110,0.1)' }} className="py-20 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal-left">
          <img src={unsplash(about.founderImage, 600, 700)} alt={about.founderName} className="w-full object-cover" style={{ height: 400 }} />
        </div>
        <div className="reveal-right">
          <p className="section-label mb-6">From the Founder</p>
          <div className="gold-line mb-8" />
          <p className="font-display text-2xl lg:text-3xl italic leading-relaxed mb-8" style={{ color: brand.text }}>
            "{about.founderQuote}"
          </p>
          <p className="font-medium" style={{ color: brand.primary }}>{about.founderName}</p>
          <p className="text-sm mt-1" style={{ color: brand.muted }}>{about.founderTitle}</p>
        </div>
      </div>
    </section>
  )
}

// ── CTA Banner ────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-20 px-6 text-center reveal" style={{ background: `linear-gradient(135deg, ${brand.panel} 0%, ${brand.dark} 100%)` }}>
      <p className="section-label mb-4">Ready for a Transformation?</p>
      <h2 className="font-display text-4xl lg:text-5xl mb-6" style={{ color: brand.text }}>
        Book Your Appointment<br />
        <span style={{ color: brand.primary, fontStyle: 'italic' }}>Today</span>
      </h2>
      <p className="mb-10 max-w-md mx-auto" style={{ color: brand.muted }}>Walk in as you are. Leave as you want to be.</p>
      <a href={getBookingUrl()} target="_blank" rel="noreferrer" className="btn-gold text-sm">
        Book on WhatsApp →
      </a>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────
function Footer() {
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
      <div style={{ borderTop: '1px solid rgba(201,169,110,0.1)', marginTop: 40, paddingTop: 24 }} className="flex flex-col lg:flex-row justify-between gap-4 text-xs" style2={{ color: brand.muted }}>
        <p style={{ color: brand.muted }}>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p style={{ color: brand.muted }}>Est. {site.established} · {site.city}</p>
      </div>
    </footer>
  )
}

// ── WhatsApp Float ─────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <a href={getBookingUrl()} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

// ── Page ──────────────────────────────────────────────────
export default function HomePage() {
  useReveal()
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Stats />
      <AboutSnippet />
      <Services />
      <Testimonials />
      <FounderQuote />
      <CTABanner />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
