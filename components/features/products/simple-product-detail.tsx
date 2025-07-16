"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Heart, ShoppingBag, Star, Clock, ChevronDown, ChevronUp, Truck, Package } from "lucide-react"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils/formatters"
import Link from "next/link"
import { FloatingActionButtons } from "@/components/features/products/floating-action-buttons"
import { toast } from "sonner"
import { useCartStore } from "@/lib/stores/useCartStore"
import { motion, AnimatePresence } from "framer-motion"

interface SimpleProductDetailProps {
  product: any
  user: any
  productWithPrice: any
  discount: number
}

export function SimpleProductDetail({ 
  product, 
  user, 
  productWithPrice, 
  discount 
}: SimpleProductDetailProps) {
  const cartCount = useCartStore((state) => state.getItemCount())
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const rating = 4.8
  const reviewCount = 127
  const soldCount = Math.floor(Math.random() * 500) + 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[540px] mx-auto bg-white min-h-screen shadow-xl">
        {/* Simple Header */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-gray-100 -ml-2"
            >
              <Link href={`/${user.username}`}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            
            <h1 className="text-lg font-semibold text-gray-800">
              @{user.username}
            </h1>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 relative"
                asChild
              >
                <Link href={`/${user.username}/cart`}>
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-green-600 text-white text-[10px]">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={async () => {
                  try {
                    await navigator.share({
                      title: product.name,
                      text: `Check out ${product.name}`,
                      url: window.location.href,
                    })
                  } catch (err) {
                    navigator.clipboard.writeText(window.location.href)
                    toast.success("Link disalin!")
                  }
                }}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pb-32">
          {/* Product Image */}
          <div className="relative aspect-square w-full bg-gray-100">
            <Image
              src={product.images[currentImageIndex] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Badges */}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                Hemat {discount}%
              </div>
            )}
            
            {/* Wishlist */}
            <button
              className={`absolute bottom-4 right-4 p-2.5 rounded-full shadow-md transition-all ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white'
              }`}
              onClick={() => {
                setIsWishlisted(!isWishlisted)
                toast.success(isWishlisted ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist")
              }}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            
            {/* Image Dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {product.images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="px-4 py-4 space-y-4">
            {/* Trust Badges */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? 'fill-current' : 'fill-gray-200'}`} />
                  ))}
                </div>
                <span className="font-medium text-gray-700">{rating}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{soldCount} Terjual</span>
            </div>

            {/* Product Name */}
            <h1 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(productWithPrice.resellerPrice)}
              </span>
              {productWithPrice.resellerPrice > product.basePrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(product.basePrice)}
                </span>
              )}
            </div>

            {/* Stock & Shipping */}
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  product.stock > 10 ? 'bg-green-500' : 
                  product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-gray-700">
                  {product.stock > 10 ? 'Stok Tersedia' : 
                   product.stock > 0 ? `Tersisa ${product.stock} pcs` : 'Stok Habis'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-green-600" />
                <span>Instant Download</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-100 pt-4">
              <h2 className="text-sm font-medium text-gray-900 mb-2">Deskripsi</h2>
              <AnimatePresence>
                <motion.div
                  initial={false}
                  animate={{ height: isDescriptionExpanded ? "auto" : "60px" }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </motion.div>
              </AnimatePresence>
              {product.description.length > 100 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-2 text-sm text-purple-600 font-medium flex items-center gap-1"
                >
                  {isDescriptionExpanded ? (
                    <>Lihat lebih sedikit <ChevronUp className="h-3 w-3" /></>
                  ) : (
                    <>Lihat selengkapnya <ChevronDown className="h-3 w-3" /></>
                  )}
                </button>
              )}
            </div>

            {/* Category */}
            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <span className="text-sm text-gray-500">Kategori</span>
              <span className="text-sm text-gray-900">{product.categoryId}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-6 text-xs text-gray-400">
            made with <span className="font-semibold text-gray-600">LYNK</span>
          </div>
        </div>
        
        {/* Floating Action Buttons */}
        <FloatingActionButtons
          product={productWithPrice}
          resellerId={user.id}
          disabled={product.stock === 0}
        />
      </div>
    </div>
  )
}