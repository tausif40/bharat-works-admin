"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AdminLayout from "@/components/admin-layout"

// Define report categories and subcategories
const reportCategories = [
  {
    id: "task-analytics",
    name: "Task Analytics",
    subcategories: [
      { id: "task-status", name: "Task Status Report" },
      { id: "task-category", name: "Task Category Report" },
      { id: "task-price", name: "Task Price Analysis" },
      { id: "emergency-task", name: "Emergency Task Report" },
      { id: "task-negotiation", name: "Task Negotiation Report" },
      { id: "direct-hiring", name: "Direct Hiring Report" },
      { id: "bidding-insights", name: "Bidding Insights Report" },
    ],
  },
  {
    id: "user-growth",
    name: "User Growth",
    subcategories: [
      { id: "new-registration", name: "New Registration Report" },
      { id: "active-inactive", name: "Active vs. Inactive Users Report" },
      { id: "user-retention", name: "User Retention Report" },
      { id: "churn-rate", name: "Churn Rate Report" },
    ],
  },
  {
    id: "revenue-transactions",
    name: "Revenue & Transactions",
    subcategories: [
      { id: "total-earnings", name: "Total Earnings Report" },
      { id: "commission-breakdown", name: "Commission Breakdown Report" },
      { id: "subscription", name: "Subscription Report" },
      { id: "refund-dispute", name: "Refund & Dispute Report" },
      { id: "escrow-payment", name: "Escrow Payment Report" },
    ],
  },
  {
    id: "worker-performance",
    name: "Worker Performance",
    subcategories: [
      { id: "task-completion-rate", name: "Task Completion Rate Report" },
      { id: "average-rating", name: "Average Rating Report" },
      { id: "response-time", name: "Response Time Report" },
      { id: "worker-earnings", name: "Earnings Report (Workers)" },
    ],
  },
  {
    id: "customer-activity",
    name: "Customer Activity",
    subcategories: [
      { id: "tasks-per-user", name: "Tasks Posted Per User Report" },
      { id: "customer-engagement", name: "Customer Engagement Report" },
      { id: "top-customers", name: "Top Customers Report" },
    ],
  },
  {
    id: "dispute-fraud",
    name: "Dispute & Fraud Detection",
    subcategories: [
      { id: "dispute-summary", name: "Dispute Summary Report" },
      { id: "disputed-categories", name: "Top Disputed Categories Report" },
      { id: "user-fraud", name: "User Fraud Detection Report" },
      { id: "chargeback-fraud", name: "Chargeback & Refund Fraud Report" },
    ],
  },
  {
    id: "location-based",
    name: "Location-Based",
    subcategories: [
      { id: "task-distribution", name: "Task Distribution by Location" },
      { id: "worker-availability", name: "Worker Availability by Location" },
      { id: "revenue-location", name: "Revenue by Location" },
      { id: "user-engagement-location", name: "User Engagement by Location" },
      { id: "popular-services", name: "Popular Services by Location" },
      { id: "dispute-location", name: "Dispute Reports by Location" },
    ],
  },
  {
    id: "marketing-ad",
    name: "Marketing & Ad Performance",
    subcategories: [
      { id: "banner-ad", name: "Banner Ad Engagement Report" },
      { id: "promo-code", name: "Promo Code Usage Report" },
      { id: "referral-program", name: "Referral Program Report" },
    ],
  },
  {
    id: "suspicious-activity",
    name: "Suspicious Activity & Risk Score",
    subcategories: [
      { id: "task-cancellations", name: "Frequent Task Cancellations" },
      { id: "rapid-bidding", name: "Rapid Bidding & Withdrawal" },
      { id: "multiple-logins", name: "Multiple Account Logins" },
      { id: "unusual-payment", name: "Unusual Payment Patterns" },
      { id: "fake-reviews", name: "Fake Reviews Detection" },
      { id: "excessive-disputes", name: "Excessive Disputes Filed" },
      { id: "low-completion", name: "Low Task Completion Rate" },
      { id: "location-anomalies", name: "Location Anomalies" },
      { id: "blacklist-status", name: "Blacklist & Watchlist Status" },
      { id: "risk-score", name: "Risk Score Calculation" },
    ],
  },
]

// Sample data for charts
const taskStatusData = [
  { name: "Completed", value: 540 },
  { name: "In Progress", value: 320 },
  { name: "Pending", value: 210 },
  { name: "Cancelled", value: 90 },
]

const taskCategoryData = [
  { name: "Confectioner", completed: 120, pending: 45, cancelled: 15 },
  { name: "Photographer", completed: 95, pending: 30, cancelled: 10 },
  { name: "Band", completed: 75, pending: 25, cancelled: 8 },
  { name: "AC Repair", completed: 150, pending: 60, cancelled: 20 },
  { name: "Electrician", completed: 100, pending: 50, cancelled: 15 },
]

const userGrowthData = [
  { name: "Jan", customers: 120, vendors: 45 },
  { name: "Feb", customers: 140, vendors: 52 },
  { name: "Mar", customers: 170, vendors: 60 },
  { name: "Apr", customers: 190, vendors: 70 },
  { name: "May", customers: 220, vendors: 85 },
  { name: "Jun", customers: 250, vendors: 95 },
  { name: "Jul", customers: 280, vendors: 110 },
]

const revenueData = [
  { name: "Jan", revenue: 150000, commission: 15000 },
  { name: "Feb", revenue: 180000, commission: 18000 },
  { name: "Mar", revenue: 210000, commission: 21000 },
  { name: "Apr", revenue: 240000, commission: 24000 },
  { name: "May", revenue: 270000, commission: 27000 },
  { name: "Jun", revenue: 300000, commission: 30000 },
  { name: "Jul", revenue: 330000, commission: 33000 },
]

const locationData = [
  { name: "Mumbai", tasks: 250, workers: 120, revenue: 500000 },
  { name: "Delhi", tasks: 200, workers: 100, revenue: 400000 },
  { name: "Bangalore", tasks: 180, workers: 90, revenue: 360000 },
  { name: "Chennai", tasks: 150, workers: 75, revenue: 300000 },
  { name: "Hyderabad", tasks: 130, workers: 65, revenue: 260000 },
  { name: "Kolkata", tasks: 120, workers: 60, revenue: 240000 },
]

const COLORS = ["#FF9800", "#2196F3", "#4CAF50", "#F44336", "#9C27B0", "#795548"]

export default function ReportsPage() {
  const router = useRouter()

  // Redirect to the first report by default
  useEffect(() => {
    router.push("/admin/reports/task-analytics/task-status")
  }, [router])

  return (
    <AdminLayout>
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading Reports...</h2>
          <p className="text-muted-foreground mt-2">Please wait while we redirect you to the reports dashboard.</p>
        </div>
      </div>
    </AdminLayout>
  )
}

