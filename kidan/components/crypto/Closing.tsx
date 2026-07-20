"use client";

import FadeContent from "@/components/react-bits/FadeContent";
import BorderGlow from "@/components/react-bits/BorderGlow";
import { BookingCta } from "@/components/crypto/BookingCta";
import { cryptoClosing } from "@/content/crypto";

export function Closing() {
  return (
    <section className="relative overflow-hidden py-32">
      <div
        className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-kidan-indigo/20 blur-[120px]"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6">
        <FadeContent>
          <BorderGlow className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-grotesk text-4xl font-bold leading-tight text-kidan-ivory md:text-5xl lg:text-6xl">
              {cryptoClosing.headline}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl font-sans text-lg text-kidan-slate md:text-xl">
              {cryptoClosing.subline}
            </p>
            <BookingCta location="closing" />
          </BorderGlow>
        </FadeContent>
      </div>
    </section>
  );
}
