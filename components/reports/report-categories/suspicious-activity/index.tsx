import { AlertOctagon } from "lucide-react"
import type { ReportSubcategory } from "../../report-tabs"

export const suspiciousActivityIcon = <AlertOctagon className="h-4 w-4" />

export const suspiciousActivitySubcategories: ReportSubcategory[] = [
  {
    id: "task-cancellations",
    name: "Frequent Task Cancellations",
    items: [
      { id: "cancellation-overview", name: "Cancellation Overview" },
      { id: "cancellation-patterns", name: "Cancellation Patterns" },
      { id: "high-risk-users", name: "High-Risk Users" },
    ],
  },
  {
    id: "rapid-bidding",
    name: "Rapid Bidding & Withdrawal",
    items: [
      { id: "bidding-patterns", name: "Bidding Patterns" },
      { id: "withdrawal-analysis", name: "Withdrawal Analysis" },
      { id: "suspicious-bidders", name: "Suspicious Bidders" },
    ],
  },
  {
    id: "multiple-logins",
    name: "Multiple Account Logins",
    items: [
      { id: "login-patterns", name: "Login Patterns" },
      { id: "device-analysis", name: "Device Analysis" },
      { id: "location-anomalies", name: "Location Anomalies" },
    ],
  },
  {
    id: "unusual-payment",
    name: "Unusual Payment Patterns",
    items: [
      { id: "payment-anomalies", name: "Payment Anomalies" },
      { id: "transaction-analysis", name: "Transaction Analysis" },
      { id: "payment-flags", name: "Payment Red Flags" },
    ],
  },
  {
    id: "fake-reviews",
    name: "Fake Reviews Detection",
    items: [
      { id: "review-analysis", name: "Review Analysis" },
      { id: "suspicious-patterns", name: "Suspicious Patterns" },
      { id: "review-authenticity", name: "Review Authenticity Scores" },
    ],
  },
  {
    id: "risk-score",
    name: "Risk Score Calculation",
    items: [
      { id: "risk-overview", name: "Risk Score Overview" },
      { id: "risk-factors", name: "Risk Factors Analysis" },
      { id: "high-risk-users", name: "High-Risk Users" },
    ],
  },
]

