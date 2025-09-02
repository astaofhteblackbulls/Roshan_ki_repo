"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadImage } from '@/lib/supabase-hooks'
import { Loader2, Upload } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const fileName = `${Date.now()}-${file.name}`
      const publicUrl = await uploadImage(file, fileName)
      onChange(publicUrl)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Image URL or upload below"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            className="pointer-events-none"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      {value && (
        <div className="mt-2">
          <img src={value} alt="Preview" className="h-20 w-20 object-cover rounded border" />
        </div>
      )}
    </div>
  )
}