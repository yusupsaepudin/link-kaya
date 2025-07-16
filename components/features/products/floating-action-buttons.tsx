"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { useCartStore } from "@/lib/stores/useCartStore"
import { Product } from "@/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils/formatters"

interface FloatingActionButtonsProps {
  product: Product & { resellerPrice: number }
  resellerId: string
  disabled?: boolean
}

export function FloatingActionButtons({ product, resellerId, disabled }: FloatingActionButtonsProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, resellerId)
    }
    toast.success(`${quantity} produk ditambahkan ke keranjang`)
    setQuantity(1)
  }

  const handleBuyNow = () => {
    // Clear cart and add current item
    useCartStore.getState().clearCart()
    for (let i = 0; i < quantity; i++) {
      addItem(product, resellerId)
    }
    router.push(`/${resellerId}/checkout`)
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
                  <span className="w-8 text-center font-semibold text-gray-900">{quantity}</span>
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
                  {formatCurrency(product.resellerPrice * quantity)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="py-3">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 h-12 border-gray-300 font-medium"
                  disabled={disabled}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Keranjang
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-medium"
                  disabled={disabled}
                  onClick={handleBuyNow}
                >
                  Beli Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}