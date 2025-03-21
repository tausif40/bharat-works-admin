"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Plus, Trash2, FileTextIcon, Check } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import Link from "next/link"
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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Define types for our data structure
type ServiceOption = {
	id: string
	title: string
	description: string
	price: number
	currency: string
}

type CommonQuestion = {
	id: string
	text: string
	description?: string
	type:
	| "text"
	| "number"
	| "single_choice"
	| "multiple_choice"
	| "service_options"
	| "range"
	| "image_upload"
	| "team_members"
	| "package"
	| "description"
	| "conditional"
	| "range_select"
	required: boolean
	status: "active" | "inactive"
	options?: ServiceOption[]
}

type Subcategory = {
	id: string
	name: string
	description: string
	status: "active" | "inactive"
	icon?: string
}

type Category = {
	id: string
	name: string
	description: string
	status: "active" | "inactive"
	icon: string
	commonQuestions: CommonQuestion[]
}

export default function CategoryDetailsPage({ params }: { params: { id: string } }) {
	// const { id } = React.use(params);
	// Sample category data
	const [category, setCategory] = useState<Category>({
		id: params.id,
		name: params.id === "1" ? "Confectioner" : "Photographer",
		description:
			params.id === "1"
				? "Catering services, food preparation, and event catering"
				: "Professional photography services for events and occasions",
		status: "active",
		icon: params.id === "1" ? "🍰" : "📸",
		commonQuestions:
			params.id === "1"
				? [
					{
						id: "cq1",
						text: "Your Selected Services",
						description: "(You can update the price if needed; otherwise, you may proceed.)",
						type: "service_options",
						required: true,
						status: "active",
						options: [
							{
								id: "opt1",
								title: "Complete Menu For Wedding",
								description:
									"Indulge in a curated wedding feast with diverse flavors. Enjoy a customized menu crafted for a perfect celebration.",
								price: 3000,
								currency: "₹",
							},
							{
								id: "opt2",
								title: "Party Snacks",
								description:
									"Enjoy a variety of party snacks, including sandwiches, cupcakes, puri-sabji, and themed desserts. Perfect for adding flavor and fun to any celebration.",
								price: 2000,
								currency: "₹",
							},
						],
					},
					{
						id: "cq2",
						text: "What is your specialty?",
						type: "text",
						required: true,
						status: "active",
					},
				]
				: [
					{
						id: "cq3",
						text: "Your Selected Services",
						description: "(You can update the price if needed; otherwise, you may proceed.)",
						type: "service_options",
						required: true,
						status: "active",
						options: [
							{
								id: "opt3",
								title: "Full Day Photography",
								description:
									"Comprehensive photography coverage for your entire event, from preparation to conclusion.",
								price: 15000,
								currency: "₹",
							},
							{
								id: "opt4",
								title: "Portrait Session",
								description: "Professional portrait photography session with edited digital images included.",
								price: 5000,
								currency: "₹",
							},
						],
					},
					{
						id: "cq4",
						text: "Do you offer video services as well?",
						type: "single_choice",
						required: true,
						status: "active",
						options: [
							{ id: "yes", title: "Yes", description: "", price: 0, currency: "₹" },
							{ id: "no", title: "No", description: "", price: 0, currency: "₹" },
						],
					},
				],
	})

	// Sample subcategories
	const [subcategories, setSubcategories] = useState<Subcategory[]>([
		{
			id: "1",
			name: params.id === "1" ? "Wedding Cakes" : "Wedding Photography",
			description:
				params.id === "1"
					? "Custom cakes for weddings and related events"
					: "Professional photography for weddings and related events",
			status: "active",
			icon: params.id === "1" ? "🎂" : "📷",
		},
		{
			id: "2",
			name: params.id === "1" ? "Birthday Cakes" : "Event Photography",
			description:
				params.id === "1"
					? "Custom cakes for birthday celebrations"
					: "Photography services for corporate and social events",
			status: "active",
			icon: params.id === "1" ? "🧁" : "📸",
		},
		{
			id: "3",
			name: params.id === "1" ? "Pastries" : "Portrait Photography",
			description:
				params.id === "1" ? "Various pastries and baked goods" : "Professional portrait photography services",
			status: "active",
			icon: params.id === "1" ? "🥐" : "👤",
		},
		{
			id: "4",
			name: params.id === "1" ? "Cookies" : "Product Photography",
			description:
				params.id === "1"
					? "Custom cookies for all occasions"
					: "Photography services for product catalogs and e-commerce",
			status: "inactive",
			icon: params.id === "1" ? "🍪" : "📱",
		},
		{
			id: "5",
			name: params.id === "1" ? "Cupcakes" : "Real Estate Photography",
			description:
				params.id === "1" ? "Custom cupcakes for events and parties" : "Photography services for real estate listings",
			status: "active",
			icon: params.id === "1" ? "🧁" : "🏠",
		},
	])

	const [isAddSubcategoryDialogOpen, setIsAddSubcategoryDialogOpen] = useState(false)
	const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false)
	const [isEditQuestionDialogOpen, setIsEditQuestionDialogOpen] = useState(false)
	const [isDeleteQuestionDialogOpen, setIsDeleteQuestionDialogOpen] = useState(false)
	const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false)
	const [activeTab, setActiveTab] = useState("subcategories")
	const [terms, setTerms] = useState({
		title: "Terms and Conditions",
		content:
			"These are the terms and conditions for this service category. Vendors must agree to these terms before offering services in this category.",
	})

	const [newSubcategory, setNewSubcategory] = useState<Partial<Subcategory>>({
		name: "",
		description: "",
		status: "active",
		icon: "",
	})

	const [newQuestion, setNewQuestion] = useState<Partial<CommonQuestion>>({
		text: "",
		description: "",
		type: "text",
		required: true,
		status: "active",
	})

	const [newServiceOption, setNewServiceOption] = useState<Partial<ServiceOption>>({
		title: "",
		description: "",
		price: 0,
		currency: "₹",
	})

	const [selectedQuestion, setSelectedQuestion] = useState<CommonQuestion | null>(null)

	const handleAddSubcategory = () => {
		if (newSubcategory.name && newSubcategory.description) {
			const subcategory: Subcategory = {
				id: (subcategories.length + 1).toString(),
				name: newSubcategory.name,
				description: newSubcategory.description,
				status: newSubcategory.status as "active" | "inactive",
				icon: newSubcategory.icon,
			}

			setSubcategories([...subcategories, subcategory])
			setNewSubcategory({
				name: "",
				description: "",
				status: "active",
				icon: "",
			})
			setIsAddSubcategoryDialogOpen(false)
		}
	}

	const handleAddQuestion = () => {
		if (newQuestion.text) {
			const question: CommonQuestion = {
				id: Date.now().toString(),
				text: newQuestion.text,
				description: newQuestion.description,
				type: newQuestion.type as any,
				required: newQuestion.required || false,
				status: newQuestion.status as "active" | "inactive",
				options: newQuestion.type === "service_options" ? [] : undefined,
			}

			setCategory({
				...category,
				commonQuestions: [...category.commonQuestions, question],
			})

			setNewQuestion({
				text: "",
				description: "",
				type: "text",
				required: true,
				status: "active",
			})

			setIsAddQuestionDialogOpen(false)
		}
	}

	const handleAddServiceOption = (questionId: string) => {
		if (newServiceOption.title) {
			const option: ServiceOption = {
				id: Date.now().toString(),
				title: newServiceOption.title,
				description: newServiceOption.description || "",
				price: newServiceOption.price || 0,
				currency: newServiceOption.currency || "₹",
			}

			const updatedQuestions = category.commonQuestions.map((q) => {
				if (q.id === questionId) {
					return {
						...q,
						options: [...(q.options || []), option],
					}
				}
				return q
			})

			setCategory({
				...category,
				commonQuestions: updatedQuestions,
			})

			setNewServiceOption({
				title: "",
				description: "",
				price: 0,
				currency: "₹",
			})
		}
	}

	const handleUpdateQuestion = () => {
		if (selectedQuestion) {
			const updatedQuestions = category.commonQuestions.map((q) =>
				q.id === selectedQuestion.id ? selectedQuestion : q,
			)

			setCategory({
				...category,
				commonQuestions: updatedQuestions,
			})

			setIsEditQuestionDialogOpen(false)
			setSelectedQuestion(null)
		}
	}

	const handleDeleteQuestion = (questionId: string) => {
		const updatedQuestions = category.commonQuestions.filter((q) => q.id !== questionId)

		setCategory({
			...category,
			commonQuestions: updatedQuestions,
		})

		setIsDeleteQuestionDialogOpen(false)
	}

	const handleDeleteServiceOption = (questionId: string, optionId: string) => {
		const updatedQuestions = category.commonQuestions.map((q) => {
			if (q.id === questionId) {
				return {
					...q,
					options: q.options?.filter((opt) => opt.id !== optionId),
				}
			}
			return q
		})

		setCategory({
			...category,
			commonQuestions: updatedQuestions,
		})
	}

	const toggleQuestionStatus = (questionId: string) => {
		const updatedQuestions = category.commonQuestions.map((q) => {
			if (q.id === questionId) {
				return {
					...q,
					status: q.status === "active" ? "inactive" : "active",
				}
			}
			return q
		})

		setCategory({
			...category,
			commonQuestions: updatedQuestions,
		})
	}

	const renderQuestionPreview = (question: CommonQuestion) => {
		switch (question.type) {
			case "text":
				return <Input placeholder="Enter your answer" disabled className="max-w-md" />

			case "number":
				return <Input type="number" placeholder="0" disabled className="max-w-md" />

			case "single_choice":
				return (
					<div className="space-y-2 max-w-md">
						{question.options?.map((option) => (
							<div key={option.id} className="flex items-center space-x-2 border p-2 rounded-md">
								<input type="radio" id={option.id} name={question.id} disabled />
								<Label htmlFor={option.id}>{option.title}</Label>
							</div>
						))}
					</div>
				)

			case "multiple_choice":
				return (
					<div className="space-y-2 max-w-md">
						{question.options?.map((option) => (
							<div key={option.id} className="flex items-center space-x-2 border p-2 rounded-md">
								<input type="checkbox" id={option.id} disabled />
								<Label htmlFor={option.id}>{option.title}</Label>
							</div>
						))}
					</div>
				)

			case "service_options":
				return (
					<div className="space-y-4 max-w-2xl">
						{question.options?.map((option) => (
							<div key={option.id} className="border rounded-md p-4 relative">
								<div className="absolute top-4 right-4">
									<div className="w-6 h-6 border rounded-md flex items-center justify-center bg-green-600 text-white">
										<Check className="h-4 w-4" />
									</div>
								</div>
								<div className="pr-8">
									<h4 className="font-medium text-lg">{option.title}</h4>
									<p className="text-muted-foreground text-sm mt-1 italic">{option.description}</p>

									<div className="mt-4 pt-4 border-t">
										<h5 className="font-medium">Pricing Details</h5>
										<div className="mt-2">
											<Label htmlFor={`price-${option.id}`} className="text-sm">
												What is your price for the initial service?
											</Label>
											<div className="flex items-center mt-1">
												<span className="mr-2">{option.currency}</span>
												<Input
													id={`price-${option.id}`}
													value={option.price.toString()}
													className="max-w-[200px]"
													disabled
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)

			default:
				return <div>Unsupported question type</div>
		}
	}

	return (
		<AdminLayout>
			<div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Link href="/admin/categories">
							<Button variant="outline" size="icon">
								<ArrowLeft className="h-4 w-4" />
							</Button>
						</Link>
						<h2 className="text-3xl font-bold tracking-tight">
							<span className="mr-2">{category.icon}</span>
							{category.name}
						</h2>
						<Badge variant={category.status === "active" ? "default" : "secondary"}>{category.status}</Badge>
					</div>
					<div className="flex space-x-2">
						<Button variant="outline" onClick={() => setIsTermsDialogOpen(true)}>
							<FileTextIcon className="mr-2 h-4 w-4" />
							Terms & Conditions
						</Button>
					</div>
				</div>

				<div className="mb-6">
					<p className="text-muted-foreground">{category.description}</p>
				</div>

				<Tabs defaultValue="subcategories" className="space-y-4" onValueChange={setActiveTab}>
					<div className="flex justify-between items-center">
						<TabsList>
							<TabsTrigger value="subcategories">Subcategories</TabsTrigger>
							<TabsTrigger value="questions">Common Questions</TabsTrigger>
						</TabsList>
						{activeTab === "subcategories" ? (
							<Button onClick={() => setIsAddSubcategoryDialogOpen(true)}>
								<Plus className="mr-2 h-4 w-4" />
								Add Subcategory
							</Button>
						) : (
							<Button onClick={() => setIsAddQuestionDialogOpen(true)}>
								<Plus className="mr-2 h-4 w-4" />
								Add Question
							</Button>
						)}
					</div>

					<TabsContent value="subcategories" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{subcategories.map((subcategory) => (
								<Link href={`/admin/categories/${params.id}/subcategories/${subcategory.id}`} key={subcategory.id}>
									<Card className="hover:shadow-md transition-shadow h-full">
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-lg font-bold">
												{subcategory.icon && <span className="mr-2">{subcategory.icon}</span>}
												{subcategory.name}
											</CardTitle>
											<Badge variant={subcategory.status === "active" ? "default" : "secondary"}>
												{subcategory.status}
											</Badge>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-muted-foreground">{subcategory.description}</p>
											<div className="mt-4 flex justify-between items-center">
												<span className="text-sm text-primary">View details</span>
												<div className="flex space-x-1">
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8"
														onClick={(e) => {
															e.preventDefault()
															// Edit functionality would go here
														}}
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														className="h-8 w-8"
														onClick={(e) => {
															e.preventDefault()
															// Delete functionality would go here
														}}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					</TabsContent>

					<TabsContent value="questions" className="space-y-6">
						<div className="grid gap-6">
							{category.commonQuestions.map((question) => (
								<Card key={question.id} className="overflow-hidden">
									<CardHeader className="pb-3">
										<div className="flex justify-between items-start">
											<div>
												<CardTitle className="text-lg font-medium">
													{question.text}
													{question.required && <span className="text-red-500 ml-1">*</span>}
												</CardTitle>
												{question.description && (
													<p className="text-sm text-muted-foreground mt-1">{question.description}</p>
												)}
											</div>
											<div className="flex items-center space-x-2">
												<Badge variant={question.status === "active" ? "default" : "secondary"}>
													{question.status}
												</Badge>
												<Button variant="outline" size="sm" onClick={() => toggleQuestionStatus(question.id)}>
													{question.status === "active" ? "Deactivate" : "Activate"}
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8"
													onClick={() => {
														setSelectedQuestion(question)
														setIsEditQuestionDialogOpen(true)
													}}
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8"
													onClick={() => {
														setSelectedQuestion(question)
														setIsDeleteQuestionDialogOpen(true)
													}}
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</CardHeader>
									<CardContent className="pb-6">
										<div className="text-sm text-muted-foreground mb-4">
											Type: <Badge variant="outline">{question.type}</Badge>
										</div>

										<div className="mt-4">
											<Accordion type="single" collapsible>
												<AccordionItem value="preview">
													<AccordionTrigger>Question Preview</AccordionTrigger>
													<AccordionContent>
														<div className="p-4 border rounded-md bg-muted/30">{renderQuestionPreview(question)}</div>
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										</div>

										{question.type === "service_options" && (
											<div className="mt-4">
												<Accordion type="single" collapsible>
													<AccordionItem value="options">
														<AccordionTrigger>Manage Options</AccordionTrigger>
														<AccordionContent>
															<div className="space-y-4">
																{question.options?.map((option) => (
																	<div
																		key={option.id}
																		className="flex justify-between items-start border p-3 rounded-md"
																	>
																		<div>
																			<div className="font-medium">{option.title}</div>
																			<div className="text-sm text-muted-foreground">{option.description}</div>
																			<div className="text-sm font-medium mt-1">
																				{option.currency}
																				{option.price}
																			</div>
																		</div>
																		<Button
																			variant="ghost"
																			size="sm"
																			onClick={() => handleDeleteServiceOption(question.id, option.id)}
																		>
																			<Trash2 className="h-4 w-4" />
																		</Button>
																	</div>
																))}

																<div className="border-t pt-4 mt-4">
																	<h4 className="font-medium mb-2">Add New Option</h4>
																	<div className="space-y-3">
																		<Input
																			placeholder="Option Title"
																			value={newServiceOption.title}
																			onChange={(e) =>
																				setNewServiceOption({ ...newServiceOption, title: e.target.value })
																			}
																		/>
																		<Textarea
																			placeholder="Option Description"
																			value={newServiceOption.description}
																			onChange={(e) =>
																				setNewServiceOption({ ...newServiceOption, description: e.target.value })
																			}
																		/>
																		<div className="flex space-x-2">
																			<div className="w-1/4">
																				<Input
																					placeholder="Currency"
																					value={newServiceOption.currency}
																					onChange={(e) =>
																						setNewServiceOption({ ...newServiceOption, currency: e.target.value })
																					}
																				/>
																			</div>
																			<div className="flex-1">
																				<Input
																					type="number"
																					placeholder="Price"
																					value={newServiceOption.price?.toString()}
																					onChange={(e) =>
																						setNewServiceOption({ ...newServiceOption, price: Number(e.target.value) })
																					}
																				/>
																			</div>
																		</div>
																		<Button
																			onClick={() => handleAddServiceOption(question.id)}
																			disabled={!newServiceOption.title}
																		>
																			Add Option
																		</Button>
																	</div>
																</div>
															</div>
														</AccordionContent>
													</AccordionItem>
												</Accordion>
											</div>
										)}
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>

			{/* Terms and Conditions Dialog */}
			<Dialog open={isTermsDialogOpen} onOpenChange={setIsTermsDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>{terms.title}</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<Textarea
							value={terms.content}
							onChange={(e) => setTerms({ ...terms, content: e.target.value })}
							className="min-h-[200px]"
						/>
					</div>
					<DialogFooter>
						<Button onClick={() => setIsTermsDialogOpen(false)}>Close</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Add Subcategory Dialog */}
			<Dialog open={isAddSubcategoryDialogOpen} onOpenChange={setIsAddSubcategoryDialogOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Add New Subcategory</DialogTitle>
						<DialogDescription>Create a new subcategory for {category.name}</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="subcategory-name" className="text-right">
								Name
							</Label>
							<Input
								id="subcategory-name"
								value={newSubcategory.name}
								onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
								className="col-span-3"
							/>
						</div>

						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="subcategory-description" className="text-right">
								Description
							</Label>
							<Textarea
								id="subcategory-description"
								value={newSubcategory.description}
								onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
								className="col-span-3"
							/>
						</div>

						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="subcategory-icon" className="text-right">
								Icon
							</Label>
							<Input
								id="subcategory-icon"
								value={newSubcategory.icon}
								onChange={(e) => setNewSubcategory({ ...newSubcategory, icon: e.target.value })}
								className="col-span-3"
								placeholder="Enter an emoji or icon"
							/>
						</div>
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsAddSubcategoryDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleAddSubcategory}>Add Subcategory</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Add Question Dialog */}
			<Dialog open={isAddQuestionDialogOpen} onOpenChange={setIsAddQuestionDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Add Common Question</DialogTitle>
						<DialogDescription>Create a new common question for {category.name} category</DialogDescription>
					</DialogHeader>

					<ScrollArea className="max-h-[60vh]">
						<div className="grid gap-6 py-4 px-1">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="question-text" className="text-right">
									Question Text
								</Label>
								<div className="col-span-3">
									<Input
										id="question-text"
										value={newQuestion.text}
										onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
										placeholder="Enter your question here"
									/>
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="question-description" className="text-right">
									Description
								</Label>
								<div className="col-span-3">
									<Textarea
										id="question-description"
										value={newQuestion.description}
										onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
										placeholder="Optional description or instructions"
									/>
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="question-type" className="text-right">
									Answer Type
								</Label>
								<div className="col-span-3">
									<Select
										value={newQuestion.type}
										onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value as any })}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select answer type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="text">Text Input</SelectItem>
											<SelectItem value="number">Number Input</SelectItem>
											<SelectItem value="single_choice">Single Choice</SelectItem>
											<SelectItem value="multiple_choice">Multiple Choice</SelectItem>
											<SelectItem value="service_options">Service Options</SelectItem>
											<SelectItem value="range">Range Slider</SelectItem>
											<SelectItem value="image_upload">Image Upload</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label className="text-right">Required</Label>
								<div className="flex items-center space-x-2 col-span-3">
									<Select
										value={newQuestion.required ? "yes" : "no"}
										onValueChange={(value) => setNewQuestion({ ...newQuestion, required: value === "yes" })}
									>
										<SelectTrigger>
											<SelectValue placeholder="Is this required?" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="yes">Yes</SelectItem>
											<SelectItem value="no">No</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label className="text-right">Status</Label>
								<div className="flex items-center space-x-2 col-span-3">
									<Select
										value={newQuestion.status}
										onValueChange={(value) =>
											setNewQuestion({ ...newQuestion, status: value as "active" | "inactive" })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="active">Active</SelectItem>
											<SelectItem value="inactive">Inactive</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
					</ScrollArea>

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsAddQuestionDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleAddQuestion} disabled={!newQuestion.text}>
							Add Question
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Edit Question Dialog */}
			<Dialog
				open={isEditQuestionDialogOpen}
				onOpenChange={(open) => {
					if (!open) {
						setIsEditQuestionDialogOpen(false)
						setSelectedQuestion(null)
					}
				}}
			>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Edit Question</DialogTitle>
						<DialogDescription>Update the question details</DialogDescription>
					</DialogHeader>

					{selectedQuestion && (
						<ScrollArea className="max-h-[60vh]">
							<div className="grid gap-6 py-4 px-1">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="edit-question-text" className="text-right">
										Question Text
									</Label>
									<div className="col-span-3">
										<Input
											id="edit-question-text"
											value={selectedQuestion.text}
											onChange={(e) => setSelectedQuestion({ ...selectedQuestion, text: e.target.value })}
											placeholder="Enter your question here"
										/>
									</div>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="edit-question-description" className="text-right">
										Description
									</Label>
									<div className="col-span-3">
										<Textarea
											id="edit-question-description"
											value={selectedQuestion.description || ""}
											onChange={(e) => setSelectedQuestion({ ...selectedQuestion, description: e.target.value })}
											placeholder="Optional description or instructions"
										/>
									</div>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label className="text-right">Required</Label>
									<div className="flex items-center space-x-2 col-span-3">
										<Select
											value={selectedQuestion.required ? "yes" : "no"}
											onValueChange={(value) => setSelectedQuestion({ ...selectedQuestion, required: value === "yes" })}
										>
											<SelectTrigger>
												<SelectValue placeholder="Is this required?" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="yes">Yes</SelectItem>
												<SelectItem value="no">No</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label className="text-right">Status</Label>
									<div className="flex items-center space-x-2 col-span-3">
										<Select
											value={selectedQuestion.status}
											onValueChange={(value) =>
												setSelectedQuestion({ ...selectedQuestion, status: value as "active" | "inactive" })
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="inactive">Inactive</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						</ScrollArea>
					)}

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsEditQuestionDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleUpdateQuestion}>Update Question</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Question Dialog */}
			<Dialog
				open={isDeleteQuestionDialogOpen}
				onOpenChange={(open) => {
					if (!open) {
						setIsDeleteQuestionDialogOpen(false)
						setSelectedQuestion(null)
					}
				}}
			>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>Delete Question</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this question? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>

					{selectedQuestion && (
						<div className="py-4">
							<p className="font-medium">{selectedQuestion.text}</p>
							{selectedQuestion.description && (
								<p className="text-sm text-muted-foreground mt-1">{selectedQuestion.description}</p>
							)}
						</div>
					)}

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDeleteQuestionDialogOpen(false)}>
							Cancel
						</Button>
						<Button variant="destructive" onClick={() => selectedQuestion && handleDeleteQuestion(selectedQuestion.id)}>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminLayout>
	)
}

