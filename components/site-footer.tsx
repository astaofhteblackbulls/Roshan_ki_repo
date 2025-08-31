import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">Balaji Boundary Walls</h3>
            <p className="mt-2 text-sm text-muted-foreground">Turnkey RCC & precast solutions. Pan-city service.</p>
          </div>
          <div>
            <h4 className="font-medium">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:underline">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-sm">
            <div>
              Phone:{" "}
              <a href="tel:+919870839225" className="hover:underline">
                +91 9870839225
              </a>
            </div>
            <div className="mt-1">
              Email:{" "}
              <a href="mailto:info@example.com" className="hover:underline">
                info@example.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Balaji Boundary Walls. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
