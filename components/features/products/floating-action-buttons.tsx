"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Minus, Plus, Check } from "lucide-react"
import { useCartStoreClient } from "@/lib/stores/useCartStore"
import { Product } from "@/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface FloatingActionButtonsProps {
  product: Product & { resellerPrice: number }
  resellerId: string
  username: string
  disabled?: boolean
}

export function FloatingActionButtons({ product, resellerId, username, disabled }: FloatingActionButtonsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const [justAddedToCart, setJustAddedToCart] = useState(false)
  const { addItem, clearCart } = useCartStoreClient()
  const router = useRouter()

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    // Add some delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 400))
    
    for (let i = 0; i < quantity; i++) {
      addItem(product, resellerId)
    }
    
    setIsAddingToCart(false)
    setJustAddedToCart(true)
    
    toast.success(`${quantity} ${product.name} berhasil ditambahkan ke keranjang!`, {
      duration: 4000,
      action: {
        label: 'Lihat Keranjang',
        onClick: () => {
          // Navigate to cart or show cart
        }
      }
    })
    
    setQuantity(1)
    
    // Reset the success state after 3 seconds
    setTimeout(() => setJustAddedToCart(false), 3000)
  }

  const handleBuyNow = async () => {
    setIsBuyingNow(true)
    
    // Add some delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Clear cart and add current item
    clearCart()
    for (let i = 0; i < quantity; i++) {
      addItem(product, resellerId)
    }
    
    // Navigate to checkout
    router.push(`/${username}/checkout`)
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
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-[540px] mx-auto">
        <div className="bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-gray-100">
          <div className="px-4">
            {/* Quantity Selector and Price */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Jumlah:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-8 w-8 rounded-full border-gray-300"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="h-8 w-8 rounded-full border-gray-300"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-lg font-bold text-gray-900">
                  Rp {(product.resellerPrice * quantity).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="py-3">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className={`flex-1 h-12 border-gray-300 font-medium transition-all duration-300 ${
                    justAddedToCart ? 'border-green-500 text-green-600' : ''
                  } ${isAddingToCart ? 'scale-95' : 'scale-100'}`}
                  disabled={disabled || isAddingToCart || isBuyingNow}
                  onClick={handleAddToCart}
                >
                  {isAddingToCart ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                      Menambahkan...
                    </>
                  ) : justAddedToCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-600" />
                      Ditambahkan!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Tambah ke Keranjang
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  className={`flex-1 h-12 bg-mediakaya-red hover:bg-mediakaya-red-dark text-white font-medium transition-all duration-300 ${
                    isBuyingNow ? 'scale-95' : 'scale-100'
                  }`}
                  disabled={disabled || isAddingToCart || isBuyingNow}
                  onClick={handleBuyNow}
                >
                  {isBuyingNow ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Memproses...
                    </>
                  ) : (
                    'Beli Sekarang'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}