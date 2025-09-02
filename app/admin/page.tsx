"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'
import { AdminProducts } from '@/components/admin/admin-products'
import { AdminCategories } from '@/components/admin/admin-categories'
import { AdminGallery } from '@/components/admin/admin-gallery'
import { AdminFaqs } from '@/components/admin/admin-faqs'
import { AdminContent } from '@/components/admin/admin-content'
import { LogOut } from 'lucide-react'

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()
  const supabase = createSupabaseClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setSigningIn(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert(error.message)
      }
    } catch (error) {
      alert('Sign in failed')
    } finally {
      setSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-4">
        <div className="rounded-2xl border p-6 text-center">
          <p>{t('loading')}</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-4">
        <form onSubmit={handleSignIn} className="rounded-2xl border p-6">
          <h1 className="text-xl font-semibold">{t('adminLogin')}</h1>
          <div className="mt-4 space-y-3">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button className="mt-4 w-full" type="submit" disabled={signingIn}>
            {signingIn ? t('loading') : t('enter')}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Create admin account in Supabase Auth dashboard.
          </p>
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t('admin')}</h1>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {t('logout')}
        </Button>
      </div>
      
      <Tabs defaultValue="content" className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="content">Home</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <AdminContent />
        </TabsContent>
        <TabsContent value="products">
          <AdminProducts />
        </TabsContent>
        <TabsContent value="gallery">
          <AdminGallery />
        </TabsContent>
        <TabsContent value="faqs">
          <AdminFaqs />
        </TabsContent>
        <TabsContent value="categories">
          <AdminCategories />
        </TabsContent>
      </Tabs>
    </main>
  )
}