"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  Users,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  Plus,
  FileUser,
  LogOut,
  Briefcase,
  Tags,
  Bell,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react"

import { useSession, signOut } from "@/lib/auth-client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type UserRole = "seeker" | "recruiter" | "admin"

const menuItemsByRole = {
  seeker: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "billing",
      name: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],

  recruiter: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "post-job",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "jobs",
      name: "Add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: Plus,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      id: "candidates",
      name: "Candidates",
      url: "/dashboard/recruiter/candidates",
      icon: Users,
    },
    {
      id: "interviews",
      name: "Interviews",
      url: "/dashboard/recruiter/interviews",
      icon: CalendarDays,
    },
    {
      id: "company",
      name: "Company Profile",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],

  admin: [
    {
      id: "dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "applications",
      name: "Applications",
      url: "/dashboard/admin/applications",
      icon: FileText,
    },
    {
      id: "categories",
      name: "Categories",
      url: "/dashboard/admin/categories",
      icon: Tags,
    },
    {
      id: "analytics",
      name: "Analytics",
      url: "/dashboard/admin/analytics",
      icon: ChartNoAxesCombined,
    },
    {
      id: "notifications",
      name: "Notifications",
      url: "/dashboard/admin/notifications",
      icon: Bell,
    },
    {
      id: "settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
} satisfies Record<
  UserRole,
  {
    id: string
    name: string
    url: string
    icon: React.ElementType
  }[]
>

const bottomActionByRole = {
  seeker: {
    name: "Post Resume",
    url: "/dashboard/seeker/resume",
    icon: FileUser,
  },
  recruiter: {
    name: "Post a Job",
    url: "/dashboard/recruiter/post-job",
    icon: Plus,
  },
  admin: {
    name: "Manage Users",
    url: "/dashboard/admin/users",
    icon: Users,
  },
}

function isUserRole(value: unknown): value is UserRole {
  return (
    value === "seeker" ||
    value === "recruiter" ||
    value === "admin"
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const { data: session, isPending } = useSession()

  const role: UserRole = isUserRole(session?.user?.role)
    ? session.user.role
    : "seeker"

  const menuItems = menuItemsByRole[role]
  const bottomAction = bottomActionByRole[role]
  const ActionIcon = bottomAction.icon

  // Find the most specific matching menu item
  const activeMenuItem = menuItems
    .filter(
      (item) =>
        pathname === item.url ||
        (item.id !== "dashboard" &&
          pathname.startsWith(`${item.url}/`))
    )
    .sort((a, b) => b.url.length - a.url.length)[0]

  return (
    <Sidebar className="border-r border-[#D6D4CE] bg-[#F8F7F3] dark:border-[#383A40] dark:bg-[#191A1E]">

      {/* Header */}
      <SidebarHeader className="px-4 pt-6 pb-4">

        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 px-2"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#A5A39C] bg-[#25262B] text-[#EAE7DE] transition-transform duration-300 group-hover:-rotate-6 dark:border-[#777980]">
            <Briefcase size={19} strokeWidth={1.6} />
          </div>

          <div className="flex items-baseline gap-1">
            <span className="font-[family-name:var(--font-bodoni)] text-[29px] font-semibold tracking-[-1.5px] text-[#24252A] dark:text-[#EAE7DE]">
              Job
            </span>

            <span className="font-[family-name:var(--font-space-mono)] text-[13px] font-bold tracking-[-0.8px] text-[#777980] dark:text-[#A9A9A7]">
              SPHERE
            </span>

            <span className="mb-1 size-1.5 rounded-full bg-[#96938B]" />
          </div>
        </Link>

        {/* User Info */}
        <div className="mt-7 rounded-xl border border-[#D6D4CE] bg-white p-3.5 transition-colors dark:border-[#383A40] dark:bg-[#222329]">
          <div className="flex items-center gap-3">

            <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#D6D4CE] bg-[#F0EFEA] font-[family-name:var(--font-manrope)] text-sm font-bold text-[#25262B] dark:border-[#44464B] dark:bg-[#35363C] dark:text-[#EAE7DE]">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-[family-name:var(--font-manrope)] text-sm font-bold text-[#25262B] dark:text-[#EAE7DE]">
                {session?.user?.name || "User"}
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#7D9B78]" />

                <p className="font-[family-name:var(--font-space-mono)] text-[9px] uppercase tracking-[1px] text-[#92939A]">
                  {role} portal
                </p>
              </div>
            </div>

            <ChevronRight className="size-4 text-[#A5A39C] dark:text-[#777980]" />

          </div>
        </div>

      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 py-5">

        <SidebarGroup className="gap-3">

          <div className="px-3">
            <p className="font-[family-name:var(--font-space-mono)] text-[9px] font-bold uppercase tracking-[2px] text-[#A5A39C] dark:text-[#777980]">
              Main Menu
            </p>
          </div>

          <SidebarMenu className="gap-1.5">

            {!isPending &&
              menuItems.map((item) => {
                const Icon = item.icon

                const isActive =
                  activeMenuItem?.id === item.id

                return (
                  <SidebarMenuItem key={item.id}>

                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      tooltip={item.name}
                      className={`
                        relative h-11 rounded-lg px-3
                        font-[family-name:var(--font-manrope)]
                        text-[13px] font-semibold
                        transition-all duration-200

                        ${
                          isActive
                            ? "bg-[#EAE8E1] text-[#24252A] hover:bg-[#EAE8E1] dark:bg-[#303137] dark:text-[#EAE7DE] dark:hover:bg-[#303137]"
                            : "text-[#777980] hover:bg-[#EE EDE7] hover:text-[#24252A] dark:text-[#A5A5A2] dark:hover:bg-[#292A30] dark:hover:text-[#EAE7DE]"
                        }
                      `}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-2.5 h-6 w-[3px] rounded-r-full bg-[#777980] dark:bg-[#D6D4CE]" />
                      )}

                      <Icon
                        className={`size-[18px] shrink-0 ${
                          isActive
                            ? "text-[#44464D] dark:text-[#EAE7DE]"
                            : ""
                        }`}
                        strokeWidth={1.8}
                      />

                      <span>{item.name}</span>

                    </SidebarMenuButton>

                  </SidebarMenuItem>
                )
              })}

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="gap-4 border-t border-[#D6D4CE] px-4 pt-5 pb-6 dark:border-[#383A40]">

        {/* Bottom Action */}
        <Link
          href={bottomAction.url}
          className="group flex h-11 items-center justify-center gap-2 rounded-lg bg-[#25262B] px-3 font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-wide text-[#EAE7DE] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#44464D] dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
        >
          <ActionIcon className="size-4 transition-transform duration-200 group-hover:rotate-90" />

          <span>{bottomAction.name}</span>

          <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>

        {/* Logout */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => {
                await signOut()
                router.push("/")
                router.refresh()
              }}
              className="h-10 rounded-lg px-3 font-[family-name:var(--font-manrope)] text-[13px] font-semibold text-[#777980] transition-colors hover:bg-[#F0EAE7] hover:text-[#A34F48] dark:text-[#A5A5A2] dark:hover:bg-[#302725] dark:hover:text-[#D78C82]"
            >
              <LogOut className="size-[18px]" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="px-3">
          <p className="font-[family-name:var(--font-space-mono)] text-[9px] tracking-wide text-[#A5A39C] dark:text-[#777980]">
            JOBSPHERE © 2026
          </p>
        </div>

      </SidebarFooter>
    </Sidebar>
  )
}
