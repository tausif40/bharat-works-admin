import { AlertTriangle } from "lucide-react"
import type { ReportSubcategory } from "../../report-tabs"

export const disputeFraudIcon = <AlertTriangle className="h-4 w-4" />

export const disputeFraudSubcategories: ReportSubcategory[] = [
  {
    id: "dispute-summary",
    name: "Dispute Summary Reports",
    items: [
      { id: "dispute-overview", name: "Dispute Overview" },
      { id: "dispute-resolution", name: "Dispute Resolution Analysis" },
      { id: "dispute-trends", name: "Dispute Trends" },
    ],
  },
  {
    id: "disputed-categories",
    name: "Top Disputed Categories Reports",
    items: [
      { id: "category-disputes", name: "Category Disputes Overview" },
      { id: "high-risk-categories", name: "High-Risk Categories" },
      { id: "category-dispute-trends", name: "Category Dispute Trends" },
    ],
  },
  {
    id: "user-fraud",
    name: "User Fraud Detection Reports",
    items: [
      { id: "fraud-overview", name: "Fraud Detection Overview" },
      { id: "fraud-patterns", name: "Fraud Patterns Analysis" },
      { id: "fraud-prevention", name: "Fraud Prevention Metrics" },
    ],
  },
  {
    id: "chargeback-fraud",
    name: "Chargeback & Refund Fraud Reports",
    items: [
      { id: "chargeback-overview", name: "Chargeback Overview" },
      { id: "refund-abuse", name: "Refund Abuse Analysis" },
      { id: "fraud-indicators", name: "Fraud Indicators" },
    ],
  },
]

