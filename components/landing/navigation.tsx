"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContact } from "@/components/site/contact-provider";

const navLinks = [
  { name: "Approach",     href: "/#approach"      },
  { name: "Destinations", href: "/destinations"   },
  { name: "Cruises",      href: "/cruises"        },
  { name: "Hotels",       href: "/hotels-resorts" },
  { name: "Journal",      href: "/blog"           },
  { name: "About",        href: "/about-isaac"    },
];

export function Navigation() {
  const [expanded, setExpanded] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const { openContact } = useContact();

  // First scroll triggers the bootup-then-expand sequence.  After expansion
  // the navbar stays as a pill for the rest of the session.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (window.scrollY > 24 && !expanded) {
          setExpanded(true);
          // Mark boot complete after the terminal flicker animation finishes
          setTimeout(() => setHasBooted(true), 950);
        }
        // Active anchor tracking (homepage anchors only)
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
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [expanded]);

  // If we land on a route other than "/", auto-expand (no orb intro mid-flow)
  useEffect(() => {
    if (pathname !== "/") {
      setExpanded(true);
      setHasBooted(true);
    }
  }, [pathname]);

  function isActive(href: string) {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === href.replace("/#", "");
    }
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="flex justify-center pt-3 sm:pt-5">
        {/* === ORB MODE — circular neon yellow halo containing the rotating dandelion === */}
        {!expanded ? (
          <div
            className="nav-orb pointer-events-auto relative flex items-center justify-center rounded-full"
            style={{ width: 88, height: 88 }}
            role="banner"
            aria-label="IC Vacation — scroll to enter"
          >
            <div className="nav-orb-spin w-[68%] h-[68%] relative">
              <img
                src="/dandelion-grey.svg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain"
                style={{ filter: "brightness(1.6) saturate(0)" }}
                draggable={false}
              />
            </div>
            {/* center brand-green dot pulse */}
            <span
              aria-hidden="true"
              className="absolute w-1.5 h-1.5 rounded-full pulse-green"
              style={{ boxShadow: "0 0 12px rgba(38, 252, 0, 0.85)" }}
            />
          </div>
        ) : (
          <nav
            key="pill"
            className={`nav-island pointer-events-auto flex items-center rounded-full transition-all duration-500
              h-12 sm:h-14 px-3 sm:px-4 max-w-[1180px] w-[calc(100%-1.5rem)]
              ${hasBooted ? "" : "terminal-boot"}
            `}
            aria-label="Primary"
          >
            {/* Logo lockup */}
            <Link
              href="/"
              aria-label="IC Vacation home"
              className="flex items-center shrink-0 group pr-3 sm:pr-4 nav-item-cascade"
              style={{ animationDelay: hasBooted ? "0ms" : "300ms" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src="/ic-wordmark-yellow.svg"
                alt="IC Vacation"
                className="h-6 sm:h-7 w-auto transition-transform group-hover:scale-[1.04]"
              />
            </Link>

            {/* Desktop nav — centered, evenly spaced, Anton-style hover underline */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-7 xl:gap-9">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link nav-item-cascade ${isActive(link.href) ? "is-active" : ""}`}
                  style={{ animationDelay: hasBooted ? "0ms" : `${380 + i * 60}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right side CTA */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 pl-3">
              <button
                onClick={openContact}
                className="nav-link nav-item-cascade"
                style={{ animationDelay: hasBooted ? "0ms" : "780ms" }}
                type="button"
              >
                Contact
              </button>
              <button
                onClick={openContact}
                type="button"
                className="btn-primary group h-9 px-4 text-[12px] rounded-full nav-item-cascade font-command tracking-[0.06em] uppercase"
                style={{ animationDelay: hasBooted ? "0ms" : "860ms" }}
              >
                Plan my trip
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile right side */}
            <div className="lg:hidden flex flex-1 items-center justify-end gap-2">
              <button
                onClick={openContact}
                type="button"
                className="btn-primary h-9 px-3 text-[11px] rounded-full font-command tracking-[0.06em] uppercase"
              >
                Plan trip
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 pointer-events-auto ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
        <div className="relative flex flex-col h-full px-7 pt-24 pb-8">
          <img
            src="/dandelion-yellow.svg"
            alt=""
            aria-hidden="true"
            className="absolute top-20 right-6 w-28 h-28 opacity-15 animate-drift-slow"
          />
          <div className="flex-1 flex flex-col justify-center gap-5 relative z-10">
            {navLinks.map((link, i) => (
              <Link
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
              </Link>
            ))}
          </div>

          <div
            className={`relative z-10 flex flex-col gap-3 pt-8 border-t border-white/10 transition-all duration-500 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openContact();
              }}
              type="button"
              className="btn-primary w-full justify-center h-14 text-base rounded-full font-command tracking-[0.08em] uppercase"
            >
              Plan my trip
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
