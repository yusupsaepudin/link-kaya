"use client"

import { Product } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils/formatters"
import { useCartStore } from "@/lib/stores/useCartStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product & { resellerPrice: number }
  resellerId: string
  username?: string
  variant?: "compact" | "detailed"
}

export function ProductCard({ product, resellerId, username, variant = "compact" }: ProductCardProps) {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem(product, resellerId)
    toast.success("Added to cart!")
  }

  const handleClick = () => {
    const path = username ? `/${username}/produk/${product.slug}` : `/${resellerId}/produk/${product.slug}`
    router.push(path)
  }

  const discount = Math.round(((product.basePrice - product.resellerPrice) / product.basePrice) * -100)

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="aspect-square relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 right-2" variant="destructive">
            +{discount}%
          </Badge>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <Badge className="absolute top-2 left-2" variant="secondary">
            {product.stock} left
          </Badge>
        )}
      </div>
      
      <CardContent className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 mb-1">
          {product.name}
        </h3>
        
        {variant === "detailed" && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between gap-2 mb-2">
          <div>
            <div className="text-lg font-bold">
              {formatCurrency(product.resellerPrice)}
            </div>
            {product.resellerPrice > product.basePrice && (
              <div className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.basePrice)}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
          >
            <Eye className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}