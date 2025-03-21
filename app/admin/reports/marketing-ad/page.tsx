"use client"


import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

export default function MarketingAdReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Marketing & Ad Performance Reports"
        description="Analysis of marketing campaigns, ad performance, and ROI"
        category="Marketing & Ad Performance"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Total active banner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">56</div>
                {/* <p className="text-xs text-muted-foreground">-5% from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Total Clicks on Banner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,80,00</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8%</div>
                <p className="text-xs text-muted-foreground">+0.5% from last month</p>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">285%</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card> */}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ad Performance Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: "Jan", impressions: 100000, clicks: 5000, conversions: 150 },
                    { month: "Feb", impressions: 120000, clicks: 6000, conversions: 180 },
                    { month: "Mar", impressions: 140000, clicks: 7000, conversions: 210 },
                    { month: "Apr", impressions: 160000, clicks: 8000, conversions: 240 },
                    { month: "May", impressions: 180000, clicks: 9000, conversions: 270 },
                    { month: "Jun", impressions: 200000, clicks: 10000, conversions: 300 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="impressions" name="Impressions" stroke="#8884d8" />
                  <Line yAxisId="left" type="monotone" dataKey="clicks" name="Clicks" stroke="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="conversions" name="Conversions" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { campaign: "Wedding Photography", spend: 100000, revenue: 350000, roi: 250 },
                    { campaign: "AC Installation", spend: 150000, revenue: 600000, roi: 300 },
                    { campaign: "Wedding Band", spend: 120000, revenue: 480000, roi: 300 },
                    { campaign: "Home Electrical Work", spend: 80000, revenue: 240000, roi: 200 },
                    { campaign: "Birthday Catering", spend: 130000, revenue: 390000, roi: 200 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="campaign" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="spend" name="Ad Spend (₹)" fill="#8884d8" />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="roi" name="ROI (%)" stroke="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>List of banner</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Category Name</ResponsiveTable.Head>
                    {/* <ResponsiveTable.Head>Platform</ResponsiveTable.Head> */}
                    <ResponsiveTable.Head>Impressions</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Clicks</ResponsiveTable.Head>
                    <ResponsiveTable.Head>CTR</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Conversions</ResponsiveTable.Head>
                    {/* <ResponsiveTable.Head>Cost per Conversion</ResponsiveTable.Head> */}
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      name: "Wedding Photography",
                      // platform: "Facebook",
                      impressions: 50000,
                      clicks: 2500,
                      ctr: "5%",
                      conversions: 75,
                      // cpc: "₹166.67",
                    },
                    {
                      name: "AC Service Offer",
                      // platform: "Google Ads",
                      impressions: 75000,
                      clicks: 3000,
                      ctr: "4%",
                      conversions: 90,
                      // cpc: "₹166.67",
                    },
                    {
                      name: "Diwali Catering",
                      // platform: "Instagram",
                      impressions: 40000,
                      clicks: 2000,
                      ctr: "5%",
                      conversions: 60,
                      // cpc: "₹166.67",
                    },
                    {
                      name: "Home Electrician",
                      // platform: "Google Ads",
                      impressions: 60000,
                      clicks: 2400,
                      ctr: "4%",
                      conversions: 72,
                      // cpc: "₹166.67",
                    },
                    {
                      name: "Band Booking",
                      // platform: "Facebook",
                      impressions: 35000,
                      clicks: 1750,
                      ctr: "5%",
                      conversions: 52,
                      // cpc: "₹168.27",
                    },
                  ].map((ad, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{ad.name}</ResponsiveTable.Cell>
                      {/* <ResponsiveTable.Cell>{ad.platform}</ResponsiveTable.Cell> */}
                      <ResponsiveTable.Cell>{ad.impressions.toLocaleString()}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{ad.clicks.toLocaleString()}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{ad.ctr}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{ad.conversions}</ResponsiveTable.Cell>
                      {/* <ResponsiveTable.Cell>{ad.cpc}</ResponsiveTable.Cell> */}
                    </ResponsiveTable.Row>
                  ))}
                </ResponsiveTable.Body>
              </ResponsiveTable>
            </CardContent>
          </Card>
        </div>
      </ReportLayout>
    </AdminLayout>
  )
}






// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ResponsiveTable } from "@/components/responsive-table"
// import AdminLayout from "@/components/admin-layout"
// import { BarChart, LineChart, PieChart } from "lucide-react"

// // Define types for our data structure
// type BannerClick = {
//   id: string
//   bannerName: string
//   category: string
//   impressions: number
//   clicks: number
//   ctr: number
//   date: string
// }

// type PromoCodeUsage = {
//   id: string
//   code: string
//   usageCount: number
//   totalDiscount: number
//   category: string
//   date: string
// }

// type ReferralPerformance = {
//   id: string
//   referralCode: string
//   signups: number
//   conversions: number
//   conversionRate: number
//   totalRevenue: number
//   date: string
// }

// export default function MarketingReportsPage() {
//   const [dateRange, setDateRange] = useState<string>("last30days")
//   const [categoryFilter, setCategoryFilter] = useState<string>("all")

//   // Sample banner click data
//   const bannerClicks: BannerClick[] = [
//     {
//       id: "1",
//       bannerName: "Diwali Special Offer",
//       category: "Electrician",
//       impressions: 12500,
//       clicks: 750,
//       ctr: 6.0,
//       date: "2023-09-15",
//     },
//     {
//       id: "2",
//       bannerName: "Wedding Season Discount",
//       category: "Photographer",
//       impressions: 8700,
//       clicks: 620,
//       ctr: 7.1,
//       date: "2023-09-14",
//     },
//     {
//       id: "3",
//       bannerName: "Home Renovation Sale",
//       category: "Carpenter",
//       impressions: 9300,
//       clicks: 410,
//       ctr: 4.4,
//       date: "2023-09-13",
//     },
//     {
//       id: "4",
//       bannerName: "Monsoon Plumbing Offer",
//       category: "Plumber",
//       impressions: 7200,
//       clicks: 380,
//       ctr: 5.3,
//       date: "2023-09-12",
//     },
//     {
//       id: "5",
//       bannerName: "Festival Cleaning Services",
//       category: "Cleaner",
//       impressions: 6800,
//       clicks: 290,
//       ctr: 4.3,
//       date: "2023-09-11",
//     },
//   ]

//   // Sample promo code usage data
//   const promoCodeUsage: PromoCodeUsage[] = [
//     {
//       id: "1",
//       code: "DIWALI20",
//       usageCount: 345,
//       totalDiscount: 69000,
//       category: "All",
//       date: "2023-09-15",
//     },
//     {
//       id: "2",
//       code: "PHOTO15",
//       usageCount: 210,
//       totalDiscount: 31500,
//       category: "Photographer",
//       date: "2023-09-14",
//     },
//     {
//       id: "3",
//       code: "NEWUSER10",
//       usageCount: 520,
//       totalDiscount: 52000,
//       category: "All",
//       date: "2023-09-13",
//     },
//     {
//       id: "4",
//       code: "PLUMB25",
//       usageCount: 180,
//       totalDiscount: 45000,
//       category: "Plumber",
//       date: "2023-09-12",
//     },
//     {
//       id: "5",
//       code: "CLEAN50",
//       usageCount: 95,
//       totalDiscount: 47500,
//       category: "Cleaner",
//       date: "2023-09-11",
//     },
//   ]

//   // Sample referral performance data
//   const referralPerformance: ReferralPerformance[] = [
//     {
//       id: "1",
//       referralCode: "REFER10",
//       signups: 120,
//       conversions: 78,
//       conversionRate: 65.0,
//       totalRevenue: 156000,
//       date: "2023-09-15",
//     },
//     {
//       id: "2",
//       referralCode: "FRIEND20",
//       signups: 85,
//       conversions: 42,
//       conversionRate: 49.4,
//       totalRevenue: 84000,
//       date: "2023-09-14",
//     },
//     {
//       id: "3",
//       referralCode: "FAMILY15",
//       signups: 65,
//       conversions: 38,
//       conversionRate: 58.5,
//       totalRevenue: 76000,
//       date: "2023-09-13",
//     },
//     {
//       id: "4",
//       referralCode: "WELCOME25",
//       signups: 110,
//       conversions: 62,
//       conversionRate: 56.4,
//       totalRevenue: 124000,
//       date: "2023-09-12",
//     },
//     {
//       id: "5",
//       referralCode: "NEWUSER",
//       signups: 95,
//       conversions: 51,
//       conversionRate: 53.7,
//       totalRevenue: 102000,
//       date: "2023-09-11",
//     },
//   ]

//   // Filter data based on category
//   const filteredBannerClicks = bannerClicks.filter(
//     (item) => categoryFilter === "all" || item.category === categoryFilter,
//   )

//   const filteredPromoCodeUsage = promoCodeUsage.filter(
//     (item) => categoryFilter === "all" || item.category === "All" || item.category === categoryFilter,
//   )

//   // Format currency
//   const formatCurrency = (amount: number) => {
//     return `₹${amount.toLocaleString("en-IN")}`
//   }

//   // Get unique categories for filter
//   const categories = Array.from(
//     new Set([
//       ...bannerClicks.map((item) => item.category),
//       ...promoCodeUsage.filter((item) => item.category !== "All").map((item) => item.category),
//     ]),
//   )

//   return (
//     <AdminLayout>
//       <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//         <div className="flex items-center justify-between">
//           <h2 className="text-3xl font-bold tracking-tight">Marketing & Ad Performance</h2>
//         </div>

//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex w-full md:w-auto items-center space-x-2">
//             <Select value={dateRange} onValueChange={setDateRange}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Date range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="today">Today</SelectItem>
//                 <SelectItem value="yesterday">Yesterday</SelectItem>
//                 <SelectItem value="last7days">Last 7 Days</SelectItem>
//                 <SelectItem value="last30days">Last 30 Days</SelectItem>
//                 <SelectItem value="thisMonth">This Month</SelectItem>
//                 <SelectItem value="lastMonth">Last Month</SelectItem>
//                 <SelectItem value="custom">Custom Range</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 {categories.map((category) => (
//                   <SelectItem key={category} value={category}>
//                     {category}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
//               <BarChart className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {filteredBannerClicks.reduce((sum, item) => sum + item.impressions, 0).toLocaleString()}
//               </div>
//               <p className="text-xs text-muted-foreground">+12% from last month</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
//               <LineChart className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {filteredBannerClicks.reduce((sum, item) => sum + item.clicks, 0).toLocaleString()}
//               </div>
//               <p className="text-xs text-muted-foreground">+8% from last month</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
//               <PieChart className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">
//                 {(filteredBannerClicks.reduce((sum, item) => sum + item.ctr, 0) / filteredBannerClicks.length).toFixed(
//                   2,
//                 )}
//                 %
//               </div>
//               <p className="text-xs text-muted-foreground">+1.2% from last month</p>
//             </CardContent>
//           </Card>
//         </div>

//         <Tabs defaultValue="bannerClicks" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="bannerClicks">Banner Clicks</TabsTrigger>
//             <TabsTrigger value="promoCodeUsage">Promo Code Usage</TabsTrigger>
//             <TabsTrigger value="referralProgram">Referral Program</TabsTrigger>
//           </TabsList>

//           <TabsContent value="bannerClicks" className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Banner Click Tracking</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <ResponsiveTable>
//                   <ResponsiveTable.Header>
//                     <ResponsiveTable.Row>
//                       <ResponsiveTable.Head>Banner Name</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Category</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Impressions</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Clicks</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>CTR</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Date</ResponsiveTable.Head>
//                     </ResponsiveTable.Row>
//                   </ResponsiveTable.Header>
//                   <ResponsiveTable.Body>
//                     {filteredBannerClicks.map((item) => (
//                       <ResponsiveTable.Row key={item.id}>
//                         <ResponsiveTable.Cell className="font-medium">{item.bannerName}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{item.category}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{item.impressions.toLocaleString()}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{item.clicks.toLocaleString()}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{item.ctr.toFixed(2)}%</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{new Date(item.date).toLocaleDateString()}</ResponsiveTable.Cell>
//                       </ResponsiveTable.Row>
//                     ))}
//                   </ResponsiveTable.Body>
//                 </ResponsiveTable>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="promoCodeUsage" className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Promo Code Usage</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <ResponsiveTable>
//                   <ResponsiveTable.Header>
//                     <ResponsiveTable.Row>
//                       <ResponsiveTable.Head>Promo Code</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Category</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Usage Count</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Total Discount</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Date</ResponsiveTable.Head>
//                     </ResponsiveTable.Row>
//                   </ResponsiveTable.Header>
//                   <ResponsiveTable.Body>
//                     {filteredPromoCodeUsage.map((item) => (
//                       <ResponsiveTable.Row key={item.id}>
//                         <ResponsiveTable.Cell className="font-medium">{item.code}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{item.category}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{item.usageCount.toLocaleString()}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{formatCurrency(item.totalDiscount)}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{new Date(item.date).toLocaleDateString()}</ResponsiveTable.Cell>
//                       </ResponsiveTable.Row>
//                     ))}
//                   </ResponsiveTable.Body>
//                 </ResponsiveTable>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="referralProgram" className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Referral Program Performance</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <ResponsiveTable>
//                   <ResponsiveTable.Header>
//                     <ResponsiveTable.Row>
//                       <ResponsiveTable.Head>Referral Code</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Signups</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Conversions</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Conversion Rate</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Total Revenue</ResponsiveTable.Head>
//                       <ResponsiveTable.Head>Date</ResponsiveTable.Head>
//                     </ResponsiveTable.Row>
//                   </ResponsiveTable.Header>
//                   <ResponsiveTable.Body>
//                     {referralPerformance.map((item) => (
//                       <ResponsiveTable.Row key={item.id}>
//                         <ResponsiveTable.Cell className="font-medium">{item.referralCode}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{item.signups.toLocaleString()}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{item.conversions.toLocaleString()}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{item.conversionRate.toFixed(2)}%</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{formatCurrency(item.totalRevenue)}</ResponsiveTable.Cell>
//                         <ResponsiveTable.Cell>{new Date(item.date).toLocaleDateString()}</ResponsiveTable.Cell>
//                       </ResponsiveTable.Row>
//                     ))}
//                   </ResponsiveTable.Body>
//                 </ResponsiveTable>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </AdminLayout>
//   )
// }
