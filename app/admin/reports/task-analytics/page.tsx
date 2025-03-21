"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

const taskStatusData = [
  { name: "Completed", value: 540 },
  { name: "In Progress", value: 320 },
  { name: "Pending", value: 210 },
  { name: "Cancelled", value: 90 },
]

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336"]

export default function TaskAnalyticsReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Task Analytics Reports"
        description="Comprehensive analytics for task status, categories, pricing, and more"
        category="Task Analytics"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,160</div>
                <p className="text-xs text-muted-foreground">+15.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">540</div>
                <p className="text-xs text-muted-foreground">46.6% of total tasks</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">320</div>
                <p className="text-xs text-muted-foreground">27.6% of total tasks</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">90</div>
                <p className="text-xs text-muted-foreground">7.8% of total tasks</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                <CardTitle>Task Status Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", completed: 80, inProgress: 40, pending: 30, cancelled: 10 },
                      { month: "Feb", completed: 95, inProgress: 45, pending: 35, cancelled: 12 },
                      { month: "Mar", completed: 110, inProgress: 50, pending: 40, cancelled: 15 },
                      { month: "Apr", completed: 125, inProgress: 60, pending: 45, cancelled: 18 },
                      { month: "May", completed: 140, inProgress: 65, pending: 50, cancelled: 20 },
                      { month: "Jun", completed: 155, inProgress: 70, pending: 55, cancelled: 22 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="completed" stroke="#4CAF50" />
                    <Line type="monotone" dataKey="inProgress" stroke="#2196F3" />
                    <Line type="monotone" dataKey="pending" stroke="#FF9800" />
                    <Line type="monotone" dataKey="cancelled" stroke="#F44336" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Task Category Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Confectioner", completed: 120, pending: 45, cancelled: 15 },
                    { name: "Photographer", completed: 95, pending: 30, cancelled: 10 },
                    { name: "Band", completed: 75, pending: 25, cancelled: 8 },
                    { name: "AC Repair", completed: 150, pending: 60, cancelled: 20 },
                    { name: "Electrician", completed: 100, pending: 50, cancelled: 15 },
                  ]}
                >
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

          {/* Add more sections for task price analysis, emergency tasks, etc. */}
        </div>
      </ReportLayout>
    </AdminLayout>
  )
}

