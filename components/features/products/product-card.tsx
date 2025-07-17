"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils/formatters"
import { useCartStoreClient } from "@/lib/stores/useCartStore"
import { Product } from "@/types"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product & { resellerPrice: number }
  resellerId: string
  username: string
}

export function ProductCard({ product, resellerId, username }: ProductCardProps) {
  const { addItem } = useCartStoreClient()

  const handleAddToCart = () => {
    addItem(product, resellerId)
    toast.success(`${product.name} added to cart`)
  }

  // Calculate discount percentage
  const discountPercentage = product.resellerPrice > product.basePrice 
    ? Math.round(((product.resellerPrice - product.basePrice) / product.basePrice) * 100)
    : 0

  return (
    <Card className="overflow-hidden group">
      <Link href={`/${username}/produk/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              +{discountPercentage}%
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/${username}/produk/${product.slug}`}>
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">
              {formatCurrency(product.resellerPrice)}
            </span>
            {product.resellerPrice > product.basePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.basePrice)}
              </span>
            )}
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-green-500 hover:bg-green-600"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardContent>
    </Card>
  )
}