"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils/formatters"
import { Product } from "@/types"

interface SimpleProductDetailProps {
  product: Product & { resellerPrice: number }
  resellerId: string
}

export function SimpleProductDetail({ product, resellerId }: SimpleProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Calculate discount percentage
  const discountPercentage = product.resellerPrice > product.basePrice 
    ? Math.round(((product.resellerPrice - product.basePrice) / product.basePrice) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square relative overflow-hidden rounded-lg border">
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            fill
            className="object-cover"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-4 left-4 bg-red-500 text-white">
              +{discountPercentage}%
            </Badge>
          )}
        </div>
        
        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
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

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-4">{product.description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">
              {formatCurrency(product.resellerPrice)}
            </span>
            {product.resellerPrice > product.basePrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatCurrency(product.basePrice)}
              </span>
            )}
          </div>
        </div>

        <Separator />

        {/* Product Details */}
        <div className="space-y-4">
          <h3 className="font-semibold">Product Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Brand:</span>
              <p className="font-medium">{product.brandName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Category:</span>
              <p className="font-medium">{product.categoryName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Stock:</span>
              <p className="font-medium">{product.stock} available</p>
            </div>
            <div>
              <span className="text-muted-foreground">SKU:</span>
              <p className="font-medium">{product.id}</p>
            </div>
          </div>
        </div>

        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold">Specifications</h3>
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}