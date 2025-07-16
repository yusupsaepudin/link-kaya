import { notFound } from "next/navigation"
import { getUserByUsername, getResellerProducts } from "@/lib/mock"
import { ProfileHeader } from "@/components/features/bio-link/profile-header"
import { SocialLinks } from "@/components/features/bio-link/social-links"
import { ProductGrid } from "@/components/features/bio-link/product-grid"
import { CategoryFilter } from "@/components/features/bio-link/category-filter"
import { categories } from "@/lib/mock/products"
import { Suspense } from "react"
import { ProfileHeaderSkeleton } from "@/components/shared/loading-states"

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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container-mobile py-8">
        <Suspense fallback={<ProfileHeaderSkeleton />}>
          <ProfileHeader user={user} />
        </Suspense>
        
        <SocialLinks links={user.socialLinks} />
        
        {products.length > 0 && (
          <>
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              username={username}
            />
            
            <ProductGrid 
              products={filteredProducts}
              resellerId={user.id}
            />
          </>
        )}
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