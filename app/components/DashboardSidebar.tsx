"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Activity,
  BarChart3,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CreditCard,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users,
  UserSearch,
  Search,
  ArrowUpRight,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"

import { useSession } from "@/lib/auth-client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type UserRole = "seeker" | "recruiter" | "admin"

type MenuItem = {
  id: string
  label: string
  url: string
  icon: LucideIcon
}

type BottomAction = {
  label: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  seeker: [
    {
      id: "dashboard",
      label: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "jobs",
      label: "Find Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Search,
    },
    {
      id: "saved-jobs",
      label: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      id: "applications",
      label: "My Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "billing",
      label: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      id: "settings",
      label: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],

  recruiter: [
    {
      id: "dashboard",
      label: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "jobs",
      label: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "add-job",
      label: "Add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "applications",
      label: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      id: "candidates",
      label: "Candidates",
      url: "/dashboard/recruiter/candidates",
      icon: UserSearch,
    },
    {
      id: "interviews",
      label: "Interviews",
      url: "/dashboard/recruiter/interviews",
      icon: CalendarDays,
    },
    {
      id: "company",
      label: "Company Profile",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },
    {
      id: "settings",
      label: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],

  admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      label: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "jobs",
      label: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "companies",
      label: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "applications",
      label: "Applications",
      url: "/dashboard/admin/applications",
      icon: FileText,
    },
    {
      id: "categories",
      label: "Categories",
      url: "/dashboard/admin/categories",
      icon: Activity,
    },
    {
      id: "analytics",
      label: "Analytics",
      url: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
    {
      id: "notifications",
      label: "Notifications",
      url: "/dashboard/admin/notifications",
      icon: Bell,
    },
    {
      id: "settings",
      label: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

const bottomActionByRole: Record<UserRole, BottomAction> = {
  seeker: {
    label: "Post Resume",
    url: "/dashboard/seeker/resume",
    icon: FileText,
  },
  recruiter: {
    label: "Post a Job",
    url: "/dashboard/recruiter/post-job",
    icon: PlusCircle,
  },
  admin: {
    label: "Manage Users",
    url: "/dashboard/admin/users",
    icon: Users,
  },
}

const dashboardRoutes: Record<UserRole, string> = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
}

function isUserRole(role: unknown): role is UserRole {
  return role === "seeker" || role === "recruiter" || role === "admin"
}

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const role: UserRole = isUserRole(session?.user?.role)
    ? session.user.role
    : "seeker"

  const userName = session?.user?.name || "User"
  const userEmail = session?.user?.email || ""
  const userInitial = userName.charAt(0).toUpperCase()

  const menuItems = menuItemsByRole[role]
  const bottomAction = bottomActionByRole[role]

  const activeMenuItem = menuItems
    .filter(
      (item) =>
        pathname === item.url ||
        (item.id !== "dashboard" && pathname.startsWith(`${item.url}/`))
    )
    .sort((a, b) => b.url.length - a.url.length)[0]

  return (
    <Sidebar className="border-r border-[#383A40] bg-[#191A1E] font-[family-name:var(--font-space-mono)]">
      {/* Logo */}
      <SidebarHeader className="border-b border-[#383A40] bg-[#191A1E] px-4 py-5">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#777980] bg-[#25262B] text-[#E8E5DC] transition-transform duration-300 group-hover:rotate-[-8deg]">
            <BriefcaseBusiness size={21} strokeWidth={1.5} />

            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[#191A1E] bg-[#B8B5AC]" />
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-[25px] font-bold tracking-[-1.5px] text-[#EAE7DE]">
              Job
            </span>

            <span className="text-[15px] font-bold tracking-[-0.8px] text-[#A9A9A7]">
              SPHERE
            </span>

            <span className="mb-1 h-1.5 w-1.5 rounded-full bg-[#96938B]" />
          </div>
        </Link>

        {/* Logged-in User Information */}
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#383A40] bg-[#222329] p-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#383A40] text-sm font-semibold text-[#F1EEE6]">
            {userInitial}

            <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-[#222329] bg-green-500" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#F1EEE6]">
              {userName}
            </p>

            <p className="truncate text-xs text-[#A1A2A8]">{userEmail}</p>

            <p className="mt-1 text-[10px] font-medium tracking-wider text-[#92939A] uppercase">
              {role}
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Scrollable Menu */}
      <SidebarContent className="min-h-0 flex-1 [scrollbar-width:thin] [scrollbar-color:#55575F_transparent] overflow-y-auto overscroll-contain bg-[#191A1E] px-3 py-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#414249] [&::-webkit-scrollbar-track]:bg-transparent">
        <div className="mb-3 px-3">
          <p className="text-[10px] font-medium tracking-[0.16em] text-[#92939A] uppercase">
            Main Menu
          </p>
        </div>

        <SidebarMenu className="gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeMenuItem?.id === item.id

            return (
              <SidebarMenuItem key={item.id}>
                <Link
                  href={item.url}
                  title={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex h-11 w-full items-center gap-2 rounded-lg px-3 text-[13px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#303137] text-[#F1EEE6]"
                      : "text-[#A1A2A8] hover:bg-[#25262B] hover:text-[#F1EEE6]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.7} />

                  <span>{item.label}</span>

                  {isActive && (
                    <span className="ml-auto h-5 w-[3px] rounded-full bg-[#C1BEB5]" />
                  )}
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-[#383A40] bg-[#191A1E] px-3 py-4">
        <SidebarMenu className="gap-2">
          {/* Dynamic Bottom Action */}
          <SidebarMenuItem>
            <Link
              href={bottomAction.url}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#EAE7DE] px-3 text-[13px] font-semibold text-[#191A1E] shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md"
            >
              <bottomAction.icon size={18} strokeWidth={2} />
              <span>{bottomAction.label}</span>
            </Link>
          </SidebarMenuItem>

          {/* Dynamic Dashboard Shortcut */}
          <SidebarMenuItem>
            <Link
              href={dashboardRoutes[role]}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#44464B] bg-[#25262B] px-3 text-[12px] font-medium text-[#D0CEC7] transition-all duration-200 hover:border-[#777980] hover:bg-[#303137] hover:text-white"
            >
              <LayoutDashboard size={17} />
              <span>My Dashboard</span>
              <ArrowUpRight size={14} className="ml-auto" />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-4 px-3">
          <p className="text-[9px] tracking-wider text-[#92939A]">
            © 2026 JobSphere
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
