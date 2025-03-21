"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, DollarSign, Users, Briefcase, CheckCircle, Clock, XCircle } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "@/components/ui/chart"

export default function AdminDashboard() {
  // Sample data for charts
  const revenueData = [
    { name: "Jan", total: 1500 },
    { name: "Feb", total: 2300 },
    { name: "Mar", total: 3200 },
    { name: "Apr", total: 4500 },
    { name: "May", total: 4200 },
    { name: "Jun", total: 5800 },
    { name: "Jul", total: 6000 },
  ]

  const jobsData = [
    { name: "Confectioner", value: 40 },
    { name: "Photographer", value: 30 },
    { name: "Band", value: 20 },
    { name: "AC Repair", value: 50 },
    { name: "Plumber", value: 35 },
    { name: "Electrician", value: 45 },
  ]

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">+180 new users this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 since last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.6%</div>
                  <p className="text-xs text-muted-foreground">+2.4% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="total" stroke="#FF9800" fill="#FFB74D" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Job Requests by Category</CardTitle>
                  <CardDescription>Top service categories by request volume</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={jobsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#FF9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Customers</CardTitle>
                  <CardDescription>Latest customer registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36&text=C${i}`} alt={`Customer ${i}`} />
                          <AvatarFallback>C{i}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium">Customer Name {i}</p>
                          <p className="text-sm text-muted-foreground">customer{i}@example.com</p>
                        </div>
                        <div className="ml-auto font-medium text-xs text-muted-foreground">
                          {i} day{i !== 1 ? "s" : ""} ago
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Vendors</CardTitle>
                  <CardDescription>Latest vendor registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36&text=V${i}`} alt={`Vendor ${i}`} />
                          <AvatarFallback>V{i}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium">Vendor Business {i}</p>
                          <p className="text-sm text-muted-foreground">vendor{i}@example.com</p>
                        </div>
                        <div className="ml-auto font-medium text-xs text-muted-foreground">
                          {i * 2} day{i * 2 !== 1 ? "s" : ""} ago
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Job Requests</CardTitle>
                  <CardDescription>Latest service requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, title: "AC Repair", status: "completed" },
                      { id: 2, title: "Wedding Photography", status: "in-progress" },
                      { id: 3, title: "Catering Service", status: "pending" },
                      { id: 4, title: "Band Booking", status: "completed" },
                      { id: 5, title: "Plumbing Work", status: "cancelled" },
                    ].map((job) => (
                      <div key={job.id} className="flex items-center">
                        <div
                          className={`h-9 w-9 rounded-full flex items-center justify-center ${job.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : job.status === "in-progress"
                              ? "bg-blue-100 text-blue-600"
                              : job.status === "pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                            }`}
                        >
                          {job.status === "completed" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : job.status === "in-progress" ? (
                            <Clock className="h-5 w-5" />
                          ) : job.status === "pending" ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )}
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-xs capitalize text-muted-foreground">{job.status.replace("-", " ")}</p>
                        </div>
                        <div className="ml-auto font-medium text-xs text-muted-foreground">
                          {job.id * 3} hour{job.id * 3 !== 1 ? "s" : ""} ago
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Detailed analytics will be displayed here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Analytics content coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generated reports will be displayed here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reports content coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

// Import the Avatar component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"