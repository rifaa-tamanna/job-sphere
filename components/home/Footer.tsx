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
      { label: "About HireLoop", href: "/about" },
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

// Social Links
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
    <>
      {/* Footer */}
      <footer className="bg-[#F8F7F3] dark:bg-[#0E0F12]">
        <div className="mx-auto max-w-[1440px] px-5 pt-14 pb-7 sm:px-8 sm:pt-16 lg:px-12">
          <div className="grid grid-cols-1 gap-12 border-b border-[#D6D4CE] pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 dark:border-[#303137]">
            <div className="max-w-sm">
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

              <p className="mt-5 max-w-[290px] text-sm leading-7 text-[#777980] dark:text-[#92939A]">
                The AI-native career platform. Built for people who take their
                work seriously and their future further.
              </p>

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
                    >
                      <Icon size={20} />
                    </Link>
                  )
                })}
              </div>
            </div>

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
                        className="text-[13px] text-[#85878E] transition-colors duration-200 hover:text-[#25262B] dark:text-[#85878E] dark:hover:text-[#F1EEE6]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6 text-[11px] text-[#92939A] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} JobSphere. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
    </>
  )
}
