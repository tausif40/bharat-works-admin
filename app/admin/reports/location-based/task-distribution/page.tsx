"use client"

import AdminLayout from "@/components/admin-layout"
import { ReportLayout } from "@/components/reports/report-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveTable } from "@/components/responsive-table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "@/components/ui/chart"

// Sample data for charts
const locationData = [
  { name: "Mumbai", tasks: 250, workers: 120, revenue: 500000 },
  { name: "Delhi", tasks: 200, workers: 100, revenue: 400000 },
  { name: "Bangalore", tasks: 180, workers: 90, revenue: 360000 },
  { name: "Chennai", tasks: 150, workers: 75, revenue: 300000 },
  { name: "Hyderabad", tasks: 130, workers: 65, revenue: 260000 },
  { name: "Kolkata", tasks: 120, workers: 60, revenue: 240000 },
]

export default function TaskDistributionByLocationPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Task Distribution by Location"
        description="Analysis of task distribution across different locations"
        category="Location-Based"
      >
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Distribution by Location</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" name="Tasks" fill="#2196F3" />
                  <Bar dataKey="workers" name="Workers" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>Location</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Tasks</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Available Workers</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Task/Worker Ratio</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Completion Rate</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Avg. Response Time</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Revenue</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      location: "Mumbai",
                      tasks: 250,
                      workers: 120,
                      ratio: "2.08",
                      rate: "92.5%",
                      response: "1.2 hrs",
                      revenue: "₹5,00,000",
                    },
                    {
                      location: "Delhi",
                      tasks: 200,
                      workers: 100,
                      ratio: "2.00",
                      rate: "90.2%",
                      response: "1.5 hrs",
                      revenue: "₹4,00,000",
                    },
                    {
                      location: "Bangalore",
                      tasks: 180,
                      workers: 90,
                      ratio: "2.00",
                      rate: "94.8%",
                      response: "1.0 hrs",
                      revenue: "₹3,60,000",
                    },
                    {
                      location: "Chennai",
                      tasks: 150,
                      workers: 75,
                      ratio: "2.00",
                      rate: "91.7%",
                      response: "1.3 hrs",
                      revenue: "₹3,00,000",
                    },
                    {
                      location: "Hyderabad",
                      tasks: 130,
                      workers: 65,
                      ratio: "2.00",
                      rate: "93.3%",
                      response: "1.1 hrs",
                      revenue: "₹2,60,000",
                    },
                  ].map((data, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{data.location}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.tasks}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.workers}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.ratio}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.rate}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{data.response}</ResponsiveTable.Cell>
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

