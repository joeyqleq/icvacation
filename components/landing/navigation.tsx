"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContact } from "@/components/site/contact-provider";

const navLinks = [
  { name: "Home",         href: "/"                         },
  { name: "Cruises",      href: "/cruises"                  },
  { name: "Hotels",       href: "/hotels-resorts"           },
  { name: "Flights",      href: "/flights-packages"         },
  { name: "Destinations", href: "/destinations"             },
  { name: "Liam AI",      href: "/liam"                     },
  { name: "Journal",      href: "/blog"                     },
  { name: "About",        href: "/about-isaac"              },
];

export function Navigation({ splashDone }: { splashDone?: boolean }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(pathname !== "/");
  const [hasBooted, setHasBooted] = useState(pathname !== "/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { openContact } = useContact();

  // When splash finishes, expand the nav immediately
  useEffect(() => {
    if (splashDone && pathname === "/" && !expanded) {
      setExpanded(true);
      setTimeout(() => setHasBooted(true), 950);
    }
  }, [splashDone, pathname, expanded]);

  // Scroll triggers expansion too
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (window.scrollY > 80 && !expanded) {
          setExpanded(true);
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

  // Non-homepage routes auto-expand immediately
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

  const triggerExpand = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => setHasBooted(true), 950);
    }
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
      style={{ opacity: (pathname === "/" && !splashDone) ? 0 : 1, transition: "opacity 0.5s ease" }}
    >
      <div className="flex justify-center pt-3 sm:pt-5">
        {/* === ORB MODE === */}
        {!expanded ? (
          <div
            className="nav-orb nav-orb-gradient pointer-events-auto relative flex items-center justify-center rounded-full cursor-pointer"
            style={{ width: 120, height: 120 }}
            role="banner"
            aria-label="IC Vacation — scroll to enter"
            onMouseEnter={triggerExpand}
            onClick={triggerExpand}
          >
            <div className="nav-orb-spin w-[60%] h-[60%] relative">
              <img
                src="/dandelion-yellow.svg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain drop-shadow-[0_0_16px_rgba(255,229,0,0.6)]"
                draggable={false}
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute w-2.5 h-2.5 rounded-full pulse-green"
              style={{ boxShadow: "0 0 18px rgba(38, 252, 0, 0.9)" }}
            />
          </div>
        ) : (
          <nav
            key="pill"
            className={`nav-island pointer-events-auto flex items-center rounded-full transition-all duration-500
              h-12 sm:h-14 px-3 sm:px-5 max-w-[1320px] w-[calc(100%-1.5rem)] mx-auto
              ${hasBooted ? "" : "terminal-boot"}
            `}
            aria-label="Primary"
          >
            {/* Logo lockup */}
            <Link
              href="/"
              aria-label="IC Vacation home"
              className="flex items-center shrink-0 group pr-4 xl:pr-8 nav-item-cascade"
              style={{ animationDelay: hasBooted ? "0ms" : "300ms" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src="/ic-wordmark-yellow.svg"
                alt="IC Vacation"
                className="h-7 lg:h-8 xl:h-9 w-auto transition-transform group-hover:scale-[1.04]"
              />
            </Link>

            {/* Desktop nav — centered, evenly spaced, Anton-style hover underline */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-2 xl:gap-4">
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

            {/* Right side CTA — shimmer phone button */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 pl-2">
              <button
                onClick={openContact}
                className="nav-link nav-item-cascade"
                style={{ animationDelay: hasBooted ? "0ms" : "780ms" }}
                type="button"
              >
                Contact
              </button>
              <a
                href="tel:+14078101670"
                className="nav-phone-cta nav-shimmer-pill nav-item-cascade"
                style={{ animationDelay: hasBooted ? "0ms" : "860ms" }}
              >
                <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] xl:text-[12px] font-command tracking-[0.04em]">(407) 810-1670</span>
                  <span className="hidden xl:block text-[9px] font-mono tracking-[0.02em] opacity-75 mt-[2px]">Unforgettable Experiences</span>
                </span>
              </a>
            </div>

            {/* Mobile right side */}
            <div className="lg:hidden flex flex-1 items-center justify-end gap-2">
              <a
                href="tel:+14078101670"
                className="nav-phone-cta nav-phone-cta--mobile"
              >
                <Phone className="w-3 h-3 shrink-0" strokeWidth={2.5} />
                <span className="text-[10px] font-command tracking-[0.04em]">Call</span>
              </a>
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
            <a
              href="tel:+14078101670"
              className="nav-phone-cta w-full justify-center h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone className="w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span className="flex flex-col items-center leading-none">
                <span className="text-[14px] font-command tracking-[0.04em]">(407) 810-1670</span>
                <span className="text-[10px] font-mono tracking-[0.02em] opacity-75 mt-[2px]">Call For Unforgettable Experiences</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
