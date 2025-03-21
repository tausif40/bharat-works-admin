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

export default function UserGrowthReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="User Growth Reports"
        description="Analysis of user acquisition, retention, and churn"
        category="User Growth"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,240</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,920</div>
                <p className="text-xs text-muted-foreground">70.9% of total users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.8%</div>
                <p className="text-xs text-muted-foreground">-0.5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Growth Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { month: "Jan", total: 9800, new: 980, active: 7350 },
                    { month: "Feb", total: 10200, new: 1020, active: 7650 },
                    { month: "Mar", total: 10700, new: 1070, active: 8025 },
                    { month: "Apr", total: 11300, new: 1130, active: 8475 },
                    { month: "May", total: 11900, new: 1190, active: 8925 },
                    { month: "Jun", total: 12580, new: 1240, active: 8920 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="total" name="Total Users" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="new" name="New Users" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="active" name="Active Users" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Retention by Cohort</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { cohort: "Jan", month1: 100, month2: 85, month3: 75, month4: 70, month5: 68, month6: 65 },
                    { cohort: "Feb", month1: 100, month2: 88, month3: 78, month4: 72, month5: 70 },
                    { cohort: "Mar", month1: 100, month2: 90, month3: 82, month4: 75 },
                    { cohort: "Apr", month1: 100, month2: 92, month3: 85 },
                    { cohort: "May", month1: 100, month2: 95 },
                    { cohort: "Jun", month1: 100 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cohort" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="month1" name="Month 1" fill="#8884d8" />
                  <Bar dataKey="month2" name="Month 2" fill="#82ca9d" />
                  <Bar dataKey="month3" name="Month 3" fill="#ffc658" />
                  <Bar dataKey="month4" name="Month 4" fill="#ff8042" />
                  <Bar dataKey="month5" name="Month 5" fill="#a4de6c" />
                  <Bar dataKey="month6" name="Month 6" fill="#d0ed57" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Acquisition Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Channel</ResponsiveTable.Head>
                    <ResponsiveTable.Head>New Users</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Conversion Rate</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Retention Rate</ResponsiveTable.Head>
                    <ResponsiveTable.Head>CAC</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      channel: "Organic Search",
                      newUsers: 450,
                      conversionRate: "3.2%",
                      retentionRate: "68%",
                      cac: "₹120",
                    },
                    {
                      channel: "Paid Search",
                      newUsers: 320,
                      conversionRate: "2.8%",
                      retentionRate: "62%",
                      cac: "₹180",
                    },
                    {
                      channel: "Social Media",
                      newUsers: 280,
                      conversionRate: "2.5%",
                      retentionRate: "59%",
                      cac: "₹150",
                    },
                    { channel: "Referral", newUsers: 120, conversionRate: "4.5%", retentionRate: "75%", cac: "₹90" },
                    { channel: "Direct", newUsers: 70, conversionRate: "3.8%", retentionRate: "70%", cac: "₹100" },
                  ].map((data, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{data.channel}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.newUsers}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.conversionRate}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.retentionRate}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.cac}</ResponsiveTable.Cell>
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

