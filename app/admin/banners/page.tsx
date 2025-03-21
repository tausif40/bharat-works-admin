"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ResponsiveTable } from "@/components/responsive-table"
import { Switch } from "@/components/ui/switch"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Define types for our data structure
type Banner = {
	id: string
	title: string
	description: string
	imageUrl: string
	category: string
	location: string
	startDate: string
	endDate: string
	status: "active" | "inactive"
	clicks: number
	impressions: number
}

export default function BannersPage() {
	// Sample banner data
	const [banners, setBanners] = useState<Banner[]>([
		{
			id: "1",
			title: "/admin/banners",
			description: "Get up to 50% off on all services this summer",
			imageUrl: "/placeholder.svg?height=200&width=600&text=Summer+Sale",
			category: "AC reaper",
			location: "Karnatak",
			startDate: "2023-06-01",
			endDate: "2023-08-31",
			status: "active",
			clicks: 1245,
			impressions: 15678,
		},
		{
			id: "2",
			title: "/admin/banners",
			description: "Special discount for new vendors joining our platform",
			imageUrl: "/placeholder.svg?height=200&width=600&text=New+Vendor+Offer",
			category: "Photographer",
			location: "Pune",
			startDate: "2023-07-15",
			endDate: "2023-10-15",
			status: "active",
			clicks: 876,
			impressions: 9876,
		},
		{
			id: "3",
			title: "/admin/banners",
			description: "Book early for the festive season and get special rates",
			imageUrl: "/placeholder.svg?height=200&width=600&text=Festive+Season",
			category: "-",
			location: "Haidrabad",
			startDate: "2023-09-01",
			endDate: "2023-12-31",
			status: "inactive",
			clicks: 0,
			impressions: 0,
		},
	])

	const [searchTerm, setSearchTerm] = useState("")
	const [categoryFilter, setCategoryFilter] = useState<string>("all")
	const [locationFilter, setLocationFilter] = useState<string>("all")
	const [statusFilter, setStatusFilter] = useState<string>("all")
	const [newBanner, setNewBanner] = useState<Partial<Banner>>({
		title: "",
		description: "",
		imageUrl: "",
		category: "",
		location: "",
		startDate: "",
		endDate: "",
		status: "inactive",
	})
	const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null)
	const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)

	// Get unique categories and locations for filters
	const categories = Array.from(new Set(banners.map((b) => b.category)))
	const locations = Array.from(new Set(banners.map((b) => b.location)))

	// Filter banners
	const filteredBanners = banners
		.filter((banner) => {
			const matchesSearch =
				banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				banner.description.toLowerCase().includes(searchTerm.toLowerCase())

			const matchesCategory = categoryFilter === "all" || banner.category === categoryFilter
			const matchesLocation = locationFilter === "all" || banner.location === locationFilter
			const matchesStatus = statusFilter === "all" || banner.status === statusFilter

			return matchesSearch && matchesCategory && matchesLocation && matchesStatus
		})
		.sort((a, b) => {
			// Sort by status first (active first), then by start date (newest first)
			if (a.status !== b.status) {
				return a.status === "active" ? -1 : 1
			}
			return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
		})

	const handleAddBanner = () => {
		if (newBanner.title && newBanner.imageUrl) {
			const banner: Banner = {
				id: (banners.length + 1).toString(),
				title: newBanner.title || "",
				description: newBanner.description || "",
				imageUrl: newBanner.imageUrl || "/placeholder.svg?height=200&width=600&text=Banner",
				category: newBanner.category || "General",
				location: newBanner.location || "Home Page",
				startDate: newBanner.startDate || new Date().toISOString().split("T")[0],
				endDate: newBanner.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
				status: (newBanner.status as "active" | "inactive") || "inactive",
				clicks: 0,
				impressions: 0,
			}

			setBanners([...banners, banner])
			setNewBanner({
				title: "",
				description: "",
				imageUrl: "",
				category: "",
				location: "",
				startDate: "",
				endDate: "",
				status: "inactive",
			})
		}
	}

	const handleUpdateBanner = () => {
		if (editingBanner) {
			setBanners(banners.map((b) => (b.id === editingBanner.id ? editingBanner : b)))
			setEditingBanner(null)
		}
	}

	const handleDeleteBanner = () => {
		if (selectedBanner) {
			setBanners(banners.filter((b) => b.id !== selectedBanner.id))
			setSelectedBanner(null)
			setIsDeleteDialogOpen(false)
		}
	}

	const handleToggleStatus = (banner: Banner) => {
		const updatedBanner = {
			...banner,
			status: banner.status === "active" ? "inactive" : "active",
		}
		setBanners(banners.map((b) => (b.id === banner.id ? updatedBanner : b)))
	}

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
					<h2 className="text-3xl font-bold tracking-tight">Banner Management</h2>
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Add Banner
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-3xl">
							<DialogHeader>
								<DialogTitle>Add New Banner</DialogTitle>
								<DialogDescription>Create a new banner for your platform.</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-2 gap-4">

								</div>


								{/* <div className="space-y-2">
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										value={newBanner.description}
										onChange={(e) => setNewBanner({ ...newBanner, description: e.target.value })}
										placeholder="Banner description"
									/>
								</div> */}

								<div className="grid grid-cols-2 gap-4">

									<div className="space-y-2">
										<Label htmlFor="category">Category</Label>
										<Input
											id="category"
											value={newBanner.category}
											onChange={(e) => setNewBanner({ ...newBanner, category: e.target.value })}
											placeholder="Banner category"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="location">Location</Label>
										<Input
											id="location"
											value={newBanner.location}
											onChange={(e) => setNewBanner({ ...newBanner, location: e.target.value })}
											placeholder="Banner location"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="title">Redirect to</Label>
										<Input
											id="title"
											value={newBanner.title}
											onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
											placeholder="URL"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="status">Status</Label>
										<Select
											value={newBanner.status}
											onValueChange={(value) => setNewBanner({ ...newBanner, status: value as "active" | "inactive" })}
										>
											<SelectTrigger id="status">
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="inactive">Inactive</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="startDate">Start Date</Label>
										<Input
											id="startDate"
											type="date"
											value={newBanner.startDate}
											onChange={(e) => setNewBanner({ ...newBanner, startDate: e.target.value })}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="endDate">End Date</Label>
										<Input
											id="endDate"
											type="date"
											value={newBanner.endDate}
											onChange={(e) => setNewBanner({ ...newBanner, endDate: e.target.value })}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="image">Banner Image</Label>
									<div className="flex items-center gap-2">
										<Input
											id="image"
											type="file"
											accept="image/*"
											className="flex-1"
											onChange={() =>
												setNewBanner({
													...newBanner,
													imageUrl: "/placeholder.svg?height=200&width=600&text=New+Banner",
												})
											}
										/>
									</div>
									{newBanner.imageUrl && (
										<div className="mt-2">
											<img
												src={newBanner.imageUrl || "/placeholder.svg"}
												alt="Banner preview"
												className="max-h-40 rounded-md border object-cover w-full"
											/>
										</div>
									)}
								</div>
							</div>
							<DialogFooter>
								<Button onClick={handleAddBanner}>Add Banner</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex w-full md:w-auto items-center space-x-2">
						<div className="relative w-full md:w-[300px]">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search banners..."
								className="w-full pl-8"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<Select value={categoryFilter} onValueChange={setCategoryFilter}>
							<SelectTrigger className="w-[150px]">
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
									{/* <ResponsiveTable.Head>Banner</ResponsiveTable.Head> */}
									<ResponsiveTable.Head>Category</ResponsiveTable.Head>
									<ResponsiveTable.Head>Location</ResponsiveTable.Head>
									<ResponsiveTable.Head>URL</ResponsiveTable.Head>
									<ResponsiveTable.Head>Duration</ResponsiveTable.Head>
									<ResponsiveTable.Head>Performance</ResponsiveTable.Head>
									<ResponsiveTable.Head>Status</ResponsiveTable.Head>
									<ResponsiveTable.Head className="text-right">Actions</ResponsiveTable.Head>
								</ResponsiveTable.Row>
							</ResponsiveTable.Header>
							<ResponsiveTable.Body>
								{filteredBanners.map((banner) => (
									<ResponsiveTable.Row key={banner.id}>
										{/* <ResponsiveTable.Cell>
											<div className="flex items-center space-x-3">
												<div className="h-12 w-20 rounded-md overflow-hidden">
													<img
														src={banner.imageUrl || "/placeholder.svg"}
														alt={banner.title}
														className="h-full w-full object-cover"
													/>
												</div>
												<div>
													<div className="font-medium">{banner.title}</div>
													<div className="text-xs text-muted-foreground line-clamp-1">{banner.description}</div>
												</div>
											</div>
										</ResponsiveTable.Cell> */}
										<ResponsiveTable.Cell>{banner.category}</ResponsiveTable.Cell>
										<ResponsiveTable.Cell>{banner.location}</ResponsiveTable.Cell>
										<ResponsiveTable.Cell className="cursor-pointer">Click</ResponsiveTable.Cell>
										<ResponsiveTable.Cell>
											<div className="text-sm">
												<div>{formatDate(banner.startDate)}</div>
												<div className="text-muted-foreground">to {formatDate(banner.endDate)}</div>
											</div>
										</ResponsiveTable.Cell>
										<ResponsiveTable.Cell>
											<div className="text-sm">
												<div>{banner.clicks} clicks</div>
												<div className="text-muted-foreground">{banner.impressions} impressions</div>
												{/* {banner.impressions > 0 && (
													<div className="text-xs text-primary">
														{((banner.clicks / banner.impressions) * 100).toFixed(2)}% CTR
													</div>
												)} */}
											</div>
										</ResponsiveTable.Cell>
										<ResponsiveTable.Cell>
											<div className="flex items-center space-x-2">
												<Switch
													checked={banner.status === "active"}
													onCheckedChange={() => handleToggleStatus(banner)}
												/>
												<Badge variant={banner.status === "active" ? "default" : "secondary"}>{banner.status}</Badge>
											</div>
										</ResponsiveTable.Cell>
										<ResponsiveTable.Cell className="text-right">
											<div className="flex justify-end space-x-1">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														setSelectedBanner(banner)
														setIsPreviewDialogOpen(true)
													}}
												>
													<Eye className="h-4 w-4" />
												</Button>
												<Dialog>
													<DialogTrigger asChild>
														<Button variant="ghost" size="icon" onClick={() => setEditingBanner(banner)}>
															<Edit className="h-4 w-4" />
														</Button>
													</DialogTrigger>
													<DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
														<DialogHeader>
															<DialogTitle>Edit Banner</DialogTitle>
														</DialogHeader>
														{editingBanner && (
															<div className="grid gap-4 py-4">
																<div className="grid grid-cols-2 gap-4">
																	{/* <div className="space-y-2">
																		<Label htmlFor="edit-title">Title</Label>
																		<Input
																			id="edit-title"
																			value={editingBanner.title}
																			onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
																		/>
																	</div> */}

																</div>
																<div className="space-y-4">
																	<Label htmlFor="edit-category">Category</Label>
																	<Input
																		id="edit-category"
																		value={editingBanner.category}
																		onChange={(e) => setEditingBanner({ ...editingBanner, category: e.target.value })}
																	/>
																</div>
																{/* <div className="space-y-2">
																	<Label htmlFor="edit-description">Description</Label>
																	<Textarea
																		id="edit-description"
																		value={editingBanner.description}
																		onChange={(e) =>
																			setEditingBanner({ ...editingBanner, description: e.target.value })
																		}
																	/>
																</div> */}

																<div className="grid grid-cols-2 gap-4">
																	<div className="space-y-2">
																		<Label htmlFor="edit-location">Location</Label>
																		<Input
																			id="edit-location"
																			value={editingBanner.location}
																			onChange={(e) => setEditingBanner({ ...editingBanner, location: e.target.value })}
																		/>
																	</div>
																	<div className="space-y-2">
																		<Label htmlFor="edit-status">Status</Label>
																		<Select
																			value={editingBanner.status}
																			onValueChange={(value) =>
																				setEditingBanner({ ...editingBanner, status: value as "active" | "inactive" })
																			}
																		>
																			<SelectTrigger id="edit-status">
																				<SelectValue placeholder="Select status" />
																			</SelectTrigger>
																			<SelectContent>
																				<SelectItem value="active">Active</SelectItem>
																				<SelectItem value="inactive">Inactive</SelectItem>
																			</SelectContent>
																		</Select>
																	</div>
																</div>

																<div className="grid grid-cols-2 gap-4">
																	<div className="space-y-2">
																		<Label htmlFor="edit-startDate">Start Date</Label>
																		<Input
																			id="edit-startDate"
																			type="date"
																			value={editingBanner.startDate}
																			onChange={(e) =>
																				setEditingBanner({ ...editingBanner, startDate: e.target.value })
																			}
																		/>
																	</div>
																	<div className="space-y-2">
																		<Label htmlFor="edit-endDate">End Date</Label>
																		<Input
																			id="edit-endDate"
																			type="date"
																			value={editingBanner.endDate}
																			onChange={(e) => setEditingBanner({ ...editingBanner, endDate: e.target.value })}
																		/>
																	</div>
																</div>

																<div className="space-y-2">
																	<Label htmlFor="edit-image">Banner Image</Label>
																	<div className="flex items-center gap-2">
																		<Input id="edit-image" type="file" accept="image/*" className="flex-1" />
																	</div>
																	<div className="mt-2">
																		<img
																			src={editingBanner.imageUrl || "/placeholder.svg"}
																			alt="Banner preview"
																			className="max-h-40 rounded-md border object-cover w-full"
																		/>
																	</div>
																</div>
															</div>
														)}
														<DialogFooter>
															<Button onClick={handleUpdateBanner}>Save Changes</Button>
														</DialogFooter>
													</DialogContent>
												</Dialog>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => {
														setSelectedBanner(banner)
														setIsDeleteDialogOpen(true)
													}}
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

			{/* Preview Dialog */}
			<Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
				<DialogContent className="max-w-3xl max-h-[90vh]">
					<DialogHeader>
						<DialogTitle>Banner Preview: {selectedBanner?.title}</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						{selectedBanner && (
							<div className="space-y-4">
								<div className="rounded-md overflow-hidden border">
									<img
										src={selectedBanner.imageUrl || "/placeholder.svg"}
										alt={selectedBanner.title}
										className="w-full object-cover h-52"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<p className="font-semibold">Category:</p>
										<p>{selectedBanner.category}</p>
									</div>
									<div>
										<p className="font-semibold">Location:</p>
										<p>{selectedBanner.location}</p>
									</div>
									<div>
										<p className="font-semibold">Redirect utl:</p>
										<p>{selectedBanner.title}</p>
									</div>
									<div>
										<p className="font-semibold">Status:</p>
										<Badge variant={selectedBanner.status === "active" ? "default" : "secondary"}>
											{selectedBanner.status}
										</Badge>
									</div>
									<div>
										<p className="font-semibold">Duration:</p>
										<p>
											{formatDate(selectedBanner.startDate)} to {formatDate(selectedBanner.endDate)}
										</p>
									</div>
									<div>
										<p className="font-semibold">Performance:</p>
										<p>
											{selectedBanner.clicks} clicks / {selectedBanner.impressions} impressions
										</p>
									</div>
									{/* <div className="col-span-2">
										<p className="font-semibold">Description:</p>
										<p>{selectedBanner.description}</p>
									</div> */}
								</div>
							</div>
						)}
					</div>
					<DialogFooter>
						<Button onClick={() => setIsPreviewDialogOpen(false)}>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the banner.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDeleteBanner}>Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</AdminLayout>
	)
}

