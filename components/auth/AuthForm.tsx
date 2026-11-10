"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
} from "lucide-react"

type AuthMode = "sign-in" | "sign-up"

export interface AuthFormData {
  name?: string
  email: string
  password: string
  confirmPassword?: string
}

interface AuthFormProps {
  mode: AuthMode
  onSubmit: (data: AuthFormData) => Promise<void>
}

interface AuthFieldProps {
  id: string
  name: string
  label: string
  type?: string
  placeholder: string
  autoComplete: string
}

const stars = [
  { top: "18%", left: "8%", size: 3, delay: "0s" },
  { top: "32%", left: "15%", size: 2, delay: "1.2s" },
  { top: "64%", left: "5%", size: 2, delay: "0.6s" },
  { top: "78%", left: "12%", size: 3, delay: "1.8s" },
  { top: "24%", left: "88%", size: 2, delay: "0.9s" },
  { top: "46%", left: "93%", size: 3, delay: "2.1s" },
  { top: "72%", left: "85%", size: 2, delay: "0.3s" },
  { top: "86%", left: "78%", size: 2, delay: "1.5s" },
  { top: "90%", left: "46%", size: 3, delay: "1.1s" },
  { top: "12%", left: "52%", size: 2, delay: "2.4s" },
]

const AuthField = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: AuthFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-[0.6px] text-[#777980] uppercase dark:text-[#A5A5A2]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-12 w-full rounded-xl border border-[#D6D4CE] bg-[#F8F7F3] pr-11 pl-4 text-sm text-[#25262B] transition-colors duration-200 outline-none placeholder:text-[#92939A] focus:border-[#25262B] dark:border-[#44464B] dark:bg-[#25262B] dark:text-white dark:placeholder:text-[#777980] dark:focus:border-[#E5E2D9]"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#888A91] transition-colors duration-200 hover:text-[#24252A] dark:hover:text-[#EAE7DE]"
          >
            {showPassword ? (
              <EyeOff size={17} strokeWidth={1.7} />
            ) : (
              <Eye size={17} strokeWidth={1.7} />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const isSignIn = mode === "sign-in"
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const data: AuthFormData = {
      name: formData.get("name")?.toString(),
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      confirmPassword: formData.get("confirmPassword")?.toString(),
    }

    if (!isSignIn && data.password !== data.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    try {
      setLoading(true)
      await onSubmit(data)
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setLoading(false)
    }
  }

  const heading = isSignIn ? "Welcome back" : "Create your account"

  const subheading = isSignIn
    ? "Sign in to continue your job search."
    : "Join thousands of professionals landing their next role."

  const submitLabel = isSignIn ? "SIGN IN" : "CREATE ACCOUNT"

  const toggleLinks: { key: AuthMode; label: string }[] = [
    { key: "sign-in", label: "SIGN IN" },
    { key: "sign-up", label: "SIGN UP" },
  ]

  return (
    <section className="relative isolate flex min-h-[calc(100vh-82px)] items-center justify-center overflow-hidden bg-[#F8F7F3] px-5 py-16 dark:bg-[#0E0F12]">

      {/* Background glow + particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-140px] left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[#24252A]/5 blur-3xl dark:bg-white/5" />

        <div className="absolute bottom-[-200px] left-1/2 h-[380px] w-[820px] -translate-x-1/2 rounded-full bg-[#24252A]/[0.06] blur-3xl dark:bg-white/[0.07]" />

        {/* Animated Stars */}
        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-[#24252A]/20 dark:bg-white/30"
            style={{
              top: star.top,
              left: star.left,
              height: star.size,
              width: star.size,
              animation: `hero-pulse 3.5s ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-[440px]">

        {/* Logo */}
        <Link
          href="/"
          className="group mx-auto mb-8 flex w-fit items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#A5A39C] bg-[#25262B] text-[#E8E5DC] transition-transform duration-300 group-hover:rotate-[-8deg] dark:border-[#777980]">
            <BriefcaseBusiness size={21} strokeWidth={1.5} />

            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[#F8F7F3] bg-[#B8B5AC] dark:border-[#0E0F12]" />
          </div>

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

        {/* Auth Card */}
        <div className="rounded-2xl border border-[#D6D4CE] bg-white p-6 shadow-[0_24px_60px_-32px_rgba(36,37,42,0.35)] sm:p-8 dark:border-[#44464B] dark:bg-[#191A1E] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)]">

          {/* Sign In / Sign Up Toggle */}
          <div className="flex gap-1 rounded-full border border-[#D6D4CE] bg-[#F8F7F3] p-1 dark:border-[#44464B] dark:bg-[#25262B]">
            {toggleLinks.map((link) => {
              const active = link.key === mode

              return (
                <Link
                  key={link.key}
                  href={`/${link.key}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex-1 rounded-full py-2.5 text-center font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide transition duration-200 ${
                    active
                      ? "bg-[#25262B] text-[#F2F0E9] dark:bg-[#E5E2D9] dark:text-[#202126]"
                      : "text-[#777980] hover:text-[#24252A] dark:text-[#A5A5A2] dark:hover:text-[#F1EEE6]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Heading */}
          <h1 className="mt-7 bg-gradient-to-b from-[#24252A] to-[#565860] bg-clip-text text-[30px] font-bold tracking-[-1.4px] text-transparent dark:from-[#F1EEE6] dark:to-[#A5A5A2]">
            {heading}
          </h1>

          <p className="mt-2 text-sm text-[#777980] dark:text-[#A5A5A2]">
            {subheading}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">

            {!isSignIn && (
              <AuthField
                id="name"
                name="name"
                label="Full name"
                placeholder="Jane Doe"
                autoComplete="name"
              />
            )}

            <AuthField
              id="email"
              name="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />

            <AuthField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder={
                isSignIn ? "Enter your password" : "Create a password"
              }
              autoComplete={isSignIn ? "current-password" : "new-password"}
            />

            {!isSignIn && (
              <AuthField
                id="confirm-password"
                name="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="group mt-1 flex w-full items-center justify-center gap-3 rounded-full bg-[#25262B] px-6 py-4 font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#F2F0E9] transition duration-300 hover:bg-[#41434A] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
            >
              {loading ? "PLEASE WAIT..." : submitLabel}

              {!loading && (
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
