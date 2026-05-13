"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Approach",     href: "#approach"     },
  { name: "Destinations", href: "#destinations" },
  { name: "Stories",      href: "#stories"      },
  { name: "Journal",      href: "#journal"      },
  { name: "Services",     href: "#services"     },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section by checking viewport overlap
      const sections = navLinks
        .map((l) => l.href.replace("#", ""))
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
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "glass-nav max-w-[1240px] rounded-[2px]"
            : "bg-transparent max-w-[1440px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-5 sm:px-6 lg:px-10 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo lockup — full IC VACATION wordmark SVG (dandelion + name baked in) */}
          <a
            href="#"
            aria-label="IC Vacation home"
            className="flex items-center group shrink-0"
          >
            <img
              src="/ic-wordmark-yellow.svg"
              alt="IC Vacation"
              className={`transition-all duration-500 w-auto ${
                isScrolled ? "h-7" : "h-9 sm:h-10"
              }`}
            />
          </a>

          {/* Desktop Navigation — soft purple active pill */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm transition-all duration-300 rounded-[2px] ${
                    isActive
                      ? "nav-active"
                      : isScrolled
                      ? "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                      : "text-white/75 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA — unified hover */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#stories"
              className={`text-sm transition-all duration-300 hover:underline underline-offset-4 ${
                isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
              }`}
            >
              Sign in
            </a>
            <a
              href="#contact"
              className={`btn-primary group transition-all duration-500 ${
                isScrolled ? "px-4 h-9 text-xs" : "px-5 h-10 text-sm"
              }`}
            >
              Book consultation
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${
              isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu — Full-Screen Overlay (glass) */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${
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

          <div className="flex-1 flex flex-col justify-center gap-6 relative z-10">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[clamp(2.5rem,9vw,4rem)] font-display leading-[0.95] text-foreground hover:text-brand-purple transition-all duration-500 ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div
            className={`relative z-10 flex flex-col gap-3 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
            }}
          >
            <a
              href="#contact"
              className="btn-primary w-full justify-center h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book consultation
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#stories"
              className="btn-secondary w-full justify-center h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
