"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Travel: [
    { name: "Approach", href: "#approach" },
    { name: "Destinations", href: "#destinations" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
  ],
  Practice: [
    { name: "Meet Isaac", href: "#advisor" },
    { name: "Client stories", href: "#stories" },
    { name: "Journal", href: "#journal" },
    { name: "Press", href: "#" },
  ],
  Contact: [
    { name: "Book consultation", href: "#contact" },
    { name: "Write to us", href: "mailto:hello@icvacation.com" },
    { name: "Concierge line", href: "#" },
    { name: "Existing clients", href: "#" },
  ],
  Practical: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Booking conditions", href: "#" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Substack", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative bg-black">
      {/* Cinematic panoramic horizon — elegant visual footer per Template A */}
      <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
        <img
          src="/footer-horizon.jpg"
          alt="A road through Tuscan hills at dusk"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient fade to deep black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Floating dandelion mark, far right */}
        <img
          src="/ic-dandelion.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-12 right-12 w-24 h-24 opacity-70 animate-drift-slow hidden lg:block"
        />

        {/* Quiet quote overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <p className="text-white/70 font-display italic text-2xl lg:text-4xl text-center leading-tight max-w-2xl">
            &ldquo;The point of a vacation is not where you went.
            <br className="hidden sm:block" />
            <span className="text-white">It's who you came back as.&rdquo;</span>
          </p>
        </div>
      </div>

      {/* Footer content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-3 mb-6">
                <img
                  src="/ic-dandelion.svg"
                  alt=""
                  aria-hidden="true"
                  className="w-9 h-9"
                />
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-display text-white">
                    IC Vacation
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/55 mt-1.5">
                    Boutique travel · est. 2014
                  </span>
                </div>
              </a>

              <p className="text-white/55 leading-relaxed mb-8 max-w-xs text-sm">
                A small, advisor-led travel practice. Personal consultations and
                quietly curated vacations — shaped by Isaac Chowrimootoo.
              </p>

              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/45 hover:text-brand-green transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-xs font-mono uppercase tracking-[0.22em] text-white/50 mb-6">
                  {title}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/65 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/30">
            &copy; 2025 IC Vacation Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-[0.18em] text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
              Booking spring 2026 now
            </span>
            <span className="hidden md:inline text-white/30">
              Made quietly in London
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
