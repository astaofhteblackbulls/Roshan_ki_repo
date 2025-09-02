"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createSupabaseClient } from '@/lib/supabase'
import { useProducts, useCategories } from '@/lib/supabase-hooks'
import { ImageUpload } from '@/components/image-upload'
import { useTranslation } from 'react-i18next'
import { Trash2, Edit } from 'lucide-react'

export function AdminProducts() {
  const { data: products, refetch } = useProducts()
  const { data: categories } = useCategories()
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    slug: '',
    name_en: '',
    name_hi: '',
    category_id: '',
    image: '',
    specs_en: '',
    specs_hi: '',
    price_range_en: '',
    price_range_hi: '',
    visible: true
  })
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()
  const supabase = createSupabaseClient()

  const resetForm = () => {
    setFormData({
      slug: '',
      name_en: '',
      name_hi: '',
      category_id: '',
      image: '',
      specs_en: '',
      specs_hi: '',
      price_range_en: '',
      price_range_hi: '',
      visible: true
    })
    setEditingProduct(null)
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData({
      slug: product.slug || '',
      name_en: product.name_en || '',
      name_hi: product.name_hi || '',
      category_id: product.category_id || '',
      image: product.image || '',
      specs_en: product.specs_en || '',
      specs_hi: product.specs_hi || '',
      price_range_en: product.price_range_en || '',
      price_range_hi: product.price_range_hi || '',
      visible: product.visible ?? true
    })
  }

  const handleSave = async () => {
    if (!formData.name_en || !formData.slug) {
      alert('Name (English) and slug are required')
      return
    }

    setSaving(true)
    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', editingProduct.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('products')
          .insert([formData])
        if (error) throw error
      }

      await refetch()
      resetForm()
      alert('Product saved successfully!')
    } catch (error) {
      console.error('Save failed:', error)
      alert('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      await refetch()
      alert('Product deleted successfully!')
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Delete failed. Please try again.')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Name (English)</Label>
              <Input
                value={formData.name_en}
                onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                placeholder="Precast Boundary Wall"
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

          <div>
            <Label>Slug</Label>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="precast-boundary-wall"
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name_en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
            label="Product Image"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Specs (English)</Label>
              <Textarea
                value={formData.specs_en}
                onChange={(e) => setFormData(prev => ({ ...prev, specs_en: e.target.value }))}
                placeholder="Plain finish, barbed-ready option"
              />
            </div>
            <div>
              <Label>Specs (Hindi)</Label>
              <Textarea
                value={formData.specs_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, specs_hi: e.target.value }))}
                placeholder="सादा फिनिश, कांटेदार तार के लिए तैयार विकल्प"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Price Range (English)</Label>
              <Input
                value={formData.price_range_en}
                onChange={(e) => setFormData(prev => ({ ...prev, price_range_en: e.target.value }))}
                placeholder="₹300–₹450 per sq ft"
              />
            </div>
            <div>
              <Label>Price Range (Hindi)</Label>
              <Input
                value={formData.price_range_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, price_range_hi: e.target.value }))}
                placeholder="₹300–₹450 प्रति वर्ग फुट"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.visible}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, visible: checked }))}
            />
            <Label>Visible</Label>
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
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex-1">
                  <div className="font-medium">{product.name_en}</div>
                  <div className="text-sm text-muted-foreground">
                    {product.slug} • {product.visible ? 'Visible' : 'Hidden'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
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