import { notFound } from "next/navigation"
import { getUserByUsername, getResellerProducts } from "@/lib/mock"
import { getProductBySlug } from "@/lib/mock/products"
import { ProductDetail } from "@/components/features/products/product-detail"
import { Header } from "@/components/shared/header"
import { RelatedProducts } from "@/components/features/products/related-products"

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

  // Get related products from same category
  const relatedProducts = resellerProducts
    .filter(rp => 
      rp.productId !== product.id && 
      rp.product?.categoryId === product.categoryId &&
      rp.isActive
    )
    .slice(0, 4)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <ProductDetail
            product={{
              ...product,
              resellerPrice: resellerProduct.sellingPrice
            }}
            reseller={user}
          />
          
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <RelatedProducts
                products={relatedProducts}
                resellerId={user.id}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}