"use client"

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductCard } from '@/components/product-card'
import { useCategories, useProducts } from '@/lib/supabase-hooks'
import { LanguageToggle } from '@/components/language-toggle'
import '@/lib/i18n'

export default function ProductsPage() {
  const { data: categories = [] } = useCategories()
  const { data: allProducts = [] } = useProducts()
  const { t, i18n } = useTranslation()
  
  const products = allProducts.filter((p) => p.visible)
  const currentLang = i18n.language as 'en' | 'hi'

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-end">
        <LanguageToggle />
      </div>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">{t('products')}</h1>
        {categories.map((cat) => {
          const list = products.filter((p) => p.category_id === cat.id)
          if (list.length === 0) return null
          
          const categoryName = cat[`name_${currentLang}`] || cat.name_en
          const categoryDesc = cat[`description_${currentLang}`] || cat.description_en
          
          return (
            <div key={cat.id} className="mt-8">
              <h2 className="text-xl font-medium">{categoryName}</h2>
              {categoryDesc && <p className="text-sm text-muted-foreground">{categoryDesc}</p>}
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )
        })}
      </section>
      <SiteFooter />
    </main>
  )
}