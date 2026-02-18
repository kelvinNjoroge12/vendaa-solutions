# Deployment Guide

Complete guide for deploying Vendaa Solutions to various platforms.

## 📦 Build Preparation

### 1. Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 2. Test Production Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## 🚀 Deployment Platforms

### Vercel (Recommended)

**Easiest deployment with zero configuration**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts:**
   - Link to your account
   - Configure project settings
   - Deploy!

**Or use Vercel GUI:**
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel auto-detects Vite
4. Click "Deploy"

**Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add your `VITE_*` variables
- Redeploy

---

### Netlify

**Great for static sites with form handling**

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

**Or use Netlify GUI:**
1. Go to [netlify.com](https://netlify.com)
2. Drag & drop your `dist/` folder
3. Or connect your Git repository

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`

---

### GitHub Pages

**Free hosting for static sites**

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     base: '/vendaa-solutions/', // Your repo name
     // ... rest of config
   })
   ```

3. **Add deploy script to `package.json`:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Save

---

### AWS S3 + CloudFront

**Enterprise-grade scalable hosting**

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create S3 Bucket:**
   - Go to AWS S3 Console
   - Create new bucket
   - Enable static website hosting
   - Set index document: `index.html`
   - Set error document: `index.html` (for SPA routing)

3. **Upload files:**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **Create CloudFront Distribution:**
   - Origin: Your S3 bucket
   - Default root object: `index.html`
   - Custom error responses: 404 → 200 `/index.html`

5. **Update DNS:**
   - Point your domain to CloudFront distribution

---

### DigitalOcean App Platform

**Simple and affordable**

1. **Connect repository:**
   - Go to DigitalOcean Apps
   - Create new app
   - Connect GitHub/GitLab

2. **Configure build:**
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy:**
   - Click "Deploy"
   - Your app will be live!

---

### Docker Deployment

**For containerized environments**

1. **Create `Dockerfile`:**
   ```dockerfile
   # Build stage
   FROM node:18-alpine AS build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   # Production stage
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create `nginx.conf`:**
   ```nginx
   server {
     listen 80;
     server_name localhost;
     root /usr/share/nginx/html;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }

     gzip on;
     gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

3. **Build and run:**
   ```bash
   docker build -t vendaa-solutions .
   docker run -p 8080:80 vendaa-solutions
   ```

---

---

## 🔒 Security & Database Setup

Before deploying, you **MUST** configure your Supabase database security.

### 1. Apply RLS Policies
We have generated a SQL file to secure your data.
1. Go to your Supabase Dashboard -> SQL Editor.
2. Click "New Query".
3. Open `supabase/security.sql` from this project.
4. Copy the contents and paste them into the SQL Editor.
5. Click **Run**.
   *   This enables Row Level Security (RLS) for all tables.
   *   It sets up "Public Read" access for website visitors.
   *   It restricts "Write/Update/Delete" access to Authenticated Admins only.

### 2. Verify Admin Login
We have removed the insecure hardcoded credentials.
- Ensure your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in Vercel/Netlify.
- Create your admin user in Supabase Authentication -> Users.
- Login via `/admin` using these credentials.

---

For production, set these environment variables in your hosting platform:

```bash
VITE_APP_TITLE=Vendaa Solutions
VITE_APP_URL=https://yourdomain.com
# Add other VITE_* variables as needed
```

**Important:** 
- Vite environment variables must start with `VITE_`
- Rebuild after changing environment variables
- Never commit `.env` files with secrets to Git

---

## ✅ Pre-Deployment Checklist

- [ ] All tests pass
- [ ] Production build completes without errors
- [ ] Preview build works locally
- [ ] Environment variables configured
- [ ] Analytics tracking ID added (if using)
- [ ] Custom domain configured
- [ ] SSL certificate enabled
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Performance monitoring enabled
- [ ] SEO meta tags verified

---

## 🔧 Post-Deployment

### Verify Deployment

1. **Check site loads:** Visit your deployed URL
2. **Test responsiveness:** Check on mobile, tablet, desktop
3. **Check console:** No errors in browser DevTools
4. **Test navigation:** All links work
5. **Test forms:** Contact form submits correctly
6. **Check performance:** Use Google PageSpeed Insights

### Performance Optimization

1. **Enable Compression:**
   - Most platforms enable gzip/brotli by default
   - Verify in Network tab (Content-Encoding header)

2. **CDN Configuration:**
   - Use CloudFront, Cloudflare, or platform's CDN
   - Cache static assets aggressively

3. **Image Optimization:**
   - Use WebP format where possible
   - Add lazy loading
   - Compress images

---

## 📊 Monitoring

### Set Up Analytics

Add Google Analytics or similar:

```typescript
// src/main.tsx
if (import.meta.env.PROD && import.meta.env.VITE_GA_TRACKING_ID) {
  // Add GA script
}
```

### Error Tracking

Consider adding Sentry:

```bash
npm install @sentry/react
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: vercel/actions@v2
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 🆘 Troubleshooting

### Blank page after deployment

**Issue:** App loads but shows blank page

**Solutions:**
1. Check browser console for errors
2. Verify `base` path in `vite.config.ts`
3. Check routing configuration
4. Verify all assets loaded (Network tab)

### 404 on refresh

**Issue:** Refreshing a route returns 404

**Solution:** Configure server to serve `index.html` for all routes

**Vercel:** Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Nginx:**
```nginx
try_files $uri $uri/ /index.html;
```

### Environment variables not working

**Issue:** `import.meta.env.VITE_*` is undefined

**Solutions:**
1. Ensure variables start with `VITE_`
2. Rebuild after changing variables
3. Check platform-specific environment variable configuration

---

## 📞 Support

For deployment issues:
1. Check platform-specific documentation
2. Review build logs
3. Test production build locally first
4. Verify environment variables

---

Happy deploying! 🚀
