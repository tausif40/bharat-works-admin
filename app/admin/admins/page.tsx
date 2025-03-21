"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Check, X, Eye, EyeOff } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveTable } from "@/components/responsive-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define types for our data structure
type Admin = {
	id: string
	name: string
	email: string
	mobile: string
	password: string
	access: string
	status: "active" | "inactive"
	createdAt: string
	lastLogin?: string
}

export default function AdminsPage() {
	// Sample admin data
	const [admins, setAdmins] = useState<Admin[]>([
		{
			id: "1",
			name: "Rajesh Kumar",
			email: "rajesh.kumar@bharatworks.com",
			mobile: "+91 98765 43210",
			password: "password123",
			status: "active",
			access: "active",
			createdAt: "2023-01-15",
			lastLogin: "2023-09-20T10:30:00",
		},
		{
			id: "2",
			name: "Priya Sharma",
			email: "priya.sharma@bharatworks.com",
			mobile: "+91 87654 32109",
			password: "securepass456",
			status: "active",
			access: "active",
			createdAt: "2023-03-22",
			lastLogin: "2023-09-19T14:45:00",
		},
		{
			id: "3",
			name: "Vikram Singh",
			email: "vikram.singh@bharatworks.com",
			mobile: "+91 76543 21098",
			password: "vikram2023",
			status: "inactive",
			access: "inactive",
			createdAt: "2023-05-10",
			lastLogin: "2023-08-05T09:15:00",
		},
	])

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
	const [showPassword, setShowPassword] = useState(false)

	// Initialize a new admin
	const initNewAdmin = (): Admin => ({
		id: (admins.length + 1).toString(),
		name: "",
		email: "",
		mobile: "",
		password: "",
		access: "",
		status: "active",
		createdAt: new Date().toISOString().split("T")[0],
	})

	// Handle creating a new admin
	const handleCreateAdmin = () => {
		setCurrentAdmin(initNewAdmin())
		setIsEditing(false)
		setIsDialogOpen(true)
		setShowPassword(false)
	}

	// Handle editing an admin
	const handleEditAdmin = (admin: Admin) => {
		setCurrentAdmin({ ...admin })
		setIsEditing(true)
		setIsDialogOpen(true)
		setShowPassword(false)
	}

	// Handle saving an admin (create or update)
	const handleSaveAdmin = () => {
		if (!currentAdmin) return

		if (isEditing) {
			// Update existing admin
			setAdmins(admins.map((a) => (a.id === currentAdmin.id ? currentAdmin : a)))
		} else {
			// Create new admin
			setAdmins([...admins, currentAdmin])
		}

		setIsDialogOpen(false)
		setCurrentAdmin(null)
	}

	// Handle deleting an admin
	const handleDeleteAdmin = (id: string) => {
		setAdmins(admins.filter((a) => a.id !== id))
	}

	// Handle toggling admin status
	const handleToggleStatus = (id: string) => {
		setAdmins(
			admins.map((a) => {
				if (a.id === id) {
					return { ...a, status: a.status === "active" ? "inactive" : "active" }
				}
				return a
			}),
		)
	}

	// Filter admins based on search term and status filter
	const filteredAdmins = admins.filter((admin) => {
		const matchesSearch =
			admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			admin.mobile.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesStatus = statusFilter === "all" || admin.status === statusFilter

		return matchesSearch && matchesStatus
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
	const formatDateTime = (dateString?: string) => {
		if (!dateString) return "Never"

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
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Admin Management</h2>
					<Button onClick={handleCreateAdmin}>
						<Plus className="mr-2 h-4 w-4" />
						Create Admin
					</Button>
				</div>

				<Tabs defaultValue="all" className="space-y-4">
					<div className="flex items-center justify-between">
						<TabsList>
							<TabsTrigger value="all">All Admins</TabsTrigger>
							<TabsTrigger value="active">Active</TabsTrigger>
							<TabsTrigger value="inactive">Inactive</TabsTrigger>
						</TabsList>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="relative w-full md:w-[300px]">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search admins..."
								className="w-full pl-8"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					<TabsContent value="all" className="space-y-4">
						<Card>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>Name</ResponsiveTable.Head>
											<ResponsiveTable.Head>Email</ResponsiveTable.Head>
											<ResponsiveTable.Head>Mobile</ResponsiveTable.Head>
											<ResponsiveTable.Head>Created</ResponsiveTable.Head>
											<ResponsiveTable.Head>Last Login</ResponsiveTable.Head>
											<ResponsiveTable.Head>Status</ResponsiveTable.Head>
											<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredAdmins.map((admin) => (
											<ResponsiveTable.Row key={admin.id}>
												<ResponsiveTable.Cell>
													<div className="flex items-center space-x-2">
														<Avatar className="h-8 w-8">
															<AvatarImage src={`/placeholder.svg?height=32&width=32&text=${admin.name.charAt(0)}`} />
															<AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
														</Avatar>
														<span className="font-medium">{admin.name}</span>
													</div>
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{admin.email}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{admin.mobile}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{formatDate(admin.createdAt)}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{formatDateTime(admin.lastLogin)}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>
													<Badge variant={admin.status === "active" ? "default" : "secondary"}>{admin.status}</Badge>
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell className="text-right">
													<div className="flex justify-end space-x-2">
														<Button
															variant="outline"
															size="icon"
															onClick={() => handleToggleStatus(admin.id)}
															title={admin.status === "active" ? "Deactivate" : "Activate"}
														>
															{admin.status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
														</Button>
														<Button variant="outline" size="icon" onClick={() => handleEditAdmin(admin)} title="Edit">
															<Edit className="h-4 w-4" />
														</Button>
														<Button
															variant="outline"
															size="icon"
															onClick={() => handleDeleteAdmin(admin.id)}
															title="Delete"
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</ResponsiveTable.Cell>
											</ResponsiveTable.Row>
										))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="active" className="space-y-4">
						<Card>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>Name</ResponsiveTable.Head>
											<ResponsiveTable.Head>Email</ResponsiveTable.Head>
											<ResponsiveTable.Head>Mobile</ResponsiveTable.Head>
											<ResponsiveTable.Head>Created</ResponsiveTable.Head>
											<ResponsiveTable.Head>Last Login</ResponsiveTable.Head>
											<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredAdmins
											.filter((admin) => admin.status === "active")
											.map((admin) => (
												<ResponsiveTable.Row key={admin.id}>
													<ResponsiveTable.Cell>
														<div className="flex items-center space-x-2">
															<Avatar className="h-8 w-8">
																<AvatarImage src={`/placeholder.svg?height=32&width=32&text=${admin.name.charAt(0)}`} />
																<AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
															</Avatar>
															<span className="font-medium">{admin.name}</span>
														</div>
													</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{admin.email}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{admin.mobile}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{formatDate(admin.createdAt)}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{formatDateTime(admin.lastLogin)}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell className="text-right">
														<div className="flex justify-end space-x-2">
															<Button
																variant="outline"
																size="icon"
																onClick={() => handleToggleStatus(admin.id)}
																title="Deactivate"
															>
																<X className="h-4 w-4" />
															</Button>
															<Button variant="outline" size="icon" onClick={() => handleEditAdmin(admin)} title="Edit">
																<Edit className="h-4 w-4" />
															</Button>
															<Button
																variant="outline"
																size="icon"
																onClick={() => handleDeleteAdmin(admin.id)}
																title="Delete"
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</ResponsiveTable.Cell>
												</ResponsiveTable.Row>
											))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="inactive" className="space-y-4">
						<Card>
							<CardContent className="p-0">
								<ResponsiveTable>
									<ResponsiveTable.Header>
										<ResponsiveTable.Row>
											<ResponsiveTable.Head>Name</ResponsiveTable.Head>
											<ResponsiveTable.Head>Email</ResponsiveTable.Head>
											<ResponsiveTable.Head>Mobile</ResponsiveTable.Head>
											<ResponsiveTable.Head>Created</ResponsiveTable.Head>
											<ResponsiveTable.Head>Last Login</ResponsiveTable.Head>
											<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredAdmins
											.filter((admin) => admin.status === "inactive")
											.map((admin) => (
												<ResponsiveTable.Row key={admin.id}>
													<ResponsiveTable.Cell>
														<div className="flex items-center space-x-2">
															<Avatar className="h-8 w-8">
																<AvatarImage src={`/placeholder.svg?height=32&width=32&text=${admin.name.charAt(0)}`} />
																<AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
															</Avatar>
															<span className="font-medium">{admin.name}</span>
														</div>
													</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{admin.email}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{admin.mobile}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{formatDate(admin.createdAt)}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell>{formatDateTime(admin.lastLogin)}</ResponsiveTable.Cell>
													<ResponsiveTable.Cell className="text-right">
														<div className="flex justify-end space-x-2">
															<Button
																variant="outline"
																size="icon"
																onClick={() => handleToggleStatus(admin.id)}
																title="Activate"
															>
																<Check className="h-4 w-4" />
															</Button>
															<Button variant="outline" size="icon" onClick={() => handleEditAdmin(admin)} title="Edit">
																<Edit className="h-4 w-4" />
															</Button>
															<Button
																variant="outline"
																size="icon"
																onClick={() => handleDeleteAdmin(admin.id)}
																title="Delete"
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</ResponsiveTable.Cell>
												</ResponsiveTable.Row>
											))}
									</ResponsiveTable.Body>
								</ResponsiveTable>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			{/* Admin Create/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>{isEditing ? "Edit Admin" : "Create New Admin"}</DialogTitle>
						<DialogDescription>
							{isEditing ? "Update the admin details below." : "Fill in the details to create a new admin."}
						</DialogDescription>
					</DialogHeader>

					{currentAdmin && (
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									value={currentAdmin.name}
									onChange={(e) => setCurrentAdmin({ ...currentAdmin, name: e.target.value })}
									className="col-span-3"
									placeholder="Full Name"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="email" className="text-right">
									Email
								</Label>
								<Input
									id="email"
									type="email"
									value={currentAdmin.email}
									onChange={(e) => setCurrentAdmin({ ...currentAdmin, email: e.target.value })}
									className="col-span-3"
									placeholder="email@example.com"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="mobile" className="text-right">
									Mobile
								</Label>
								<Input
									id="mobile"
									value={currentAdmin.mobile}
									onChange={(e) => setCurrentAdmin({ ...currentAdmin, mobile: e.target.value })}
									className="col-span-3"
									placeholder="+91 98765 43210"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="password" className="text-right">
									Password
								</Label>
								<div className="col-span-3 relative">
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										value={currentAdmin.password}
										onChange={(e) => setCurrentAdmin({ ...currentAdmin, password: e.target.value })}
										className="pr-10"
										placeholder="Enter password"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
									</Button>
								</div>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="status" className="text-right">
									Access
								</Label>
								<Select
									value={currentAdmin.access}
									onValueChange={(value: "active" | "inactive") =>
										setCurrentAdmin({
											...currentAdmin,
											access: value,
										})
									}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="dashboard">Dashboard</SelectItem>
										<SelectItem value="customer">Customer</SelectItem>
										<SelectItem value="vender">vender</SelectItem>
										<SelectItem value="jobRequests">Job Requests</SelectItem>
										<SelectItem value="coupons">Coupons</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="status" className="text-right">
									Status
								</Label>
								<Select
									value={currentAdmin.status}
									onValueChange={(value: "active" | "inactive") =>
										setCurrentAdmin({
											...currentAdmin,
											status: value,
										})
									}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="inactive">Inactive</SelectItem>
									</SelectContent>
								</Select>
							</div>

						</div>
					)}

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSaveAdmin}>{isEditing ? "Update Admin" : "Create Admin"}</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	)
}