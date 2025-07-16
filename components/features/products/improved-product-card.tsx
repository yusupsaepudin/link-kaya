"use client"

import { Product } from "@/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils/formatters"
import { useCartStore } from "@/lib/stores/useCartStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ImprovedProductCardProps {
  product: Product & { resellerPrice: number }
  resellerId: string
  username?: string
}

export function ImprovedProductCard({ product, resellerId, username }: ImprovedProductCardProps) {
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
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white dark:bg-card rounded-lg"
      onClick={handleClick}
    >
      <div className="aspect-square relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0 px-2 py-1 text-xs font-semibold rounded-md">
            +{discount}%
          </Badge>
        )}
        
        {/* Mobile Quick Actions */}
        <div className="absolute bottom-2 right-2 flex gap-2 md:hidden">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/95 backdrop-blur-sm shadow-md hover:bg-white"
            onClick={(e) => {
              e.stopPropagation()
              handleClick()
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="h-8 w-8 rounded-full shadow-md bg-green-500 hover:bg-green-600"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <h3 className="font-medium text-sm line-clamp-2 leading-tight text-gray-900 dark:text-white">
          {product.name}
        </h3>
        
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="text-base font-bold text-gray-900 dark:text-white">
              {formatCurrency(product.resellerPrice)}
            </div>
            {product.resellerPrice > product.basePrice && (
              <div className="text-xs text-gray-500 line-through">
                {formatCurrency(product.basePrice)}
              </div>
            )}
          </div>
          
          {/* Desktop Cart Button */}
          <Button
            size="sm"
            className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 h-auto text-xs"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-3 w-3" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}