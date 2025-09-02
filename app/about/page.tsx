"use client"

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Badge } from '@/components/ui/badge'
import { useSiteContent } from '@/lib/supabase-hooks'
import { StatsCounter } from '@/components/stats-counter'
import { LanguageToggle } from '@/components/language-toggle'
import '@/lib/i18n'

export default function AboutPage() {
  const { data: content } = useSiteContent()
  const { t, i18n } = useTranslation()
  
  const currentLang = i18n.language as 'en' | 'hi'
  const aboutText = content?.[`about_text_${currentLang}`] || 'We provide turnkey RCC and precast boundary wall solutions with fast installation and proven durability.'

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-end">
        <LanguageToggle />
      </div>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">{t('about')}</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          {aboutText}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary">{t('durable')}</Badge>
          <Badge variant="secondary">{t('fastInstall')}</Badge>
          <Badge variant="secondary">{t('costEffective')}</Badge>
          <Badge variant="secondary">{t('warranty')}</Badge>
        </div>
        <div className="mt-10 rounded-2xl border p-6">
          <div className="text-2xl font-semibold">
            <StatsCounter to={content?.stats_sqft_installed ?? 100000} />+ {t('sqftInstalled')}
          </div>
          <p className="text-muted-foreground">{t('trustedBy')}</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}