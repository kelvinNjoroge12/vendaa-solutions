export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  priceFrom: number;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  brandingOptions: string[];
  pricingTiers: PricingTier[];
}

export interface PricingTier {
  name: string;
  quantity: string;
  price: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  results: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
}

export interface SiteSettings {
  currencyCode: string;
  currencySymbol?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface AdminUser {
  username: string;
  password: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
