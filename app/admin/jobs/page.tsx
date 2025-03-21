"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Download, Filter, Calendar, ArrowUpDown } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { ResponsiveTable } from "@/components/responsive-table"
import { useState } from "react"

export default function JobsPage() {

  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  // Sample job data
  const jobs = [
    {
      id: "JB01",
      title: "Wedding Photography",
      customer: "Rahul Sharma",
      vendor: "Patel Photography",
      request: "Direct",
      category: "Photographer",
      location: "Delhi, Delhi",
      status: "completed",
      amount: 25000,
      date: "2023-09-15",
      created: "2023-08-01",
    },
    {
      id: "JB02",
      title: "Birthday Catering",
      customer: "Priya Patel",
      vendor: "Sharma Catering Services",
      request: "Emergency",
      category: "Confectioner",
      location: "Mumbai, Maharashtra",
      status: "in-progress",
      amount: 15000,
      date: "2023-09-25",
      created: "2023-09-10",
    },
    {
      id: "JB03",
      title: "AC Installation",
      customer: "Vikram Singh",
      vendor: "Singh AC Repairs",
      request: "Direct",
      category: "AC Repair",
      location: "Chandigarh, Punjab",
      status: "pending",
      amount: 8000,
      date: "2023-09-30",
      created: "2023-09-18",
    },
    {
      id: "JB04",
      title: "Wedding Band",
      customer: "Sneha Gupta",
      vendor: "Kumar Band Group",
      request: "Bidding",
      category: "Band",
      location: "Jaipur, Rajasthan",
      status: "cancelled",
      amount: 30000,
      date: "2023-10-05",
      created: "2023-08-25",
    },
    {
      id: "JB05",
      title: "Home Electrical Work",
      customer: "Amit Kumar",
      vendor: "Gupta Electricals",
      request: "Bidding",
      category: "Electrician",
      location: "Lucknow, Uttar Pradesh",
      status: "pending-approval",
      amount: 5000,
      date: "2023-10-10",
      created: "2023-09-20",
    },
  ]

  const locations = Array.from(new Set(jobs.map((v) => v.location)))
  const categories = Array.from(new Set(jobs.map((v) => v.category)))

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Job Requests</h2>
          <div className="flex items-center space-x-2">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex w-full md:w-auto items-center space-x-2">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search jobs..." className="w-full pl-8" />
            </div>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuItem>Status</DropdownMenuItem>
                <DropdownMenuItem>Category</DropdownMenuItem>
                <DropdownMenuItem>Date Range</DropdownMenuItem>
                <DropdownMenuItem>Amount</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Completed</SelectItem>
                <SelectItem value="inactive">In progress</SelectItem>
                <SelectItem value="blocked">Pending</SelectItem>
                <SelectItem value="pending">Cancelled</SelectItem>
                <SelectItem value="pending">Pending approval</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by request" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Request</SelectItem>
                <SelectItem value="active">Direct</SelectItem>
                <SelectItem value="inactive">Emergency</SelectItem>
                <SelectItem value="blocked">Bidding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Select defaultValue="10">
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Entries per page</p>
          </div>
        </div>

        <div className="rounded-md border">
          <ResponsiveTable>
            <ResponsiveTable.Header>
              <ResponsiveTable.Row>
                <ResponsiveTable.Head>Job ID</ResponsiveTable.Head>
                <ResponsiveTable.Head>
                  <div className="flex items-center cursor-pointer">
                    Service
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </ResponsiveTable.Head>
                <ResponsiveTable.Head>
                  <div className="flex items-center cursor-pointer">
                    Customer
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </ResponsiveTable.Head>
                <ResponsiveTable.Head>
                  <div className="flex items-center cursor-pointer">
                    Vendor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </ResponsiveTable.Head>
                <ResponsiveTable.Head>
                  <div className="flex items-center cursor-pointer">
                    Request
                    {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
                  </div>
                </ResponsiveTable.Head>
                <ResponsiveTable.Head>
                  <div className="flex items-center cursor-pointer">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </ResponsiveTable.Head>
                <ResponsiveTable.Head>
                  <div className="flex items-center cursor-pointer">
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </ResponsiveTable.Head>
                <ResponsiveTable.Head>Status</ResponsiveTable.Head>
                <ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
              </ResponsiveTable.Row>
            </ResponsiveTable.Header>
            <ResponsiveTable.Body>
              {jobs.map((job) => (
                <ResponsiveTable.Row key={job.id}>
                  <ResponsiveTable.Cell className="font-medium">{job.id}</ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>
                    <div>
                      <div>{job.title}</div>
                      <div className="text-sm text-muted-foreground">{job.category}</div>
                    </div>
                  </ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>{job.customer}</ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>{job.vendor}</ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>{job.request}</ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {new Date(job.date).toLocaleDateString()}
                    </div>
                  </ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>₹{job.amount.toLocaleString()}</ResponsiveTable.Cell>
                  <ResponsiveTable.Cell>
                    <Badge
                      variant={
                        job.status === "completed"
                          ? "default"
                          : job.status === "in-progress"
                            ? "secondary"
                            : job.status === "pending"
                              ? "outline"
                              : job.status === "pending-approval"
                                ? "outline"
                                : "destructive"
                      }
                    >
                      {job.status.replace("-", " ")}
                    </Badge>
                  </ResponsiveTable.Cell>
                  <ResponsiveTable.Cell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Contact customer</DropdownMenuItem>
                        <DropdownMenuItem>Contact vendor</DropdownMenuItem>
                        {job.status === "pending-approval" && (
                          <>
                            <DropdownMenuItem className="text-green-600">Approve request</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Reject request</DropdownMenuItem>
                          </>
                        )}
                        {(job.status === "pending" || job.status === "in-progress") && (
                          <DropdownMenuItem className="text-destructive">Cancel job</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ResponsiveTable.Cell>
                </ResponsiveTable.Row>
              ))}
            </ResponsiveTable.Body>
          </ResponsiveTable>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AdminLayout >
  )
}

