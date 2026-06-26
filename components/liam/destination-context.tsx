"use client";
import { createContext, useContext, useState } from "react";

interface Destination {
  name: string;
  lat: number;
  lng: number;
}

interface DestinationCtx {
  destination: Destination | null;
  setDestination: (d: Destination | null) => void;
  history: Destination[];
}

const DestinationContext = createContext<DestinationCtx>({
  destination: null,
  setDestination: () => {},
  history: [],
});

export function DestinationProvider({ children }: { children: React.ReactNode }) {
  const [destination, setDestinationRaw] = useState<Destination | null>(null);
  const [history, setHistory] = useState<Destination[]>([]);

  function setDestination(d: Destination | null) {
    setDestinationRaw(d);
    if (d) setHistory((prev) => [...prev.slice(-9), d]);
  }

  return (
    <DestinationContext.Provider value={{ destination, setDestination, history }}>
      {children}
    </DestinationContext.Provider>
  );
}

export const useDestination = () => useContext(DestinationContext);
