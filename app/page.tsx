"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import PremiumHero from "@/components/premium-hero"
import { Badge } from "@/components/ui/badge"
import { useContent } from "@/lib/store"
import { StatsCounter } from "@/components/stats-counter"
import TranslatorToggle from "@/components/translator-toggle"

export default function HomePage() {
  const { data: content } = useContent()
  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-end">
        <TranslatorToggle />
      </div>
      <PremiumHero
        headline={content?.heroTitle || "Premium Precast Boundary Walls"}
        subheadline={content?.heroSubtext || "Durable. Fast to install. Built to last."}
        ctaLabel="Get a Free Quote"
        ctaHref="/contact"
      />
      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Feature title="Durable" />
          <Feature title="Fast Install" />
          <Feature title="Cost-effective" />
        </div>
        <div className="mt-10 rounded-2xl border p-6 text-center">
          <p className="text-2xl font-semibold">
            <StatsCounter to={content?.statsSqftInstalled ?? 100000} />+ sq ft installed
          </p>
          <p className="text-muted-foreground">{content?.heroSubtext}</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}

function Feature({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border p-6">
      <Badge variant="secondary">{title}</Badge>
      <p className="mt-2 text-sm text-muted-foreground">Premium RCC/precast quality with professional installation.</p>
    </div>
  )
}
