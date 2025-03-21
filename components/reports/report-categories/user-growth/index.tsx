import { Users } from "lucide-react"
import type { ReportSubcategory } from "../../report-tabs"

export const userGrowthIcon = <Users className="h-4 w-4" />

export const userGrowthSubcategories: ReportSubcategory[] = [
  {
    id: "new-registration",
    name: "New Registration Reports",
    items: [
      { id: "registration-overview", name: "Registration Overview" },
      { id: "registration-by-location", name: "Registration by Location" },
      { id: "registration-source", name: "Registration Source Analysis" },
    ],
  },
  {
    id: "active-inactive",
    name: "Active vs. Inactive Users Reports",
    items: [
      { id: "active-users-overview", name: "Active Users Overview" },
      { id: "inactive-users", name: "Inactive Users Analysis" },
      { id: "reactivation-rate", name: "Reactivation Rate" },
    ],
  },
  {
    id: "user-retention",
    name: "User Retention Reports",
    items: [
      { id: "retention-overview", name: "Retention Overview" },
      { id: "retention-by-segment", name: "Retention by User Segment" },
      { id: "long-term-retention", name: "Long-term Retention Analysis" },
    ],
  },
  {
    id: "churn-rate",
    name: "Churn Rate Reports",
    items: [
      { id: "churn-overview", name: "Churn Overview" },
      { id: "churn-reasons", name: "Churn Reasons Analysis" },
      { id: "churn-prediction", name: "Churn Prediction" },
    ],
  },
]

