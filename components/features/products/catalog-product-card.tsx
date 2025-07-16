"use client"

import { Product } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, TrendingUp } from "lucide-react"
import Image from "next/image"
import { formatCurrency, formatPercentage } from "@/lib/utils/formatters"
import { useState } from "react"
import { AddProductDialog } from "./add-product-dialog"

interface CatalogProductCardProps {
  product: Product
}

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <>
      <Card className="overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-black/75">
            {formatPercentage(product.commission)} commission
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">{product.brandName}</p>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Base Price:</span>
              <span className="text-sm font-medium">{formatCurrency(product.basePrice)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Recommended:</span>
              <span className="text-sm font-medium">{formatCurrency(product.recommendedPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-green-600">
              <span className="text-xs">Potential Profit:</span>
              <span className="text-sm font-medium">
                {formatCurrency(product.recommendedPrice - product.basePrice)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span>{product.sold} sold</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-3 w-3" />
          </Button>
          <Button size="sm" className="flex-1" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-3 w-3 mr-1" />
            Add to Store
          </Button>
        </CardFooter>
      </Card>

      <AddProductDialog
        product={product}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
    </>
  )
}