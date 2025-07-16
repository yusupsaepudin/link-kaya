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
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button
          variant={selectedCategory ? "outline" : "default"}
          size="sm"
          onClick={() => handleCategoryChange()}
          className="rounded-full whitespace-nowrap"
        >
          All Products
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category.id)}
            className="rounded-full whitespace-nowrap"
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}