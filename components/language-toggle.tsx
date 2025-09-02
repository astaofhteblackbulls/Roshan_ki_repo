"use client"

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved language preference
    const savedLang = localStorage.getItem('language') || 'en'
    i18n.changeLanguage(savedLang)
  }, [i18n])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  if (!mounted) return null

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={i18n.language === 'hi' ? 'default' : 'secondary'}
        size="sm"
        onClick={() => {
          i18n.changeLanguage('hi')
          localStorage.setItem('language', 'hi')
        }}
      >
        हिंदी
      </Button>
      <Button
        variant={i18n.language === 'en' ? 'default' : 'secondary'}
        size="sm"
        onClick={() => {
          i18n.changeLanguage('en')
          localStorage.setItem('language', 'en')
        }}
      >
        English
      </Button>
    </div>
  )
}