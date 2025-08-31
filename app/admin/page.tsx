"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useCategories, useProducts, useGallery, useFaqs, useContent, storeActions } from "@/lib/store"
import type { Category, Product, GalleryItem, FAQ, SiteContent } from "@/lib/types"
import { nanoid } from "nanoid"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123#"

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("bbw.authed") === "1") setAuthed(true)
  }, [])

  function tryAuth(e: React.FormEvent) {
    e.preventDefault()
    if (pass && pass === ADMIN_PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem("bbw.authed", "1")
    } else {
      alert("Incorrect password")
    }
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-4">
        <form onSubmit={tryAuth} className="rounded-2xl border p-6">
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <Label className="mt-4">Password</Label>
          <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
          <Button className="mt-4" type="submit">
            Enter
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">Set NEXT_PUBLIC_ADMIN_PASSWORD in Project Settings.</p>
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <Tabs defaultValue="products" className="mt-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="content">Home/Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsAdmin />
        </TabsContent>
        <TabsContent value="categories">
          <CategoriesAdmin />
        </TabsContent>
        <TabsContent value="gallery">
          <GalleryAdmin />
        </TabsContent>
        <TabsContent value="faqs">
          <FaqsAdmin />
        </TabsContent>
        <TabsContent value="content">
          <ContentAdmin />
        </TabsContent>
      </Tabs>
    </main>
  )
}

function ProductsAdmin() {
  const { data: products, mutate } = useProducts()
  const { data: categories } = useCategories()
  const [draft, setDraft] = useState<Partial<Product>>({ visible: true })

  function save() {
    if (!draft.name || !draft.slug || !draft.categoryId) return alert("Name, slug, category required")
    const list = products ? [...products] : []
    const idx = list.findIndex((p) => p.id === draft.id)
    if (idx >= 0) list[idx] = draft as Product
    else list.unshift({ ...(draft as Product), id: nanoid(), visible: draft.visible ?? true })
    storeActions.setProducts(list)
    mutate(list, { revalidate: false })
    setDraft({ visible: true })
  }

  function remove(id: string) {
    const list = (products || []).filter((p) => p.id !== id)
    storeActions.setProducts(list)
    mutate(list, { revalidate: false })
  }

  return (
    <div className="mt-4 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border p-4">
        <h3 className="font-medium">Add / Edit Product</h3>
        <div className="mt-3 grid gap-2">
          <Input
            placeholder="Name"
            value={draft.name || ""}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          />
          <Input
            placeholder="Slug"
            value={draft.slug || ""}
            onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
          />
          <Input
            placeholder="Category ID"
            value={draft.categoryId || ""}
            onChange={(e) => setDraft((d) => ({ ...d, categoryId: e.target.value }))}
          />
          <Input
            placeholder="Image path (/images/...)"
            value={draft.image || ""}
            onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
          />
          <Textarea
            placeholder="Specs"
            value={draft.specs || ""}
            onChange={(e) => setDraft((d) => ({ ...d, specs: e.target.value }))}
          />
          <Input
            placeholder="Price range"
            value={draft.priceRange || ""}
            onChange={(e) => setDraft((d) => ({ ...d, priceRange: e.target.value }))}
          />
          <div className="flex items-center gap-2 pt-2">
            <Label htmlFor="visible">Visible</Label>
            <Switch
              id="visible"
              checked={draft.visible ?? true}
              onCheckedChange={(v) => setDraft((d) => ({ ...d, visible: v }))}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="secondary" onClick={() => setDraft({ visible: true })}>
              Clear
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border p-4">
        <h3 className="font-medium">Products</h3>
        <div className="mt-3 space-y-2">
          {(products || []).map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-lg border p-2">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">
                  {p.categoryId} • {p.priceRange}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span>Visible</span>
                  <Switch
                    checked={p.visible}
                    onCheckedChange={(v) => {
                      const list = (products || []).map((x) => (x.id === p.id ? { ...x, visible: v } : x))
                      storeActions.setProducts(list)
                      mutate(list, { revalidate: false })
                    }}
                  />
                </div>
                <Button size="sm" variant="secondary" onClick={() => setDraft(p)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => remove(p.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CategoriesAdmin() {
  const { data, mutate } = useCategories()
  const [draft, setDraft] = useState<Partial<Category>>({})
  function save() {
    if (!draft.name) return alert("Name required")
    const list = data ? [...data] : []
    const idx = list.findIndex((c) => c.id === draft.id)
    if (idx >= 0) list[idx] = draft as Category
    else list.unshift({ ...(draft as Category), id: draft.id || draft.name!.toLowerCase().replace(/\s+/g, "-") })
    storeActions.setCategories(list)
    mutate(list, { revalidate: false })
    setDraft({})
  }
  function remove(id: string) {
    const list = (data || []).filter((c) => c.id !== id)
    storeActions.setCategories(list)
    mutate(list, { revalidate: false })
  }
  return (
    <div className="mt-4 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border p-4">
        <h3 className="font-medium">Add / Edit Category</h3>
        <div className="mt-3 grid gap-2">
          <Input
            placeholder="ID (optional)"
            value={draft.id || ""}
            onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))}
          />
          <Input
            placeholder="Name"
            value={draft.name || ""}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          />
          <Textarea
            placeholder="Description"
            value={draft.description || ""}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          />
          <div className="flex gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="secondary" onClick={() => setDraft({})}>
              Clear
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border p-4">
        <h3 className="font-medium">Categories</h3>
        <div className="mt-3 space-y-2">
          {(data || []).map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border p-2">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.id}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setDraft(c)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => remove(c.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GalleryAdmin() {
  const { data, mutate } = useGallery()
  const [draft, setDraft] = useState<Partial<GalleryItem>>({})

  function save() {
    if (!draft.title || !draft.image) return alert("Title and image required")
    const list = data ? [...data] : []
    const idx = list.findIndex((g) => g.id === draft.id)
    if (idx >= 0) list[idx] = draft as GalleryItem
    else list.push({ ...(draft as GalleryItem), id: nanoid(), order: list.length + 1 })
    storeActions.setGallery(list)
    mutate(list, { revalidate: false })
    setDraft({})
  }

  function remove(id: string) {
    const list = (data || []).filter((g) => g.id !== id).map((g, i) => ({ ...g, order: i + 1 }))
    storeActions.setGallery(list)
    mutate(list, { revalidate: false })
  }

  function onDragStart(e: React.DragEvent<HTMLDivElement>, id: string) {
    e.dataTransfer.setData("text/plain", id)
  }
  function onDrop(e: React.DragEvent<HTMLDivElement>, targetId: string) {
    e.preventDefault()
    const sourceId = e.dataTransfer.getData("text/plain")
    if (!sourceId || sourceId === targetId) return
    const list = data ? [...data] : []
    const from = list.findIndex((g) => g.id === sourceId)
    const to = list.findIndex((g) => g.id === targetId)
    if (from < 0 || to < 0) return
    const [moved] = list.splice(from, 1)
    list.splice(to, 0, moved)
    const re = list.map((g, idx) => ({ ...g, order: idx + 1 }))
    storeActions.setGallery(re)
    mutate(re, { revalidate: false })
  }

  return (
    <div className="mt-4 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border p-4">
        <h3 className="font-medium">Add / Edit Gallery Item</h3>
        <div className="mt-3 grid gap-2">
          <Input
            placeholder="Title"
            value={draft.title || ""}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
          />
          <Input
            placeholder="Location"
            value={draft.location || ""}
            onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
          />
          <Input
            placeholder="Sqft"
            type="number"
            value={draft.sqft?.toString() || ""}
            onChange={(e) => setDraft((d) => ({ ...d, sqft: Number(e.target.value) }))}
          />
          <Input
            placeholder="Date (YYYY-MM-DD)"
            value={draft.date || ""}
            onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
          />
          <Input
            placeholder="Image path (/images/...)"
            value={draft.image || ""}
            onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))}
          />
          <div className="flex gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="secondary" onClick={() => setDraft({})}>
              Clear
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border p-4">
        <h3 className="font-medium">Gallery Items</h3>
        <p className="mt-1 text-xs text-muted-foreground">Tip: Drag and drop items to reorder.</p>
        <div className="mt-3 space-y-2">
          {(data || []).map((g) => (
            <div
              key={g.id}
              className="flex cursor-move items-center justify-between rounded-lg border p-2"
              draggable
              onDragStart={(e) => onDragStart(e, g.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, g.id)}
              title="Drag to reorder"
            >
              <div>
                <div className="font-medium">{g.title}</div>
                <div className="text-xs text-muted-foreground">
                  {g.location} • {g.sqft} sq ft • {g.date}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setDraft(g)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => remove(g.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FaqsAdmin() {
  const { data, mutate } = useFaqs()
  const [draft, setDraft] = useState<Partial<FAQ>>({})
  function save() {
    if (!draft.question || !draft.answer) return alert("Question and answer required")
    const list = data ? [...data] : []
    const idx = list.findIndex((f) => f.id === draft.id)
    if (idx >= 0) list[idx] = draft as FAQ
    else list.unshift({ ...(draft as FAQ), id: nanoid() })
    storeActions.setFaqs(list)
    mutate(list, { revalidate: false })
    setDraft({})
  }
  function remove(id: string) {
    const list = (data || []).filter((f) => f.id !== id)
    storeActions.setFaqs(list)
    mutate(list, { revalidate: false })
  }
  return (
    <div className="mt-4 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border p-4">
        <h3 className="font-medium">Add / Edit FAQ</h3>
        <div className="mt-3 grid gap-2">
          <Input
            placeholder="Question"
            value={draft.question || ""}
            onChange={(e) => setDraft((d) => ({ ...d, question: e.target.value }))}
          />
          <Textarea
            placeholder="Answer"
            value={draft.answer || ""}
            onChange={(e) => setDraft((d) => ({ ...d, answer: e.target.value }))}
          />
          <div className="flex gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="secondary" onClick={() => setDraft({})}>
              Clear
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border p-4">
        <h3 className="font-medium">FAQs</h3>
        <div className="mt-3 space-y-2">
          {(data || []).map((f) => (
            <div key={f.id} className="flex items-center justify-between rounded-lg border p-2">
              <div className="font-medium">{f.question}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setDraft(f)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => remove(f.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContentAdmin() {
  const { data, mutate } = useContent()
  const [draft, setDraft] = useState<SiteContent>(data!)
  useEffect(() => {
    if (data) setDraft(data)
  }, [data])

  function save() {
    storeActions.setContent(draft)
    mutate(draft, { revalidate: false })
  }

  return (
    <div className="mt-4 grid gap-4 rounded-2xl border p-4">
      <h3 className="font-medium">Home & Contact Content</h3>
      <Input
        placeholder="Hero headline"
        value={draft.heroHeadline}
        onChange={(e) => setDraft({ ...draft, heroHeadline: e.target.value })}
      />
      <Input
        placeholder="Hero subtext"
        value={draft.heroSubtext}
        onChange={(e) => setDraft({ ...draft, heroSubtext: e.target.value })}
      />
      <Input
        placeholder="Stats (sq ft installed)"
        type="number"
        value={draft.statsSqftInstalled}
        onChange={(e) => setDraft({ ...draft, statsSqftInstalled: Number(e.target.value) })}
      />
      <Input placeholder="Phone" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
      <Input placeholder="Email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
      <Textarea
        placeholder="Address"
        value={draft.address || ""}
        onChange={(e) => setDraft({ ...draft, address: e.target.value })}
      />
      <div className="flex gap-2">
        <Button onClick={save}>Save</Button>
      </div>
      <p className="text-xs text-muted-foreground">Note: Demo persists in your browser's localStorage.</p>
    </div>
  )
}
