"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"

export default function WorkerPerformanceReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Worker Performance Reports"
        description="Comprehensive analysis of worker efficiency, ratings, and task completion"
        category="Worker Performance"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Avg. Task Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.5%</div>
                <Progress value={92.5} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+2.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Avg. Worker Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7 / 5</div>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">+0.2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28 minutes</div>
                <Progress value={70} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">-5 minutes from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Worker Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={[
                    { subject: "Task Completion", A: 120, B: 110, fullMark: 150 },
                    { subject: "Customer Rating", A: 98, B: 130, fullMark: 150 },
                    { subject: "Response Time", A: 86, B: 130, fullMark: 150 },
                    { subject: "Punctuality", A: 99, B: 100, fullMark: 150 },
                    { subject: "Professionalism", A: 85, B: 90, fullMark: 150 },
                    { subject: "Skill Level", A: 65, B: 85, fullMark: 150 },
                  ]}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar name="Top Performers" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Average Performers" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Completion Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: "Jan", completion: 88 },
                    { month: "Feb", completion: 89 },
                    { month: "Mar", completion: 90 },
                    { month: "Apr", completion: 91 },
                    { month: "May", completion: 92 },
                    { month: "Jun", completion: 92.5 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completion" name="Task Completion Rate (%)" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Worker Name</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Category</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Tasks Completed</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Avg. Rating</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Response Time</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Earnings</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      name: "Rajesh Kumar",
                      category: "Electrician",
                      tasksCompleted: 85,
                      avgRating: 4.9,
                      responseTime: "15 min",
                      earnings: "₹42,500",
                    },
                    {
                      name: "Priya Sharma",
                      category: "Confectioner",
                      tasksCompleted: 72,
                      avgRating: 4.8,
                      responseTime: "20 min",
                      earnings: "₹36,000",
                    },
                    {
                      name: "Amit Patel",
                      category: "Photographer",
                      tasksCompleted: 68,
                      avgRating: 4.7,
                      responseTime: "25 min",
                      earnings: "₹54,400",
                    },
                    {
                      name: "Sneha Gupta",
                      category: "AC Repair",
                      tasksCompleted: 79,
                      avgRating: 4.6,
                      responseTime: "18 min",
                      earnings: "₹39,500",
                    },
                    {
                      name: "Vikram Singh",
                      category: "Band",
                      tasksCompleted: 61,
                      avgRating: 4.8,
                      responseTime: "30 min",
                      earnings: "₹48,800",
                    },
                  ].map((worker, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{worker.name}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{worker.category}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{worker.tasksCompleted}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{worker.avgRating}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{worker.responseTime}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{worker.earnings}</ResponsiveTable.Cell>
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

