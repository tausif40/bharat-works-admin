"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveTable } from "@/components/responsive-table"

// Define types for our data structure
type ReferralType = "customer" | "vendor" | "both"

type LocationDiscount = {
	location: string
	discountPercentage: number
}

type Referral = {
	id: string
	code: string
	description: string
	type: ReferralType
	flatDiscount: number
	discountPercentage: number
	maxDiscount?: number
	locationDiscounts: LocationDiscount[]
	validFrom: string
	validUntil: string
	usageLimit?: number
	usageCount: number
	status: "active" | "inactive" | "expired"
}

export default function ReferralsPage() {
	// Sample referral data
	const [referrals, setReferrals] = useState<Referral[]>([
		{
			id: "1",
			code: "REFER10",
			description: "Get 10% off on your first booking when referred by a friend",
			type: "customer",
			flatDiscount: 0,
			discountPercentage: 10,
			maxDiscount: 500,
			locationDiscounts: [
				{ location: "Mumbai", discountPercentage: 15 },
				{ location: "Delhi", discountPercentage: 12 },
			],
			validFrom: "2023-09-01",
			validUntil: "2023-12-31",
			usageLimit: 1,
			usageCount: 45,
			status: "active",
		},
		{
			id: "2",
			code: "VENDORBONUS",
			description: "Vendors get ₹200 flat discount on subscription when referred",
			type: "vendor",
			flatDiscount: 200,
			discountPercentage: 0,
			locationDiscounts: [{ location: "Bangalore", discountPercentage: 5 }],
			validFrom: "2023-08-15",
			validUntil: "2023-11-15",
			usageCount: 23,
			status: "active",
		},
		{
			id: "3",
			code: "FRIENDFAMILY",
			description: "Special discount for friends and family referrals",
			type: "both",
			flatDiscount: 100,
			discountPercentage: 5,
			maxDiscount: 1000,
			locationDiscounts: [],
			validFrom: "2023-07-01",
			validUntil: "2023-08-31",
			usageCount: 67,
			status: "expired",
		},
	])

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [currentReferral, setCurrentReferral] = useState<Referral | null>(null)
	const [isEditing, setIsEditing] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const [statusFilter, setStatusFilter] = useState<string>("all")
	const [typeFilter, setTypeFilter] = useState<string>("all")

	// New location discount field
	const [newLocationDiscount, setNewLocationDiscount] = useState({ location: "", discountPercentage: 0 })

	// Initialize a new referral
	const initNewReferral = (): Referral => ({
		id: (referrals.length + 1).toString(),
		code: "",
		description: "",
		type: "both",
		flatDiscount: 0,
		discountPercentage: 0,
		locationDiscounts: [],
		validFrom: new Date().toISOString().split("T")[0],
		validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
		usageCount: 0,
		status: "inactive",
	})

	// Handle creating a new referral
	const handleCreateReferral = () => {
		setCurrentReferral(initNewReferral())
		setIsEditing(false)
		setIsDialogOpen(true)
	}

	// Handle editing a referral
	const handleEditReferral = (referral: Referral) => {
		setCurrentReferral({ ...referral })
		setIsEditing(true)
		setIsDialogOpen(true)
	}

	// Handle saving a referral (create or update)
	const handleSaveReferral = () => {
		if (!currentReferral) return

		if (isEditing) {
			// Update existing referral
			setReferrals(referrals.map((r) => (r.id === currentReferral.id ? currentReferral : r)))
		} else {
			// Create new referral
			setReferrals([...referrals, currentReferral])
		}

		setIsDialogOpen(false)
		setCurrentReferral(null)
	}

	// Handle deleting a referral
	const handleDeleteReferral = (id: string) => {
		setReferrals(referrals.filter((r) => r.id !== id))
	}

	// Handle toggling referral status
	const handleToggleStatus = (id: string) => {
		setReferrals(
			referrals.map((r) => {
				if (r.id === id) {
					return { ...r, status: r.status === "active" ? "inactive" : "active" }
				}
				return r
			}),
		)
	}

	// Handle adding a new location discount
	const handleAddLocationDiscount = () => {
		if (!currentReferral || !newLocationDiscount.location || newLocationDiscount.discountPercentage <= 0) return

		setCurrentReferral({
			...currentReferral,
			locationDiscounts: [...currentReferral.locationDiscounts, { ...newLocationDiscount }],
		})

		setNewLocationDiscount({ location: "", discountPercentage: 0 })
	}

	// Handle removing a location discount
	const handleRemoveLocationDiscount = (location: string) => {
		if (!currentReferral) return

		setCurrentReferral({
			...currentReferral,
			locationDiscounts: currentReferral.locationDiscounts.filter((ld) => ld.location !== location),
		})
	}

	// Filter referrals based on search term and filters
	const filteredReferrals = referrals.filter((referral) => {
		const matchesSearch =
			referral.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
			referral.description.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesStatus = statusFilter === "all" || referral.status === statusFilter
		const matchesType =
			typeFilter === "all" || referral.type === typeFilter || (typeFilter === "both" && referral.type === "both")

		return matchesSearch && matchesStatus && matchesType
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

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Referral Management</h2>
					<Button onClick={handleCreateReferral}>
						<Plus className="mr-2 h-4 w-4" />
						Create Referral
					</Button>
				</div>

				<Tabs defaultValue="all" className="space-y-4">
					<div className="flex items-center justify-between">
						<TabsList>
							<TabsTrigger value="all">All Referrals</TabsTrigger>
							<TabsTrigger value="active">Active</TabsTrigger>
							<TabsTrigger value="inactive">Inactive</TabsTrigger>
							<TabsTrigger value="expired">Expired</TabsTrigger>
						</TabsList>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="flex w-full md:w-auto items-center space-x-2">
							<div className="relative w-full md:w-[300px]">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search referrals..."
									className="w-full pl-8"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
							<Select value={typeFilter} onValueChange={setTypeFilter}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Filter by type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Types</SelectItem>
									<SelectItem value="customer">Customer</SelectItem>
									<SelectItem value="vendor">Vendor</SelectItem>
									<SelectItem value="both">Both</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<Card>
						<CardContent className="p-0">
							<ResponsiveTable>
								<ResponsiveTable.Header>
									<ResponsiveTable.Row>
										<ResponsiveTable.Head>Code</ResponsiveTable.Head>
										<ResponsiveTable.Head>Description</ResponsiveTable.Head>
										<ResponsiveTable.Head>Type</ResponsiveTable.Head>
										<ResponsiveTable.Head>Discount</ResponsiveTable.Head>
										<ResponsiveTable.Head>Location Discounts</ResponsiveTable.Head>
										<ResponsiveTable.Head>Validity</ResponsiveTable.Head>
										<ResponsiveTable.Head>Usage</ResponsiveTable.Head>
										<ResponsiveTable.Head>Status</ResponsiveTable.Head>
										<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
									</ResponsiveTable.Row>
								</ResponsiveTable.Header>
								<ResponsiveTable.Body>
									{filteredReferrals.map((referral) => (
										<ResponsiveTable.Row key={referral.id}>
											<ResponsiveTable.Cell className="font-medium">{referral.code}</ResponsiveTable.Cell>
											<ResponsiveTable.Cell>{referral.description}</ResponsiveTable.Cell>
											<ResponsiveTable.Cell className="capitalize">{referral.type}</ResponsiveTable.Cell>
											<ResponsiveTable.Cell>
												{referral.flatDiscount > 0 && <div>₹{referral.flatDiscount} flat</div>}
												{referral.discountPercentage > 0 && (
													<div>
														{referral.discountPercentage}%
														{referral.maxDiscount && (
															<span className="text-xs text-muted-foreground"> (Max: ₹{referral.maxDiscount})</span>
														)}
													</div>
												)}
											</ResponsiveTable.Cell>
											<ResponsiveTable.Cell>
												{referral.locationDiscounts.length > 0 ? (
													<div className="text-sm">
														{referral.locationDiscounts.map((ld) => (
															<div key={ld.location}>
																{ld.location}: {ld.discountPercentage}%
															</div>
														))}
													</div>
												) : (
													<span className="text-muted-foreground">None</span>
												)}
											</ResponsiveTable.Cell>
											<ResponsiveTable.Cell>
												{formatDate(referral.validFrom)} - {formatDate(referral.validUntil)}
											</ResponsiveTable.Cell>
											<ResponsiveTable.Cell>
												<div>
													<span>{referral.usageCount} used</span>
													{referral.usageLimit && (
														<div className="text-xs text-muted-foreground">Limit: {referral.usageLimit} per user</div>
													)}
												</div>
											</ResponsiveTable.Cell>
											<ResponsiveTable.Cell>
												<Badge
													variant={
														referral.status === "active"
															? "default"
															: referral.status === "inactive"
																? "secondary"
																: "outline"
													}
												>
													{referral.status}
												</Badge>
											</ResponsiveTable.Cell>
											<ResponsiveTable.Cell className="text-right">
												<div className="flex justify-end space-x-2">
													{referral.status !== "expired" && (
														<Button
															variant="outline"
															size="icon"
															onClick={() => handleToggleStatus(referral.id)}
															title={referral.status === "active" ? "Deactivate" : "Activate"}
														>
															{referral.status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
														</Button>
													)}
													<Button
														variant="outline"
														size="icon"
														onClick={() => handleEditReferral(referral)}
														title="Edit"
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="outline"
														size="icon"
														onClick={() => handleDeleteReferral(referral.id)}
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
				</Tabs>
			</div>

			{/* Referral Create/Edit Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>{isEditing ? "Edit Referral" : "Create New Referral"}</DialogTitle>
						<DialogDescription>
							{isEditing ? "Update the referral details below." : "Fill in the details to create a new referral."}
						</DialogDescription>
					</DialogHeader>

					{currentReferral && (
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="code" className="text-right">
									Referral Code
								</Label>
								<Input
									id="code"
									value={currentReferral.code}
									onChange={(e) => setCurrentReferral({ ...currentReferral, code: e.target.value.toUpperCase() })}
									className="col-span-3"
									placeholder="e.g., REFER10"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="description" className="text-right">
									Description
								</Label>
								<Textarea
									id="description"
									value={currentReferral.description}
									onChange={(e) => setCurrentReferral({ ...currentReferral, description: e.target.value })}
									className="col-span-3"
									placeholder="Brief description of the referral program"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="type" className="text-right">
									Referral Type
								</Label>
								<Select
									value={currentReferral.type}
									onValueChange={(value: ReferralType) => setCurrentReferral({ ...currentReferral, type: value })}
								>
									<SelectTrigger className="col-span-3">
										<SelectValue placeholder="Select referral type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="customer">Customer</SelectItem>
										<SelectItem value="vendor">Vendor</SelectItem>
										<SelectItem value="both">Both</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="flatDiscount" className="text-right">
									Discount (₹)
								</Label>
								<Input
									id="flatDiscount"
									type="number"
									value={currentReferral.flatDiscount}
									onChange={(e) => setCurrentReferral({ ...currentReferral, flatDiscount: Number(e.target.value) })}
									className="col-span-3"
									placeholder="0 for no flat discount"
								/>
							</div>

							{/* <div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="discountPercentage" className="text-right">
									Discount Percentage (%)
								</Label>
								<Input
									id="discountPercentage"
									type="number"
									value={currentReferral.discountPercentage}
									onChange={(e) =>
										setCurrentReferral({ ...currentReferral, discountPercentage: Number(e.target.value) })
									}
									className="col-span-3"
									placeholder="0 for no percentage discount"
								/>
							</div> */}

							{/* <div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="maxDiscount" className="text-right">
									Maximum Discount (₹)
								</Label>
								<Input
									id="maxDiscount"
									type="number"
									value={currentReferral.maxDiscount || ""}
									onChange={(e) =>
										setCurrentReferral({
											...currentReferral,
											maxDiscount: e.target.value ? Number(e.target.value) : undefined,
										})
									}
									className="col-span-3"
									placeholder="Optional"
								/>
							</div> */}

							<div className="grid grid-cols-4 items-start gap-4">
								<Label className="text-right pt-2">Location-based Discounts</Label>
								<div className="col-span-3 space-y-4">
									{currentReferral.locationDiscounts.map((ld, index) => (
										<div key={index} className="flex items-center space-x-2">
											<Input
												value={ld.location}
												onChange={(e) => {
													const updatedDiscounts = [...currentReferral.locationDiscounts]
													updatedDiscounts[index].location = e.target.value
													setCurrentReferral({ ...currentReferral, locationDiscounts: updatedDiscounts })
												}}
												placeholder="Location"
												className="flex-1"
											/>
											<Input
												type="number"
												value={ld.discountPercentage}
												onChange={(e) => {
													const updatedDiscounts = [...currentReferral.locationDiscounts]
													updatedDiscounts[index].discountPercentage = Number(e.target.value)
													setCurrentReferral({ ...currentReferral, locationDiscounts: updatedDiscounts })
												}}
												placeholder="Discount %"
												className="w-24"
											/>
											<Button variant="ghost" size="icon" onClick={() => handleRemoveLocationDiscount(ld.location)}>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									))}

									<div className="flex items-center space-x-2">
										<Input
											value={newLocationDiscount.location}
											onChange={(e) => setNewLocationDiscount({ ...newLocationDiscount, location: e.target.value })}
											placeholder="Add location"
											className="flex-1"
										/>
										<Input
											type="number"
											value={newLocationDiscount.discountPercentage || ""}
											onChange={(e) =>
												setNewLocationDiscount({
													...newLocationDiscount,
													discountPercentage: Number(e.target.value),
												})
											}
											placeholder="Discount %"
											className="w-24"
										/>
										<Button variant="outline" size="icon" onClick={handleAddLocationDiscount}>
											<Plus className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="validFrom" className="text-right">
									Valid From
								</Label>
								<Input
									id="validFrom"
									type="date"
									value={currentReferral.validFrom}
									onChange={(e) => setCurrentReferral({ ...currentReferral, validFrom: e.target.value })}
									className="col-span-3"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="validUntil" className="text-right">
									Valid Until
								</Label>
								<Input
									id="validUntil"
									type="date"
									value={currentReferral.validUntil}
									onChange={(e) => setCurrentReferral({ ...currentReferral, validUntil: e.target.value })}
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
									value={currentReferral.usageLimit || ""}
									onChange={(e) =>
										setCurrentReferral({
											...currentReferral,
											usageLimit: e.target.value ? Number(e.target.value) : undefined,
										})
									}
									className="col-span-3"
									placeholder="Optional (unlimited if not set)"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="usageLimit" className="text-right">
									NO of task completed
								</Label>
								<Input
									id="usageLimit"
									type="number"
									className="col-span-3"
									placeholder="NO of task completed by opponent"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="usageLimit" className="text-right">
									Min transaction value
								</Label>
								<Input
									id="usageLimit"
									type="number"
									className="col-span-3"
									placeholder="Min transaction value by opponent"
								/>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="status" className="text-right">
									Status
								</Label>
								<Select
									value={currentReferral.status}
									onValueChange={(value: "active" | "inactive" | "expired") =>
										setCurrentReferral({
											...currentReferral,
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
						<Button onClick={handleSaveReferral}>{isEditing ? "Update Referral" : "Create Referral"}</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	)
}

