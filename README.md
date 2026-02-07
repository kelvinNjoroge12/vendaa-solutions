# Vendaa Solutions - Premium Corporate Gifting Platform

A modern, fully responsive React + TypeScript web application built with Vite and Tailwind CSS.

## 🚀 Features

- ⚡ **Vite** - Lightning-fast build tool
- ⚛️ **React 19** - Latest React with TypeScript
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom design system
- 📱 **Mobile-First Responsive** - Optimized for all devices
- 🎯 **TypeScript** - Full type safety with path aliases
- 🎭 **Radix UI** - Accessible component primitives
- 🎬 **GSAP** - Smooth animations
- 📝 **React Hook Form** - Form management with Zod validation

## 📦 Project Structure

```
vendaa-final/
├── public/               # Static assets (images)
├── src/
│   ├── components/       # Reusable React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── Navigation.tsx
│   │   └── ProductModal.tsx
│   ├── sections/        # Page sections
│   │   ├── Hero.tsx
│   │   ├── ProductCatalogue.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── data/            # Static data
│   │   └── products.ts
│   ├── hooks/           # Custom React hooks
│   │   └── use-mobile.ts
│   ├── lib/             # Utility functions
│   │   └── utils.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML entry point
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config (root)
├── tsconfig.app.json    # TypeScript config (app)
├── tsconfig.node.json   # TypeScript config (node)
├── tailwind.config.cjs  # Tailwind configuration
└── postcss.config.cjs   # PostCSS configuration
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- A code editor (VS Code recommended)

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Start development server:**

```bash
npm run dev
```

The app will open at `http://localhost:5173`

3. **Build for production:**

```bash
npm run build
```

4. **Preview production build:**

```bash
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Styling

This project uses Tailwind CSS with a custom design system:

- **Mobile-First Approach** - All styles are mobile-first responsive
- **CSS Variables** - Custom color system using HSL values
- **Dark Mode Support** - Built-in dark mode capability
- **Custom Components** - shadcn/ui component library integrated

## 🔧 TypeScript Configuration

The project uses TypeScript path aliases for clean imports:

```typescript
// Instead of:
import { Product } from '../../types'

// You can use:
import { Product } from '@/types'
```

Path aliases are configured in:
- `tsconfig.json` - Root configuration
- `tsconfig.app.json` - App-specific settings
- `vite.config.ts` - Vite resolver

## 🎯 Key Technologies

- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool
- **Tailwind CSS 3.4** - Styling
- **Radix UI** - Headless UI components
- **GSAP** - Animation library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icon library

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔐 Admin Panel

Access the admin panel at `/admin` with default credentials (update in production):

- Username: `admin`
- Password: `vendaa2024`

## 🚀 Deployment

Build the project and deploy the `dist/` folder to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any other static host

## 🐛 Troubleshooting

### TypeScript errors in IDE

1. Restart TypeScript server in VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"
2. Ensure `@/*` path aliases are recognized in `tsconfig.json`

### Module not found errors

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Restart dev server

### Tailwind styles not applying

1. Check that `index.css` is imported in `main.tsx`
2. Verify Tailwind config includes all content paths
3. Restart dev server

## 📄 License

Private - Vendaa Solutions

## 🤝 Contributing

This is a private project. Contact the development team for contribution guidelines.
