"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown, MoreHorizontal, MapPin, Mail, User, Download } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveTable } from "@/components/responsive-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define types for our data structure
type Customer = {
  id: string
  name: string
  email: string
  location: string
  status: "active" | "inactive" | "blocked"
  joinedDate: string
  lastActive: string
}

export default function CustomersPage() {
  // Sample customer data
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      location: "Mumbai",
      status: "active",
      joinedDate: "2023-01-15",
      lastActive: "2023-09-20T10:30:00",
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya.patel@example.com",
      location: "Delhi",
      status: "active",
      joinedDate: "2023-02-22",
      lastActive: "2023-09-19T14:45:00",
    },
    {
      id: "3",
      name: "Amit Kumar",
      email: "amit.kumar@example.com",
      location: "Bangalore",
      status: "inactive",
      joinedDate: "2023-03-10",
      lastActive: "2023-08-05T09:15:00",
    },
    {
      id: "4",
      name: "Deepika Singh",
      email: "deepika.singh@example.com",
      location: "Chennai",
      status: "active",
      joinedDate: "2023-04-05",
      lastActive: "2023-09-18T16:20:00",
    },
    {
      id: "5",
      name: "Vikram Malhotra",
      email: "vikram.malhotra@example.com",
      location: "Kolkata",
      status: "blocked",
      joinedDate: "2023-02-18",
      lastActive: "2023-07-30T11:45:00",
    },
    {
      id: "6",
      name: "Neha Gupta",
      email: "neha.gupta@example.com",
      location: "Mumbai",
      status: "active",
      joinedDate: "2023-05-12",
      lastActive: "2023-09-17T08:30:00",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<keyof Customer>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Get unique locations for filter
  const locations = Array.from(new Set(customers.map((c) => c.location)))

  // Handle sorting
  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || customer.status === statusFilter
      const matchesLocation = locationFilter === "all" || customer.location === locationFilter

      return matchesSearch && matchesStatus && matchesLocation
    })
    .sort((a, b) => {
      if (sortField === "name" || sortField === "email" || sortField === "location") {
        return sortDirection === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField])
      }
      return 0
    })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
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
              <Input
                type="search"
                placeholder="Search customers..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
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
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <ResponsiveTable>
              <ResponsiveTable.Header>
                <ResponsiveTable.Row>
                  <ResponsiveTable.Head>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                      <User className="mr-2 h-4 w-4" />
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </ResponsiveTable.Head>
                  <ResponsiveTable.Head>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("email")}>
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </ResponsiveTable.Head>
                  <ResponsiveTable.Head>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("location")}>
                      <MapPin className="mr-2 h-4 w-4" />
                      Location
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </ResponsiveTable.Head>
                  <ResponsiveTable.Head>Joined Date</ResponsiveTable.Head>
                  <ResponsiveTable.Head>Last Active</ResponsiveTable.Head>
                  <ResponsiveTable.Head>Status</ResponsiveTable.Head>
                  <ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
                </ResponsiveTable.Row>
              </ResponsiveTable.Header>
              <ResponsiveTable.Body>
                {filteredCustomers.map((customer) => (
                  <ResponsiveTable.Row key={customer.id}>
                    <ResponsiveTable.Cell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${customer.name.charAt(0)}`} />
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </ResponsiveTable.Cell>
                    <ResponsiveTable.Cell>{customer.email}</ResponsiveTable.Cell>
                    <ResponsiveTable.Cell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                        {customer.location}
                      </div>
                    </ResponsiveTable.Cell>
                    <ResponsiveTable.Cell>{formatDate(customer.joinedDate)}</ResponsiveTable.Cell>
                    <ResponsiveTable.Cell>{formatDateTime(customer.lastActive)}</ResponsiveTable.Cell>
                    <ResponsiveTable.Cell>
                      <Badge
                        variant={
                          customer.status === "active"
                            ? "default"
                            : customer.status === "inactive"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {customer.status}
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
                          <DropdownMenuItem>Edit customer</DropdownMenuItem>
                          {customer.status === "active" ? (
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Activate</DropdownMenuItem>
                          )}
                          {customer.status !== "blocked" ? (
                            <DropdownMenuItem>Block</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Unblock</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ResponsiveTable.Cell>
                  </ResponsiveTable.Row>
                ))}
              </ResponsiveTable.Body>
            </ResponsiveTable>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}



// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination"
// import { Badge } from "@/components/ui/badge"
// import { Search, MoreHorizontal, Download, Filter } from "lucide-react"
// import AdminLayout from "@/components/admin-layout"
// import { ResponsiveTable } from "@/components/responsive-table"

// export default function CustomersPage() {
//   // Sample customer data
//   const customers = [
//     {
//       id: 1,
//       name: "Rahul Sharma",
//       email: "rahul.sharma@example.com",
//       phone: "+91 98765 43210",
//       location: "Mumbai, Maharashtra",
//       status: "active",
//       jobsRequested: 8,
//       joinedDate: "2023-05-15",
//     },
//     {
//       id: 2,
//       name: "Priya Patel",
//       email: "priya.patel@example.com",
//       phone: "+91 87654 32109",
//       location: "Delhi, Delhi",
//       status: "active",
//       jobsRequested: 5,
//       joinedDate: "2023-06-22",
//     },
//     {
//       id: 3,
//       name: "Amit Kumar",
//       email: "amit.kumar@example.com",
//       phone: "+91 76543 21098",
//       location: "Bangalore, Karnataka",
//       status: "inactive",
//       jobsRequested: 3,
//       joinedDate: "2023-07-10",
//     },
//     {
//       id: 4,
//       name: "Sneha Gupta",
//       email: "sneha.gupta@example.com",
//       phone: "+91 65432 10987",
//       location: "Chennai, Tamil Nadu",
//       status: "active",
//       jobsRequested: 12,
//       joinedDate: "2023-04-05",
//     },
//     {
//       id: 5,
//       name: "Vikram Singh",
//       email: "vikram.singh@example.com",
//       phone: "+91 54321 09876",
//       location: "Hyderabad, Telangana",
//       status: "active",
//       jobsRequested: 6,
//       joinedDate: "2023-08-18",
//     },
//   ]

//   return (
//     <AdminLayout>
//       <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//         <div className="flex items-center justify-between">
//           <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
//           <div className="flex items-center space-x-2">
//             <Button>
//               <Download className="mr-2 h-4 w-4" />
//               Export
//             </Button>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex w-full md:w-auto items-center space-x-2">
//             <div className="relative w-full md:w-[300px]">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input type="search" placeholder="Search customers..." className="w-full pl-8" />
//             </div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Filter className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//                 <DropdownMenuItem>Status</DropdownMenuItem>
//                 <DropdownMenuItem>Location</DropdownMenuItem>
//                 <DropdownMenuItem>Join Date</DropdownMenuItem>
//                 <DropdownMenuItem>Job Requests</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           <div className="flex items-center space-x-2">
//             <Select defaultValue="10">
//               <SelectTrigger className="w-[80px]">
//                 <SelectValue placeholder="10" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="10">10</SelectItem>
//                 <SelectItem value="20">20</SelectItem>
//                 <SelectItem value="50">50</SelectItem>
//                 <SelectItem value="100">100</SelectItem>
//               </SelectContent>
//             </Select>
//             <p className="text-sm text-muted-foreground">Entries per page</p>
//           </div>
//         </div>

//         <div className="rounded-md border">
//           <ResponsiveTable>
//             <ResponsiveTable.Header>
//               <ResponsiveTable.Row>
//                 <ResponsiveTable.Head>Name</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Email</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Phone</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Location</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Status</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Jobs</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Joined</ResponsiveTable.Head>
//                 <ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
//               </ResponsiveTable.Row>
//             </ResponsiveTable.Header>
//             <ResponsiveTable.Body>
//               {customers.map((customer) => (
//                 <ResponsiveTable.Row key={customer.id}>
//                   <ResponsiveTable.Cell className="font-medium">{customer.name}</ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>{customer.email}</ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>{customer.phone}</ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>{customer.location}</ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>
//                     <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
//                   </ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>{customer.jobsRequested}</ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>{new Date(customer.joinedDate).toLocaleDateString()}</ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-4 w-4" />
//                           <span className="sr-only">Open menu</span>
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem>View details</DropdownMenuItem>
//                         <DropdownMenuItem>Edit customer</DropdownMenuItem>
//                         <DropdownMenuItem>View job history</DropdownMenuItem>
//                         <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </ResponsiveTable.Cell>
//                 </ResponsiveTable.Row>
//               ))}
//             </ResponsiveTable.Body>
//           </ResponsiveTable>
//         </div>

//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious href="#" />
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#" isActive>
//                 1
//               </PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#">2</PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#">3</PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationEllipsis />
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationNext href="#" />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//     </AdminLayout>
//   )
// }

