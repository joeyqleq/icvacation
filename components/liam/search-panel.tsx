"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Plane, Hotel, Anchor, BarChart2, Map } from "lucide-react";
import { FlightsTab } from "./flights-tab";
import { HotelsTab } from "./hotels-tab";
import { CruisesTab } from "./cruises-tab";
import { UtilitiesTab } from "./utilities-tab";

const MapView = dynamic(() => import("./map-view"), { ssr: false });

const TABS = [
  { id: "map",       label: "Map",     Icon: Map      },
  { id: "flights",   label: "Flights", Icon: Plane    },
  { id: "cruises",   label: "Cruises", Icon: Anchor   },
  { id: "hotels",    label: "Hotels",  Icon: Hotel    },
  { id: "utilities", label: "Tools",   Icon: BarChart2 },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface SearchPanelProps {
  externalTab?: TabId;
  hideTabs?: boolean;
}

export function SearchPanel({ externalTab, hideTabs = false }: SearchPanelProps) {
  const [internalTab, setInternalTab] = useState<TabId>("map");
  const activeTab = externalTab ?? internalTab;

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#050505]">
      {/* Tab bar — hidden when parent controls navigation */}
      {!hideTabs && (
        <div className="flex border-b border-white/10 bg-black/30 flex-shrink-0">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setInternalTab(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 px-1 transition-colors border-b-2 min-h-[52px] ${
                activeTab === id
                  ? "border-[#26FC00] text-[#26FC00]"
                  : "text-white/40 hover:text-white/70 border-transparent"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase">{label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Map — always mounted to preserve state */}
      <div className={`flex-1 ${activeTab === "map" ? "block" : "hidden"}`}>
        <MapView className="w-full h-full" />
      </div>

      {activeTab !== "map" && (
        <div className="flex-1 overflow-y-auto p-3 md:p-4">
          {activeTab === "flights"   && <FlightsTab />}
          {activeTab === "cruises"   && <CruisesTab />}
          {activeTab === "hotels"    && <HotelsTab />}
          {activeTab === "utilities" && <UtilitiesTab />}
        </div>
      )}
    </div>
  );
}
