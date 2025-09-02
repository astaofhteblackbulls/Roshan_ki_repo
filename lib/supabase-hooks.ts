"use client"

import { useEffect, useState } from 'react'
import { createSupabaseClient } from './supabase'
import type { Database } from './supabase'

type Tables = Database['public']['Tables']
type Category = Tables['categories']['Row']
type Product = Tables['products']['Row']
type GalleryItem = Tables['gallery']['Row']
type FAQ = Tables['faqs']['Row']
type SiteContent = Tables['site_content']['Row']

export function useSupabaseData<T>(
  table: string,
  orderBy?: { column: string; ascending?: boolean }
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createSupabaseClient()

  const fetchData = async () => {
    try {
      setLoading(true)
      let query = supabase.from(table).select('*')
      
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true })
      }
      
      const { data: result, error } = await query
      
      if (error) throw error
      setData(result || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [table])

  const refetch = () => fetchData()

  return { data, loading, error, refetch }
}

export function useCategories() {
  return useSupabaseData<Category>('categories', { column: 'name_en' })
}

export function useProducts() {
  return useSupabaseData<Product>('products', { column: 'created_at', ascending: false })
}

export function useGallery() {
  return useSupabaseData<GalleryItem>('gallery', { column: 'order_index' })
}

export function useFaqs() {
  return useSupabaseData<FAQ>('faqs', { column: 'order_index' })
}

export function useSiteContent() {
  const [data, setData] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createSupabaseClient()

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data: result, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 'main')
        .single()
      
      if (error) throw error
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()

  return { data, loading, error, refetch }
}

export async function uploadImage(file: File, path: string) {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(data.path)

  return publicUrl
}