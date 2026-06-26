"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useContact } from "@/components/site/contact-provider";
import { MetallicPaint } from "@/components/ui/metallic-paint";

type FooterAction =
  | { name: string; href: string }
  | { name: string; action: "openContact" };

const footerLinks: Record<string, FooterAction[]> = {
  Travel: [
    { name: "Home",        href: "/"               },
    { name: "Liam AI Consultant", href: "/liam"    },
    { name: "Destinations",href: "/destinations"   },
    { name: "Cruises",     href: "/cruises"        },
    { name: "Hotels & resorts", href: "/hotels-resorts" },
    { name: "Flights & packages", href: "/flights-packages" },
  ],
  Practice: [
    { name: "Meet Isaac",  href: "/about-isaac"    },
    { name: "Client stories", href: "/#stories"   },
    { name: "Journal",     href: "/blog"           },
    { name: "Family legacy", href: "/about-isaac#family-legacy" },
  ],
  Contact: [
    { name: "Book consultation", action: "openContact" },
    { name: "Write to us",       action: "openContact" },
    { name: "Concierge line",    action: "openContact" },
    { name: "Existing clients",  action: "openContact" },
  ],
  Practical: [
    { name: "Privacy",     href: "/privacy"        },
    { name: "Terms",       href: "/terms"          },
    { name: "Cookies",     href: "/cookies"        },
    { name: "Accessibility", href: "/accessibility" },
  ],
};

const quickLinks = [
  { name: "Email", href: "mailto:info@icvacation.com" },
  { name: "Journal", href: "/blog" },
  { name: "AI preview", href: "/#ai-travel-consultant" },
];

export function FooterSection() {
  const { openContact } = useContact();

  return (
    <footer className="relative bg-black">
      {/* Cinematic horizon */}
      <div className="relative w-full h-[280px] sm:h-[320px] md:h-[420px] overflow-hidden">
        <img
          src="/footer-horizon.jpg"
          alt="A road through Tuscan hills at dusk"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        <img
          src="/dandelion-yellow.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-10 right-12 w-24 h-24 sm:w-28 sm:h-28 opacity-75 animate-drift-slow hidden lg:block"
        />
        <img
          src="/dandelion-grey.svg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-12 left-16 w-16 h-16 opacity-35 animate-drift hidden lg:block"
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <p className="text-white/70 font-display italic text-xl sm:text-2xl lg:text-4xl text-center leading-tight max-w-2xl">
            &ldquo;The point of a vacation is not where you went.
            <br className="hidden sm:block" />
            <span className="text-white">It&apos;s who you came back as.&rdquo;</span>
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="py-14 sm:py-16 lg:py-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 sm:gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 md:col-span-2">
              <div className="flex items-center gap-4 mb-6 sm:mb-7">
                <Link href="/" aria-label="IC Vacation home" className="inline-block">
                  <img src="/ic-wordmark-yellow.svg" alt="IC Vacation" className="h-9 sm:h-10 w-auto" />
                </Link>
                <MetallicPaint imageUrl="/ic-owl.svg" color="#FFE500" metalIntensity={0.7} className="w-10 h-10 opacity-80" alt="IC Vacation owl" />
              </div>

              <p className="text-white/55 leading-[1.7] mb-6 sm:mb-8 max-w-xs text-sm">
                A small, advisor-led travel practice. Personal consultations and
                quietly curated vacations — shaped by Isaac Chowrimootoo.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-white/45 hover:text-brand-yellow transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-white/50 mb-5 sm:mb-6">
                  {title}
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      {"action" in link ? (
                        <button
                          onClick={openContact}
                          className="text-sm text-white/65 hover:text-white transition-colors inline-flex items-center gap-2 text-left"
                        >
                          {link.name}
                        </button>
                      ) : link.href.startsWith("/") ? (
                        <Link
                          href={link.href}
                          className="text-sm text-white/65 hover:text-white transition-colors inline-flex items-center gap-2"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-white/65 hover:text-white transition-colors inline-flex items-center gap-2"
                        >
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 sm:py-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-white/30">
            &copy; 2026 IC Vacation Ltd. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              Accepting new briefs
            </span>
            <span className="hidden sm:inline text-white/30">
              Made quietly in London
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
