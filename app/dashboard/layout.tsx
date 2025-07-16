'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Header } from '@/components/dashboard/Header'
import { MobileSidebar } from '@/components/dashboard/MobileSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tier, setTier] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
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