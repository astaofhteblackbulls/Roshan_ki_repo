import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Balaji Boundary Walls",
  description: "100,000+ sq ft installed till now.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Balaji Boundary Walls",
    description: "Turnkey RCC & precast boundary wall solutions. Pan-city service. 1,00,000+ sq ft installed.",
    url: "https://example.com",
    siteName: "Balaji Boundary Walls",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 830,
        alt: "Balaji Boundary Walls",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balaji Boundary Walls",
    description: "Turnkey RCC & precast boundary wall solutions. Pan-city service.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  )
}
