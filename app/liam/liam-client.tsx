"use client";
import { useState } from "react";
import { DestinationProvider } from "@/components/liam/destination-context";
import { SearchPanel } from "@/components/liam/search-panel";
import { ChatPanel } from "@/components/liam/chat-panel";
import { Navigation } from "@/components/landing/navigation";
import { MessageSquare, Map } from "lucide-react";

type MobileTab = "chat" | "map";

export function LiamClient() {
  const [mobileTab, setMobileTab] = useState<MobileTab>("chat");

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050505] overflow-hidden">
      <Navigation splashDone />
      <DestinationProvider>
        {/* Sub-header bar */}
        <div className="flex-shrink-0 border-b border-white/10 bg-black/50 backdrop-blur px-4 md:px-6 py-2.5 flex items-center justify-between mt-[56px]">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">[ AI ]</span>
            <h1 className="font-sans font-bold text-white text-lg md:text-xl tracking-tight">
              Liam <span className="text-[#26FC00]">AI</span>
            </h1>
            <span className="hidden sm:block font-mono text-[9px] tracking-[0.2em] text-white/30">
              // Travel Consultant · IC Vacation
            </span>
          </div>
          <p className="hidden lg:block font-serif italic text-sm text-white/35">
            Your personalized boutique vacation, shaped by Liam. Delivered by Isaac.
          </p>

          {/* Mobile tab switcher */}
          <div className="flex md:hidden items-center gap-1 bg-white/5 border border-white/10 p-0.5">
            <button
              onClick={() => setMobileTab("chat")}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
                mobileTab === "chat"
                  ? "bg-[#26FC00] text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              Chat
            </button>
            <button
              onClick={() => setMobileTab("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
                mobileTab === "map"
                  ? "bg-[#26FC00] text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Map className="w-3 h-3" />
              Map
            </button>
          </div>
        </div>

        {/* Desktop: side-by-side split | Mobile: tab-switched */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Search + Map panel */}
          {/* Desktop: always visible at 42% | Mobile: shown when map tab active */}
          <div
            className={`
              overflow-hidden border-white/10 flex-shrink-0
              md:block md:w-[42%] md:border-r
              ${mobileTab === "map" ? "flex-1 block" : "hidden"}
            `}
          >
            <SearchPanel />
          </div>

          {/* Right: Chat panel */}
          {/* Desktop: always visible flex-1 | Mobile: shown when chat tab active */}
          <div
            className={`
              overflow-hidden
              md:flex md:flex-1
              ${mobileTab === "chat" ? "flex flex-1" : "hidden"}
            `}
          >
            <ChatPanel />
          </div>
        </div>
      </DestinationProvider>
    </div>
  );
}
