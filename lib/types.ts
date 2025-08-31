export type Category = {
  id: string
  name: string
  description?: string
}

export type Product = {
  id: string
  slug: string
  name: string
  categoryId: string
  image: string
  specs?: string
  priceRange?: string
  visible: boolean
}

export type GalleryItem = {
  id: string
  title: string
  location?: string
  sqft?: number
  date?: string
  image: string
  order: number
}

export type FAQ = {
  id: string
  question: string
  answer: string
}

export type SiteContent = {
  heroHeadline: string
  heroSubtext: string
  statsSqftInstalled: number
  phone: string
  email: string
  address?: string
}
