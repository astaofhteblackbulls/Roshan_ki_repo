"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const WA_LINK =
  "https://wa.me/919870839225?text=" + encodeURIComponent("Hello Balaji Boundary Walls, I have a query/order.")

export function FloatingWhatsApp() {
  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Button asChild size="lg" className="rounded-full shadow-lg" variant="default">
        <Link href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Order or Query">
          <MessageCircle className="mr-2 h-5 w-5" />
          WhatsApp
        </Link>
      </Button>
    </div>
  )
}
