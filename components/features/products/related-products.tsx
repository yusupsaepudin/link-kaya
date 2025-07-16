import { ResellerProduct } from "@/types"
import { ProductCard } from "./product-card"

interface RelatedProductsProps {
  products: ResellerProduct[]
  resellerId: string
  username?: string
}

export function RelatedProducts({ products, resellerId, username }: RelatedProductsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((resellerProduct) => (
        <ProductCard
          key={resellerProduct.id}
          product={{
            ...resellerProduct.product!,
            resellerPrice: resellerProduct.sellingPrice
          }}
          resellerId={resellerId}
          username={username}
          variant="compact"
        />
      ))}
    </div>
  )
}