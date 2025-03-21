"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"

// Sample data for charts
const taskCategoryData = [
  { name: "Confectioner", completed: 120, pending: 45, cancelled: 15 },
  { name: "Photographer", completed: 95, pending: 30, cancelled: 10 },
  { name: "Band", completed: 75, pending: 25, cancelled: 8 },
  { name: "AC Repair", completed: 150, pending: 60, cancelled: 20 },
  { name: "Electrician", completed: 100, pending: 50, cancelled: 15 },
]

export default function TaskCategoryReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Task Category Report"
        description="Analysis of tasks by service category"
        category="Task Analytics"
      >
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tasks by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#4CAF50" />
                  <Bar dataKey="pending" name="Pending" fill="#FF9800" />
                  <Bar dataKey="cancelled" name="Cancelled" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Category</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Tasks</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Completed</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Pending</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Cancelled</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Completion Rate</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Avg. Price</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Revenue</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      category: "Confectioner",
                      total: 180,
                      completed: 120,
                      pending: 45,
                      cancelled: 15,
                      rate: "66.7%",
                      avgPrice: "₹12,500",
                      revenue: "₹1,500,000",
                    },
                    {
                      category: "Photographer",
                      total: 135,
                      completed: 95,
                      pending: 30,
                      cancelled: 10,
                      rate: "70.4%",
                      avgPrice: "₹18,000",
                      revenue: "₹1,710,000",
                    },
                    {
                      category: "Band",
                      total: 108,
                      completed: 75,
                      pending: 25,
                      cancelled: 8,
                      rate: "69.4%",
                      avgPrice: "₹25,000",
                      revenue: "₹1,875,000",
                    },
                    {
                      category: "AC Repair",
                      total: 230,
                      completed: 150,
                      pending: 60,
                      cancelled: 20,
                      rate: "65.2%",
                      avgPrice: "₹5,000",
                      revenue: "₹750,000",
                    },
                    {
                      category: "Electrician",
                      total: 165,
                      completed: 100,
                      pending: 50,
                      cancelled: 15,
                      rate: "60.6%",
                      avgPrice: "₹3,500",
                      revenue: "₹350,000",
                    },
                  ].map((data, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{data.category}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.total}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.completed}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.pending}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.cancelled}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.rate}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.avgPrice}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.revenue}</ResponsiveTable.Cell>
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

