"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define the report structure types
export interface ReportSubcategoryItem {
  id: string
  name: string
}

export interface ReportSubcategory {
  id: string
  name: string
  items: ReportSubcategoryItem[]
}

export interface ReportCategory {
  id: string
  name: string
  icon: React.ReactNode
  subcategories: ReportSubcategory[]
}

interface ReportTabsProps {
  categories: ReportCategory[]
  onSelectReport: (categoryId: string, subcategoryId: string, itemId: string) => void
  className?: string
}

export function ReportTabs({ categories, onSelectReport, className }: ReportTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "")
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({})

  // Toggle subcategory expansion
  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [subcategoryId]: !prev[subcategoryId],
    }))
  }

  // Handle report item selection
  const handleReportSelect = (categoryId: string, subcategoryId: string, itemId: string) => {
    onSelectReport(categoryId, subcategoryId, itemId)
  }

  return (
    <div className={cn("w-full", className)}>
      <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <div className="relative overflow-auto">
          <TabsList className="w-full justify-start mb-4 overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2 px-4 py-2">
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="space-y-1">
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.id} className="border rounded-md overflow-hidden mb-2">
                  <Button
                    variant="ghost"
                    onClick={() => toggleSubcategory(subcategory.id)}
                    className="w-full flex items-center justify-between p-3 text-left font-medium"
                  >
                    <span>{subcategory.name}</span>
                    {expandedSubcategories[subcategory.id] ? (
                      <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
                    )}
                  </Button>

                  {expandedSubcategories[subcategory.id] && (
                    <div className="px-3 pb-3 pt-0">
                      <div className="space-y-1">
                        {subcategory.items.map((item) => (
                          <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full justify-start pl-6 text-sm font-normal"
                            onClick={() => handleReportSelect(category.id, subcategory.id, item.id)}
                          >
                            {item.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

