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
import { Badge } from "@/components/ui/badge"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function SuspiciousActivityReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Suspicious Activity & Risk Score Reports"
        description="Analysis of potential fraud, risk assessment, and security measures"
        category="Suspicious Activity & Risk Score"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">High Risk Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Avg. Risk Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.5</div>
                <p className="text-xs text-muted-foreground">-1.2 points from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Flagged Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">287</div>
                <p className="text-xs text-muted-foreground">-3.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Blocked Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Score Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { score: "0-10", users: 5200 },
                    { score: "11-20", users: 3800 },
                    { score: "21-30", users: 2100 },
                    { score: "31-40", users: 980 },
                    { score: "41-50", users: 420 },
                    { score: "51-60", users: 180 },
                    { score: "61-70", users: 85 },
                    { score: "71-80", users: 42 },
                    { score: "81-90", users: 18 },
                    { score: "91-100", users: 5 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="score" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" name="Number of Users" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suspicious Activity Types</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Multiple Account Logins", value: 35 },
                      { name: "Unusual Payment Patterns", value: 25 },
                      { name: "Rapid Bidding & Withdrawal", value: 20 },
                      { name: "Fake Reviews", value: 15 },
                      { name: "Other", value: 5 },
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
              <CardTitle>High Risk Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>User ID</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Name</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Type</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Risk Score</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Suspicious Activities</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Last Activity</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Status</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      id: "U-5421",
                      name: "Rajiv Malhotra",
                      type: "Vendor",
                      score: 92,
                      activities: "Multiple logins, Rapid bidding",
                      lastActivity: "2 hours ago",
                      status: "Flagged",
                    },
                    {
                      id: "U-3872",
                      name: "Priya Singh",
                      type: "Customer",
                      score: 88,
                      activities: "Unusual payments, Frequent cancellations",
                      lastActivity: "5 hours ago",
                      status: "Under Review",
                    },
                    {
                      id: "U-6290",
                      name: "Vikram Patel",
                      type: "Vendor",
                      score: 85,
                      activities: "Fake reviews, Low completion rate",
                      lastActivity: "1 day ago",
                      status: "Suspended",
                    },
                    {
                      id: "U-4103",
                      name: "Ananya Sharma",
                      type: "Customer",
                      score: 82,
                      activities: "Multiple accounts, Unusual browsing",
                      lastActivity: "3 hours ago",
                      status: "Flagged",
                    },
                    {
                      id: "U-7512",
                      name: "Rahul Gupta",
                      type: "Vendor",
                      score: 78,
                      activities: "Rapid bidding, Negative feedback",
                      lastActivity: "6 hours ago",
                      status: "Under Review",
                    },
                  ].map((user, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{user.id}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.name}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.type}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.score}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.activities}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.lastActivity}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>
                        <Badge
                          variant={
                            user.status === "Flagged"
                              ? "default"
                              : user.status === "Under Review"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {user.status}
                        </Badge>
                      </ResponsiveTable.Cell>
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

