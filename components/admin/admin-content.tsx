"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabaseClient'
import { useSiteContent } from '@/lib/supabase-hooks'
import { useTranslation } from 'react-i18next'

export function AdminContent() {
  const { data: content, refetch } = useSiteContent()
  const [formData, setFormData] = useState({
    hero_headline_en: '',
    hero_headline_hi: '',
    hero_subtext_en: '',
    hero_subtext_hi: '',
    stats_sqft_installed: 100000,
    about_text_en: '',
    about_text_hi: '',
    phone: '',
    email: '',
    address_en: '',
    address_hi: '',
    google_map_embed: ''
  })
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (content) {
      setFormData({
        hero_headline_en: content.hero_headline_en || '',
        hero_headline_hi: content.hero_headline_hi || '',
        hero_subtext_en: content.hero_subtext_en || '',
        hero_subtext_hi: content.hero_subtext_hi || '',
        stats_sqft_installed: content.stats_sqft_installed || 100000,
        about_text_en: content.about_text_en || '',
        about_text_hi: content.about_text_hi || '',
        phone: content.phone || '',
        email: content.email || '',
        address_en: content.address_en || '',
        address_hi: content.address_hi || '',
        google_map_embed: content.google_map_embed || ''
      })
    }
  }, [content])

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          id: 'main',
          ...formData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      
      await refetch()
      alert('Content updated successfully!')
    } catch (error) {
      console.error('Save failed:', error)
      alert('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Hero Headline (English)</Label>
              <Input
                value={formData.hero_headline_en}
                onChange={(e) => setFormData(prev => ({ ...prev, hero_headline_en: e.target.value }))}
                placeholder="Premium Precast Boundary Walls"
              />
            </div>
            <div>
              <Label>Hero Headline (Hindi)</Label>
              <Input
                value={formData.hero_headline_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, hero_headline_hi: e.target.value }))}
                placeholder="अब तक 1,00,000+ sq ft boundary walls लगा चुके हैं"
              />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Hero Subtext (English)</Label>
              <Textarea
                value={formData.hero_subtext_en}
                onChange={(e) => setFormData(prev => ({ ...prev, hero_subtext_en: e.target.value }))}
                placeholder="Durable. Fast to install. Built to last."
              />
            </div>
            <div>
              <Label>Hero Subtext (Hindi)</Label>
              <Textarea
                value={formData.hero_subtext_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, hero_subtext_hi: e.target.value }))}
                placeholder="टिकाऊ। तेज़ी से इंस्टॉल। लंबे समय तक चलने वाला।"
              />
            </div>
          </div>

          <div>
            <Label>Stats - Square Feet Installed</Label>
            <Input
              type="number"
              value={formData.stats_sqft_installed}
              onChange={(e) => setFormData(prev => ({ ...prev, stats_sqft_installed: Number(e.target.value) }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>About Text (English)</Label>
              <Textarea
                value={formData.about_text_en}
                onChange={(e) => setFormData(prev => ({ ...prev, about_text_en: e.target.value }))}
                rows={4}
              />
            </div>
            <div>
              <Label>About Text (Hindi)</Label>
              <Textarea
                value={formData.about_text_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, about_text_hi: e.target.value }))}
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 9870839225"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="info@example.com"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Address (English)</Label>
              <Textarea
                value={formData.address_en}
                onChange={(e) => setFormData(prev => ({ ...prev, address_en: e.target.value }))}
                placeholder="Plot XX, Industrial Area, Your City"
              />
            </div>
            <div>
              <Label>Address (Hindi)</Label>
              <Textarea
                value={formData.address_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, address_hi: e.target.value }))}
                placeholder="प्लॉट XX, औद्योगिक क्षेत्र, आपका शहर"
              />
            </div>
          </div>

          <div>
            <Label>Google Map Embed URL</Label>
            <Input
              value={formData.google_map_embed}
              onChange={(e) => setFormData(prev => ({ ...prev, google_map_embed: e.target.value }))}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? t('loading') : t('save')}
      </Button>
    </div>
  )
}