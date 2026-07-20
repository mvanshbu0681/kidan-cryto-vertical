"use client";

import CurvedLoop from "@/components/react-bits/CurvedLoop";
import { cryptoCurvedMarqueeText } from "@/content/crypto";

export function Ticker() {
  return (
    <section
      className="w-full overflow-hidden border-y border-kidan-navymid bg-kidan-obsidian/70"
      aria-label="Crypto vertical ticker"
    >
      <div className="w-full [mask-image:linear-gradient(to_right,transparent,white_2%,white_98%,transparent)]">
        <CurvedLoop
          marqueeText={`${cryptoCurvedMarqueeText}  ✦  `}
          speed={1.65}
          curveAmount={58}
          direction="left"
          interactive={true}
          className="curved-loop-kidan"
        />
      </div>
    </section>
  );
}
