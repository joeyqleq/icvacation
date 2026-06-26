"use client";
import { useEffect, useRef } from "react";
import { useDestination } from "./destination-context";

export default function MapView({ className }: { className?: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const { destination } = useDestination();

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function init() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    init();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !destination) return;

    const moveTo = async () => {
      const L = (await import("leaflet")).default;
      const map = mapInstanceRef.current;

      if (markerRef.current) {
        markerRef.current.remove();
      }

      map.flyTo([destination.lat, destination.lng], 6, { duration: 1.8 });

      const marker = L.marker([destination.lat, destination.lng])
        .addTo(map)
        .bindPopup(`<b>${destination.name}</b>`, { className: "liam-popup" })
        .openPopup();

      markerRef.current = marker;
    };

    moveTo();
  }, [destination]);

  return (
    <div className={className}>
      <style>{`
        .liam-popup .leaflet-popup-content-wrapper {
          background: #0e0e0e;
          color: #f7f7f5;
          border: 1px solid #26FC00;
          border-radius: 0;
          font-family: var(--font-mono);
          font-size: 11px;
        }
        .liam-popup .leaflet-popup-tip {
          background: #26FC00;
        }
        .leaflet-container {
          background: #0a0a0a;
        }
      `}</style>
      <div ref={mapRef} style={{ width: "100%", height: "100%", background: "#0a0a0a" }} />
    </div>
  );
}
