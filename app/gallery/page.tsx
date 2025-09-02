"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useGallery } from '@/lib/supabase-hooks'
import { LanguageToggle } from '@/components/language-toggle'
import '@/lib/i18n'

export default function GalleryPage() {
  const { data: gallery = [] } = useGallery()
  const [active, setActive] = useState<number | null>(null)
  const { t, i18n } = useTranslation()
  
  const currentLang = i18n.language as 'en' | 'hi'
  const items = [...gallery].sort((a, b) => a.order_index - b.order_index)

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-end">
        <LanguageToggle />
      </div>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">{t('gallery')}</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, idx) => {
            const title = item[`title_${currentLang}`] || item.title_en
            const location = item[`location_${currentLang}`] || item.location_en
            
            return (
              <button
                key={item.id}
                onClick={() => setActive(idx)}
                className="group overflow-hidden rounded-2xl border"
                aria-label={`Open ${title}`}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image || '/placeholder.svg?height=400&width=600&query=gallery'}
                    alt={title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-left">
                  <div className="font-medium">{title}</div>
                  <div className="text-xs text-muted-foreground">
                    {location ? `${location} • ` : ''}
                    {item.sqft ? `${item.sqft} sq ft • ` : ''}
                    {item.date ?? ''}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </section>
      <SiteFooter />

      <Dialog open={active !== null} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-3xl">
          {active !== null && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={items[active].image || '/placeholder.svg?height=600&width=900&query=gallery'}
                alt={items[active][`title_${currentLang}`] || items[active].title_en}
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