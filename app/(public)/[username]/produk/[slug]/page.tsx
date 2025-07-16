import { notFound } from "next/navigation"
import { getUserByUsername, getResellerProducts } from "@/lib/mock"
import { getProductBySlug } from "@/lib/mock/products"
import { SimpleProductDetail } from "@/components/features/products/simple-product-detail"

interface ProductPageProps {
  params: Promise<{
    username: string
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { username, slug } = await params
  const user = getUserByUsername(username)
  
  if (!user || user.role !== 'reseller') {
    notFound()
  }

  const product = getProductBySlug(slug)
  if (!product) {
    notFound()
  }

  const resellerProducts = getResellerProducts(user.id)
  const resellerProduct = resellerProducts.find(rp => rp.productId === product.id)
  
  if (!resellerProduct || !resellerProduct.isActive) {
    notFound()
  }

  const productWithPrice = {
    ...product,
    resellerPrice: resellerProduct.sellingPrice
  }

  const discount = Math.round(((product.basePrice - productWithPrice.resellerPrice) / product.basePrice) * -100)

  return (
    <SimpleProductDetail
      product={product}
      user={user}
      productWithPrice={productWithPrice}
      discount={discount}
    />
  )
}