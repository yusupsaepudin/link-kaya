# Bio-Link Reseller Platform

A modern, full-featured bio-link reseller marketplace built with Next.js 15, TypeScript, and Tailwind CSS. This platform enables brands to upload products and resellers to create personalized bio-link stores with custom pricing.

## 🚀 Features

### For Resellers
- **Personalized Bio-Link Store** - Custom URL (e.g., `/sarahbeauty`) with profile, social links, and products
- **Product Curation** - Browse brand catalogs and add products with custom markup
- **Flexible Pricing** - Set your own prices and earn commissions on sales
- **Analytics Dashboard** - Track views, clicks, orders, and earnings
- **Order Management** - View and manage customer orders
- **Mobile-First Design** - Optimized for Instagram and TikTok browsers

### For Brands
- **Product Upload** - Manage product catalog with images and specifications
- **Reseller Network** - Track resellers selling your products
- **Commission Settings** - Set commission rates for resellers
- **Order Fulfillment** - Manage orders from multiple resellers
- **Analytics** - Track sales performance across resellers

### For Customers
- **Easy Shopping** - Browse products directly from bio links
- **Product Details** - View images, specifications, and pricing
- **Shopping Cart** - Add multiple items from same reseller
- **Order Tracking** - Track order status with invoice ID
- **WhatsApp Integration** - Direct chat with resellers

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React + React Icons
- **Date Handling**: date-fns

## 📁 Project Structure

```
app/
├── (public)/
│   ├── [username]/          # Bio-link store pages
│   │   └── produk/[slug]/   # Product detail pages
│   ├── checkout/            # Order checkout flow
│   └── track/               # Order tracking
├── admin/                   # Reseller dashboard
│   ├── dashboard/           # Overview and stats
│   ├── catalog/             # Browse products to add
│   ├── products/            # Manage store products
│   ├── orders/              # Order management
│   └── payouts/             # Commission tracking
└── brand/                   # Brand portal
    ├── dashboard/           # Brand overview
    ├── products/            # Product management
    ├── orders/              # Fulfillment tracking
    └── resellers/           # Partner management

components/
├── ui/                      # shadcn/ui components
├── layouts/                 # Layout wrappers
├── features/                # Feature-specific components
│   ├── bio-link/            # Profile pages
│   ├── products/            # Product displays
│   ├── orders/              # Order components
│   └── checkout/            # Checkout flow
└── shared/                  # Shared components

lib/
├── mock/                    # Mock data
├── stores/                  # Zustand stores
└── utils/                   # Utilities

types/                       # TypeScript definitions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bio-link-reseller
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## 📱 Key Routes

### Public Routes
- `/` - Landing page
- `/[username]` - Reseller bio-link store (e.g., `/sarahbeauty`)
- `/[username]/produk/[slug]` - Product detail page
- `/checkout/order/[orderId]` - Checkout process
- `/track/[invoiceId]` - Order tracking

### Reseller Dashboard
- `/admin/dashboard` - Overview and stats
- `/admin/catalog` - Browse products to add
- `/admin/products` - Manage your products
- `/admin/orders` - View orders
- `/admin/payouts` - Commission tracking

### Brand Portal
- `/brand/dashboard` - Brand overview
- `/brand/products` - Manage products
- `/brand/orders` - Order fulfillment
- `/brand/resellers` - View resellers

## 🎨 Design System

- **Colors**: Modern gradient system with purple/pink accents
- **Typography**: Inter for UI, system fonts fallback
- **Spacing**: 8px grid system
- **Components**: Card-based UI with consistent styling
- **Animations**: Smooth transitions with Framer Motion
- **Dark Mode**: Ready (CSS variables configured)

## 💾 Mock Data

The platform includes comprehensive mock data for testing:

- **5 Brands**: Glow Beauty, TechGear Pro, Fashion Forward, etc.
- **10+ Products**: Various categories with pricing and commission
- **3 Resellers**: Different tiers (Bronze, Silver, Gold)
- **Sample Orders**: Various statuses and payment states

## 🧪 Testing the Platform

### As a Customer
1. Visit `/sarahbeauty` to see a reseller's store
2. Browse products and add to cart
3. Click on products for details
4. Proceed to checkout (mock)

### As a Reseller
1. Visit `/admin/dashboard` (auto-logs in as Sarah)
2. Browse catalog at `/admin/catalog`
3. Add products with custom pricing
4. View mock orders and analytics

### As a Brand
1. Visit `/brand/dashboard`
2. Manage products and view resellers
3. Track order fulfillment

## 🔧 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📈 Future Enhancements

- [ ] Real authentication system
- [ ] Database integration (PostgreSQL/Supabase)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Mobile apps
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Real-time chat
- [ ] Inventory management

## 🤝 Contributing

This is a prototype/demo project. Feel free to fork and adapt for your needs.

## 📄 License

MIT License - Use freely for your projects.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Mock avatars from [DiceBear](https://dicebear.com/)