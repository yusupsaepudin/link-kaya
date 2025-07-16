"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Heart, ShoppingBag, Star, Shield, Clock, ChevronDown, ChevronUp, Truck, Package, Zap, Tag } from "lucide-react"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils/formatters"
import Link from "next/link"
import { FloatingActionButtons } from "@/components/features/products/floating-action-buttons"
import { toast } from "sonner"
import { useCartStore } from "@/lib/stores/useCartStore"
import { motion, AnimatePresence } from "framer-motion"

interface EnhancedProductDetailProps {
  product: any
  user: any
  productWithPrice: any
  discount: number
}

export function EnhancedProductDetail({ 
  product, 
  user, 
  productWithPrice, 
  discount 
}: EnhancedProductDetailProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        {/* Simple Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100"
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
            
            <h1 className="text-lg font-semibold text-gray-800">
              @{user.username}
            </h1>
            
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
            </div>
          </div>
        </motion.div>
        
        {/* Product Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 p-1"
        >
          <div className="bg-white py-3 px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1">
                <Package className="h-3 w-3 mr-1" />
                Digital Product
              </Badge>
              <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-3 py-1">
                <Star className="h-3 w-3 mr-1" />
                Best Seller
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1">
                <Zap className="h-3 w-3 mr-1" />
                Instant Download
              </Badge>
              {discount > 0 && (
                <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
                  <Tag className="h-3 w-3 mr-1" />
                  Special Price
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        <div className="pb-32">
          <div className="bg-white rounded-t-3xl shadow-xl mt-6">
            {/* Main Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Left Column - Images */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="relative aspect-square w-full max-w-md mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden shadow-lg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
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
                  
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <motion.div
                      initial={{ rotate: -10, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="bg-red-500 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg">
                        <span className="text-xs font-bold">SAVE</span>
                        <span className="text-lg font-bold">{discount}%</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute top-4 left-4 p-3 rounded-full shadow-lg transition-all ${
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
                </div>
                
                {/* Image Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-3 justify-center">
                    {product.images.map((image: string, index: number) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-purple-500 shadow-lg' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Right Column - Product Info */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Product Title */}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  
                  {/* Trust Signals */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-current' : 'fill-gray-200'}`} />
                        ))}
                      </div>
                      <span className="font-medium text-gray-700">{rating}</span>
                      <span className="text-gray-500">({reviewCount} ulasan)</span>
                    </div>
                    
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      <Package className="h-3 w-3 mr-1" />
                      {soldCount} Terjual
                    </Badge>
                    
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Terverifikasi
                    </Badge>
                  </div>
                </div>

                {/* Price Section */}
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatCurrency(productWithPrice.resellerPrice)}
                    </span>
                    {productWithPrice.resellerPrice > product.basePrice && (
                      <>
                        <span className="text-lg text-gray-400 line-through">
                          {formatCurrency(product.basePrice)}
                        </span>
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                          -{discount}%
                        </Badge>
                      </>
                    )}
                  </div>
                  
                  {/* Stock Status */}
                  <div className="mt-4 flex items-center justify-between">
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
                    
                    {viewCount > 30 && (
                      <div className="flex items-center gap-1 text-sm text-amber-600">
                        <Clock className="h-4 w-4 animate-pulse" />
                        <span>{viewCount} sedang melihat</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Shipping Info */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Pengiriman Instant</p>
                      <p className="text-xs text-green-600">Download langsung setelah pembayaran</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Produk</h2>
                  <AnimatePresence>
                    <motion.div
                      initial={false}
                      animate={{ height: isDescriptionExpanded ? "auto" : "80px" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {product.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  {product.description.length > 150 && (
                    <button
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="mt-2 text-purple-600 font-medium flex items-center gap-1 hover:text-purple-700 transition-colors"
                    >
                      {isDescriptionExpanded ? (
                        <>Lihat lebih sedikit <ChevronUp className="h-4 w-4" /></>
                      ) : (
                        <>Lihat selengkapnya <ChevronDown className="h-4 w-4" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Category */}
                <div className="flex items-center justify-between py-4 px-5 bg-gray-50 rounded-xl">
                  <span className="text-sm text-gray-600">Kategori</span>
                  <Badge variant="outline" className="border-purple-300 text-purple-700">
                    {product.categoryId}
                  </Badge>
                </div>
              </motion.div>
            </div>

            {/* Made with Lynk */}
            <div className="text-center py-8 text-sm text-gray-500">
              made with <span className="font-semibold text-gray-700">LYNK</span>
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
    </div>
  )
}