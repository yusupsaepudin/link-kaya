"use client"

import { useState, useEffect } from "react"
import { SimpleHeader } from "@/components/features/bio-link/simple-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Package, Truck, Home, Search } from "lucide-react"
import { formatCurrency } from "@/lib/utils/formatters"
import { format } from "date-fns"

interface TrackingPageProps {
  params: Promise<{
    username: string
    invoiceId: string
  }>
}

export default function TrackingPage({ params }: TrackingPageProps) {
  const [invoiceId, setInvoiceId] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [searchInvoice, setSearchInvoice] = useState('')
  
  // Extract invoiceId from params
  useEffect(() => {
    params.then(p => {
      setInvoiceId(p.invoiceId)
      setUsername(p.username)
      setSearchInvoice(p.invoiceId)
    })
  }, [params])
  
  if (!invoiceId) {
    return <div>Loading...</div>
  }

  // Mock order tracking data
  const orderData = {
    invoiceId,
    orderId: `ORD-${Date.now()}`,
    status: "shipped",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    total: 350000,
    items: [
      {
        id: "1",
        name: "Hydrating Face Mask Set",
        quantity: 2,
        price: 125000
      },
      {
        id: "2",
        name: "Vitamin C Serum",
        quantity: 1,
        price: 100000
      }
    ],
    shipping: {
      courier: "JNE",
      trackingNumber: "JNE123456789",
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      address: {
        name: "John Doe",
        phone: "+6281234567890",
        street: "Jl. Example No. 123",
        city: "Jakarta",
        postalCode: "12345"
      }
    },
    timeline: [
      {
        status: "pending",
        title: "Pesanan Diterima",
        description: "Pesanan Anda telah diterima",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        completed: true
      },
      {
        status: "processing",
        title: "Pembayaran Dikonfirmasi",
        description: "Pembayaran telah dikonfirmasi",
        date: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
        completed: true
      },
      {
        status: "shipped",
        title: "Pesanan Dikirim",
        description: "Paket telah diserahkan ke kurir",
        date: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000),
        completed: true
      },
      {
        status: "delivered",
        title: "Dalam Pengiriman",
        description: "Paket akan tiba hari ini",
        date: null,
        completed: false
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "default"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return Package
      case "processing":
        return Package
      case "shipped":
        return Truck
      case "delivered":
        return Home
      default:
        return Package
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader username={username} />
      
      <div className="bg-white min-h-screen">
        <div className="container-mobile py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Lacak Pesanan Anda</h1>

            {/* Search Bar */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <form className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="invoice" className="sr-only">Invoice ID</Label>
                    <Input
                      id="invoice"
                      placeholder="Masukkan ID invoice (contoh: INV-123456)"
                      value={searchInvoice}
                      onChange={(e) => setSearchInvoice(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="bg-mediakaya-red hover:bg-mediakaya-red-dark">
                    <Search className="mr-2 h-4 w-4" />
                    Lacak
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Status */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Status Pesanan</CardTitle>
                  <Badge variant={getStatusColor(orderData.status)}>
                    {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID Invoice</span>
                    <span className="font-mono">{orderData.invoiceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tanggal Pesanan</span>
                    <span>{format(orderData.createdAt, "dd MMM yyyy, HH:mm")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Pembayaran</span>
                    <span className="font-semibold">{formatCurrency(orderData.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Riwayat Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderData.timeline.map((item, index) => {
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.completed 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {item.completed ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <Circle className="h-5 w-5" />
                            )}
                          </div>
                          {index < orderData.timeline.length - 1 && (
                            <div className={`w-0.5 h-20 ${
                              item.completed ? "bg-primary" : "bg-muted"
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <h4 className={`font-semibold ${
                            !item.completed && "text-muted-foreground"
                          }`}>
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                          {item.date && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(item.date, "dd MMM yyyy, HH:mm")}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Informasi Pengiriman</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Kurir</p>
                    <p className="font-medium">{orderData.shipping.courier}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Nomor Resi</p>
                    <p className="font-mono font-medium">{orderData.shipping.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Estimasi Tiba</p>
                    <p className="font-medium">
                      {format(orderData.shipping.estimatedDelivery, "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Alamat Pengiriman</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{orderData.shipping.address.name}</p>
                    <p>{orderData.shipping.address.phone}</p>
                    <p>{orderData.shipping.address.street}</p>
                    <p>{orderData.shipping.address.city}, {orderData.shipping.address.postalCode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Item Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}