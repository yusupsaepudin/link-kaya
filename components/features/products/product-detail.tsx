"use client"

import { Product, UserProfile } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Share2, Shield, Truck, Package } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils/formatters"
import { useCartStore } from "@/lib/stores/useCartStore"
import { toast } from "sonner"
import { useState } from "react"
import Link from "next/link"

interface ProductDetailProps {
  product: Product & { resellerPrice: number }
  reseller: UserProfile
}

export function ProductDetail({ product, reseller }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, reseller.id)
    }
    toast.success(`Added ${quantity} item(s) to cart!`)
  }

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} from your store`
    const whatsappNumber = reseller.phone?.replace(/\D/g, '')
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied!")
    }
  }

  const discount = Math.round(((product.basePrice - product.resellerPrice) / product.basePrice) * -100)

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Images */}
      <div className="space-y-4">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{product.categoryName}</Badge>
            <Badge variant="outline">{product.brandName}</Badge>
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="destructive">Only {product.stock} left</Badge>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{formatCurrency(product.resellerPrice)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatCurrency(product.basePrice)}
                </span>
                <Badge variant="destructive">+{discount}%</Badge>
              </>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleWhatsApp}
            >
              <FaWhatsapp className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="text-center">
            <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <span className="text-xs">100% Original</span>
          </div>
          <div className="text-center">
            <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <span className="text-xs">Fast Delivery</span>
          </div>
          <div className="text-center">
            <Package className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <span className="text-xs">Secure Package</span>
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            {product.specifications ? (
              <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex gap-2 text-sm">
                    <dt className="font-medium min-w-[120px]">{key}:</dt>
                    <dd className="text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-sm text-muted-foreground">No specifications available</p>
            )}
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Seller Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm font-medium mb-2">Sold by</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                {reseller.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{reseller.displayName}</p>
                <p className="text-xs text-muted-foreground">@{reseller.username}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${reseller.username}`}>View Store</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}