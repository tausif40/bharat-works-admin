import { MapPin } from "lucide-react"
import type { ReportSubcategory } from "../../report-tabs"

export const locationBasedIcon = <MapPin className="h-4 w-4" />

export const locationBasedSubcategories: ReportSubcategory[] = [
  {
    id: "task-distribution",
    name: "Task Distribution by Location",
    items: [
      { id: "location-overview", name: "Location Overview" },
      { id: "urban-rural-distribution", name: "Urban vs. Rural Distribution" },
      { id: "location-trends", name: "Location Trends" },
    ],
  },
  {
    id: "worker-availability",
    name: "Worker Availability by Location",
    items: [
      { id: "availability-overview", name: "Availability Overview" },
      { id: "supply-demand-gap", name: "Supply-Demand Gap Analysis" },
      { id: "availability-trends", name: "Availability Trends" },
    ],
  },
  {
    id: "revenue-location",
    name: "Revenue by Location",
    items: [
      { id: "revenue-overview", name: "Revenue Overview" },
      { id: "high-value-locations", name: "High-Value Locations" },
      { id: "revenue-trends", name: "Revenue Trends by Location" },
    ],
  },
  {
    id: "user-engagement-location",
    name: "User Engagement by Location",
    items: [
      { id: "engagement-overview", name: "Engagement Overview" },
      { id: "engagement-hotspots", name: "Engagement Hotspots" },
      { id: "engagement-trends", name: "Engagement Trends by Location" },
    ],
  },
  {
    id: "popular-services",
    name: "Popular Services by Location",
    items: [
      { id: "services-overview", name: "Services Overview" },
      { id: "regional-preferences", name: "Regional Preferences" },
      { id: "seasonal-variations", name: "Seasonal Variations" },
    ],
  },
  {
    id: "dispute-location",
    name: "Dispute Reports by Location",
    items: [
      { id: "dispute-overview", name: "Dispute Overview" },
      { id: "high-risk-locations", name: "High-Risk Locations" },
      { id: "dispute-trends", name: "Dispute Trends by Location" },
    ],
  },
]

