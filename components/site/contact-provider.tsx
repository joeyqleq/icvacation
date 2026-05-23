"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const ContactModal = dynamic(
  () => import("@/components/site/contact-modal").then((mod) => mod.ContactModal),
  { ssr: false },
);

/**
 * Site-wide context for opening the rich contact modal.  Any component
 * (CTA bands, hero buttons, footer "Write to us") can call `openContact()`
 * — guaranteeing the inquiry experience is identical everywhere.
 */
type Ctx = {
  openContact: () => void;
  closeContact: () => void;
};

const ContactCtx = createContext<Ctx | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openContact = useCallback(() => setOpen(true), []);
  const closeContact = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openContact, closeContact }), [openContact, closeContact]);

  return (
    <ContactCtx.Provider value={value}>
      {children}
      <ContactModal open={open} onOpenChange={setOpen} />
    </ContactCtx.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactCtx);
  if (!ctx) {
    // Graceful fallback — never crash if used outside provider
    return {
      openContact: () => {
        if (typeof window !== "undefined") {
          window.location.assign("/contact");
        }
      },
      closeContact: () => {},
    };
  }
  return ctx;
}
