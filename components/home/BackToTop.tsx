"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full border border-[#A5A39C] bg-[#25262B] px-4 py-3 text-[#EAE7DE] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#777980] hover:bg-[#35363C] dark:border-[#777980] dark:bg-[#EAE7DE] dark:text-[#191A1E] dark:hover:border-[#A5A39C] dark:hover:bg-white ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <span className="font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-wide">
        Back to Top
      </span>

      <ArrowUp
        size={17}
        strokeWidth={2}
        className="transition-transform duration-300 group-hover:-translate-y-1"
      />
    </button>
  )
}
