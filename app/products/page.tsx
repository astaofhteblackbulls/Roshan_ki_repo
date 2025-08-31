"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { useCategories, useProducts } from "@/lib/store"

export default function ProductsPage() {
  const { data: categories = [] } = useCategories()
  const { data: allProducts = [] } = useProducts()
  const products = allProducts.filter((p) => p.visible)

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Products</h1>
        {categories.map((cat) => {
          const list = products.filter((p) => p.categoryId === cat.id)
          if (list.length === 0) return null
          return (
            <div key={cat.id} className="mt-8">
              <h2 className="text-xl font-medium">{cat.name}</h2>
              {cat.description && <p className="text-sm text-muted-foreground">{cat.description}</p>}
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
