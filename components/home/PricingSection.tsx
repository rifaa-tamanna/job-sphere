"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Crown,
  Plus,
  Zap,
  ChartNoAxesColumnIncreasing,
} from "lucide-react"

const plans = [
  {
    name: "Starter",
    icon: Crown,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "A simple starting point for your next career move.",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    href: "/sign-up?plan=starter",
    featured: false,
  },
  {
    name: "Growth",
    icon: ChartNoAxesColumnIncreasing,
    monthlyPrice: 17,
    yearlyPrice: 12.75,
    description: "More insights to make your next move with confidence.",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    href: "/sign-up?plan=growth",
    featured: true,
  },
  {
    name: "Premium",
    icon: Zap,
    monthlyPrice: 99,
    yearlyPrice: 74.25,
    description: "Advanced tools for ambitious professionals and teams.",
    features: [
      "Everything in Growth",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    href: "/sign-up?plan=premium",
    featured: false,
  },
]

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

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-[#545353] py-20 sm:py-24 dark:bg-[#0E0F12]"
    >
      {/* Background glow + particles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-[-140px] left-1/2 h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl dark:bg-white/5" />

        <div className="absolute bottom-[-220px] left-1/2 h-[420px] w-[960px] -translate-x-1/2 rounded-full bg-white/[0.08] blur-3xl dark:bg-white/[0.08]" />

        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white/40 dark:bg-white/30"
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

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-3 font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-[0.18em] text-[#E5E2D9] dark:text-[#A5A5A2]">
            <span className="h-px w-10 bg-[#D6D4CE] sm:w-16 dark:bg-[#414249]" />

            <span className="font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-wide text-[#888A91] uppercase dark:text-[#A5A5A2]">
              Pricing
            </span>

            <span className="h-px w-10 bg-[#D6D4CE] sm:w-16 dark:bg-[#414249]" />
          </div>

          <h2 className="mt-5 bg-gradient-to-b from-white to-[#D6D4CE] bg-clip-text text-[36px] leading-[1.12] font-bold tracking-[-1.8px] text-balance text-transparent sm:text-[46px] dark:from-[#F1EEE6] dark:to-[#A5A5A2]">
            Pay for the leverage,
            <br className="hidden sm:block" /> not the listings.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#E0DED8] dark:text-[#92939A]">
            Choose the tools that fit your career goals. Start free and upgrade
            whenever you are ready.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 p-1.5 shadow-sm backdrop-blur-sm dark:border-[#383A40] dark:bg-[#191A1E]">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                billing === "monthly"
                  ? "bg-white text-[#25262B] shadow-sm dark:bg-[#E5E2D9] dark:text-[#202126]"
                  : "text-[#E0DED8] hover:text-white dark:text-[#A5A5A2] dark:hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                billing === "yearly"
                  ? "bg-white text-[#25262B] shadow-sm dark:bg-[#E5E2D9] dark:text-[#202126]"
                  : "text-[#E0DED8] hover:text-white dark:text-[#A5A5A2] dark:hover:text-white"
              }`}
            >
              Yearly
              <span className="rounded-full bg-[#7771D9] px-2 py-0.5 text-[10px] font-bold text-white">
                25% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-8 grid max-w-[1180px] grid-cols-1 items-stretch gap-4 md:grid-cols-3 lg:gap-5">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price =
              billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice

            return (
              <article
                key={plan.name}
                className={`relative flex min-h-[390px] flex-col rounded-[22px] border p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${
                  plan.featured
                    ? "border-white/60 bg-[#666565] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.4)] dark:border-[#55565F] dark:bg-[#1B1C20] dark:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
                    : "border-white/20 bg-[#5D5C5C] dark:border-[#303137] dark:bg-[#111216]/80"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#7771D9] px-3 py-1 font-[family-name:var(--font-space-mono)] text-[9px] font-bold tracking-[0.12em] text-white">
                    MOST POPULAR
                  </span>
                )}

                {/* Plan Name + Price */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white dark:border-[#383A40] dark:bg-[#24252B] dark:text-[#D5D1C7]">
                      <Icon size={19} strokeWidth={1.8} />
                    </span>

                    <h3 className="text-[16px] font-semibold text-white dark:text-[#EAE7DE]">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[34px] leading-none font-semibold tracking-[-1.8px] text-white dark:text-[#F1EEE6]">
                      ${price}
                    </span>

                    <span className="text-[10px] text-[#D0CEC6] dark:text-[#92939A]">
                      /month
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 min-h-10 text-[12px] leading-5 text-[#E0DED8] dark:text-[#A5A5A2]">
                  {plan.description}
                </p>

                {/* Features */}
                <div className="mt-4">
                  <p className="mb-3 text-[12px] font-medium text-white dark:text-[#D5D1C7]">
                    {plan.name === "Premium"
                      ? "Everything you need to stand out:"
                      : "Everything you need to get started:"}
                  </p>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[11px] leading-5 text-[#E0DED8] dark:text-[#A5A5A2]"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-white/15 text-white dark:bg-[#303137] dark:text-[#D5D1C7]">
                          <Plus size={11} strokeWidth={2} />
                        </span>

                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-7">
                  <Link
                    href={plan.href}
                    className={`group flex h-11 w-full items-center justify-between rounded-xl px-4 text-[11px] font-semibold transition duration-300 ${
                      plan.featured
                        ? "bg-white text-[#25262B] hover:bg-[#EAE9E3] dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
                        : "border border-white/25 bg-white/10 text-white hover:border-white/50 hover:bg-white/20 dark:border-[#383A40] dark:bg-[#292A30] dark:text-[#E5E2D9] dark:hover:bg-[#35363D]"
                    }`}
                  >
                    Choose {plan.name}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom Note */}
        <p className="mt-7 text-center text-[11px] text-[#D0CEC6] dark:text-[#92939A]">
          {billing === "yearly"
            ? "Yearly billing selected · Save 25% compared with monthly billing."
            : "No pressure. Start with the free plan and upgrade at any time."}
        </p>
      </div>
    </section>
  )
}
