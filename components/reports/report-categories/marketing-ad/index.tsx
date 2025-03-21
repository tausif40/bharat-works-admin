import { BarChart } from "lucide-react"
import type { ReportSubcategory } from "../../report-tabs"

export const marketingAdIcon = <BarChart className="h-4 w-4" />

export const marketingAdSubcategories: ReportSubcategory[] = [
  {
    id: "banner-ad",
    name: "Banner Ad Engagement Reports",
    items: [
      { id: "ad-performance", name: "Ad Performance Overview" },
      { id: "click-through-rate", name: "Click-Through Rate Analysis" },
      { id: "conversion-analysis", name: "Conversion Analysis" },
    ],
  },
  {
    id: "promo-code",
    name: "Promo Code Usage Reports",
    items: [
      { id: "promo-overview", name: "Promo Code Overview" },
      { id: "promo-effectiveness", name: "Promo Effectiveness" },
      { id: "promo-roi", name: "Promo ROI Analysis" },
    ],
  },
  {
    id: "referral-program",
    name: "Referral Program Reports",
    items: [
      { id: "referral-overview", name: "Referral Program Overview" },
      { id: "referral-conversion", name: "Referral Conversion Rate" },
      { id: "top-referrers", name: "Top Referrers Analysis" },
    ],
  },
]

