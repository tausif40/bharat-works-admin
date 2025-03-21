"use client"
import { useRouter, usePathname } from "next/navigation"
import { BarChart3, Users, DollarSign, Award, UserCheck, AlertTriangle, MapPin, TrendingUp, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define the report categories structure
export const reportCategories = [
  {
    id: "task-analytics",
    number: "2",
    name: "Task Analytics Reports",
    icon: <BarChart3 className="h-5 w-5" />,
    path: "/admin/reports/task-analytics",
  },
  {
    id: "user-growth",
    number: "3",
    name: "User Growth Reports",
    icon: <Users className="h-5 w-5" />,
    path: "/admin/reports/user-growth",
  },
  {
    id: "revenue-transactions",
    number: "4",
    name: "Revenue & Transactions Reports",
    icon: <DollarSign className="h-5 w-5" />,
    path: "/admin/reports/revenue-transactions",
  },
  {
    id: "worker-performance",
    number: "5",
    name: "Worker Performance Reports",
    icon: <Award className="h-5 w-5" />,
    path: "/admin/reports/worker-performance",
  },
  {
    id: "customer-activity",
    number: "6",
    name: "Customer Activity Reports",
    icon: <UserCheck className="h-5 w-5" />,
    path: "/admin/reports/customer-activity",
  },
  {
    id: "dispute-fraud",
    number: "7",
    name: "Dispute & Fraud Detection Reports",
    icon: <AlertTriangle className="h-5 w-5" />,
    path: "/admin/reports/dispute-fraud",
  },
  {
    id: "location-based",
    number: "8",
    name: "Location-Based Reports",
    icon: <MapPin className="h-5 w-5" />,
    path: "/admin/reports/location-based",
  },
  {
    id: "marketing-ad",
    number: "9",
    name: "Marketing & Ad Performance Reports",
    icon: <TrendingUp className="h-5 w-5" />,
    path: "/admin/reports/marketing-ad",
  },
  {
    id: "suspicious-activity",
    number: "10",
    name: "Suspicious Activity & Risk Score Reports",
    icon: <Shield className="h-5 w-5" />,
    path: "/admin/reports/suspicious-activity",
  },
]

interface ReportsNavigationProps {
  className?: string
}

export function ReportsNavigation({ className }: ReportsNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className={cn("w-full", className)}>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="space-y-2 pr-2">
          {reportCategories.map((category) => (
            <Button
              key={category.id}
              variant={pathname === category.path ? "secondary" : "ghost"}
              className="w-full justify-start font-medium text-left"
              onClick={() => router.push(category.path)}
            >
              <div className="flex items-center">
                {category.icon}
                <span className="ml-2">
                  {category.name}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

