import type { Category, Product, GalleryItem, FAQ, SiteContent } from "./types"

export const seedCategories: Category[] = [
  { id: "cat-precast", name: "Precast Boundary Walls", description: "Plain, Textured, Barbed-ready" },
  { id: "cat-rcc", name: "RCC Poles & Panels", description: "6ft/8ft/10ft variants" },
  { id: "cat-compound", name: "Compound Walls", description: "Industrial/Residential" },
  { id: "cat-readymix", name: "Readymix Concrete", description: "M20–M35" },
  { id: "cat-paver", name: "Paver Blocks", description: "60/80mm, zig-zag/hex" },
]

export const seedProducts: Product[] = [
  {
    id: "p1",
    slug: "precast-plain-wall",
    name: "Precast Boundary Wall (Plain)",
    categoryId: "cat-precast",
    image: "/images/precast-plain.png",
    specs: "Plain finish, barbed-ready option",
    priceRange: "₹300–₹450 per sq ft",
    visible: true,
  },
  {
    id: "p2",
    slug: "rcc-poles-8ft",
    name: "RCC Poles (8ft) & Panels",
    categoryId: "cat-rcc",
    image: "/images/rcc-pole-8ft.png",
    specs: "8ft poles with interlocking panels",
    priceRange: "₹250–₹380 per sq ft",
    visible: true,
  },
  {
    id: "p3",
    slug: "paver-zigzag-80",
    name: "Paver Blocks 80mm Zig-Zag",
    categoryId: "cat-paver",
    image: "/images/paver-zigzag-80.png",
    specs: "Heavy-duty 80mm, zig-zag",
    priceRange: "₹38–₹55 per piece",
    visible: true,
  },
]

export const seedGallery: GalleryItem[] = [
  {
    id: "g1",
    title: "Industrial Perimeter",
    location: "Manesar",
    sqft: 12000,
    date: "2024-09-10",
    image: "/images/gallery-1.png",
    order: 1,
  },
  {
    id: "g2",
    title: "Residential Compound",
    location: "Gurugram",
    sqft: 4500,
    date: "2024-06-02",
    image: "/images/gallery-2.png",
    order: 2,
  },
  {
    id: "g3",
    title: "Factory Boundary",
    location: "Faridabad",
    sqft: 8000,
    date: "2025-02-18",
    image: "/images/gallery-3.png",
    order: 3,
  },
]

export const seedFaqs: FAQ[] = [
  { id: "f1", question: "Installation time?", answer: "Typically 1–3 days depending on site and length." },
  { id: "f2", question: "Warranty?", answer: "Structural warranty up to 5 years on manufacturing defects." },
  { id: "f3", question: "Delivery radius?", answer: "Pan-city service with logistics coordinated as needed." },
  { id: "f4", question: "Foundation requirements?", answer: "Standard PCC footings; we advise after site inspection." },
  {
    id: "f5",
    question: "Customization options?",
    answer: "Textured panels, barbed-ready tops, and height variations.",
  },
  { id: "f6", question: "Readymix grades?", answer: "M20 to M35 with lab certificates available." },
  { id: "f7", question: "Paver thickness?", answer: "60mm for footpaths, 80mm for driveways/heavy load areas." },
  { id: "f8", question: "Lead time?", answer: "Usually 2–5 days from order confirmation." },
]

export const seedContent: SiteContent = {
  heroHeadline: "अब तक 1,00,000+ sq ft boundary walls लगा चुके हैं",
  heroSubtext: "Turnkey RCC/precast solutions, pan-city service.",
  statsSqftInstalled: 100000,
  phone: "+91 9870839225",
  email: "info@example.com",
  address: "Plot XX, Industrial Area, Your City",
}
