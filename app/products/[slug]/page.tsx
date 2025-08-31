import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { seedProducts } from "@/lib/seed"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

type Props = { params: { slug: string } }

export function generateMetadata({ params }: Props): Metadata {
  const product = seedProducts.find((p) => p.slug === params.slug)
  if (!product) return {}
  const title = `${product.name} | Balaji Boundary Walls`
  return {
    title,
    description: product.specs || "RCC / precast product",
    openGraph: {
      title,
      description: product.specs || "",
      images: [{ url: product.image || "/og.png", width: 1200, height: 630 }],
    },
  }
}

export default function ProductDetailPage({ params }: Props) {
  const product = seedProducts.find((p) => p.slug === params.slug && p.visible)
  if (!product) return notFound()

  const waLink =
    "https://wa.me/919870839225?text=" +
    encodeURIComponent(`Hello Balaji Boundary Walls,\nI want to order/enquire:\n${product.name}`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.specs,
    brand: { "@type": "Brand", name: "Balaji Boundary Walls" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: product.priceRange?.match(/\d+/)?.[0] ?? "0",
      highPrice: product.priceRange?.match(/\d+(?=\s*per|\s*piece)/)?.[0] ?? "0",
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border">
            <Image
              src={product.image || "/placeholder.svg?height=400&width=600&query=product"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            {product.specs && <p className="mt-2 text-muted-foreground">{product.specs}</p>}
            {product.priceRange && <p className="mt-3 font-medium">{product.priceRange}</p>}
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <Link href={waLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp to Order
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/products">Back to Products</Link>
              </Button>
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
