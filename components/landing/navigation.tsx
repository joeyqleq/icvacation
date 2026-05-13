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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled
          ? "top-4 left-4 right-4"
          : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/85 backdrop-blur-xl border border-foreground/10 max-w-[1240px]"
            : "bg-transparent max-w-[1440px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-10 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo lockup — wordmark + monogram dandelion */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/ic-dandelion.svg"
              alt=""
              aria-hidden="true"
              className={`transition-all duration-500 ${
                isScrolled ? "w-7 h-7" : "w-9 h-9"
              }`}
            />
            <div className="flex flex-col leading-none">
              <span
                className={`font-display tracking-tight transition-all duration-500 ${
                  isScrolled ? "text-lg text-foreground" : "text-xl text-white"
                }`}
              >
                IC Vacation
              </span>
              <span
                className={`font-mono uppercase tracking-[0.18em] transition-all duration-500 ${
                  isScrolled ? "text-[9px] mt-1 text-muted-foreground" : "text-[10px] mt-1.5 text-white/55"
                }`}
              >
                Boutique travel · est. 2014
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-300 relative group ${
                  isScrolled
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    isScrolled ? "bg-brand-green" : "bg-brand-green"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="#stories"
              className={`transition-all duration-500 ${
                isScrolled
                  ? "text-xs text-foreground/70 hover:text-foreground"
                  : "text-sm text-white/70 hover:text-white"
              }`}
            >
              Sign in
            </a>
            <a
              href="#contact"
              className={`group inline-flex items-center gap-2 bg-brand-green text-black font-medium transition-all duration-500 hover:bg-brand-green/90 ${
                isScrolled ? "px-4 h-8 text-xs" : "px-5 h-10 text-sm"
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
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu — Full-Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-7">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-brand-green transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
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
            className={`flex flex-col gap-3 pt-8 border-t border-foreground/10 transition-all duration-500 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
            }}
          >
            <a
              href="#contact"
              className="w-full flex items-center justify-center gap-2 bg-brand-green text-black h-14 text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book consultation
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#stories"
              className="w-full flex items-center justify-center border border-foreground/20 h-14 text-base"
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
