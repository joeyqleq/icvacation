"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Approach",     href: "/#approach"     },
  { name: "Destinations", href: "/destinations"  },
  { name: "Cruises",      href: "/cruises"       },
  { name: "Hotels",       href: "/hotels-resorts" },
  { name: "Journal",      href: "/blog"          },
  { name: "About",        href: "/about-isaac"   },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);

      // Track active section by checking viewport overlap (homepage anchors only)
      const sections = navLinks
        .filter((l) => l.href.startsWith("/#"))
        .map((l) => l.href.replace("/#", ""))
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((s) => s.el);

      const viewportMid = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const { id, el } of sections) {
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (viewportMid >= top && viewportMid < bottom) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 left-0 right-0 ${
        isScrolled
          ? "top-3 sm:top-5"
          : "top-3 sm:top-5"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between transition-all duration-500
          rounded-full nav-island
          ${isScrolled
            ? "h-12 max-w-[1080px] px-3 pl-4 sm:pl-5"
            : "h-14 max-w-[1180px] px-4 pl-5 sm:pl-6"
          }
        `}
        style={{
          marginLeft: "0.75rem",
          marginRight: "0.75rem",
        }}
      >
        {/* Logo lockup */}
        <a
          href="/"
          aria-label="IC Vacation home"
          className="flex items-center group shrink-0"
        >
          <img
            src="/ic-wordmark-yellow.svg"
            alt="IC Vacation"
            className={`transition-all duration-500 w-auto ${
              isScrolled ? "h-6" : "h-7 sm:h-8"
            }`}
          />
        </a>

        {/* Desktop Navigation — quiet pill with green accent dot for active */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive =
              link.href.startsWith("/#") &&
              activeSection === link.href.replace("/#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-[13px] tracking-tight transition-all duration-300 rounded-full
                  ${isActive
                    ? "nav-pill-active"
                    : "text-white/65 hover:text-white hover:bg-white/[0.05]"
                  }`}
              >
                {isActive && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-brand-green shadow-[0_0_8px_rgba(38,252,0,0.8)]" />
                )}
                <span className={isActive ? "pl-3" : ""}>{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="/contact"
            className="text-[13px] tracking-tight text-white/65 hover:text-white transition-colors"
          >
            Contact
          </a>
          <a
            href="/contact"
            className="btn-primary group h-9 px-4 text-[12px] rounded-full"
          >
            Plan my trip
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu — Full-Screen Overlay (glass) */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
        <div className="relative flex flex-col h-full px-7 pt-24 pb-8">
          {/* Dandelion accent */}
          <img
            src="/dandelion-yellow.svg"
            alt=""
            aria-hidden="true"
            className="absolute top-20 right-6 w-28 h-28 opacity-15 animate-drift-slow"
          />

          <div className="flex-1 flex flex-col justify-center gap-5 relative z-10">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[clamp(2.2rem,9vw,3.8rem)] font-display-tight leading-[0.95] text-white hover:text-brand-green transition-all duration-500 ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 60}ms` : "0ms",
                  letterSpacing: "-0.03em",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div
            className={`relative z-10 flex flex-col gap-3 pt-8 border-t border-white/10 transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
            }}
          >
            <a
              href="/contact"
              className="btn-primary w-full justify-center h-14 text-base rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Plan my trip
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="btn-secondary w-full justify-center h-14 text-base rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Isaac
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
