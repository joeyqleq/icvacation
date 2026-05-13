import React from "react"
import type { Metadata } from 'next'
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Newsreader,
  Geist,
  Space_Mono,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/**
 * Five-voice editorial typography system — each font has ONE clear role,
 * so the page never feels like a generic template.
 *
 *   Bricolage Grotesque (variable: wdth, opsz)
 *     → display headlines, hero statement, big section titles
 *     → axes manipulated for tension between condensed + wide
 *
 *   Instrument Serif (italic)
 *     → editorial emphasis word inside a Bricolage headline
 *     → pull-quotes, "in their own words", soft accents
 *
 *   Newsreader (variable serif)
 *     → long-form narrative copy (Meet Isaac, journal articles)
 *     → drop-caps + optical sizing for a real magazine feel
 *
 *   Geist (sans)
 *     → default UI / body / buttons / navigation
 *
 *   Space Mono
 *     → index numbers, tickers, technical labels, marginalia
 *     → wide-tracked, uppercase, micro-scale, always green or yellow
 */

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
        className={`${bricolage.variable} ${instrumentSerif.variable} ${newsreader.variable} ${geist.variable} ${spaceMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
