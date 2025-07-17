"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { useCartStoreClient } from "@/lib/stores/useCartStore"
import { Product } from "@/types"

interface AddToCartButtonProps {
  product: Product & { resellerPrice: number }
  resellerId: string
  className?: string
}

export function AddToCartButton({ product, resellerId, className }: AddToCartButtonProps) {
  const { addItem } = useCartStoreClient()

  const handleAddToCart = () => {
    addItem(product, resellerId)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <Button 
      onClick={handleAddToCart}
      className={`bg-green-500 hover:bg-green-600 ${className || ''}`}
      size="sm"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add
    </Button>
  )
}