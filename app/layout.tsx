import React from "react"
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ContactProvider } from '@/components/site/contact-provider'
import { SiteAnalytics } from '@/components/site/analytics'

const bricolage = localFont({
  src: '../public/fonts/bricolage-grotesque/BricolageGrotesque-Variable.ttf',
  variable: '--font-bricolage',
  display: 'swap',
  weight: '200 800',
  style: 'normal',
})

const instrumentSerif = localFont({
  src: [
    {
      path: '../public/fonts/instrument-serif/InstrumentSerif-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/instrument-serif/InstrumentSerif-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const newsreader = localFont({
  src: [
    {
      path: '../public/fonts/newsreader/Newsreader-Variable.ttf',
      weight: '200 800',
      style: 'normal',
    },
    {
      path: '../public/fonts/newsreader/Newsreader-Italic-Variable.ttf',
      weight: '200 800',
      style: 'italic',
    },
  ],
  variable: '--font-newsreader',
  display: 'swap',
})

const geist = localFont({
  src: '../public/fonts/geist/Geist-Variable.woff2',
  variable: '--font-geist',
  display: 'swap',
  weight: '100 900',
  style: 'normal',
})

const spaceMono = localFont({
  src: [
    {
      path: '../public/fonts/space-mono/SpaceMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/space-mono/SpaceMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-space-mono',
  display: 'swap',
})

const anton = localFont({
  src: '../public/fonts/anton/Anton-Regular.ttf',
  variable: '--font-anton',
  display: 'swap',
  weight: '400',
  style: 'normal',
})

export const metadata: Metadata = {
  title: 'IC Vacation — Vacations, shaped around you.',
  description:
    'IC Vacation is a boutique, advisor-led travel practice. Personal consultation, curated itineraries, and quietly luxurious vacations designed by Isaac Chowrimootoo. Specializing in personalized, luxury travel planning and cruise vacations.',
  generator: 'v0.app',
  icons: {
    icon: '/dandelion-yellow.svg',
  },
  keywords: 'boutique travel advisor, personalized travel planning, luxury vacations, curated itineraries, cruise planning, travel consultant',
  robots: 'index, follow',
  openGraph: {
    title: 'IC Vacation — Vacations, shaped around you.',
    description: 'Boutique travel planning and curated itineraries by Isaac Chowrimootoo. Personalized luxury vacations designed around your travel style.',
    url: 'https://icvacation.com',
    siteName: 'IC Vacation',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "IC Vacation",
  "url": "https://icvacation.com",
  "description": "Boutique, advisor-led travel practice specializing in personalized luxury vacations and curated itineraries",
  "founder": {
    "@type": "Person",
    "name": "Isaac Chowrimootoo"
  },
  "sameAs": [
    "https://www.signaturetravelnetwork.com"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Travel Consultation",
    "url": "https://icvacation.com/contact"
  },
  "knowsAbout": [
    "Boutique Travel Planning",
    "Luxury Vacation Design",
    "Personalized Itineraries",
    "Cruise Planning",
    "Destination Expertise",
    "Travel Consultation"
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const enableVercelAnalytics = process.env.NODE_ENV === 'production'

  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${bricolage.variable} ${instrumentSerif.variable} ${newsreader.variable} ${geist.variable} ${spaceMono.variable} ${anton.variable} font-sans antialiased`}
      >
        <ContactProvider>
          {children}
        </ContactProvider>
        <SiteAnalytics />
        {enableVercelAnalytics ? <Analytics /> : null}
      </body>
    </html>
  )
}
