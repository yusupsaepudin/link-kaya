# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the development server with Turbopack at http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

### Installation
- `npm install` - Install all dependencies

## Architecture

This is a Next.js 15.4.1 application using the App Router with the following key technologies:

### Frontend Stack
- **React 19.1.0** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework with CSS variables
- **shadcn/ui** - Component library (configured in components.json)
- **Lucide React** - Icon library

### Project Structure
- `/app` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font family
  - `page.tsx` - Home page component
  - `globals.css` - Global styles and Tailwind imports
- `/components` - React components (empty, ready for shadcn/ui components)
  - `/ui` - shadcn/ui components will be added here
- `/lib` - Utility functions
  - `utils.ts` - Contains `cn()` helper for className merging
- `/public` - Static assets

### Key Configuration
- **Path Aliases**: `@/*` maps to the project root
- **Component Aliases**: 
  - `@/components` for components
  - `@/components/ui` for UI components
  - `@/lib` for utilities
  - `@/hooks` for custom hooks
- **TypeScript**: Strict mode enabled with bundler module resolution
- **ESLint**: Configured with Next.js recommended rules

### shadcn/ui Integration
The project is set up with shadcn/ui (New York style) for component development. Components can be added using the shadcn/ui CLI and will be placed in `/components/ui`.

## Development Notes

- The project uses Turbopack for faster development builds
- No test framework is currently configured
- CSS variables are enabled for theming support
- The application is set up as a private package (not for npm publication)

## Component Guidelines

### Reusable Components
```typescript
// Example: ProductCard component
interface ProductCardProps {
  product: Product
  variant?: 'compact' | 'detailed'
  onAddToStore?: (product: Product) => void
  showActions?: boolean
}
```

### Layout System
- Use consistent spacing scale: 4, 8, 12, 16, 24, 32, 48, 64
- Mobile-first responsive design
- Container max-width: 1280px
- Grid system: 12 columns on desktop, 4 on mobile

## State Management Patterns

### Zustand Store Example
```typescript
// lib/stores/useCartStore.ts
interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  total: number
}
```

## Mock Data Structure

### User Profile
```typescript
interface UserProfile {
  id: string
  username: string
  displayName: string
  bio: string
  avatar: string
  socialLinks: SocialLink[]
  isReseller: boolean
  resellerTier?: 'bronze' | 'silver' | 'gold'
}
```

### Product
```typescript
interface Product {
  id: string
  slug: string
  name: string
  description: string
  images: string[]
  basePrice: number
  resellerPrice?: number
  brandId: string
  categoryId: string
  stock: number
  isActive: boolean
}
```

### Order
```typescript
interface Order {
  id: string
  invoiceId: string
  userId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'completed'
  customerInfo: CustomerInfo
  createdAt: Date
}
```

## UI/UX Standards

### Mobile-First Approach
- Touch-friendly tap targets (min 44px)
- Sticky headers on mobile
- Bottom navigation for key actions
- Swipeable product galleries

### Loading States
- Skeleton screens for data fetching
- Optimistic UI updates
- Progress indicators for multi-step forms

### Interaction Patterns
- Toast notifications for actions
- Modal dialogs for confirmations
- Dropdown menus for options
- Hover states on desktop

## Best Practices

1. **Component Composition**
   - Keep components small and focused
   - Use composition over inheritance
   - Extract reusable logic into hooks

2. **Type Safety**
   - Define all data types in `/types`
   - Use strict TypeScript config
   - Avoid `any` types

3. **Performance**
   - Lazy load heavy components
   - Optimize images with Next.js Image
   - Use React.memo for expensive renders

4. **Accessibility**
   - Semantic HTML elements
   - ARIA labels where needed
   - Keyboard navigation support
   - Color contrast compliance

## Future Integration Points

### Backend API Structure
```typescript
// Prepared for future backend integration
const API_ENDPOINTS = {
  auth: '/api/auth',
  users: '/api/users',
  products: '/api/products',
  orders: '/api/orders',
  brands: '/api/brands'
}
```

### Authentication Preparation
- Auth context provider structure
- Protected route wrappers
- Token storage utilities

### Payment Integration
- Payment gateway interfaces
- Transaction tracking
- Commission calculation logic

## The FORBIDDEN List (Automatic Rejection)

```typescript
// These patterns = YOUR CODE GETS REJECTED

❌ any type                    // Define interfaces
❌ @ts-ignore / @ts-expect     // Fix the types
❌ eslint-disable              // Fix the code
❌ console.log                 // Use proper logging
❌ debugger statements         // Remove before commit
❌ setTimeout/setInterval      // Use React patterns
❌ direct DOM manipulation     // Use React
❌ var keyword                 // Use const/let
❌ == comparison              // Use ===
❌ eval() or Function()       // Security risk
❌ dangerouslySetInnerHTML    // Find another way
❌ inline event handlers       // Use proper handlers
❌ CSS-in-JS                  // Tailwind only
❌ global styles              // Scoped to components
❌ !important in CSS          // Fix specificity
❌ z-index > 50               // Use design system
❌ magic numbers              // Use constants
❌ TODO comments              // Fix it or track in TODO.md
❌ commented code             // Delete it
❌ unused imports             // Remove them
❌ unused variables           // Remove them
❌ circular dependencies      // Restructure
❌ barrel exports            // Direct imports
❌ default exports           // Named exports only
❌ nested ternaries          // Use if/else
❌ array index as key        // Use stable IDs
❌ useEffect without deps    // Specify dependencies
❌ async without try/catch   // Handle errors
❌ mutations in render       // Keep pure
❌ side effects in render    // Use effects
```

## Error Handling Pattern

```typescript
// Centralized error handling
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

## Architecture Decisions

### State Management Philosophy
```typescript
// 1. Local state for UI (99% of cases)
const [isOpen, setIsOpen] = useState(false);

// 2. Context for cross-cutting concerns
const ThemeContext = createContext<Theme>('light');
const AuthContext = createContext<User | null>(null);

// 3. URL state for shareable state
const searchParams = useSearchParams();
const filter = searchParams.get('filter');

// 4. Server state with SWR
const { data } = useSWR('/api/data', fetcher);

// NO Redux, NO MobX, NO Zustand unless absolutely necessary
```

## Debug Methodology

When something breaks:
1. Check browser console (no errors allowed)
2. Check terminal output (build errors?)
3. Check network tab (API failures?)
4. Verify types with typecheck
5. Read the error message (actually read it)
6. Search codebase for similar patterns
7. Simplify to minimal reproduction
8. If still stuck, you're overcomplicating

## Common Patterns Reference

### Loading States
```typescript
// Skeleton loader for each component
export function WidgetSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-8 bg-gray-200 rounded w-1/2" />
    </div>
  );
}
```

### Empty States
```typescript
export function EmptyState({ 
  message = "No data available",
  action 
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">{message}</p>
      {action && (
        <Button className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

### Error States
```typescript
export function ErrorState({ 
  error,
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-destructive mb-4">
        {error.message || "Something went wrong"}
      </p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
```

## Code Laws (Zero Tolerance)

### TypeScript Commandments

```typescript
// ✓ MANDATORY - Explicit types everywhere
interface WidgetData {
  id: string;
  title: string;
  value: number;
  updatedAt: Date;
}

// ✓ MANDATORY - Const assertions for literals
const ROLES = ['admin', 'user', 'viewer'] as const;
type Role = typeof ROLES[number];

// ✓ MANDATORY - Discriminated unions
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// ❌ FORBIDDEN - These patterns = IMMEDIATE REJECTION
const data: any = fetch();                    // NO any
const items: Array<any> = [];                 // NO any arrays  
const handler = (e) => {};                    // NO implicit any
export default function() {}                  // NO anonymous exports
onClick={() => complexLogic()}                // NO inline complex logic
style={{ margin: 20 }}                        // NO inline styles
// @ts-ignore                                 // NO TypeScript suppression
as unknown as Type                            // NO type casting hacks
```

### React Patterns (The Only Way)

```typescript
// Every component MUST follow this structure
interface ComponentNameProps {
  // ALL props explicitly typed
  // NO optional props without good reason
  // Document complex props with JSDoc
}

// Named exports ONLY
export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // 1. Hooks (grouped at top)
  const [state, setState] = useState<Type>(initial);
  const { data } = useCustomHook();
  
  // 2. Computed values (memoized if expensive)
  const computed = useMemo(() => expensiveOp(data), [data]);
  
  // 3. Handlers (useCallback for props)
  const handleClick = useCallback(() => {
    setState(prev => newValue);
  }, [dependency]);
  
  // 4. Effects (minimal, documented)
  useEffect(() => {
    // Clear explanation of why this effect exists
    return () => {
      // Cleanup if needed
    };
  }, [deps]);
  
  // 5. Early returns for edge cases
  if (!data) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  
  // 6. Return JSX (single expression)
  return (
    <div className="tailwind-only">
      {/* Semantic HTML */}
    </div>
  );
}
```

### Import Hierarchy (EXACT ORDER)

```typescript
// 1. React ecosystem
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// 2. Types (if external)
import type { ReactNode, PropsWithChildren } from 'react';

// 3. Internal - absolute paths ONLY
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/cn';
import { API_ENDPOINTS } from '@/lib/constants';

// 4. Internal types
import type { User, DashboardConfig } from '@/types';

// NO relative imports except for co-located files
```