import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
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

interface TaskStatusReportProps {
  itemId: string
}

export default function TaskStatusReport({ itemId }: TaskStatusReportProps) {
  // Sample data for the report
  const taskStatusData = [
    { name: "Completed", value: 540, color: "#4CAF50" },
    { name: "In Progress", value: 320, color: "#2196F3" },
    { name: "Pending", value: 210, color: "#FF9800" },
    { name: "Cancelled", value: 90, color: "#F44336" },
  ]

  // Render different content based on the selected item
  const renderContent = () => {
    switch (itemId) {
      case "task-status-overview":
        return (
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
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )

      case "task-status-trend":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Task Status Trends</CardTitle>
              <CardDescription>Monthly trends of task statuses over time</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
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
                  <Bar dataKey="completed" name="Completed" fill="#4CAF50" />
                  <Bar dataKey="inProgress" name="In Progress" fill="#2196F3" />
                  <Bar dataKey="pending" name="Pending" fill="#FF9800" />
                  <Bar dataKey="cancelled" name="Cancelled" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "task-completion-time":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Task Completion Time Analysis</CardTitle>
              <CardDescription>Average time to complete tasks by category</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { category: "Confectioner", time: 48 },
                    { category: "Photographer", time: 72 },
                    { category: "Band", time: 36 },
                    { category: "AC Repair", time: 24 },
                    { category: "Electrician", time: 12 },
                    { category: "Plumber", time: 18 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit=" hrs" />
                  <YAxis dataKey="category" type="category" width={100} />
                  <Tooltip formatter={(value) => [`${value} hours`, "Avg. Completion Time"]} />
                  <Legend />
                  <Bar dataKey="time" name="Avg. Completion Time (hours)" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Task Status Report</CardTitle>
              <CardDescription>Select a specific report to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Please select a specific report from the menu to view detailed analytics.</p>
            </CardContent>
          </Card>
        )
    }
  }

  return renderContent()
}

