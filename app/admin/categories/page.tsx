"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, ArrowRight, FileTextIcon as FileText2 } from "lucide-react"
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

type Subcategory = {
  id: string
  name: string
}

// Add a CommonQuestion type
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

// Add a ServiceOption type for the new question type
type ServiceOption = {
  id: string
  title: string
  description: string
  price: number
  currency: string
}

// Add a commonQuestions array to the Category type
type Category = {
  id: string
  name: string
  description: string
  icon: string
  vendors: number
  jobs: number
  status: "active" | "inactive"
  subcategories: Subcategory[]
  questions: Question[]
  terms?: string
  commonQuestions: CommonQuestion[]
}

export default function CategoriesPage() {
  // Sample category data
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Confectioner",
      description: "Catering services, food preparation, and event catering",
      icon: "🍰",
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
      terms: "All confectioners must have proper food handling certifications and follow local health regulations.",
      commonQuestions: [
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
      ],
    },
    {
      id: "2",
      name: "Photographer",
      description: "Professional photography services for events and occasions",
      icon: "📸",
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
      terms: "Photographers must provide their own equipment and have liability insurance.",
      commonQuestions: [
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
              description: "Comprehensive photography coverage for your entire event, from preparation to conclusion.",
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
    },
    // ... other categories
  ])

  // Update the newCategory state to include commonQuestions
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    description: "",
    icon: "",
    status: "active",
    subcategories: [],
    questions: [],
    terms: "",
    commonQuestions: [],
  })

  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newSubcategory, setNewSubcategory] = useState("")
  const [newQuestion, setNewQuestion] = useState("")
  // Add state for new common question
  const [newCommonQuestion, setNewCommonQuestion] = useState<Partial<CommonQuestion>>({
    text: "",
    type: "text",
    required: true,
    status: "active",
  })

  // Add state for new service option
  const [newServiceOption, setNewServiceOption] = useState<Partial<ServiceOption>>({
    title: "",
    description: "",
    price: 0,
    currency: "₹",
  })
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false)

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([
        ...categories,
        {
          ...newCategory,
          id: (categories.length + 1).toString(),
          vendors: 0,
          jobs: 0,
          subcategories: [],
          questions: [],
        } as Category,
      ])
      setNewCategory({
        name: "",
        description: "",
        icon: "",
        status: "active",
        subcategories: [],
        questions: [],
        terms: "",
        commonQuestions: [],
      })
    }
  }

  const handleEditCategory = (category: Category, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditingCategory(category)
  }

  const handleUpdateCategory = () => {
    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? editingCategory : c)))
      setEditingCategory(null)
    }
  }

  const handleAddSubcategory = () => {
    if (editingCategory && newSubcategory) {
      const updatedCategory = {
        ...editingCategory,
        subcategories: [...editingCategory.subcategories, { id: Date.now().toString(), name: newSubcategory }],
      }
      setEditingCategory(updatedCategory)
      setNewSubcategory("")
    }
  }

  const handleAddQuestion = () => {
    if (editingCategory && newQuestion) {
      const updatedCategory = {
        ...editingCategory,
        questions: [...editingCategory.questions, { id: Date.now().toString(), text: newQuestion }],
      }
      setEditingCategory(updatedCategory)
      setNewQuestion("")
    }
  }

  // Add function to handle adding a common question
  const handleAddCommonQuestion = () => {
    if (editingCategory && newCommonQuestion.text) {
      const question: CommonQuestion = {
        id: Date.now().toString(),
        text: newCommonQuestion.text,
        description: newCommonQuestion.description,
        type: newCommonQuestion.type as any,
        required: newCommonQuestion.required || false,
        status: newCommonQuestion.status as "active" | "inactive",
        options: newCommonQuestion.type === "service_options" ? [] : undefined,
      }

      setEditingCategory({
        ...editingCategory,
        commonQuestions: [...editingCategory.commonQuestions, question],
      })

      setNewCommonQuestion({
        text: "",
        type: "text",
        required: true,
        status: "active",
      })
    }
  }

  // Add function to handle adding a service option
  const handleAddServiceOption = (questionId: string) => {
    if (editingCategory && newServiceOption.title) {
      const option: ServiceOption = {
        id: Date.now().toString(),
        title: newServiceOption.title,
        description: newServiceOption.description || "",
        price: newServiceOption.price || 0,
        currency: newServiceOption.currency || "₹",
      }

      const updatedQuestions = editingCategory.commonQuestions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [...(q.options || []), option],
          }
        }
        return q
      })

      setEditingCategory({
        ...editingCategory,
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

  const handleDeleteSubcategory = (subcategoryId: string) => {
    if (editingCategory) {
      const updatedSubcategories = editingCategory.subcategories.filter((sub) => sub.id !== subcategoryId)
      setEditingCategory({ ...editingCategory, subcategories: updatedSubcategories })
    }
  }

  const handleDeleteQuestion = (questionId: string) => {
    if (editingCategory) {
      const updatedQuestions = editingCategory.questions.filter((q) => q.id !== questionId)
      setEditingCategory({ ...editingCategory, questions: updatedQuestions })
    }
  }

  // Add function to handle deleting a common question
  const handleDeleteCommonQuestion = (questionId: string) => {
    if (editingCategory) {
      const updatedQuestions = editingCategory.commonQuestions.filter((q) => q.id !== questionId)
      setEditingCategory({
        ...editingCategory,
        commonQuestions: updatedQuestions,
      })
    }
  }

  // Add function to handle deleting a service option
  const handleDeleteServiceOption = (questionId: string, optionId: string) => {
    if (editingCategory) {
      const updatedQuestions = editingCategory.commonQuestions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options?.filter((opt) => opt.id !== optionId),
          }
        }
        return q
      })

      setEditingCategory({
        ...editingCategory,
        commonQuestions: updatedQuestions,
      })
    }
  }

  // Add function to toggle question status
  const toggleQuestionStatus = (questionId: string) => {
    if (editingCategory) {
      const updatedQuestions = editingCategory.commonQuestions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            status: q.status === "active" ? "inactive" : "active",
          }
        }
        return q
      })

      setEditingCategory({
        ...editingCategory,
        commonQuestions: updatedQuestions,
      })
    }
  }

  const handleViewTerms = (category: Category, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCategory(category)
    setIsTermsDialogOpen(true)
  }

  const handleUpdateTerms = () => {
    if (selectedCategory) {
      setCategories(categories.map((c) => (c.id === selectedCategory.id ? selectedCategory : c)))
      setIsTermsDialogOpen(false)
      setSelectedCategory(null)
    }
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Service Categories</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>Create a new service category for vendors.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="icon" className="text-right">
                    Icon
                  </Label>
                  <Input
                    id="icon"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                    className="col-span-3"
                    placeholder="Enter an emoji or icon"
                  />
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="terms" className="text-right">
                    Terms & Conditions
                  </Label>
                  <Textarea
                    id="terms"
                    value={newCategory.terms}
                    onChange={(e) => setNewCategory({ ...newCategory, terms: e.target.value })}
                    className="col-span-3"
                    placeholder="Enter terms and conditions for this category"
                  />
                </div> */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewCategory({ ...newCategory, status: value as "active" | "inactive" })
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
                <Button onClick={handleAddCategory}>Add Category</Button>
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
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <Link href={`/admin/categories/${category.id}`} className="block">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </CardTitle>
                  <Badge variant={category.status === "active" ? "default" : "secondary"}>{category.status}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <div className="mt-4 flex space-x-4 text-sm">
                    <div>
                      <span className="font-medium">{category.vendors}</span>
                      <span className="text-muted-foreground ml-1">vendors</span>
                    </div>
                    <div>
                      <span className="font-medium">{category.jobs}</span>
                      <span className="text-muted-foreground ml-1">jobs</span>
                    </div>
                    <div>
                      <span className="font-medium">{category.subcategories.length}</span>
                      <span className="text-muted-foreground ml-1">subcategories</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-primary">
                    <span>View subcategories</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Link>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="ghost" size="icon" onClick={(e) => handleViewTerms(category, e)}>
                  <FileText2 className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={(e) => handleEditCategory(category, e)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Edit Category: {category.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="edit-name"
                          value={editingCategory?.name || ""}
                          onChange={(e) =>
                            setEditingCategory((prev) => (prev ? { ...prev, name: e.target.value } : null))
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
                          value={editingCategory?.description || ""}
                          onChange={(e) =>
                            setEditingCategory((prev) => (prev ? { ...prev, description: e.target.value } : null))
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
                          value={editingCategory?.icon || ""}
                          onChange={(e) =>
                            setEditingCategory((prev) => (prev ? { ...prev, icon: e.target.value } : null))
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-terms" className="text-right">
                          Terms & Conditions
                        </Label>
                        <Textarea
                          id="edit-terms"
                          value={editingCategory?.terms || ""}
                          onChange={(e) =>
                            setEditingCategory((prev) => (prev ? { ...prev, terms: e.target.value } : null))
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
                            setEditingCategory((prev) =>
                              prev ? { ...prev, status: value as "active" | "inactive" } : null,
                            )
                          }
                          defaultValue={editingCategory?.status}
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
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right">Subcategories</Label>
                        <div className="col-span-3 space-y-2">
                          {editingCategory?.subcategories.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between">
                              <span>{sub.name}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteSubcategory(sub.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex items-center space-x-2">
                            <Input
                              value={newSubcategory}
                              onChange={(e) => setNewSubcategory(e.target.value)}
                              placeholder="New subcategory"
                            />
                            <Button onClick={handleAddSubcategory}>Add</Button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right">Profile Questions</Label>
                        <div className="col-span-3 space-y-2">
                          {editingCategory?.questions.map((q) => (
                            <div key={q.id} className="flex items-center justify-between">
                              <span>{q.text}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteQuestion(q.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <div className="flex items-center space-x-2">
                            <Input
                              value={newQuestion}
                              onChange={(e) => setNewQuestion(e.target.value)}
                              placeholder="New question"
                            />
                            <Button onClick={handleAddQuestion}>Add</Button>
                          </div>
                        </div>
                      </div>
                      {/* Add the Common Questions section to the Edit Category dialog */}
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right">Common Questions</Label>
                        <div className="col-span-3 space-y-4">
                          {editingCategory?.commonQuestions.map((q) => (
                            <div key={q.id} className="border p-4 rounded-md space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium">{q.text}</span>
                                  <Badge variant={q.status === "active" ? "default" : "secondary"} className="ml-2">
                                    {q.status}
                                  </Badge>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" onClick={() => toggleQuestionStatus(q.id)}>
                                    {q.status === "active" ? "Deactivate" : "Activate"}
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCommonQuestion(q.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Type: {q.type}
                                {q.required && <span className="ml-2">• Required</span>}
                              </div>
                              {q.description && <div className="text-sm italic">{q.description}</div>}
                              {q.type === "service_options" && q.options && q.options.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  <Label className="text-sm">Service Options:</Label>
                                  {q.options.map((opt) => (
                                    <div key={opt.id} className="border p-2 rounded-md">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <div className="font-medium">{opt.title}</div>
                                          <div className="text-sm text-muted-foreground">{opt.description}</div>
                                          <div className="text-sm font-medium mt-1">
                                            {opt.currency}
                                            {opt.price}
                                          </div>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleDeleteServiceOption(q.id, opt.id)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="space-y-2 mt-4 border-t pt-2">
                                    <Label className="text-sm">Add New Option</Label>
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
                                      size="sm"
                                      onClick={() => handleAddServiceOption(q.id)}
                                      disabled={!newServiceOption.title}
                                    >
                                      Add Option
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          <div className="border p-4 rounded-md space-y-2">
                            <Label>Add New Question</Label>
                            <Input
                              placeholder="Question Text"
                              value={newCommonQuestion.text}
                              onChange={(e) => setNewCommonQuestion({ ...newCommonQuestion, text: e.target.value })}
                            />
                            <Textarea
                              placeholder="Question Description (optional)"
                              value={newCommonQuestion.description}
                              onChange={(e) =>
                                setNewCommonQuestion({ ...newCommonQuestion, description: e.target.value })
                              }
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs">Question Type</Label>
                                <Select
                                  value={newCommonQuestion.type}
                                  onValueChange={(value) =>
                                    setNewCommonQuestion({ ...newCommonQuestion, type: value as any })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
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
                              <div>
                                <Label className="text-xs">Required</Label>
                                <Select
                                  value={newCommonQuestion.required ? "yes" : "no"}
                                  onValueChange={(value) =>
                                    setNewCommonQuestion({ ...newCommonQuestion, required: value === "yes" })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Required?" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <Button onClick={handleAddCommonQuestion} disabled={!newCommonQuestion.text}>
                              Add Question
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleUpdateCategory}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="icon" onClick={(e) => e.preventDefault()}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Terms and Conditions Dialog */}
      <Dialog open={isTermsDialogOpen} onOpenChange={setIsTermsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Category Description: {selectedCategory?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={selectedCategory?.terms || ""}
              onChange={(e) => selectedCategory && setSelectedCategory({ ...selectedCategory, terms: e.target.value })}
              className="min-h-[200px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTermsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTerms}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}

