import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { BirdAnimationStage } from "@/components/site/bird-animation-stage";

export const metadata: Metadata = {
  title: "Bird Animation · IC Vacation",
  description: "Temporary IC Vacation mascot bird animation render.",
};

export default function BirdAnimationPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <BirdAnimationStage />
    </main>
  );
}
