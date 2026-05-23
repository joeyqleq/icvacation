import React from "react"
import type { Metadata } from 'next'
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Newsreader,
  Geist,
  Space_Mono,
  Anton,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ContactProvider } from '@/components/site/contact-provider'
import { SiteAnalytics } from '@/components/site/analytics'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  axes: ['wdth', 'opsz'],
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
  axes: ['opsz'],
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

// Anton — the commanding, condensed display face used in the navbar so the
// nav voice echoes the IC Vacation logo wordmark.
const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'IC Vacation — Vacations, shaped around you.',
  description:
    'IC Vacation is a boutique, advisor-led travel practice. Personal consultation, curated itineraries, and quietly luxurious vacations designed by Isaac Chowrimootoo.',
  generator: 'v0.app',
  icons: {
    icon: '/dandelion-yellow.svg',
  },
}

export const viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${bricolage.variable} ${instrumentSerif.variable} ${newsreader.variable} ${geist.variable} ${spaceMono.variable} ${anton.variable} font-sans antialiased`}
      >
        <ContactProvider>
          {children}
        </ContactProvider>
        <SiteAnalytics />
        <Analytics />
      </body>
    </html>
  )
}
