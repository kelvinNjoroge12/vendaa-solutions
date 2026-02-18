import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product, Testimonial, CaseStudy, SiteSettings } from '@/types';
import {
  products as defaultProducts,
  testimonials as defaultTestimonials,
  caseStudies as defaultCaseStudies,
} from '@/data/products';
import { isSupabaseConfigured } from '@/lib/supabase';
import {
  fetchProducts,
  fetchTestimonials,
  fetchCaseStudies,
  fetchSettings,
  saveProducts,
  saveTestimonials,
  saveCaseStudies,
  saveSettings,
} from '@/lib/supabaseCms';

const STORAGE_KEYS = {
  products: 'vendaa_cms_products',
  testimonials: 'vendaa_cms_testimonials',
  caseStudies: 'vendaa_cms_case_studies',
  settings: 'vendaa_cms_settings',
} as const;

const defaultSettings: SiteSettings = {
  currencyCode: 'USD',
  currencySymbol: '$',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw) as T;
      return Array.isArray(parsed) ? parsed : { ...fallback, ...parsed };
    }
  } catch {
    // ignore
  }
  return fallback;
}

function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

interface CmsState {
  products: Product[];
  testimonials: Testimonial[];
  caseStudies: CaseStudy[];
  settings: SiteSettings;
}

interface CmsContextValue extends CmsState {
  loading: boolean;
  setProducts: (products: Product[] | ((prev: Product[]) => Product[])) => void;
  setTestimonials: (testimonials: Testimonial[] | ((prev: Testimonial[]) => Testimonial[])) => void;
  setCaseStudies: (caseStudies: CaseStudy[] | ((prev: CaseStudy[]) => CaseStudy[])) => void;
  setSettings: (settings: Partial<SiteSettings> | ((prev: SiteSettings) => Partial<SiteSettings>)) => void;
  formatPrice: (amount: number) => string;
}

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const useSupabase = isSupabaseConfigured;
  const [loading, setLoading] = useState(useSupabase);
  const [products, setProductsState] = useState<Product[]>(() =>
    useSupabase ? [] : loadFromStorage(STORAGE_KEYS.products, defaultProducts)
  );
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(() =>
    useSupabase ? [] : loadFromStorage(STORAGE_KEYS.testimonials, defaultTestimonials)
  );
  const [caseStudies, setCaseStudiesState] = useState<CaseStudy[]>(() =>
    useSupabase ? [] : loadFromStorage(STORAGE_KEYS.caseStudies, defaultCaseStudies)
  );
  const [settings, setSettingsState] = useState<SiteSettings>(() =>
    useSupabase ? defaultSettings : loadFromStorage(STORAGE_KEYS.settings, defaultSettings)
  );

  useEffect(() => {
    if (!useSupabase) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const [prods, testis, cases, sets] = await Promise.all([
        fetchProducts(),
        fetchTestimonials(),
        fetchCaseStudies(),
        fetchSettings(),
      ]);
      if (cancelled) return;
      setProductsState(prods);
      setTestimonialsState(testis);
      setCaseStudiesState(cases);
      if (sets) setSettingsState(sets);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [useSupabase]);

  const setProducts = useCallback((arg: Product[] | ((prev: Product[]) => Product[])) => {
    setProductsState((prev) => {
      const next = typeof arg === 'function' ? arg(prev) : arg;
      saveToStorage(STORAGE_KEYS.products, next);
      if (useSupabase) void saveProducts(next);
      return next;
    });
  }, [useSupabase]);

  const setTestimonials = useCallback((arg: Testimonial[] | ((prev: Testimonial[]) => Testimonial[])) => {
    setTestimonialsState((prev) => {
      const next = typeof arg === 'function' ? arg(prev) : arg;
      saveToStorage(STORAGE_KEYS.testimonials, next);
      if (useSupabase) void saveTestimonials(next);
      return next;
    });
  }, [useSupabase]);

  const setCaseStudies = useCallback((arg: CaseStudy[] | ((prev: CaseStudy[]) => CaseStudy[])) => {
    setCaseStudiesState((prev) => {
      const next = typeof arg === 'function' ? arg(prev) : arg;
      saveToStorage(STORAGE_KEYS.caseStudies, next);
      if (useSupabase) void saveCaseStudies(next);
      return next;
    });
  }, [useSupabase]);

  const setSettings = useCallback((arg: Partial<SiteSettings> | ((prev: SiteSettings) => Partial<SiteSettings>)) => {
    setSettingsState((prev) => {
      const patch = typeof arg === 'function' ? arg(prev) : arg;
      const next = { ...prev, ...patch };
      saveToStorage(STORAGE_KEYS.settings, next);
      if (useSupabase) void saveSettings(next);
      return next;
    });
  }, [useSupabase]);

  const formatPrice = useCallback(
    (amount: number) => {
      const sym = settings.currencySymbol ?? '$';
      return `${sym}${amount}`;
    },
    [settings.currencySymbol]
  );

  const value = useMemo<CmsContextValue>(
    () => ({
      products,
      testimonials,
      caseStudies,
      settings,
      loading,
      setProducts,
      setTestimonials,
      setCaseStudies,
      setSettings,
      formatPrice,
    }),
    [products, testimonials, caseStudies, settings, loading, setProducts, setTestimonials, setCaseStudies, setSettings, formatPrice]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
}
