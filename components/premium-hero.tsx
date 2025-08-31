"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PremiumHeroProps = {
  headline?: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
  images?: string[]
  className?: string
}

export default function PremiumHero({
  headline = "Balaji Boundary Walls",
  subheadline = "Durable. Fast to install. Built to last.",
  ctaLabel = "Get a Free Quote",
  ctaHref = "/contact",
  images = [
    "/images/bg-ornamental-fence.jpg",
    "/images/bg-panels-close.jpg",
    "/images/bg-field-1.jpg",
    "/images/bg-industrial-line.jpg",
    "/images/bg-field-2.jpg",
  ],
  className,
}: PremiumHeroProps) {
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-none md:rounded-xl",
        "min-h-[60vh] md:min-h-[72vh] lg:min-h-[78vh]",
        "bg-black",
        className,
      )}
      aria-label="Premium hero"
    >
      {/* Background images crossfade */}
      <div className="absolute inset-0 -z-10">
        {images.map((src, i) => (
          <div
            key={src + i}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "saturate(0.9) contrast(1.05)",
            }}
            aria-hidden="true"
          />
        ))}
        {/* Solid overlay (no gradients) */}
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-start justify-center gap-6 px-4 py-20 sm:px-6 md:py-24 lg:py-28">
        <div className="max-w-2xl space-y-4 text-white">
          <h1 className="text-pretty font-sans text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {headline}
          </h1>
          <p className="text-pretty font-sans text-sm leading-relaxed text-slate-200 sm:text-base md:text-lg">
            {subheadline}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild className="bg-amber-500 text-slate-900 hover:bg-amber-400">
            <a href={ctaHref} aria-label={ctaLabel}>
              {ctaLabel}
            </a>
          </Button>
          <a
            href="https://wa.me/919999999999?text=Hi%20I%27m%20interested%20in%20precast%20boundary%20walls"
            className="text-sm font-medium text-white underline underline-offset-4 hover:text-slate-200"
            aria-label="Chat on WhatsApp"
          >
            Chat on WhatsApp
          </a>
        </div>
        <ul className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-200">
          <li className="rounded-full bg-white/10 px-3 py-1">ISO-grade mix</li>
          <li className="rounded-full bg-white/10 px-3 py-1">Rapid install</li>
          <li className="rounded-full bg-white/10 px-3 py-1">Low maintenance</li>
          <li className="rounded-full bg-white/10 px-3 py-1">Custom designs</li>
        </ul>
      </div>
    </section>
  )
}
