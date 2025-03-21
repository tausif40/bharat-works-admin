"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown, MoreHorizontal, MapPin, User, Star, Download, Plus } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ResponsiveTable } from "@/components/responsive-table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define types for our data structure
type Vendor = {
  id: string
  name: string
  email: string
  location: string
  category: string
  rating: number
  status: "active" | "inactive" | "blocked" | "pending"
  joinedDate: string
  lastActive: string
}

export default function VendorsPage() {
  // Sample vendor data
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Suresh Kumar",
      email: "suresh.kumar@example.com",
      location: "Mumbai",
      category: "Electrician",
      rating: 4.8,
      status: "active",
      joinedDate: "2023-01-15",
      lastActive: "2023-09-20T10:30:00",
    },
    {
      id: "2",
      name: "Anita Desai",
      email: "anita.desai@example.com",
      location: "Delhi",
      category: "Photographer",
      rating: 4.5,
      status: "active",
      joinedDate: "2023-02-22",
      lastActive: "2023-09-19T14:45:00",
    },
    {
      id: "3",
      name: "Rajiv Mehta",
      email: "rajiv.mehta@example.com",
      location: "Bangalore",
      category: "Plumber",
      rating: 3.9,
      status: "inactive",
      joinedDate: "2023-03-10",
      lastActive: "2023-08-05T09:15:00",
    },
    {
      id: "4",
      name: "Kavita Sharma",
      email: "kavita.sharma@example.com",
      location: "Chennai",
      category: "Carpenter",
      rating: 4.2,
      status: "active",
      joinedDate: "2023-04-05",
      lastActive: "2023-09-18T16:20:00",
    },
    {
      id: "5",
      name: "Prakash Joshi",
      email: "prakash.joshi@example.com",
      location: "Kolkata",
      category: "Electrician",
      rating: 3.5,
      status: "blocked",
      joinedDate: "2023-02-18",
      lastActive: "2023-07-30T11:45:00",
    },
    {
      id: "6",
      name: "Meera Patel",
      email: "meera.patel@example.com",
      location: "Mumbai",
      category: "Photographer",
      rating: 4.9,
      status: "pending",
      joinedDate: "2023-05-12",
      lastActive: "2023-09-17T08:30:00",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [ratingFilter, setRatingFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<keyof Vendor>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Get unique locations, categories for filters
  const locations = Array.from(new Set(vendors.map((v) => v.location)))
  const categories = Array.from(new Set(vendors.map((v) => v.category)))

  // Handle sorting
  const handleSort = (field: keyof Vendor) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort vendors
  const filteredVendors = vendors
    .filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || vendor.status === statusFilter
      const matchesLocation = locationFilter === "all" || vendor.location === locationFilter
      const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter

      const matchesRating =
        ratingFilter === "all" ||
        (ratingFilter === "5" && vendor.rating >= 4.5) ||
        (ratingFilter === "4" && vendor.rating >= 4.0 && vendor.rating < 4.5) ||
        (ratingFilter === "3" && vendor.rating >= 3.0 && vendor.rating < 4.0) ||
        (ratingFilter === "below3" && vendor.rating < 3.0)

      return matchesSearch && matchesStatus && matchesLocation && matchesCategory && matchesRating
    })
    .sort((a, b) => {
      if (sortField === "name" || sortField === "email" || sortField === "location" || sortField === "category") {
        return sortDirection === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField])
      } else if (sortField === "rating") {
        return sortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating
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

  // Render stars for rating
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">Vendors</h2>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Venders
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Venders</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mobile" className="text-right">
                      Mobile
                    </Label>
                    <Input
                      id="mobile"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Gender
                    </Label>
                    <Select

                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      className="col-span-3"
                    />
                  </div>

                </div>
                <DialogFooter>
                  <Button >Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
          <div className="flex w-full md:w-auto items-center space-x-2 flex-wrap gap-2">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search vendors..."
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
                <SelectItem value="pending">Pending</SelectItem>
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
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">4.5 & Above</SelectItem>
                <SelectItem value="4">4.0 - 4.4</SelectItem>
                <SelectItem value="3">3.0 - 3.9</SelectItem>
                <SelectItem value="below3">Below 3.0</SelectItem>
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
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("category")}>
                      Category
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
                  <ResponsiveTable.Head>
                    <div className="flex items-center cursor-pointer" onClick={() => handleSort("rating")}>
                      Rating
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </ResponsiveTable.Head>
                  <ResponsiveTable.Head>Joined Date</ResponsiveTable.Head>
                  <ResponsiveTable.Head>Status</ResponsiveTable.Head>
                  <ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
                </ResponsiveTable.Row>
              </ResponsiveTable.Header>
              <ResponsiveTable.Body>
                {filteredVendors.map((vendor) => (
                  <ResponsiveTable.Row key={vendor.id}>
                    <ResponsiveTable.Cell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${vendor.name.charAt(0)}`} />
                          <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{vendor.name}</div>
                          <div className="text-sm text-muted-foreground">{vendor.email}</div>
                        </div>
                      </div>
                    </ResponsiveTable.Cell>
                    <ResponsiveTable.Cell>{vendor.category}</ResponsiveTable.Cell>
                    <ResponsiveTable.Cell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                        {vendor.location}
                      </div>
                    </ResponsiveTable.Cell>
                    {/* <ResponsiveTable.Cell>{renderRatingStars(vendor.rating)}</ResponsiveTable.Cell> */}
                    <ResponsiveTable.Cell>
                      {vendor.rating > 0 ? (
                        <div className="flex items-center">
                          <span className="mr-1">{vendor.rating}</span>
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
                    </ResponsiveTable.Cell>
                    <ResponsiveTable.Cell>{formatDate(vendor.joinedDate)}</ResponsiveTable.Cell>
                    <ResponsiveTable.Cell>
                      <Badge
                        variant={
                          vendor.status === "active"
                            ? "default"
                            : vendor.status === "inactive"
                              ? "secondary"
                              : vendor.status === "pending"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {vendor.status}
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
                          <DropdownMenuItem>Edit vendor</DropdownMenuItem>
                          {vendor.status === "active" ? (
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Activate</DropdownMenuItem>
                          )}
                          {vendor.status !== "blocked" ? (
                            <DropdownMenuItem>Block</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Unblock</DropdownMenuItem>
                          )}
                          {vendor.status === "pending" && <DropdownMenuItem>Approve</DropdownMenuItem>}
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
// import { Search, MoreHorizontal, Download, Filter, Star, Plus } from "lucide-react"
// import AdminLayout from "@/components/admin-layout"
// import { ResponsiveTable } from "@/components/responsive-table"
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { AlertDialogFooter } from "@/components/ui/alert-dialog"
// import { Label } from "@/components/ui/label"

// export default function VendorsPage() {
//   // Sample vendor data
//   const vendors = [
//     {
//       id: 1,
//       name: "Sharma Catering Services",
//       owner: "Rajesh Sharma",
//       email: "sharma.catering@example.com",
//       phone: "+91 98765 43210",
//       category: "Confectioner",
//       location: "Mumbai, Maharashtra",
//       status: "verified",
//       rating: 4.8,
//       jobsCompleted: 42,
//       joinedDate: "2023-03-15",
//     },
//     {
//       id: 2,
//       name: "Patel Photography",
//       owner: "Nikhil Patel",
//       email: "patel.photography@example.com",
//       phone: "+91 87654 32109",
//       category: "Photographer",
//       location: "Delhi, Delhi",
//       status: "verified",
//       rating: 4.5,
//       jobsCompleted: 28,
//       joinedDate: "2023-04-22",
//     },
//     {
//       id: 3,
//       name: "Kumar Band Group",
//       owner: "Suresh Kumar",
//       email: "kumar.band@example.com",
//       phone: "+91 76543 21098",
//       category: "Band",
//       location: "Jaipur, Rajasthan",
//       status: "pending",
//       rating: 0,
//       jobsCompleted: 0,
//       joinedDate: "2023-08-10",
//     },
//     {
//       id: 4,
//       name: "Singh AC Repairs",
//       owner: "Gurpreet Singh",
//       email: "singh.acrepair@example.com",
//       phone: "+91 65432 10987",
//       category: "AC Repair",
//       location: "Chandigarh, Punjab",
//       status: "verified",
//       rating: 4.2,
//       jobsCompleted: 56,
//       joinedDate: "2023-02-05",
//     },
//     {
//       id: 5,
//       name: "Gupta Electricals",
//       owner: "Ramesh Gupta",
//       email: "gupta.electricals@example.com",
//       phone: "+91 54321 09876",
//       category: "Electrician",
//       location: "Lucknow, Uttar Pradesh",
//       status: "rejected",
//       rating: 0,
//       jobsCompleted: 0,
//       joinedDate: "2023-07-18",
//     },
//   ]

//   return (
//     <AdminLayout>
//       <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//         <div className="flex items-center justify-between">
//           <h2 className="text-3xl font-bold tracking-tight">Vendors</h2>
//           <div className="flex items-center space-x-2">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Venders
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Add New Venders</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-right">
//                       Name
//                     </Label>
//                     <Input
//                       id="name"
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="email" className="text-right">
//                       Email
//                     </Label>
//                     <Input
//                       id="email"
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="mobile" className="text-right">
//                       Mobile
//                     </Label>
//                     <Input
//                       id="mobile"
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="status" className="text-right">
//                       Gender
//                     </Label>
//                     <Select

//                     >
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="male">Male</SelectItem>
//                         <SelectItem value="female">Female</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="password" className="text-right">
//                       Password
//                     </Label>
//                     <Input
//                       id="password"
//                       className="col-span-3"
//                     />
//                   </div>

//                 </div>
//                 <DialogFooter>
//                   <Button >Create</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>

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
//               <Input type="search" placeholder="Search vendors..." className="w-full pl-8" />
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
//                 <DropdownMenuItem>Category</DropdownMenuItem>
//                 <DropdownMenuItem>Location</DropdownMenuItem>
//                 <DropdownMenuItem>Rating</DropdownMenuItem>
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
//                 <ResponsiveTable.Head>Business Name</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Category</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Contact</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Location</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Status</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Rating</ResponsiveTable.Head>
//                 <ResponsiveTable.Head>Jobs</ResponsiveTable.Head>
//                 <ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
//               </ResponsiveTable.Row>
//             </ResponsiveTable.Header>
//             <ResponsiveTable.Body>
//               {vendors.map((vendor) => (
//                 <ResponsiveTable.Row key={vendor.id}>
//                   <ResponsiveTable.Cell>
//                     <div>
//                       <div className="font-medium">{vendor.name}</div>
//                       <div className="text-sm text-muted-foreground">{vendor.owner}</div>
//                     </div>
//                   </ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>{vendor.category}</ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>
//                     <div className="text-sm">
//                       <div>{vendor.email}</div>
//                       <div>{vendor.phone}</div>
//                     </div>
//                   </ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>{vendor.location}</ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>
//                     <Badge
//                       variant={
//                         vendor.status === "verified"
//                           ? "default"
//                           : vendor.status === "pending"
//                             ? "outline"
//                             : "destructive"
//                       }
//                     >
//                       {vendor.status}
//                     </Badge>
//                   </ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>
//                     {vendor.rating > 0 ? (
//                       <div className="flex items-center">
//                         <span className="mr-1">{vendor.rating}</span>
//                         <Star className="h-4 w-4 fill-primary text-primary" />
//                       </div>
//                     ) : (
//                       <span className="text-muted-foreground text-sm">N/A</span>
//                     )}
//                   </ResponsiveTable.Cell>
//                   <ResponsiveTable.Cell>{vendor.jobsCompleted}</ResponsiveTable.Cell>
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
//                         <DropdownMenuItem>Edit vendor</DropdownMenuItem>
//                         <DropdownMenuItem>View job history</DropdownMenuItem>
//                         {vendor.status === "pending" && (
//                           <>
//                             <DropdownMenuItem className="text-green-600">Verify vendor</DropdownMenuItem>
//                             <DropdownMenuItem className="text-destructive">Reject vendor</DropdownMenuItem>
//                           </>
//                         )}
//                         {vendor.status === "verified" && (
//                           <DropdownMenuItem className="text-destructive">Suspend vendor</DropdownMenuItem>
//                         )}
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