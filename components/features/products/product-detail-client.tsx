"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Heart, ShoppingBag, MoreVertical, Star, Shield, TrendingUp, Clock, ChevronDown, ChevronUp, Truck, Package } from "lucide-react"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils/formatters"
import Link from "next/link"
import { FloatingActionButtons } from "@/components/features/products/floating-action-buttons"
import { toast } from "sonner"
import { useCartStore } from "@/lib/stores/useCartStore"
import { motion, AnimatePresence } from "framer-motion"

interface ProductDetailClientProps {
  product: any
  user: any
  productWithPrice: any
  discount: number
}

export function ProductDetailClient({ 
  product, 
  user, 
  productWithPrice, 
  discount 
}: ProductDetailClientProps) {
  const cartCount = useCartStore((state) => state.getItemCount())
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 50) + 20)
  
  // Simulate real-time viewers
  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const rating = 4.8
  const reviewCount = 127
  const soldCount = Math.floor(Math.random() * 500) + 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-screen-sm mx-auto bg-white min-h-screen shadow-xl">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100"
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-gray-100 -ml-2 transition-all"
            >
              <Link href={`/${user.username}`}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 relative transition-all"
                asChild
              >
                <Link href={`/${user.username}/cart`}>
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-green-600 text-white text-[10px] animate-pulse">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 transition-all"
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
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 transition-all"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
        
        <div className="pb-32">
          {/* Enhanced Product Images with Gallery */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[currentImageIndex] || product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Glassmorphism Badges */}
              {discount > 0 && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 shadow-lg" variant="destructive">
                    <TrendingUp className="h-3 w-3 mr-1 inline" />
                    Hemat {discount}%
                  </Badge>
                </motion.div>
              )}
              
              {/* Live Viewers */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium">{viewCount} sedang melihat</span>
              </motion.div>
              
              {product.stock < 10 && product.stock > 0 && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Badge className="absolute bottom-4 left-4 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1.5 shadow-lg animate-pulse">
                    <Clock className="h-3 w-3 mr-1 inline" />
                    Stok Terbatas!
                  </Badge>
                </motion.div>
              )}
              
              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all ${
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
              </motion.button>
              
              {/* Image Dots Indicator */}
              {product.images.length > 1 && (
                <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {product.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-white w-6' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <div className="px-4">
            {/* Enhanced Product Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="py-4 space-y-4"
            >
              {/* Trust Signals */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-current' : 'fill-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{rating}</span>
                    <span className="text-sm text-gray-500">({reviewCount})</span>
                  </div>
                  {/* Sold Count */}
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    <Package className="h-3 w-3 mr-1" />
                    {soldCount} Terjual
                  </Badge>
                </div>
                
                {/* Verified Badge */}
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  <Shield className="h-3 w-3 mr-1" />
                  Terverifikasi
                </Badge>
              </div>

              {/* Price Section with Animation */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatCurrency(productWithPrice.resellerPrice)}
                  </span>
                  {productWithPrice.resellerPrice > product.basePrice && (
                    <span className="text-base text-gray-400 line-through">
                      {formatCurrency(product.basePrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      -{discount}%
                    </Badge>
                  )}
                </div>
              </motion.div>

              {/* Product Name */}
              <h1 className="text-xl font-semibold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Enhanced Stock Status with Shipping */}
              <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      product.stock > 10 ? 'bg-green-500 animate-pulse' : 
                      product.stock > 0 ? 'bg-amber-500 animate-pulse' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-700">
                      {product.stock > 10 ? 'Stok Tersedia' : 
                       product.stock > 0 ? `Tersisa ${product.stock} pcs` : 'Stok Habis'}
                    </span>
                  </div>
                  {product.stock > 0 && product.stock < 10 && (
                    <span className="text-xs text-amber-600 font-medium">Segera habis!</span>
                  )}
                </div>
                
                {/* Shipping Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Dikirim dalam 1-2 hari kerja</span>
                </div>
              </div>

              {/* Expandable Description */}
              <div className="pt-4 border-t border-gray-100">
                <h2 className="text-sm font-medium text-gray-900 mb-2">Deskripsi Produk</h2>
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
                    className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1 hover:text-green-700 transition-colors"
                  >
                    {isDescriptionExpanded ? (
                      <>Lihat lebih sedikit <ChevronUp className="h-4 w-4" /></>
                    ) : (
                      <>Lihat selengkapnya <ChevronDown className="h-4 w-4" /></>
                    )}
                  </button>
                )}
              </div>

              {/* Category with Icon */}
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Kategori</span>
                <Badge variant="outline" className="border-gray-300">
                  {product.categoryId}
                </Badge>
              </div>

              {/* Urgency Message */}
              {viewCount > 30 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2"
                >
                  <Clock className="h-4 w-4 text-amber-600 animate-pulse" />
                  <span className="text-sm text-amber-800">
                    {viewCount} orang sedang melihat produk ini
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Floating Action Buttons */}
          <FloatingActionButtons
            product={productWithPrice}
            resellerId={user.id}
            disabled={product.stock === 0}
          />
        </div>
      </div>
    </div>
  )
}