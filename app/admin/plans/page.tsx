"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Check, X } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define types for our data structure
type CommissionStructure = {
	noCommissionFirstXTasks: number | null
	noCommissionForBidding: number | null
	noCommissionUpToXRupees: number | null
	priorityTaskNotification: "enabled" | "disabled" | "premium" | "emergency" | "direct"
}

type LocationPricing = {
	location: string
	price: number
}

type Plan = {
	id: string
	name: string
	description: string
	category: string
	basePrice: number
	locationPricing: LocationPricing[]
	commissionStructure: CommissionStructure
	status: "active" | "inactive"
	createdAt: string
}

export default function PlansPage() {
	// Sample plan data
	const [plans, setPlans] = useState<Plan[]>([
		{
			id: "1",
			name: "Basic Photography Plan",
			description: "Entry-level plan for photographers with essential features",
			category: "Photographer",
			basePrice: 999,
			locationPricing: [
				{ location: "Mumbai", price: 1299 },
				{ location: "Delhi", price: 1199 },
				{ location: "Bangalore", price: 1099 },
			],
			commissionStructure: {
				noCommissionFirstXTasks: 3,
				noCommissionForBidding: 5,
				noCommissionUpToXRupees: 500,
				priorityTaskNotification: "disabled",
			},
			status: "active",
			createdAt: "2023-08-15",
		},
		{
			id: "2",
			name: "Premium Carpenter Plan",
			description: "Advanced plan for carpenters with premium features",
			category: "Carpenter",
			basePrice: 1499,
			locationPricing: [
				{ location: "Mumbai", price: 1799 },
				{ location: "Delhi", price: 1699 },
				{ location: "Bangalore", price: 1599 },
			],
			commissionStructure: {
				noCommissionFirstXTasks: 5,
				noCommissionForBidding: 10,
				noCommissionUpToXRupees: 1000,
				priorityTaskNotification: "enabled",
			},
			status: "active",
			createdAt: "2023-09-10",
		},
		{
			id: "3",
			name: "Standard Electrician Plan",
			description: "Standard plan for electricians with balanced features",
			category: "Electrician",
			basePrice: 1299,
			locationPricing: [
				{ location: "Mumbai", price: 1599 },
				{ location: "Delhi", price: 1499 },
				{ location: "Bangalore", price: 1399 },
			],
			commissionStructure: {
				noCommissionFirstXTasks: 2,
				noCommissionForBidding: 3,
				noCommissionUpToXRupees: 750,
				priorityTaskNotification: "premium",
			},
			status: "inactive",
			createdAt: "2023-07-22",
		},
	])

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const [filterCategory, setFilterCategory] = useState<string | null>(null)
	const [filterStatus, setFilterStatus] = useState<string | null>(null)

	// New location pricing field
	const [newLocation, setNewLocation] = useState({ location: "", price: 0 })

	// Initialize a new plan
	const initNewPlan = (): Plan => ({
		id: (plans.length + 1).toString(),
		name: "",
		description: "",
		category: "",
		basePrice: 0,
		locationPricing: [],
		commissionStructure: {
			noCommissionFirstXTasks: null,
			noCommissionForBidding: null,
			noCommissionUpToXRupees: null,
			priorityTaskNotification: "disabled",
		},
		status: "inactive",
		createdAt: new Date().toISOString().split("T")[0],
	})

	// Handle creating a new plan
	const handleCreatePlan = () => {
		setCurrentPlan(initNewPlan())
		setIsEditing(false)
		setIsDialogOpen(true)
	}

	// Handle editing a plan
	const handleEditPlan = (plan: Plan) => {
		setCurrentPlan({ ...plan })
		setIsEditing(true)
		setIsDialogOpen(true)
	}

	// Handle saving a plan (create or update)
	const handleSavePlan = () => {
		if (!currentPlan) return

		if (isEditing) {
			// Update existing plan
			setPlans(plans.map((p) => (p.id === currentPlan.id ? currentPlan : p)))
		} else {
			// Create new plan
			setPlans([...plans, currentPlan])
		}

		setIsDialogOpen(false)
		setCurrentPlan(null)
	}

	// Handle deleting a plan
	const handleDeletePlan = (id: string) => {
		setPlans(plans.filter((p) => p.id !== id))
	}

	// Handle toggling plan status
	const handleToggleStatus = (id: string) => {
		setPlans(
			plans.map((p) => {
				if (p.id === id) {
					return { ...p, status: p.status === "active" ? "inactive" : "active" }
				}
				return p
			}),
		)
	}

	// Handle adding a new location pricing
	const handleAddLocationPricing = () => {
		if (!currentPlan || !newLocation.location || newLocation.price <= 0) return

		setCurrentPlan({
			...currentPlan,
			locationPricing: [...currentPlan.locationPricing, { ...newLocation }],
		})

		setNewLocation({ location: "", price: 0 })
	}

	// Handle removing a location pricing
	const handleRemoveLocationPricing = (location: string) => {
		if (!currentPlan) return

		setCurrentPlan({
			...currentPlan,
			locationPricing: currentPlan.locationPricing.filter((lp) => lp.location !== location),
		})
	}

	// Filter plans based on search term and filters
	const filteredPlans = plans.filter((plan) => {
		const matchesSearch =
			plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			plan.category.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesCategory = !filterCategory || plan.category === filterCategory
		const matchesStatus = !filterStatus || plan.status === filterStatus

		return matchesSearch && matchesCategory && matchesStatus
	})

	// Get unique categories for filter
	const categories = Array.from(new Set(plans.map((p) => p.category)))

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Plan Management</h2>
					<Button onClick={handleCreatePlan}>
						<Plus className="mr-2 h-4 w-4" />
						Create Plan
					</Button>
				</div>

				<Tabs defaultValue="all" className="space-y-4">
					<div className="flex items-center justify-between">
						<TabsList>
							<TabsTrigger value="all">All Plans</TabsTrigger>
							<TabsTrigger value="active">Active</TabsTrigger>
							<TabsTrigger value="inactive">Inactive</TabsTrigger>
						</TabsList>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="flex w-full md:w-auto items-center space-x-2">
							<div className="relative w-full md:w-[300px]">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search plans..."
									className="w-full pl-8"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
							<Select
								value={filterCategory || "all"}
								onValueChange={(value) => setFilterCategory(value === "all" ? null : value)}
							>
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
						</div>
					</div>

					<TabsContent value="all" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{filteredPlans.map((plan) => (
								<Card key={plan.id}>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
										<Badge variant={plan.status === "active" ? "default" : "secondary"}>{plan.status}</Badge>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="font-medium">Category:</span>
												<span>{plan.category}</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">Base Price:</span>
												<span>₹{plan.basePrice}</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">No Commission (First):</span>
												<span>{plan.commissionStructure.noCommissionFirstXTasks || 0} Tasks</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">No Commission (Bidding):</span>
												<span>{plan.commissionStructure.noCommissionForBidding || 0} Bids</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">No Commission (Up to):</span>
												<span>₹{plan.commissionStructure.noCommissionUpToXRupees || 0}</span>
											</div>
											<div className="flex justify-between">
												<span className="font-medium">Priority Notification:</span>
												<span className="capitalize">{plan.commissionStructure.priorityTaskNotification}</span>
											</div>
										</div>

										<div className="mt-4">
											<p className="font-medium mb-2">Location Pricing:</p>
											<div className="space-y-1">
												{plan.locationPricing.map((lp) => (
													<div key={lp.location} className="flex justify-between text-sm">
														<span>{lp.location}:</span>
														<span>₹{lp.price}</span>
													</div>
												))}
											</div>
										</div>
									</CardContent>
									<div className="flex justify-end p-4 pt-0 space-x-2">
										<Button variant="outline" size="icon" onClick={() => handleToggleStatus(plan.id)}>
											{plan.status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
										</Button>
										<Button variant="outline" size="icon" onClick={() => handleEditPlan(plan)}>
											<Edit className="h-4 w-4" />
										</Button>
										<Button variant="outline" size="icon" onClick={() => handleDeletePlan(plan.id)}>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value="active" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{filteredPlans
								.filter((plan) => plan.status === "active")
								.map((plan) => (
									<Card key={plan.id}>
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
											<Badge variant="default">{plan.status}</Badge>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="font-medium">Category:</span>
													<span>{plan.category}</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">Base Price:</span>
													<span>₹{plan.basePrice}</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">No Commission (First):</span>
													<span>{plan.commissionStructure.noCommissionFirstXTasks || 0} Tasks</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">No Commission (Bidding):</span>
													<span>{plan.commissionStructure.noCommissionForBidding || 0} Bids</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">No Commission (Up to):</span>
													<span>₹{plan.commissionStructure.noCommissionUpToXRupees || 0}</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">Priority Notification:</span>
													<span className="capitalize">{plan.commissionStructure.priorityTaskNotification}</span>
												</div>
											</div>

											<div className="mt-4">
												<p className="font-medium mb-2">Location Pricing:</p>
												<div className="space-y-1">
													{plan.locationPricing.map((lp) => (
														<div key={lp.location} className="flex justify-between text-sm">
															<span>{lp.location}:</span>
															<span>₹{lp.price}</span>
														</div>
													))}
												</div>
											</div>
										</CardContent>
										<div className="flex justify-end p-4 pt-0 space-x-2">
											<Button variant="outline" size="icon" onClick={() => handleToggleStatus(plan.id)}>
												<X className="h-4 w-4" />
											</Button>
											<Button variant="outline" size="icon" onClick={() => handleEditPlan(plan)}>
												<Edit className="h-4 w-4" />
											</Button>
											<Button variant="outline" size="icon" onClick={() => handleDeletePlan(plan.id)}>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</Card>
								))}
						</div>
					</TabsContent>

					<TabsContent value="inactive" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{filteredPlans
								.filter((plan) => plan.status === "inactive")
								.map((plan) => (
									<Card key={plan.id}>
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
											<Badge variant="secondary">{plan.status}</Badge>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

											<div className="space-y-2">
												<div className="flex justify-between">
													<span className="font-medium">Category:</span>
													<span>{plan.category}</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">Base Price:</span>
													<span>₹{plan.basePrice}</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">No Commission (First):</span>
													<span>{plan.commissionStructure.noCommissionFirstXTasks || 0} Tasks</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">No Commission (Bidding):</span>
													<span>{plan.commissionStructure.noCommissionForBidding || 0} Bids</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">No Commission (Up to):</span>
													<span>₹{plan.commissionStructure.noCommissionUpToXRupees || 0}</span>
												</div>
												<div className="flex justify-between">
													<span className="font-medium">Priority Notification:</span>
													<span className="capitalize">{plan.commissionStructure.priorityTaskNotification}</span>
												</div>
											</div>

											<div className="mt-4">
												<p className="font-medium mb-2">Location Pricing:</p>
												<div className="space-y-1">
													{plan.locationPricing.map((lp) => (
														<div key={lp.location} className="flex justify-between text-sm">
															<span>{lp.location}:</span>
															<span>₹{lp.price}</span>
														</div>
													))}
												</div>
											</div>
										</CardContent>
										<div className="flex justify-end p-4 pt-0 space-x-2">
											<Button variant="outline" size="icon" onClick={() => handleToggleStatus(plan.id)}>
												<Check className="h-4 w-4" />
											</Button>
											<Button variant="outline" size="icon" onClick={() => handleEditPlan(plan)}>
												<Edit className="h-4 w-4" />
											</Button>
											<Button variant="outline" size="icon" onClick={() => handleDeletePlan(plan.id)}>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</Card>
								))}
						</div>
					</TabsContent>
				</Tabs>
			</div>

			{/* Plan Create/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>{isEditing ? "Edit Plan" : "Create New Plan"}</DialogTitle>
						<DialogDescription>
							{isEditing ? "Update the plan details below." : "Fill in the details to create a new plan."}
						</DialogDescription>
					</DialogHeader>

					{currentPlan && (
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Plan Name
								</Label>
								<Input
									id="name"
									value={currentPlan.name}
									onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="description" className="text-right">
									Description
								</Label>
								<Textarea
									id="description"
									value={currentPlan.description}
									onChange={(e) => setCurrentPlan({ ...currentPlan, description: e.target.value })}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="category" className="text-right">
									Category
								</Label>
								<Input
									id="category"
									value={currentPlan.category}
									onChange={(e) => setCurrentPlan({ ...currentPlan, category: e.target.value })}
									className="col-span-3"
									placeholder="e.g., Photographer, Carpenter"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="basePrice" className="text-right">
									Base Price (₹)
								</Label>
								<Input
									id="basePrice"
									type="number"
									value={currentPlan.basePrice}
									onChange={(e) => setCurrentPlan({ ...currentPlan, basePrice: Number(e.target.value) })}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-start gap-4">
								<Label className="text-right pt-2">Location Pricing</Label>
								<div className="col-span-3 space-y-4">
									{currentPlan.locationPricing.map((lp, index) => (
										<div key={index} className="flex items-center space-x-2">
											<Input
												value={lp.location}
												onChange={(e) => {
													const updatedPricing = [...currentPlan.locationPricing]
													updatedPricing[index].location = e.target.value
													setCurrentPlan({ ...currentPlan, locationPricing: updatedPricing })
												}}
												placeholder="Location"
												className="flex-1"
											/>
											<Input
												type="number"
												value={lp.price}
												onChange={(e) => {
													const updatedPricing = [...currentPlan.locationPricing]
													updatedPricing[index].price = Number(e.target.value)
													setCurrentPlan({ ...currentPlan, locationPricing: updatedPricing })
												}}
												placeholder="Price"
												className="w-24"
											/>
											<Button variant="ghost" size="icon" onClick={() => handleRemoveLocationPricing(lp.location)}>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									))}

									<div className="flex items-center space-x-2">
										<Input
											value={newLocation.location}
											onChange={(e) => setNewLocation({ ...newLocation, location: e.target.value })}
											placeholder="Add location"
											className="flex-1"
										/>
										<Input
											type="number"
											value={newLocation.price || ""}
											onChange={(e) => setNewLocation({ ...newLocation, price: Number(e.target.value) })}
											placeholder="Price"
											className="w-24"
										/>
										<Button variant="outline" size="icon" onClick={handleAddLocationPricing}>
											<Plus className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="noCommissionFirstXTasks" className="text-right">
									No Commission for First X Tasks
								</Label>
								<Input
									id="noCommissionFirstXTasks"
									type="number"
									value={currentPlan.commissionStructure.noCommissionFirstXTasks || ""}
									onChange={(e) =>
										setCurrentPlan({
											...currentPlan,
											commissionStructure: {
												...currentPlan.commissionStructure,
												noCommissionFirstXTasks: e.target.value ? Number(e.target.value) : null,
											},
										})
									}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="noCommissionForBidding" className="text-right">
									No Commission for X Bidding
								</Label>
								<Input
									id="noCommissionForBidding"
									type="number"
									value={currentPlan.commissionStructure.noCommissionForBidding || ""}
									onChange={(e) =>
										setCurrentPlan({
											...currentPlan,
											commissionStructure: {
												...currentPlan.commissionStructure,
												noCommissionForBidding: e.target.value ? Number(e.target.value) : null,
											},
										})
									}
									className="col-span-3"
									placeholder="Number of bids without commission"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="noCommissionUpToXRupees" className="text-right">
									No Commission for Tasks up to X Rupees
								</Label>
								<Input
									id="noCommissionUpToXRupees"
									type="number"
									value={currentPlan.commissionStructure.noCommissionUpToXRupees || ""}
									onChange={(e) =>
										setCurrentPlan({
											...currentPlan,
											commissionStructure: {
												...currentPlan.commissionStructure,
												noCommissionUpToXRupees: e.target.value ? Number(e.target.value) : null,
											},
										})
									}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="priorityTaskNotification" className="text-right">
									Priority Task Notification
								</Label>
								<Select
									value={currentPlan.commissionStructure.priorityTaskNotification}
									onValueChange={(value: "enabled" | "disabled" | "premium" | "emergency" | "direct") =>
										setCurrentPlan({
											...currentPlan,
											commissionStructure: {
												...currentPlan.commissionStructure,
												priorityTaskNotification: value,
											},
										})
									}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select priority notification status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="disabled">Disabled</SelectItem>
										{/* <SelectItem value="enabled">Enabled</SelectItem> */}
										<SelectItem value="premium">Bidders</SelectItem>
										<SelectItem value="emergency">Emergency Hiring</SelectItem>
										<SelectItem value="direct">Direct Hiring</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="discountType" className="text-right">
									Priority listing
								</Label>
								<Select>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select priority listing" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Select">Select</SelectItem>
										<SelectItem value="Option2">Bidding</SelectItem>
										<SelectItem value="Option1">Emergency tasks</SelectItem>
										<SelectItem value="Option2">Direct hiring</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="status" className="text-right">
									Status
								</Label>
								<Select
									value={currentPlan.status}
									onValueChange={(value) =>
										setCurrentPlan({
											...currentPlan,
											status: value as "active" | "inactive",
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
						<Button onClick={handleSavePlan}>{isEditing ? "Update Plan" : "Create Plan"}</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	)
}



// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Search, Plus, Edit, Trash2, Check, X } from "lucide-react"
// import AdminLayout from "@/components/admin-layout"
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// // Define types for our data structure
// type CommissionStructure = {
// 	noCommissionFirstXTasks: number | null
// 	noCommissionForBidding: number | null
// 	noCommissionUpToXRupees: number | null
// 	priorityTaskNotification: "bidders" | "emergency" | "direct haring"
// }

// type LocationPricing = {
// 	location: string
// 	price: number
// }

// type Plan = {
// 	id: string
// 	name: string
// 	description: string
// 	category: string
// 	basePrice: number
// 	locationPricing: LocationPricing[]
// 	commissionStructure: CommissionStructure
// 	status: "active" | "inactive"
// 	createdAt: string
// }

// export default function PlansPage() {
// 	// Sample plan data
// 	const [plans, setPlans] = useState<Plan[]>([
// 		{
// 			id: "1",
// 			name: "Basic Photography Plan",
// 			description: "Entry-level plan for photographers with essential features",
// 			category: "Photographer",
// 			basePrice: 999,
// 			locationPricing: [
// 				{ location: "Mumbai", price: 1299 },
// 				{ location: "Delhi", price: 1199 },
// 				{ location: "Bangalore", price: 1099 },
// 			],
// 			commissionStructure: {
// 				noCommissionFirstXTasks: 3,
// 				noCommissionForBidding: 3,
// 				noCommissionUpToXRupees: 500,
// 				priorityTaskNotification: "emergency",
// 			},
// 			status: "active",
// 			createdAt: "2023-08-15",
// 		},
// 		{
// 			id: "2",
// 			name: "Premium Carpenter Plan",
// 			description: "Advanced plan for carpenters with premium features",
// 			category: "Carpenter",
// 			basePrice: 1499,
// 			locationPricing: [
// 				{ location: "Mumbai", price: 1799 },
// 				{ location: "Delhi", price: 1699 },
// 				{ location: "Bangalore", price: 1599 },
// 			],
// 			commissionStructure: {
// 				noCommissionFirstXTasks: 5,
// 				noCommissionForBidding: 10,
// 				noCommissionUpToXRupees: 1000,
// 				priorityTaskNotification: "bidders",
// 			},
// 			status: "active",
// 			createdAt: "2023-09-10",
// 		},
// 		{
// 			id: "3",
// 			name: "Standard Electrician Plan",
// 			description: "Standard plan for electricians with balanced features",
// 			category: "Electrician",
// 			basePrice: 1299,
// 			locationPricing: [
// 				{ location: "Mumbai", price: 1599 },
// 				{ location: "Delhi", price: 1499 },
// 				{ location: "Bangalore", price: 1399 },
// 			],
// 			commissionStructure: {
// 				noCommissionFirstXTasks: 2,
// 				noCommissionForBidding: 6,
// 				noCommissionUpToXRupees: 750,
// 				priorityTaskNotification: "direct haring",
// 			},
// 			status: "inactive",
// 			createdAt: "2023-07-22",
// 		},
// 	])

// 	const [isDialogOpen, setIsDialogOpen] = useState(false)
// 	const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
// 	const [priorityTaskNotification, setPriorityTaskNotification] = useState<CommissionStructure | null>(null)
// 	const [isEditing, setIsEditing] = useState(false)
// 	const [searchTerm, setSearchTerm] = useState("")
// 	const [filterCategory, setFilterCategory] = useState<string | null>(null)
// 	const [filterStatus, setFilterStatus] = useState<string | null>(null)

// 	// New location pricing field
// 	const [newLocation, setNewLocation] = useState({ location: "", price: 0 })

// 	// Initialize a new plan
// 	const initNewPlan = (): Plan => ({
// 		id: (plans.length + 1).toString(),
// 		name: "",
// 		description: "",
// 		category: "",
// 		basePrice: 0,
// 		locationPricing: [],
// 		commissionStructure: {
// 			noCommissionFirstXTasks: null,
// 			noCommissionForBidding: null,
// 			noCommissionUpToXRupees: null,
// 			priorityTaskNotification: "direct haring",
// 		},
// 		status: "inactive",
// 		createdAt: new Date().toISOString().split("T")[0],
// 	})

// 	// Handle creating a new plan
// 	const handleCreatePlan = () => {
// 		setCurrentPlan(initNewPlan())
// 		setIsEditing(false)
// 		setIsDialogOpen(true)
// 	}

// 	// Handle editing a plan
// 	const handleEditPlan = (plan: Plan) => {
// 		setCurrentPlan({ ...plan })
// 		setIsEditing(true)
// 		setIsDialogOpen(true)
// 	}

// 	// Handle saving a plan (create or update)
// 	const handleSavePlan = () => {
// 		if (!currentPlan) return

// 		if (isEditing) {
// 			// Update existing plan
// 			setPlans(plans.map((p) => (p.id === currentPlan.id ? currentPlan : p)))
// 		} else {
// 			// Create new plan
// 			setPlans([...plans, currentPlan])
// 		}

// 		setIsDialogOpen(false)
// 		setCurrentPlan(null)
// 	}

// 	// Handle deleting a plan
// 	const handleDeletePlan = (id: string) => {
// 		setPlans(plans.filter((p) => p.id !== id))
// 	}

// 	// Handle toggling plan status
// 	const handleToggleStatus = (id: string) => {
// 		setPlans(
// 			plans.map((p) => {
// 				if (p.id === id) {
// 					return { ...p, status: p.status === "active" ? "inactive" : "active" }
// 				}
// 				return p
// 			}),
// 		)
// 	}

// 	// Handle adding a new location pricing
// 	const handleAddLocationPricing = () => {
// 		if (!currentPlan || !newLocation.location || newLocation.price <= 0) return

// 		setCurrentPlan({
// 			...currentPlan,
// 			locationPricing: [...currentPlan.locationPricing, { ...newLocation }],
// 		})

// 		setNewLocation({ location: "", price: 0 })
// 	}

// 	// Handle removing a location pricing
// 	const handleRemoveLocationPricing = (location: string) => {
// 		if (!currentPlan) return

// 		setCurrentPlan({
// 			...currentPlan,
// 			locationPricing: currentPlan.locationPricing.filter((lp) => lp.location !== location),
// 		})
// 	}

// 	// Filter plans based on search term and filters
// 	const filteredPlans = plans.filter((plan) => {
// 		const matchesSearch =
// 			plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 			plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 			plan.category.toLowerCase().includes(searchTerm.toLowerCase())

// 		const matchesCategory = !filterCategory || plan.category === filterCategory
// 		const matchesStatus = !filterStatus || plan.status === filterStatus

// 		return matchesSearch && matchesCategory && matchesStatus
// 	})

// 	// Get unique categories for filter
// 	const categories = Array.from(new Set(plans.map((p) => p.category)))

// 	return (
// 		<AdminLayout>
// 			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
// 				<div className="flex items-center justify-between">
// 					<h2 className="text-3xl font-bold tracking-tight">Plan Management</h2>
// 					<Button onClick={handleCreatePlan}>
// 						<Plus className="mr-2 h-4 w-4" />
// 						Create Plan
// 					</Button>
// 				</div>

// 				<Tabs defaultValue="all" className="space-y-4">
// 					<div className="flex items-center justify-between">
// 						<TabsList>
// 							<TabsTrigger value="all">All Plans</TabsTrigger>
// 							<TabsTrigger value="active">Active</TabsTrigger>
// 							<TabsTrigger value="inactive">Inactive</TabsTrigger>
// 						</TabsList>
// 					</div>

// 					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
// 						<div className="flex w-full md:w-auto items-center space-x-2">
// 							<div className="relative w-full md:w-[300px]">
// 								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// 								<Input
// 									type="search"
// 									placeholder="Search plans..."
// 									className="w-full pl-8"
// 									value={searchTerm}
// 									onChange={(e) => setSearchTerm(e.target.value)}
// 								/>
// 							</div>
// 							<Select value={filterCategory || ""} onValueChange={(value) => setFilterCategory(value || null)}>
// 								<SelectTrigger className="w-[180px]">
// 									<SelectValue placeholder="Filter by category" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="all">All Categories</SelectItem>
// 									{categories.map((category) => (
// 										<SelectItem key={category} value={category}>
// 											{category}
// 										</SelectItem>
// 									))}
// 								</SelectContent>
// 							</Select>
// 						</div>
// 					</div>

// 					<TabsContent value="all" className="space-y-4">
// 						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// 							{filteredPlans.map((plan) => (
// 								<Card key={plan.id}>
// 									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 										<CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
// 										<Badge variant={plan.status === "active" ? "default" : "secondary"}>{plan.status}</Badge>
// 									</CardHeader>
// 									<CardContent>
// 										<p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

// 										<div className="space-y-2">
// 											<div className="flex justify-between">
// 												<span className="font-medium">Category:</span>
// 												<span>{plan.category}</span>
// 											</div>
// 											<div className="flex justify-between">
// 												<span className="font-medium">Base Price:</span>
// 												<span>₹{plan.basePrice}</span>
// 											</div>
// 											<div className="flex justify-between">
// 												<span className="font-medium">No Commission (First):</span>
// 												<span>{plan.commissionStructure.noCommissionFirstXTasks || 0} Tasks</span>
// 											</div>
// 											<div className="flex justify-between">
// 												<span className="font-medium">No Commission (Bidding):</span>
// 												<span>{plan.commissionStructure.noCommissionForBidding ? "Yes" : "No"}</span>
// 											</div>
// 											<div className="flex justify-between">
// 												<span className="font-medium">No Commission (Up to):</span>
// 												<span>₹{plan.commissionStructure.noCommissionUpToXRupees || 0}</span>
// 											</div>
// 											<div className="flex justify-between">
// 												<span className="font-medium">Priority Notification:</span>
// 												<span>{plan.commissionStructure.priorityTaskNotification ? "Yes" : "No"}</span>
// 											</div>
// 										</div>

// 										<div className="mt-4">
// 											<p className="font-medium mb-2">Location Pricing:</p>
// 											<div className="space-y-1">
// 												{plan.locationPricing.map((lp) => (
// 													<div key={lp.location} className="flex justify-between text-sm">
// 														<span>{lp.location}:</span>
// 														<span>₹{lp.price}</span>
// 													</div>
// 												))}
// 											</div>
// 										</div>
// 									</CardContent>
// 									<div className="flex justify-end p-4 pt-0 space-x-2">
// 										<Button variant="outline" size="icon" onClick={() => handleToggleStatus(plan.id)}>
// 											{plan.status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
// 										</Button>
// 										<Button variant="outline" size="icon" onClick={() => handleEditPlan(plan)}>
// 											<Edit className="h-4 w-4" />
// 										</Button>
// 										<Button variant="outline" size="icon" onClick={() => handleDeletePlan(plan.id)}>
// 											<Trash2 className="h-4 w-4" />
// 										</Button>
// 									</div>
// 								</Card>
// 							))}
// 						</div>
// 					</TabsContent>

// 					<TabsContent value="active" className="space-y-4">
// 						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// 							{filteredPlans
// 								.filter((plan) => plan.status === "active")
// 								.map((plan) => (
// 									<Card key={plan.id}>
// 										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 											<CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
// 											<Badge variant="default">{plan.status}</Badge>
// 										</CardHeader>
// 										<CardContent>
// 											<p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

// 											<div className="space-y-2">
// 												<div className="flex justify-between">
// 													<span className="font-medium">Category:</span>
// 													<span>{plan.category}</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">Base Price:</span>
// 													<span>₹{plan.basePrice}</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">No Commission (First):</span>
// 													<span>{plan.commissionStructure.noCommissionFirstXTasks || 0} Tasks</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">No Commission (Bidding):</span>
// 													<span>{plan.commissionStructure.noCommissionForBidding ? "Yes" : "No"}</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">No Commission (Up to):</span>
// 													<span>₹{plan.commissionStructure.noCommissionUpToXRupees || 0}</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">Priority Notification:</span>
// 													<span>{plan.commissionStructure.priorityTaskNotification ? "Yes" : "No"}</span>
// 												</div>
// 											</div>

// 											<div className="mt-4">
// 												<p className="font-medium mb-2">Location Pricing:</p>
// 												<div className="space-y-1">
// 													{plan.locationPricing.map((lp) => (
// 														<div key={lp.location} className="flex justify-between text-sm">
// 															<span>{lp.location}:</span>
// 															<span>₹{lp.price}</span>
// 														</div>
// 													))}
// 												</div>
// 											</div>
// 										</CardContent>
// 										<div className="flex justify-end p-4 pt-0 space-x-2">
// 											<Button variant="outline" size="icon" onClick={() => handleToggleStatus(plan.id)}>
// 												<X className="h-4 w-4" />
// 											</Button>
// 											<Button variant="outline" size="icon" onClick={() => handleEditPlan(plan)}>
// 												<Edit className="h-4 w-4" />
// 											</Button>
// 											<Button variant="outline" size="icon" onClick={() => handleDeletePlan(plan.id)}>
// 												<Trash2 className="h-4 w-4" />
// 											</Button>
// 										</div>
// 									</Card>
// 								))}
// 						</div>
// 					</TabsContent>

// 					<TabsContent value="inactive" className="space-y-4">
// 						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// 							{filteredPlans
// 								.filter((plan) => plan.status === "inactive")
// 								.map((plan) => (
// 									<Card key={plan.id}>
// 										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 											<CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
// 											<Badge variant="secondary">{plan.status}</Badge>
// 										</CardHeader>
// 										<CardContent>
// 											<p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

// 											<div className="space-y-2">
// 												<div className="flex justify-between">
// 													<span className="font-medium">Category:</span>
// 													<span>{plan.category}</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">Base Price:</span>
// 													<span>₹{plan.basePrice}</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">No Commission (First):</span>
// 													<span>{plan.commissionStructure.noCommissionFirstXTasks || 0} Tasks</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">No Commission (Bidding):</span>
// 													<span>{plan.commissionStructure.noCommissionForBidding ? "Yes" : "No"}</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">No Commission (Up to):</span>
// 													<span>₹{plan.commissionStructure.noCommissionUpToXRupees || 0}</span>
// 												</div>
// 												<div className="flex justify-between">
// 													<span className="font-medium">Priority Notification:</span>
// 													<span>{plan.commissionStructure.priorityTaskNotification ? "Yes" : "No"}</span>
// 												</div>
// 											</div>

// 											<div className="mt-4">
// 												<p className="font-medium mb-2">Location Pricing:</p>
// 												<div className="space-y-1">
// 													{plan.locationPricing.map((lp) => (
// 														<div key={lp.location} className="flex justify-between text-sm">
// 															<span>{lp.location}:</span>
// 															<span>₹{lp.price}</span>
// 														</div>
// 													))}
// 												</div>
// 											</div>
// 										</CardContent>
// 										<div className="flex justify-end p-4 pt-0 space-x-2">
// 											<Button variant="outline" size="icon" onClick={() => handleToggleStatus(plan.id)}>
// 												<Check className="h-4 w-4" />
// 											</Button>
// 											<Button variant="outline" size="icon" onClick={() => handleEditPlan(plan)}>
// 												<Edit className="h-4 w-4" />
// 											</Button>
// 											<Button variant="outline" size="icon" onClick={() => handleDeletePlan(plan.id)}>
// 												<Trash2 className="h-4 w-4" />
// 											</Button>
// 										</div>
// 									</Card>
// 								))}
// 						</div>
// 					</TabsContent>
// 				</Tabs>
// 			</div>

// 			{/* Plan Create/Edit Dialog */}
// 			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// 				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
// 					<DialogHeader>
// 						<DialogTitle>{isEditing ? "Edit Plan" : "Create New Plan"}</DialogTitle>
// 						<DialogDescription>
// 							{isEditing ? "Update the plan details below." : "Fill in the details to create a new plan."}
// 						</DialogDescription>
// 					</DialogHeader>

// 					{currentPlan && (
// 						<div className="grid gap-4 py-4">
// 							<div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="name" className="text-right">
// 									Plan Name
// 								</Label>
// 								<Input
// 									id="name"
// 									value={currentPlan.name}
// 									onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
// 									className="col-span-3"
// 								/>
// 							</div>

// 							<div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="description" className="text-right">
// 									Description
// 								</Label>
// 								<Textarea
// 									id="description"
// 									value={currentPlan.description}
// 									onChange={(e) => setCurrentPlan({ ...currentPlan, description: e.target.value })}
// 									className="col-span-3"
// 								/>
// 							</div>

// 							<div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="category" className="text-right">
// 									Category
// 								</Label>
// 								<Input
// 									id="category"
// 									value={currentPlan.category}
// 									onChange={(e) => setCurrentPlan({ ...currentPlan, category: e.target.value })}
// 									className="col-span-3"
// 									placeholder="e.g., Photographer, Carpenter"
// 								/>
// 							</div>

// 							<div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="basePrice" className="text-right">
// 									Base Price (₹)
// 								</Label>
// 								<Input
// 									id="basePrice"
// 									type="number"
// 									value={currentPlan.basePrice}
// 									onChange={(e) => setCurrentPlan({ ...currentPlan, basePrice: Number(e.target.value) })}
// 									className="col-span-3"
// 								/>
// 							</div>

// 							<div className="grid grid-cols-4 items-start gap-4">
// 								<Label className="text-right pt-2">Location Pricing</Label>
// 								<div className="col-span-3 space-y-4">
// 									{currentPlan.locationPricing.map((lp, index) => (
// 										<div key={index} className="flex items-center space-x-2">
// 											<Input
// 												value={lp.location}
// 												onChange={(e) => {
// 													const updatedPricing = [...currentPlan.locationPricing]
// 													updatedPricing[index].location = e.target.value
// 													setCurrentPlan({ ...currentPlan, locationPricing: updatedPricing })
// 												}}
// 												placeholder="Location"
// 												className="flex-1"
// 											/>
// 											<Input
// 												type="number"
// 												value={lp.price}
// 												onChange={(e) => {
// 													const updatedPricing = [...currentPlan.locationPricing]
// 													updatedPricing[index].price = Number(e.target.value)
// 													setCurrentPlan({ ...currentPlan, locationPricing: updatedPricing })
// 												}}
// 												placeholder="Price"
// 												className="w-24"
// 											/>
// 											<Button variant="ghost" size="icon" onClick={() => handleRemoveLocationPricing(lp.location)}>
// 												<Trash2 className="h-4 w-4" />
// 											</Button>
// 										</div>
// 									))}

// 									<div className="flex items-center space-x-2">
// 										<Input
// 											value={newLocation.location}
// 											onChange={(e) => setNewLocation({ ...newLocation, location: e.target.value })}
// 											placeholder="Add location"
// 											className="flex-1"
// 										/>
// 										<Input
// 											type="number"
// 											value={newLocation.price || ""}
// 											onChange={(e) => setNewLocation({ ...newLocation, price: Number(e.target.value) })}
// 											placeholder="Price"
// 											className="w-24"
// 										/>
// 										<Button variant="outline" size="icon" onClick={handleAddLocationPricing}>
// 											<Plus className="h-4 w-4" />
// 										</Button>
// 									</div>
// 								</div>
// 							</div>

// 							{/* <div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="noCommissionFirstXTasks" className="text-right">
// 									No Commission for First X Tasks
// 								</Label>
// 								<Input
// 									id="noCommissionFirstXTasks"
// 									type="number"
// 									value={currentPlan.commissionStructure.noCommissionFirstXTasks || ""}
// 									onChange={(e) =>
// 										setCurrentPlan({
// 											...currentPlan,
// 											commissionStructure: {
// 												...currentPlan.commissionStructure,
// 												noCommissionFirstXTasks: e.target.value ? Number(e.target.value) : null,
// 											},
// 										})
// 									}
// 									className="col-span-3"
// 								/>
// 							</div> */}

// 							<div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="noCommissionForBidding" className="text-right">
// 									No Commission for fis X Bidding
// 								</Label>
// 								<div className="flex items-center space-x-2 col-span-3">
// 									<Input
// 										id="noCommissionForBidding"
// 										value={currentPlan.commissionStructure.noCommissionForBidding || ""}
// 										onChange={(e) =>
// 											setPriorityTaskNotification({
// 												...currentPlan,
// 												commissionStructure: {
// 													...currentPlan.commissionStructure,
// 													noCommissionForBidding: e.target.value ? Number(e.target.value) : null,
// 												},
// 											})
// 										}
// 									/>
// 									{/* <Label htmlFor="noCommissionForBidding">
// 										{currentPlan.commissionStructure.noCommissionForBidding ? "Enabled" : "Disabled"}
// 									</Label> */}
// 								</div>
// 							</div>

// 							<div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="noCommissionUpToXRupees" className="text-right">
// 									No Commission for Tasks up to X Rupees
// 								</Label>
// 								<Input
// 									id="noCommissionUpToXRupees"
// 									type="number"
// 									value={currentPlan.commissionStructure.noCommissionUpToXRupees || ""}
// 									onChange={(e) =>
// 										setCurrentPlan({
// 											...currentPlan,
// 											commissionStructure: {
// 												...currentPlan.commissionStructure,
// 												noCommissionUpToXRupees: e.target.value ? Number(e.target.value) : null,
// 											},
// 										})
// 									}
// 									className="col-span-3"
// 								/>
// 							</div>

// 							<div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="priorityTaskNotification" className="text-right">
// 									Priority Task Notification
// 								</Label>
// 								<div className="flex items-center space-x-2 col-span-3">
// 									<Switch
// 										id="priorityTaskNotification"
// 										checked={currentPlan.commissionStructure.priorityTaskNotification}
// 										onCheckedChange={(checked) =>
// 											setCurrentPlan({
// 												...currentPlan,
// 												commissionStructure: {
// 													...currentPlan.commissionStructure,
// 													priorityTaskNotification: checked,
// 												},
// 											})
// 										}
// 									/>
// 									<Label htmlFor="priorityTaskNotification">
// 										{currentPlan.commissionStructure.priorityTaskNotification ? "Enabled" : "Disabled"}
// 									</Label>
// 								</div>
// 							</div>
// 							<div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="status" className="text-right">
// 									Priority Task Notification
// 								</Label>
// 								<Select
// 									value={currentPlan.commissionStructure.priorityTaskNotification}
// 									onValueChange={(value) =>
// 										setCurrentPlan({
// 											...currentPlan,
// 											priorityTaskNotification: value as "bidders" | "emergency" | "direct haring"
// 										})
// 									}
// 								>
// 									<SelectTrigger className="col-span-3">
// 										<SelectValue placeholder="Select status" />
// 									</SelectTrigger>
// 									<SelectContent>
// 										<SelectItem value="active">Active</SelectItem>
// 										<SelectItem value="inactive">Inactive</SelectItem>
// 									</SelectContent>
// 								</Select>
// 							</div>

// 							<div className="grid grid-cols-4 items-center gap-4">
// 								<Label htmlFor="status" className="text-right">
// 									Status
// 								</Label>
// 								<Select
// 									value={currentPlan.status}
// 									onValueChange={(value) =>
// 										setCurrentPlan({
// 											...currentPlan,
// 											status: value as "active" | "inactive",
// 										})
// 									}
// 								>
// 									<SelectTrigger className="col-span-3">
// 										<SelectValue placeholder="Select status" />
// 									</SelectTrigger>
// 									<SelectContent>
// 										<SelectItem value="active">Active</SelectItem>
// 										<SelectItem value="inactive">Inactive</SelectItem>
// 									</SelectContent>
// 								</Select>
// 							</div>
// 						</div>
// 					)}

// 					<DialogFooter>
// 						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
// 							Cancel
// 						</Button>
// 						<Button onClick={handleSavePlan}>{isEditing ? "Update Plan" : "Create Plan"}</Button>
// 					</DialogFooter>
// 				</DialogContent>
// 			</Dialog>
// 		</AdminLayout>
// 	)
// }