"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    google?: any
    googleTranslateElementInit?: () => void
  }
}

/**
 * TranslatorToggle
 * - Loads Google Translate once on demand
 * - Provides Hindi/English buttons that translate the entire page
 * - Keeps UI clean by hiding the default Google banner and gadget
 */
export default function TranslatorToggle() {
  const [ready, setReady] = useState(false)
  const [lang, setLang] = useState<"en" | "hi">("en")
  const initStarted = useRef(false)
  const pendingLang = useRef<"en" | "hi" | null>(null)

  // Inject tiny CSS to prevent layout shift from Google banner
  const injectHideStyles = useCallback(() => {
    if (document.getElementById("v0-gt-styles")) return
    const style = document.createElement("style")
    style.id = "v0-gt-styles"
    style.textContent = `
      .goog-te-banner-frame, .goog-te-balloon-frame { display: none !important; }
      .goog-logo-link, .goog-te-gadget-icon { display: none !important; }
      #goog-gt-tt, .goog-te-spinner-pos { display: none !important; }
      body { top: 0 !important; }
    `
    document.head.appendChild(style)
  }, [])

  const ensureScript = useCallback(() => {
    return new Promise<void>((resolve) => {
      injectHideStyles()

      if (ready || (window.google && window.google.translate)) {
        setReady(true)
        resolve()
        return
      }

      if (initStarted.current) {
        const i = setInterval(() => {
          if (window.google && window.google.translate) {
            clearInterval(i)
            setReady(true)
            resolve()
          }
        }, 50)
        return
      }
      initStarted.current = true

      window.googleTranslateElementInit = () => {
        try {
          // eslint-disable-next-line no-new
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi",
              autoDisplay: false,
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element",
          )
        } catch {
          // swallow; we'll still mark ready so combo lookup can retry
        }
        setReady(true)
        resolve()
      }

      const script = document.createElement("script")
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      script.crossOrigin = "anonymous"
      script.referrerPolicy = "no-referrer"
      script.onerror = () => {
        // Retry once after a small delay if network hiccups
        setTimeout(() => {
          const retry = document.createElement("script")
          retry.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          retry.async = true
          retry.crossOrigin = "anonymous"
          retry.referrerPolicy = "no-referrer"
          document.body.appendChild(retry)
        }, 600)
      }
      document.body.appendChild(script)
    })
  }, [injectHideStyles, ready])

  const applyLanguage = useCallback(
    async (target: "en" | "hi") => {
      await ensureScript()
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo")
      if (!combo) {
        pendingLang.current = target
        setTimeout(() => applyLanguage(target), 120)
        return
      }
      if (combo.value !== target) {
        combo.value = target
        combo.dispatchEvent(new Event("change"))
      }
      document.documentElement.setAttribute("lang", target)
      setLang(target)
    },
    [ensureScript],
  )

  useEffect(() => {
    // Preload quietly so the first click feels instant
    ensureScript().then(() => {
      if (pendingLang.current) {
        applyLanguage(pendingLang.current)
        pendingLang.current = null
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex items-center gap-2">
      {/* Hidden mount point for Google widget */}
      <div id="google_translate_element" className="sr-only" aria-hidden="true" />
      <Button
        variant={lang === "hi" ? "default" : "secondary"}
        className="min-w-24"
        onClick={() => applyLanguage("hi")}
        aria-pressed={lang === "hi"}
      >
        हिंदी
      </Button>
      <Button
        variant={lang === "en" ? "default" : "secondary"}
        className="min-w-24"
        onClick={() => applyLanguage("en")}
        aria-pressed={lang === "en"}
      >
        English
      </Button>
    </div>
  )
}
