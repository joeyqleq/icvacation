import type { Metadata } from "next";
import { LiamClient } from "./liam-client";

export const metadata: Metadata = {
  title: "Liam AI — Your Personal Travel Consultant · IC Vacation",
  description: "Chat with Liam, IC Vacation's AI travel consultant. Personalized cruise planning, destination discovery, luxury hotels, and boutique vacation design — shaped around you.",
};

export default function LiamPage() {
  return <LiamClient />;
}
