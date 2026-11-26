"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Bell, ChevronDown, LogOut, Moon, Settings, Sun } from "lucide-react"

import { useSession, signOut } from "@/lib/auth-client"
import { SidebarTrigger } from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type UserRole = "seeker" | "recruiter" | "admin"

function isUserRole(role: unknown): role is UserRole {
  return role === "seeker" || role === "recruiter" || role === "admin"
}

const settingsRoutes: Record<UserRole, string> = {
  seeker: "/dashboard/seeker/settings",
  recruiter: "/dashboard/recruiter/settings",
  admin: "/dashboard/admin/settings",
}

const monoFont = "font-[family-name:var(--font-space-mono)]"

export default function DashboardHeader() {
  const router = useRouter()
  const { data: session } = useSession()
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const role: UserRole = isUserRole(session?.user?.role)
    ? session.user.role
    : "seeker"

  const userName = session?.user?.name || "User"
  const userEmail = session?.user?.email || ""
  const userInitial = userName.charAt(0).toUpperCase()

  const handleLogout = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`${monoFont} sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-[#383A40] bg-[#191A1E] px-4 shadow-md sm:px-6`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="size-10 rounded-lg text-[#EAE7DE] hover:bg-[#303137] hover:text-white" />

        <div className="hidden h-6 w-px bg-[#44464B] sm:block" />

        <div className="hidden sm:block">
          <p className="text-[11px] font-medium tracking-[0.14em] text-[#A1A2A8] uppercase">
            JobSphere
          </p>

          <p className="text-sm font-semibold text-[#EAE7DE]">Workspace</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
          className="flex size-10 items-center justify-center rounded-lg border border-[#44464B] bg-[#25262B] text-[#EAE7DE] transition-colors hover:bg-[#303137] hover:text-white"
        >
          {!mounted ? (
            <Sun size={18} />
          ) : resolvedTheme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex size-10 items-center justify-center rounded-lg border border-[#44464B] bg-[#25262B] text-[#EAE7DE] transition-colors hover:bg-[#303137] hover:text-white"
              />
            }
          >
            <Bell size={18} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className={`${monoFont} w-64 border-[#44464B] bg-[#25262B] p-3 text-[#EAE7DE]`}
          >
            <p className="text-sm font-semibold">Notifications</p>

            <div className="mt-3 rounded-lg bg-[#303137] px-3 py-6 text-center">
              <Bell className="mx-auto size-5 text-[#92939A]" />

              <p className="mt-2 text-xs text-[#A1A2A8]">
                No new notifications
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-xl border border-[#44464B] bg-[#25262B] p-1.5 pr-2 transition-colors hover:bg-[#303137]"
              />
            }
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#EAE7DE] text-sm font-bold text-[#191A1E]">
              {userInitial}
            </div>

            <div className="hidden min-w-0 text-left sm:block">
              <p className="max-w-28 truncate text-xs font-semibold text-[#EAE7DE]">
                {userName}
              </p>

              <p className="text-[10px] text-[#A1A2A8] capitalize">{role}</p>
            </div>

            <ChevronDown size={15} className="text-[#A1A2A8]" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className={`${monoFont} w-60 border-[#44464B] bg-[#25262B] p-2 text-[#EAE7DE]`}
          >
            <div className="px-2 py-2">
              <p className="truncate text-sm font-semibold text-[#EAE7DE]">
                {userName}
              </p>

              <p className="truncate text-xs text-[#A1A2A8]">{userEmail}</p>

              <p className="mt-1 text-[10px] tracking-wider text-[#92939A] uppercase">
                {role}
              </p>
            </div>

            <DropdownMenuSeparator className="bg-[#44464B]" />

            <DropdownMenuItem
              onClick={() => router.push(settingsRoutes[role])}
              className="cursor-pointer text-xs text-[#D0CEC7] focus:bg-[#303137] focus:text-white"
            >
              <Settings size={15} />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-[#44464B]" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-xs text-[#E58C83] focus:bg-[#392B2C] focus:text-[#F2A39A]"
            >
              <LogOut size={15} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
