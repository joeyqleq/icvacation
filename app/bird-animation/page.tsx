import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { BirdAnimationStage } from "@/components/site/bird-animation-stage";

export const metadata: Metadata = {
  title: "Bird Animation · IC Vacation",
  description: "Temporary IC Vacation mascot bird animation render.",
};

export default function BirdAnimationPage() {
  return (
    <PageShell>
      <BirdAnimationStage />
    </PageShell>
  );
}
