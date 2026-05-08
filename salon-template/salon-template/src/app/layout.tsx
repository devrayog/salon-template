import type { Metadata } from 'next'
import { seo, site, contact, social, schema, brand, llmsTxt } from '@/lib/config'
import './globals.css'

export const metadata: Metadata = {
  title: seo.title || `${site.name} | ${site.tagline}`,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: 'website',
    images: seo.ogImage ? [`https://images.unsplash.com/${seo.ogImage}?w=1200&h=630&fit=crop`] : [],
  },
  robots: 'index, follow',
}

const schemaData = {
  '@context': 'https://schema.org',
  '@type': schema.type,
  name: site.name,
  description: seo.description,
  telephone: contact.phone,
  email: contact.email,
  address: { '@type': 'PostalAddress', streetAddress: contact.address },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: social.rating, reviewCount: social.reviewCount.replace(/,/g, '') },
  priceRange: schema.priceRange,
  ...(schema.lat && { geo: { '@type': 'GeoCoordinates', latitude: schema.lat, longitude: schema.lng } }),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        <style>{`:root{--gold:${brand.primary};--dark:${brand.dark};--panel:${brand.panel};--text:${brand.text};--muted:${brand.muted}}`}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        {seo.gaId && <script async src={`https://www.googletagmanager.com/gtag/js?id=${seo.gaId}`} />}
        {seo.gaId && <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${seo.gaId}')` }} />}
      </head>
      <body>{children}</body>
    </html>
  )
}
