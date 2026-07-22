/**
 * CMS-ready content for the /crypto vertical.
 * Edit values here to update the page without touching layout.
 * When a CMS arrives, map entries 1:1 to these shapes.
 */

export type ProofStat = {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  /** Display string when value alone is not enough (e.g. "1 team") */
  displaySuffix?: string;
  label: string;
};

export type ServiceCard = {
  id: string;
  number: string;
  category: string;
  title: string;
  body: string;
  /** Maps to a lucide icon in components/crypto/Services.tsx — keeps content JSON-serializable for CMS. */
  iconKey: "users" | "zap" | "sparkles" | "messages";
};

export type ResultCard = {
  id: string;
  /**
   * Honesty rule: "crypto" = a real crypto-client case study (cleared for public claim).
   * "transferable" = proof from adjacent work, framed as transferable discipline.
   * Cards of type "crypto" always render above transferable ones.
   */
  type: "crypto" | "transferable";
  brand: string;
  value: number;
  suffix?: string;
  metricLabel: string;
  framing: string;
};

export const cryptoSeo = {
  title: "Crypto Marketing Agency | Web3 KOL & Token Launch | Kidan",
  description:
    "Crypto brands do not need another agency. Kidan runs launches for tokens, exchanges, wallets and Web3 products — strategy, creative, creators and paid media on one team.",
  keywords: [
    "crypto marketing agency",
    "Web3 KOL agency",
    "token launch marketing",
  ],
} as const;

export const cryptoHero = {
  headlineLead: "Crypto brands do not need another agency.",
  headlineAccent:
    "They need a team that moves at market speed and proves every dollar.",
  subline:
    "We run launches for tokens, exchanges, wallets and Web3 products. Strategy, creative, creators and paid media, on one team, built to work inside the platform rules that slow everyone else down.",
  secondaryCta: {
    label: "See how we work",
    href: "#how",
  },
} as const;

export const cryptoTickerPhrases = [
  "NEW ROUTE /crypto",
  "60,000+ CREATOR NETWORK",
  "KOL",
  "PAID",
  "CREATIVE",
  "COMMUNITY",
  "COMPLIANCE-AWARE ADS",
] as const;

/** Single string for CurvedLoop — phrases joined for path readability */
export const cryptoCurvedMarqueeText = cryptoTickerPhrases.join("  ✦  ");

export const cryptoProofStats: ProofStat[] = [
  {
    id: "creators",
    value: 60,
    suffix: "k+",
    label: "Creators we can route by audience",
  },
  {
    id: "bactrack",
    value: 400,
    suffix: "%",
    label: "Revenue growth, BACtrack",
  },
  {
    id: "markets",
    value: 3,
    label: "Markets live: UAE, UK, US",
  },
  {
    id: "team",
    value: 1,
    displaySuffix: " team",
    label: "Strategy to paid, no vendor handoffs",
  },
];

export const cryptoProblem = {
  eyebrow: "The problem we solve",
  paragraphs: [
    "Most crypto marketing fails in one of two places. The ad accounts get restricted before the campaign scales, or the KOLs post once, take the fee, and vanish. You are left with a spike that dies by the weekend and no way to tell which dollar worked.",
    "We built the other version. A creator network of sixty thousand we can route by audience, a paid team that knows which channels approve crypto and which will ban you, and dashboards that tie every view back to a wallet or a signup. You see the mechanism, not just the invoice.",
  ],
} as const;

export const cryptoServices: ServiceCard[] = [
  {
    id: "creator-kol",
    number: "01",
    category: "CREATOR AND KOL CAMPAIGNS",
    title: "Route your launch through creators your buyers already trust.",
    body: "Sixty thousand creators across TikTok, Instagram, YouTube and X. We match by audience, brief so the message survives the edit, and measure each creator on their own numbers. No spray, no one-post-and-gone.",
    iconKey: "users",
  },
  {
    id: "performance-paid",
    number: "02",
    category: "PERFORMANCE AND PAID",
    title:
      "Paid media that lives inside the rules, not one violation from a ban.",
    body: "We run across the channels that approve crypto and the native networks built for it. Every campaign is tracked to on-chain and off-chain conversions, so spend follows what actually brings holders in.",
    iconKey: "zap",
  },
  {
    id: "brand-creative",
    number: "03",
    category: "BRAND AND CREATIVE",
    title:
      "Positioning you can say in a sentence, and video at the volume the feed demands.",
    body: "Our studio turns a whitepaper into a story a normal person understands, then produces the high-volume video that keeps a token in the conversation past launch week.",
    iconKey: "sparkles",
  },
  {
    id: "community-growth",
    number: "04",
    category: "COMMUNITY AND GROWTH",
    title:
      "A community that holds, not a Discord that empties after the airdrop.",
    body: "Ambassador programs, Telegram and Discord growth, and always-on content that gives holders a reason to stay. We build the room and we keep it warm.",
    iconKey: "messages",
  },
];

export const cryptoCompliance = {
  paragraphs: [
    "We market crypto the way it should be marketed. Clear disclosure on paid creator posts, no promises of returns, and regional gating where a jurisdiction requires it. We know which ad platforms approve digital assets and which will freeze your account, and we plan around that from day one.",
    "Your account staying live is part of the deliverable, not an afterthought.",
  ],
} as const;

export const cryptoClosing = {
  headline:
    "Tell us what you are launching. We will tell you how we would run it.",
  subline:
    "One call, no deck theatre. You leave with a real view of the first ninety days.",
} as const;

/**
 * Network fluency strip (PRD flourish).
 * Only list chains we can genuinely run campaigns for — edit this array
 * when Daniel confirms; never add a chain for decoration.
 */
export const cryptoNetworks = {
  confirmed: true,
  eyebrow: "Ecosystems we can service",
  chains: [
    "Ethereum",
    "Solana",
    "Base",
    "Bitcoin",
    "BNB Chain",
    "Polygon",
    "Arbitrum",
    "TON",
  ],
} as const;

/**
 * Proof for the Results section. Framed honestly: these are transferable results
 * from adjacent client work, not invented crypto claims. When a real crypto case
 * study is cleared, add it with type: "crypto" and it renders first — no code change.
 */
export const cryptoResults: ResultCard[] = [
  {
    id: "bactrack",
    type: "transferable",
    brand: "BACtrack",
    value: 400,
    suffix: "%",
    metricLabel: "revenue growth",
    framing:
      "The same paid-media discipline we apply to token campaigns — tracked to the conversion, scaled on what works.",
  },
  {
    id: "nutriseed",
    type: "transferable",
    brand: "Nutriseed",
    value: 350,
    suffix: "%",
    metricLabel: "sales increase",
    framing:
      "A creator programme playbook that maps 1:1 to KOL launches — matched by audience, measured per creator.",
  },
];

export const cryptoLaunchSteps = [
  {
    id: "strategy",
    title: "Strategy call",
    body: "We map the launch goal, audience, geography, and the platform rules that apply — before a single creative goes live.",
  },
  {
    id: "build",
    title: "Campaign build",
    body: "Creators, creative, and paid structure are built as one system, tracked to the conversions that matter for your token or product.",
  },
  {
    id: "live",
    title: "Live",
    body: "Campaigns go live with compliance and account safety treated as part of the deliverable, not an afterthought.",
  },
  {
    id: "measure",
    title: "Measurement",
    body: "You see which creators and channels moved holders or signups — so spend follows what works.",
  },
] as const;
