import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabase'

const supabaseUrl = 'https://lljdtbuhttefkhqxauex.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsamR0YnVodHRlZmtocXhhdWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MDIwMDYsImV4cCI6MjA3MjM3ODAwNn0.k23Fs40hwtwnE_8vAH9RC85mgnIUyGCf30KMkT4BNkE'

// Client-side Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Helper function to create client instances
export const createSupabaseClient = () => createClient<Database>(supabaseUrl, supabaseAnonKey)

export default supabase