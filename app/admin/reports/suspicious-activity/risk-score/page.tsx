"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

export default function RiskScoreCalculationPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Risk Score Calculation"
        description="Analysis of user risk scores and suspicious activity patterns"
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
                <CardTitle className="text-sm font-medium">Medium Risk Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">356</div>
                <p className="text-xs text-muted-foreground">-2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Low Risk Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,100</div>
                <p className="text-xs text-muted-foreground">+8.7% from last month</p>
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
                  <Bar dataKey="users" name="Number of Users" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Score Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: "Jan", avgScore: 22.5, highRiskUsers: 98 },
                    { month: "Feb", avgScore: 21.8, highRiskUsers: 105 },
                    { month: "Mar", avgScore: 20.6, highRiskUsers: 112 },
                    { month: "Apr", avgScore: 19.8, highRiskUsers: 118 },
                    { month: "May", avgScore: 19.2, highRiskUsers: 120 },
                    { month: "Jun", avgScore: 18.7, highRiskUsers: 122 },
                    { month: "Jul", avgScore: 18.5, highRiskUsers: 124 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="avgScore" name="Avg. Risk Score" stroke="#2196F3" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="highRiskUsers"
                    name="High Risk Users"
                    stroke="#F44336"
                  />
                </LineChart>
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
                    <ResponsiveTable.Head>Risk Factors</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Location</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Joined</ResponsiveTable.Head>
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
                      factors: "Multiple account logins, Excessive disputes, Rapid bidding",
                      location: "Mumbai",
                      joined: "12 Jan 2023",
                      status: "Flagged",
                    },
                    {
                      id: "U-3872",
                      name: "Priya Singh",
                      type: "Customer",
                      score: 88,
                      factors: "Unusual payment patterns, Frequent cancellations",
                      location: "Delhi",
                      joined: "05 Mar 2023",
                      status: "Under Review",
                    },
                    {
                      id: "U-6290",
                      name: "Vikram Patel",
                      type: "Vendor",
                      score: 85,
                      factors: "Fake reviews, Low completion rate",
                      location: "Bangalore",
                      joined: "18 Nov 2022",
                      status: "Flagged",
                    },
                    {
                      id: "U-4103",
                      name: "Ananya Sharma",
                      type: "Customer",
                      score: 82,
                      factors: "Location anomalies, Unusual payment patterns",
                      location: "Chennai",
                      joined: "22 Apr 2023",
                      status: "Under Review",
                    },
                    {
                      id: "U-7512",
                      name: "Rahul Gupta",
                      type: "Vendor",
                      score: 78,
                      factors: "Multiple account logins, Rapid bidding",
                      location: "Hyderabad",
                      joined: "09 Feb 2023",
                      status: "Flagged",
                    },
                  ].map((user) => (
                    <ResponsiveTable.Row key={user.id}>
                      <ResponsiveTable.Cell>{user.id}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.name}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.type}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.score}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.factors}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.location}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.joined}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{user.status}</ResponsiveTable.Cell>
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

