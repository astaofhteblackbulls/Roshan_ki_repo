"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createSupabaseClient } from '@/lib/supabase'
import { useGallery } from '@/lib/supabase-hooks'
import { ImageUpload } from '@/components/image-upload'
import { useTranslation } from 'react-i18next'
import { Trash2, Edit, GripVertical } from 'lucide-react'

export function AdminGallery() {
  const { data: gallery, refetch } = useGallery()
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    title_en: '',
    title_hi: '',
    image: '',
    location_en: '',
    location_hi: '',
    sqft: 0,
    date: '',
    order_index: 0
  })
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()
  const supabase = createSupabaseClient()

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_hi: '',
      image: '',
      location_en: '',
      location_hi: '',
      sqft: 0,
      date: '',
      order_index: gallery.length + 1
    })
    setEditingItem(null)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setFormData({
      title_en: item.title_en || '',
      title_hi: item.title_hi || '',
      image: item.image || '',
      location_en: item.location_en || '',
      location_hi: item.location_hi || '',
      sqft: item.sqft || 0,
      date: item.date || '',
      order_index: item.order_index || 0
    })
  }

  const handleSave = async () => {
    if (!formData.title_en || !formData.image) {
      alert('Title (English) and image are required')
      return
    }

    setSaving(true)
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('gallery')
          .update(formData)
          .eq('id', editingItem.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert([{ ...formData, order_index: gallery.length + 1 }])
        if (error) throw error
      }

      await refetch()
      resetForm()
      alert('Gallery item saved successfully!')
    } catch (error) {
      console.error('Save failed:', error)
      alert('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return

    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      await refetch()
      alert('Gallery item deleted successfully!')
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Delete failed. Please try again.')
    }
  }

  const updateOrder = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ order_index: newOrder })
        .eq('id', id)
      
      if (error) throw error
      await refetch()
    } catch (error) {
      console.error('Order update failed:', error)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Title (English)</Label>
              <Input
                value={formData.title_en}
                onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                placeholder="Industrial Perimeter"
              />
            </div>
            <div>
              <Label>Title (Hindi)</Label>
              <Input
                value={formData.title_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, title_hi: e.target.value }))}
                placeholder="औद्योगिक परिधि"
              />
            </div>
          </div>

          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
            label="Gallery Image"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Location (English)</Label>
              <Input
                value={formData.location_en}
                onChange={(e) => setFormData(prev => ({ ...prev, location_en: e.target.value }))}
                placeholder="Manesar"
              />
            </div>
            <div>
              <Label>Location (Hindi)</Label>
              <Input
                value={formData.location_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, location_hi: e.target.value }))}
                placeholder="मानेसर"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Square Feet</Label>
              <Input
                type="number"
                value={formData.sqft}
                onChange={(e) => setFormData(prev => ({ ...prev, sqft: Number(e.target.value) }))}
                placeholder="12000"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? t('loading') : t('save')}
            </Button>
            <Button variant="outline" onClick={resetForm}>
              {t('cancel')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {gallery.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3 rounded-lg border p-3">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <div className="flex-1">
                  <div className="font-medium">{item.title_en}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.location_en} • {item.sqft} sq ft • {item.date}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}