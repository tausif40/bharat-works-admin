"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

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
type Question = {
	id: number;
	question: string;
	options: string[];
	image: string;
};

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

	const initialData: Question[] = [
		{
			id: 1,
			question: 'What services are provided by Home Chefs Tiffin Services?',
			options: [
				"Daily meal tiffin services (veg, non-veg, Jain, diet meals)",
				"Subscription-based homemade food delivery",
				"Custom meal plans for students, professionals, and seniors",
				"All of the above"
			],
			image: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1741693115/Temp/ing2_ehwuy7.jpg',
		},
		{
			id: 2,
			question: "What is included in standard Tiffin Services?",
			options: [
				"Only vegetarian meals",
				"Daily meal services and diet plans",
				"Fast food delivery",
				"Meal plans only for students"
			],
			image: 'https://res.cloudinary.com/drfni1iqf/image/upload/v1741693114/Temp/img1_ogdxqn.webp',
		},
	];
	const [activeTab, setActiveTab] = useState("general")
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


	const [questions, setQuestions] = useState<Question[]>(initialData);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editText, setEditText] = useState('');

	const handleDelete = (id: number) => {
		setQuestions(prev => prev.filter(q => q.id !== id));
	};

	const handleUpdate = (id: number) => {
		setQuestions(prev =>
			prev.map(q =>
				q.id === id ? { ...q, question: editText || q.question } : q
			)
		);
		setEditingId(null);
		setEditText('');
	};

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-3xl font-bold tracking-tight">Create SubCategories of <span className="text-red-500">FOOD SERVICES / 🥗 Daily Meal</span></h2>
				</div>

				{/* <div className="flex items-center space-x-2">
					<div className="relative w-full md:w-[300px]">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input type="search" placeholder="Search categories..." className="w-full pl-8" />
					</div>
				</div> */}

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12">
					{categories.map((SubCategory) => (
						<Card key={SubCategory.id}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-xl font-bold">
									<span className="mr-2">{SubCategory.icon}</span>
									{SubCategory.name}
								</CardTitle>
								{/* <Badge variant={SubCategory.status === "active" ? "default" : "secondary"}>{SubCategory.status}</Badge> */}
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">{SubCategory.description}</p>


								<Dialog>
									<DialogTrigger asChild className="mt-4">
										<Button>
											{/* <Plus className="mr-2 h-4 w-4" /> */}
											Question for Customer
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Add New Question for Customer</DialogTitle>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="edit-name" className="text-right">
													Question
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
											<div className="grid grid-cols-4 items-start gap-4">
												<Label className="text-right">1. Options</Label>
												<div className="col-span-3 space-y-2">
													{editingSubCategory?.subcategories.map((sub) => (
														<div key={sub.id} className="flex items-center justify-between">
															<span>{sub.name}</span>
															<Button variant="ghost" size="sm" onClick={() => handleDeleteSubSubCategory(sub.id)}>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													))}
													<div className="flex items-center space-x-2">
														<Input
															value={newSubSubCategory}
															onChange={(e) => setNewSubSubCategory(e.target.value)}
															placeholder="New subSubCategory"
														/>
														<Button onClick={handleAddSubSubCategory}>Add</Button>
													</div>
												</div>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="edit-icon" className="text-right">
													Image
												</Label>
												<input
													type="file"
													id="edit-icon"
													value={editingSubCategory?.icon || ""}
													onChange={(e) =>
														setEditingSubCategory((prev) => (prev ? { ...prev, icon: e.target.value } : null))
													}
													className="col-span-3 border px-4 py-2 rounded-md"

												/>
											</div>
										</div>
										<DialogFooter>
											<Button onClick={handleAddSubCategory}>Add Question</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
								<Dialog>
									<DialogTrigger asChild className="mt-4">
										<Button>
											{/* <Plus className="mr-2 h-4 w-4" /> */}
											Question for Venders
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Add New Question for Venders</DialogTitle>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="edit-name" className="text-right">
													Question
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
											<div className="grid grid-cols-4 items-start gap-4">
												<Label className="text-right">1. Options</Label>
												<div className="col-span-3 space-y-2">
													{editingSubCategory?.subcategories.map((sub) => (
														<div key={sub.id} className="flex items-center justify-between">
															<span>{sub.name}</span>
															<Button variant="ghost" size="sm" onClick={() => handleDeleteSubSubCategory(sub.id)}>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													))}
													<div className="flex items-center space-x-2">
														<Input
															value={newSubSubCategory}
															onChange={(e) => setNewSubSubCategory(e.target.value)}
															placeholder="New subSubCategory"
														/>
														<Button onClick={handleAddSubSubCategory}>Add</Button>
													</div>
												</div>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="edit-icon" className="text-right">
													Image
												</Label>
												<input
													type="file"
													id="edit-icon"
													value={editingSubCategory?.icon || ""}
													onChange={(e) =>
														setEditingSubCategory((prev) => (prev ? { ...prev, icon: e.target.value } : null))
													}
													className="col-span-3 border px-4 py-2 rounded-md"

												/>
											</div>
										</div>
										<DialogFooter>
											<Button onClick={handleAddSubCategory}>Add Question</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>

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
							{/* <CardFooter className="flex justify-end space-x-2">
								<Button variant="ghost" size="icon">
									<Trash2 className="h-4 w-4" />
								</Button>
							</CardFooter> */}
						</Card>
					))}
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
					<TabsList>
						<TabsTrigger value="general">Customer</TabsTrigger>
						<TabsTrigger value="appearance">Vender</TabsTrigger>
					</TabsList>

					<TabsContent value="general">
						<Card>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
								{questions.map(q => (
									<div key={q.id} className="bg-white rounded-xl shadow-md p-4 border">
										<img src={q.image} alt="Question Image" className="rounded-lg mb-4 w-full h-40 object-cover" />

										{editingId === q.id ? (
											<input
												value={editText}
												onChange={e => setEditText(e.target.value)}
												className="w-full border rounded p-2 mb-2"
											/>
										) : (
											<h2 className="text-xl font-semibold mb-2">{q.question}</h2>
										)}

										<ul className="list-disc ml-5 mb-4 text-gray-700">
											{q.options.map((opt, i) => (
												<li key={i}>{opt}</li>
											))}
										</ul>

										<div className="flex gap-2">
											{editingId === q.id ? (
												<button
													onClick={() => handleUpdate(q.id)}
													className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
												>
													Save
												</button>
											) : (
												<button
													onClick={() => {
														setEditingId(q.id);
														setEditText(q.question);
													}}
													className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
												>
													Update
												</button>
											)}
											<button
												onClick={() => handleDelete(q.id)}
												className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
											>
												Delete
											</button>
										</div>
									</div>
								))}
							</div>
						</Card>
					</TabsContent>

					<TabsContent value="appearance">
						<Card>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
								{questions.map(q => (
									<div key={q.id} className="bg-white rounded-xl shadow-md p-4 border">
										<img src={q.image} alt="Question Image" className="rounded-lg mb-4 w-full h-40 object-cover" />

										{editingId === q.id ? (
											<input
												value={editText}
												onChange={e => setEditText(e.target.value)}
												className="w-full border rounded p-2 mb-2"
											/>
										) : (
											<h2 className="text-xl font-semibold mb-2">{q.question}</h2>
										)}

										<ul className="list-disc ml-5 mb-4 text-gray-700">
											{q.options.map((opt, i) => (
												<li key={i}>{opt}</li>
											))}
										</ul>

										<div className="flex gap-2">
											{editingId === q.id ? (
												<button
													onClick={() => handleUpdate(q.id)}
													className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
												>
													Save
												</button>
											) : (
												<button
													onClick={() => {
														setEditingId(q.id);
														setEditText(q.question);
													}}
													className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
												>
													Update
												</button>
											)}
											<button
												onClick={() => handleDelete(q.id)}
												className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
											>
												Delete
											</button>
										</div>
									</div>
								))}
							</div>
						</Card>
					</TabsContent>

				</Tabs>

			</div>
		</AdminLayout>
	)
}

