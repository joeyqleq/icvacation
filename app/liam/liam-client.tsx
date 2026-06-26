"use client";
import { DestinationProvider } from "@/components/liam/destination-context";
import { SearchPanel } from "@/components/liam/search-panel";
import { ChatPanel } from "@/components/liam/chat-panel";
import { Navigation } from "@/components/landing/navigation";

export function LiamClient() {
  return (
    <div className="flex flex-col h-screen bg-[#050505] overflow-hidden">
      <Navigation splashDone />
      <DestinationProvider>
        {/* Sub-header bar */}
        <div className="flex-shrink-0 border-b border-white/10 bg-black/50 backdrop-blur px-6 py-3 flex items-center justify-between mt-[56px]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">[ AI ]</span>
            <h1 className="font-sans font-bold text-white text-xl tracking-tight">Liam <span className="text-[#26FC00]">AI</span></h1>
            <span className="hidden sm:block font-mono text-[9px] tracking-[0.2em] text-white/30">// Travel Consultant · IC Vacation</span>
          </div>
          <p className="hidden lg:block font-serif italic text-sm text-white/35">
            Your personalized boutique vacation, shaped by Liam. Delivered by Isaac.
          </p>
        </div>

        {/* Main split layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Search + Map panel (42%) */}
          <div className="w-[42%] flex-shrink-0 overflow-hidden border-r border-white/10 hidden md:block">
            <SearchPanel />
          </div>
          {/* Right: Chat panel (fills remaining space) */}
          <div className="flex-1 overflow-hidden">
            <ChatPanel />
          </div>
        </div>
      </DestinationProvider>
    </div>
  );
}
