import { notFound } from "next/navigation"
import { getUserByUsername, getResellerProducts } from "@/lib/mock"
import { SimpleHeader } from "@/components/features/bio-link/simple-header"
import { ProfileSection } from "@/components/features/bio-link/profile-section"
import { ProductGrid } from "@/components/features/bio-link/product-grid"
import { CategoryFilter } from "@/components/features/bio-link/category-filter"
import { CommunityVoucherSection } from "@/components/features/bio-link/community-voucher-section"
import { CommunityProductShowcase } from "@/components/features/bio-link/community-product-showcase"
import { categories } from "@/lib/mock/products"

interface ProfilePageProps {
  params: Promise<{
    username: string
  }>
  searchParams: Promise<{
    category?: string
  }>
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { username } = await params
  const { category } = await searchParams
  const user = getUserByUsername(username)
  
  if (!user || user.role !== 'reseller') {
    notFound()
  }

  const products = getResellerProducts(user.id)
  const selectedCategory = category

  // Filter products by category if selected
  const filteredProducts = selectedCategory
    ? products.filter(rp => rp.product?.categoryId === selectedCategory)
    : products

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader username={username} />
      
      <div className="bg-white">
        <div className="container-mobile">
          <ProfileSection user={user} />
          
          <CommunityVoucherSection resellerId={user.id} />
          
          <CommunityProductShowcase resellerId={user.id} username={username} />
          
          {products.length > 0 && (
            <div className="pb-8">
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                username={username}
              />
              
              <ProductGrid 
                products={filteredProducts}
                resellerId={user.id}
                username={username}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  // In production, this would fetch from API
  return [
    { username: 'sarahbeauty' },
    { username: 'techdeals' },
    { username: 'healthyshop' },
  ]
}