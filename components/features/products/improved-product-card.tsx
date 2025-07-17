"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils/formatters"
import { useCartStoreClient } from "@/lib/stores/useCartStore"
import { Product } from "@/types"
import { toast } from "sonner"
import { useState } from "react"

interface ImprovedProductCardProps {
  product: Product & { resellerPrice: number }
  resellerId: string
  username: string
}

export function ImprovedProductCard({ product, resellerId, username }: ImprovedProductCardProps) {
  const { addItem } = useCartStoreClient()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    // Add some delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300))
    
    addItem(product, resellerId)
    setIsAdding(false)
    setJustAdded(true)
    
    toast.success(`${product.name} berhasil ditambahkan ke keranjang!`, {
      duration: 3000,
      action: {
        label: 'Lihat Keranjang',
        onClick: () => {
          // Scroll to cart or show cart - for now just close toast
        }
      }
    })
    
    // Reset the success state after 2 seconds
    setTimeout(() => setJustAdded(false), 2000)
  }

  // Calculate discount percentage
  const discountPercentage = product.resellerPrice > product.basePrice 
    ? Math.round(((product.resellerPrice - product.basePrice) / product.basePrice) * 100)
    : 0

  return (
    <Card className="overflow-hidden group p-0">
      <Link href={`/${username}/produk/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              +{discountPercentage}%
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="px-4 pb-4 pt-3">
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
          disabled={isAdding}
          className={`w-full transition-all duration-300 ${
            justAdded 
              ? 'bg-green-600 hover:bg-green-600' 
              : 'bg-green-500 hover:bg-green-600'
          } ${isAdding ? 'scale-95' : 'scale-100'}`}
          size="sm"
        >
          {isAdding ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Menambahkan...
            </>
          ) : justAdded ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Ditambahkan!
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Tambah ke Keranjang
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}