"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
]

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-xl">
          Balaji Boundary Walls
          <span className="sr-only">Go to home</span>
        </Link>
        <nav className="hidden gap-2 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm",
                pathname === item.href ? "bg-muted font-medium" : "hover:bg-muted/60",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="md:hidden">
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </header>
  )
}
