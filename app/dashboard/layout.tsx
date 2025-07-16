'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'
import { MobileSidebar } from '@/components/dashboard/MobileSidebar'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tier, setTier] = useState(0);

  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  )
} 