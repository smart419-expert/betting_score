"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Community", href: "/community" },
  { name: "Help", href: "/help" },
];

export function Navbar({ user }: { user?: { name: string; avatar?: string } }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">BASE44</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="btn-outline px-5 py-2 text-sm font-semibold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary px-5 py-2 text-sm font-semibold"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                  {user.avatar ? (
                    <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-primary-600" />
                  )}
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                </Menu.Button>
                <Transition
                  as="div"
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard"
                            className={`block px-4 py-2 text-sm ${active ? "bg-primary-50 text-primary-700" : "text-gray-700"}`}
                          >
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/profile"
                            className={`block px-4 py-2 text-sm ${active ? "bg-primary-50 text-primary-700" : "text-gray-700"}`}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/settings"
                            className={`block px-4 py-2 text-sm ${active ? "bg-primary-50 text-primary-700" : "text-gray-700"}`}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`block w-full text-left px-4 py-2 text-sm ${active ? "bg-danger-50 text-danger-700" : "text-danger-600"}`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={mobileOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-4 pb-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="block btn-outline w-full text-center py-2 mt-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block btn-primary w-full text-center py-2 mt-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block text-gray-700 hover:text-primary-600 font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Settings
                </Link>
                <button
                  className="block w-full text-left text-danger-600 font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
} 