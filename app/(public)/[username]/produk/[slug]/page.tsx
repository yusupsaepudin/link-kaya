import { notFound } from "next/navigation"
import { getUserByUsername, getResellerProducts } from "@/lib/mock"
import { getProductBySlug } from "@/lib/mock/products"
import { communityProducts } from "@/lib/mock/community-products"
import { SimpleProductDetail } from "@/components/features/products/simple-product-detail"
import { FloatingActionButtons } from "@/components/features/products/floating-action-buttons"
import { SimpleHeader } from "@/components/features/bio-link/simple-header"

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

  // Try to find product in regular products first
  let product = getProductBySlug(slug)
  
  // If not found, check community products
  if (!product) {
    const communityProduct = communityProducts.find(p => p.slug === slug)
    if (communityProduct) {
      product = communityProduct
    }
  }
  
  if (!product) {
    notFound()
  }

  // For community products, use base price as selling price
  let productWithPrice
  if (product.isCommunityExclusive) {
    productWithPrice = {
      ...product,
      resellerPrice: product.basePrice
    }
  } else {
    const resellerProducts = getResellerProducts(user.id)
    const resellerProduct = resellerProducts.find(rp => rp.productId === product.id)
    
    if (!resellerProduct || !resellerProduct.isActive) {
      notFound()
    }
    
    productWithPrice = {
      ...product,
      resellerPrice: resellerProduct.sellingPrice
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader 
        username={username} 
        showBackButton={true}
        hideCartIcon={false}
        hideWishlistIcon={false}
      />
      
      <div className="bg-white min-h-screen">
        <div className="container-mobile py-8">
          <SimpleProductDetail
            product={productWithPrice}
            resellerId={user.id}
          />
        </div>
      </div>
      
      <FloatingActionButtons
        product={productWithPrice}
        resellerId={user.id}
        username={username}
      />
    </div>
  )
}