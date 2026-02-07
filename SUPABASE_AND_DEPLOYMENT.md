# Supabase + Production Deployment (HTTPS & Security)

This app is production-ready with **Supabase** for database, storage, and admin auth. Deploy to **Vercel** or **Netlify** for automatic **HTTPS** and security headers.

---

## 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine).
2. In **Project Settings → API** copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
3. In **SQL Editor**, run the migration:
   - Open `supabase/migrations/001_schema.sql` in this repo.
   - Copy its full contents into a new query in Supabase SQL Editor and run it.
   - This creates tables (`products`, `testimonials`, `case_studies`, `settings`), RLS policies, and the **product-images** storage bucket with policies.
4. Create an admin user (for Supabase Auth):
   - In Supabase: **Authentication → Users → Add user** (or **Sign up**).
   - Use the **email** and **password** you want for admin login.
   - You will sign in with this email/password at `/admin`.

---

## 2. Environment variables (production)

Set these in your hosting dashboard (Vercel / Netlify) so they are available at build and runtime. **Never** put the Supabase **service_role** key in the frontend.

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `VITE_FORMSPREE_FORM_ID` | Formspree form ID for contact form emails |

- For **local**: copy `.env.example` to `.env.local` and fill the same variables.

---

## 3. Deploy with HTTPS (Vercel or Netlify)

Both provide **HTTPS by default** and handle SSL for you.

### Vercel

1. Import the repo at [vercel.com](https://vercel.com).
2. Build command: `npm run build`, output: `dist`.
3. Add the env vars above in **Settings → Environment Variables**.
4. Deploy. Your site will be `https://your-project.vercel.app`.

### Netlify

1. Import the repo at [netlify.com](https://netlify.com).
2. Build command: `npm run build`, publish directory: `dist`.
3. Add env vars in **Site settings → Environment variables**.
4. Deploy. Your site will be `https://your-site.netlify.app`.

---

## 4. Security checklist

- **HTTPS**: Always use the provided `https://` URL; Vercel/Netlify enforce HTTPS.
- **Secrets**: Only use `VITE_SUPABASE_ANON_KEY` in the frontend. Never use `service_role` or other secret keys in client-side code.
- **Auth**: Admin writes (products, testimonials, uploads) are allowed only when the user is signed in via Supabase Auth (RLS policies).
- **CORS**: Supabase project URL is allowed by default for your frontend origin when you add the site URL in Supabase **Authentication → URL configuration** if needed.
- **Headers**: For stricter security you can add headers (e.g. CSP, X-Frame-Options) in your host’s config (e.g. `vercel.json` or `netlify.toml`).

---

## 5. Product images (upload from laptop)

- With Supabase configured, in **Admin → Products → Edit** you get:
  - **Upload from laptop**: choose a file; it uploads to Supabase Storage and sets the product image URL.
  - You can still paste a **URL** if you prefer.
- Images are stored in the **product-images** bucket (public read, authenticated write).
- Max file size: 5MB; types: JPEG, PNG, WebP, GIF.

---

## 6. Without Supabase

If you leave `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` unset:

- CMS data is stored in **localStorage** (no server).
- Admin login uses the default username/password (see AdminLogin component).
- Product images are URL-only (no file upload).
- Deploy as a static site; HTTPS is still provided by your host.

---

## 7. Optional: security headers (Vercel)

Create `vercel.json` in the project root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

This adds basic security headers for all routes.
