import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">About</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          We provide turnkey RCC and precast boundary wall solutions with fast installation and proven durability.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary">Durable</Badge>
          <Badge variant="secondary">Fast Install</Badge>
          <Badge variant="secondary">Cost-effective</Badge>
          <Badge variant="secondary">Warranty</Badge>
        </div>
        <div className="mt-10 rounded-2xl border p-6">
          <div className="text-2xl font-semibold">1,00,000+ sq ft installed</div>
          <p className="text-muted-foreground">Trusted by industrial and residential clients across the city.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
