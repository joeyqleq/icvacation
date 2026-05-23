"use client";

import Script from "next/script";

/**
 * Site analytics — Tianji + Matomo
 *
 * - Tianji: simple <script defer> bootstrap with website id.
 * - Matomo: needs to push config into window._paq before loading matomo.js.
 *           Cross-domain linking + cookie domains preserved exactly from the
 *           user-supplied snippet.
 */
export function SiteAnalytics() {
  return (
    <>
      {/* Tianji */}
      <Script
        async
        defer
        strategy="afterInteractive"
        src="https://tianji.myhayat.app/tracker.js"
        data-website-id="cmp55csod00dj8lxcvvwj78rs"
      />

      {/* Matomo (P5N analytics) */}
      <Script id="matomo-init" strategy="afterInteractive">
        {`
          var _paq = window._paq = window._paq || [];
          _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
          _paq.push(["setCookieDomain", "*.icvacation.com"]);
          _paq.push(["setDomains", ["*.icvacation.com","*.staging.icvacation.com","*.www.icvacation.com"]]);
          _paq.push(["enableCrossDomainLinking"]);
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//matomo.myhayat.app/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '10']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>

      {/* Matomo no-script fallback */}
      <noscript>
        <p>
          <img
            referrerPolicy="no-referrer-when-downgrade"
            src="//matomo.myhayat.app/matomo.php?idsite=10&rec=1"
            style={{ border: 0 }}
            alt=""
          />
        </p>
      </noscript>
    </>
  );
}
