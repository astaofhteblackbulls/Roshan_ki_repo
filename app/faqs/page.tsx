"use client"

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useFaqs } from '@/lib/supabase-hooks'
import { LanguageToggle } from '@/components/language-toggle'
import '@/lib/i18n'

export default function FaqsPage() {
  const { data: faqs = [] } = useFaqs()
  const { t, i18n } = useTranslation()
  
  const currentLang = i18n.language as 'en' | 'hi'

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-end">
        <LanguageToggle />
      </div>
      <section className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold">{t('faqs')}</h1>
        <Accordion type="single" collapsible className="mt-4">
          {faqs.map((faq) => {
            const question = faq[`question_${currentLang}`] || faq.question_en
            const answer = faq[`answer_${currentLang}`] || faq.answer_en
            
            return (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </section>
      <SiteFooter />
    </main>
  )
}