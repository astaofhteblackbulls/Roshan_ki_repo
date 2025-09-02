"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createSupabaseClient } from '@/lib/supabase'
import { useCategories } from '@/lib/supabase-hooks'
import { useTranslation } from 'react-i18next'
import { Trash2, Edit } from 'lucide-react'

export function AdminCategories() {
  const { data: categories, refetch } = useCategories()
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [formData, setFormData] = useState({
    id: '',
    name_en: '',
    name_hi: '',
    description_en: '',
    description_hi: ''
  })
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()
  const supabase = createSupabaseClient()

  const resetForm = () => {
    setFormData({
      id: '',
      name_en: '',
      name_hi: '',
      description_en: '',
      description_hi: ''
    })
    setEditingCategory(null)
  }

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setFormData({
      id: category.id || '',
      name_en: category.name_en || '',
      name_hi: category.name_hi || '',
      description_en: category.description_en || '',
      description_hi: category.description_hi || ''
    })
  }

  const handleSave = async () => {
    if (!formData.name_en || !formData.id) {
      alert('Name (English) and ID are required')
      return
    }

    setSaving(true)
    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update({
            name_en: formData.name_en,
            name_hi: formData.name_hi,
            description_en: formData.description_en,
            description_hi: formData.description_hi
          })
          .eq('id', editingCategory.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([formData])
        if (error) throw error
      }

      await refetch()
      resetForm()
      alert('Category saved successfully!')
    } catch (error) {
      console.error('Save failed:', error)
      alert('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      await refetch()
      alert('Category deleted successfully!')
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Delete failed. Please try again.')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>ID</Label>
            <Input
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              placeholder="cat-precast"
              disabled={!!editingCategory}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Name (English)</Label>
              <Input
                value={formData.name_en}
                onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                placeholder="Precast Boundary Walls"
              />
            </div>
            <div>
              <Label>Name (Hindi)</Label>
              <Input
                value={formData.name_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, name_hi: e.target.value }))}
                placeholder="प्रीकास्ट बाउंड्री वॉल"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Description (English)</Label>
              <Textarea
                value={formData.description_en}
                onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                placeholder="Plain, Textured, Barbed-ready"
              />
            </div>
            <div>
              <Label>Description (Hindi)</Label>
              <Textarea
                value={formData.description_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, description_hi: e.target.value }))}
                placeholder="सादा, टेक्सचर्ड, कांटेदार तार के लिए तैयार"
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
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex-1">
                  <div className="font-medium">{category.name_en}</div>
                  <div className="text-sm text-muted-foreground">{category.id}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
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