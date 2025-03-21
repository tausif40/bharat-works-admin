"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
	ArrowLeft,
	Image,
	Upload,
	Users,
	Package,
	FileText,
	Check,
	X,
	Plus,
	Edit,
	Trash2,
	ArrowRight,
	ArrowLeftIcon,
	FileTextIcon as FileText2,
} from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define types for our data structure
type ServiceOption = {
	id: string
	title: string
	description: string
	price: number
	currency: string
	imageUrl?: string
	answerType?: string
}

type CommonQuestion = {
	id: string
	text: string
	description: string
	price: number
	currency: string
}

type Subcategory = {
	id: string
	name: string
	description: string
	status: "active" | "inactive"
	icon?: string
	customerQuestions: Question[]
	vendorQuestions: Question[]
}

type QuestionCondition = {
	dependsOn?: string
	requiredAnswer?: string | string[]
}

type QuestionPage = {
	id: string
	title: string
	questions: string[] // IDs of questions on this page
}

type Question = {
	id: string
	text: string
	type:
	| "text"
	| "number"
	| "single_choice"
	| "multiple_choice"
	| "range"
	| "image_upload"
	| "team_members"
	| "package"
	| "description"
	| "conditional"
	| "range_select"
	| "service_options"
	| "add_price"
	required: boolean
	options?: string[] | ServiceOption[]
	imageUrl?: string
	minValue?: number
	maxValue?: number
	maxImages?: number
	condition?: QuestionCondition
	subQuestions?: Question[]
	rangeOptions?: {
		ranges: {
			name: string
			min: number
			max: number
			step: number
			unit?: string
		}[]
	}
	pageId?: string
	status?: "active" | "inactive"
	description?: string
	price?: number
	currency?: string
}

export default function SubcategoryDetailsPage({ params }: { params: { id: string; subId: string } }) {
	// Sample category common questions
	const [categoryCommonQuestions, setCategoryCommonQuestions] = useState<CommonQuestion[]>(
		params.id === "1"
			? [
				{
					id: "cq1",
					text: "Your Selected Services",
					description: "(You can update the price if needed; otherwise, you may proceed.)",
					price: 3000,
					currency: "₹",
				},
				{
					id: "cq2",
					text: "What is your specialty?",
					description: "",
					price: 0,
					currency: "₹",
				},
			]
			: [
				{
					id: "cq3",
					text: "Your Selected Services",
					description: "(You can update the price if needed; otherwise, you may proceed.)",
					price: 15000,
					currency: "₹",
				},
				{
					id: "cq4",
					text: "Do you offer video services as well?",
					description: "",
					price: 0,
					currency: "₹",
				},
			],
	)

	// Sample subcategory data
	const [subcategory, setSubcategory] = useState<Subcategory>({
		id: params.subId,
		name:
			params.id === "1" && params.subId === "1"
				? "Wedding Cakes"
				: params.id === "1" && params.subId === "2"
					? "Birthday Cakes"
					: params.id === "2" && params.subId === "1"
						? "Wedding Photography"
						: "Event Photography",
		description: params.id === "1" ? "Custom cakes for special occasions" : "Professional photography services",
		status: "active",
		icon: params.id === "1" ? "🎂" : "📸",
		customerQuestions: [
			{
				id: "c1",
				text: "What is your budget?",
				type: "number",
				required: true,
				pageId: "page1",
				status: "active",
			},
			{
				id: "c2",
				text: "When do you need this service?",
				type: "text",
				required: true,
				pageId: "page1",
				status: "active",
			},
			{
				id: "c3",
				text: "Do you have team members?",
				type: "conditional",
				required: true,
				options: ["Yes", "No"],
				pageId: "page1",
				status: "active",
				subQuestions: [
					{
						id: "c3-sub1",
						text: "Add your team members",
						type: "team_members",
						required: true,
						condition: {
							dependsOn: "c3",
							requiredAnswer: "Yes",
						},
					},
				],
			},
			{
				id: "c4",
				text: "Any special requirements?",
				type: "text",
				required: false,
				pageId: "page1",
				status: "active",
			},
			{
				id: "c5",
				text: "What is your preferred design style?",
				type: "single_choice",
				required: true,
				options: ["Modern", "Classic", "Rustic", "Minimalist", "Other"],
				pageId: "page2",
				status: "active",
			},
			{
				id: "c6",
				text: "How many guests are you expecting?",
				type: "number",
				required: true,
				pageId: "page2",
				status: "active",
			},
			{
				id: "c7",
				text: "Do you have any dietary restrictions?",
				type: "multiple_choice",
				required: false,
				options: ["Gluten-free", "Nut-free", "Vegan", "Dairy-free", "None"],
				pageId: "page2",
				status: "active",
			},
			{
				id: "c8",
				text: "Upload reference images (if any)",
				type: "image_upload",
				required: false,
				maxImages: 3,
				pageId: "page2",
				status: "active",
			},
			{
				id: "c9",
				text: "Additional notes",
				type: "description",
				required: false,
				pageId: "page2",
				status: "active",
			},
		],
		vendorQuestions: [
			{
				id: "v1",
				text: "How many years of experience do you have?",
				type: "range_select",
				required: true,
				rangeOptions: {
					ranges: [
						{
							name: "Years",
							min: 0,
							max: 20,
							step: 1,
							unit: "years",
						},
						{
							name: "Months",
							min: 0,
							max: 11,
							step: 1,
							unit: "months",
						},
					],
				},
				pageId: "page1",
				status: "active",
			},
			{
				id: "v2",
				text: "Do you have a portfolio?",
				type: "image_upload",
				required: true,
				maxImages: 5,
				pageId: "page1",
				status: "active",
			},
		],
	})

	// Define question pages
	const [customerPages, setCustomerPages] = useState<QuestionPage[]>([
		{
			id: "page1",
			title: "page 1",
			questions: ["c1", "c2", "c3", "c4"],
		},
		{
			id: "page2",
			title: "page2",
			questions: ["c5", "c6", "c7", "c8", "c9"],
		},
	])

	const [vendorPages, setVendorPages] = useState<QuestionPage[]>([
		{
			id: "page1",
			title: "Vendor Information",
			questions: ["v1", "v2"],
		},
	])

	const [isAddCustomerQuestionDialogOpen, setIsAddCustomerQuestionDialogOpen] = useState(false)
	const [isAddVendorQuestionDialogOpen, setIsAddVendorQuestionDialogOpen] = useState(false)
	const [isEditQuestionDialogOpen, setIsEditQuestionDialogOpen] = useState(false)
	const [isDeleteQuestionDialogOpen, setIsDeleteQuestionDialogOpen] = useState(false)
	const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false)
	const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
		text: "",
		type: "text",
		required: true,
		pageId: "page1",
		status: "active",
	})
	const [activeTab, setActiveTab] = useState("customer")
	const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
	const [isPreviewMode, setIsPreviewMode] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [terms, setTerms] = useState({
		title: "Terms and Conditions",
		content:
			"These are the terms and conditions for this service category. Vendors must agree to these terms before offering services in this category.",
	})
	const [mainTab, setMainTab] = useState("questions")
	const [newServiceOption, setNewServiceOption] = useState<Partial<ServiceOption>>({
		title: "",
		description: "",
		price: 0,
		currency: "₹",
	})
	const [selectedCommonQuestion, setSelectedCommonQuestion] = useState<CommonQuestion | null>(null)
	const [isEditCommonQuestionDialogOpen, setIsEditCommonQuestionDialogOpen] = useState(false)

	// Get current page questions based on active tab and current page index
	const getCurrentPageQuestions = () => {
		const pages = activeTab === "customer" ? customerPages : vendorPages
		const currentPageId = pages[currentPage]?.id

		const allQuestions = activeTab === "customer" ? subcategory.customerQuestions : subcategory.vendorQuestions

		return allQuestions.filter((q) => q.pageId === currentPageId)
	}

	const handleAddQuestion = (forCustomer: boolean) => {
		if (!newQuestion.text || !newQuestion.type) return

		const question: Question = {
			id: Date.now().toString(),
			text: newQuestion.text,
			type: newQuestion.type as any,
			required: newQuestion.required || false,
			options: newQuestion.options,
			imageUrl: newQuestion.imageUrl,
			minValue: newQuestion.minValue,
			maxValue: newQuestion.maxValue,
			maxImages: newQuestion.maxImages,
			subQuestions: newQuestion.subQuestions,
			rangeOptions: newQuestion.rangeOptions,
			pageId: newQuestion.pageId,
			status: newQuestion.status as "active" | "inactive",
			description: newQuestion.description,
		}

		if (forCustomer) {
			setSubcategory({
				...subcategory,
				customerQuestions: [...subcategory.customerQuestions, question],
			})

			// Add question ID to the page
			const updatedPages = [...customerPages]
			const pageIndex = updatedPages.findIndex((p) => p.id === question.pageId)
			if (pageIndex !== -1) {
				updatedPages[pageIndex].questions.push(question.id)
				setCustomerPages(updatedPages)
			}

			setIsAddCustomerQuestionDialogOpen(false)
		} else {
			setSubcategory({
				...subcategory,
				vendorQuestions: [...subcategory.vendorQuestions, question],
			})

			// Add question ID to the page
			const updatedPages = [...vendorPages]
			const pageIndex = updatedPages.findIndex((p) => p.id === question.pageId)
			if (pageIndex !== -1) {
				updatedPages[pageIndex].questions.push(question.id)
				setVendorPages(updatedPages)
			}

			setIsAddVendorQuestionDialogOpen(false)
		}

		setNewQuestion({
			text: "",
			type: "text",
			required: true,
			pageId: "page1",
			status: "active",
		})
	}

	const handleUpdateQuestion = () => {
		if (!selectedQuestion || !selectedQuestion.id) return

		const isCustomer = subcategory.customerQuestions.some((q) => q.id === selectedQuestion.id)

		if (isCustomer) {
			const updatedQuestions = subcategory.customerQuestions.map((q) =>
				q.id === selectedQuestion.id ? selectedQuestion : q,
			)
			setSubcategory({
				...subcategory,
				customerQuestions: updatedQuestions,
			})
		} else {
			const updatedQuestions = subcategory.vendorQuestions.map((q) =>
				q.id === selectedQuestion.id ? selectedQuestion : q,
			)
			setSubcategory({
				...subcategory,
				vendorQuestions: updatedQuestions,
			})
		}

		setIsEditQuestionDialogOpen(false)
		setSelectedQuestion(null)
	}

	const handleDeleteQuestion = () => {
		if (!selectedQuestion) return

		const isCustomer = subcategory.customerQuestions.some((q) => q.id === selectedQuestion.id)

		if (isCustomer) {
			const updatedQuestions = subcategory.customerQuestions.filter((q) => q.id !== selectedQuestion.id)
			setSubcategory({
				...subcategory,
				customerQuestions: updatedQuestions,
			})

			// Remove question ID from the page
			const updatedPages = [...customerPages]
			const pageIndex = updatedPages.findIndex((p) => p.id === selectedQuestion.pageId)
			if (pageIndex !== -1) {
				updatedPages[pageIndex].questions = updatedPages[pageIndex].questions.filter((id) => id !== selectedQuestion.id)
				setCustomerPages(updatedPages)
			}
		} else {
			const updatedQuestions = subcategory.vendorQuestions.filter((q) => q.id !== selectedQuestion.id)
			setSubcategory({
				...subcategory,
				vendorQuestions: updatedQuestions,
			})

			// Remove question ID from the page
			const updatedPages = [...vendorPages]
			const pageIndex = updatedPages.findIndex((p) => p.id === selectedQuestion.pageId)
			if (pageIndex !== -1) {
				updatedPages[pageIndex].questions = updatedPages[pageIndex].questions.filter((id) => id !== selectedQuestion.id)
				setVendorPages(updatedPages)
			}
		}

		setIsDeleteQuestionDialogOpen(false)
		setSelectedQuestion(null)
	}

	const toggleQuestionStatus = (question: Question) => {
		const isCustomer = subcategory.customerQuestions.some((q) => q.id === question.id)

		const updatedQuestion = {
			...question,
			status: question.status === "active" ? "inactive" : "active",
		}

		if (isCustomer) {
			const updatedQuestions = subcategory.customerQuestions.map((q) => (q.id === question.id ? updatedQuestion : q))
			setSubcategory({
				...subcategory,
				customerQuestions: updatedQuestions,
			})
		} else {
			const updatedQuestions = subcategory.vendorQuestions.map((q) => (q.id === question.id ? updatedQuestion : q))
			setSubcategory({
				...subcategory,
				vendorQuestions: updatedQuestions,
			})
		}
	}

	const toggleCommonQuestionStatus = (questionId: string) => {
		const updatedQuestions = categoryCommonQuestions.map((q) => {
			if (q.id === questionId) {
				return {
					...q,
					status: q.status === "active" ? "inactive" : "active",
				}
			}
			return q
		})

		setCategoryCommonQuestions(updatedQuestions)
	}

	const handleUpdateCommonQuestion = () => {
		if (selectedCommonQuestion) {
			const updatedQuestions = categoryCommonQuestions.map((q) =>
				q.id === selectedCommonQuestion.id ? selectedCommonQuestion : q,
			)

			setCategoryCommonQuestions(updatedQuestions)
			setIsEditCommonQuestionDialogOpen(false)
			setSelectedCommonQuestion(null)
		}
	}

	const handleDeleteCommonQuestion = (questionId: string) => {
		const updatedQuestions = categoryCommonQuestions.filter((q) => q.id !== questionId)
		setCategoryCommonQuestions(updatedQuestions)
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

			const updatedQuestions = categoryCommonQuestions.map((q) => {
				if (q.id === questionId) {
					return {
						...q,
						options: [...(q.options || []), option],
					}
				}
				return q
			})

			setCategoryCommonQuestions(updatedQuestions)

			setNewServiceOption({
				title: "",
				description: "",
				price: 0,
				currency: "₹",
			})
		}
	}

	const handleDeleteServiceOption = (questionId: string, optionId: string) => {
		const updatedQuestions = categoryCommonQuestions.map((q) => {
			if (q.id === questionId) {
				return {
					...q,
					options: q.options?.filter((opt) => opt.id !== optionId),
				}
			}
			return q
		})

		setCategoryCommonQuestions(updatedQuestions)
	}

	const getQuestionTypeIcon = (type: string) => {
		switch (type) {
			case "text":
			case "description":
				return <FileText className="h-4 w-4" />
			case "number":
			case "add_price":
				return <span className="font-mono text-xs">123</span>
			case "single_choice":
			case "multiple_choice":
			case "conditional":
				return <Check className="h-4 w-4" />
			case "range_select":
				return <Slider className="h-4 w-4" />
			case "range":
				return <Slider className="h-4 w-4" />
			case "image_upload":
				return <Upload className="h-4 w-4" />
			case "team_members":
				return <Users className="h-4 w-4" />
			case "package":
				return <Package className="h-4 w-4" />
			case "service_options":
				return <Package className="h-4 w-4" />
			default:
				return <FileText className="h-4 w-4" />
		}
	}

	const getQuestionTypeLabel = (type: string) => {
		switch (type) {
			case "text":
				return "Text Input"
			case "number":
				return "Number Input"
			case "single_choice":
				return "Single Choice"
			case "multiple_choice":
				return "Multiple Choice"
			case "conditional":
				return "Conditional Question"
			case "range_select":
				return "Range Select"
			case "range":
				return "Range Slider"
			case "image_upload":
				return "Image Upload"
			case "team_members":
				return "Team Members"
			case "package":
				return "Package Creation"
			case "description":
				return "Description"
			case "service_options":
				return "Service Options"
			case "add_price":
				return "Add Price"
			default:
				return type
		}
	}

	const renderQuestionPreview = (question: Question | CommonQuestion) => {
		switch (question.type) {
			case "text":
				return <Input placeholder="Enter your answer" disabled={isPreviewMode} className="max-w-md" />

			case "number":
				return <Input type="number" placeholder="0" disabled={isPreviewMode} className="max-w-md" />

			case "description":
				return <Textarea placeholder="Enter your description" disabled={isPreviewMode} className="max-w-md" />

			case "single_choice":
				return (
					<RadioGroup disabled={isPreviewMode} className="max-w-md">
						{Array.isArray(question.options) &&
							question.options.map((option, index) => {
								const optionText = typeof option === "string" ? option : option.title
								const optionId = typeof option === "string" ? `${question.id}-${index}` : option.id

								return (
									<div key={optionId} className="flex items-center space-x-2">
										<RadioGroupItem value={optionId} id={optionId} />
										<Label htmlFor={optionId}>{optionText}</Label>
									</div>
								)
							})}
					</RadioGroup>
				)

			case "multiple_choice":
				return (
					<div className="space-y-2 max-w-md">
						{Array.isArray(question.options) &&
							question.options.map((option, index) => {
								const optionText = typeof option === "string" ? option : option.title
								const optionId = typeof option === "string" ? `${question.id}-${index}` : option.id

								return (
									<div key={optionId} className="flex items-center space-x-2">
										<Checkbox id={optionId} disabled={isPreviewMode} />
										<Label htmlFor={optionId}>{optionText}</Label>
									</div>
								)
							})}
					</div>
				)

			case "conditional":
				return (
					<div className="space-y-4 max-w-md">
						<RadioGroup disabled={isPreviewMode}>
							{Array.isArray(question.options) &&
								typeof question.options[0] === "string" &&
								question.options.map((option, index) => (
									<div key={index} className="flex items-center space-x-2">
										<RadioGroupItem value={option} id={`${question.id}-${index}`} />
										<Label htmlFor={`${question.id}-${index}`}>{option}</Label>
									</div>
								))}
						</RadioGroup>

						{"subQuestions" in question &&
							question.subQuestions?.map((subQ) => (
								<div key={subQ.id} className="ml-6 mt-4 p-4 border rounded-md">
									<p className="font-medium mb-2">{subQ.text}</p>
									{subQ.type === "team_members" && (
										<div className="space-y-4">
											<div className="grid grid-cols-2 gap-4">
												<Input placeholder="Name" disabled={isPreviewMode} />
												<Input placeholder="Role" disabled={isPreviewMode} />
											</div>
											<Button variant="outline" size="sm" disabled={isPreviewMode}>
												<Plus className="mr-2 h-4 w-4" />
												Add Team Member
											</Button>
										</div>
									)}
								</div>
							))}
					</div>
				)

			case "range_select":
				return (
					<div className="space-y-6 max-w-md">
						{"rangeOptions" in question &&
							question.rangeOptions?.ranges.map((range, rangeIndex) => (
								<div key={rangeIndex} className="space-y-2">
									<div className="flex justify-between items-center">
										<Label className="font-medium">{range.name}</Label>
										<span className="text-sm font-medium">
											{range.min} - {range.max} {range.unit}
										</span>
									</div>
									<div className="pt-2">
										<Slider
											defaultValue={[Math.floor((range.min + range.max) / 2)]}
											min={range.min}
											max={range.max}
											step={range.step}
											disabled={isPreviewMode}
										/>
									</div>
									<div className="text-center text-sm font-medium mt-1">
										Selected: {Math.floor((range.min + range.max) / 2)} {range.unit}
									</div>
								</div>
							))}
					</div>
				)

			case "service_options":
				return (
					<div className="space-y-4 max-w-2xl">
						{Array.isArray(question.options) &&
							"title" in question.options[0] &&
							question.options.map((option) => (
								<div key={option.id} className="border rounded-md p-4 relative">
									<div className="absolute top-4 right-4">
										<div className="w-6 h-6 border rounded-md flex items-center justify-center bg-green-600 text-white">
											<Check className="h-4 w-4" />
										</div>
									</div>
									<div className="pr-8">
										<h4 className="font-medium text-lg">{option.title}</h4>
										<p className="text-muted-foreground text-sm mt-1 italic">{option.description}</p>

										{option.imageUrl && (
											<div className="mt-3">
												<img
													src={option.imageUrl || "/placeholder.svg"}
													alt={option.title}
													className="rounded-md border w-full max-h-48 object-cover"
												/>
											</div>
										)}

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

										{option.answerType && option.answerType !== "none" && (
											<div className="mt-4 pt-4 border-t">
												<h5 className="font-medium">Additional Information</h5>
												<div className="mt-2">
													{option.answerType === "text" && (
														<Input placeholder="Enter additional details" disabled={isPreviewMode} />
													)}
													{option.answerType === "number" && (
														<Input type="number" placeholder="0" disabled={isPreviewMode} />
													)}
													{option.answerType === "single_choice" && (
														<RadioGroup disabled={isPreviewMode}>
															<div className="flex items-center space-x-2">
																<RadioGroupItem value="option1" id={`${option.id}-option1`} />
																<Label htmlFor={`${option.id}-option1`}>Option 1</Label>
															</div>
															<div className="flex items-center space-x-2">
																<RadioGroupItem value="option2" id={`${option.id}-option2`} />
																<Label htmlFor={`${option.id}-option2`}>Option 2</Label>
															</div>
														</RadioGroup>
													)}
													{option.answerType === "multiple_choice" && (
														<div className="space-y-2">
															<div className="flex items-center space-x-2">
																<Checkbox id={`${option.id}-check1`} disabled={isPreviewMode} />
																<Label htmlFor={`${option.id}-check1`}>Option 1</Label>
															</div>
															<div className="flex items-center space-x-2">
																<Checkbox id={`${option.id}-check2`} disabled={isPreviewMode} />
																<Label htmlFor={`${option.id}-check2`}>Option 2</Label>
															</div>
														</div>
													)}
													{option.answerType === "image_upload" && (
														<div className="flex items-center space-x-2">
															<Input type="file" accept="image/*" disabled={isPreviewMode} />
														</div>
													)}
													{option.answerType === "description" && (
														<Textarea placeholder="Enter description" disabled={isPreviewMode} />
													)}
												</div>
											</div>
										)}
									</div>
								</div>
							))}
					</div>
				)

			case "image_upload":
				return (
					<div className="space-y-2 max-w-md">
						<div className="flex items-center space-x-2">
							<Input type="file" accept="image/*" disabled={isPreviewMode} />
							{"maxImages" in question && <Badge>{question.maxImages} max</Badge>}
						</div>
					</div>
				)

			case "range":
				return (
					<div className="space-y-4 max-w-md">
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>{"minValue" in question ? question.minValue || 0 : 0}</span>
							<span>{"maxValue" in question ? question.maxValue || 100 : 100}</span>
						</div>
						<Slider
							defaultValue={[50]}
							min={"minValue" in question ? question.minValue || 0 : 0}
							max={"maxValue" in question ? question.maxValue || 100 : 100}
							step={1}
							disabled={isPreviewMode}
						/>
					</div>
				)

			case "team_members":
				return (
					<div className="space-y-4 max-w-md">
						<div className="grid grid-cols-2 gap-4">
							<Input placeholder="Name" disabled={isPreviewMode} />
							<Input placeholder="Role" disabled={isPreviewMode} />
						</div>
						<Button variant="outline" size="sm" disabled={isPreviewMode}>
							<Plus className="mr-2 h-4 w-4" />
							Add Team Member
						</Button>
					</div>
				)

			case "package":
				return (
					<div className="space-y-4 max-w-md">
						<Input placeholder="Package Name" disabled={isPreviewMode} />
						<div className="grid grid-cols-2 gap-4">
							<Input placeholder="Price" type="number" disabled={isPreviewMode} />
							<Input placeholder="Duration" disabled={isPreviewMode} />
						</div>
						<Textarea placeholder="Package Description" disabled={isPreviewMode} />
					</div>
				)

			case "add_price":
				return (
					<div className="space-y-2 max-w-md">
						<div className="flex items-center space-x-2">
							<span className="text-sm font-medium">{question.currency || "₹"}</span>
							<Input
								type="number"
								placeholder="0"
								value={question.price?.toString() || ""}
								disabled={isPreviewMode}
								className="max-w-[200px]"
							/>
						</div>
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
						<Link href={`/admin/categories/${params.id}`}>
							<Button variant="outline" size="icon">
								<ArrowLeft className="h-4 w-4" />
							</Button>
						</Link>
						<h2 className="text-3xl font-bold tracking-tight">
							{subcategory.icon && <span className="mr-2">{subcategory.icon}</span>}
							{subcategory.name}
						</h2>
						<Badge variant={subcategory.status === "active" ? "default" : "secondary"}>{subcategory.status}</Badge>
					</div>
					<div className="flex space-x-2">
						<Button variant="outline" onClick={() => setIsTermsDialogOpen(true)}>
							<FileText2 className="mr-2 h-4 w-4" />
							Terms & Conditions
						</Button>
						<Button variant={isPreviewMode ? "default" : "outline"} onClick={() => setIsPreviewMode(!isPreviewMode)}>
							{isPreviewMode ? "Edit Mode" : "Preview Mode"}
						</Button>
					</div>
				</div>

				<div className="mb-6">
					<p className="text-muted-foreground">{subcategory.description}</p>
				</div>

				<Tabs defaultValue="questions" className="space-y-4" onValueChange={setMainTab}>
					<TabsList>
						<TabsTrigger value="questions">Questions</TabsTrigger>
						<TabsTrigger value="common-questions">Common Questions</TabsTrigger>
					</TabsList>

					<TabsContent value="questions" className="space-y-4">
						<Tabs
							defaultValue="customer"
							className="space-y-4"
							onValueChange={(value) => {
								setActiveTab(value)
								setCurrentPage(0)
							}}
						>
							<div className="flex justify-between items-center">
								<TabsList>
									<TabsTrigger value="customer">Customer Questions</TabsTrigger>
									<TabsTrigger value="vendor">Vendor Questions</TabsTrigger>
								</TabsList>
								{!isPreviewMode && (
									<Button
										onClick={() =>
											activeTab === "customer"
												? setIsAddCustomerQuestionDialogOpen(true)
												: setIsAddVendorQuestionDialogOpen(true)
										}
									>
										<Plus className="mr-2 h-4 w-4" />
										Add Question for {activeTab === "customer" ? "Customer" : "Vendor"}
									</Button>
								)}
							</div>

							<TabsContent value="customer" className="space-y-4">
								{isPreviewMode ? (
									<div className="space-y-6">
										<div className="flex justify-between items-center">
											<h3 className="text-xl font-semibold">
												{customerPages[currentPage]?.title || "Questions"}
												<Badge variant="outline" className="ml-2">
													Page {currentPage + 1} of {customerPages.length}
												</Badge>
											</h3>
											<div className="flex space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
													disabled={currentPage === 0}
												>
													<ArrowLeftIcon className="mr-2 h-4 w-4" />
													Previous
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => setCurrentPage((prev) => Math.min(customerPages.length - 1, prev + 1))}
													disabled={currentPage === customerPages.length - 1}
												>
													Next
													<ArrowRight className="ml-2 h-4 w-4" />
												</Button>
											</div>
										</div>

										<div className="space-y-6">
											{getCurrentPageQuestions().map((question) => (
												<Card key={question.id}>
													<CardHeader>
														<CardTitle className="text-lg">
															{question.text}
															{question.required && <span className="text-red-500 ml-1">*</span>}
														</CardTitle>
														{question.description && (
															<p className="text-sm text-muted-foreground">{question.description}</p>
														)}
													</CardHeader>
													<CardContent>{renderQuestionPreview(question)}</CardContent>
												</Card>
											))}
										</div>

										<div className="flex justify-end space-x-2 pt-4">
											<Button
												variant="outline"
												onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
												disabled={currentPage === 0}
											>
												<ArrowLeftIcon className="mr-2 h-4 w-4" />
												Previous
											</Button>
											<Button
												onClick={() => setCurrentPage((prev) => Math.min(customerPages.length - 1, prev + 1))}
												disabled={currentPage === customerPages.length - 1}
											>
												Next
												<ArrowRight className="ml-2 h-4 w-4" />
											</Button>
										</div>
									</div>
								) : (
									<div className="space-y-4">
										<Accordion type="single" collapsible className="w-full">
											{customerPages.map((page, pageIndex) => (
												<AccordionItem key={page.id} value={page.id}>
													<AccordionTrigger className="hover:bg-muted px-4 rounded-md">
														<div className="flex items-center">
															<span className="font-medium">{page.title}</span>
															<Badge variant="outline" className="ml-2">
																{page.questions.length} questions
															</Badge>
														</div>
													</AccordionTrigger>
													<AccordionContent>
														<div className="grid gap-4 md:grid-cols-2 p-2">
															{subcategory.customerQuestions
																.filter((q) => q.pageId === page.id)
																.map((question) => (
																	<Card key={question.id}>
																		<CardHeader className="pb-2">
																			<div className="flex justify-between items-start">
																				<div>
																					<CardTitle className="text-lg font-medium">{question.text}</CardTitle>
																					{question.description && (
																						<p className="text-sm text-muted-foreground">{question.description}</p>
																					)}
																				</div>
																				<div className="flex space-x-1">
																					<Button
																						variant={question.status === "active" ? "default" : "secondary"}
																						size="sm"
																						onClick={(e) => {
																							e.preventDefault()
																							e.stopPropagation()
																							toggleQuestionStatus(question)
																						}}
																					>
																						{question.status === "active" ? "Active" : "Inactive"}
																					</Button>
																					<Button
																						variant="ghost"
																						size="icon"
																						className="h-8 w-8"
																						onClick={(e) => {
																							e.preventDefault()
																							e.stopPropagation()
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
																						onClick={(e) => {
																							e.preventDefault()
																							e.stopPropagation()
																							setSelectedQuestion(question)
																							setIsDeleteQuestionDialogOpen(true)
																						}}
																					>
																						<Trash2 className="h-4 w-4" />
																					</Button>
																				</div>
																			</div>
																		</CardHeader>
																		<CardContent>
																			<div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
																				<span className="flex items-center">
																					{getQuestionTypeIcon(question.type)}
																					<span className="ml-1">{getQuestionTypeLabel(question.type)}</span>
																				</span>
																				<span>•</span>
																				<Badge variant={question.required ? "default" : "outline"} className="text-xs">
																					{question.required ? "Required" : "Optional"}
																				</Badge>
																			</div>
																			{question.imageUrl && (
																				<div className="mt-2 rounded-md bg-muted p-2 text-xs flex items-center">
																					<Image className="h-3 w-3 mr-1" />
																					Question includes an image
																				</div>
																			)}
																			{question.options && question.options.length > 0 && (
																				<div className="mt-2 text-sm">
																					<p className="text-xs text-muted-foreground mb-1">Options:</p>
																					<ul className="list-disc list-inside text-xs pl-2">
																						{question.options.map((option, index) => (
																							<li key={index}>{typeof option === "string" ? option : option.title}</li>
																						))}
																					</ul>
																				</div>
																			)}
																			{question.subQuestions && question.subQuestions.length > 0 && (
																				<div className="mt-2 text-sm">
																					<p className="text-xs text-muted-foreground mb-1">Sub-questions:</p>
																					<ul className="list-disc list-inside text-xs pl-2">
																						{question.subQuestions.map((subQ, index) => (
																							<li key={index}>
																								{subQ.text} ({getQuestionTypeLabel(subQ.type)})
																							</li>
																						))}
																					</ul>
																				</div>
																			)}
																			{question.rangeOptions && (
																				<div className="mt-2 text-sm">
																					<p className="text-xs text-muted-foreground mb-1">Range Options:</p>
																					{question.rangeOptions.ranges.map((range, index) => (
																						<div key={index} className="mb-1">
																							<span className="font-medium">{range.name}:</span> {range.min} -{" "}
																							{range.max} {range.unit}
																						</div>
																					))}
																				</div>
																			)}
																		</CardContent>
																	</Card>
																))}
														</div>
													</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</div>
								)}
							</TabsContent>

							<TabsContent value="vendor" className="space-y-4">
								{isPreviewMode ? (
									<div className="space-y-6">
										<div className="flex justify-between items-center">
											<h3 className="text-xl font-semibold">
												{vendorPages[currentPage]?.title || "Questions"}
												<Badge variant="outline" className="ml-2">
													Page {currentPage + 1} of {vendorPages.length}
												</Badge>
											</h3>
											<div className="flex space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
													disabled={currentPage === 0}
												>
													<ArrowLeftIcon className="mr-2 h-4 w-4" />
													Previous
												</Button>
												<Button
													variant="outline"
													size="sm"
													onClick={() => setCurrentPage((prev) => Math.min(vendorPages.length - 1, prev + 1))}
													disabled={currentPage === vendorPages.length - 1}
												>
													Next
													<ArrowRight className="ml-2 h-4 w-4" />
												</Button>
											</div>
										</div>

										<div className="space-y-6">
											{getCurrentPageQuestions().map((question) => (
												<Card key={question.id}>
													<CardHeader>
														<CardTitle className="text-lg">
															{question.text}
															{question.required && <span className="text-red-500 ml-1">*</span>}
														</CardTitle>
														{question.description && (
															<p className="text-sm text-muted-foreground">{question.description}</p>
														)}
													</CardHeader>
													<CardContent>{renderQuestionPreview(question)}</CardContent>
												</Card>
											))}
										</div>

										<div className="flex justify-end space-x-2 pt-4">
											<Button
												variant="outline"
												onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
												disabled={currentPage === 0}
											>
												<ArrowLeftIcon className="mr-2 h-4 w-4" />
												Previous
											</Button>
											<Button
												onClick={() => setCurrentPage((prev) => Math.min(vendorPages.length - 1, prev + 1))}
												disabled={currentPage === vendorPages.length - 1}
											>
												Next
												<ArrowRight className="ml-2 h-4 w-4" />
											</Button>
										</div>
									</div>
								) : (
									<div className="space-y-4">
										<Accordion type="single" collapsible className="w-full">
											{vendorPages.map((page, pageIndex) => (
												<AccordionItem key={page.id} value={page.id}>
													<AccordionTrigger className="hover:bg-muted px-4 rounded-md">
														<div className="flex items-center">
															<span className="font-medium">{page.title}</span>
															<Badge variant="outline" className="ml-2">
																{page.questions.length} questions
															</Badge>
														</div>
													</AccordionTrigger>
													<AccordionContent>
														<div className="grid gap-4 md:grid-cols-2 p-2">
															{subcategory.vendorQuestions
																.filter((q) => q.pageId === page.id)
																.map((question) => (
																	<Card key={question.id}>
																		<CardHeader className="pb-2">
																			<div className="flex justify-between items-start">
																				<div>
																					<CardTitle className="text-lg font-medium">{question.text}</CardTitle>
																					{question.description && (
																						<p className="text-sm text-muted-foreground">{question.description}</p>
																					)}
																				</div>
																				<div className="flex space-x-1">
																					<Button
																						variant={question.status === "active" ? "default" : "secondary"}
																						size="sm"
																						onClick={(e) => {
																							e.preventDefault()
																							e.stopPropagation()
																							toggleQuestionStatus(question)
																						}}
																					>
																						{question.status === "active" ? "Active" : "Inactive"}
																					</Button>
																					<Button
																						variant="ghost"
																						size="icon"
																						className="h-8 w-8"
																						onClick={(e) => {
																							e.preventDefault()
																							e.stopPropagation()
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
																						onClick={(e) => {
																							e.preventDefault()
																							e.stopPropagation()
																							setSelectedQuestion(question)
																							setIsDeleteQuestionDialogOpen(true)
																						}}
																					>
																						<Trash2 className="h-4 w-4" />
																					</Button>
																				</div>
																			</div>
																		</CardHeader>
																		<CardContent>
																			<div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
																				<span className="flex items-center">
																					{getQuestionTypeIcon(question.type)}
																					<span className="ml-1">{getQuestionTypeLabel(question.type)}</span>
																				</span>
																				<span>•</span>
																				<Badge variant={question.required ? "default" : "outline"} className="text-xs">
																					{question.required ? "Required" : "Optional"}
																				</Badge>
																			</div>
																			{question.imageUrl && (
																				<div className="mt-2 rounded-md bg-muted p-2 text-xs flex items-center">
																					<Image className="h-3 w-3 mr-1" />
																					Question includes an image
																				</div>
																			)}
																			{question.options && question.options.length > 0 && (
																				<div className="mt-2 text-sm">
																					<p className="text-xs text-muted-foreground mb-1">Options:</p>
																					<ul className="list-disc list-inside text-xs pl-2">
																						{question.options.map((option, index) => (
																							<li key={index}>{typeof option === "string" ? option : option.title}</li>
																						))}
																					</ul>
																				</div>
																			)}
																			{question.rangeOptions && (
																				<div className="mt-2 text-sm">
																					<p className="text-xs text-muted-foreground mb-1">Range Options:</p>
																					{question.rangeOptions.ranges.map((range, index) => (
																						<div key={index} className="mb-1">
																							<span className="font-medium">{range.name}:</span> {range.min} -{" "}
																							{range.max} {range.unit}
																						</div>
																					))}
																				</div>
																			)}
																		</CardContent>
																	</Card>
																))}
														</div>
													</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</div>
								)}
							</TabsContent>
						</Tabs>
					</TabsContent>

					<TabsContent value="common-questions" className="space-y-6">
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-semibold">Common Questions from Category</h3>
							{!isPreviewMode && (
								<Button variant="outline" size="sm">
									<Plus className="mr-2 h-4 w-4" />
									Add New Question
								</Button>
							)}
						</div>

						<div className="grid gap-6">
							{categoryCommonQuestions.map((question) => (
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
												<Button variant="outline" size="sm" onClick={() => toggleCommonQuestionStatus(question.id)}>
													{question.status === "active" ? "Deactivate" : "Activate"}
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8"
													onClick={() => {
														setSelectedCommonQuestion(question)
														setIsEditCommonQuestionDialogOpen(true)
													}}
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8"
													onClick={() => handleDeleteCommonQuestion(question.id)}
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
						<DialogDescription>
							These terms and conditions will be displayed to users when they access this service category.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4 space-y-4">
						<div className="flex justify-between items-center">
							<Label htmlFor="terms-title">Terms Title</Label>
							<Input
								id="terms-title"
								value={terms.title}
								onChange={(e) => setTerms({ ...terms, title: e.target.value })}
								className="max-w-md ml-4"
								disabled={isPreviewMode}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="terms-content">Terms Content</Label>
							<Textarea
								id="terms-content"
								value={terms.content}
								onChange={(e) => setTerms({ ...terms, content: e.target.value })}
								className="min-h-[300px]"
								disabled={isPreviewMode}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsTermsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={() => setIsTermsDialogOpen(false)}>Save Terms & Conditions</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Add Question Dialog */}
			<Dialog
				open={isAddCustomerQuestionDialogOpen || isAddVendorQuestionDialogOpen}
				onOpenChange={(open) => {
					if (!open) {
						setIsAddCustomerQuestionDialogOpen(false)
						setIsAddVendorQuestionDialogOpen(false)
						setNewQuestion({
							text: "",
							type: "text",
							required: true,
							pageId: "page1",
							status: "active",
						})
					}
				}}
			>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Add Question for {isAddCustomerQuestionDialogOpen ? "Customers" : "Vendors"}</DialogTitle>
						<DialogDescription>
							Create a new question that will be asked to {isAddCustomerQuestionDialogOpen ? "customers" : "vendors"} in
							this subcategory.
						</DialogDescription>
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
								<Label htmlFor="question-page" className="text-right">
									Question Page
								</Label>
								<div className="col-span-3">
									<Select
										value={newQuestion.pageId}
										onValueChange={(value) => setNewQuestion({ ...newQuestion, pageId: value })}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select page" />
										</SelectTrigger>
										<SelectContent>
											{(isAddCustomerQuestionDialogOpen ? customerPages : vendorPages).map((page) => (
												<SelectItem key={page.id} value={page.id}>
													{page.title}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="question-image" className="text-right">
									Question Image
								</Label>
								<div className="col-span-3">
									<div className="flex items-center gap-2">
										<Input
											id="question-image"
											type="file"
											accept="image/*"
											className="flex-1"
											onChange={() =>
												setNewQuestion({ ...newQuestion, imageUrl: "/placeholder.svg?height=100&width=200" })
											}
										/>
										{newQuestion.imageUrl && (
											<Button
												variant="outline"
												size="sm"
												onClick={() => setNewQuestion({ ...newQuestion, imageUrl: undefined })}
											>
												Remove
											</Button>
										)}
									</div>
									{newQuestion.imageUrl && (
										<div className="mt-2">
											<img
												src={newQuestion.imageUrl || "/placeholder.svg"}
												alt="Question preview"
												className="max-h-24 rounded-md border"
											/>
										</div>
									)}
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="question-type" className="text-right">
									Answer Type
								</Label>
								<div className="col-span-3">
									<Select
										value={newQuestion.type}
										onValueChange={(value) => {
											const updatedQuestion: Partial<Question> = {
												...newQuestion,
												type: value as any,
											}

											// Reset specific fields based on type
											if (["single_choice", "multiple_choice"].includes(value)) {
												updatedQuestion.options = ["Option 1", "Option 2"]
											} else {
												updatedQuestion.options = undefined
											}

											if (["range"].includes(value)) {
												updatedQuestion.minValue = 0
												updatedQuestion.maxValue = 100
											} else {
												updatedQuestion.minValue = undefined
												updatedQuestion.maxValue = undefined
											}

											if (["image_upload"].includes(value)) {
												updatedQuestion.maxImages = 5
											} else {
												updatedQuestion.maxImages = undefined
											}

											if (value === "conditional") {
												updatedQuestion.options = ["Yes", "No"]
												updatedQuestion.subQuestions = [
													{
														id: Date.now().toString(),
														text: "Follow-up question",
														type: "text",
														required: true,
														condition: {
															dependsOn: "",
															requiredAnswer: "Yes",
														},
													},
												]
											} else {
												updatedQuestion.subQuestions = undefined
											}

											if (value === "range_select") {
												updatedQuestion.rangeOptions = {
													ranges: [
														{
															name: "Years",
															min: 0,
															max: 20,
															step: 1,
															unit: "years",
														},
														{
															name: "Months",
															min: 0,
															max: 11,
															step: 1,
															unit: "months",
														},
													],
												}
											} else {
												updatedQuestion.rangeOptions = undefined
											}

											if (value === "service_options") {
												updatedQuestion.options = [
													{
														id: Date.now().toString(),
														title: "Option 1",
														description: "Description for option 1",
														price: 1000,
														currency: "₹",
													},
												]
											}

											setNewQuestion(updatedQuestion)
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select answer type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="text">Text Input</SelectItem>
											<SelectItem value="number">Number Input</SelectItem>
											<SelectItem value="add_location">Add Price</SelectItem>
											<SelectItem value="add_price">Add Location</SelectItem>
											<SelectItem value="single_choice">Single Choice</SelectItem>
											<SelectItem value="multiple_choice">Multiple Choice</SelectItem>
											<SelectItem value="conditional">Conditional Question</SelectItem>
											<SelectItem value="range_select">Range Select</SelectItem>
											<SelectItem value="range">Range Slider</SelectItem>
											<SelectItem value="image_upload">Image Upload</SelectItem>
											<SelectItem value="team_members">Team Members</SelectItem>
											<SelectItem value="package">Package Creation</SelectItem>
											<SelectItem value="description">Description</SelectItem>
											<SelectItem value="service_options">Service Options</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="question-status" className="text-right">
									Status
								</Label>
								<div className="col-span-3">
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

							{/* Conditional fields based on question type */}
							{(newQuestion.type === "single_choice" ||
								newQuestion.type === "multiple_choice" ||
								newQuestion.type === "conditional") && (
									<div className="grid grid-cols-4 items-start gap-4">
										<Label className="text-right pt-2">Options</Label>
										<div className="col-span-3 space-y-2">
											{Array.isArray(newQuestion.options) &&
												typeof newQuestion.options[0] === "string" &&
												newQuestion.options.map((option, index) => (
													<div key={index} className="flex items-center space-x-2">
														<Input
															value={option}
															onChange={(e) => {
																const updatedOptions = [...(newQuestion.options || [])] as string[]
																updatedOptions[index] = e.target.value
																setNewQuestion({ ...newQuestion, options: updatedOptions })
															}}
															placeholder={`Option ${index + 1}`}
														/>
														<Button
															variant="ghost"
															size="icon"
															onClick={() => {
																const updatedOptions = [...(newQuestion.options || [])] as string[]
																updatedOptions.splice(index, 1)
																setNewQuestion({ ...newQuestion, options: updatedOptions })
															}}
														>
															<X className="h-4 w-4" />
														</Button>
													</div>
												))}
											<Button
												variant="outline"
												size="sm"
												onClick={() => {
													const updatedOptions = [...(newQuestion.options || [])] as string[]
													updatedOptions.push(`Option ${updatedOptions.length + 1}`)
													setNewQuestion({ ...newQuestion, options: updatedOptions })
												}}
											>
												Add Option
											</Button>
										</div>
									</div>
								)}

							{newQuestion.type === "service_options" && (
								<div className="grid grid-cols-4 items-start gap-4">
									<Label className="text-right pt-2">Service Options</Label>
									<div className="col-span-3 space-y-4">
										{Array.isArray(newQuestion.options) &&
											"title" in (newQuestion.options[0] || {}) &&
											newQuestion.options.map((option: any, index) => (
												<div key={index} className="border p-4 rounded-md space-y-4">
													<div className="flex justify-between">
														<h4 className="font-medium">Option {index + 1}</h4>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => {
																const updatedOptions = [...(newQuestion.options || [])] as ServiceOption[]
																updatedOptions.splice(index, 1)
																setNewQuestion({ ...newQuestion, options: updatedOptions })
															}}
														>
															<X className="h-4 w-4" />
														</Button>
													</div>
													<div className="space-y-2">
														<Label>Title</Label>
														<Input
															value={option.title}
															onChange={(e) => {
																const updatedOptions = [...(newQuestion.options || [])] as ServiceOption[]
																updatedOptions[index] = {
																	...updatedOptions[index],
																	title: e.target.value,
																}
																setNewQuestion({ ...newQuestion, options: updatedOptions })
															}}
														/>
													</div>
													<div className="space-y-2">
														<Label>Description</Label>
														<Textarea
															value={option.description}
															onChange={(e) => {
																const updatedOptions = [...(newQuestion.options || [])] as ServiceOption[]
																updatedOptions[index] = {
																	...updatedOptions[index],
																	description: e.target.value,
																}
																setNewQuestion({ ...newQuestion, options: updatedOptions })
															}}
														/>
													</div>
													<div className="space-y-2">
														<Label>Option Image</Label>
														<div className="flex items-center gap-2">
															<Input
																type="file"
																accept="image/*"
																className="flex-1"
																onChange={() => {
																	const updatedOptions = [...(newQuestion.options || [])] as ServiceOption[]
																	updatedOptions[index] = {
																		...updatedOptions[index],
																		imageUrl: "/placeholder.svg?height=200&width=300",
																	}
																	setNewQuestion({ ...newQuestion, options: updatedOptions })
																}}
															/>
															{option.imageUrl && (
																<Button
																	variant="outline"
																	size="sm"
																	onClick={() => {
																		const updatedOptions = [...(newQuestion.options || [])] as ServiceOption[]
																		updatedOptions[index] = {
																			...updatedOptions[index],
																			imageUrl: undefined,
																		}
																		setNewQuestion({ ...newQuestion, options: updatedOptions })
																	}}
																>
																	Remove
																</Button>
															)}
														</div>
														{option.imageUrl && (
															<div className="mt-2">
																<img
																	src={option.imageUrl || "/placeholder.svg"}
																	alt="Option preview"
																	className="max-h-32 rounded-md border"
																/>
															</div>
														)}
													</div>
													{/* <div className="grid grid-cols-2 gap-4">
														<div className="space-y-2">
															<Label>Currency</Label>
															<Input
																value={option.currency}
																onChange={(e) => {
																	const updatedOptions = [...(newQuestion.options || [])] as ServiceOption[]
																	updatedOptions[index] = {
																		...updatedOptions[index],
																		currency: e.target.value,
																	}
																	setNewQuestion({ ...newQuestion, options: updatedOptions })
																}}
															/>
														</div>
														<div className="space-y-2">
															<Label>Price</Label>
															<Input
																type="number"
																value={option.price}
																onChange={(e) => {
																	const updatedOptions = [...(newQuestion.options || [])] as ServiceOption[]
																	updatedOptions[index] = {
																		...updatedOptions[index],
																		price: Number(e.target.value),
																	}
																	setNewQuestion({ ...newQuestion, options: updatedOptions })
																}}
															/>
														</div>
													</div> */}
													<div className="space-y-2">
														<Label>Answer Type</Label>
														<Select
															value={option.answerType || "none"}
															onValueChange={(value) => {
																const updatedOptions = [...(newQuestion.options || [])] as ServiceOption[]
																updatedOptions[index] = {
																	...updatedOptions[index],
																	answerType: value,
																}
																setNewQuestion({ ...newQuestion, options: updatedOptions })
															}}
														>
															<SelectTrigger>
																<SelectValue placeholder="Select answer type" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="none">None</SelectItem>
																<SelectItem value="text">Text Input</SelectItem>
																<SelectItem value="number">Number Input</SelectItem>
																<SelectItem value="add_location">Add Price</SelectItem>
																<SelectItem value="add_price">Add Location</SelectItem>
																<SelectItem value="single_choice">Single Choice</SelectItem>
																<SelectItem value="multiple_choice">Multiple Choice</SelectItem>
																<SelectItem value="image_upload">Image Upload</SelectItem>
																<SelectItem value="description">Description</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</div>
											))}
										<Button
											variant="outline"
											onClick={() => {
												const updatedOptions = [...(newQuestion.options || [])] as ServiceOption[]
												updatedOptions.push({
													id: Date.now().toString(),
													title: `Option ${updatedOptions.length + 1}`,
													description: "Description",
													price: 0,
													currency: "₹",
													answerType: "none",
												})
												setNewQuestion({ ...newQuestion, options: updatedOptions })
											}}
										>
											Add Service Option
										</Button>
									</div>
								</div>
							)}

							{newQuestion.type === "conditional" && newQuestion.subQuestions && (
								<div className="grid grid-cols-4 items-start gap-4">
									<Label className="text-right pt-2">Sub-Question</Label>
									<div className="col-span-3 space-y-4 border p-4 rounded-md">
										<div className="space-y-2">
											<Label htmlFor="sub-question-text">Question Text</Label>
											<Input
												id="sub-question-text"
												value={newQuestion.subQuestions[0].text}
												onChange={(e) => {
													const updatedSubQuestions = [...(newQuestion.subQuestions || [])]
													updatedSubQuestions[0] = {
														...updatedSubQuestions[0],
														text: e.target.value,
													}
													setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
												}}
												placeholder="Enter sub-question text"
											/>
										</div>

										<div className="space-y-2">
											<Label htmlFor="sub-question-type">Answer Type</Label>
											<Select
												value={newQuestion.subQuestions[0].type}
												onValueChange={(value) => {
													const updatedSubQuestions = [...(newQuestion.subQuestions || [])]

													// Reset specific fields based on type
													const updatedSubQuestion = {
														...updatedSubQuestions[0],
														type: value as any,
													}

													if (["single_choice", "multiple_choice"].includes(value)) {
														updatedSubQuestion.options = ["Option 1", "Option 2"]
													} else {
														updatedSubQuestion.options = undefined
													}

													if (["image_upload"].includes(value)) {
														updatedSubQuestion.maxImages = 5
													} else {
														updatedSubQuestion.maxImages = undefined
													}

													updatedSubQuestions[0] = updatedSubQuestion
													setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
												}}
											>
												<SelectTrigger id="sub-question-type">
													<SelectValue placeholder="Select answer type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="text">Text Input</SelectItem>
													<SelectItem value="number">Number Input</SelectItem>
													<SelectItem value="single_choice">Single Choice</SelectItem>
													<SelectItem value="multiple_choice">Multiple Choice</SelectItem>
													<SelectItem value="team_members">Team Members</SelectItem>
													<SelectItem value="image_upload">Image Upload</SelectItem>
													<SelectItem value="description">Description</SelectItem>
													<SelectItem value="add_price">Add Price</SelectItem>
													<SelectItem value="service_options">Service Options</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2">
											<Label htmlFor="sub-question-condition">Show When</Label>
											<Select
												value={newQuestion.subQuestions[0].condition?.requiredAnswer as string}
												onValueChange={(value) => {
													const updatedSubQuestions = [...(newQuestion.subQuestions || [])]
													updatedSubQuestions[0] = {
														...updatedSubQuestions[0],
														condition: {
															dependsOn: newQuestion.id || "",
															requiredAnswer: value,
														},
													}
													setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
												}}
											>
												<SelectTrigger id="sub-question-condition">
													<SelectValue placeholder="Select condition" />
												</SelectTrigger>
												<SelectContent>
													{Array.isArray(newQuestion.options) &&
														typeof newQuestion.options[0] === "string" &&
														newQuestion.options.map((option, index) => (
															<SelectItem key={index} value={option}>
																{option}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
										</div>

										{/* Conditional fields based on sub-question type */}
										{newQuestion.subQuestions[0].type === "image_upload" && (
											<div className="space-y-2">
												<Label htmlFor="sub-max-images">Max Images</Label>
												<Input
													id="sub-max-images"
													type="number"
													min="1"
													max="10"
													value={newQuestion.subQuestions[0].maxImages || 5}
													onChange={(e) => {
														const updatedSubQuestions = [...(newQuestion.subQuestions || [])]
														updatedSubQuestions[0] = {
															...updatedSubQuestions[0],
															maxImages: Number(e.target.value),
														}
														setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
													}}
												/>
											</div>
										)}

										{(newQuestion.subQuestions[0].type === "single_choice" ||
											newQuestion.subQuestions[0].type === "multiple_choice") && (
												<div className="space-y-2">
													<Label>Options</Label>
													<div className="space-y-2">
														{Array.isArray(newQuestion.subQuestions[0].options) &&
															typeof newQuestion.subQuestions[0].options[0] === "string" &&
															newQuestion.subQuestions[0].options.map((option, index) => (
																<div key={index} className="flex items-center space-x-2">
																	<Input
																		value={option}
																		onChange={(e) => {
																			const updatedSubQuestions = [...(newQuestion.subQuestions || [])]
																			const updatedOptions = [...(updatedSubQuestions[0].options || [])] as string[]
																			updatedOptions[index] = e.target.value
																			updatedSubQuestions[0] = {
																				...updatedSubQuestions[0],
																				options: updatedOptions,
																			}
																			setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
																		}}
																		placeholder={`Option ${index + 1}`}
																	/>
																	<Button
																		variant="ghost"
																		size="icon"
																		onClick={() => {
																			const updatedSubQuestions = [...(newQuestion.subQuestions || [])]
																			const updatedOptions = [...(updatedSubQuestions[0].options || [])] as string[]
																			updatedOptions.splice(index, 1)
																			updatedSubQuestions[0] = {
																				...updatedSubQuestions[0],
																				options: updatedOptions,
																			}
																			setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
																		}}
																	>
																		<X className="h-4 w-4" />
																	</Button>
																</div>
															))}
														<Button
															variant="outline"
															size="sm"
															onClick={() => {
																const updatedSubQuestions = [...(newQuestion.subQuestions || [])]
																const updatedOptions = [...(updatedSubQuestions[0].options || [])] as string[]
																updatedOptions.push(`Option ${updatedOptions.length + 1}`)
																updatedSubQuestions[0] = {
																	...updatedSubQuestions[0],
																	options: updatedOptions,
																}
																setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
															}}
														>
															Add Option
														</Button>
													</div>
												</div>
											)}

										{newQuestion.subQuestions[0].type === "add_price" && (
											<div className="space-y-2">
												<Label>Price Settings</Label>
												<div className="grid grid-cols-2 gap-4">
													<div>
														<Label htmlFor="sub-currency">Currency</Label>
														<Input
															id="sub-currency"
															value={newQuestion.subQuestions[0].currency || "₹"}
															onChange={(e) => {
																const updatedSubQuestions = [...(newQuestion.subQuestions || [])]
																updatedSubQuestions[0] = {
																	...updatedSubQuestions[0],
																	currency: e.target.value,
																}
																setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
															}}
														/>
													</div>
													<div>
														<Label htmlFor="sub-price">Default Price</Label>
														<Input
															id="sub-price"
															type="number"
															value={newQuestion.subQuestions[0].price || 0}
															onChange={(e) => {
																const updatedSubQuestions = [...(newQuestion.subQuestions || [])]
																updatedSubQuestions[0] = {
																	...updatedSubQuestions[0],
																	price: Number(e.target.value),
																}
																setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
															}}
														/>
													</div>
												</div>
											</div>
										)}

										{newQuestion.subQuestions[0].type === "service_options" && (
											<div className="space-y-2">
												<Label>Service Options</Label>
												<div className="space-y-4">
													<Button
														variant="outline"
														size="sm"
														onClick={() => {
															const updatedSubQuestions = [...(newQuestion.subQuestions || [])]
															const updatedOptions = [...(updatedSubQuestions[0].options || [])] as ServiceOption[]
															updatedOptions.push({
																id: Date.now().toString(),
																title: `Option ${updatedOptions.length + 1}`,
																description: "Description",
																price: 0,
																currency: "₹",
															})
															updatedSubQuestions[0] = {
																...updatedSubQuestions[0],
																options: updatedOptions,
															}
															setNewQuestion({ ...newQuestion, subQuestions: updatedSubQuestions })
														}}
													>
														Add Service Option
													</Button>
												</div>
											</div>
										)}
									</div>
								</div>
							)}

							{newQuestion.type === "range_select" && newQuestion.rangeOptions && (
								<div className="grid grid-cols-4 items-start gap-4">
									<Label className="text-right pt-2">Range Options</Label>
									<div className="col-span-3 space-y-4">
										{newQuestion.rangeOptions.ranges.map((range, rangeIndex) => (
											<div key={rangeIndex} className="border p-4 rounded-md space-y-4">
												<div className="flex items-center justify-between">
													<Label htmlFor={`range-name-${rangeIndex}`}>Range Name</Label>
													{newQuestion.rangeOptions!.ranges.length > 1 && (
														<Button
															variant="ghost"
															size="icon"
															onClick={() => {
																const updatedRanges = [...newQuestion.rangeOptions!.ranges]
																updatedRanges.splice(rangeIndex, 1)
																setNewQuestion({
																	...newQuestion,
																	rangeOptions: {
																		...newQuestion.rangeOptions!,
																		ranges: updatedRanges,
																	},
																})
															}}
														>
															<X className="h-4 w-4" />
														</Button>
													)}
												</div>

												<Input
													id={`range-name-${rangeIndex}`}
													value={range.name}
													onChange={(e) => {
														const updatedRanges = [...newQuestion.rangeOptions!.ranges]
														updatedRanges[rangeIndex] = {
															...updatedRanges[rangeIndex],
															name: e.target.value,
														}
														setNewQuestion({
															...newQuestion,
															rangeOptions: {
																...newQuestion.rangeOptions!,
																ranges: updatedRanges,
															},
														})
													}}
													placeholder="Range name"
												/>

												<div className="grid grid-cols-2 gap-4">
													<div>
														<Label htmlFor={`range-min-${rangeIndex}`}>Min Value</Label>
														<Input
															id={`range-min-${rangeIndex}`}
															type="number"
															value={range.min}
															onChange={(e) => {
																const updatedRanges = [...newQuestion.rangeOptions!.ranges]
																updatedRanges[rangeIndex] = {
																	...updatedRanges[rangeIndex],
																	min: Number(e.target.value),
																}
																setNewQuestion({
																	...newQuestion,
																	rangeOptions: {
																		...newQuestion.rangeOptions!,
																		ranges: updatedRanges,
																	},
																})
															}}
														/>
													</div>
													<div>
														<Label htmlFor={`range-max-${rangeIndex}`}>Max Value</Label>
														<Input
															id={`range-max-${rangeIndex}`}
															type="number"
															value={range.max}
															onChange={(e) => {
																const updatedRanges = [...newQuestion.rangeOptions!.ranges]
																updatedRanges[rangeIndex] = {
																	...updatedRanges[rangeIndex],
																	max: Number(e.target.value),
																}
																setNewQuestion({
																	...newQuestion,
																	rangeOptions: {
																		...newQuestion.rangeOptions!,
																		ranges: updatedRanges,
																	},
																})
															}}
														/>
													</div>
												</div>

												{/* <div className="grid grid-cols-2 gap-4">
													<div>
														<Label htmlFor={`range-step-${rangeIndex}`}>Step</Label>
														<Input
															id={`range-step-${rangeIndex}`}
															type="number"
															value={range.step}
															onChange={(e) => {
																const updatedRanges = [...newQuestion.rangeOptions!.ranges]
																updatedRanges[rangeIndex] = {
																	...updatedRanges[rangeIndex],
																	step: Number(e.target.value),
																}
																setNewQuestion({
																	...newQuestion,
																	rangeOptions: {
																		...newQuestion.rangeOptions!,
																		ranges: updatedRanges,
																	},
																})
															}}
														/>
													</div>
													<div>
														<Label htmlFor={`range-unit-${rangeIndex}`}>Unit</Label>
														<Input
															id={`range-unit-${rangeIndex}`}
															value={range.unit}
															onChange={(e) => {
																const updatedRanges = [...newQuestion.rangeOptions!.ranges]
																updatedRanges[rangeIndex] = {
																	...updatedRanges[rangeIndex],
																	unit: e.target.value,
																}
																setNewQuestion({
																	...newQuestion,
																	rangeOptions: {
																		...newQuestion.rangeOptions!,
																		ranges: updatedRanges,
																	},
																})
															}}
															placeholder="e.g. years, months, etc."
														/>
													</div>
												</div> */}
											</div>
										))}
										<Button
											variant="outline"
											onClick={() => {
												const updatedRanges = [...newQuestion.rangeOptions!.ranges]
												updatedRanges.push({
													name: `Range ${updatedRanges.length + 1}`,
													min: 0,
													max: 100,
													step: 1,
													unit: "",
												})
												setNewQuestion({
													...newQuestion,
													rangeOptions: {
														...newQuestion.rangeOptions!,
														ranges: updatedRanges,
													},
												})
											}}
										>
											Add Range
										</Button>
									</div>
								</div>
							)}

							{newQuestion.type === "range" && (
								<div className="grid grid-cols-4 items-center gap-4">
									<Label className="text-right">Range Values</Label>
									<div className="col-span-3 grid grid-cols-2 gap-4">
										<div>
											<Label htmlFor="min-value" className="text-xs">
												Minimum Value
											</Label>
											<Input
												id="min-value"
												type="number"
												value={newQuestion.minValue || 0}
												onChange={(e) => setNewQuestion({ ...newQuestion, minValue: Number(e.target.value) })}
											/>
										</div>
										<div>
											<Label htmlFor="max-value" className="text-xs">
												Maximum Value
											</Label>
											<Input
												id="max-value"
												type="number"
												value={newQuestion.maxValue || 100}
												onChange={(e) => setNewQuestion({ ...newQuestion, maxValue: Number(e.target.value) })}
											/>
										</div>
									</div>
								</div>
							)}

							{newQuestion.type === "image_upload" && (
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="max-images" className="text-right">
										Max Images
									</Label>
									<div className="col-span-3">
										<Input
											id="max-images"
											type="number"
											min="1"
											max="10"
											value={newQuestion.maxImages || 5}
											onChange={(e) => setNewQuestion({ ...newQuestion, maxImages: Number(e.target.value) })}
										/>
									</div>
								</div>
							)}

							<div className="grid grid-cols-4 items-center gap-4">
								<Label className="text-right">Required</Label>
								<div className="flex items-center space-x-2 col-span-3">
									<RadioGroup
										value={newQuestion.required ? "yes" : "no"}
										onValueChange={(value) => setNewQuestion({ ...newQuestion, required: value === "yes" })}
										className="flex space-x-4"
									>
										<div className="flex items-center space-x-2">
											<RadioGroupItem value="yes" id="required-yes" />
											<Label htmlFor="required-yes">Yes</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem value="no" id="required-no" />
											<Label htmlFor="required-no">No</Label>
										</div>
									</RadioGroup>
								</div>
							</div>
						</div>
					</ScrollArea>

					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => {
								setIsAddCustomerQuestionDialogOpen(false)
								setIsAddVendorQuestionDialogOpen(false)
							}}
						>
							Cancel
						</Button>
						<Button onClick={() => handleAddQuestion(isAddCustomerQuestionDialogOpen)}>Add Question</Button>
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
						<DialogDescription>Update the question details.</DialogDescription>
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
									<Label htmlFor="edit-question-page" className="text-right">
										Question Page
									</Label>
									<div className="col-span-3">
										<Select
											value={selectedQuestion.pageId}
											onValueChange={(value) => setSelectedQuestion({ ...selectedQuestion, pageId: value })}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select page" />
											</SelectTrigger>
											<SelectContent>
												{(activeTab === "customer" ? customerPages : vendorPages).map((page) => (
													<SelectItem key={page.id} value={page.id}>
														{page.title}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label className="text-right">Required</Label>
									<div className="flex items-center space-x-2 col-span-3">
										<RadioGroup
											value={selectedQuestion.required ? "yes" : "no"}
											onValueChange={(value) => setSelectedQuestion({ ...selectedQuestion, required: value === "yes" })}
											className="flex space-x-4"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="yes" id="edit-required-yes" />
												<Label htmlFor="edit-required-yes">Yes</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="no" id="edit-required-no" />
												<Label htmlFor="edit-required-no">No</Label>
											</div>
										</RadioGroup>
									</div>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label className="text-right">Status</Label>
									<div className="flex items-center space-x-2 col-span-3">
										<Select
											value={selectedQuestion.status || "active"}
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
						<Button
							variant="outline"
							onClick={() => {
								setIsEditQuestionDialogOpen(false)
								setSelectedQuestion(null)
							}}
						>
							Cancel
						</Button>
						<Button onClick={handleUpdateQuestion}>Update Question</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Edit Common Question Dialog */}
			<Dialog
				open={isEditCommonQuestionDialogOpen}
				onOpenChange={(open) => {
					if (!open) {
						setIsEditCommonQuestionDialogOpen(false)
						setSelectedCommonQuestion(null)
					}
				}}
			>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Edit Common Question</DialogTitle>
						<DialogDescription>Update the common question details</DialogDescription>
					</DialogHeader>

					{selectedCommonQuestion && (
						<ScrollArea className="max-h-[60vh]">
							<div className="grid gap-6 py-4 px-1">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="edit-common-question-text" className="text-right">
										Question Text
									</Label>
									<div className="col-span-3">
										<Input
											id="edit-common-question-text"
											value={selectedCommonQuestion.text}
											onChange={(e) => setSelectedCommonQuestion({ ...selectedCommonQuestion, text: e.target.value })}
											placeholder="Enter your question here"
										/>
									</div>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="edit-common-question-description" className="text-right">
										Description
									</Label>
									<div className="col-span-3">
										<Textarea
											id="edit-common-question-description"
											value={selectedCommonQuestion.description || ""}
											onChange={(e) =>
												setSelectedCommonQuestion({ ...selectedCommonQuestion, description: e.target.value })
											}
											placeholder="Optional description or instructions"
										/>
									</div>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label className="text-right">Required</Label>
									<div className="flex items-center space-x-2 col-span-3">
										<RadioGroup
											value={selectedCommonQuestion.required ? "yes" : "no"}
											onValueChange={(value) =>
												setSelectedCommonQuestion({ ...selectedCommonQuestion, required: value === "yes" })
											}
											className="flex space-x-4"
										>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="yes" id="edit-common-required-yes" />
												<Label htmlFor="edit-common-required-yes">Yes</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="no" id="edit-common-required-no" />
												<Label htmlFor="edit-common-required-no">No</Label>
											</div>
										</RadioGroup>
									</div>
								</div>

								<div className="grid grid-cols-4 items-center gap-4">
									<Label className="text-right">Status</Label>
									<div className="flex items-center space-x-2 col-span-3">
										<Select
											value={selectedCommonQuestion.status}
											onValueChange={(value) =>
												setSelectedCommonQuestion({ ...selectedCommonQuestion, status: value as "active" | "inactive" })
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
						<Button
							variant="outline"
							onClick={() => {
								setIsEditCommonQuestionDialogOpen(false)
								setSelectedCommonQuestion(null)
							}}
						>
							Cancel
						</Button>
						<Button onClick={handleUpdateCommonQuestion}>Update Question</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Delete Question Dialog */}
			<AlertDialog
				open={isDeleteQuestionDialogOpen}
				onOpenChange={(open) => {
					if (!open) {
						setIsDeleteQuestionDialogOpen(false)
						setSelectedQuestion(null)
					}
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the question.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDeleteQuestion}>Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</AdminLayout>
	)
}