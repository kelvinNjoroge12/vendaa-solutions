import type { Product, Testimonial, CaseStudy, SiteSettings } from '@/types';
import { supabase } from './supabase';

const BUCKET = 'product-images';

export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error('Supabase fetch products:', error);
    return [];
  }
  return (data ?? []).map(rowToProduct);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error('Supabase fetch testimonials:', error);
    return [];
  }
  return (data ?? []).map(rowToTestimonial);
}

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('case_studies').select('*').order('created_at', { ascending: true });
  if (error) {
    console.error('Supabase fetch case_studies:', error);
    return [];
  }
  return (data ?? []).map(rowToCaseStudy);
}

export async function fetchSettings(): Promise<SiteSettings | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('settings').select('*').eq('id', 'global').single();
  if (error || !data) return null;
  return { currencyCode: data.currency_code ?? 'USD', currencySymbol: data.currency_symbol ?? '$' };
}

export async function saveProducts(products: Product[]): Promise<boolean> {
  if (!supabase) return false;
  const rows = products.map(productToRow);
  const { error } = await supabase.from('products').upsert(rows, { onConflict: 'id' });
  if (error) {
    console.error('Supabase save products:', error);
    return false;
  }
  return true;
}

export async function saveTestimonials(testimonials: Testimonial[]): Promise<boolean> {
  if (!supabase) return false;
  const rows = testimonials.map(testimonialToRow);
  const { error } = await supabase.from('testimonials').upsert(rows, { onConflict: 'id' });
  if (error) {
    console.error('Supabase save testimonials:', error);
    return false;
  }
  return true;
}

export async function saveCaseStudies(caseStudies: CaseStudy[]): Promise<boolean> {
  if (!supabase) return false;
  const rows = caseStudies.map(caseStudyToRow);
  const { error } = await supabase.from('case_studies').upsert(rows, { onConflict: 'id' });
  if (error) {
    console.error('Supabase save case_studies:', error);
    return false;
  }
  return true;
}

export async function saveSettings(settings: SiteSettings): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('settings').upsert(
    { id: 'global', currency_code: settings.currencyCode, currency_symbol: settings.currencySymbol ?? '$' },
    { onConflict: 'id' }
  );
  if (error) {
    console.error('Supabase save settings:', error);
    return false;
  }
  return true;
}

/** Upload a product image from file; returns public URL or null. */
export async function uploadProductImage(productId: string, field: 'image' | 'before_image' | 'after_image', file: File): Promise<string | null> {
  if (!supabase) return null;
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${productId}/${field}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
  });
  if (error) {
    console.error('Supabase upload image:', error);
    return null;
  }
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return urlData?.publicUrl ?? null;
}

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name ?? ''),
    description: String(row.description ?? ''),
    category: String(row.category ?? ''),
    priceFrom: Number(row.price_from ?? 0),
    image: String(row.image ?? ''),
    beforeImage: row.before_image ? String(row.before_image) : undefined,
    afterImage: row.after_image ? String(row.after_image) : undefined,
    brandingOptions: Array.isArray(row.branding_options) ? (row.branding_options as string[]) : [],
    pricingTiers: Array.isArray(row.pricing_tiers)
      ? (row.pricing_tiers as Array<{ name: string; quantity: string; price: number }>)
      : [],
  };
}

function productToRow(p: Product): Record<string, unknown> {
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category,
    price_from: p.priceFrom,
    image: p.image,
    before_image: p.beforeImage ?? null,
    after_image: p.afterImage ?? null,
    branding_options: p.brandingOptions,
    pricing_tiers: p.pricingTiers,
  };
}

function rowToTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    id: String(row.id),
    quote: String(row.quote ?? ''),
    author: String(row.author ?? ''),
    role: String(row.role ?? ''),
    company: String(row.company ?? ''),
    rating: row.rating != null ? Number(row.rating) : undefined,
  };
}

function testimonialToRow(t: Testimonial): Record<string, unknown> {
  return {
    id: t.id,
    quote: t.quote,
    author: t.author,
    role: t.role,
    company: t.company,
    rating: t.rating ?? null,
  };
}

function rowToCaseStudy(row: Record<string, unknown>): CaseStudy {
  return {
    id: String(row.id),
    title: String(row.title ?? ''),
    client: String(row.client ?? ''),
    description: String(row.description ?? ''),
    beforeImage: String(row.before_image ?? ''),
    afterImage: String(row.after_image ?? ''),
    results: Array.isArray(row.results) ? (row.results as string[]) : [],
  };
}

function caseStudyToRow(c: CaseStudy): Record<string, unknown> {
  return {
    id: c.id,
    title: c.title,
    client: c.client,
    description: c.description,
    before_image: c.beforeImage,
    after_image: c.afterImage,
    results: c.results,
  };
}
