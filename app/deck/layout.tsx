import type { Metadata } from "next";
import { FilmGrain } from "@/components/site/film-grain";

export const metadata: Metadata = {
  title: "IC Vacation — Technology Overview",
  description: "How Liam AI and SEO work together to grow IC Vacation.",
  robots: "noindex, nofollow",
};

export default function DeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f7f7f5] font-sans antialiased">
      <FilmGrain />
      {children}
    </div>
  );
}
