import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = 'https://lljdtbuhttefkhqxauex.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsamR0YnVodHRlZmtocXhhdWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MDIwMDYsImV4cCI6MjA3MjM3ODAwNn0.k23Fs40hwtwnE_8vAH9RC85mgnIUyGCf30KMkT4BNkE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createSupabaseClient = () => createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for API routes
export const createServerSupabaseClient = () => createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name_en: string
          name_hi: string
          description_en: string | null
          description_hi: string | null
          created_at: string
        }
        Insert: {
          id: string
          name_en: string
          name_hi?: string
          description_en?: string
          description_hi?: string
          created_at?: string
        }
        Update: {
          id?: string
          name_en?: string
          name_hi?: string
          description_en?: string
          description_hi?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          slug: string
          name_en: string
          name_hi: string
          category_id: string | null
          image: string | null
          specs_en: string | null
          specs_hi: string | null
          price_range_en: string | null
          price_range_hi: string | null
          visible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name_en: string
          name_hi?: string
          category_id?: string
          image?: string
          specs_en?: string
          specs_hi?: string
          price_range_en?: string
          price_range_hi?: string
          visible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name_en?: string
          name_hi?: string
          category_id?: string
          image?: string
          specs_en?: string
          specs_hi?: string
          price_range_en?: string
          price_range_hi?: string
          visible?: boolean
          created_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title_en: string
          title_hi: string
          image: string
          location_en: string | null
          location_hi: string | null
          sqft: number | null
          date: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          title_en: string
          title_hi?: string
          image: string
          location_en?: string
          location_hi?: string
          sqft?: number
          date?: string
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          title_en?: string
          title_hi?: string
          image?: string
          location_en?: string
          location_hi?: string
          sqft?: number
          date?: string
          order_index?: number
          created_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question_en: string
          question_hi: string
          answer_en: string
          answer_hi: string
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          question_en: string
          question_hi?: string
          answer_en: string
          answer_hi?: string
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          question_en?: string
          question_hi?: string
          answer_en?: string
          answer_hi?: string
          order_index?: number
          created_at?: string
        }
      }
      site_content: {
        Row: {
          id: string
          hero_headline_en: string
          hero_headline_hi: string
          hero_subtext_en: string
          hero_subtext_hi: string
          stats_sqft_installed: number
          about_text_en: string | null
          about_text_hi: string | null
          phone: string
          email: string
          address_en: string | null
          address_hi: string | null
          google_map_embed: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          hero_headline_en?: string
          hero_headline_hi?: string
          hero_subtext_en?: string
          hero_subtext_hi?: string
          stats_sqft_installed?: number
          about_text_en?: string
          about_text_hi?: string
          phone?: string
          email?: string
          address_en?: string
          address_hi?: string
          google_map_embed?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hero_headline_en?: string
          hero_headline_hi?: string
          hero_subtext_en?: string
          hero_subtext_hi?: string
          stats_sqft_installed?: number
          about_text_en?: string
          about_text_hi?: string
          phone?: string
          email?: string
          address_en?: string
          address_hi?: string
          google_map_embed?: string
          updated_at?: string
        }
      }
    }
  }
}