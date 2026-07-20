import type { Metadata } from "next";
import { Hero } from "@/components/crypto/Hero";
import { Ticker } from "@/components/crypto/Ticker";
import { ProofBar } from "@/components/crypto/ProofBar";
import { Problem } from "@/components/crypto/Problem";
import { Services } from "@/components/crypto/Services";
import { Networks } from "@/components/crypto/Networks";
import { LaunchFlow } from "@/components/crypto/LaunchFlow";
import { Compliance } from "@/components/crypto/Compliance";
import { Closing } from "@/components/crypto/Closing";
import { PageNoise } from "@/components/crypto/PageNoise";
import { cryptoSeo } from "@/content/crypto";

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
    <main className="relative min-h-screen bg-kidan-ink text-white selection:bg-kidan-indigo/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageNoise />
      <div className="relative z-[2]">
        <Hero />
        <Ticker />
        <ProofBar />
        <Problem />
        <Services />
        <Networks />
        <LaunchFlow />
        <Compliance />
        <Closing />
      </div>
    </main>
  );
}
