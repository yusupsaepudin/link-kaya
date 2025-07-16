"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { useCartStore } from "@/lib/stores/useCartStore"
import { Product } from "@/types"
import { toast } from "sonner"

interface AddToCartButtonProps {
  product: Product & { resellerPrice: number }
  resellerId: string
  disabled?: boolean
}

export function AddToCartButton({ product, resellerId, disabled }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, resellerId)
    }
    toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`)
    setQuantity(1)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="flex gap-3">
      <div className="flex items-center border rounded-lg">
        <Button
          variant="ghost"
          size="icon"
          onClick={decrementQuantity}
          disabled={quantity <= 1}
          className="h-12 w-12"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={incrementQuantity}
          disabled={quantity >= product.stock}
          className="h-12 w-12"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        className="flex-1 h-12"
        onClick={handleAddToCart}
        disabled={disabled}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  )
}