"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Eye,
  EyeOff,
  ShieldCheck,
  UserSearch,
} from "lucide-react"

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

type AuthMode = "sign-in" | "sign-up"
export type UserRole = "seeker" | "recruiter" | "admin"
type SubmitStatus = "idle" | "loading" | "success" | "error"

export interface AuthFormData {
  name?: string
  email: string
  password: string
  confirmPassword?: string
  role?: UserRole
}

interface AuthFormProps {
  mode: AuthMode
  onSubmit?: (data: AuthFormData) => Promise<void>
}

interface AuthFieldProps {
  id: string
  name: string
  label: string
  type?: string
  placeholder: string
  autoComplete: string
}

const roleOptions: {
  value: UserRole
  label: string
  description: string
  icon: typeof UserSearch
}[] = [
  {
    value: "seeker",
    label: "Seeker",
    description: "Find jobs",
    icon: UserSearch,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Hire talent",
    icon: Building2,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage site",
    icon: ShieldCheck,
  },
]

const isUserRole = (value: string | undefined): value is UserRole =>
  value === "seeker" || value === "recruiter" || value === "admin"

function AuthField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: AuthFieldProps) {
  const [visible, setVisible] = useState(false)

  const isPassword = type === "password"
  const inputType = isPassword && visible ? "text" : type

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
            onClick={() => setVisible(!visible)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#888A91] transition-colors duration-200 hover:text-[#24252A] dark:hover:text-[#EAE7DE]"
          >
            {visible ? (
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

function RoleField() {
  return (
    <fieldset className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <legend className="font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-[0.6px] text-[#777980] uppercase dark:text-[#A5A5A2]">
          I am joining as
        </legend>

        <span className="text-[10px] text-[#92939A] dark:text-[#777980]">
          Select your role
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {roleOptions.map((option) => {
          const Icon = option.icon

          return (
            <label key={option.value} className="group relative cursor-pointer">
              <input
                type="radio"
                name="role"
                value={option.value}
                defaultChecked={option.value === "seeker"}
                className="peer sr-only"
              />

              <div className="relative flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-xl border border-[#D6D4CE] bg-[#F8F7F3] px-2 py-4 text-center text-[#888A91] transition-all duration-200 peer-checked:border-[#25262B] peer-checked:bg-white peer-checked:text-[#24252A] peer-checked:shadow-[0_12px_26px_-18px_rgba(36,37,42,0.7)] peer-focus-visible:ring-2 peer-focus-visible:ring-[#25262B]/40 hover:border-[#B8B5AC] hover:bg-white dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#A5A5A2] dark:peer-checked:border-[#E5E2D9] dark:peer-checked:bg-[#303137] dark:peer-checked:text-[#F1EEE6] dark:peer-focus-visible:ring-[#E5E2D9]/40 dark:hover:border-[#777980] dark:hover:bg-[#303137]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAE8E2] transition-colors duration-200 group-has-[:checked]:bg-[#25262B] dark:bg-[#383A40] dark:group-has-[:checked]:bg-[#E5E2D9]">
                  <Icon
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#555861] transition-colors duration-200 group-has-[:checked]:text-[#F2F0E9] dark:text-[#D0CEC6] dark:group-has-[:checked]:text-[#202126]"
                  />
                </span>

                <span className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold tracking-[0.3px] uppercase">
                  {option.label}
                </span>

                <span className="text-[10px] leading-tight opacity-70">
                  {option.description}
                </span>

                <span className="absolute top-2 right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#B8B5AC] transition-colors duration-200 group-has-[:checked]:border-[#25262B] group-has-[:checked]:bg-[#25262B] dark:border-[#777980] dark:group-has-[:checked]:border-[#E5E2D9] dark:group-has-[:checked]:bg-[#E5E2D9]">
                  <span className="h-1 w-1 rounded-full bg-white opacity-0 transition-opacity group-has-[:checked]:opacity-100 dark:bg-[#202126]" />
                </span>
              </div>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [collected, setCollected] = useState<Record<string, string> | null>(
    null
  )
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [message, setMessage] = useState<string | null>(null)

  const isSignIn = mode === "sign-in"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const raw = Object.fromEntries(formData.entries()) as Record<string, string>

    setCollected(raw)

    console.log(
      `[${isSignIn ? "Sign in" : "Sign up"}] collected form data:`,
      raw
    )

    const payload: AuthFormData = {
      name: raw.name,
      email: raw.email,
      password: raw.password,
    }

    if (isSignIn) {
      delete payload.name
    } else {
      if (raw.password !== raw.confirmPassword) {
        setStatus("error")
        setMessage("Passwords do not match.")
        return
      }

      payload.role = isUserRole(raw.role) ? raw.role : "seeker"
    }

    if (!onSubmit) return

    setStatus("loading")
    setMessage(null)

    try {
      await onSubmit(payload)

      setStatus("success")
      setMessage(
        isSignIn ? "Signed in successfully." : "Account created successfully."
      )
    } catch (error) {
      console.error(`[${isSignIn ? "Sign in" : "Sign up"}] failed:`, error)

      setStatus("error")
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    }
  }

  const heading = isSignIn ? "Welcome back" : "Create your account"

  const subheading = isSignIn
    ? "Sign in to continue your job search."
    : "Choose how you'll use the platform, then create your account."

  const submitLabel = isSignIn ? "SIGN IN" : "CREATE ACCOUNT"

  const toggleLinks: { key: AuthMode; label: string }[] = [
    { key: "sign-in", label: "SIGN IN" },
    { key: "sign-up", label: "SIGN UP" },
  ]

  return (
    <section className="relative isolate flex min-h-[calc(100vh-82px)] items-center justify-center overflow-hidden bg-[#F8F7F3] px-5 py-16 dark:bg-[#0E0F12]">
      {/* Background glow + particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-140px] left-1/2 h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-[#24252A]/5 blur-3xl dark:bg-white/5" />
        <div className="absolute bottom-[-220px] left-1/2 h-[420px] w-[960px] -translate-x-1/2 rounded-full bg-[#24252A]/[0.07] blur-3xl dark:bg-white/[0.08]" />

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

        {/* Card */}
        <div className="rounded-2xl border border-[#D6D4CE] bg-white p-6 shadow-[0_24px_60px_-32px_rgba(36,37,42,0.35)] sm:p-8 dark:border-[#44464B] dark:bg-[#191A1E] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)]">
          {/* Toggle between sign-in / sign-up */}
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
            {/* Role selection - Only for sign up */}
            {!isSignIn && <RoleField />}

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
              disabled={status === "loading"}
              className="group mt-1 flex w-full items-center justify-center gap-3 rounded-full bg-[#25262B] px-6 py-4 font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#F2F0E9] transition duration-300 hover:bg-[#41434A] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
            >
              {status === "loading"
                ? isSignIn
                  ? "SIGNING IN..."
                  : "CREATING ACCOUNT..."
                : submitLabel}

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            {/* Status feedback */}
            {status === "error" && message && (
              <p
                role="alert"
                className="rounded-xl border border-[#E4C9C5] bg-[#FBF4F3] px-4 py-3 text-center text-[13px] text-[#A33B33] dark:border-[#5A3B38] dark:bg-[#2A1F1E] dark:text-[#E9A097]"
              >
                {message}
              </p>
            )}

            {status === "success" && message && (
              <p
                role="status"
                className="rounded-xl border border-[#D6D4CE] bg-[#F8F7F3] px-4 py-3 text-center text-[13px] text-[#373940] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#E4E1DA]"
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
