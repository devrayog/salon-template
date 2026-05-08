// lib/config.ts
// Single source of truth — reads ALL env vars
// Change .env = change entire website

export const site = {
  name: process.env.NEXT_PUBLIC_SALON_NAME || 'Elara Beauty Studio',
  tagline: process.env.NEXT_PUBLIC_SALON_TAGLINE || 'Where Beauty Meets Artistry',
  shortDesc: process.env.NEXT_PUBLIC_SALON_SHORT_DESC || '',
  established: process.env.NEXT_PUBLIC_SALON_ESTABLISHED || '2015',
  city: process.env.NEXT_PUBLIC_SALON_CITY || 'New Delhi',
}

export const contact = {
  phone: process.env.NEXT_PUBLIC_PHONE || '',
  phoneRaw: process.env.NEXT_PUBLIC_PHONE_RAW || '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
  email: process.env.NEXT_PUBLIC_EMAIL || '',
  address: process.env.NEXT_PUBLIC_ADDRESS || '',
  mapEmbed: process.env.NEXT_PUBLIC_MAP_EMBED || '',
  hoursWeekday: process.env.NEXT_PUBLIC_HOURS_WEEKDAY || '10:00 AM – 8:00 PM',
  hoursWeekend: process.env.NEXT_PUBLIC_HOURS_WEEKEND || '9:00 AM – 9:00 PM',
  hoursClosed: process.env.NEXT_PUBLIC_HOURS_CLOSED || '',
  branch2: {
    name: process.env.NEXT_PUBLIC_BRANCH2_NAME || '',
    address: process.env.NEXT_PUBLIC_BRANCH2_ADDRESS || '',
    phone: process.env.NEXT_PUBLIC_BRANCH2_PHONE || '',
  }
}

export const social = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || '',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE || '',
  googleReview: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || '',
  rating: process.env.NEXT_PUBLIC_GOOGLE_RATING || '4.8',
  reviewCount: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT || '2,340',
}

export const stats = [
  { number: process.env.NEXT_PUBLIC_STAT1_NUMBER || '9', suffix: process.env.NEXT_PUBLIC_STAT1_SUFFIX || '+', label: process.env.NEXT_PUBLIC_STAT1_LABEL || 'Years of Excellence' },
  { number: process.env.NEXT_PUBLIC_STAT2_NUMBER || '4.8', suffix: process.env.NEXT_PUBLIC_STAT2_SUFFIX || '★', label: process.env.NEXT_PUBLIC_STAT2_LABEL || 'Google Rating' },
  { number: process.env.NEXT_PUBLIC_STAT3_NUMBER || '2340', suffix: process.env.NEXT_PUBLIC_STAT3_SUFFIX || '+', label: process.env.NEXT_PUBLIC_STAT3_LABEL || 'Happy Clients' },
  { number: process.env.NEXT_PUBLIC_STAT4_NUMBER || '50', suffix: process.env.NEXT_PUBLIC_STAT4_SUFFIX || '+', label: process.env.NEXT_PUBLIC_STAT4_LABEL || 'Expert Services' },
]

export const hero = {
  label: process.env.NEXT_PUBLIC_HERO_LABEL || '',
  headline1: process.env.NEXT_PUBLIC_HERO_HEADLINE_1 || 'Where Great Hair',
  headline2: process.env.NEXT_PUBLIC_HERO_HEADLINE_2 || 'Happens Every Day',
  subtext: process.env.NEXT_PUBLIC_HERO_SUBTEXT || '',
  btn1Text: process.env.NEXT_PUBLIC_HERO_BTN1_TEXT || 'Book Appointment',
  btn1Link: process.env.NEXT_PUBLIC_HERO_BTN1_LINK || '/booking',
  btn2Text: process.env.NEXT_PUBLIC_HERO_BTN2_TEXT || 'Explore Services',
  btn2Link: process.env.NEXT_PUBLIC_HERO_BTN2_LINK || '/services',
  images: (process.env.NEXT_PUBLIC_HERO_IMAGES || 'photo-1560066984-138dadb4c035').split(','),
}

export const announcements = [
  { text: process.env.NEXT_PUBLIC_ANNOUNCE1_TEXT || '', link: process.env.NEXT_PUBLIC_ANNOUNCE1_LINK || '/' },
  { text: process.env.NEXT_PUBLIC_ANNOUNCE2_TEXT || '', link: process.env.NEXT_PUBLIC_ANNOUNCE2_LINK || '/' },
  { text: process.env.NEXT_PUBLIC_ANNOUNCE3_TEXT || '', link: process.env.NEXT_PUBLIC_ANNOUNCE3_LINK || '/' },
].filter(a => a.text)

export const about = {
  headline: process.env.NEXT_PUBLIC_ABOUT_HEADLINE || 'Our Story',
  subheadline: process.env.NEXT_PUBLIC_ABOUT_SUBHEADLINE || '',
  p1: process.env.NEXT_PUBLIC_ABOUT_P1 || '',
  p2: process.env.NEXT_PUBLIC_ABOUT_P2 || '',
  p3: process.env.NEXT_PUBLIC_ABOUT_P3 || '',
  usp1: process.env.NEXT_PUBLIC_ABOUT_USP1 || '',
  usp2: process.env.NEXT_PUBLIC_ABOUT_USP2 || '',
  usp3: process.env.NEXT_PUBLIC_ABOUT_USP3 || '',
  image: process.env.NEXT_PUBLIC_ABOUT_IMAGE || 'photo-1522337360788-8b13dee7a37e',
  founderName: process.env.NEXT_PUBLIC_FOUNDER_NAME || '',
  founderTitle: process.env.NEXT_PUBLIC_FOUNDER_TITLE || '',
  founderQuote: process.env.NEXT_PUBLIC_FOUNDER_QUOTE || '',
  founderImage: process.env.NEXT_PUBLIC_FOUNDER_IMAGE || 'photo-1487412720507-e7ab37603c6f',
}

export const services = [1,2,3,4,5,6].map(i => ({
  name: process.env[`NEXT_PUBLIC_SERVICE${i}_NAME`] || '',
  desc: process.env[`NEXT_PUBLIC_SERVICE${i}_DESC`] || '',
  price: process.env[`NEXT_PUBLIC_SERVICE${i}_PRICE`] || '',
  icon: process.env[`NEXT_PUBLIC_SERVICE${i}_ICON`] || '✨',
  image: process.env[`NEXT_PUBLIC_SERVICE${i}_IMAGE`] || 'photo-1560066984-138dadb4c035',
})).filter(s => s.name)

export const testimonials = [1,2,3,4,5].map(i => ({
  name: process.env[`NEXT_PUBLIC_T${i}_NAME`] || '',
  role: process.env[`NEXT_PUBLIC_T${i}_ROLE`] || '',
  text: process.env[`NEXT_PUBLIC_T${i}_TEXT`] || '',
})).filter(t => t.name)

export const seo = {
  title: process.env.NEXT_PUBLIC_SEO_TITLE || '',
  description: process.env.NEXT_PUBLIC_SEO_DESCRIPTION || '',
  keywords: process.env.NEXT_PUBLIC_SEO_KEYWORDS || '',
  ogImage: process.env.NEXT_PUBLIC_SEO_OG_IMAGE || '',
  gaId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
}

export const schema = {
  type: process.env.NEXT_PUBLIC_SCHEMA_BUSINESS_TYPE || 'HairSalon',
  priceRange: process.env.NEXT_PUBLIC_SCHEMA_PRICE_RANGE || '₹₹',
  lat: process.env.NEXT_PUBLIC_SCHEMA_LATITUDE || '',
  lng: process.env.NEXT_PUBLIC_SCHEMA_LONGITUDE || '',
}

export const brand = {
  primary: process.env.NEXT_PUBLIC_COLOR_PRIMARY || '#C9A96E',
  dark: process.env.NEXT_PUBLIC_COLOR_DARK || '#0F0E0D',
  panel: process.env.NEXT_PUBLIC_COLOR_PANEL || '#1A1814',
  text: process.env.NEXT_PUBLIC_COLOR_TEXT || '#E8E4DC',
  muted: process.env.NEXT_PUBLIC_COLOR_MUTED || '#8A8070',
}

export const booking = {
  type: process.env.NEXT_PUBLIC_BOOKING_TYPE || 'whatsapp',
  whatsappMsg: process.env.NEXT_PUBLIC_BOOKING_WHATSAPP_MSG || 'Hi! I want to book an appointment.',
  calendly: process.env.NEXT_PUBLIC_BOOKING_CALENDLY || '',
}

export const llmsTxt = process.env.NEXT_PUBLIC_LLMS_DESCRIPTION || ''

export function getBookingUrl(service?: string) {
  if (booking.type === 'whatsapp') {
    const msg = service ? `Hi! I'd like to book: ${service}` : booking.whatsappMsg
    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`
  }
  return booking.calendly || '/contact'
}

export function unsplash(id: string, w = 1200, h = 800) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=80`
}
