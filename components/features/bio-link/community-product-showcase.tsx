'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Users, Gift, Lock, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatRupiah } from '@/lib/utils'
import { communityProducts } from '@/lib/mock/community-products'

interface CommunityProductShowcaseProps {
  resellerId: string
  username: string
}

export function CommunityProductShowcase({ resellerId: _resellerId, username }: CommunityProductShowcaseProps) {
  const [selectedProduct, setSelectedProduct] = useState(0)
  
  // Get first 2 community products for showcase
  const showcaseProducts = communityProducts.slice(0, 2)
  
  if (showcaseProducts.length === 0) {
    return null
  }
  
  const currentProduct = showcaseProducts[selectedProduct]
  
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Community Exclusive</h2>
        </div>
        <Badge variant="secondary" className="text-xs">
          <Lock className="h-3 w-3 mr-1" />
          Voucher Required
        </Badge>
      </div>
      
      <Card className="border shadow-sm">
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={currentProduct.images[0]}
              alt={currentProduct.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Product Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground border-0">
                  Community Special
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {currentProduct.commission}% Commission
                </Badge>
              </div>
              
              <h3 className="font-bold text-lg mb-1">{currentProduct.name}</h3>
              <p className="text-sm text-white/90 line-clamp-2">
                {currentProduct.description}
              </p>
            </div>
          </div>
          
          {/* Product Selector Dots */}
          {showcaseProducts.length > 1 && (
            <div className="absolute top-4 right-4 flex gap-2">
              {showcaseProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedProduct(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === selectedProduct 
                      ? 'bg-white w-6' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground line-through">
                {formatRupiah(currentProduct.recommendedPrice)}
              </p>
              <p className="text-2xl font-bold text-primary">
                {formatRupiah(currentProduct.basePrice)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground">Exclusive Product</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Users className="h-4 w-4 text-primary" />
            <p className="text-sm">
              <span className="font-medium">50+ members</span> have claimed this deal
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span className="text-muted-foreground">In Stock</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 bg-primary rounded-full" />
              <span className="text-muted-foreground">Limited Time</span>
            </div>
          </div>
          
          <Button asChild className="w-full">
            <Link href={`/${username}/produk/${currentProduct.slug}`}>
              View Details
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          
          <p className="text-xs text-center text-muted-foreground mt-2">
            Scan community QR code to unlock this deal
          </p>
        </CardContent>
      </Card>
      
      {/* Additional Products Grid */}
      {showcaseProducts.length > 1 && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {showcaseProducts.map((product, index) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(index)}
              className={`p-3 rounded-lg border transition-all ${
                index === selectedProduct 
                  ? 'border-primary bg-gray-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-medium line-clamp-1">{product.name}</p>
                  <p className="text-xs text-primary font-semibold">
                    {formatRupiah(product.basePrice)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}