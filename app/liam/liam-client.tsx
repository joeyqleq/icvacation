"use client";
import { useState, useEffect } from "react";
import { DestinationProvider } from "@/components/liam/destination-context";
import { SearchPanel } from "@/components/liam/search-panel";
import { ChatPanel } from "@/components/liam/chat-panel";
import { Navigation } from "@/components/landing/navigation";
import { MessageSquare, Map, Plane, Hotel, BarChart2 } from "lucide-react";

type MobileTab = "chat" | "map" | "flights" | "cruises" | "hotels" | "utilities";
type SearchTabId = "map" | "flights" | "cruises" | "hotels" | "utilities";

const BOTTOM_NAV: { id: MobileTab; label: string; Icon: React.ElementType }[] = [
  { id: "chat",      label: "Chat",    Icon: MessageSquare },
  { id: "map",       label: "Map",     Icon: Map           },
  { id: "flights",   label: "Flights", Icon: Plane         },
  { id: "hotels",    label: "Hotels",  Icon: Hotel         },
  { id: "utilities", label: "Tools",   Icon: BarChart2     },
];

export function LiamClient() {
  const [mobileTab, setMobileTab] = useState<MobileTab>("chat");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isSearchTab = mobileTab !== "chat";
  const searchTabId: SearchTabId = isSearchTab ? (mobileTab as SearchTabId) : "map";

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050505] overflow-hidden">
      <Navigation splashDone />
      <DestinationProvider>
        {/* Sub-header */}
        <div className="flex-shrink-0 border-b border-white/10 bg-black/50 backdrop-blur px-4 md:px-6 py-2 md:py-2.5 flex items-center gap-3 mt-[56px]">
          <span className="hidden sm:block font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">[ AI ]</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-black border border-[#26FC00]/30 overflow-hidden flex-shrink-0">
              <img src="/liam-ai_logo.png" alt="Liam AI" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-sans font-bold text-base md:text-xl tracking-tight leading-none">
              <span className="text-white">Liam </span><span className="text-[#26FC00]">AI</span>
            </h1>
          </div>
          <span className="hidden lg:block font-mono text-[9px] tracking-[0.2em] text-white/30">
            // Travel Consultant · IC Vacation
          </span>
          <p className="hidden lg:block ml-auto font-serif italic text-sm text-white/35">
            Your personalized boutique vacation, shaped by Liam. Delivered by Isaac.
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Search/map panel — desktop: always visible 42%; mobile: visible when search tab active */}
          <div
            className={`overflow-hidden border-white/10 flex-shrink-0
              md:block md:w-[42%] md:border-r
              ${isSearchTab ? "flex-1 block" : "hidden"}
            `}
          >
            <SearchPanel
              externalTab={isMobile ? searchTabId : undefined}
              hideTabs={isMobile}
            />
          </div>

          {/* Chat panel — desktop: always visible; mobile: visible when chat tab active */}
          <div
            className={`overflow-hidden md:flex md:flex-1
              ${mobileTab === "chat" ? "flex flex-1" : "hidden"}
            `}
          >
            <ChatPanel />
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <nav
          className="md:hidden flex-shrink-0 border-t border-white/10 bg-[#050505]/95 backdrop-blur"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex">
            {BOTTOM_NAV.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setMobileTab(id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                  mobileTab === id
                    ? "text-[#26FC00]"
                    : "text-white/35 active:text-white/60"
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                <span className="font-mono text-[7px] tracking-[0.12em] uppercase">{label}</span>
              </button>
            ))}
          </div>
        </nav>
      </DestinationProvider>
    </div>
  );
}
