"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

// Sample data for charts
const revenueData = [
  { name: "Jan", revenue: 150000, commission: 15000 },
  { name: "Feb", revenue: 180000, commission: 18000 },
  { name: "Mar", revenue: 210000, commission: 21000 },
  { name: "Apr", revenue: 240000, commission: 24000 },
  { name: "May", revenue: 270000, commission: 27000 },
  { name: "Jun", revenue: 300000, commission: 30000 },
  { name: "Jul", revenue: 330000, commission: 33000 },
]

export default function TotalEarningsReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Total Earnings Report"
        description="Analysis of platform revenue and commission earnings"
        category="Revenue & Transactions"
      >
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
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
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

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Category</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Revenue</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Commission</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Transactions</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Avg. Transaction</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Growth</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      category: "Confectioner",
                      revenue: "₹4,50,000",
                      commission: "₹45,000",
                      transactions: 360,
                      avg: "₹12,500",
                      growth: "+15.2%",
                    },
                    {
                      category: "Photographer",
                      revenue: "₹5,40,000",
                      commission: "₹54,000",
                      transactions: 300,
                      avg: "₹18,000",
                      growth: "+12.8%",
                    },
                    {
                      category: "Band",
                      revenue: "₹3,00,000",
                      commission: "₹30,000",
                      transactions: 120,
                      avg: "₹25,000",
                      growth: "+8.5%",
                    },
                    {
                      category: "AC Repair",
                      revenue: "₹2,40,000",
                      commission: "₹24,000",
                      transactions: 480,
                      avg: "₹5,000",
                      growth: "+10.3%",
                    },
                    {
                      category: "Electrician",
                      revenue: "₹1,50,000",
                      commission: "₹15,000",
                      transactions: 430,
                      avg: "₹3,500",
                      growth: "+7.2%",
                    },
                  ].map((data, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{data.category}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.revenue}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.commission}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.transactions}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.avg}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.growth}</ResponsiveTable.Cell>
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

