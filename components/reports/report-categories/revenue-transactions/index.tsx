import { DollarSign } from "lucide-react"
import type { ReportSubcategory } from "../../report-tabs"

export const revenueTransactionsIcon = <DollarSign className="h-4 w-4" />

export const revenueTransactionsSubcategories: ReportSubcategory[] = [
  {
    id: "total-earnings",
    name: "Total Earnings Reports",
    items: [
      { id: "earnings-overview", name: "Earnings Overview" },
      { id: "earnings-by-category", name: "Earnings by Category" },
      { id: "earnings-trends", name: "Earnings Trends" },
    ],
  },
  {
    id: "commission-breakdown",
    name: "Commission Breakdown Reports",
    items: [
      { id: "commission-overview", name: "Commission Overview" },
      { id: "commission-by-category", name: "Commission by Category" },
      { id: "commission-trends", name: "Commission Trends" },
    ],
  },
  {
    id: "subscription",
    name: "Subscription Reports",
    items: [
      { id: "subscription-overview", name: "Subscription Overview" },
      { id: "subscription-conversion", name: "Subscription Conversion Rate" },
      { id: "subscription-retention", name: "Subscription Retention" },
    ],
  },
  {
    id: "refund-dispute",
    name: "Refund & Dispute Reports",
    items: [
      { id: "refund-overview", name: "Refund Overview" },
      { id: "dispute-analysis", name: "Dispute Analysis" },
      { id: "resolution-time", name: "Resolution Time Analysis" },
    ],
  },
  {
    id: "escrow-payment",
    name: "Escrow Payment Reports",
    items: [
      { id: "escrow-overview", name: "Escrow Overview" },
      { id: "escrow-release-time", name: "Escrow Release Time" },
      { id: "escrow-disputes", name: "Escrow Disputes" },
    ],
  },
]

