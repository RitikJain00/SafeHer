
import { DashboardView } from "@/components/dashboard-view"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <div className="flex flex-col ">

      <SidebarProvider>
            <div className="flex h-full ">
              {/* Sidebar */}
              <div className="hidden md:block w-52 flex-shrink-0 border-r">
                <AppSidebar />
              </div>

            </div>
     
      <DashboardView />
      </SidebarProvider>
    </div>
  )
}