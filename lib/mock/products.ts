import { Product, Category } from '@/types'

export const categories: Category[] = [
  { id: 'cat-1', name: 'Kecantikan', slug: 'beauty', icon: '💄' },
  { id: 'cat-2', name: 'Perawatan Kulit', slug: 'skincare', icon: '✨' },
  { id: 'cat-3', name: 'Elektronik', slug: 'electronics', icon: '📱' },
  { id: 'cat-4', name: 'Fashion', slug: 'fashion', icon: '👗' },
  { id: 'cat-5', name: 'Kesehatan', slug: 'health', icon: '💊' },
  { id: 'cat-6', name: 'Rumah Tangga', slug: 'home', icon: '🏠' },
  { id: 'cat-7', name: 'Aksesoris', slug: 'accessories', icon: '👜' },
  { id: 'cat-8', name: 'Suplemen', slug: 'supplements', icon: '🌿' }
]

export const mockProducts: Product[] = [
  // Glow Beauty Products
  {
    id: 'prod-1',
    slug: 'vitamin-c-serum',
    name: 'Vitamin C Brightening Serum',
    description: 'Advanced brightening serum with 20% Vitamin C to reduce dark spots and even skin tone. Suitable for all skin types.',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop'
    ],
    basePrice: 150000,
    recommendedPrice: 189000,
    commission: 20,
    brandId: 'brand-1',
    brandName: 'Glow Beauty',
    categoryId: 'cat-2',
    categoryName: 'Perawatan Kulit',
    tags: ['brightening', 'vitamin c', 'serum', 'anti-aging'],
    stock: 50,
    sold: 234,
    isActive: true,
    specifications: {
      'Volume': '30ml',
      'Skin Type': 'All skin types',
      'Main Ingredients': 'Vitamin C 20%, Hyaluronic Acid',
      'Usage': 'Morning and night'
    },
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: 'prod-2',
    slug: 'hydrating-face-mask',
    name: 'Masker Wajah Hydrating (5pcs)',
    description: 'Intensive hydration sheet masks enriched with hyaluronic acid and collagen. Perfect for dry and dull skin.',
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop'
    ],
    basePrice: 75000,
    recommendedPrice: 95000,
    commission: 20,
    brandId: 'brand-1',
    brandName: 'Glow Beauty',
    categoryId: 'cat-2',
    categoryName: 'Perawatan Kulit',
    tags: ['hydrating', 'sheet mask', 'collagen'],
    stock: 100,
    sold: 567,
    isActive: true,
    createdAt: new Date('2023-07-15'),
    updatedAt: new Date('2024-01-10')
  },

  // TechGear Pro Products
  {
    id: 'prod-3',
    slug: 'wireless-charging-pad',
    name: 'Wireless Charger 15W',
    description: 'Premium wireless charger with fast charging support. Compatible with all Qi-enabled devices.',
    images: [
      'https://images.unsplash.com/photo-1591290619762-baa2d5c57b8f?w=400&h=400&fit=crop'
    ],
    basePrice: 200000,
    recommendedPrice: 249000,
    commission: 15,
    brandId: 'brand-2',
    brandName: 'TechGear Pro',
    categoryId: 'cat-3',
    categoryName: 'Elektronik',
    tags: ['wireless charging', 'fast charge', 'qi compatible'],
    stock: 30,
    sold: 123,
    isActive: true,
    specifications: {
      'Power Output': '15W Max',
      'Compatibility': 'iPhone 12+, Samsung Galaxy S20+',
      'Cable Length': '1.5m',
      'Safety Features': 'Overcharge protection'
    },
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: 'prod-4',
    slug: 'premium-phone-case',
    name: 'Case HP Premium Protective',
    description: 'Military-grade protection with sleek design. Available for latest iPhone and Samsung models.',
    images: [
      'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop'
    ],
    basePrice: 120000,
    recommendedPrice: 149000,
    commission: 15,
    brandId: 'brand-2',
    brandName: 'TechGear Pro',
    categoryId: 'cat-7',
    categoryName: 'Aksesoris',
    tags: ['phone case', 'protective', 'premium'],
    stock: 80,
    sold: 345,
    isActive: true,
    createdAt: new Date('2023-09-10'),
    updatedAt: new Date('2024-01-12')
  },

  // Fashion Forward Products
  {
    id: 'prod-5',
    slug: 'minimalist-tote-bag',
    name: 'Tas Tote Kulit Minimalis',
    description: 'Genuine leather tote bag with minimalist design. Perfect for work or casual outings.',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop'
    ],
    basePrice: 350000,
    recommendedPrice: 450000,
    commission: 25,
    brandId: 'brand-3',
    brandName: 'Fashion Forward',
    categoryId: 'cat-7',
    categoryName: 'Aksesoris',
    tags: ['tote bag', 'leather', 'minimalist', 'women'],
    stock: 25,
    sold: 89,
    isActive: true,
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '40cm x 30cm x 15cm',
      'Colors': 'Black, Brown, Tan',
      'Features': 'Internal pockets, Zipper closure'
    },
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: 'prod-6',
    slug: 'casual-summer-dress',
    name: 'Dress Midi Floral Summer',
    description: 'Lightweight and breathable summer dress with beautiful floral patterns. Available in multiple sizes.',
    images: [
      'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400&h=400&fit=crop'
    ],
    basePrice: 250000,
    recommendedPrice: 329000,
    commission: 25,
    brandId: 'brand-3',
    brandName: 'Fashion Forward',
    categoryId: 'cat-4',
    categoryName: 'Fashion',
    tags: ['dress', 'summer', 'floral', 'midi'],
    stock: 40,
    sold: 156,
    isActive: true,
    createdAt: new Date('2023-04-15'),
    updatedAt: new Date('2024-01-09')
  },

  // Healthy Life Products
  {
    id: 'prod-7',
    slug: 'omega-3-supplement',
    name: 'Suplemen Omega-3 Fish Oil (60 kapsul)',
    description: 'High-quality omega-3 supplement for heart and brain health. Mercury-free and sustainably sourced.',
    images: [
      'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop'
    ],
    basePrice: 180000,
    recommendedPrice: 239000,
    commission: 30,
    brandId: 'brand-4',
    brandName: 'Healthy Life',
    categoryId: 'cat-8',
    categoryName: 'Suplemen',
    tags: ['omega-3', 'fish oil', 'heart health', 'supplements'],
    stock: 60,
    sold: 423,
    isActive: true,
    specifications: {
      'Capsules': '60 softgels',
      'EPA': '360mg per serving',
      'DHA': '240mg per serving',
      'Usage': '2 capsules daily with meals'
    },
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'prod-8',
    slug: 'vitamin-d3-drops',
    name: 'Vitamin D3 Tetes Liquid',
    description: 'Easy-to-absorb vitamin D3 drops for immune support and bone health. Suitable for all ages.',
    images: [
      'https://images.unsplash.com/photo-1609045567532-8c10a25cb4c0?w=400&h=400&fit=crop'
    ],
    basePrice: 120000,
    recommendedPrice: 159000,
    commission: 30,
    brandId: 'brand-4',
    brandName: 'Healthy Life',
    categoryId: 'cat-8',
    categoryName: 'Suplemen',
    tags: ['vitamin d3', 'immune support', 'liquid', 'supplements'],
    stock: 90,
    sold: 678,
    isActive: true,
    createdAt: new Date('2023-02-20'),
    updatedAt: new Date('2024-01-12')
  },

  // Home Essentials Products
  {
    id: 'prod-9',
    slug: 'aromatherapy-diffuser',
    name: 'Diffuser Aromatherapy Smart',
    description: 'WiFi-enabled essential oil diffuser with app control. Creates perfect ambiance for relaxation.',
    images: [
      'https://images.unsplash.com/photo-1565011523534-747a8601f10a?w=400&h=400&fit=crop'
    ],
    basePrice: 280000,
    recommendedPrice: 349000,
    commission: 18,
    brandId: 'brand-5',
    brandName: 'Home Essentials',
    categoryId: 'cat-6',
    categoryName: 'Rumah Tangga',
    tags: ['diffuser', 'aromatherapy', 'smart home', 'essential oil'],
    stock: 35,
    sold: 98,
    isActive: true,
    specifications: {
      'Capacity': '300ml',
      'Runtime': 'Up to 10 hours',
      'Features': 'App control, Timer, LED lights',
      'Coverage': '30-40 sqm'
    },
    createdAt: new Date('2023-07-25'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: 'prod-10',
    slug: 'bamboo-kitchen-set',
    name: 'Set Alat Dapur Bambu Eco-Friendly',
    description: 'Complete set of bamboo kitchen utensils. Sustainable, durable, and naturally antibacterial.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
    ],
    basePrice: 150000,
    recommendedPrice: 189000,
    commission: 18,
    brandId: 'brand-5',
    brandName: 'Home Essentials',
    categoryId: 'cat-6',
    categoryName: 'Rumah Tangga',
    tags: ['kitchen', 'bamboo', 'eco-friendly', 'utensils'],
    stock: 45,
    sold: 234,
    isActive: true,
    createdAt: new Date('2023-08-30'),
    updatedAt: new Date('2024-01-11')
  }
]

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find(product => product.slug === slug)
}

export function getProductsByBrand(brandId: string): Product[] {
  return mockProducts.filter(product => product.brandId === brandId)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return mockProducts.filter(product => product.categoryId === categoryId)
}