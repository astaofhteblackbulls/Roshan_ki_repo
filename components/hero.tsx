"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useContent } from "@/lib/store"

const WA_LINK =
  "https://wa.me/919870839225?text=" + encodeURIComponent("Hello Balaji Boundary Walls, I have a query/order.")

export function Hero() {
  const { data: content } = useContent()
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-balance font-semibold tracking-tight text-3xl md:text-5xl">
          {content?.heroHeadline || "अब तक 1,00,000+ sq ft boundary walls लगा चुके हैं"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
          {content?.heroSubtext || "Turnkey RCC/precast solutions, pan-city service."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href={WA_LINK} target="_blank" rel="noopener noreferrer">
              WhatsApp Order/Query
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/products">View Products</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
