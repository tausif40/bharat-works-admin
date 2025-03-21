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
  ComposedChart,
  Line,
} from "@/components/ui/chart"

export default function LocationBasedReportPage() {
  return (
    <AdminLayout>
      <ReportLayout
        title="Location-Based Reports"
        description="Geographical analysis of service demand, supply, and performance"
        category="Location-Based"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Top Performing City</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Mumbai</div>
                <p className="text-xs text-muted-foreground">₹45,00,000 revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Fastest Growing City</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Bangalore</div>
                <p className="text-xs text-muted-foreground">+32% growth rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-medium">Cities Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">+3 new cities this quarter</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Service Demand by City</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      city: "Mumbai",
                      confectioner: 450,
                      photographer: 380,
                      band: 200,
                      acRepair: 300,
                      electrician: 250,
                    },
                    { city: "Delhi", confectioner: 400, photographer: 350, band: 180, acRepair: 280, electrician: 220 },
                    {
                      city: "Bangalore",
                      confectioner: 350,
                      photographer: 400,
                      band: 150,
                      acRepair: 250,
                      electrician: 200,
                    },
                    {
                      city: "Chennai",
                      confectioner: 300,
                      photographer: 320,
                      band: 130,
                      acRepair: 220,
                      electrician: 180,
                    },
                    {
                      city: "Hyderabad",
                      confectioner: 280,
                      photographer: 300,
                      band: 120,
                      acRepair: 200,
                      electrician: 170,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="confectioner" name="Confectioner" fill="#8884d8" />
                  <Bar dataKey="photographer" name="Photographer" fill="#82ca9d" />
                  <Bar dataKey="band" name="Band" fill="#ffc658" />
                  <Bar dataKey="acRepair" name="AC Repair" fill="#ff7300" />
                  <Bar dataKey="electrician" name="Electrician" fill="#a4de6c" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>City Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={[
                    { city: "Mumbai", revenue: 4500000, growth: 15, satisfaction: 92 },
                    { city: "Delhi", revenue: 4000000, growth: 12, satisfaction: 90 },
                    { city: "Bangalore", revenue: 3800000, growth: 32, satisfaction: 94 },
                    { city: "Chennai", revenue: 3200000, growth: 18, satisfaction: 91 },
                    { city: "Hyderabad", revenue: 3000000, growth: 25, satisfaction: 93 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="growth" name="Growth (%)" stroke="#82ca9d" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="satisfaction"
                    name="Satisfaction (%)"
                    stroke="#ffc658"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>City-wise Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable>
                <ResponsiveTable.Header>
                  <ResponsiveTable.Row>
                    <ResponsiveTable.Head>City</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Total Revenue</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Growth Rate</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Active Vendors</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Customer Satisfaction</ResponsiveTable.Head>
                    <ResponsiveTable.Head>Most Popular Service</ResponsiveTable.Head>
                  </ResponsiveTable.Row>
                </ResponsiveTable.Header>
                <ResponsiveTable.Body>
                  {[
                    {
                      city: "Mumbai",
                      revenue: "₹45,00,000",
                      growth: "15%",
                      vendors: 1200,
                      satisfaction: "92%",
                      popularService: "Photographer",
                    },
                    {
                      city: "Delhi",
                      revenue: "₹40,00,000",
                      growth: "12%",
                      vendors: 1100,
                      satisfaction: "90%",
                      popularService: "Confectioner",
                    },
                    {
                      city: "Bangalore",
                      revenue: "₹38,00,000",
                      growth: "32%",
                      vendors: 950,
                      satisfaction: "94%",
                      popularService: "AC Repair",
                    },
                    {
                      city: "Chennai",
                      revenue: "₹32,00,000",
                      growth: "18%",
                      vendors: 850,
                      satisfaction: "91%",
                      popularService: "Electrician",
                    },
                    {
                      city: "Hyderabad",
                      revenue: "₹30,00,000",
                      growth: "25%",
                      vendors: 800,
                      satisfaction: "93%",
                      popularService: "Band",
                    },
                  ].map((city, index) => (
                    <ResponsiveTable.Row key={index}>
                      <ResponsiveTable.Cell>{city.city}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{city.revenue}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{city.growth}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{city.vendors}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{city.satisfaction}</ResponsiveTable.Cell>
                      <ResponsiveTable.Cell>{city.popularService}</ResponsiveTable.Cell>
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

