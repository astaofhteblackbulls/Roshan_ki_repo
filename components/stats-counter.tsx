"use client"

import { useEffect, useState } from "react"

export function StatsCounter({ to = 100000, duration = 1200 }: { to?: number; duration?: number }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setValue(Math.round(eased * to))
      if (t < 1) requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])

  return <span>{value.toLocaleString("en-IN")}</span>
}
