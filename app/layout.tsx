import React from "react"
import type { Metadata } from 'next'
import {
  Fraunces,
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/**
 * Typography system — four-voice editorial hierarchy:
 *   Fraunces           → display headlines, hero h1 (variable serif, SOFT axis on, expressive)
 *   Instrument Serif   → italic cinematic accents, pull-quotes, "in their own words"
 *   Inter Tight        → body copy, UI text, paragraphs — modern boutique sans
 *   JetBrains Mono     → labels, eyebrows, indices, technical / editorial marginalia
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains',
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
  themeColor: '#0a0a0a',
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
        className={`${fraunces.variable} ${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
