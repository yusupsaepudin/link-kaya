"use client"

import { ResellerProduct } from "@/types"
import { ImprovedProductCard } from "@/components/features/products/improved-product-card"
import { motion } from "framer-motion"

interface ProductGridProps {
  products: ResellerProduct[]
  resellerId: string
  username: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function ProductGrid({ products, resellerId, username }: ProductGridProps) {
  const activeProducts = products.filter(p => p.isActive)

  if (activeProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products available</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-3 sm:gap-4"
    >
      {activeProducts.map((resellerProduct) => (
        <motion.div key={resellerProduct.id} variants={item}>
          <ImprovedProductCard
            product={{
              ...resellerProduct.product!,
              resellerPrice: resellerProduct.sellingPrice
            }}
            resellerId={resellerId}
            username={username}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}