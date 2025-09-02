"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createSupabaseClient } from '@/lib/supabase'
import { useFaqs } from '@/lib/supabase-hooks'
import { useTranslation } from 'react-i18next'
import { Trash2, Edit, GripVertical } from 'lucide-react'

export function AdminFaqs() {
  const { data: faqs, refetch } = useFaqs()
  const [editingFaq, setEditingFaq] = useState<any>(null)
  const [formData, setFormData] = useState({
    question_en: '',
    question_hi: '',
    answer_en: '',
    answer_hi: '',
    order_index: 0
  })
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()
  const supabase = createSupabaseClient()

  const resetForm = () => {
    setFormData({
      question_en: '',
      question_hi: '',
      answer_en: '',
      answer_hi: '',
      order_index: faqs.length + 1
    })
    setEditingFaq(null)
  }

  const handleEdit = (faq: any) => {
    setEditingFaq(faq)
    setFormData({
      question_en: faq.question_en || '',
      question_hi: faq.question_hi || '',
      answer_en: faq.answer_en || '',
      answer_hi: faq.answer_hi || '',
      order_index: faq.order_index || 0
    })
  }

  const handleSave = async () => {
    if (!formData.question_en || !formData.answer_en) {
      alert('Question and answer (English) are required')
      return
    }

    setSaving(true)
    try {
      if (editingFaq) {
        const { error } = await supabase
          .from('faqs')
          .update(formData)
          .eq('id', editingFaq.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('faqs')
          .insert([{ ...formData, order_index: faqs.length + 1 }])
        if (error) throw error
      }

      await refetch()
      resetForm()
      alert('FAQ saved successfully!')
    } catch (error) {
      console.error('Save failed:', error)
      alert('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      await refetch()
      alert('FAQ deleted successfully!')
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Delete failed. Please try again.')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{editingFaq ? 'Edit FAQ' : 'Add FAQ'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Question (English)</Label>
              <Input
                value={formData.question_en}
                onChange={(e) => setFormData(prev => ({ ...prev, question_en: e.target.value }))}
                placeholder="Installation time?"
              />
            </div>
            <div>
              <Label>Question (Hindi)</Label>
              <Input
                value={formData.question_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, question_hi: e.target.value }))}
                placeholder="इंस्टॉलेशन का समय?"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Answer (English)</Label>
              <Textarea
                value={formData.answer_en}
                onChange={(e) => setFormData(prev => ({ ...prev, answer_en: e.target.value }))}
                placeholder="Typically 1–3 days depending on site and length."
                rows={3}
              />
            </div>
            <div>
              <Label>Answer (Hindi)</Label>
              <Textarea
                value={formData.answer_hi}
                onChange={(e) => setFormData(prev => ({ ...prev, answer_hi: e.target.value }))}
                placeholder="आमतौर पर साइट और लंबाई के आधार पर 1-3 दिन।"
                rows={3}
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
          <CardTitle>FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="flex items-center gap-3 rounded-lg border p-3">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <div className="flex-1">
                  <div className="font-medium">{faq.question_en}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2">{faq.answer_en}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(faq)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(faq.id)}>
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