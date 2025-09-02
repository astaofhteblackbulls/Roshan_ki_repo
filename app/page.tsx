"use client"

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import PremiumHero from '@/components/premium-hero'
import { Badge } from '@/components/ui/badge'
import { useSiteContent } from '@/lib/supabase-hooks'
import { StatsCounter } from '@/components/stats-counter'
import { LanguageToggle } from '@/components/language-toggle'
import '@/lib/i18n'

export default function HomePage() {
  const { data: content } = useSiteContent()
  const { t, i18n } = useTranslation()

  const currentLang = i18n.language as 'en' | 'hi'
  const heroHeadline = content?.[`hero_headline_${currentLang}`] || t('heroHeadline')
  const heroSubtext = content?.[`hero_subtext_${currentLang}`] || t('heroSubtext')

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-end">
        <LanguageToggle />
      </div>
      <PremiumHero
        headline={heroHeadline}
        subheadline={heroSubtext}
        ctaLabel={t('getQuote')}
        ctaHref="/contact"
      />
      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Feature title={t('durable')} />
          <Feature title={t('fastInstall')} />
          <Feature title={t('costEffective')} />
        </div>
        <div className="mt-10 rounded-2xl border p-6 text-center">
          <p className="text-2xl font-semibold">
            <StatsCounter to={content?.stats_sqft_installed ?? 100000} />+ {t('sqftInstalled')}
          </p>
          <p className="text-muted-foreground">{t('trustedBy')}</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}

function Feature({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border p-6">
      <Badge variant="secondary">{title}</Badge>
      <p className="mt-2 text-sm text-muted-foreground">Premium RCC/precast quality with professional installation.</p>
    </div>
  )
}