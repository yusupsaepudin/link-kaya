"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { SimpleHeader } from "@/components/features/bio-link/simple-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ArrowLeft, CreditCard, Smartphone, Loader2 } from "lucide-react"
import { useCartStoreClient } from "@/lib/stores/useCartStore"
import { formatCurrency } from "@/lib/utils/formatters"
import Image from "next/image"
import Link from "next/link"
import { getUserByUsername } from "@/lib/mock"
import { notFound } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const params = useParams()
  const username = params.username as string
  const { items, getTotal, clearCart } = useCartStoreClient()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("transfer")
  const [user, setUser] = useState<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: ""
  })

  useEffect(() => {
    const userData = getUserByUsername(username)
    if (!userData || userData.role !== 'reseller') {
      notFound()
    }
    setUser(userData)
  }, [username])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Create order
    const orderId = `ORD-${Date.now()}`
    
    // Clear cart
    clearCart()
    
    toast.success("Pesanan berhasil dibuat!")
    router.push(`/${username}/checkout/order/${orderId}`)
  }

  if (!user) {
    return null // Loading state
  }

  if (items.length === 0) {
    router.push(`/${username}/cart`)
    return null
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
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Pelanggan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={isProcessing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isProcessing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+62"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isProcessing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alamat Pengiriman</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Jl. Example No. 123"
                  disabled={isProcessing}
                />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">Kota</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={isProcessing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Kode Pos</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    disabled={isProcessing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Catatan Pengiriman (Opsional)</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Apartemen, nomor unit, dll."
                  disabled={isProcessing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metode Pembayaran</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                disabled={isProcessing}
              >
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="transfer" id="transfer" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-4 w-4" />
                        Transfer Bank
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Bayar melalui transfer bank untuk menyelesaikan pesanan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                        <Smartphone className="h-4 w-4" />
                        Bayar di Tempat (COD)
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Bayar saat menerima pesanan
                      </p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Jumlah: {item.quantity} × {formatCurrency(item.product.resellerPrice)}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(item.product.resellerPrice * item.quantity)}
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(getTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ongkir</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(getTotal())}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600" 
            size="lg"
            disabled={isProcessing}
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Buat Pesanan
          </Button>
        </form>
        </div>
      </div>
    </div>
  )
}