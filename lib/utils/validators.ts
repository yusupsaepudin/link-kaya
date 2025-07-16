import { z } from 'zod'

// Phone number validation for Indonesian numbers
export const phoneSchema = z.string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(/^(\+62|62|0)8[1-9][0-9]{7,11}$/, 'Invalid Indonesian phone number')

// Email validation
export const emailSchema = z.string().email('Invalid email address')

// Customer info validation
export const customerInfoSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().min(10, 'Address must be at least 10 characters').optional(),
  notes: z.string().optional()
})

// Product price validation
export const priceSchema = z.number()
  .min(1000, 'Price must be at least Rp 1,000')
  .max(100000000, 'Price cannot exceed Rp 100,000,000')

// Username validation
export const usernameSchema = z.string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username cannot exceed 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')

// Product form validation
export const productFormSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  basePrice: priceSchema,
  commission: z.number().min(5).max(50),
  categoryId: z.string().min(1, 'Please select a category'),
  stock: z.number().min(0)
})

// Reseller product form validation
export const resellerProductSchema = z.object({
  productId: z.string().min(1, 'Please select a product'),
  sellingPrice: priceSchema
})

// Helper function to validate phone number
export function isValidPhoneNumber(phone: string): boolean {
  try {
    phoneSchema.parse(phone)
    return true
  } catch {
    return false
  }
}

// Helper function to validate email
export function isValidEmail(email: string): boolean {
  try {
    emailSchema.parse(email)
    return true
  } catch {
    return false
  }
}

// Helper to calculate markup percentage
export function calculateMarkupPercentage(basePrice: number, sellingPrice: number): number {
  if (basePrice === 0) return 0
  return ((sellingPrice - basePrice) / basePrice) * 100
}

// Helper to calculate commission amount
export function calculateCommission(basePrice: number, sellingPrice: number, commissionRate: number): number {
  const markup = sellingPrice - basePrice
  return Math.floor(markup * (commissionRate / 100))
}