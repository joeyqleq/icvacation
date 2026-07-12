"use client";

import Script from "next/script";

export function SiteAnalytics() {
  const enabled =
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_ENABLE_SITE_ANALYTICS === "true";

  if (!enabled) {
    return null;
  }

  return (
    <Script
      async
      defer
      strategy="afterInteractive"
      src="https://numbers.trumpstein.me/tracker.js"
      data-website-id="cmrhhwa530009lftp0ads1oex"
    />
  );
}
