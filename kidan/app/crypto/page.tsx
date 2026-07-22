import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/crypto/Hero";
import { Ticker } from "@/components/crypto/Ticker";
import { ProofBar } from "@/components/crypto/ProofBar";
import { PageNoise } from "@/components/crypto/PageNoise";
import { ScrollDepthTracker } from "@/components/crypto/ScrollDepthTracker";
import { cryptoSeo } from "@/content/crypto";

/**
 * Below-fold sections are code-split so the first paint stays light.
 * Hero + Ticker + ProofBar stay eager (above / near fold).
 */
const Problem = dynamic(() =>
  import("@/components/crypto/Problem").then((m) => ({ default: m.Problem }))
);
const Services = dynamic(() =>
  import("@/components/crypto/Services").then((m) => ({ default: m.Services }))
);
const Networks = dynamic(() =>
  import("@/components/crypto/Networks").then((m) => ({ default: m.Networks }))
);
const LaunchFlow = dynamic(() =>
  import("@/components/crypto/LaunchFlow").then((m) => ({
    default: m.LaunchFlow,
  }))
);
const Compliance = dynamic(() =>
  import("@/components/crypto/Compliance").then((m) => ({
    default: m.Compliance,
  }))
);
const Results = dynamic(() =>
  import("@/components/crypto/Results").then((m) => ({ default: m.Results }))
);
const Closing = dynamic(() =>
  import("@/components/crypto/Closing").then((m) => ({ default: m.Closing }))
);

export const metadata: Metadata = {
  title: cryptoSeo.title,
  description: cryptoSeo.description,
  keywords: [...cryptoSeo.keywords],
  openGraph: {
    title: cryptoSeo.title,
    description: cryptoSeo.description,
    type: "website",
    url: "/crypto",
  },
  twitter: {
    card: "summary_large_image",
    title: cryptoSeo.title,
    description: cryptoSeo.description,
  },
  alternates: {
    canonical: "/crypto",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kidan Crypto Marketing",
  description: cryptoSeo.description,
  url: "https://www.kidanagency.com/crypto",
  areaServed: ["AE", "GB", "US"],
  serviceType: [
    "Crypto marketing agency",
    "Web3 KOL agency",
    "Token launch marketing",
  ],
  provider: {
    "@type": "Organization",
    name: "Kidan",
    url: "https://www.kidanagency.com",
  },
};

export default function CryptoPage() {
  return (
    <main className="relative min-h-screen text-white selection:bg-kidan-indigo/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global background image — visible across all sections (brief depth). */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/background.jpg)" }}
      />
      {/* Light ink scrim for text contrast without blurring the image. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] bg-kidan-ink/25"
      />

      <PageNoise />
      <ScrollDepthTracker />

      <div className="relative z-[2]">
        <Hero />
        <Ticker />
        <ProofBar />
        <Problem />
        <Services />
        <Networks />
        <LaunchFlow />
        <Compliance />
        <Results />
        <Closing />
      </div>
    </main>
  );
}
