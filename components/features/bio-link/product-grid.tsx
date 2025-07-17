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
      <div className="text-center py-20 min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-20 h-20 mx-auto mb-4 opacity-30">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.28M17 13H7" />
          </svg>
        </div>
        <p className="text-muted-foreground text-lg mb-2">Belum ada produk tersedia</p>
        <p className="text-muted-foreground text-sm">Produk akan segera ditambahkan</p>
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