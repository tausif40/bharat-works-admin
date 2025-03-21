"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Plus, Settings, Trash2 } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { ResponsiveTable } from "@/components/responsive-table"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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
}

type Subcategory = {
	id: string
	name: string
	description: string
	status: "active" | "inactive"
}

type Question = {
	id: string
	question: string
	type: "text" | "multiple_choice" | "single_choice" | "number"
	required: boolean
	options?: string[]
}

export default function CategoryDetailsPage({ params }: { params: { id: string } }) {
	// Sample category data
	const [category, setCategory] = useState<Category>({
		id: params.id,
		name: "Photographer",
		description: "Professional photography services for events and occasions",
		status: "active",
		baseCommission: 10,
		locationCommissions: [
			{ location: "Mumbai", commissionPercentage: 12 },
			{ location: "Delhi", commissionPercentage: 11 },
		],
	})

	// Sample subcategories
	const [subcategories, setSubcategories] = useState<Subcategory[]>([
		{
			id: "1",
			name: "Wedding Photographer",
			description: "Professional photography for weddings and related events",
			status: "active",
		},
		{
			id: "2",
			name: "Event Photographer",
			description: "Photography services for corporate and social events",
			status: "active",
		},
		{
			id: "3",
			name: "Portrait Photographer",
			description: "Professional portrait photography services",
			status: "active",
		},
		{
			id: "4",
			name: "Product Photographer",
			description: "Photography services for product catalogs and e-commerce",
			status: "inactive",
		},
		{
			id: "5",
			name: "Real Estate Photographer",
			description: "Photography services for real estate listings",
			status: "active",
		},
	])

	// Sample questions
	const [questions, setQuestions] = useState<Question[]>([
		{
			id: "1",
			question: "What type of event do you need photography for?",
			type: "single_choice",
			required: true,
			options: ["Wedding", "Corporate Event", "Birthday", "Anniversary", "Other"],
		},
		{
			id: "2",
			question: "How many hours of photography service do you need?",
			type: "number",
			required: true,
		},
		{
			id: "3",
			question: "What specific photography styles are you looking for?",
			type: "multiple_choice",
			required: false,
			options: ["Traditional", "Candid", "Documentary", "Artistic", "Drone", "Other"],
		},
		{
			id: "4",
			question: "Do you need printed photos or digital copies?",
			type: "single_choice",
			required: true,
			options: ["Digital Only", "Printed Only", "Both Digital and Printed"],
		},
		{
			id: "5",
			question: "Any specific requirements or preferences?",
			type: "text",
			required: false,
		},
	])

	const [isCommissionDialogOpen, setIsCommissionDialogOpen] = useState(false)
	const [newLocationCommission, setNewLocationCommission] = useState({ location: "", commissionPercentage: 0 })

	// Handle adding a new location commission
	const handleAddLocationCommission = () => {
		if (!newLocationCommission.location || newLocationCommission.commissionPercentage <= 0) return

		setCategory({
			...category,
			locationCommissions: [...category.locationCommissions, { ...newLocationCommission }],
		})

		setNewLocationCommission({ location: "", commissionPercentage: 0 })
	}

	// Handle removing a location commission
	const handleRemoveLocationCommission = (location: string) => {
		setCategory({
			...category,
			locationCommissions: category.locationCommissions.filter((lc) => lc.location !== location),
		})
	}

	// Handle saving commission changes
	const handleSaveCommission = () => {
		setIsCommissionDialogOpen(false)
	}

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Link href="/admin/commission">
							<Button variant="outline" size="icon">
								<ArrowLeft className="h-4 w-4" />
							</Button>
						</Link>
						<h2 className="text-3xl font-bold tracking-tight">{category.name}</h2>
						<Badge variant={category.status === "active" ? "default" : "secondary"}>{category.status}</Badge>
					</div>
					<Button onClick={() => setIsCommissionDialogOpen(true)}>
						<Settings className="mr-2 h-4 w-4" />
						Manage Commissions
					</Button>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Category Details</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<h3 className="font-medium">Description</h3>
									<p className="text-sm text-muted-foreground">{category.description}</p>
								</div>
								<div>
									<h3 className="font-medium">Base Commission</h3>
									<p className="text-sm">{category.baseCommission}%</p>
								</div>
								{/* <div>
									<h3 className="font-medium">Location-specific Commissions</h3>
									{category.locationCommissions.length > 0 ? (
										<div className="text-sm space-y-1">
											{category.locationCommissions.map((lc) => (
												<div key={lc.location}>
													{lc.location}: {lc.commissionPercentage}%
												</div>
											))}
										</div>
									) : (
										<p className="text-sm text-muted-foreground">No location-specific commissions</p>
									)}
								</div> */}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Statistics</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Total Subcategories</p>
									<p className="text-2xl font-bold">{subcategories.length}</p>
								</div>
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Active Subcategories</p>
									<p className="text-2xl font-bold">{subcategories.filter((s) => s.status === "active").length}</p>
								</div>
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Total Questions</p>
									<p className="text-2xl font-bold">{questions.length}</p>
								</div>
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Required Questions</p>
									<p className="text-2xl font-bold">{questions.filter((q) => q.required).length}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>



				<div className="flex justify-end mt-12">
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Add Commission
					</Button>
				</div>
				<Card>
					<CardContent className="p-0">
						<ResponsiveTable>
							<ResponsiveTable.Header>
								<ResponsiveTable.Row>
									<ResponsiveTable.Head>Location</ResponsiveTable.Head>
									<ResponsiveTable.Head>Present</ResponsiveTable.Head>
									{/* <ResponsiveTable.Head>Status</ResponsiveTable.Head> */}
									<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
								</ResponsiveTable.Row>
							</ResponsiveTable.Header>
							<ResponsiveTable.Body>
								{category.locationCommissions.map((subcategory, ind) => (
									<ResponsiveTable.Row key={ind}>
										<ResponsiveTable.Cell className="font-medium">{subcategory.location}</ResponsiveTable.Cell>
										<ResponsiveTable.Cell>{subcategory.commissionPercentage} %</ResponsiveTable.Cell>
										{/* <ResponsiveTable.Cell>
													<Badge variant={subcategory.status === "active" ? "default" : "secondary"}>
														{subcategory.status}
													</Badge>
												</ResponsiveTable.Cell> */}
										<ResponsiveTable.Cell className="text-right">
											<div className="flex justify-end space-x-2">
												<Button variant="outline" size="icon" title="Edit">
													<Edit className="h-4 w-4" />
												</Button>
												<Button variant="outline" size="icon" title="Delete">
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

			{/* Commission Management Dialog */}
			<Dialog open={isCommissionDialogOpen} onOpenChange={setIsCommissionDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Manage Commissions for {category.name}</DialogTitle>
						<DialogDescription>Set the base commission and location-specific commission rates.</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="baseCommission" className="text-right">
								Base Commission (%)
							</Label>
							<Input
								id="baseCommission"
								type="number"
								value={category.baseCommission}
								onChange={(e) => setCategory({ ...category, baseCommission: Number(e.target.value) })}
								className="col-span-3"
							/>
						</div>

						<div className="grid grid-cols-4 items-start gap-4">
							<Label className="text-right pt-2">Location-specific Commissions</Label>
							<div className="col-span-3 space-y-4">
								{category.locationCommissions.map((lc, index) => (
									<div key={index} className="flex items-center space-x-2">
										<Input
											value={lc.location}
											onChange={(e) => {
												const updatedCommissions = [...category.locationCommissions]
												updatedCommissions[index].location = e.target.value
												setCategory({ ...category, locationCommissions: updatedCommissions })
											}}
											placeholder="Location"
											className="flex-1"
										/>
										<Input
											type="number"
											value={lc.commissionPercentage}
											onChange={(e) => {
												const updatedCommissions = [...category.locationCommissions]
												updatedCommissions[index].commissionPercentage = Number(e.target.value)
												setCategory({ ...category, locationCommissions: updatedCommissions })
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

