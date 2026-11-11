"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  UserRound,
} from "lucide-react"

import { authClient } from "@/lib/auth-client"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Find Jobs", href: "/jobs" },
  { name: "Companies", href: "/companies" },
  { name: "Career Advice", href: "/career-advice" },
  { name: "About Us", href: "/about" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isDark = mounted && theme === "dark"

  // Sign Out Handler
  const handleSignOut = async () => {
    try {
      setSigningOut(true)

      const { error } = await authClient.signOut()

      if (error) {
        throw new Error(error.message)
      }

      setMobileOpen(false)
      setSearchOpen(false)

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Sign Out Error:", error)
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#D6D4CE] bg-[#F8F7F3]/95 backdrop-blur-xl dark:border-[#383A40] dark:bg-[#191A1E]/95">
      <nav className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">

          {/* Logo Icon */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#A5A39C] bg-[#25262B] text-[#E8E5DC] transition-transform duration-300 group-hover:rotate-[-8deg] dark:border-[#777980]">
            <BriefcaseBusiness size={21} strokeWidth={1.5} />

            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[#F8F7F3] bg-[#B8B5AC] dark:border-[#191A1E]" />
          </div>

          {/* Brand Typography */}
          <div className="flex items-baseline gap-1">
            <span className="font-[family-name:var(--font-bodoni)] text-[31px] font-semibold tracking-[-1.5px] text-[#24252A] dark:text-[#EAE7DE]">
              Job
            </span>

            <span className="font-[family-name:var(--font-space-mono)] text-[15px] font-bold tracking-[-0.8px] text-[#777980] dark:text-[#A9A9A7]">
              SPHERE
            </span>

            <span className="mb-1 h-1.5 w-1.5 rounded-full bg-[#96938B]" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative py-2 font-[family-name:var(--font-space-mono)] text-[13px] font-bold tracking-[-0.4px] transition-colors duration-200 ${
                  active
                    ? "text-[#24252A] dark:text-[#F1EEE6]"
                    : "text-[#777980] hover:text-[#24252A] dark:text-[#A5A5A2] dark:hover:text-[#F1EEE6]"
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-current transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            )
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Open search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#565860] transition hover:bg-[#E9E7E0] dark:text-[#D0CEC6] dark:hover:bg-[#303137]"
          >
            <Search size={19} strokeWidth={1.7} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D6D4CE] text-[#44464D] transition hover:bg-[#E9E7E0] dark:border-[#44464B] dark:text-[#EAE7DE] dark:hover:bg-[#303137]"
          >
            {isDark ? (
              <Sun size={18} strokeWidth={1.7} />
            ) : (
              <Moon size={18} strokeWidth={1.7} />
            )}
          </button>

          <div className="mx-1 h-7 w-px bg-[#D6D4CE] dark:bg-[#414249]" />

          {/* Authentication Actions */}
          <div className="flex items-center gap-4">

            {isPending ? null : session?.user ? (
              <>
                {/* Logged In User */}
                <div className="flex items-center gap-3 rounded-full border border-[#D6D4CE] bg-white px-4 py-2.5 shadow-sm transition-colors dark:border-[#44464B] dark:bg-[#191A1E]">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25262B] text-[#EAE7DE] dark:bg-[#E5E2D9] dark:text-[#202126]">
                    <UserRound size={16} strokeWidth={1.7} />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-[1px] text-[#92939A] uppercase dark:text-[#777980]">
                      Welcome back
                    </span>

                    <span className="max-w-[120px] truncate font-[family-name:var(--font-manrope)] text-[13px] font-bold text-[#25262B] dark:text-[#EAE7DE]">
                      {session.user.name}
                    </span>
                  </div>

                  <span className="h-2 w-2 rounded-full bg-[#7D9B78]" />
                </div>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="group relative px-2 py-3 font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#373940] transition-colors duration-300 hover:text-[#888A91] disabled:cursor-not-allowed disabled:opacity-50 dark:text-[#E4E1DA] dark:hover:text-white"
                >
                  {signingOut ? "SIGNING OUT..." : "SIGN OUT"}

                  <span className="absolute bottom-1 left-2 h-px w-0 bg-[#25262B] transition-all duration-300 group-hover:w-[calc(100%-16px)] dark:bg-[#E5E2D9]" />
                </button>
              </>
            ) : (
              /* Logged Out User */
              <Link
                href="/sign-in"
                className="group relative px-2 py-3 font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#373940] transition-colors duration-300 hover:text-[#888A91] dark:text-[#E4E1DA] dark:hover:text-white"
              >
                SIGN IN

                <span className="absolute bottom-1 left-2 h-px w-0 bg-[#25262B] transition-all duration-300 group-hover:w-[calc(100%-16px)] dark:bg-[#E5E2D9]" />
              </Link>
            )}

            {/* Post a Job - Always Visible */}
            <Link
              href="/post-job"
              className="group flex items-center gap-3 rounded-full border border-[#25262B] bg-[#25262B] px-5 py-3.5 font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#F2F0E9] shadow-[0_8px_20px_-12px_rgba(36,37,42,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#41434A] hover:shadow-lg dark:border-[#E5E2D9] dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
            >
              POST A JOB

              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#44464D] hover:bg-[#E9E7E0] dark:text-[#EAE7DE] dark:hover:bg-[#303137]"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#44464D] hover:bg-[#E9E7E0] dark:text-[#EAE7DE] dark:hover:bg-[#303137]"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Search Panel */}
      {searchOpen && (
        <div className="border-t border-[#D6D4CE] bg-[#F8F7F3] px-5 py-4 dark:border-[#383A40] dark:bg-[#191A1E]">
          <form
            action="/jobs"
            method="GET"
            className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-[#D6D4CE] bg-white px-5 py-3 dark:border-[#414249] dark:bg-[#25262B]"
          >
            <Search size={19} className="shrink-0 text-[#888A91]" />

            <input
              name="search"
              type="search"
              placeholder="Search jobs, roles or companies..."
              className="w-full bg-transparent font-[family-name:var(--font-manrope)] text-sm text-[#25262B] outline-none placeholder:text-[#92939A] dark:text-white"
            />

            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="text-[#888A91] hover:text-[#25262B] dark:hover:text-white"
            >
              <X size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-[#D6D4CE] bg-[#F8F7F3] px-6 py-7 lg:hidden dark:border-[#383A40] dark:bg-[#191A1E]">

          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => {
              const active = pathname === link.href

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between border-b border-[#E4E2DC] py-4 font-[family-name:var(--font-space-mono)] text-[13px] font-bold dark:border-[#303137] ${
                    active
                      ? "text-[#24252A] dark:text-white"
                      : "text-[#777980] dark:text-[#A5A5A2]"
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-[11px] opacity-50">
                    0{index + 1}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Authentication Actions */}
          <div className="mt-6 flex flex-col gap-3">

            {isPending ? null : session?.user ? (
              <>
                {/* Mobile User Badge */}
                <div className="flex items-center gap-3 rounded-full border border-[#D6D4CE] bg-white px-4 py-3 shadow-sm dark:border-[#44464B] dark:bg-[#191A1E]">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25262B] text-[#EAE7DE] dark:bg-[#E5E2D9] dark:text-[#202126]">
                    <UserRound size={16} strokeWidth={1.7} />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <span className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-[1px] text-[#92939A] uppercase dark:text-[#777980]">
                      Welcome back
                    </span>

                    <span className="font-[family-name:var(--font-manrope)] text-[13px] font-bold text-[#25262B] dark:text-[#EAE7DE]">
                      {session.user.name}
                    </span>
                  </div>

                  <span className="h-2 w-2 rounded-full bg-[#7D9B78]" />
                </div>

                {/* Mobile Sign Out */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="rounded-full border border-[#D6D4CE] py-3.5 text-center font-[family-name:var(--font-space-mono)] text-xs font-bold tracking-wide text-[#25262B] transition hover:bg-[#E9E7E0] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#44464B] dark:text-[#EAE7DE] dark:hover:bg-[#303137]"
                >
                  {signingOut ? "SIGNING OUT..." : "SIGN OUT"}
                </button>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="rounded-full border border-[#D6D4CE] py-3.5 text-center font-[family-name:var(--font-space-mono)] text-xs font-bold tracking-wide text-[#25262B] dark:border-[#44464B] dark:text-[#EAE7DE]"
              >
                SIGN IN
              </Link>
            )}

            {/* Mobile Post a Job */}
            <Link
              href="/post-job"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25262B] py-3.5 font-[family-name:var(--font-space-mono)] text-xs font-bold tracking-wide text-white dark:bg-[#E5E2D9] dark:text-[#202126]"
            >
              POST A JOB
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
