"use client"

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useSiteContent } from '@/lib/supabase-hooks'
import { LanguageToggle } from '@/components/language-toggle'
import '@/lib/i18n'

export default function ContactPage() {
  const { data: content } = useSiteContent()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const { t, i18n } = useTranslation()
  
  const currentLang = i18n.language as 'en' | 'hi'
  const address = content?.[`address_${currentLang}`] || content?.address_en

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = `Hello Balaji Boundary Walls, I have a query/order.\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`
    const wa = `https://wa.me/${content?.phone?.replace(/[^0-9]/g, '') || '919870839225'}?text=` + encodeURIComponent(text)
    window.open(wa, '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-end">
        <LanguageToggle />
      </div>
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-semibold">{t('contact')}</h1>
        <div className="mt-2 space-y-1 text-muted-foreground">
          <p>Phone: {content?.phone || '+91 9870839225'}</p>
          <p>Email: {content?.email || 'info@example.com'}</p>
          {address && <p>Address: {address}</p>}
        </div>
        
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 rounded-2xl border p-6">
          <Input 
            placeholder={t('yourName')} 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <Input 
            placeholder={t('phoneNumber')} 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
          <Textarea 
            placeholder={t('yourMessage')} 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows={4} 
          />
          <div className="flex gap-3">
            <Button type="submit">{t('sendWhatsApp')}</Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => (window.location.href = `tel:${content?.phone || '+919870839225'}`)}
            >
              {t('callNow')}
            </Button>
          </div>
        </form>
        
        {content?.google_map_embed ? (
          <div className="mt-8 rounded-2xl border p-6">
            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
              <iframe
                src={content.google_map_embed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border p-6">
            <div className="aspect-[16/9] w-full rounded-lg bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Map will appear when configured in admin</p>
            </div>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  )
}