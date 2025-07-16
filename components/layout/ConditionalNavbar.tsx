'use client'
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'

export function ConditionalNavbar() {
    const pathname = usePathname()
    // Hide Navbar on all /dashboard routes
    if (pathname.startsWith('/dashboard')) return null
    return <Navbar />
}