"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

export function ProductCard({ product }: { product: Product }) {
  const waLink =
    "https://wa.me/919870839225?text=" +
    encodeURIComponent(`Hello Balaji Boundary Walls,\nI want to order/enquire:\n${product.name}`)
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/3]">
        <Image
          src={product.image || "/placeholder.svg?height=400&width=600&query=product"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 33vw, 100vw"
          priority={false}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {product.specs && <p>{product.specs}</p>}
        {product.priceRange && <p className="mt-1 font-medium text-foreground">{product.priceRange}</p>}
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button asChild size="sm">
          <Link href={waLink} target="_blank" rel="noopener noreferrer">
            WhatsApp to Order
          </Link>
        </Button>
        <Button asChild size="sm" variant="secondary">
          <Link href={`/products/${product.slug}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
