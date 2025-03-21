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
const userGrowthData = [
  { name: "Jan", customers: 120, vendors: 45 },
  { name: "Feb", customers: 140, vendors: 52 },
  { name: "Mar", customers: 170, vendors: 60 },
  { name: "Apr", customers: 190, vendors: 70 },
  { name: "May", customers: 220, vendors: 85 },
  { name: "Jun", customers: 250, vendors: 95 },
  { name: "Jul", customers: 280, vendors: 110 },
]

export default function NewRegistrationReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="New Registration Report"
        description="Analysis of new user registrations over time"
        category="User Growth"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,580</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9,450</div>
                <p className="text-xs text-muted-foreground">75.1% of total users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,130</div>
                <p className="text-xs text-muted-foreground">24.9% of total users</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>New User Registrations</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="customers"
                    name="Customers"
                    stroke="#2196F3"
                    fill="#2196F3"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="vendors"
                    name="Vendors"
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
              <CardTitle>Registration by Location</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Location</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Users</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Customers</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Vendors</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Growth Rate</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    { location: "Mumbai", total: 3250, customers: 2450, vendors: 800, growth: "+12.5%" },
                    { location: "Delhi", total: 2800, customers: 2100, vendors: 700, growth: "+10.2%" },
                    { location: "Bangalore", total: 2200, customers: 1650, vendors: 550, growth: "+15.8%" },
                    { location: "Chennai", total: 1800, customers: 1350, vendors: 450, growth: "+8.7%" },
                    { location: "Hyderabad", total: 1600, customers: 1200, vendors: 400, growth: "+11.3%" },
                  ].map((data, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{data.location}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.total}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.customers}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.vendors}</ResponsiveTable.Cell>
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

