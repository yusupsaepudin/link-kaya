import { Order, DashboardStats } from '@/types'

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    invoiceId: 'INV-2024-0001',
    resellerId: 'user-1',
    resellerName: 'Sarah Beauty Shop',
    customerId: 'buyer-1',
    customerInfo: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+62 815 6789 0123',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan',
      notes: 'Please pack carefully'
    },
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        quantity: 2,
        price: 199000,
        basePrice: 150000,
        commission: 49000,
        total: 398000
      },
      {
        id: 'item-2',
        productId: 'prod-2',
        quantity: 1,
        price: 99000,
        basePrice: 75000,
        commission: 24000,
        total: 99000
      }
    ],
    subtotal: 497000,
    shippingCost: 15000,
    total: 512000,
    totalCommission: 122000,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    trackingNumber: 'JNE123456789',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'order-2',
    invoiceId: 'INV-2024-0002',
    resellerId: 'user-1',
    resellerName: 'Sarah Beauty Shop',
    customerInfo: {
      name: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '+62 816 7890 1234',
      address: 'Jl. Gatot Subroto No. 456, Jakarta Pusat'
    },
    items: [
      {
        id: 'item-3',
        productId: 'prod-5',
        quantity: 1,
        price: 489000,
        basePrice: 350000,
        commission: 139000,
        total: 489000
      }
    ],
    subtotal: 489000,
    shippingCost: 20000,
    total: 509000,
    totalCommission: 139000,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'ewallet',
    trackingNumber: 'JNE987654321',
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: 'order-3',
    invoiceId: 'INV-2024-0003',
    resellerId: 'user-2',
    resellerName: 'Tech Deals Indonesia',
    customerInfo: {
      name: 'Ahmad Hidayat',
      email: 'ahmad@example.com',
      phone: '+62 817 8901 2345',
      address: 'Jl. Diponegoro No. 789, Surabaya'
    },
    items: [
      {
        id: 'item-4',
        productId: 'prod-3',
        quantity: 1,
        price: 269000,
        basePrice: 200000,
        commission: 69000,
        total: 269000
      },
      {
        id: 'item-5',
        productId: 'prod-4',
        quantity: 2,
        price: 159000,
        basePrice: 120000,
        commission: 39000,
        total: 318000
      }
    ],
    subtotal: 587000,
    shippingCost: 18000,
    total: 605000,
    totalCommission: 147000,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: 'order-4',
    invoiceId: 'INV-2024-0004',
    resellerId: 'user-3',
    resellerName: 'Healthy Living Store',
    customerInfo: {
      name: 'Siti Nurhaliza',
      email: 'siti@example.com',
      phone: '+62 818 9012 3456'
    },
    items: [
      {
        id: 'item-6',
        productId: 'prod-7',
        quantity: 3,
        price: 259000,
        basePrice: 180000,
        commission: 79000,
        total: 777000
      }
    ],
    subtotal: 777000,
    shippingCost: 0,
    total: 777000,
    totalCommission: 237000,
    status: 'pending',
    paymentStatus: 'unpaid',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: 'order-5',
    invoiceId: 'INV-2024-0005',
    resellerId: 'user-1',
    resellerName: 'Sarah Beauty Shop',
    customerInfo: {
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      phone: '+62 819 0123 4567'
    },
    items: [
      {
        id: 'item-7',
        productId: 'prod-1',
        quantity: 1,
        price: 199000,
        basePrice: 150000,
        commission: 49000,
        total: 199000
      }
    ],
    subtotal: 199000,
    shippingCost: 12000,
    total: 211000,
    totalCommission: 49000,
    status: 'cancelled',
    paymentStatus: 'refunded',
    notes: 'Customer changed mind',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-06')
  }
]

export const mockDashboardStats: Record<string, DashboardStats> = {
  'user-1': {
    totalOrders: 3,
    totalRevenue: 1232000,
    totalCommission: 310000,
    pendingOrders: 0,
    completedOrders: 2,
    totalProducts: 3,
    viewsToday: 456,
    conversionRate: 12.5
  },
  'user-2': {
    totalOrders: 1,
    totalRevenue: 605000,
    totalCommission: 147000,
    pendingOrders: 1,
    completedOrders: 0,
    totalProducts: 2,
    viewsToday: 234,
    conversionRate: 8.9
  },
  'user-3': {
    totalOrders: 1,
    totalRevenue: 777000,
    totalCommission: 237000,
    pendingOrders: 1,
    completedOrders: 0,
    totalProducts: 2,
    viewsToday: 123,
    conversionRate: 15.2
  }
}

export function getOrdersByReseller(resellerId: string): Order[] {
  return mockOrders.filter(order => order.resellerId === resellerId)
}

export function getOrderByInvoiceId(invoiceId: string): Order | undefined {
  return mockOrders.find(order => order.invoiceId === invoiceId)
}

export function getResellerStats(resellerId: string): DashboardStats {
  return mockDashboardStats[resellerId] || {
    totalOrders: 0,
    totalRevenue: 0,
    totalCommission: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalProducts: 0,
    viewsToday: 0,
    conversionRate: 0
  }
}