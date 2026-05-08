'use client'
import { useEffect, useState } from 'react'
import { hero, services, about, brand, site, unsplash } from '@/lib/config'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function GalleryPage() {
  useReveal()
  const [selected, setSelected] = useState<string | null>(null)

  const allImages = [
    ...hero.images.map(id => ({ id, label: site.name })),
    ...services.map(s => ({ id: s.image, label: s.name })),
    { id: about.image, label: 'Our Studio' },
    { id: about.founderImage, label: 'Our Team' },
  ]

  return (
    <>
      <Navbar />
      <section className="pt-40 pb-16 px-6 text-center" style={{ background: brand.panel }}>
        <p className="section-label mb-4">Visual Journey</p>
        <div className="gold-line mx-auto mb-6" />
        <h1 className="font-display text-5xl lg:text-6xl" style={{ color: brand.text }}>Gallery</h1>
      </section>

      <section className="py-16 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {allImages.map((img, i) => (
            <div key={i} onClick={() => setSelected(img.id)} className="reveal break-inside-avoid cursor-zoom-in group relative overflow-hidden" style={{ transitionDelay: `${i * 0.05}s` }}>
              <img src={unsplash(img.id, 600, i % 3 === 0 ? 700 : 450)} alt={img.label} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,14,13,0.5)', opacity: 0, transition: 'opacity 0.3s' }} className="group-hover:opacity-100 flex items-end p-4">
                <p className="text-sm" style={{ color: brand.primary }}>{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.95)' }} onClick={() => setSelected(null)}>
          <img src={unsplash(selected, 1200, 800)} alt="" className="max-w-full max-h-full object-contain" />
          <button className="absolute top-6 right-6 text-2xl" style={{ color: brand.primary }}>×</button>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />
    </>
  )
}
