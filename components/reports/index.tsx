import { type ReportCategory, ReportTabs } from "./report-tabs"

// Import all category data
import { taskAnalyticsIcon, taskAnalyticsSubcategories } from "./report-categories/task-analytics"
import { userGrowthIcon, userGrowthSubcategories } from "./report-categories/user-growth"
import { revenueTransactionsIcon, revenueTransactionsSubcategories } from "./report-categories/revenue-transactions"
import { workerPerformanceIcon, workerPerformanceSubcategories } from "./report-categories/worker-performance"
import { customerActivityIcon, customerActivitySubcategories } from "./report-categories/customer-activity"
import { disputeFraudIcon, disputeFraudSubcategories } from "./report-categories/dispute-fraud"
import { locationBasedIcon, locationBasedSubcategories } from "./report-categories/location-based"
import { marketingAdIcon, marketingAdSubcategories } from "./report-categories/marketing-ad"
import { suspiciousActivityIcon, suspiciousActivitySubcategories } from "./report-categories/suspicious-activity"

// Combine all categories
const reportCategories: ReportCategory[] = [
  {
    id: "task-analytics",
    name: "Task Analytics",
    icon: taskAnalyticsIcon,
    subcategories: taskAnalyticsSubcategories,
  },
  {
    id: "user-growth",
    name: "User Growth",
    icon: userGrowthIcon,
    subcategories: userGrowthSubcategories,
  },
  {
    id: "revenue-transactions",
    name: "Revenue & Transactions",
    icon: revenueTransactionsIcon,
    subcategories: revenueTransactionsSubcategories,
  },
  {
    id: "worker-performance",
    name: "Worker Performance",
    icon: workerPerformanceIcon,
    subcategories: workerPerformanceSubcategories,
  },
  {
    id: "customer-activity",
    name: "Customer Activity",
    icon: customerActivityIcon,
    subcategories: customerActivitySubcategories,
  },
  {
    id: "dispute-fraud",
    name: "Dispute & Fraud",
    icon: disputeFraudIcon,
    subcategories: disputeFraudSubcategories,
  },
  {
    id: "location-based",
    name: "Location-Based",
    icon: locationBasedIcon,
    subcategories: locationBasedSubcategories,
  },
  {
    id: "marketing-ad",
    name: "Marketing & Ad",
    icon: marketingAdIcon,
    subcategories: marketingAdSubcategories,
  },
  {
    id: "suspicious-activity",
    name: "Suspicious Activity",
    icon: suspiciousActivityIcon,
    subcategories: suspiciousActivitySubcategories,
  },
]

interface ReportsProps {
  onSelectReport: (categoryId: string, subcategoryId: string, itemId: string) => void
  className?: string
}

export function Reports({ onSelectReport, className }: ReportsProps) {
  return <ReportTabs categories={reportCategories} onSelectReport={onSelectReport} className={className} />
}

