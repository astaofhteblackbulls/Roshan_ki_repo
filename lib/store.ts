"use client"

import useSWR from "swr"
import { seedCategories, seedProducts, seedGallery, seedFaqs, seedContent } from "./seed"
import type { Category, Product, GalleryItem, FAQ, SiteContent } from "./types"

const KEY = {
  categories: "bbw.categories",
  products: "bbw.products",
  gallery: "bbw.gallery",
  faqs: "bbw.faqs",
  content: "bbw.content",
}

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeLocal<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

export function useCategories() {
  return useSWR<Category[]>("categories", () => readLocal(KEY.categories, seedCategories), {
    fallbackData: seedCategories,
  })
}

export function useProducts() {
  return useSWR<Product[]>("products", () => readLocal(KEY.products, seedProducts), { fallbackData: seedProducts })
}

export function useGallery() {
  return useSWR<GalleryItem[]>("gallery", () => readLocal(KEY.gallery, seedGallery), { fallbackData: seedGallery })
}

export function useFaqs() {
  return useSWR<FAQ[]>("faqs", () => readLocal(KEY.faqs, seedFaqs), { fallbackData: seedFaqs })
}

export function useContent() {
  return useSWR<SiteContent>("content", () => readLocal(KEY.content, seedContent), { fallbackData: seedContent })
}

export const storeActions = {
  setCategories(list: Category[]) {
    writeLocal(KEY.categories, list)
  },
  setProducts(list: Product[]) {
    writeLocal(KEY.products, list)
  },
  setGallery(list: GalleryItem[]) {
    writeLocal(KEY.gallery, list)
  },
  setFaqs(list: FAQ[]) {
    writeLocal(KEY.faqs, list)
  },
  setContent(content: SiteContent) {
    writeLocal(KEY.content, content)
  },
}
