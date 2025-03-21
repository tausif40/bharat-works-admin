"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
import {
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

// Sample data for charts
const taskStatusData = [
  { name: "Completed", value: 540 },
  { name: "In Progress", value: 320 },
  { name: "Pending", value: 210 },
  { name: "Cancelled", value: 90 },
]

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336"]

export default function TaskStatusReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Task Status Report"
        description="Detailed analytics for task status performance"
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
              <CardTitle>Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Task ID</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Title</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Category</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Customer</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Worker</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Status</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Amount</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Date</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      id: "T-1001",
                      title: "Wedding Photography",
                      category: "Photographer",
                      customer: "Rahul Sharma",
                      worker: "Nikhil Patel",
                      status: "Completed",
                      amount: "₹25,000",
                      date: "15 Sep 2023",
                    },
                    {
                      id: "T-1002",
                      title: "Birthday Catering",
                      category: "Confectioner",
                      customer: "Priya Patel",
                      worker: "Rajesh Sharma",
                      status: "In Progress",
                      amount: "₹15,000",
                      date: "25 Sep 2023",
                    },
                    {
                      id: "T-1003",
                      title: "AC Installation",
                      category: "AC Repair",
                      customer: "Vikram Singh",
                      worker: "Gurpreet Singh",
                      status: "Pending",
                      amount: "₹8,000",
                      date: "30 Sep 2023",
                    },
                    {
                      id: "T-1004",
                      title: "Wedding Band",
                      category: "Band",
                      customer: "Sneha Gupta",
                      worker: "Suresh Kumar",
                      status: "Cancelled",
                      amount: "₹30,000",
                      date: "05 Oct 2023",
                    },
                    {
                      id: "T-1005",
                      title: "Home Electrical Work",
                      category: "Electrician",
                      customer: "Amit Kumar",
                      worker: "Ramesh Gupta",
                      status: "Pending",
                      amount: "₹5,000",
                      date: "10 Oct 2023",
                    },
                  ].map((task) => (
                    <ResponsiveTable.Row key={task.id}>
                      <ResponsiveTable.Cell>{task.id}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{task.title}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{task.category}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{task.customer}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{task.worker}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{task.status}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{task.amount}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{task.date}</ResponsiveTable.Cell>
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

