"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react"
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
import Link from "next/link"

// Define types for our data structure
type Question = {
	id: string
	text: string
}

type SubSubCategory = {
	id: string
	name: string
}

type SubCategory = {
	id: string
	name: string
	description: string
	icon: string
	vendors: number
	jobs: number
	status: "active" | "inactive"
	subcategories: SubSubCategory[]
	questions: Question[]
}

export default function CategoriesPage() {
	// Sample SubCategory data
	const [categories, setCategories] = useState<SubCategory[]>([
		{
			id: "1",
			name: "Daily Meal",
			description: "Catering services, food preparation, and event catering",
			icon: "🥗",
			vendors: 42,
			jobs: 156,
			status: "active",
			subcategories: [
				{ id: "1-1", name: "Wedding Cakes" },
				{ id: "1-2", name: "Birthday Cakes" },
			],
			questions: [
				{ id: "1-q1", text: "How many years of experience do you have in confectionery?" },
				{ id: "1-q2", text: "Do you offer customized cake designs?" },
			],
		},
		{
			id: "2",
			name: "Tiffin Services",
			description: "Professional photography services for events and occasions",
			icon: "🍽️",
			vendors: 38,
			jobs: 124,
			status: "active",
			subcategories: [
				{ id: "2-1", name: "Wedding Photography" },
				{ id: "2-2", name: "Portrait Photography" },
			],
			questions: [
				{ id: "2-q1", text: "What type of camera equipment do you use?" },
				{ id: "2-q2", text: "Can you provide a portfolio of your work?" },
			],
		},
		// ... other categories
	])

	const [newSubCategory, setNewSubCategory] = useState<Partial<SubCategory>>({
		name: "",
		description: "",
		icon: "",
		status: "active",
		subcategories: [],
		questions: [],
	})

	const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null)
	const [newSubSubCategory, setNewSubSubCategory] = useState("")
	const [newQuestion, setNewQuestion] = useState("")
	const [expandedSubCategory, setExpandedSubCategory] = useState<string | null>(null)

	const handleAddSubCategory = () => {
		if (newSubCategory?.name && newSubCategory.description) {
			setCategories([
				...categories,
				{
					...newSubCategory,
					id: (categories.length + 1).toString(),
					vendors: 0,
					jobs: 0,
					subcategories: [],
					questions: [],
				} as SubCategory,
			])
			setNewSubCategory({ name: "", description: "", icon: "", status: "active", subcategories: [], questions: [] })
		}
	}

	const handleEditSubCategory = (SubCategory: SubCategory) => {
		setEditingSubCategory(SubCategory)
	}

	const handleUpdateSubCategory = () => {
		if (editingSubCategory) {
			setCategories(categories.map((c) => (c.id === editingSubCategory.id ? editingSubCategory : c)))
			setEditingSubCategory(null)
		}
	}

	const handleAddSubSubCategory = () => {
		if (editingSubCategory && newSubSubCategory) {
			const updatedSubCategory = {
				...editingSubCategory,
				subcategories: [...editingSubCategory.subcategories, { id: Date.now().toString(), name: newSubSubCategory }],
			}
			setEditingSubCategory(updatedSubCategory)
			setNewSubSubCategory("")
		}
	}

	const handleAddQuestion = () => {
		if (editingSubCategory && newQuestion) {
			const updatedSubCategory = {
				...editingSubCategory,
				questions: [...editingSubCategory.questions, { id: Date.now().toString(), text: newQuestion }],
			}
			setEditingSubCategory(updatedSubCategory)
			setNewQuestion("")
		}
	}

	const handleDeleteSubSubCategory = (subSubCategoryId: string) => {
		if (editingSubCategory) {
			const updatedSubcategories = editingSubCategory.subcategories.filter((sub) => sub.id !== subSubCategoryId)
			setEditingSubCategory({ ...editingSubCategory, subcategories: updatedSubcategories })
		}
	}

	const handleDeleteQuestion = (questionId: string) => {
		if (editingSubCategory) {
			const updatedQuestions = editingSubCategory.questions.filter((q) => q.id !== questionId)
			setEditingSubCategory({ ...editingSubCategory, questions: updatedQuestions })
		}
	}

	const toggleSubCategoryExpansion = (SubCategoryId: string) => {
		setExpandedSubCategory(expandedSubCategory === SubCategoryId ? null : SubCategoryId)
	}

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Create SubCategories of <span className="text-red-500">FOOD SERVICES</span></h2>
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Add SubCategory
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add New SubCategory</DialogTitle>
								<DialogDescription>Create a new service SubCategory for vendors.</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">
										Name
									</Label>
									<Input
										id="name"
										value={newSubCategory.name}
										onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="description" className="text-right">
										Description
									</Label>
									<Textarea
										id="description"
										value={newSubCategory.description}
										onChange={(e) => setNewSubCategory({ ...newSubCategory, description: e.target.value })}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="icon" className="text-right">
										Icon
									</Label>
									<Input
										id="icon"
										value={newSubCategory.icon}
										onChange={(e) => setNewSubCategory({ ...newSubCategory, icon: e.target.value })}
										className="col-span-3"
										placeholder="Enter an emoji or icon"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="status" className="text-right">
										Status
									</Label>
									<Select
										onValueChange={(value) =>
											setNewSubCategory({ ...newSubCategory, status: value as "active" | "inactive" })
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
							<DialogFooter>
								<Button onClick={handleAddSubCategory}>Add SubCategory</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<div className="flex items-center space-x-2">
					<div className="relative w-full md:w-[300px]">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input type="search" placeholder="Search categories..." className="w-full pl-8" />
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{categories.map((SubCategory) => (
						<Card key={SubCategory.id}>
							<Link href='/admin/sub-categories/question'>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-xl font-bold">
										<span className="mr-2">{SubCategory.icon}</span>
										{SubCategory.name}
									</CardTitle>
									<Badge variant={SubCategory.status === "active" ? "default" : "secondary"}>{SubCategory.status}</Badge>
								</CardHeader>
							</Link>
							<CardContent>
								<p className="text-sm text-muted-foreground">{SubCategory.description}</p>
								{/* <div className="mt-4 flex space-x-4 text-sm">
									<div>
										<span className="font-medium">{SubCategory.vendors}</span>
										<span className="text-muted-foreground ml-1">vendors</span>
									</div>
									<div>
										<span className="font-medium">{SubCategory.jobs}</span>
										<span className="text-muted-foreground ml-1">jobs</span>
									</div>
								</div> */}
								{/* <Button
									variant="ghost"
									className="mt-4 w-full justify-between"
									onClick={() => toggleSubCategoryExpansion(SubCategory.id)}
								>
									{expandedSubCategory === SubCategory.id ? "Hide Details" : "Show Details"}
									{expandedSubCategory === SubCategory.id ? (
										<ChevronUp className="h-4 w-4" />
									) : (
										<ChevronDown className="h-4 w-4" />
									)}
								</Button> */}
								{/* {expandedSubCategory === SubCategory.id && (
									<div className="mt-4 space-y-4">
										<div>
											<h4 className="font-semibold">Subcategories:</h4>
											<ul className="list-disc list-inside">
												{SubCategory.subcategories.map((sub) => (
													<li key={sub.id}>{sub.name}</li>
												))}
											</ul>
										</div>
										<div>
											<h4 className="font-semibold">Profile Questions:</h4>
											<ul className="list-disc list-inside">
												{SubCategory.questions.map((q) => (
													<li key={q.id}>{q.text}</li>
												))}
											</ul>
										</div>
									</div>
								)} */}


							</CardContent>
							<CardFooter className="flex justify-end space-x-2">
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="ghost" size="icon">
											<Edit className="h-4 w-4" />
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-3xl">
										<DialogHeader>
											<DialogTitle>Edit SubCategory: {SubCategory.name}</DialogTitle>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="edit-name" className="text-right">
													Name
												</Label>
												<Input
													id="edit-name"
													value={editingSubCategory?.name || ""}
													onChange={(e) =>
														setEditingSubCategory((prev) => (prev ? { ...prev, name: e.target.value } : null))
													}
													className="col-span-3"
												/>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="edit-description" className="text-right">
													Description
												</Label>
												<Textarea
													id="edit-description"
													value={editingSubCategory?.description || ""}
													onChange={(e) =>
														setEditingSubCategory((prev) => (prev ? { ...prev, description: e.target.value } : null))
													}
													className="col-span-3"
												/>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="edit-icon" className="text-right">
													Icon
												</Label>
												<Input
													id="edit-icon"
													value={editingSubCategory?.icon || ""}
													onChange={(e) =>
														setEditingSubCategory((prev) => (prev ? { ...prev, icon: e.target.value } : null))
													}
													className="col-span-3"
												/>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="edit-status" className="text-right">
													Status
												</Label>
												<Select
													onValueChange={(value) =>
														setEditingSubCategory((prev) =>
															prev ? { ...prev, status: value as "active" | "inactive" } : null,
														)
													}
													defaultValue={editingSubCategory?.status}
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
										<DialogFooter>
											<Button onClick={handleUpdateSubCategory}>Save Changes</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
								<Button variant="ghost" size="icon">
									<Trash2 className="h-4 w-4" />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</AdminLayout >
	)
}

