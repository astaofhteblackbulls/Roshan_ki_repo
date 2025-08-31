"use client"

import Image from "next/image"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useGallery } from "@/lib/store"

export default function GalleryPage() {
  const { data: gallery = [] } = useGallery()
  const items = [...gallery].sort((a, b) => a.order - b.order)
  const [active, setActive] = useState<number | null>(null)

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActive(idx)}
              className="group overflow-hidden rounded-2xl border"
              aria-label={`Open ${item.title}`}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image || "/placeholder.svg?height=400&width=600&query=gallery"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-3 text-left">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  {item.location ? `${item.location} • ` : ""}
                  {item.sqft ? `${item.sqft} sq ft • ` : ""}
                  {item.date ?? ""}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
      <SiteFooter />

      <Dialog open={active !== null} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-3xl">
          {active !== null && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={items[active].image || "/placeholder.svg?height=600&width=900&query=gallery"}
                alt={items[active].title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
