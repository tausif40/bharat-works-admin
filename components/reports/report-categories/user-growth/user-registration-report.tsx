import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

interface UserRegistrationReportProps {
  itemId: string
}

export default function UserRegistrationReport({ itemId }: UserRegistrationReportProps) {
  // Sample data for the report
  const userGrowthData = [
    { name: "Jan", customers: 120, vendors: 45 },
    { name: "Feb", customers: 140, vendors: 52 },
    { name: "Mar", customers: 170, vendors: 60 },
    { name: "Apr", customers: 190, vendors: 70 },
    { name: "May", customers: 220, vendors: 85 },
    { name: "Jun", customers: 250, vendors: 95 },
    { name: "Jul", customers: 280, vendors: 110 },
  ]

  // Render different content based on the selected item
  const renderContent = () => {
    switch (itemId) {
      case "registration-overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <CardTitle className="text-sm font-medium">Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">9,450</div>
                  <p className="text-xs text-muted-foreground">75.1% of total users</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Vendors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,130</div>
                  <p className="text-xs text-muted-foreground">24.9% of total users</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>New User Registrations</CardTitle>
                <CardDescription>Monthly new user registrations</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="customers"
                      name="Customers"
                      stroke="#2196F3"
                      fill="#2196F3"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="vendors"
                      name="Vendors"
                      stroke="#FF9800"
                      fill="#FF9800"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )

      case "registration-by-location":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Registration by Location</CardTitle>
              <CardDescription>User registrations across different locations</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { location: "Mumbai", customers: 2450, vendors: 800 },
                    { location: "Delhi", customers: 2100, vendors: 700 },
                    { location: "Bangalore", customers: 1650, vendors: 550 },
                    { location: "Chennai", customers: 1350, vendors: 450 },
                    { location: "Hyderabad", customers: 1200, vendors: 400 },
                    { location: "Kolkata", customers: 700, vendors: 230 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="customers" name="Customers" fill="#2196F3" />
                  <Bar dataKey="vendors" name="Vendors" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "registration-source":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Registration Source Analysis</CardTitle>
              <CardDescription>User acquisition channels</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { source: "Organic Search", customers: 3200, vendors: 950 },
                    { source: "Social Media", customers: 2800, vendors: 750 },
                    { source: "Referrals", customers: 1500, vendors: 600 },
                    { source: "Direct", customers: 1200, vendors: 450 },
                    { source: "Email", customers: 750, vendors: 380 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="customers" name="Customers" fill="#2196F3" />
                  <Bar dataKey="vendors" name="Vendors" fill="#FF9800" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>User Registration Report</CardTitle>
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

