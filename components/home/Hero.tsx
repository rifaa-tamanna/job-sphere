import Link from "next/link"
import { BriefcaseBusiness, MapPin, Search } from "lucide-react"

const trendingPositions = [
  { name: "Product Designer", href: "/jobs?search=Product%20Designer" },
  { name: "AI Engineering", href: "/jobs?search=AI%20Engineering" },
  { name: "Dev-ops Engineer", href: "/jobs?search=Dev-ops%20Engineer" },
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

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#D6D4CE] bg-[#F8F7F3] dark:border-[#383A40] dark:bg-[#0E0F12]">
      {/* Background glow + particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-140px] h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-[#24252A]/5 blur-3xl dark:bg-white/5" />
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

      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 pt-16 pb-24 sm:px-8 lg:px-12 lg:pt-24 lg:pb-32">
        {/* Badge */}
        <div className="flex w-full max-w-2xl items-center justify-center gap-4">
          <span className="hidden h-px flex-1 bg-[#D6D4CE] sm:block dark:bg-[#414249]" />

          <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-[#D6D4CE] bg-white px-4 py-2.5 dark:border-[#44464B] dark:bg-[#191A1E]">
            <BriefcaseBusiness
              size={15}
              strokeWidth={1.7}
              className="text-[#777980] dark:text-[#B8B5AC]"
            />
            <span className="font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#24252A] dark:text-[#EAE7DE]">
              50,000+
            </span>
            <span className="font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#888A91] dark:text-[#A5A5A2]">
              NEW JOBS THIS MONTH
            </span>
          </div>

          <span className="hidden h-px flex-1 bg-[#D6D4CE] sm:block dark:bg-[#414249]" />
        </div>

        {/* Headline */}
        <h1 className="mt-8 max-w-3xl bg-gradient-to-b from-[#24252A] to-[#565860] bg-clip-text text-center text-[40px] font-bold leading-[1.05] tracking-[-2.5px] text-transparent sm:text-[54px] lg:text-[64px] dark:from-[#F1EEE6] dark:to-[#A5A5A2]">
          Find Your Dream Job Today
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-center text-[15px] leading-relaxed text-[#777980] sm:text-base dark:text-[#A5A5A2]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search Bar */}
        <form
          action="/jobs"
          method="GET"
          className="mt-10 flex w-full max-w-3xl flex-col gap-1 rounded-2xl border border-[#D6D4CE] bg-white p-2.5 shadow-[0_18px_40px_-24px_rgba(36,37,42,0.35)] sm:flex-row sm:items-center sm:gap-2 dark:border-[#44464B] dark:bg-[#191A1E] dark:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)]"
        >
          {/* Job title field */}
          <div className="flex flex-1 items-center gap-3 px-3 py-2.5">
            <Search size={18} strokeWidth={1.7} className="shrink-0 text-[#888A91]" />
            <input
              name="search"
              type="search"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-sm text-[#25262B] outline-none placeholder:text-[#92939A] dark:text-white dark:placeholder:text-[#777980]"
            />
          </div>

          {/* Divider */}
          <span className="hidden h-6 w-px bg-[#D6D4CE] sm:block dark:bg-[#414249]" />
          <span className="mx-3 h-px bg-[#E4E2DC] sm:hidden dark:bg-[#303137]" />

          {/* Location field */}
          <div className="flex flex-1 items-center gap-3 px-3 py-2.5">
            <MapPin size={18} strokeWidth={1.7} className="shrink-0 text-[#888A91]" />
            <input
              name="location"
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-sm text-[#25262B] outline-none placeholder:text-[#92939A] dark:text-white dark:placeholder:text-[#777980]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            aria-label="Search jobs"
            className="flex h-12 w-full shrink-0 items-center justify-center rounded-full bg-[#25262B] text-[#F2F0E9] transition duration-300 hover:bg-[#41434A] sm:h-11 sm:w-11 dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
          >
            <Search size={19} strokeWidth={2} />
          </button>
        </form>

        {/* Trending */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <span className="font-[family-name:var(--font-space-mono)] text-[13px] tracking-[-0.4px] text-[#888A91] dark:text-[#A5A5A2]">
            Trending Position
          </span>

          {trendingPositions.map((position) => (
            <Link
              key={position.name}
              href={position.href}
              className="rounded-full border border-[#D6D4CE] bg-white px-4 py-2 font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#565860] transition duration-200 hover:border-[#25262B] hover:text-[#24252A] dark:border-[#44464B] dark:bg-[#191A1E] dark:text-[#A5A5A2] dark:hover:border-[#E5E2D9] dark:hover:text-[#F1EEE6]"
            >
              {position.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
