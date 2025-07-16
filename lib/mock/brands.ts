import { Brand } from '@/types'

export const mockBrands: Brand[] = [
  {
    id: 'brand-1',
    name: 'Glow Beauty',
    slug: 'glow-beauty',
    description: 'Premium skincare and beauty products for all skin types. Natural ingredients, cruelty-free.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=glowbeauty&backgroundColor=FFE4E1',
    coverImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop',
    website: 'https://glowbeauty.com',
    email: 'partner@glowbeauty.com',
    phone: '+62 812 3456 7890',
    address: 'Jakarta, Indonesia',
    socialMedia: {
      instagram: '@glowbeauty',
      facebook: 'glowbeautyofficial'
    },
    categories: ['beauty', 'skincare'],
    totalProducts: 45,
    totalResellers: 128,
    totalSales: 3420,
    rating: 4.8,
    verified: true,
    commissionRate: 20,
    joinedAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'brand-2',
    name: 'TechGear Pro',
    slug: 'techgear-pro',
    description: 'High-quality tech accessories and gadgets. From phone cases to smart home devices.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=techgear&backgroundColor=E6E6FA',
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop',
    website: 'https://techgearpro.com',
    email: 'sales@techgearpro.com',
    phone: '+62 813 4567 8901',
    categories: ['electronics', 'accessories'],
    totalProducts: 67,
    totalResellers: 89,
    totalSales: 2150,
    rating: 4.6,
    verified: true,
    commissionRate: 15,
    joinedAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: 'brand-3',
    name: 'Fashion Forward',
    slug: 'fashion-forward',
    description: 'Trendy clothing and accessories for the modern lifestyle. Quality meets affordability.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=fashionforward&backgroundColor=FFF0F5',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    email: 'contact@fashionforward.id',
    phone: '+62 814 5678 9012',
    categories: ['fashion', 'accessories'],
    totalProducts: 120,
    totalResellers: 234,
    totalSales: 5670,
    rating: 4.7,
    verified: true,
    commissionRate: 25,
    joinedAt: new Date('2022-11-10'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: 'brand-4',
    name: 'Healthy Life',
    slug: 'healthy-life',
    description: 'Organic supplements and health products. Your partner in wellness journey.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=healthylife&backgroundColor=F0FFF0',
    coverImage: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=1200&h=400&fit=crop',
    website: 'https://healthylife.co.id',
    email: 'info@healthylife.co.id',
    categories: ['health', 'supplements'],
    totalProducts: 34,
    totalResellers: 156,
    totalSales: 4320,
    rating: 4.9,
    verified: true,
    commissionRate: 30,
    joinedAt: new Date('2023-02-01'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: 'brand-5',
    name: 'Home Essentials',
    slug: 'home-essentials',
    description: 'Everything you need to make your house a home. Quality home goods and decor.',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=homeessentials&backgroundColor=FFFAF0',
    coverImage: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&h=400&fit=crop',
    email: 'support@homeessentials.id',
    categories: ['home', 'lifestyle'],
    totalProducts: 78,
    totalResellers: 67,
    totalSales: 1890,
    rating: 4.5,
    verified: false,
    commissionRate: 18,
    joinedAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-01-09')
  }
]

export function getBrandById(id: string): Brand | undefined {
  return mockBrands.find(brand => brand.id === id)
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return mockBrands.find(brand => brand.slug === slug)
}