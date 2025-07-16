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