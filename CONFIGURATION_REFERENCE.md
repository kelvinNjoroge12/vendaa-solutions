# Configuration Reference

Quick reference for all configuration files in the Vendaa Solutions project.

---

## 📦 package.json

**Location:** `./package.json`

### Scripts
```json
{
  "dev": "vite",              // Start dev server
  "build": "tsc -b && vite build",  // Build for production
  "preview": "vite preview",  // Preview production build
  "lint": "eslint ."          // Run ESLint
}
```

### Key Dependencies
- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **typescript**: ~5.9.3
- **vite**: ^7.2.4
- **tailwindcss**: ^3.4.19
- **@vitejs/plugin-react**: ^5.1.1

### Type Declaration Dependencies
- **@types/react**: ^19.2.5
- **@types/react-dom**: ^19.2.3
- **@types/node**: ^24.10.1

---

## ⚡ vite.config.ts

**Location:** `./vite.config.ts`

```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: './',              // Relative paths for deployment
  plugins: [react()],      // React plugin with Fast Refresh
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Path alias
    },
  },
  server: {
    port: 5173,           // Dev server port
    open: true,           // Auto-open browser
  },
  build: {
    outDir: 'dist',       // Output directory
    sourcemap: true,      // Generate sourcemaps
  },
})
```

### Key Settings
- **Base Path**: `./` (relative)
- **Alias**: `@` → `./src`
- **Dev Port**: 5173
- **Output**: `dist/`

---

## 📘 tsconfig.json

**Location:** `./tsconfig.json` (root)

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Purpose
- Root TypeScript configuration
- References app and node configs
- Defines path aliases

---

## 📘 tsconfig.app.json

**Location:** `./tsconfig.app.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx",
    
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### Key Features
- **Target**: ES2022
- **JSX**: react-jsx (automatic runtime)
- **Module Resolution**: bundler (for Vite)
- **Strict Mode**: Enabled
- **Path Aliases**: @/* → src/*

---

## 📘 tsconfig.node.json

**Location:** `./tsconfig.node.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

### Purpose
- TypeScript config for Node.js tooling
- Used for vite.config.ts

---

## 🎨 tailwind.config.cjs

**Location:** `./tailwind.config.cjs`

```javascript
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more colors
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Custom animations, shadows, etc.
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Key Features
- **Dark Mode**: Class-based
- **Content**: All HTML, JS, TS, JSX, TSX files
- **Custom Colors**: HSL-based color system
- **Custom Radius**: Variable-based border radius
- **Plugins**: tailwindcss-animate

### Breakpoints (Default)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 📮 postcss.config.cjs

**Location:** `./postcss.config.cjs`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Plugins
- **tailwindcss**: Process Tailwind directives
- **autoprefixer**: Add vendor prefixes

---

## 🌐 index.html

**Location:** `./index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vendaa Solutions - Premium Corporate Gifting</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Key Elements
- **Viewport**: Mobile-responsive
- **Root**: React mount point
- **Script**: Module entry point

---

## 🎨 src/index.css

**Location:** `./src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Variables */
:root {
  --background: 40 20% 96%;
  --foreground: 0 0% 10%;
  --primary: 40 35% 57%;
  /* ... more variables */
}

/* Global Styles */
body {
  font-family: system-ui, -apple-system, sans-serif;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Custom grain overlay */
.grain-overlay {
  /* Texture effect */
}
```

### Key Features
- **Tailwind Directives**: Base, components, utilities
- **CSS Variables**: HSL color values
- **Global Styles**: Typography, backgrounds
- **Custom Classes**: Grain overlay

---

## 🛠️ .vscode/settings.json

**Location:** `./.vscode/settings.json`

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "css.validate": false
}
```

### Features
- **TypeScript**: Use workspace version
- **Format on Save**: Enabled
- **ESLint**: Auto-fix on save
- **Tailwind IntelliSense**: Enhanced regex support

---

## 🛠️ .vscode/extensions.json

**Location:** `./.vscode/extensions.json`

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "dsznajder.es7-react-js-snippets"
  ]
}
```

### Recommended Extensions
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Tailwind autocomplete
- **Auto Rename Tag**: HTML/JSX tag sync
- **Path Intellisense**: File path autocomplete
- **ES7+ React Snippets**: React code snippets

---

## 🔒 .env.example

**Location:** `./.env.example`

```bash
# App Configuration
VITE_APP_TITLE=Vendaa Solutions
VITE_APP_URL=http://localhost:5173

# API Configuration (if needed)
# VITE_API_URL=https://api.example.com
# VITE_API_KEY=your_api_key_here
```

### Usage
1. Copy to `.env.local`
2. Fill in actual values
3. Rebuild after changes

**Important**: All env vars must start with `VITE_`

---

## 📝 .gitignore

**Location:** `./.gitignore`

```
# Dependencies
node_modules

# Build output
dist
dist-ssr
*.local

# Logs
logs
*.log

# Editor
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store

# TypeScript
*.tsbuildinfo
```

---

## 🗂️ File Structure Reference

```
vendaa-final/
├── Configuration Files
│   ├── package.json              ← Dependencies
│   ├── vite.config.ts            ← Vite config
│   ├── tsconfig.json             ← TS root config
│   ├── tsconfig.app.json         ← TS app config
│   ├── tsconfig.node.json        ← TS node config
│   ├── tailwind.config.cjs       ← Tailwind theme
│   ├── postcss.config.cjs        ← PostCSS plugins
│   └── .gitignore                ← Git ignore
│
├── Entry Points
│   ├── index.html                ← HTML entry
│   ├── src/main.tsx              ← React entry
│   └── src/App.tsx               ← App component
│
├── Source Code
│   ├── src/components/           ← React components
│   ├── src/sections/             ← Page sections
│   ├── src/types/                ← TypeScript types
│   ├── src/lib/                  ← Utils
│   ├── src/hooks/                ← Custom hooks
│   ├── src/data/                 ← Static data
│   └── src/index.css             ← Global styles
│
├── Assets
│   └── public/                   ← Images
│
└── IDE Config
    └── .vscode/                  ← VS Code settings
```

---

## 🎯 Quick Reference Commands

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server (localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build

# Type Checking
npx tsc --noEmit        # Check TypeScript types

# Code Quality
npm run lint            # Run ESLint

# Package Management
npm update              # Update dependencies
npm outdated            # Check outdated packages
```

---

## 🔍 Path Aliases

In TypeScript/JavaScript files, you can use:

```typescript
// Instead of relative paths
import Navigation from '../../components/Navigation'
import { Product } from '../../types'

// Use path aliases
import Navigation from '@/components/Navigation'
import { Product } from '@/types'
```

**Configured in:**
- `tsconfig.json` (for TypeScript)
- `tsconfig.app.json` (for app)
- `vite.config.ts` (for Vite resolution)

---

## 💡 Environment Variables

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
```

**Rules:**
- Must start with `VITE_`
- Rebuild after changing
- Don't commit `.env.local`

---

## 🎨 Tailwind Usage

```typescript
// Mobile-first responsive
<div className="text-sm md:text-base lg:text-lg">

// Custom colors (from config)
<div className="bg-primary text-primary-foreground">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## 📊 Build Output

After `npm run build`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].css
│   └── index-[hash].js
└── [copied public assets]
```

**Deployment:** Upload entire `dist/` folder

---

This reference covers all major configuration files and their purposes. For detailed explanations, see the full documentation files.
