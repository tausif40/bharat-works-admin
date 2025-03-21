import { BarChart3 } from "lucide-react"
import type { ReportSubcategory } from "../../report-tabs"

export const taskAnalyticsIcon = <BarChart3 className="h-4 w-4" />

export const taskAnalyticsSubcategories: ReportSubcategory[] = [
  {
    id: "task-status",
    name: "Task Status Reports",
    items: [
      { id: "task-status-overview", name: "Status Overview" },
      { id: "task-status-trend", name: "Status Trends" },
      { id: "task-completion-time", name: "Completion Time Analysis" },
    ],
  },
  {
    id: "task-category",
    name: "Task Category Reports",
    items: [
      { id: "category-distribution", name: "Category Distribution" },
      { id: "category-performance", name: "Category Performance" },
      { id: "category-growth", name: "Category Growth" },
    ],
  },
  {
    id: "task-price",
    name: "Task Price Analysis",
    items: [
      { id: "price-distribution", name: "Price Distribution" },
      { id: "price-trends", name: "Price Trends" },
      { id: "price-by-category", name: "Price by Category" },
    ],
  },
  {
    id: "emergency-task",
    name: "Emergency Task Reports",
    items: [
      { id: "emergency-overview", name: "Emergency Tasks Overview" },
      { id: "emergency-response", name: "Response Time Analysis" },
      { id: "emergency-pricing", name: "Emergency Pricing Analysis" },
    ],
  },
  {
    id: "task-negotiation",
    name: "Task Negotiation Reports",
    items: [
      { id: "negotiation-frequency", name: "Negotiation Frequency" },
      { id: "negotiation-success", name: "Negotiation Success Rate" },
      { id: "price-reduction", name: "Average Price Reduction" },
    ],
  },
  {
    id: "direct-hiring",
    name: "Direct Hiring Reports",
    items: [
      { id: "direct-vs-bidding", name: "Direct vs. Bidding Comparison" },
      { id: "direct-hiring-trends", name: "Direct Hiring Trends" },
      { id: "repeat-hiring", name: "Repeat Hiring Analysis" },
    ],
  },
  {
    id: "bidding-insights",
    name: "Bidding Insights Reports",
    items: [
      { id: "bid-distribution", name: "Bid Distribution" },
      { id: "bid-success-rate", name: "Bid Success Rate" },
      { id: "bid-time-analysis", name: "Bid Time Analysis" },
    ],
  },
]

