import Link from "next/link"
import { BriefcaseBusiness } from "lucide-react"
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa"

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Career library", href: "/career-library" },
      { label: "About JobSphere", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Brand guidelines", href: "/brand" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
]

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/rifaa.tamannaa",
    icon: FaFacebookF,
  },
  {
    label: "GitHub",
    href: "https://github.com/rifaa-tamanna",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rifaa-tamanna",
    icon: FaLinkedinIn,
  },
]

export default function FooterSection() {
  return (
    <footer className="w-full border-t border-[#D6D4CE] bg-[#F8F7F3] dark:border-[#383A40] dark:bg-[#191A1E]">
      <div className="mx-auto max-w-[1440px] px-5 pt-14 pb-7 sm:px-8 sm:pt-16 lg:px-12">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 border-b border-[#D6D4CE] pb-12 dark:border-[#383A40] sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">

          {/* Brand Section */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              {/* Logo Icon */}
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#A5A39C] bg-[#25262B] text-[#E8E5DC] transition-transform duration-300 group-hover:-rotate-6 dark:border-[#777980]">
                <BriefcaseBusiness size={21} strokeWidth={1.5} />

                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[#F8F7F3] bg-[#B8B5AC] dark:border-[#191A1E]" />
              </div>

              {/* Brand Name */}
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

            <p className="mt-5 max-w-[290px] font-[family-name:var(--font-manrope)] text-sm leading-7 text-[#777980] dark:text-[#92939A]">
              The AI-native career platform. Built for people who take their
              work seriously and their future further.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D6D4CE] text-[#777980] transition-all duration-300 hover:-translate-y-1 hover:border-[#25262B] hover:bg-[#25262B] hover:text-white dark:border-[#383A40] dark:text-[#92939A] dark:hover:border-[#EAE7DE] dark:hover:bg-[#EAE7DE] dark:hover:text-[#191A1E]"
                  >
                    <Icon size={17} />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Footer Link Groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-[0.14em] text-[#55575F] uppercase dark:text-[#C1BEB5]">
                {group.title}
              </h3>

              <ul className="mt-5 space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-manrope)] text-[13px] text-[#85878E] transition-colors duration-200 hover:text-[#25262B] dark:text-[#92939A] dark:hover:text-[#F1EEE6]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 pt-6 font-[family-name:var(--font-manrope)] text-[11px] text-[#92939A] sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright & Developer */}
          <div className="flex flex-col gap-2">
            <p>
              © {new Date().getFullYear()} JobSphere. All rights reserved.
            </p>

            <p>
              Built & Developed by{" "}
              <Link
                href="https://rifaa-tamanna-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#55575F] transition-colors hover:text-[#25262B] dark:text-[#C1BEB5] dark:hover:text-[#F1EEE6]"
              >
                Rifa Tamanna
              </Link>
              .
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-[family-name:var(--font-space-mono)] text-[10px]">
            <Link
              href="/terms"
              className="transition-colors hover:text-[#25262B] dark:hover:text-[#F1EEE6]"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy"
              className="transition-colors hover:text-[#25262B] dark:hover:text-[#F1EEE6]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/contact"
              className="transition-colors hover:text-[#25262B] dark:hover:text-[#F1EEE6]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
