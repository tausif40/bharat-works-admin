"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
import {
  LineChart,
  Line,
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

export default function DisputeFraudReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Dispute & Fraud Detection Reports"
        description="Analysis of disputes, fraud cases, and risk management"
        category="Dispute & Fraud Detection"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Total Disputes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">-5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Fraud Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">-2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.5 days</div>
                <p className="text-xs text-muted-foreground">-0.5 days from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Dispute Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.1%</div>
                <p className="text-xs text-muted-foreground">-0.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: "Jan", disputes: 280, fraudCases: 38 },
                    { month: "Feb", disputes: 300, fraudCases: 42 },
                    { month: "Mar", disputes: 290, fraudCases: 40 },
                    { month: "Apr", disputes: 270, fraudCases: 36 },
                    { month: "May", disputes: 260, fraudCases: 34 },
                    { month: "Jun", disputes: 248, fraudCases: 32 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="disputes" stroke="#8884d8" name="Disputes" />
                  <Line yAxisId="right" type="monotone" dataKey="fraudCases" stroke="#82ca9d" name="Fraud Cases" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Reasons</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Service Quality", value: 40 },
                      { name: "Pricing Discrepancy", value: 25 },
                      { name: "Late Delivery", value: 15 },
                      { name: "Miscommunication", value: 12 },
                      { name: "Other", value: 8 },
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
              <CardTitle>Recent Dispute Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Case ID</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Customer</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Vendor</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Service</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Dispute Reason</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Amount</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Status</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      id: "D-1001",
                      customer: "Rahul Sharma",
                      vendor: "Priya Patel",
                      service: "Wedding Photography",
                      reason: "Service Quality",
                      amount: "₹25,000",
                      status: "Under Review",
                    },
                    {
                      id: "D-1002",
                      customer: "Amit Kumar",
                      vendor: "Vikram Singh",
                      service: "AC Repair",
                      reason: "Pricing Discrepancy",
                      amount: "₹3,500",
                      status: "Resolved",
                    },
                    {
                      id: "D-1003",
                      customer: "Sneha Gupta",
                      vendor: "Rajesh Kumar",
                      service: "Catering",
                      reason: "Late Delivery",
                      amount: "₹15,000",
                      status: "Escalated",
                    },
                    {
                      id: "D-1004",
                      customer: "Neha Verma",
                      vendor: "Sanjay Patel",
                      service: "Electrician",
                      reason: "Miscommunication",
                      amount: "₹2,000",
                      status: "Resolved",
                    },
                    {
                      id: "D-1005",
                      customer: "Arjun Singh",
                      vendor: "Meera Reddy",
                      service: "Band Booking",
                      reason: "Service Quality",
                      amount: "₹30,000",
                      status: "Under Review",
                    },
                  ].map((dispute, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{dispute.id}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{dispute.customer}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{dispute.vendor}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{dispute.service}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{dispute.reason}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{dispute.amount}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>
                        <Badge
                          variant={
                            dispute.status === "Resolved"
                              ? "success"
                              : dispute.status === "Escalated"
                                ? "destructive"
                                : "default"
                          }
                        >
                          {dispute.status}
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

