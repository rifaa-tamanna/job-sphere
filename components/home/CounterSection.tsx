"use client"

import { useEffect, useRef, useState } from "react"
import { BriefcaseBusiness, Building2, Star, UserSearch } from "lucide-react"

type Stat = {
  icon: typeof Star
  value: number
  suffix: string
  label: string
  description: string
}

const stats: Stat[] = [
  {
    icon: BriefcaseBusiness,
    value: 50,
    suffix: "K",
    label: "Active Jobs",
    description: "Live roles from verified employers",
  },
  {
    icon: Building2,
    value: 12,
    suffix: "K",
    label: "Companies",
    description: "Startups to global enterprises",
  },
  {
    icon: UserSearch,
    value: 2,
    suffix: "M",
    label: "Job Seekers",
    description: "Professionals searching with us",
  },
  {
    icon: Star,
    value: 97,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Based on candidate feedback",
  },
]

const stars = [
  { top: "8%", left: "6%", size: 3, delay: "0.2s" },
  { top: "16%", left: "18%", size: 2, delay: "1.4s" },
  { top: "6%", left: "34%", size: 2, delay: "0.8s" },
  { top: "12%", left: "64%", size: 3, delay: "2.2s" },
  { top: "7%", left: "82%", size: 2, delay: "1.1s" },
  { top: "20%", left: "94%", size: 2, delay: "0.5s" },
  { top: "58%", left: "3%", size: 2, delay: "1.8s" },
  { top: "70%", left: "97%", size: 3, delay: "0.9s" },
  { top: "88%", left: "22%", size: 2, delay: "2.5s" },
  { top: "92%", left: "74%", size: 2, delay: "1.6s" },
]

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

function useInView() {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

function StatCard({ stat, active }: { stat: Stat; active: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return

    const duration = 1800
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      if (prefersReducedMotion()) {
        setDisplay(stat.value)
        return
      }

      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setDisplay(Math.round(stat.value * eased))

      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, stat.value])

  const Icon = stat.icon

  return (
    <div className="group relative flex flex-col rounded-2xl border border-[#D6D4CE] bg-white p-4 shadow-[0_14px_35px_-26px_rgba(36,37,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B8B5AC] hover:shadow-[0_20px_40px_-24px_rgba(36,37,42,0.25)] sm:p-5 dark:border-[#44464B] dark:bg-[#191A1E] dark:shadow-[0_14px_35px_-24px_rgba(0,0,0,0.8)] dark:hover:border-[#777980]">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E4E2DC] bg-[#F8F7F3] text-[#565860] transition-all duration-300 group-hover:border-[#25262B] group-hover:bg-[#F1F0EC] group-hover:text-[#24252A] dark:border-[#414249] dark:bg-[#25262B] dark:text-[#D0CEC6] dark:group-hover:border-[#E5E2D9] dark:group-hover:bg-[#303137] dark:group-hover:text-[#F1EEE6]">
        <Icon size={16} strokeWidth={1.7} />
      </div>

      <p className="mt-6 bg-gradient-to-b from-[#24252A] to-[#565860] bg-clip-text text-[36px] leading-none font-bold tracking-[-1.8px] text-transparent sm:text-[40px] dark:from-[#F1EEE6] dark:to-[#A5A5A2]">
        <span aria-hidden="true">
          {display}
          {stat.suffix}
        </span>
        <span className="sr-only">
          {stat.value}
          {stat.suffix}
        </span>
      </p>

      <p className="mt-2.5 text-[14px] font-medium text-[#373940] dark:text-[#E4E1DA]">
        {stat.label}
      </p>

      <p className="mt-1 text-[12px] leading-snug text-[#888A91] dark:text-[#A5A5A2]">
        {stat.description}
      </p>

      <div className="absolute right-5 bottom-0 left-5 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8B5AC] to-transparent transition-transform duration-500 group-hover:scale-x-100 dark:via-[#777980]" />
    </div>
  )
}

export default function CounterSection() {
  const { ref, inView } = useInView()

  return (
    <section
      ref={ref}
      aria-labelledby="counter-heading"
      className="relative isolate overflow-hidden bg-[#545353] px-5 pt-12 pb-14 sm:px-8 lg:px-12 lg:pt-16 lg:pb-18 dark:bg-[#0E0F12]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-300px] left-1/2 h-[560px] w-[1100px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[#24252A]/[0.05] blur-[110px] dark:bg-white/[0.09]" />
        <div className="absolute top-[-160px] left-1/2 h-[320px] w-[640px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[#24252A]/[0.035] blur-3xl dark:bg-white/[0.12]" />
        <div className="absolute bottom-[-220px] left-1/2 h-[380px] w-[900px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[#24252A]/[0.035] blur-3xl dark:bg-white/[0.06]" />

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

      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#D6D4CE] sm:w-16 dark:bg-[#414249]" />

            <span className="font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-wide text-[#888A91] uppercase dark:text-[#A5A5A2]">
              Our Reach
            </span>

            <span className="h-px w-10 bg-[#D6D4CE] sm:w-16 dark:bg-[#414249]" />
          </div>

          <h2
            id="counter-heading"
            className="mt-4 bg-gradient-to-b from-[#FFFFFF] to-[#E4E2DC] bg-clip-text text-center text-[26px] leading-[1.15] font-bold tracking-[-1.2px] text-transparent sm:text-[32px] lg:text-[36px] dark:from-[#F1EEE6] dark:to-[#A5A5A2]"
          >
            Assisting over 15,000 job seekers find their dream positions.
          </h2>
        </div>

        <div className="mx-auto mt-9 grid max-w-[850px] grid-cols-2 gap-3.5 sm:gap-5 lg:mt-11">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
