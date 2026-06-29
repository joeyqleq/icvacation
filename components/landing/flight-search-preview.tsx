"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Plane, Search, Users, Ship, Building2, Map } from "lucide-react";
import { PixelButton } from "@/components/site/pixel-button";
import { useContact } from "@/components/site/contact-provider";
import { AnimatedMascotBird } from "@/components/site/animated-mascot-bird";

interface Location {
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
}

interface Route {
  id: string;
  type: "flight" | "cruise" | "hotel";
  title: string;
  from: Location;
  to: Location;
  path: string;
  duration: string;
  priceEstimate: string;
  description: string;
  highlights: string[];
}

export function FlightSearchPreview() {
  const [activeTab, setActiveTab] = useState<"flight" | "hotel" | "cruise" | "all">("all");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { openContact } = useContact();

  // Fetch routes from API
  useEffect(() => {
    async function loadRoutes() {
      try {
        const res = await fetch("/api/travel-search");
        const data = await res.json();
        if (data.routes) {
          setRoutes(data.routes);
          setFilteredRoutes(data.routes);
          if (data.routes.length > 0) {
            setSelectedRoute(data.routes[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load routes", err);
      } finally {
        setLoading(false);
      }
    }
    loadRoutes();
  }, []);

  // Filter routes based on query & activeTab
  useEffect(() => {
    let list = routes;
    if (activeTab !== "all") {
      list = list.filter((r) => r.type === activeTab);
    }
    if (fromQuery.trim()) {
      list = list.filter((r) =>
        r.from.name.toLowerCase().includes(fromQuery.toLowerCase())
      );
    }
    if (toQuery.trim()) {
      list = list.filter((r) =>
        r.to.name.toLowerCase().includes(toQuery.toLowerCase())
      );
    }
    setFilteredRoutes(list);
    // Auto select first match if selectedRoute is not in the list
    if (list.length > 0 && (!selectedRoute || !list.some((r) => r.id === selectedRoute.id))) {
      setSelectedRoute(list[0]);
    } else if (list.length === 0) {
      setSelectedRoute(null);
    }
  }, [activeTab, fromQuery, toQuery, routes]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simply forces the effect run (already live)
  };

  return (
    <section
      id="flight-search-preview"
      className="relative border-t border-foreground/10 bg-background py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(ellipse_55%_45%_at_80%_20%,rgba(255,229,0,0.06),transparent_68%)]" />
      
      <div
        className="hidden xl:block absolute inset-x-0 top-6 h-56 overflow-visible pointer-events-none z-[2]"
        aria-hidden="true"
      >
        <AnimatedMascotBird className="absolute left-[-7rem] top-4 w-36 xl:w-40" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left info column */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-3 label-ticker text-white/55 mb-6">
              <span className="w-10 h-px bg-brand-green/60" />
              [ 04 ] // Travel search engine
            </span>
            <h2
              className="leading-[0.92] mb-6"
              style={{ fontSize: "clamp(2.2rem, 5.7vw, 5.4rem)", textWrap: "balance" }}
            >
              <span className="premium-heading block">Search like a tool.</span>
              <span className="premium-heading-yellow block">Plan like a human.</span>
            </h2>
            <p className="font-editorial text-[18px] lg:text-[20px] leading-[1.55] text-white/80 max-w-xl mb-8">
              This unified booking assistant provides real-time route path visualizations 
              and direct connection logic for flights, boutique cruises, and luxury accommodations. 
              Refine your scope here and send the exact routing directly to Isaac.
            </p>

            {/* Live Stats indicator */}
            <div className="border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md rounded-sm max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow"></span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-yellow">Live Route Monitor</span>
              </div>
              <p className="text-xs text-white/60 leading-normal">
                Currently tracking curated Virtuoso flight pathways, private yacht lines in the Mediterranean, and historical ryokan access points.
              </p>
            </div>
          </div>

          {/* Right interactive search & map column */}
          <div className="lg:col-span-7 border border-white/10 bg-[#0b0b0b]/95 backdrop-blur-xl shadow-[0_30px_100px_-45px_rgba(255,229,0,0.15)] rounded-sm overflow-hidden">
            
            {/* Unified Search Tabs */}
            <div className="flex flex-wrap gap-px border-b border-white/10 bg-white/10">
              {[
                { id: "all", label: "All Travel", icon: Map },
                { id: "flight", label: "Flights", icon: Plane },
                { id: "hotel", label: "Hotels", icon: Building2 },
                { id: "cruise", label: "Cruises", icon: Ship },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-5 py-4 text-[11px] font-mono uppercase tracking-[0.22em] transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-brand-yellow text-black font-semibold"
                        : "bg-[#0b0b0b] text-white/60 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Inputs */}
            <form onSubmit={handleSearch} className="grid md:grid-cols-2 gap-px bg-white/10">
              <div className="bg-[#0b0b0b] p-5">
                <div className="flex items-center gap-3 text-brand-yellow mb-2">
                  <MapPin className="w-4 h-4" />
                  <label htmlFor="search-from" className="label-ticker-sm">Starting From</label>
                </div>
                <input
                  id="search-from"
                  type="text"
                  placeholder="e.g. Montreal, Beirut, New York"
                  value={fromQuery}
                  onChange={(e) => setFromQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-1.5 text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow/60 font-editorial text-[17px] transition-colors"
                />
              </div>

              <div className="bg-[#0b0b0b] p-5">
                <div className="flex items-center gap-3 text-brand-yellow mb-2">
                  {activeTab === "cruise" ? <Ship className="w-4 h-4" /> : activeTab === "hotel" ? <Building2 className="w-4 h-4" /> : <Plane className="w-4 h-4" />}
                  <label htmlFor="search-to" className="label-ticker-sm">Destination / Ship</label>
                </div>
                <input
                  id="search-to"
                  type="text"
                  placeholder={activeTab === "cruise" ? "Ship or port" : "City, resort, or region"}
                  value={toQuery}
                  onChange={(e) => setToQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 py-1.5 text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow/60 font-editorial text-[17px] transition-colors"
                />
              </div>
            </form>

            {/* Interactive SVG World Map Grid */}
            <div className="relative bg-[#050505] border-b border-white/10 aspect-[2/1] w-full group overflow-hidden">
              {/* Grid Background */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
                {/* Radar Concentric Rings */}
                <circle cx="50%" cy="50%" r="100" fill="none" stroke="rgba(255, 229, 0, 0.05)" strokeWidth="1" />
                <circle cx="50%" cy="50%" r="200" fill="none" stroke="rgba(255, 229, 0, 0.02)" strokeWidth="1" />
              </svg>

              {/* Stylized World Continent Blobs for visual flavor */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full opacity-[0.07] text-white fill-current pointer-events-none"
              >
                {/* North America */}
                <path d="M 10,25 Q 18,22 28,30 T 35,42 T 25,52 T 18,40 Z" />
                {/* South America */}
                <path d="M 22,55 Q 26,62 28,75 T 25,90 T 18,70 T 20,58 Z" />
                {/* Eurasia & Africa */}
                <path d="M 42,22 Q 55,18 70,22 T 85,28 T 90,45 T 75,50 T 60,35 Z" />
                <path d="M 45,45 Q 52,52 58,65 T 52,85 T 42,70 T 40,55 Z" />
                {/* Australia */}
                <path d="M 78,70 Q 85,72 88,80 T 80,88 T 72,78 Z" />
              </svg>

              <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Render All Filtered Routes in Low Opacity */}
                {filteredRoutes.map((route) => {
                  const isSelected = selectedRoute && selectedRoute.id === route.id;
                  return (
                    <g key={`route-${route.id}`}>
                      <path
                        d={route.path}
                        fill="none"
                        stroke={isSelected ? "#FFE500" : "rgba(255, 255, 255, 0.15)"}
                        strokeWidth={isSelected ? 1.5 : 0.8}
                        strokeDasharray={isSelected ? "none" : "3,3"}
                        className="transition-all duration-500"
                      />
                      {isSelected && (
                        <path
                          d={route.path}
                          fill="none"
                          stroke="#FFE500"
                          strokeWidth={4}
                          className="opacity-20 blur-[2px]"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Animated plane/ship node traveling on the selected route */}
                {selectedRoute && (
                  <path
                    d={selectedRoute.path}
                    fill="none"
                    stroke="#FFE500"
                    strokeWidth={2}
                    strokeDasharray="10, 100"
                    strokeDashoffset="100"
                    className="animate-[dash_6s_linear_infinite]"
                  />
                )}

                {/* Render Location Nodes */}
                {routes.map((route) => {
                  const isSourceSelected = selectedRoute && (selectedRoute.from.name === route.from.name || selectedRoute.to.name === route.from.name);
                  const isDestSelected = selectedRoute && (selectedRoute.from.name === route.to.name || selectedRoute.to.name === route.to.name);
                  
                  return (
                    <g key={`nodes-${route.id}`}>
                      {/* Source point */}
                      <circle
                        cx={route.from.x}
                        cy={route.from.y}
                        r={isSourceSelected ? 3 : 1.8}
                        className={`transition-all duration-300 ${isSourceSelected ? "fill-brand-yellow" : "fill-white/40"}`}
                      />
                      {isSourceSelected && (
                        <circle
                          cx={route.from.x}
                          cy={route.from.y}
                          r={6}
                          fill="none"
                          stroke="#FFE500"
                          strokeWidth={0.5}
                          className="animate-ping"
                        />
                      )}

                      {/* Destination point */}
                      <circle
                        cx={route.to.x}
                        cy={route.to.y}
                        r={isDestSelected ? 3 : 1.8}
                        className={`transition-all duration-300 ${isDestSelected ? "fill-brand-yellow" : "fill-white/40"}`}
                      />
                      {isDestSelected && (
                        <circle
                          cx={route.to.x}
                          cy={route.to.y}
                          r={6}
                          fill="none"
                          stroke="#FFE500"
                          strokeWidth={0.5}
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Map Floating HUD Overlay */}
              {selectedRoute && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/85 border border-white/10 backdrop-blur-md p-3 flex flex-wrap items-center justify-between gap-3 text-white z-20 rounded-sm">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-brand-yellow text-black font-semibold tracking-wider rounded-sm">
                      {selectedRoute.type}
                    </span>
                    <span className="text-xs font-mono tracking-tight text-white/90">
                      {selectedRoute.from.name.split(",")[0]} → {selectedRoute.to.name.split(",")[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-white/50">
                    <span>{selectedRoute.duration}</span>
                    <span className="text-brand-yellow font-semibold">{selectedRoute.priceEstimate}</span>
                  </div>
                </div>
              )}

              {/* Empty state hud */}
              {!selectedRoute && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs text-white z-20">
                  <p className="text-sm font-mono text-white/50 uppercase tracking-widest">No routes match query</p>
                </div>
              )}
            </div>

            {/* Results list and lens view */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
                <div>
                  <p className="font-display text-white text-2xl tracking-tight">
                    {activeTab === "all" ? "Unified" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} search results
                  </p>
                  <p className="text-xs text-white/48">Interactive routing system. Click card to display route path.</p>
                </div>
                <button
                  type="button"
                  onClick={openContact}
                  className="inline-flex items-center justify-center gap-2 border border-brand-yellow/40 px-4 py-2.5 text-xs font-mono uppercase tracking-[0.18em] text-brand-yellow hover:bg-brand-yellow hover:text-black transition-all duration-300"
                >
                  <Search className="w-3.5 h-3.5" />
                  Request itinerary
                </button>
              </div>

              {/* Results List */}
              {loading ? (
                <div className="py-12 text-center text-white/40 font-mono text-xs uppercase tracking-widest">
                  Querying routes database...
                </div>
              ) : filteredRoutes.length > 0 ? (
                <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                  {filteredRoutes.map((result) => {
                    const isSelected = selectedRoute && selectedRoute.id === result.id;
                    return (
                      <div
                        key={result.id}
                        onClick={() => setSelectedRoute(result)}
                        className={`grid sm:grid-cols-[1fr_auto] gap-3 border p-4 cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? "border-brand-yellow bg-brand-yellow/[0.04]"
                            : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        <div>
                          <p className="font-display text-white text-lg tracking-tight flex items-center gap-2">
                            {result.from.name.split(",")[0]}
                            <span className="text-white/40 text-sm">→</span>
                            {result.to.name.split(",")[0]}
                          </p>
                          <p className="font-editorial italic text-white/58 text-sm mt-1">{result.description}</p>
                          
                          {/* Highlights */}
                          {isSelected && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {result.highlights.map((h, idx) => (
                                <span key={idx} className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 bg-white/5 text-white/70 rounded-xs">
                                  {h}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end justify-between text-right">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-yellow font-semibold">
                            {result.priceEstimate}
                          </span>
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest mt-1">
                            {result.duration}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-white/40 border border-dashed border-white/10 rounded-sm">
                  <p className="font-editorial italic text-base text-white/50 mb-2">"No matching itineraries found"</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">Try checking spelling or choose another tab</p>
                </div>
              )}

              {/* Bottom Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 flex-wrap">
                <PixelButton variant="yellow" onClick={openContact}>
                  Send selected routing
                  <ArrowUpRight className="w-4 h-4" />
                </PixelButton>
                <PixelButton variant="grey" href="/liam">
                  Ask Liam AI instead
                  <ArrowUpRight className="w-4 h-4" />
                </PixelButton>
                <PixelButton variant="grey" href="/contact">
                  Open planning form
                </PixelButton>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
