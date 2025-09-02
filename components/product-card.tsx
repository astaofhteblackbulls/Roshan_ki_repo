"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  slug: string
  name_en: string
  name_hi: string
  image: string | null
  specs_en: string | null
  specs_hi: string | null
  price_range_en: string | null
  price_range_hi: string | null
}

export function ProductCard({ product }: { product: Product }) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language as 'en' | 'hi'
  
  const name = product[`name_${currentLang}`] || product.name_en
  const specs = product[`specs_${currentLang}`] || product.specs_en
  const priceRange = product[`price_range_${currentLang}`] || product.price_range_en

  const waLink =
    'https://wa.me/919870839225?text=' +
    encodeURIComponent(`Hello Balaji Boundary Walls,\nI want to order/enquire:\n${name}`)

  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/3]">
        <Image
          src={product.image || '/placeholder.svg?height=400&width=600&query=product'}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 33vw, 100vw"
          priority={false}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {specs && <p>{specs}</p>}
        {priceRange && <p className="mt-1 font-medium text-foreground">{priceRange}</p>}
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button asChild size="sm">
          <Link href={waLink} target="_blank" rel="noopener noreferrer">
            {t('whatsappOrder')}
          </Link>
        </Button>
        <Button asChild size="sm" variant="secondary">
          <Link href={`/products/${product.slug}`}>{t('details')}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}