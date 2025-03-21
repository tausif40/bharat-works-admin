"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Users,
  Briefcase,
  Grid3X3,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  FileBarChart,
  TicketPercent,
  IndianRupee,
  MessageSquare,
  UserCog,
  Gift,
  ImageUp,
  HandCoins,
  ReceiptIndianRupee
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Vendors", href: "/admin/vendors", icon: Users },
    { name: "Job Requests", href: "/admin/jobs", icon: Briefcase },
    { name: "Coupons", href: "/admin/coupons", icon: TicketPercent },
    { name: "Plans", href: "/admin/plans", icon: IndianRupee },
    { name: "Service Categories", href: "/admin/categories", icon: Grid3X3 },
    { name: "Add Commission", href: "/admin/commission", icon: ReceiptIndianRupee },
    { name: "Reports & Analytics", href: "/admin/reports", icon: FileBarChart },
    { name: "Complaints", href: "/admin/complaints", icon: MessageSquare },
    { name: "Upload Banner", href: "/admin/banners", icon: ImageUp },
    { name: "Revenue", href: "/admin/revenue", icon: HandCoins },
    { name: "Admin Management", href: "/admin/admins", icon: UserCog },
    { name: "Referrals", href: "/admin/referrals", icon: Gift },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pt-5 pb-4">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/admin" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">The Bharat Works</span>
            </Link>
          </div>
          <div className="max-h-[550px] overflow-y-auto">
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${isActive ? "text-primary-foreground" : "text-gray-500 dark:text-gray-400"}`}
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t w-auto border-gray-200 dark:border-gray-800 p-4 fixed bottom-0">
            {/* <hr /> */}
            <div className="flex items-center">
              <div>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 pl-0 px-2"
                >
                  <LogOut className="mr-1 h-3 w-3" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <Link href="/admin" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">The Bharat Works</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-2">
                  <Link href="/admin" className="flex items-center space-x-2">
                    <Home className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold">The Bharat Works</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex-1 mt-6 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                          }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 ${isActive ? "text-primary-foreground" : "text-gray-500 dark:text-gray-400"}`}
                        />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
                <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-800 p-4 mt-auto">
                  <div className="flex items-center">
                    <div>
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 pl-0"
                      >
                        <LogOut className="mr-2 h-3 w-3" />
                        Sign out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="hidden lg:flex lg:sticky lg:top-0 lg:z-10 items-center justify-end h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

