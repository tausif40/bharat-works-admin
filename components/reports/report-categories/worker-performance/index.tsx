import { Award } from "lucide-react"
import type { ReportSubcategory } from "../../report-tabs"

export const workerPerformanceIcon = <Award className="h-4 w-4" />

export const workerPerformanceSubcategories: ReportSubcategory[] = [
  {
    id: "task-completion-rate",
    name: "Task Completion Rate Reports",
    items: [
      { id: "completion-overview", name: "Completion Rate Overview" },
      { id: "completion-by-category", name: "Completion Rate by Category" },
      { id: "completion-trends", name: "Completion Rate Trends" },
    ],
  },
  {
    id: "average-rating",
    name: "Average Rating Reports",
    items: [
      { id: "rating-overview", name: "Rating Overview" },
      { id: "rating-distribution", name: "Rating Distribution" },
      { id: "rating-trends", name: "Rating Trends" },
    ],
  },
  {
    id: "response-time",
    name: "Response Time Reports",
    items: [
      { id: "response-overview", name: "Response Time Overview" },
      { id: "response-by-category", name: "Response Time by Category" },
      { id: "response-trends", name: "Response Time Trends" },
    ],
  },
  {
    id: "worker-earnings",
    name: "Worker Earnings Reports",
    items: [
      { id: "earnings-overview", name: "Earnings Overview" },
      { id: "earnings-distribution", name: "Earnings Distribution" },
      { id: "top-earners", name: "Top Earners Analysis" },
    ],
  },
]

