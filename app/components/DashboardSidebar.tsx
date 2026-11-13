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
  Search,
  LogOut,
  Briefcase,
  Tags,
  Bell,
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
      id: "jobs",
      name: "My Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      id: "post-job",
      name: "Post a Job",
      url: "/dashboard/recruiter/post-job",
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
  return value === "seeker" || value === "recruiter" || value === "admin"
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()

  const role: UserRole = isUserRole(session?.user?.role)
    ? session.user.role
    : "seeker"

  const menuItems = menuItemsByRole[role]
  const bottomAction = bottomActionByRole[role]
  const ActionIcon = bottomAction.icon

  const router = useRouter()

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="px-4 pt-5 pb-4">
        <Link href="/" className="flex items-center gap-2 px-2">
          <Briefcase className="size-7 text-primary" />

          <span className="text-2xl font-[var(--font-bodoni)] font-bold tracking-wide text-sidebar-foreground">
            JobSphere
          </span>
        </Link>

        {/* User Info */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
            {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              {session?.user?.name || "User"}
            </p>

            <p className="text-[10px] font-[var(--font-space-mono)] text-muted-foreground capitalize">
              {role} Portal
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Menu Items */}
      <SidebarContent className="px-3 py-3">
        <SidebarGroup>
          <SidebarMenu>
            {!isPending &&
              menuItems.map((item) => {
                const Icon = item.icon

                const isActive =
                  pathname === item.url ||
                  (item.id !== "dashboard" &&
                    pathname.startsWith(`${item.url}/`))

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      tooltip={item.name}
                      className="h-10 rounded-lg px-3 text-sm font-[var(--font-manrope)] transition-all duration-200"
                    >
                      <Icon className="size-[18px]" />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="gap-3 px-3 pb-5">
        <Link
          href={bottomAction.url}
          className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ActionIcon className="size-4" />
          <span>{bottomAction.name}</span>
        </Link>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => {
                await signOut()
                router.push("/")
                router.refresh()
              }}
              className="h-10 rounded-lg px-3 text-sm font-[var(--font-manrope)] text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-[18px]" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

