# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Building a bio-link reseller platform - a marketplace where brands upload products, resellers curate and sell them through personalized bio-link stores with markup pricing. This is a UI-only prototype using Next.js 15 and Tailwind CSS.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack at http://localhost:3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run type-check` - Run TypeScript type checking

### Installation
- `npm install` - Install all dependencies

## Architecture

### Tech Stack
- **Next.js 15.4.1** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Zustand** - State management for cart/user
- **React Hook Form + Zod** - Form handling
- **Framer Motion** - Animations
- **Lucide React + React Icons** - Icons

### Project Structure
```
app/
├── (public)/                    # Public routes group
│   ├── [username]/             # Bio-link pages
│   │   ├── page.tsx           # Main bio-link
│   │   └── produk/
│   │       └── [slug]/        # Product details
│   ├── checkout/
│   │   └── order/[orderId]/   # Checkout flow
│   └── track/[invoiceId]/     # Order tracking
├── admin/                      # Reseller dashboard
│   ├── layout.tsx
│   ├── dashboard/
│   ├── catalog/               # Browse brand products
│   ├── products/              # Manage listings
│   ├── orders/                # Order management
│   └── payouts/               # Commission tracking
├── brand/                      # Brand dashboard
│   ├── layout.tsx
│   ├── dashboard/
│   ├── products/              # Product catalog
│   ├── orders/                # Fulfillment
│   └── resellers/             # Partner management
components/
├── ui/                         # shadcn/ui components
├── layouts/                    # Layout wrappers
├── features/                   # Feature-specific
│   ├── bio-link/
│   ├── products/
│   ├── orders/
│   └── checkout/
└── shared/                     # Shared components
lib/
├── mock/                       # Mock data
│   ├── users.ts
│   ├── products.ts
│   ├── orders.ts
│   └── brands.ts
├── stores/                     # Zustand stores
│   ├── useCartStore.ts
│   ├── useUserStore.ts
│   └── useAdminStore.ts
└── utils/                      # Utilities
types/                          # TypeScript types
└── *.ts
```

## Core Features

### 1. Bio-Link Store (`/[username]`)
- Profile header with avatar, name, bio
- Social media links grid
- Product showcase with categories
- Reseller markup on base prices
- Mobile-optimized layout
- Share functionality

### 2. Reseller Features
- Browse brand catalogs
- Add products to bio store
- Set custom markup prices
- Track orders and earnings
- View commission payouts
- Analytics dashboard

### 3. Brand Features
- Upload product catalog
- Set base prices and commission
- Track reseller performance
- Manage order fulfillment
- Analytics and insights

### 4. E-commerce Flow
- Product detail pages
- Shopping cart (Zustand)
- Checkout form (React Hook Form)
- Order tracking
- WhatsApp payment integration

## Type System

### Core Types
```typescript
// User roles and profiles
interface UserProfile {
  id: string
  username: string
  displayName: string
  bio: string
  avatar: string
  role: 'buyer' | 'reseller' | 'brand'
  socialLinks: SocialLink[]
  resellerInfo?: ResellerInfo
  brandInfo?: BrandInfo
}

// Product with reseller pricing
interface Product {
  id: string
  slug: string
  name: string
  description: string
  images: string[]
  basePrice: number      // Brand's base price
  recommendedPrice: number
  commission: number     // Percentage for reseller
  brandId: string
  categoryId: string
  stock: number
  isActive: boolean
}

// Reseller's product listing
interface ResellerProduct {
  id: string
  resellerId: string
  productId: string
  sellingPrice: number   // Reseller's markup price
  isActive: boolean
  addedAt: Date
}

// Order with commission tracking
interface Order {
  id: string
  invoiceId: string
  resellerId: string
  customerId: string
  items: OrderItem[]
  subtotal: number
  total: number
  commission: number
  status: OrderStatus
  customerInfo: CustomerInfo
  createdAt: Date
}
```

## State Management

### Zustand Stores

1. **Cart Store** - Shopping cart state
```typescript
interface CartState {
  items: CartItem[]
  resellerId: string | null
  addItem: (product: Product, resellerPrice: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}
```

2. **User Store** - Current user and role
```typescript
interface UserState {
  currentUser: UserProfile | null
  isAuthenticated: boolean
  userRole: 'buyer' | 'reseller' | 'brand' | null
  setUser: (user: UserProfile) => void
  logout: () => void
}
```

3. **Admin Store** - Dashboard data
```typescript
interface AdminState {
  stats: DashboardStats
  recentOrders: Order[]
  products: ResellerProduct[]
  fetchDashboardData: () => void
}
```

## UI/UX Standards

### Design System
- **Colors**: Modern palette with role-based accents
- **Typography**: Inter for UI, system fonts
- **Spacing**: 8px grid (4, 8, 12, 16, 24, 32, 48, 64)
- **Border Radius**: Consistent rounded corners
- **Shadows**: Subtle depth for cards

### Component Patterns
- Card-based layouts for products/orders
- Badge components for status indicators
- Skeleton loaders for async content
- Empty states with clear CTAs
- Error states with retry options
- Toast notifications for actions

### Mobile-First Approach
- Touch-friendly tap targets (min 44px)
- Bottom sheets for mobile modals
- Sticky headers for navigation
- Swipeable image galleries
- Responsive grids (4 cols mobile, 12 desktop)

## Mock Data Structure

### Sample Data Hierarchy
```
Brands (3-5 brands)
└── Products (10-15 per brand)
    └── Categories (Fashion, Beauty, Tech, etc.)

Resellers (5-10 resellers)
└── Bio Stores
    └── Curated Products (with markup)
    └── Orders
        └── Commissions

Buyers
└── Orders
    └── Tracking Info
```

## Development Guidelines

### Component Structure
```typescript
// Every component follows this pattern
interface ComponentProps {
  // Explicit prop types
  // JSDoc for complex props
}

export function ComponentName({ props }: ComponentProps) {
  // 1. Hooks at top
  // 2. Computed values
  // 3. Handlers
  // 4. Effects (minimal)
  // 5. Early returns
  // 6. Main JSX
}
```

### File Naming
- Components: PascalCase.tsx
- Utilities: camelCase.ts
- Types: PascalCase.ts
- Mock data: camelCase.ts

### Import Order
1. React/Next.js imports
2. External libraries
3. Internal components (@/components)
4. Internal utilities (@/lib)
5. Types (@/types)

## API Preparation

### Endpoint Structure (for future)
```typescript
const API_ROUTES = {
  // Public
  profile: '/api/users/:username',
  products: '/api/users/:username/products',
  
  // Reseller
  catalog: '/api/catalog',
  resellerProducts: '/api/reseller/products',
  resellerOrders: '/api/reseller/orders',
  
  // Brand  
  brandProducts: '/api/brand/products',
  brandOrders: '/api/brand/orders',
  brandResellers: '/api/brand/resellers',
  
  // Orders
  checkout: '/api/orders/checkout',
  track: '/api/orders/track/:invoiceId'
}
```

## Performance Optimizations

- Dynamic imports for heavy components
- Image optimization with next/image
- Lazy loading for below-fold content
- Memoization for expensive computations
- Virtual scrolling for long lists
- Debounced search inputs

## Security Considerations

- Input validation with Zod
- XSS prevention (no dangerouslySetInnerHTML)
- CSRF tokens (prepared for backend)
- Rate limiting preparation
- Secure headers configuration

## Testing Strategy (Future)

- Unit tests for utilities
- Component testing with React Testing Library
- E2E tests for critical flows
- Visual regression testing
- Performance monitoring

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Build optimization complete
- [ ] Images optimized
- [ ] SEO meta tags added
- [ ] Analytics integration ready
- [ ] Error tracking setup
- [ ] Performance monitoring active