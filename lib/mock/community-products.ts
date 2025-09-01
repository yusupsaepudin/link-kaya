import { Product } from '@/types/product'

export const communityProducts: Product[] = [
  {
    id: 'comm-prod-1',
    slug: 'community-beauty-box',
    name: 'Jakarta Beauty Community Box',
    description: 'Exclusive beauty box curated for Jakarta Beauty Community members. Contains premium skincare and makeup products from top brands. Available only through community vouchers!',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800',
    ],
    basePrice: 250000,
    recommendedPrice: 350000,
    commission: 25, // Higher commission for community products
    brandId: 'brand-1',
    brandName: 'Community Exclusive',
    categoryId: 'beauty',
    categoryName: 'Beauty',
    stock: 50,
    isActive: true,
    isCommunityExclusive: true,
    requiredVoucherType: 'event',
    tags: ['community', 'exclusive', 'limited-edition'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: 'comm-prod-2',
    slug: 'community-skincare-set',
    name: 'Community Glow Set',
    description: 'Special skincare set for community members. Get glowing skin with this exclusive collection!',
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38e39?w=800',
    ],
    basePrice: 180000,
    recommendedPrice: 250000,
    commission: 20,
    brandId: 'brand-1',
    brandName: 'Community Exclusive',
    categoryId: 'beauty',
    categoryName: 'Beauty',
    stock: 100,
    isActive: true,
    isCommunityExclusive: true,
    tags: ['community', 'skincare', 'special-price'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  }
]

// Helper function to check if a product is community exclusive
export function isCommunityProduct(productId: string): boolean {
  return communityProducts.some(p => p.id === productId)
}

// Helper function to get community products for a reseller
export function getCommunityProductsForReseller(_resellerId: string): Product[] {
  // In a real app, this would filter based on reseller's communities
  return communityProducts.filter(p => p.isActive)
}