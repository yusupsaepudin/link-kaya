"use client"

import { Product } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { formatCurrency, calculateMarkupPercentage } from "@/lib/utils"
import { toast } from "sonner"
import Image from "next/image"
import { TrendingUp } from "lucide-react"

interface AddProductDialogProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductDialog({ product, open, onOpenChange }: AddProductDialogProps) {
  const [sellingPrice, setSellingPrice] = useState(product.recommendedPrice.toString())
  
  const price = parseInt(sellingPrice) || 0
  const markup = price - product.basePrice
  const markupPercentage = calculateMarkupPercentage(product.basePrice, price)
  const commission = Math.floor(markup * (product.commission / 100))

  const handleAdd = () => {
    if (price < product.basePrice) {
      toast.error("Selling price cannot be lower than base price")
      return
    }

    // In real app, this would call an API
    toast.success(`${product.name} added to your store!`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Product to Your Store</DialogTitle>
          <DialogDescription>
            Set your selling price for this product
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Product Info */}
          <div className="flex gap-4">
            <div className="relative h-20 w-20 rounded-lg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-muted-foreground">{product.brandName}</p>
              <p className="text-sm">Base price: {formatCurrency(product.basePrice)}</p>
            </div>
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <Label htmlFor="price">Your Selling Price</Label>
            <Input
              id="price"
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              min={product.basePrice}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: {formatCurrency(product.recommendedPrice)}
            </p>
          </div>

          {/* Profit Calculation */}
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Base Price:</span>
              <span>{formatCurrency(product.basePrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Your Price:</span>
              <span className="font-medium">{formatCurrency(price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Markup:</span>
              <span className="text-green-600">
                +{formatCurrency(markup)} ({markupPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-medium">Your Commission ({product.commission}%):</span>
              <span className="font-medium text-green-600">
                {formatCurrency(commission)}
              </span>
            </div>
          </div>

          {/* Success Indicator */}
          {product.sold && product.sold > 50 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>This product has sold {product.sold} units on our platform</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={price < product.basePrice}>
            Add to Store
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}