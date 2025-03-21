"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
type ComplaintStatus = "open" | "in-progress" | "resolved" | "closed"

type ComplaintUser = {
	id: string
	name: string
	email: string
	phone: string
	type: "customer" | "vendor"
	avatar?: string
}

type Complaint = {
	id: string
	title: string
	description: string
	status: ComplaintStatus
	category: string
	user: ComplaintUser
	createdAt: string
	updatedAt: string
	assignedTo?: string
	responses?: {
		id: string
		text: string
		createdAt: string
		isAdmin: boolean
	}[]
}

export default function ComplaintsPage() {
	// Sample complaint data
	const [complaints, setComplaints] = useState<Complaint[]>([
		{
			id: "COMP-001",
			title: "Service not delivered as promised",
			description:
				"I booked a photographer for my wedding, but they arrived 2 hours late and missed important moments.",
			status: "open",
			category: "Service Quality",
			user: {
				id: "USR-001",
				name: "Rahul Sharma",
				email: "rahul.sharma@example.com",
				phone: "+91 98765 43210",
				type: "customer",
			},
			createdAt: "2023-09-15T10:30:00",
			updatedAt: "2023-09-15T10:30:00",
			responses: [
				{
					id: "RESP-001",
					text: "I had booked the photographer for 10 AM but they arrived at 12 PM and missed the entire wedding ceremony.",
					createdAt: "2023-09-15T10:30:00",
					isAdmin: false,
				},
			],
		},
		{
			id: "COMP-002",
			title: "Payment not received for completed work",
			description:
				"I completed an electrical job 2 weeks ago but haven't received payment yet despite multiple follow-ups.",
			status: "in-progress",
			category: "Payment",
			user: {
				id: "USR-002",
				name: "Suresh Kumar",
				email: "suresh.kumar@example.com",
				phone: "+91 87654 32109",
				type: "vendor",
			},
			createdAt: "2023-09-10T14:45:00",
			updatedAt: "2023-09-12T09:15:00",
			assignedTo: "Admin User",
			responses: [
				{
					id: "RESP-002",
					text: "I completed the work on September 1st and the customer confirmed completion in the app, but I still haven't received payment.",
					createdAt: "2023-09-10T14:45:00",
					isAdmin: false,
				},
				{
					id: "RESP-003",
					text: "We're looking into this issue and have contacted the customer. We'll update you within 24 hours.",
					createdAt: "2023-09-12T09:15:00",
					isAdmin: true,
				},
			],
		},
		{
			id: "COMP-003",
			title: "Refund not processed after cancellation",
			description: "I cancelled my booking 48 hours in advance but haven't received my refund yet.",
			status: "resolved",
			category: "Refund",
			user: {
				id: "USR-003",
				name: "Priya Patel",
				email: "priya.patel@example.com",
				phone: "+91 76543 21098",
				type: "customer",
			},
			createdAt: "2023-09-05T11:20:00",
			updatedAt: "2023-09-08T16:30:00",
			assignedTo: "Admin User",
			responses: [
				{
					id: "RESP-004",
					text: "I cancelled my booking well in advance but still haven't received my refund of Rs. 2500.",
					createdAt: "2023-09-05T11:20:00",
					isAdmin: false,
				},
				{
					id: "RESP-005",
					text: "We've verified your cancellation and initiated the refund. It should reflect in your account within 3-5 business days.",
					createdAt: "2023-09-06T14:10:00",
					isAdmin: true,
				},
				{
					id: "RESP-006",
					text: "Thank you, I've received the refund now.",
					createdAt: "2023-09-08T16:30:00",
					isAdmin: false,
				},
			],
		},
		{
			id: "COMP-004",
			title: "Vendor was rude and unprofessional",
			description: "The carpenter I hired was extremely rude and left my house in a mess after the job.",
			status: "closed",
			category: "Vendor Behavior",
			user: {
				id: "USR-004",
				name: "Vikram Singh",
				email: "vikram.singh@example.com",
				phone: "+91 65432 10987",
				type: "customer",
			},
			createdAt: "2023-08-28T09:15:00",
			updatedAt: "2023-09-02T13:45:00",
			assignedTo: "Admin User",
			responses: [
				{
					id: "RESP-007",
					text: "The carpenter was very unprofessional, used abusive language, and left sawdust all over my living room.",
					createdAt: "2023-08-28T09:15:00",
					isAdmin: false,
				},
				{
					id: "RESP-008",
					text: "We apologize for your experience. We've contacted the vendor and are investigating this matter.",
					createdAt: "2023-08-29T11:30:00",
					isAdmin: true,
				},
				{
					id: "RESP-009",
					text: "After our investigation, we've taken disciplinary action against the vendor. We're offering you a discount coupon for your next booking as compensation.",
					createdAt: "2023-09-01T15:20:00",
					isAdmin: true,
				},
				{
					id: "RESP-010",
					text: "Thank you for addressing this issue promptly.",
					createdAt: "2023-09-02T13:45:00",
					isAdmin: false,
				},
			],
		},
		{
			id: "COMP-005",
			title: "App keeps crashing during booking",
			description: "I've been trying to book a plumber but the app crashes every time I reach the payment page.",
			status: "in-progress",
			category: "Technical Issue",
			user: {
				id: "USR-005",
				name: "Neha Gupta",
				email: "neha.gupta@example.com",
				phone: "+91 54321 09876",
				type: "customer",
			},
			createdAt: "2023-09-14T16:50:00",
			updatedAt: "2023-09-15T10:15:00",
			assignedTo: "Tech Support",
			responses: [
				{
					id: "RESP-011",
					text: "I've tried multiple times on different devices but the app keeps crashing at the payment stage.",
					createdAt: "2023-09-14T16:50:00",
					isAdmin: false,
				},
				{
					id: "RESP-012",
					text: "We're sorry for the inconvenience. Our technical team is looking into this issue. Could you please provide your device model and app version?",
					createdAt: "2023-09-15T10:15:00",
					isAdmin: true,
				},
			],
		},
	])

	const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [newResponse, setNewResponse] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "all">("all")
	const [categoryFilter, setCategoryFilter] = useState<string | "all">("all")
	const [userTypeFilter, setUserTypeFilter] = useState<"all" | "customer" | "vendor">("all")

	// Handle viewing a complaint
	const handleViewComplaint = (complaint: Complaint) => {
		setSelectedComplaint(complaint)
		setIsDialogOpen(true)
	}

	// Handle updating complaint status
	const handleUpdateStatus = (id: string, status: ComplaintStatus) => {
		setComplaints(
			complaints.map((complaint) => {
				if (complaint.id === id) {
					return {
						...complaint,
						status,
						updatedAt: new Date().toISOString(),
					}
				}
				return complaint
			}),
		)

		if (selectedComplaint && selectedComplaint.id === id) {
			setSelectedComplaint({
				...selectedComplaint,
				status,
				updatedAt: new Date().toISOString(),
			})
		}
	}

	// Handle adding a response
	const handleAddResponse = () => {
		if (!selectedComplaint || !newResponse.trim()) return

		const updatedResponses = [
			...(selectedComplaint.responses || []),
			{
				id: `RESP-${Date.now()}`,
				text: newResponse,
				createdAt: new Date().toISOString(),
				isAdmin: true,
			},
		]

		const updatedComplaint = {
			...selectedComplaint,
			responses: updatedResponses,
			updatedAt: new Date().toISOString(),
		}

		setComplaints(complaints.map((complaint) => (complaint.id === selectedComplaint.id ? updatedComplaint : complaint)))

		setSelectedComplaint(updatedComplaint)
		setNewResponse("")
	}

	// Get unique categories for filter
	const categories = Array.from(new Set(complaints.map((c) => c.category)))

	// Filter complaints based on search term and filters
	const filteredComplaints = complaints.filter((complaint) => {
		const matchesSearch =
			complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			complaint.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			complaint.id.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
		const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter
		const matchesUserType = userTypeFilter === "all" || complaint.user.type === userTypeFilter

		return matchesSearch && matchesStatus && matchesCategory && matchesUserType
	})

	// Format date for display
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString("en-IN", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			// hour: "2-digit",
			// minute: "2-digit",
		})
	}

	// Get status badge variant
	const getStatusBadgeVariant = (status: ComplaintStatus) => {
		switch (status) {
			case "open":
				return "destructive"
			case "in-progress":
				return "default"
			case "resolved":
				return "secondary"
			case "closed":
				return "outline"
			default:
				return "secondary"
		}
	}

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Complaint Management</h2>
				</div>

				<Tabs defaultValue="all" className="space-y-4">
					<div className="flex items-center justify-between">
						<TabsList>
							<TabsTrigger value="all">All Complaints</TabsTrigger>
							<TabsTrigger value="open">Open</TabsTrigger>
							<TabsTrigger value="in-progress">In Progress</TabsTrigger>
							<TabsTrigger value="resolved">Resolved</TabsTrigger>
							<TabsTrigger value="closed">Closed</TabsTrigger>
						</TabsList>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="flex w-full md:w-auto items-center space-x-2">
							<div className="relative w-full md:w-[300px]">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search complaints..."
									className="w-full pl-8"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
							<Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
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
							<Select
								value={userTypeFilter}
								onValueChange={(value: "all" | "customer" | "vendor") => setUserTypeFilter(value)}
							>
								<SelectTrigger className="w-[150px]">
									<SelectValue placeholder="User type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Users</SelectItem>
									<SelectItem value="customer">Customers</SelectItem>
									<SelectItem value="vendor">Vendors</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<TabsContent value="all" className="space-y-4">
						<Card>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>ID</ResponsiveTable.Head>
											<ResponsiveTable.Head>Title</ResponsiveTable.Head>
											<ResponsiveTable.Head>User</ResponsiveTable.Head>
											<ResponsiveTable.Head>Category</ResponsiveTable.Head>
											<ResponsiveTable.Head>Status</ResponsiveTable.Head>
											<ResponsiveTable.Head>Created</ResponsiveTable.Head>
											<ResponsiveTable.Head>Updated</ResponsiveTable.Head>
											<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredComplaints.map((complaint) => (
											<ResponsiveTable.Row key={complaint.id}>
												<ResponsiveTable.Cell className="font-medium">{complaint.id}</ResponsiveTable.Cell>

												<ResponsiveTable.Cell>
													<div className="flex items-center space-x-2">
														<Avatar className="h-8 w-8">
															<AvatarImage
																src={
																	complaint.user.avatar ||
																	`/placeholder.svg?height=32&width=32&text=${complaint.user.name.charAt(0)}`
																}
															/>
															<AvatarFallback>{complaint.user.name.charAt(0)}</AvatarFallback>
														</Avatar>
														<div>
															<p className="text-sm font-medium min-w-max">{complaint.user.name}</p>
															<p className="text-xs text-muted-foreground capitalize">{complaint.user.type}</p>
														</div>
													</div>
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{complaint.title}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{complaint.category}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>
													<Badge className="min-w-max" variant={getStatusBadgeVariant(complaint.status)}>
														{complaint.status.replace("-", " ")}
													</Badge>
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{formatDate(complaint.createdAt)}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{formatDate(complaint.updatedAt)}</ResponsiveTable.Cell>
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
															<DropdownMenuItem onClick={() => handleViewComplaint(complaint)}>
																View details
															</DropdownMenuItem>
															<DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, "open")}>
																Mark as Open
															</DropdownMenuItem>
															<DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, "in-progress")}>
																Mark as In Progress
															</DropdownMenuItem>
															<DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, "resolved")}>
																Mark as Resolved
															</DropdownMenuItem>
															<DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, "closed")}>
																Mark as Closed
															</DropdownMenuItem>
														</DropdownMenuContent>
													</DropdownMenu>
												</ResponsiveTable.Cell>
											</ResponsiveTable.Row>
										))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>

					{["open", "in-progress", "resolved", "closed"].map((status) => (
						<TabsContent key={status} value={status} className="space-y-4">
							<Card>
								<CardContent className="p-0">
									<ResponsiveTable>
										<ResponsiveTable.Header>
											<ResponsiveTable.Row>
												<ResponsiveTable.Head>ID</ResponsiveTable.Head>
												<ResponsiveTable.Head>Title</ResponsiveTable.Head>
												<ResponsiveTable.Head>User</ResponsiveTable.Head>
												<ResponsiveTable.Head>Category</ResponsiveTable.Head>
												<ResponsiveTable.Head>Created</ResponsiveTable.Head>
												<ResponsiveTable.Head>Updated</ResponsiveTable.Head>
												<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
											</ResponsiveTable.Row>
										</ResponsiveTable.Header>
										<ResponsiveTable.Body>
											{filteredComplaints
												.filter((complaint) => complaint.status === status)
												.map((complaint) => (
													<ResponsiveTable.Row key={complaint.id}>
														<ResponsiveTable.Cell className="font-medium">{complaint.id}</ResponsiveTable.Cell>
														<ResponsiveTable.Cell>{complaint.title}</ResponsiveTable.Cell>
														<ResponsiveTable.Cell>
															<div className="flex items-center space-x-2">
																<Avatar className="h-8 w-8">
																	<AvatarImage
																		src={
																			complaint.user.avatar ||
																			`/placeholder.svg?height=32&width=32&text=${complaint.user.name.charAt(0)}`
																		}
																	/>
																	<AvatarFallback>{complaint.user.name.charAt(0)}</AvatarFallback>
																</Avatar>
																<div>
																	<p className="text-sm font-medium">{complaint.user.name}</p>
																	<p className="text-xs text-muted-foreground capitalize">{complaint.user.type}</p>
																</div>
															</div>
														</ResponsiveTable.Cell>
														<ResponsiveTable.Cell>{complaint.category}</ResponsiveTable.Cell>
														<ResponsiveTable.Cell>{formatDate(complaint.createdAt)}</ResponsiveTable.Cell>
														<ResponsiveTable.Cell>{formatDate(complaint.updatedAt)}</ResponsiveTable.Cell>
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
																	<DropdownMenuItem onClick={() => handleViewComplaint(complaint)}>
																		View details
																	</DropdownMenuItem>
																	{status !== "open" && (
																		<DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, "open")}>
																			Mark as Open
																		</DropdownMenuItem>
																	)}
																	{status !== "in-progress" && (
																		<DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, "in-progress")}>
																			Mark as In Progress
																		</DropdownMenuItem>
																	)}
																	{status !== "resolved" && (
																		<DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, "resolved")}>
																			Mark as Resolved
																		</DropdownMenuItem>
																	)}
																	{status !== "closed" && (
																		<DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, "closed")}>
																			Mark as Closed
																		</DropdownMenuItem>
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
						</TabsContent>
					))}
				</Tabs>
			</div>

			{/* Complaint Detail Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
					{selectedComplaint && (
						<>
							<DialogHeader>
								<DialogTitle className="flex items-center justify-between">
									<span>{selectedComplaint.title}</span>
									<Badge variant={getStatusBadgeVariant(selectedComplaint.status)}>
										{selectedComplaint.status.replace("-", " ")}
									</Badge>
								</DialogTitle>
								<DialogDescription>
									{selectedComplaint.id} - {selectedComplaint.category}
								</DialogDescription>
							</DialogHeader>

							<div className="space-y-6">
								<div className="flex items-center space-x-4">
									<Avatar className="h-10 w-10">
										<AvatarImage
											src={
												selectedComplaint.user.avatar ||
												`/placeholder.svg?height=40&width=40&text=${selectedComplaint.user.name.charAt(0)}`
											}
										/>
										<AvatarFallback>{selectedComplaint.user.name.charAt(0)}</AvatarFallback>
									</Avatar>
									<div>
										<h4 className="font-medium">{selectedComplaint.user.name}</h4>
										<div className="text-sm text-muted-foreground">
											<p>{selectedComplaint.user.email}</p>
											<p>{selectedComplaint.user.phone}</p>
										</div>
									</div>
									<Badge variant="outline" className="ml-auto capitalize">
										{selectedComplaint.user.type}
									</Badge>
								</div>

								<div>
									<h4 className="font-medium mb-2">Description</h4>
									<p className="text-sm">{selectedComplaint.description}</p>
								</div>

								<div>
									<div className="flex items-center justify-between mb-2">
										<h4 className="font-medium">Conversation</h4>
										<div className="text-sm text-muted-foreground">
											{selectedComplaint.assignedTo && <span>Assigned to: {selectedComplaint.assignedTo}</span>}
										</div>
									</div>

									<div className="space-y-4 max-h-[300px] overflow-y-auto border rounded-md p-4">
										{selectedComplaint.responses?.map((response) => (
											<div key={response.id} className={`flex ${response.isAdmin ? "justify-end" : "justify-start"}`}>
												<div
													className={`max-w-[80%] rounded-lg p-3 ${response.isAdmin ? "bg-primary text-primary-foreground" : "bg-muted"
														}`}
												>
													<p className="text-sm">{response.text}</p>
													<p className="text-xs mt-1 opacity-70">{formatDate(response.createdAt)}</p>
												</div>
											</div>
										))}
									</div>
								</div>

								<div>
									<Label htmlFor="response">Add Response</Label>
									<Textarea
										id="response"
										placeholder="Type your response here..."
										className="mt-2"
										value={newResponse}
										onChange={(e) => setNewResponse(e.target.value)}
									/>
								</div>

								<div className="flex justify-between">
									<div className="space-x-2">
										<Select
											value={selectedComplaint.status}
											onValueChange={(value: ComplaintStatus) => handleUpdateStatus(selectedComplaint.id, value)}
										>
											<SelectTrigger className="w-[200px]">
												<SelectValue placeholder="Update status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="open">Open</SelectItem>
												<SelectItem value="in-progress">In Progress</SelectItem>
												<SelectItem value="resolved">Resolved</SelectItem>
												<SelectItem value="closed">Closed</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<Button onClick={handleAddResponse} disabled={!newResponse.trim()}>
										Send Response
									</Button>
								</div>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</AdminLayout>
	)
}

