"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

interface JobSearchProps {
  initialQuery: string
}

export function JobSearch({ initialQuery }: JobSearchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (query.trim()) {
        params.set("q", query.trim())
      } else {
        params.delete("q")
      }

      const queryString = params.toString()

      const newUrl = queryString ? `${pathname}?${queryString}` : pathname

      const currentUrl = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname

      if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [query, pathname, router, searchParams])

  const handleClear = () => {
    setQuery("")
  }

  return (
    <div className="flex w-full max-w-md items-center">
      <div className="flex h-11 w-full min-w-0 items-center gap-2 rounded-lg border border-[#D6D4CE] bg-white px-3 transition-colors focus-within:border-[#92939A] dark:border-[#44464B] dark:bg-[#25262B] dark:focus-within:border-[#777980]">
        <Search className="size-4 shrink-0 text-[#92939A]" />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs or companies..."
          aria-label="Search jobs"
          className="h-full min-w-0 flex-1 bg-transparent font-[family-name:var(--font-manrope)] text-xs text-[#25262B] outline-none placeholder:text-[#92939A] dark:text-[#EAE7DE]"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="shrink-0 text-[#92939A] transition-colors hover:text-[#25262B] dark:hover:text-[#EAE7DE]"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
