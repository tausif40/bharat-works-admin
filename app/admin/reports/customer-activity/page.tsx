"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function CustomerActivityReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Customer Activity Reports"
        description="Insights into customer behavior, engagement, and preferences"
        category="Customer Activity"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,750</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Avg. Orders per Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2</div>
                <p className="text-xs text-muted-foreground">+0.3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Repeat Customer Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">+3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Service Category Preferences</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Confectioner", value: 35 },
                      { name: "Photographer", value: 25 },
                      { name: "Band", value: 15 },
                      { name: "AC Repair", value: 15 },
                      { name: "Electrician", value: 10 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Engagement by Time of Day</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { time: "6AM-9AM", engagement: 150 },
                    { time: "9AM-12PM", engagement: 300 },
                    { time: "12PM-3PM", engagement: 280 },
                    { time: "3PM-6PM", engagement: 200 },
                    { time: "6PM-9PM", engagement: 350 },
                    { time: "9PM-12AM", engagement: 190 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagement" fill="#8884d8" name="Customer Engagement" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Customers by Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Customer Name</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Orders</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Spend</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Avg. Order Value</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Most Ordered Service</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Last Order Date</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      name: "Rahul Sharma",
                      orders: 12,
                      spend: "₹48,000",
                      avgOrder: "₹4,000",
                      topService: "Photographer",
                      lastOrder: "15 Jun 2023",
                    },
                    {
                      name: "Priya Patel",
                      orders: 10,
                      spend: "₹40,000",
                      avgOrder: "₹4,000",
                      topService: "Confectioner",
                      lastOrder: "20 Jun 2023",
                    },
                    {
                      name: "Amit Kumar",
                      orders: 8,
                      spend: "₹36,000",
                      avgOrder: "₹4,500",
                      topService: "Band",
                      lastOrder: "18 Jun 2023",
                    },
                    {
                      name: "Sneha Gupta",
                      orders: 9,
                      spend: "₹31,500",
                      avgOrder: "₹3,500",
                      topService: "AC Repair",
                      lastOrder: "22 Jun 2023",
                    },
                    {
                      name: "Vikram Singh",
                      orders: 7,
                      spend: "₹28,000",
                      avgOrder: "₹4,000",
                      topService: "Electrician",
                      lastOrder: "19 Jun 2023",
                    },
                  ].map((customer, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{customer.name}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{customer.orders}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{customer.spend}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{customer.avgOrder}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{customer.topService}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{customer.lastOrder}</ResponsiveTable.Cell>
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

