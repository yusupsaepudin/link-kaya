"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ArrowLeft, CreditCard, Smartphone, Loader2 } from "lucide-react"
import { useCartStore } from "@/lib/stores/useCartStore"
import { formatCurrency } from "@/lib/utils/formatters"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("transfer")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Create order
    const orderId = `ORD-${Date.now()}`
    
    // Clear cart
    clearCart()
    
    toast.success("Order placed successfully!")
    router.push(`/checkout/order/${orderId}`)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to cart
              </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Customer Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
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
                            required
                            disabled={isProcessing}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+62"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          disabled={isProcessing}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Jl. Example No. 123"
                          required
                          disabled={isProcessing}
                        />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            required
                            disabled={isProcessing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            required
                            disabled={isProcessing}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                        <Input
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Apartment, suite, etc."
                          disabled={isProcessing}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
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
                                Bank Transfer
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                Transfer to BCA, Mandiri, or BNI
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="ewallet" id="ewallet" className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor="ewallet" className="flex items-center gap-2 cursor-pointer">
                                <Smartphone className="h-4 w-4" />
                                E-Wallet
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                GoPay, OVO, DANA, or ShopeePay
                              </p>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        {items.map((item) => (
                          <div key={item.product.id} className="flex gap-3">
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity} × {formatCurrency(item.product.resellerPrice)}
                              </p>
                            </div>
                            <p className="text-sm font-medium">
                              {formatCurrency(item.product.resellerPrice * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>{formatCurrency(getTotal())}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span className="text-green-600">Free</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex justify-between font-semibold text-lg mb-6">
                        <span>Total</span>
                        <span>{formatCurrency(getTotal())}</span>
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full" 
                        size="lg"
                        disabled={isProcessing}
                      >
                        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isProcessing ? "Processing..." : "Place Order"}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center mt-4">
                        By placing this order, you agree to our terms and conditions
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}