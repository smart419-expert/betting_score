'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { MobileSidebar } from '@/components/dashboard/MobileSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#101522] via-[#181a] to-[#1a2236]">
        {/* Mobile sidebar */}
        <MobileSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          
        <Sidebar />
        
        {/* Main content */}
        <div className="lg:pl-72">
          {/* <Header onMenuClick={() => setSidebarOpen(true)} /> */}
          
          <main>
            <div className="mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
  )
} 