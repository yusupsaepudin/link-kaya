# Lynk Clone - Beautiful Link-in-Bio Tool

A modern, feature-rich link-in-bio tool built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui. Create beautiful profile pages to share all your important links in one place.

## Features

### 🎨 Beautiful UI/UX
- Modern, clean design with gradient accents
- Smooth animations powered by Framer Motion
- Mobile-first responsive design
- Dark mode support (CSS variables ready)
- Glass morphism effects

### 📱 Public Profile Pages
- Clean, customizable profile pages
- Social media links with icons
- Product showcase section
- Click tracking for analytics
- Share functionality

### 🎯 Admin Dashboard
- Intuitive dashboard with key metrics
- Drag-and-drop link reordering
- Link management (add, edit, delete, enable/disable)
- Analytics overview
- Quick actions

### 🚀 Technical Features
- Built with Next.js 15 App Router
- TypeScript for type safety
- Tailwind CSS v4 for styling
- shadcn/ui component library
- Framer Motion for animations
- React Hook Form for forms
- Zod for validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lynk-clone
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
lynk-clone/
├── app/
│   ├── [username]/     # Public profile pages
│   ├── admin/          # Admin dashboard
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── admin/          # Admin components
│   ├── landing/        # Landing page components
│   ├── profile/        # Profile page components
│   └── shared/         # Shared components
├── lib/
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## Key Routes

- `/` - Landing page with features showcase
- `/[username]` - Public profile page (e.g., `/johndoe`)
- `/admin` - Admin dashboard
- `/admin/links` - Manage links
- `/admin/products` - Manage products (coming soon)
- `/admin/analytics` - View detailed analytics (coming soon)

## Customization

### Themes
The app uses CSS custom properties for theming. You can customize colors in `app/globals.css`:

```css
:root {
  --primary: oklch(0.75 0.15 260);
  --gradient-1: linear-gradient(135deg, oklch(0.85 0.15 260), oklch(0.75 0.2 280));
  /* ... more variables */
}
```

### Adding New Link Types
To add new social media icons, update the `iconMap` in `components/profile/link-list.tsx`.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Future Enhancements

- [ ] User authentication and registration
- [ ] Database integration
- [ ] Real analytics tracking
- [ ] Payment integration for products
- [ ] Custom themes and templates
- [ ] QR code generation
- [ ] Email collection
- [ ] Newsletter integration
- [ ] Advanced analytics dashboard
- [ ] A/B testing for links

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)