import { UserProfile, ResellerProduct, Product } from '@/types'
import { mockProducts } from './products'

export const mockUsers: UserProfile[] = [
  // Resellers
  {
    id: 'user-1',
    username: 'sarahbeauty',
    displayName: 'Sarah Beauty Shop',
    bio: '✨ Reseller kecantikan terpercaya | 💄 Skincare & Makeup | 📍 Jakarta | 💬 Chat untuk order',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=400&fit=crop',
    role: 'reseller',
    email: 'sarah@example.com',
    phone: '+62 812 3456 7890',
    socialLinks: [
      { id: '1', platform: 'instagram', url: 'https://instagram.com/sarahbeauty' },
      { id: '2', platform: 'whatsapp', url: 'https://wa.me/6281234567890' },
      { id: '3', platform: 'tiktok', url: 'https://tiktok.com/@sarahbeauty' }
    ],
    resellerInfo: {
      tier: 'gold',
      commission: 25,
      totalSales: 450,
      totalEarnings: 12500000,
      joinedAt: new Date('2023-01-01'),
      payoutMethod: 'bank',
      payoutDetails: { bankName: 'BCA', accountNumber: '1234567890' }
    },
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'user-2',
    username: 'techdeals',
    displayName: 'Tech Deals Indonesia',
    bio: '📱 Aksesoris tech terbaik | 🚚 Ready stock | 💯 Original dijamin | 📍 Surabaya',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=techdeals',
    coverImage: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=1200&h=400&fit=crop',
    role: 'reseller',
    email: 'techdeals@example.com',
    phone: '+62 813 4567 8901',
    socialLinks: [
      { id: '1', platform: 'instagram', url: 'https://instagram.com/techdeals' },
      { id: '2', platform: 'whatsapp', url: 'https://wa.me/6281345678901' },
      { id: '3', platform: 'website', url: 'https://techdeals.id' }
    ],
    resellerInfo: {
      tier: 'silver',
      commission: 20,
      totalSales: 234,
      totalEarnings: 8900000,
      joinedAt: new Date('2023-03-15')
    },
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2024-01-09')
  },
  {
    id: 'user-3',
    username: 'healthyshop',
    displayName: 'Healthy Living Store',
    bio: '🌿 Suplemen alami | 💊 Vitamin & wellness | 🏃 Partner kesehatan Anda | 💚 Terpercaya sejak 2023',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=healthy',
    role: 'reseller',
    email: 'healthy@example.com',
    socialLinks: [
      { id: '1', platform: 'instagram', url: 'https://instagram.com/healthyshop' },
      { id: '2', platform: 'whatsapp', url: 'https://wa.me/6281456789012' }
    ],
    resellerInfo: {
      tier: 'bronze',
      commission: 15,
      totalSales: 123,
      totalEarnings: 4500000,
      joinedAt: new Date('2023-06-01')
    },
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-01-11')
  },

  // Brands (already have brand accounts)
  {
    id: 'brand-user-1',
    username: 'glowbeauty',
    displayName: 'Glow Beauty Official',
    bio: 'Akun resmi Glow Beauty. Skincare premium untuk kulit bercahaya.',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=glowbeauty&backgroundColor=FFE4E1',
    role: 'brand',
    email: 'admin@glowbeauty.com',
    socialLinks: [
      { id: '1', platform: 'instagram', url: 'https://instagram.com/glowbeauty' },
      { id: '2', platform: 'website', url: 'https://glowbeauty.com' }
    ],
    brandInfo: {
      companyName: 'Glow Beauty',
      description: 'Premium skincare and beauty products',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=glowbeauty&backgroundColor=FFE4E1',
      website: 'https://glowbeauty.com',
      establishedAt: new Date('2020-01-01'),
      totalProducts: 45,
      totalResellers: 128,
      verified: true
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-10')
  },

  // Regular buyers
  {
    id: 'buyer-1',
    username: 'janedoe',
    displayName: 'Jane Doe',
    bio: 'Pecinta kecantikan | Skincare enthusiast',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    role: 'buyer',
    email: 'jane@example.com',
    phone: '+62 815 6789 0123',
    socialLinks: [
      { id: '1', platform: 'instagram', url: 'https://instagram.com/janedoe' }
    ],
    createdAt: new Date('2023-08-01'),
    updatedAt: new Date('2024-01-08')
  }
]

// Mock reseller products (products added to reseller stores)
export const mockResellerProducts: ResellerProduct[] = [
  // Sarah's products
  {
    id: 'rp-1',
    resellerId: 'user-1',
    productId: 'prod-1',
    product: mockProducts[0], // Vitamin C Serum
    sellingPrice: 199000,
    markup: 49000,
    isActive: true,
    views: 1234,
    clicks: 234,
    sales: 89,
    addedAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'rp-2',
    resellerId: 'user-1',
    productId: 'prod-2',
    product: mockProducts[1], // Sheet Mask
    sellingPrice: 99000,
    markup: 24000,
    isActive: true,
    views: 890,
    clicks: 156,
    sales: 67,
    addedAt: new Date('2023-07-20'),
    updatedAt: new Date('2024-01-09')
  },
  {
    id: 'rp-3',
    resellerId: 'user-1',
    productId: 'prod-5',
    product: mockProducts[4], // Tote Bag
    sellingPrice: 489000,
    markup: 139000,
    isActive: true,
    views: 567,
    clicks: 89,
    sales: 23,
    addedAt: new Date('2023-08-10'),
    updatedAt: new Date('2024-01-08')
  },

  // TechDeals products
  {
    id: 'rp-4',
    resellerId: 'user-2',
    productId: 'prod-3',
    product: mockProducts[2], // Wireless Charger
    sellingPrice: 269000,
    markup: 69000,
    isActive: true,
    views: 2345,
    clicks: 456,
    sales: 123,
    addedAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: 'rp-5',
    resellerId: 'user-2',
    productId: 'prod-4',
    product: mockProducts[3], // Phone Case
    sellingPrice: 159000,
    markup: 39000,
    isActive: true,
    views: 1890,
    clicks: 345,
    sales: 156,
    addedAt: new Date('2023-09-15'),
    updatedAt: new Date('2024-01-10')
  },

  // HealthyShop products
  {
    id: 'rp-6',
    resellerId: 'user-3',
    productId: 'prod-7',
    product: mockProducts[6], // Omega-3
    sellingPrice: 259000,
    markup: 79000,
    isActive: true,
    views: 1567,
    clicks: 234,
    sales: 89,
    addedAt: new Date('2023-10-01'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: 'rp-7',
    resellerId: 'user-3',
    productId: 'prod-8',
    product: mockProducts[7], // Vitamin D3
    sellingPrice: 169000,
    markup: 49000,
    isActive: true,
    views: 2345,
    clicks: 456,
    sales: 234,
    addedAt: new Date('2023-10-15'),
    updatedAt: new Date('2024-01-11')
  }
]

export function getUserByUsername(username: string): UserProfile | undefined {
  return mockUsers.find(user => user.username === username)
}

export function getResellerProducts(resellerId: string): ResellerProduct[] {
  return mockResellerProducts.filter(rp => rp.resellerId === resellerId)
}

export function getUserByEmail(email: string): UserProfile | undefined {
  return mockUsers.find(user => user.email === email)
}

export function getAllResellers(): UserProfile[] {
  return mockUsers.filter(user => user.role === 'reseller')
}

export function getBrandProducts(_brandId: string): Product[] {
  // This would normally return brand products, but we'll use mock products for now
  return []
}