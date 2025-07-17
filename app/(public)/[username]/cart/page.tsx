"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { SimpleHeader } from "@/components/features/bio-link/simple-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import { useCartStoreClient } from "@/lib/stores/useCartStore"
import { formatCurrency } from "@/lib/utils/formatters"
import Image from "next/image"
import { toast } from "sonner"
import { getUserByUsername } from "@/lib/mock"
import { notFound } from "next/navigation"

export default function CartPage() {
  const router = useRouter()
  const params = useParams()
  const username = params.username as string
  const { items, removeItem, updateQuantity, getTotal } = useCartStoreClient()
  const [promoCode, setPromoCode] = useState("")
  const [user, setUser] = useState<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    const userData = getUserByUsername(username)
    if (!userData || userData.role !== 'reseller') {
      notFound()
    }
    setUser(userData)
  }, [username])

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Keranjang Anda kosong")
      return
    }
    router.push(`/${username}/checkout`)
  }


  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (!user) {
    return null // Loading state
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SimpleHeader 
          username={username} 
          showBackButton={true}
          hideCartIcon={true}
          hideWishlistIcon={true}
        />
        <div className="bg-white min-h-screen">
          <div className="container-mobile py-12">
            <div className="text-center">
              <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Keranjang Belanja Kosong</h1>
              <p className="text-muted-foreground mb-8">
                Belum ada produk yang ditambahkan ke keranjang Anda.
              </p>
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                <Link href={`/${username}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Lanjut Belanja
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader 
        username={username} 
        showBackButton={true}
        hideCartIcon={true}
        hideWishlistIcon={true}
      />
      
      <div className="bg-white min-h-screen">
        <div className="container-mobile py-8">
        <h1 className="text-2xl font-bold mb-6">Keranjang Belanja ({items.length} produk)</h1>
            
        <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <Card key={item.product.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {user.displayName}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 0)}
                                className="w-16 text-center h-8"
                                min="1"
                              />
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold">
                                {formatCurrency(item.product.resellerPrice * item.quantity)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {formatCurrency(item.product.resellerPrice)} per item
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
        </div>
        
        {/* Order Summary */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatCurrency(getTotal())}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ongkir</span>
                        <span className="text-green-600">Gratis</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Kode promo"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button variant="outline">Gunakan</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between font-semibold text-lg mb-6">
                      <span>Total</span>
                      <span>{formatCurrency(getTotal())}</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600" 
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Lanjut ke Checkout
                    </Button>

          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}