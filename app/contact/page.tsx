"use client"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = `Hello Balaji Boundary Walls, I have a query/order.\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`
    const wa = "https://wa.me/919870839225?text=" + encodeURIComponent(text)
    window.open(wa, "_blank", "noopener,noreferrer")
    const mailto = `mailto:info@example.com?subject=${encodeURIComponent("Balaji Boundary Walls Enquiry")}&body=${encodeURIComponent(text)}`
    window.open(mailto, "_blank", "noopener,noreferrer")
  }

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Contact</h1>
        <p className="mt-2 text-muted-foreground">Phone: +91 9870839225</p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 rounded-2xl border p-6">
          <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Textarea placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
          <div className="flex gap-3">
            <Button type="submit">Send via WhatsApp</Button>
            <Button type="button" variant="secondary" onClick={() => (window.location.href = "tel:+919870839225")}>
              Call Now
            </Button>
          </div>
        </form>
        <div className="mt-8 rounded-2xl border p-6">
          <div className="aspect-[16/9] w-full rounded-lg bg-muted" aria-label="Map placeholder" />
          <p className="mt-2 text-sm text-muted-foreground">Map embed placeholder</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
