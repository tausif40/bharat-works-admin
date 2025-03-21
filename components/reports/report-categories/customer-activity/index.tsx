import { UserCheck } from "lucide-react"
import type { ReportSubcategory } from "../../report-tabs"

export const customerActivityIcon = <UserCheck className="h-4 w-4" />

export const customerActivitySubcategories: ReportSubcategory[] = [
  {
    id: "tasks-per-user",
    name: "Tasks Posted Per User Reports",
    items: [
      { id: "tasks-overview", name: "Tasks Per User Overview" },
      { id: "tasks-distribution", name: "Tasks Distribution" },
      { id: "frequent-posters", name: "Frequent Posters Analysis" },
    ],
  },
  {
    id: "customer-engagement",
    name: "Customer Engagement Reports",
    items: [
      { id: "engagement-overview", name: "Engagement Overview" },
      { id: "engagement-metrics", name: "Engagement Metrics" },
      { id: "engagement-trends", name: "Engagement Trends" },
    ],
  },
  {
    id: "top-customers",
    name: "Top Customers Reports",
    items: [
      { id: "top-spenders", name: "Top Spenders" },
      { id: "top-active-users", name: "Top Active Users" },
      { id: "customer-loyalty", name: "Customer Loyalty Analysis" },
    ],
  },
]

