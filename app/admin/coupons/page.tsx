"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Check, X, Calendar, Percent, Tag } from "lucide-react"
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
import { ResponsiveTable } from "@/components/responsive-table"

// Define types for our data structure
type DiscountType = "percentage" | "flat"

type Coupon = {
	id: string
	code: string
	description: string
	discountType: DiscountType
	discountValue: number
	minPurchase?: number
	maxDiscount?: number
	startDate: string
	endDate: string
	usageLimit?: number
	usageCount: number
	status: "active" | "inactive" | "expired"
	applicableCategories?: string
}

export default function CouponsPage() {
	// Sample coupon data
	const [coupons, setCoupons] = useState<Coupon[]>([
		{
			id: "1",
			code: "WELCOME20",
			description: "20% off for new users",
			discountType: "percentage",
			discountValue: 20,
			minPurchase: 500,
			maxDiscount: 2000,
			startDate: "2023-09-01",
			endDate: "2023-12-31",
			usageLimit: 1,
			usageCount: 245,
			status: "active",
			applicableCategories: ["All"],
		},
		{
			id: "2",
			code: "FLAT500",
			description: "₹500 off on orders above ₹2500",
			discountType: "flat",
			discountValue: 500,
			minPurchase: 2500,
			startDate: "2023-09-15",
			endDate: "2023-10-15",
			usageLimit: 1,
			usageCount: 120,
			status: "active",
			applicableCategories: ["Photographer", "Confectioner"],
		},
		{
			id: "3",
			code: "SUMMER25",
			description: "25% off on summer services",
			discountType: "percentage",
			discountValue: 25,
			minPurchase: 1000,
			maxDiscount: 3000,
			startDate: "2023-04-01",
			endDate: "2023-06-30",
			usageCount: 350,
			status: "expired",
			applicableCategories: ["AC Repair", "Plumber"],
		},
		{
			id: "4",
			code: "FESTIVAL10",
			description: "10% off on all festival bookings",
			discountType: "percentage",
			discountValue: 10,
			minPurchase: 2000,
			maxDiscount: 5000,
			startDate: "2023-10-01",
			endDate: "2023-11-15",
			usageCount: 0,
			status: "inactive",
			applicableCategories: ["Band", "Photographer", "Confectioner"],
		},
	])

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [currentCoupon, setCurrentCoupon] = useState<Coupon | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const [statusFilter, setStatusFilter] = useState<string>("all")

	// Initialize a new coupon
	const initNewCoupon = (): Coupon => ({
		id: (coupons.length + 1).toString(),
		code: "",
		description: "",
		discountType: "percentage",
		discountValue: 0,
		startDate: new Date().toISOString().split("T")[0],
		endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
		usageCount: 0,
		status: "inactive",
	})

	// Handle creating a new coupon
	const handleCreateCoupon = () => {
		setCurrentCoupon(initNewCoupon())
		setIsEditing(false)
		setIsDialogOpen(true)
	}

	// Handle editing a coupon
	const handleEditCoupon = (coupon: Coupon) => {
		setCurrentCoupon({ ...coupon })
		setIsEditing(true)
		setIsDialogOpen(true)
	}

	// Handle saving a coupon (create or update)
	const handleSaveCoupon = () => {
		if (!currentCoupon) return

		if (isEditing) {
			// Update existing coupon
			setCoupons(coupons.map((c) => (c.id === currentCoupon.id ? currentCoupon : c)))
		} else {
			// Create new coupon
			setCoupons([...coupons, currentCoupon])
		}

		setIsDialogOpen(false)
		setCurrentCoupon(null)
	}

	// Handle deleting a coupon
	const handleDeleteCoupon = (id: string) => {
		setCoupons(coupons.filter((c) => c.id !== id))
	}

	// Handle toggling coupon status
	const handleToggleStatus = (id: string) => {
		setCoupons(
			coupons.map((c) => {
				if (c.id === id) {
					return {
						...c,
						status: c.status === "active" ? "inactive" : "active",
					}
				}
				return c
			}),
		)
	}

	// Filter coupons based on search term and status filter
	const filteredCoupons = coupons.filter((coupon) => {
		const matchesSearch =
			coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
			coupon.description.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesStatus = statusFilter === "all" || coupon.status === statusFilter

		return matchesSearch && matchesStatus
	})

	// Check if a coupon is expired
	const isCouponExpired = (endDate: string) => {
		return new Date(endDate) < new Date()
	}

	// Format currency
	const formatCurrency = (amount: number) => {
		return `₹${amount.toLocaleString("en-IN")}`
	}

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Coupon Management</h2>
					<Button onClick={handleCreateCoupon}>
						<Plus className="mr-2 h-4 w-4" />
						Create Coupon
					</Button>
				</div>

				<Tabs defaultValue="all" className="space-y-4">
					<div className="flex items-center justify-between">
						<TabsList>
							<TabsTrigger value="all">All Coupons</TabsTrigger>
							<TabsTrigger value="active">Active</TabsTrigger>
							<TabsTrigger value="inactive">Inactive</TabsTrigger>
							<TabsTrigger value="expired">Expired</TabsTrigger>
						</TabsList>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="relative w-full md:w-[300px]">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search coupons..."
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
											<ResponsiveTable.Head>Code</ResponsiveTable.Head>
											<ResponsiveTable.Head>Description</ResponsiveTable.Head>
											<ResponsiveTable.Head>Discount</ResponsiveTable.Head>
											<ResponsiveTable.Head>Validity</ResponsiveTable.Head>
											<ResponsiveTable.Head>Usage</ResponsiveTable.Head>
											<ResponsiveTable.Head>Status</ResponsiveTable.Head>
											<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
										</ResponsiveTable.Row>
									</ResponsiveTable.Header>
									<ResponsiveTable.Body>
										{filteredCoupons.map((coupon) => (
											<ResponsiveTable.Row key={coupon.id}>
												<ResponsiveTable.Cell className="font-medium">{coupon.code}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>{coupon.description}</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>
													<div className="flex items-center">
														{coupon.discountType === "percentage" ? (
															<Percent className="mr-1 h-4 w-4 text-muted-foreground" />
														) : (
															<Tag className="mr-1 h-4 w-4 text-muted-foreground" />
														)}
														<span>
															{coupon.discountType === "percentage"
																? `${coupon.discountValue}%`
																: formatCurrency(coupon.discountValue)}
														</span>
													</div>
													{coupon.minPurchase && (
														<div className="text-xs text-muted-foreground">
															Min: {formatCurrency(coupon.minPurchase)}
														</div>
													)}
													{coupon.maxDiscount && coupon.discountType === "percentage" && (
														<div className="text-xs text-muted-foreground">
															Max: {formatCurrency(coupon.maxDiscount)}
														</div>
													)}
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>
													<div className="flex items-center">
														<Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
														<span>
															{new Date(coupon.startDate).toLocaleDateString()} -{" "}
															{new Date(coupon.endDate).toLocaleDateString()}
														</span>
													</div>
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>
													<div>
														<span>{coupon.usageCount} used</span>
														{coupon.usageLimit && (
															<div className="text-xs text-muted-foreground">Limit: {coupon.usageLimit} per user</div>
														)}
													</div>
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell>
													<Badge
														variant={
															coupon.status === "active"
																? "default"
																: coupon.status === "inactive"
																	? "secondary"
																	: "outline"
														}
													>
														{coupon.status}
													</Badge>
												</ResponsiveTable.Cell>
												<ResponsiveTable.Cell className="text-right">
													<div className="flex justify-end space-x-2">
														{coupon.status !== "expired" && (
															<Button variant="outline" size="icon" onClick={() => handleToggleStatus(coupon.id)}>
																{coupon.status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
															</Button>
														)}
														<Button variant="outline" size="icon" onClick={() => handleEditCoupon(coupon)}>
															<Edit className="h-4 w-4" />
														</Button>
														<Button variant="outline" size="icon" onClick={() => handleDeleteCoupon(coupon.id)}>
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

					{["active", "inactive", "expired"].map((status) => (
						<TabsContent key={status} value={status} className="space-y-4">
							<Card>
								<CardContent className="p-0">
									<ResponsiveTable>
										<ResponsiveTable.Header>
											<ResponsiveTable.Row>
												<ResponsiveTable.Head>Code</ResponsiveTable.Head>
												<ResponsiveTable.Head>Description</ResponsiveTable.Head>
												<ResponsiveTable.Head>Discount</ResponsiveTable.Head>
												<ResponsiveTable.Head>Validity</ResponsiveTable.Head>
												<ResponsiveTable.Head>Usage</ResponsiveTable.Head>
												<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
											</ResponsiveTable.Row>
										</ResponsiveTable.Header>
										<ResponsiveTable.Body>
											{filteredCoupons
												.filter((coupon) => coupon.status === status)
												.map((coupon) => (
													<ResponsiveTable.Row key={coupon.id}>
														<ResponsiveTable.Cell className="font-medium">{coupon.code}</ResponsiveTable.Cell>
														<ResponsiveTable.Cell>{coupon.description}</ResponsiveTable.Cell>
														<ResponsiveTable.Cell>
															<div className="flex items-center">
																{coupon.discountType === "percentage" ? (
																	<Percent className="mr-1 h-4 w-4 text-muted-foreground" />
																) : (
																	<Tag className="mr-1 h-4 w-4 text-muted-foreground" />
																)}
																<span>
																	{coupon.discountType === "percentage"
																		? `${coupon.discountValue}%`
																		: formatCurrency(coupon.discountValue)}
																</span>
															</div>
															{coupon.minPurchase && (
																<div className="text-xs text-muted-foreground">
																	Min: {formatCurrency(coupon.minPurchase)}
																</div>
															)}
															{coupon.maxDiscount && coupon.discountType === "percentage" && (
																<div className="text-xs text-muted-foreground">
																	Max: {formatCurrency(coupon.maxDiscount)}
																</div>
															)}
														</ResponsiveTable.Cell>
														<ResponsiveTable.Cell>
															<div className="flex items-center">
																<Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
																<span>
																	{new Date(coupon.startDate).toLocaleDateString()} -{" "}
																	{new Date(coupon.endDate).toLocaleDateString()}
																</span>
															</div>
														</ResponsiveTable.Cell>
														<ResponsiveTable.Cell>
															<div>
																<span>{coupon.usageCount} used</span>
																{coupon.usageLimit && (
																	<div className="text-xs text-muted-foreground">
																		Limit: {coupon.usageLimit} per user
																	</div>
																)}
															</div>
														</ResponsiveTable.Cell>
														<ResponsiveTable.Cell className="text-right">
															<div className="flex justify-end space-x-2">
																{status !== "expired" && (
																	<Button variant="outline" size="icon" onClick={() => handleToggleStatus(coupon.id)}>
																		{status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
																	</Button>
																)}
																<Button variant="outline" size="icon" onClick={() => handleEditCoupon(coupon)}>
																	<Edit className="h-4 w-4" />
																</Button>
																<Button variant="outline" size="icon" onClick={() => handleDeleteCoupon(coupon.id)}>
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
					))}
				</Tabs>
			</div>

			{/* Coupon Create/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>{isEditing ? "Edit Coupon" : "Create New Coupon"}</DialogTitle>
						<DialogDescription>
							{isEditing ? "Update the coupon details below." : "Fill in the details to create a new coupon."}
						</DialogDescription>
					</DialogHeader>

					{currentCoupon && (
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="code" className="text-right">
									Coupon Code
								</Label>
								<Input
									id="code"
									value={currentCoupon.code}
									onChange={(e) => setCurrentCoupon({ ...currentCoupon, code: e.target.value.toUpperCase() })}
									className="col-span-3"
									placeholder="e.g., SUMMER20"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="description" className="text-right">
									Description
								</Label>
								<Textarea
									id="description"
									value={currentCoupon.description}
									onChange={(e) => setCurrentCoupon({ ...currentCoupon, description: e.target.value })}
									className="col-span-3"
									placeholder="Brief description of the coupon"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="discountType" className="text-right">
									Discount Type
								</Label>
								<Select
									value={currentCoupon.discountType}
									onValueChange={(value: DiscountType) => setCurrentCoupon({ ...currentCoupon, discountType: value })}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select discount type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="percentage">Percentage Discount</SelectItem>
										<SelectItem value="flat">Flat Discount</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="discountValue" className="text-right">
									{currentCoupon.discountType === "percentage" ? "Discount (%)" : "Discount Amount (₹)"}
								</Label>
								<Input
									id="discountValue"
									type="number"
									value={currentCoupon.discountValue}
									onChange={(e) => setCurrentCoupon({ ...currentCoupon, discountValue: Number(e.target.value) })}
									className="col-span-3"
								/>
							</div>

							{currentCoupon.discountType === "percentage" && (
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="maxDiscount" className="text-right">
										Maximum Discount (₹)
									</Label>
									<Input
										id="maxDiscount"
										type="number"
										value={currentCoupon.maxDiscount || ""}
										onChange={(e) =>
											setCurrentCoupon({
												...currentCoupon,
												maxDiscount: e.target.value ? Number(e.target.value) : undefined,
											})
										}
										className="col-span-3"
										placeholder="Optional"
									/>
								</div>
							)}

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="minPurchase" className="text-right">
									Minimum Purchase (₹)
								</Label>
								<Input
									id="minPurchase"
									type="number"
									value={currentCoupon.minPurchase || ""}
									onChange={(e) =>
										setCurrentCoupon({
											...currentCoupon,
											minPurchase: e.target.value ? Number(e.target.value) : undefined,
										})
									}
									className="col-span-3"
									placeholder="Optional"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="startDate" className="text-right">
									Start Date
								</Label>
								<Input
									id="startDate"
									type="date"
									value={currentCoupon.startDate}
									onChange={(e) => setCurrentCoupon({ ...currentCoupon, startDate: e.target.value })}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="endDate" className="text-right">
									End Date
								</Label>
								<Input
									id="endDate"
									type="date"
									value={currentCoupon.endDate}
									onChange={(e) => setCurrentCoupon({ ...currentCoupon, endDate: e.target.value })}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="usageLimit" className="text-right">
									Usage Limit Per User
								</Label>
								<Input
									id="usageLimit"
									type="number"
									value={currentCoupon.usageLimit || ""}
									onChange={(e) =>
										setCurrentCoupon({
											...currentCoupon,
											usageLimit: e.target.value ? Number(e.target.value) : undefined,
										})
									}
									className="col-span-3"
									placeholder="Optional (unlimited if not set)"
								/>
							</div>

							{/* <div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="applicableCategories" className="text-right">
									Applicable Categories
								</Label>
								<Input
									id="applicableCategories"
									value={currentCoupon.applicableCategories?.join(", ") || "All"}
									onChange={(e) =>
										setCurrentCoupon({
											...currentCoupon,
											applicableCategories: e.target.value.split(",").map((cat) => cat.trim()),
										})
									}
									className="col-span-3"
									placeholder="e.g., Photographer, Carpenter (comma separated, or 'All')"
								/>
							</div> */}

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="discountType" className="text-right">
									Applicable Categories
								</Label>
								<Select
									value={currentCoupon.applicableCategories}
									onValueChange={(value: DiscountType) => setCurrentCoupon({ ...currentCoupon, applicableCategories: value })}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select discount type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Select">Select</SelectItem>
										<SelectItem value="Option2">Option 1</SelectItem>
										<SelectItem value="Option1">Option 2</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="discountType" className="text-right">
									Applicable Location
								</Label>
								<Select
									value={currentCoupon.applicableCategories}
									onValueChange={(value: DiscountType) => setCurrentCoupon({ ...currentCoupon, applicableCategories: value })}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select discount type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Select">Select</SelectItem>
										<SelectItem value="Option2">Location 1</SelectItem>
										<SelectItem value="Option1">Location 2</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="status" className="text-right">
									Status
								</Label>
								<Select
									value={currentCoupon.status}
									onValueChange={(value: "active" | "inactive" | "expired") =>
										setCurrentCoupon({
											...currentCoupon,
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
										{isEditing && <SelectItem value="expired">Expired</SelectItem>}
									</SelectContent>
								</Select>
							</div>
						</div>
					)}

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSaveCoupon}>{isEditing ? "Update Coupon" : "Create Coupon"}</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	)
}

