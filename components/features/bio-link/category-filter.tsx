"use client"

import { Category } from "@/types"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string
  username: string
}

export function CategoryFilter({ categories, selectedCategory, username }: CategoryFilterProps) {
  const router = useRouter()

  const handleCategoryChange = (categoryId?: string) => {
    if (categoryId) {
      router.push(`/${username}?category=${categoryId}`)
    } else {
      router.push(`/${username}`)
    }
  }

  return (
    <div className="mb-6 -mx-4 px-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button
          variant={selectedCategory ? "outline" : "default"}
          size="sm"
          onClick={() => handleCategoryChange()}
          className={`rounded-full whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm font-medium transition-all duration-200 ${
            selectedCategory 
              ? "border-gray-300 text-gray-700 hover:bg-gray-50 bg-white" 
              : "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
          }`}
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category.id)}
            className={`rounded-full whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
            }`}
          >
            <span className="mr-1.5 text-base">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}