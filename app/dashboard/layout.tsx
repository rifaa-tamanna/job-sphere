import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "../components/DashboardSidebar"
import DashboardHeader from "../components/DashboardHeader"
import { Toaster } from "@/components/ui/toast"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="font-[family-name:var(--font-space-mono)] min-w-0 flex-1">
        <DashboardHeader />
        {children}
      </main>

      <Toaster />
    </SidebarProvider>
  )
}

export default DashboardLayout
