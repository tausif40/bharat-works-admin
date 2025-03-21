"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Settings, ArrowRight } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ResponsiveTable } from "@/components/responsive-table"
import Link from "next/link"

// Define types for our data structure
type LocationCommission = {
	location: string
	commissionPercentage: number
}

type Category = {
	id: string
	name: string
	description: string
	status: "active" | "inactive"
	baseCommission: number
	locationCommissions: LocationCommission[]
	subcategories: number
	questions: number
}

export default function CategoriesPage() {
	// Sample category data
	const [categories, setCategories] = useState<Category[]>([
		{
			id: "1",
			name: "Photographer",
			description: "Professional photography services for events and occasions",
			status: "active",
			baseCommission: 10,
			locationCommissions: [
				{ location: "Mumbai", commissionPercentage: 12 },
				{ location: "Delhi", commissionPercentage: 11 },
			],
			subcategories: 5,
			questions: 12,
		},
		{
			id: "2",
			name: "Electrician",
			description: "Electrical repair and installation services",
			status: "active",
			baseCommission: 8,
			locationCommissions: [{ location: "Bangalore", commissionPercentage: 9 }],
			subcategories: 3,
			questions: 8,
		},
		{
			id: "3",
			name: "Plumber",
			description: "Plumbing repair and installation services",
			status: "active",
			baseCommission: 8,
			locationCommissions: [],
			subcategories: 4,
			questions: 10,
		},
		{
			id: "4",
			name: "Carpenter",
			description: "Furniture repair and woodworking services",
			status: "inactive",
			baseCommission: 9,
			locationCommissions: [{ location: "Chennai", commissionPercentage: 10 }],
			subcategories: 6,
			questions: 15,
		},
		{
			id: "5",
			name: "Cleaner",
			description: "Home and office cleaning services",
			status: "active",
			baseCommission: 7,
			locationCommissions: [],
			subcategories: 2,
			questions: 6,
		},
	])

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isCommissionDialogOpen, setIsCommissionDialogOpen] = useState(false)
	const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const [statusFilter, setStatusFilter] = useState<string>("all")

	// New location commission field
	const [newLocationCommission, setNewLocationCommission] = useState({ location: "", commissionPercentage: 0 })

	// Initialize a new category
	const initNewCategory = (): Category => ({
		id: (categories.length + 1).toString(),
		name: "",
		description: "",
		status: "inactive",
		baseCommission: 0,
		locationCommissions: [],
		subcategories: 0,
		questions: 0,
	})

	// Handle creating a new category
	const handleCreateCategory = () => {
		setCurrentCategory(initNewCategory())
		setIsEditing(false)
		setIsDialogOpen(true)
	}

	// Handle editing a category
	const handleEditCategory = (category: Category) => {
		setCurrentCategory({ ...category })
		setIsEditing(true)
		setIsDialogOpen(true)
	}

	// Handle opening commission dialog
	const handleOpenCommissionDialog = (category: Category) => {
		setCurrentCategory({ ...category })
		setIsCommissionDialogOpen(true)
	}

	// Handle saving a category (create or update)
	const handleSaveCategory = () => {
		if (!currentCategory) return

		if (isEditing) {
			// Update existing category
			setCategories(categories.map((c) => (c.id === currentCategory.id ? currentCategory : c)))
		} else {
			// Create new category
			setCategories([...categories, currentCategory])
		}

		setIsDialogOpen(false)
		setCurrentCategory(null)
	}

	// Handle saving commission changes
	const handleSaveCommission = () => {
		if (!currentCategory) return

		setCategories(categories.map((c) => (c.id === currentCategory.id ? currentCategory : c)))
		setIsCommissionDialogOpen(false)
		setCurrentCategory(null)
	}

	// Handle deleting a category
	const handleDeleteCategory = (id: string) => {
		setCategories(categories.filter((c) => c.id !== id))
	}

	// Handle toggling category status
	const handleToggleStatus = (id: string) => {
		setCategories(
			categories.map((c) => {
				if (c.id === id) {
					return { ...c, status: c.status === "active" ? "inactive" : "active" }
				}
				return c
			}),
		)
	}

	// Handle adding a new location commission
	const handleAddLocationCommission = () => {
		if (!currentCategory || !newLocationCommission.location || newLocationCommission.commissionPercentage <= 0) return

		setCurrentCategory({
			...currentCategory,
			locationCommissions: [...currentCategory.locationCommissions, { ...newLocationCommission }],
		})

		setNewLocationCommission({ location: "", commissionPercentage: 0 })
	}

	// Handle removing a location commission
	const handleRemoveLocationCommission = (location: string) => {
		if (!currentCategory) return

		setCurrentCategory({
			...currentCategory,
			locationCommissions: currentCategory.locationCommissions.filter((lc) => lc.location !== location),
		})
	}

	// Filter categories based on search term and status filter
	const filteredCategories = categories.filter((category) => {
		const matchesSearch =
			category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			category.description.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesStatus = statusFilter === "all" || category.status === statusFilter

		return matchesSearch && matchesStatus
	})

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Add Commission</h2>
					<Button onClick={handleCreateCategory}>
						<Plus className="mr-2 h-4 w-4" />
						Add new commission
					</Button>
				</div>

				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex w-full md:w-auto items-center space-x-2">
						<div className="relative w-full md:w-[300px]">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search categories..."
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
							</SelectContent>
						</Select>
					</div>
				</div>

				<Card>
					<CardContent className="p-0">
						<ResponsiveTable>
							<ResponsiveTable.Header>
								<ResponsiveTable.Row>
									<ResponsiveTable.Head>Category Name

									</ResponsiveTable.Head>
									<ResponsiveTable.Head>Description</ResponsiveTable.Head>
									<ResponsiveTable.Head>Base Commission</ResponsiveTable.Head>
									{/* <ResponsiveTable.Head>Location Commissions</ResponsiveTable.Head> */}
									<ResponsiveTable.Head>Subcategories</ResponsiveTable.Head>
									<ResponsiveTable.Head>Questions</ResponsiveTable.Head>
									<ResponsiveTable.Head>Status</ResponsiveTable.Head>
									<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
								</ResponsiveTable.Row>
							</ResponsiveTable.Header>
							<ResponsiveTable.Body>
								{filteredCategories.map((category) => (
									<ResponsiveTable.Row key={category.id}>
										<ResponsiveTable.Cell>
											<Link
												href={`/admin/commission/${category.id}`}
												className="font-medium hover:underline flex items-center"
											>
												{category.name}
												<ArrowRight className="ml-1 h-4 w-4 opacity-50" />
											</Link>
										</ResponsiveTable.Cell>
										<ResponsiveTable.Cell>{category.description}</ResponsiveTable.Cell>
										<ResponsiveTable.Cell>{category.baseCommission}%</ResponsiveTable.Cell>
										{/* <ResponsiveTable.Cell>
											{category.locationCommissions.length > 0 ? (
												<div className="text-sm">
													{category.locationCommissions.map((lc) => (
														<div key={lc.location}>
															{lc.location}: {lc.commissionPercentage}%
														</div>
													))}
												</div>
											) : (
												<span className="text-muted-foreground">No location-specific commissions</span>
											)}
										</ResponsiveTable.Cell> */}
										<ResponsiveTable.Cell>{category.subcategories}</ResponsiveTable.Cell>
										<ResponsiveTable.Cell>{category.questions}</ResponsiveTable.Cell>
										<ResponsiveTable.Cell>
											<Badge variant={category.status === "active" ? "default" : "secondary"}>{category.status}</Badge>
										</ResponsiveTable.Cell>
										<ResponsiveTable.Cell className="text-right">
											<div className="flex justify-end space-x-2">
												<Button
													variant="outline"
													size="icon"
													onClick={() => handleOpenCommissionDialog(category)}
													title="Manage Commissions"
												>
													<Settings className="h-4 w-4" />
												</Button>
												<Button
													variant="outline"
													size="icon"
													onClick={() => handleToggleStatus(category.id)}
													title={category.status === "active" ? "Deactivate" : "Activate"}
												>
													{category.status === "active" ? (
														<Badge variant="destructive" className="h-2 w-2 p-0" />
													) : (
														<Badge variant="default" className="h-2 w-2 p-0" />
													)}
												</Button>
												<Button variant="outline" size="icon" onClick={() => handleEditCategory(category)} title="Edit">
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="outline"
													size="icon"
													onClick={() => handleDeleteCategory(category.id)}
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
			</div>

			{/* Category Create/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>{isEditing ? "Edit Category" : "Create New Category"}</DialogTitle>
						<DialogDescription>
							{isEditing ? "Update the category details below." : "Fill in the details to create a new category."}
						</DialogDescription>
					</DialogHeader>

					{currentCategory && (
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Category Name
								</Label>
								{/* <Input
									id="name"
									value={currentCategory.name}
									onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
									className="col-span-3"
								/> */}
								<Select>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Category Name" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="10">Photographer</SelectItem>
										<SelectItem value="20">Electrician</SelectItem>
										<SelectItem value="50">Plumber</SelectItem>
										<SelectItem value="100">Carpenter</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="description" className="text-right">
									Description
								</Label>
								<Textarea
									id="description"
									value={currentCategory.description}
									onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="baseCommission" className="text-right">
									Base Commission (%)
								</Label>
								<Input
									id="baseCommission"
									type="number"
									value={currentCategory.baseCommission}
									onChange={(e) => setCurrentCategory({ ...currentCategory, baseCommission: Number(e.target.value) })}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Commission to
								</Label>
								<Select>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Commission to" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="50">Both</SelectItem>
										<SelectItem value="10">Vender</SelectItem>
										<SelectItem value="20">Customer</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="status" className="text-right">
									Status
								</Label>
								<div className="flex items-center space-x-2 col-span-3">
									<Switch
										id="status"
										checked={currentCategory.status === "active"}
										onCheckedChange={(checked) =>
											setCurrentCategory({
												...currentCategory,
												status: checked ? "active" : "inactive",
											})
										}
									/>
									<Label htmlFor="status">{currentCategory.status === "active" ? "Active" : "Inactive"}</Label>
								</div>
							</div>
						</div>
					)}

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSaveCategory}>{isEditing ? "Update Category" : "Create Category"}</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Commission Management Dialog */}
			<Dialog open={isCommissionDialogOpen} onOpenChange={setIsCommissionDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Manage Commissions for {currentCategory?.name}</DialogTitle>
						<DialogDescription>Set the base commission and location-specific commission rates.</DialogDescription>
					</DialogHeader>

					{currentCategory && (
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="baseCommission" className="text-right">
									Base Commission (%)
								</Label>
								<Input
									id="baseCommission"
									type="number"
									value={currentCategory.baseCommission}
									onChange={(e) => setCurrentCategory({ ...currentCategory, baseCommission: Number(e.target.value) })}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-start gap-4">
								<Label className="text-right pt-2">Location-specific Commissions</Label>
								<div className="col-span-3 space-y-4">
									{currentCategory.locationCommissions.map((lc, index) => (
										<div key={index} className="flex items-center space-x-2">
											<Input
												value={lc.location}
												onChange={(e) => {
													const updatedCommissions = [...currentCategory.locationCommissions]
													updatedCommissions[index].location = e.target.value
													setCurrentCategory({ ...currentCategory, locationCommissions: updatedCommissions })
												}}
												placeholder="Location"
												className="flex-1"
											/>
											<Input
												type="number"
												value={lc.commissionPercentage}
												onChange={(e) => {
													const updatedCommissions = [...currentCategory.locationCommissions]
													updatedCommissions[index].commissionPercentage = Number(e.target.value)
													setCurrentCategory({ ...currentCategory, locationCommissions: updatedCommissions })
												}}
												placeholder="Commission %"
												className="w-24"
											/>
											<Button variant="ghost" size="icon" onClick={() => handleRemoveLocationCommission(lc.location)}>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									))}

									<div className="flex items-center space-x-2">
										<Input
											value={newLocationCommission.location}
											onChange={(e) => setNewLocationCommission({ ...newLocationCommission, location: e.target.value })}
											placeholder="Add location"
											className="flex-1"
										/>
										<Input
											type="number"
											value={newLocationCommission.commissionPercentage || ""}
											onChange={(e) =>
												setNewLocationCommission({
													...newLocationCommission,
													commissionPercentage: Number(e.target.value),
												})
											}
											placeholder="Commission %"
											className="w-24"
										/>
										<Button variant="outline" size="icon" onClick={handleAddLocationCommission}>
											<Plus className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsCommissionDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSaveCommission}>Save Commission Changes</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	)
}

