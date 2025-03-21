import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

interface RevenueReportProps {
  itemId: string
}

export default function RevenueReport({ itemId }: RevenueReportProps) {
  // Sample data for the report
  const revenueData = [
    { name: "Jan", revenue: 150000, commission: 15000 },
    { name: "Feb", revenue: 180000, commission: 18000 },
    { name: "Mar", revenue: 210000, commission: 21000 },
    { name: "Apr", revenue: 240000, commission: 24000 },
    { name: "May", revenue: 270000, commission: 27000 },
    { name: "Jun", revenue: 300000, commission: 30000 },
    { name: "Jul", revenue: 330000, commission: 33000 },
  ]

  // Render different content based on the selected item
  const renderContent = () => {
    switch (itemId) {
      case "earnings-overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹16,80,000</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹1,68,000</div>
                  <p className="text-xs text-muted-foreground">10% of total revenue</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹14,500</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,160</div>
                  <p className="text-xs text-muted-foreground">+8.7% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue & Commission Trend</CardTitle>
                <CardDescription>Monthly revenue and commission</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `₹${value.toLocaleString()}`,
                        value === revenueData[0].revenue ? "Revenue" : "Commission",
                      ]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#4CAF50"
                      fill="#4CAF50"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="commission"
                      name="Commission"
                      stroke="#FF9800"
                      fill="#FF9800"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )

      case "earnings-by-category":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Earnings by Category</CardTitle>
              <CardDescription>Revenue breakdown by service category</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { category: "Confectioner", revenue: 450000, commission: 45000 },
                    { category: "Photographer", revenue: 540000, commission: 54000 },
                    { category: "Band", revenue: 300000, commission: 30000 },
                    { category: "AC Repair", revenue: 240000, commission: 24000 },
                    { category: "Electrician", revenue: 150000, commission: 15000 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, ""]} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#4CAF50" />
                  <Bar dataKey="commission" name="Commission" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "earnings-trends":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Earnings Trends</CardTitle>
              <CardDescription>Year-over-year revenue comparison</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { month: "Jan", current: 150000, previous: 120000 },
                    { month: "Feb", current: 180000, previous: 140000 },
                    { month: "Mar", current: 210000, previous: 160000 },
                    { month: "Apr", current: 240000, previous: 180000 },
                    { month: "May", current: 270000, previous: 200000 },
                    { month: "Jun", current: 300000, previous: 220000 },
                    { month: "Jul", current: 330000, previous: 240000 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, ""]} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="current"
                    name="Current Year"
                    stroke="#4CAF50"
                    fill="#4CAF50"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="previous"
                    name="Previous Year"
                    stroke="#2196F3"
                    fill="#2196F3"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Revenue Report</CardTitle>
              <CardDescription>Select a specific report to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Please select a specific report from the menu to view detailed analytics.</p>
            </CardContent>
          </Card>
        )
    }
  }

  return renderContent()
}

