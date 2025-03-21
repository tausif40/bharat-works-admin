"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
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

export default function RevenueTransactionsReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Revenue & Transactions Reports"
        description="Analysis of platform revenue, transactions, and financial metrics"
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
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { month: "Jan", revenue: 1200000, commission: 120000 },
                    { month: "Feb", revenue: 1350000, commission: 135000 },
                    { month: "Mar", revenue: 1450000, commission: 145000 },
                    { month: "Apr", revenue: 1550000, commission: 155000 },
                    { month: "May", revenue: 1680000, commission: 168000 },
                    { month: "Jun", revenue: 1800000, commission: 180000 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" name="Total Revenue" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="commission" name="Commission" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Category</CardTitle>
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
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                  <Bar dataKey="commission" name="Commission" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Service</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Category</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Revenue</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Transactions</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Avg. Price</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Growth</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      service: "Wedding Photography",
                      category: "Photographer",
                      revenue: "₹3,20,000",
                      transactions: 40,
                      avgPrice: "₹8,000",
                      growth: "+15.2%",
                    },
                    {
                      service: "Birthday Catering",
                      category: "Confectioner",
                      revenue: "₹2,80,000",
                      transactions: 70,
                      avgPrice: "₹4,000",
                      growth: "+12.8%",
                    },
                    {
                      service: "Wedding Band",
                      category: "Band",
                      revenue: "₹2,40,000",
                      transactions: 30,
                      avgPrice: "₹8,000",
                      growth: "+10.5%",
                    },
                    {
                      service: "AC Installation",
                      category: "AC Repair",
                      revenue: "₹1,60,000",
                      transactions: 80,
                      avgPrice: "₹2,000",
                      growth: "+8.7%",
                    },
                    {
                      service: "Home Rewiring",
                      category: "Electrician",
                      revenue: "₹1,20,000",
                      transactions: 60,
                      avgPrice: "₹2,000",
                      growth: "+7.2%",
                    },
                  ].map((data, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{data.service}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.category}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.revenue}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.transactions}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.avgPrice}</ResponsiveTable.Cell>
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

