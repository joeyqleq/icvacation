import { ReactNode } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

/**
 * PageShell — wraps every secondary route with the same Navigation + Footer
 * + ambient dandelion accent layer used on the homepage.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      {children}
      <FooterSection />
    </main>
  );
}
