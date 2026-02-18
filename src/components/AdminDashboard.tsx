import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  LayoutDashboard,
  Package,
  Briefcase,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Check,
  Image as ImageIcon,
  Upload,
} from 'lucide-react';
import { useCms } from '@/store/CmsContext';
import {
  categories,
  products as defaultProducts,
  testimonials as defaultTestimonials,
  caseStudies as defaultCaseStudies,
} from '@/data/products';
import {
  saveProducts,
  saveTestimonials,
  saveCaseStudies,
} from '@/lib/supabaseCms';
import type { Product, CaseStudy, Testimonial } from '@/types';
import { toast } from 'sonner';
import { isSupabaseConfigured } from '@/lib/supabase';
import { uploadProductImage, uploadCaseStudyImage, uploadHeroImage } from '@/lib/supabaseCms';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const {
    products: productList,
    testimonials: testimonialList,
    caseStudies: caseList,
    setProducts,
    setTestimonials,
    setCaseStudies,
    settings,
    setSettings,
    formatPrice,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'products' | 'cases' | 'testimonials' | 'settings'>('products');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | CaseStudy | Testimonial | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  useEffect(() => {
    gsap.fromTo(
      '.admin-sidebar',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.admin-content',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 }
    );
  }, []);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    onLogout();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Product deleted');
    }
  };

  const handleDeleteCase = (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      setCaseStudies((prev) => prev.filter((c) => c.id !== id));
      toast.success('Case study deleted');
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success('Testimonial deleted');
    }
  };

  const handleSaveProduct = () => {
    const p = editingItem as Product;
    if (!p.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    setProducts((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = p;
        return next;
      }
      return [...prev, p];
    });
    toast.success('Product saved');
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleSaveTestimonial = () => {
    const t = editingItem as Testimonial;
    if (!t.quote?.trim()) {
      toast.error('Quote is required');
      return;
    }
    setTestimonials((prev) => {
      const idx = prev.findIndex((x) => x.id === t.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...t, quote: t.quote.trim(), author: (t.author ?? '').trim(), role: (t.role ?? '').trim(), company: (t.company ?? '').trim() };
        return next;
      }
      return [...prev, { ...t, quote: t.quote.trim(), author: (t.author ?? '').trim(), role: (t.role ?? '').trim(), company: (t.company ?? '').trim() }];
    });
    toast.success('Testimonial saved — changes appear on the main site and are stored for future visits.');
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleSaveCaseStudy = () => {
    const c = editingItem as CaseStudy;
    if (!c.title?.trim()) {
      toast.error('Title is required');
      return;
    }
    setCaseStudies((prev) => {
      const idx = prev.findIndex((x) => x.id === c.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = c;
        return next;
      }
      return [...prev, c];
    });
    toast.success('Case study saved');
    setIsEditing(false);
    setEditingItem(null);
  };

  const filteredProducts = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProductsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F1EC]/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] text-sm focus:outline-none focus:border-[#C8A45C]/50 w-full sm:w-64"
          />
        </div>
        <button
          onClick={() => {
            setEditingItem({
              id: Date.now().toString(),
              name: '',
              description: '',
              category: 'notebooks',
              priceFrom: 0,
              image: '',
              brandingOptions: [],
              pricingTiers: [
                { name: 'Starter', quantity: '25-49', price: 0 },
                { name: 'Business', quantity: '50-99', price: 0 },
                { name: 'Enterprise', quantity: '100+', price: 0 },
              ],
            });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C8A45C] text-[#0B0B0D] rounded-lg font-medium hover:bg-[#D4B76A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="grid gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-[#F4F1EC]/5 rounded-xl border border-[#F4F1EC]/10"
          >
            <div className="w-16 h-16 rounded-lg bg-[#F4F1EC]/10 flex items-center justify-center overflow-hidden flex-shrink-0">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-6 h-6 text-[#F4F1EC]/30" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[#F4F1EC] truncate">{product.name}</h4>
              <p className="text-sm text-[#F4F1EC]/60 capitalize">{product.category}</p>
              <p className="text-sm text-[#C8A45C]">From {formatPrice(product.priceFrom)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingItem({ ...product });
                  setIsEditing(true);
                }}
                className="p-2 rounded-lg bg-[#F4F1EC]/10 text-[#F4F1EC]/70 hover:bg-[#C8A45C]/20 hover:text-[#C8A45C] transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="p-2 rounded-lg bg-[#F4F1EC]/10 text-[#F4F1EC]/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCasesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingItem({
              id: Date.now().toString(),
              title: '',
              client: '',
              description: '',
              beforeImage: '',
              afterImage: '',
              results: [],
            });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C8A45C] text-[#0B0B0D] rounded-lg font-medium hover:bg-[#D4B76A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Case Study
        </button>
      </div>
      <div className="grid gap-4">
        {caseList.map((caseStudy) => (
          <div
            key={caseStudy.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-[#F4F1EC]/5 rounded-xl border border-[#F4F1EC]/10"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[#F4F1EC]">{caseStudy.title}</h4>
              <p className="text-sm text-[#F4F1EC]/60">{caseStudy.client}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingItem({ ...caseStudy });
                  setIsEditing(true);
                }}
                className="p-2 rounded-lg bg-[#F4F1EC]/10 text-[#F4F1EC]/70 hover:bg-[#C8A45C]/20 hover:text-[#C8A45C] transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCase(caseStudy.id)}
                className="p-2 rounded-lg bg-[#F4F1EC]/10 text-[#F4F1EC]/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonialsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingItem({
              id: Date.now().toString(),
              quote: '',
              author: '',
              role: '',
              company: '',
              rating: 5,
            });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#C8A45C] text-[#0B0B0D] rounded-lg font-medium hover:bg-[#D4B76A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>
      <div className="grid gap-4">
        {testimonialList.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-[#F4F1EC]/5 rounded-xl border border-[#F4F1EC]/10"
          >
            <div className="flex-1 min-w-0">
              <p className="text-[#F4F1EC]/80 line-clamp-2">"{testimonial.quote}"</p>
              <p className="text-sm text-[#F4F1EC]/60 mt-1">
                {testimonial.author}, {testimonial.role}
                {testimonial.company && ` · ${testimonial.company}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingItem({ ...testimonial, rating: testimonial.rating ?? 5 });
                  setIsEditing(true);
                }}
                className="p-2 rounded-lg bg-[#F4F1EC]/10 text-[#F4F1EC]/70 hover:bg-[#C8A45C]/20 hover:text-[#C8A45C] transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteTestimonial(testimonial.id)}
                className="p-2 rounded-lg bg-[#F4F1EC]/10 text-[#F4F1EC]/70 hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="p-6 bg-[#F4F1EC]/5 rounded-xl border border-[#F4F1EC]/10">
        <h3 className="text-lg font-semibold text-[#F4F1EC] mb-4">Hero Image</h3>
        <p className="text-sm text-[#F4F1EC]/60 mb-4">
          This image is displayed on the main hero section at the top of the site.
        </p>
        <label className="block w-full max-w-md cursor-pointer group">
          <div className={`relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed transition-colors ${settings.heroImage ? 'border-[#F4F1EC]/20 hover:border-[#C8A45C]/60' : 'border-[#C8A45C]/40 hover:border-[#C8A45C]/80'
            } bg-[#F4F1EC]/5 flex items-center justify-center`}>
            {uploadingImage === 'hero' ? (
              <div className="flex flex-col items-center gap-2 text-[#C8A45C]">
                <div className="w-6 h-6 border-2 border-[#C8A45C] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Uploading…</span>
              </div>
            ) : settings.heroImage ? (
              <>
                <img src={settings.heroImage} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0B0B0D]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 text-[#C8A45C] text-sm font-medium">
                    <Upload className="w-4 h-4" />
                    Change hero image
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#F4F1EC]/50 group-hover:text-[#C8A45C] transition-colors">
                <Upload className="w-8 h-8" />
                <span className="text-sm">Click to upload hero image</span>
                <span className="text-xs text-[#F4F1EC]/30">Currently using default</span>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploadingImage !== null}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const localPreview = URL.createObjectURL(file);
              setSettings({ heroImage: localPreview });
              if (isSupabaseConfigured) {
                setUploadingImage('hero');
                const url = await uploadHeroImage(file);
                setUploadingImage(null);
                if (url) {
                  setSettings({ heroImage: url });
                  toast.success('Hero image uploaded');
                } else {
                  toast.error('Upload failed \u2014 using local preview');
                }
              } else {
                toast.success('Hero image selected (local preview)');
              }
              e.target.value = '';
            }}
          />
        </label>
        {settings.heroImage && (
          <button
            type="button"
            onClick={() => {
              setSettings({ heroImage: undefined });
              toast.success('Hero image reset to default');
            }}
            className="mt-3 text-sm text-red-400 hover:underline"
          >
            Reset to default
          </button>
        )}
      </div>

      {/* Currency */}
      <div className="p-6 bg-[#F4F1EC]/5 rounded-xl border border-[#F4F1EC]/10">
        <h3 className="text-lg font-semibold text-[#F4F1EC] mb-4">Currency (site-wide)</h3>
        <p className="text-sm text-[#F4F1EC]/60 mb-4">
          This symbol is used for all product prices on the site.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#F4F1EC]/70 mb-2">Currency code (e.g. USD, EUR)</label>
            <input
              type="text"
              value={settings.currencyCode}
              onChange={(e) => setSettings({ currencyCode: e.target.value.toUpperCase().slice(0, 3) })}
              className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
              placeholder="USD"
            />
          </div>
          <div>
            <label className="block text-sm text-[#F4F1EC]/70 mb-2">Currency symbol (e.g. $, €, £)</label>
            <input
              type="text"
              value={settings.currencySymbol ?? ''}
              onChange={(e) => setSettings({ currencySymbol: e.target.value.slice(0, 4) })}
              className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
              placeholder="$"
            />
          </div>
        </div>
        <button
          onClick={() => toast.success('Currency settings saved')}
          className="mt-4 px-4 py-2 bg-[#C8A45C] text-[#0B0B0D] rounded-lg font-medium hover:bg-[#D4B76A] transition-colors"
        >
          Save currency
        </button>
      </div>

      {/* Database Management */}
      <div className="p-6 bg-[#F4F1EC]/5 rounded-xl border border-[#F4F1EC]/10">
        <h3 className="text-lg font-semibold text-[#F4F1EC] mb-4">Database Management</h3>
        <p className="text-sm text-[#F4F1EC]/60 mb-4">
          Populate your live database with the default demo content. This is useful for initial setup.
          <br />
          <span className="text-yellow-500/80">Warning: This will add duplicate items if they already exist.</span>
        </p>

        <button
          onClick={async () => {
            if (!isSupabaseConfigured) {
              toast.error('Supabase is not configured.');
              return;
            }
            if (
              !confirm(
                'Are you sure you want to seed the database? This will add all default products, testimonials, and case studies to your live database.'
              )
            ) {
              return;
            }

            const toastId = toast.loading('Seeding database...');
            try {
              await Promise.all([
                saveProducts(defaultProducts),
                saveTestimonials(defaultTestimonials),
                saveCaseStudies(defaultCaseStudies),
              ]);
              toast.success('Database seeded successfully!', { id: toastId });
              setTimeout(() => window.location.reload(), 1500);
            } catch (error) {
              console.error(error);
              toast.error('Failed to seed database.', { id: toastId });
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#F4F1EC]/10 text-[#F4F1EC] rounded-lg font-medium hover:bg-[#F4F1EC]/20 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Seed Database with Defaults
        </button>
      </div>
    </div>
  );

  const renderProductEditForm = () => {
    const p = editingItem as Product;
    return (
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Product name</label>
          <input
            type="text"
            value={p.name}
            onChange={(e) => setEditingItem({ ...p, name: e.target.value })}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
            placeholder="e.g. Executive Notebook Set"
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Description</label>
          <textarea
            value={p.description}
            onChange={(e) => setEditingItem({ ...p, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50 resize-none"
            placeholder="Premium leather-bound notebook..."
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Category</label>
          <select
            value={p.category}
            onChange={(e) => setEditingItem({ ...p, category: e.target.value })}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
          >
            {categories.filter((c) => c.slug !== 'all').map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Main image</label>
          <label className="block w-full cursor-pointer group">
            <div className={`relative w-full h-40 rounded-lg overflow-hidden border-2 border-dashed transition-colors ${p.image ? 'border-[#F4F1EC]/20 hover:border-[#C8A45C]/60' : 'border-[#C8A45C]/40 hover:border-[#C8A45C]/80'
              } bg-[#F4F1EC]/5 flex items-center justify-center`}>
              {uploadingImage === 'p_image' ? (
                <div className="flex flex-col items-center gap-2 text-[#C8A45C]">
                  <div className="w-6 h-6 border-2 border-[#C8A45C] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Uploading…</span>
                </div>
              ) : p.image ? (
                <>
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#0B0B0D]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center gap-2 text-[#C8A45C] text-sm font-medium">
                      <Upload className="w-4 h-4" />
                      Change image
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#F4F1EC]/50 group-hover:text-[#C8A45C] transition-colors">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploadingImage !== null}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const localPreview = URL.createObjectURL(file);
                setEditingItem({ ...p, image: localPreview });
                if (isSupabaseConfigured) {
                  setUploadingImage('p_image');
                  const url = await uploadProductImage(p.id, 'image', file);
                  setUploadingImage(null);
                  if (url) {
                    setEditingItem({ ...p, image: url });
                    toast.success('Image uploaded');
                  } else {
                    toast.error('Upload failed — using local preview');
                  }
                } else {
                  toast.success('Image selected (local preview)');
                }
                e.target.value = '';
              }}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#F4F1EC]/70 mb-2">Before image</label>
            <label className="block w-full cursor-pointer group">
              <div className={`relative w-full h-28 rounded-lg overflow-hidden border-2 border-dashed transition-colors ${p.beforeImage ? 'border-[#F4F1EC]/20 hover:border-[#C8A45C]/60' : 'border-[#C8A45C]/40 hover:border-[#C8A45C]/80'
                } bg-[#F4F1EC]/5 flex items-center justify-center`}>
                {uploadingImage === 'p_before' ? (
                  <div className="flex flex-col items-center gap-1 text-[#C8A45C]">
                    <div className="w-5 h-5 border-2 border-[#C8A45C] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Uploading…</span>
                  </div>
                ) : p.beforeImage ? (
                  <>
                    <img src={p.beforeImage} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0B0B0D]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-4 h-4 text-[#C8A45C]" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-[#F4F1EC]/50 group-hover:text-[#C8A45C] transition-colors">
                    <Upload className="w-5 h-5" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingImage !== null}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const localPreview = URL.createObjectURL(file);
                  setEditingItem({ ...p, beforeImage: localPreview });
                  if (isSupabaseConfigured) {
                    setUploadingImage('p_before');
                    const url = await uploadProductImage(p.id, 'before_image', file);
                    setUploadingImage(null);
                    if (url) {
                      setEditingItem({ ...p, beforeImage: url });
                      toast.success('Before image uploaded');
                    } else {
                      toast.error('Upload failed — using local preview');
                    }
                  } else {
                    toast.success('Image selected (local preview)');
                  }
                  e.target.value = '';
                }}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm text-[#F4F1EC]/70 mb-2">After image</label>
            <label className="block w-full cursor-pointer group">
              <div className={`relative w-full h-28 rounded-lg overflow-hidden border-2 border-dashed transition-colors ${p.afterImage ? 'border-[#F4F1EC]/20 hover:border-[#C8A45C]/60' : 'border-[#C8A45C]/40 hover:border-[#C8A45C]/80'
                } bg-[#F4F1EC]/5 flex items-center justify-center`}>
                {uploadingImage === 'p_after' ? (
                  <div className="flex flex-col items-center gap-1 text-[#C8A45C]">
                    <div className="w-5 h-5 border-2 border-[#C8A45C] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Uploading…</span>
                  </div>
                ) : p.afterImage ? (
                  <>
                    <img src={p.afterImage} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0B0B0D]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-4 h-4 text-[#C8A45C]" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-[#F4F1EC]/50 group-hover:text-[#C8A45C] transition-colors">
                    <Upload className="w-5 h-5" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingImage !== null}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const localPreview = URL.createObjectURL(file);
                  setEditingItem({ ...p, afterImage: localPreview });
                  if (isSupabaseConfigured) {
                    setUploadingImage('p_after');
                    const url = await uploadProductImage(p.id, 'after_image', file);
                    setUploadingImage(null);
                    if (url) {
                      setEditingItem({ ...p, afterImage: url });
                      toast.success('After image uploaded');
                    } else {
                      toast.error('Upload failed — using local preview');
                    }
                  } else {
                    toast.success('Image selected (local preview)');
                  }
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Branding options (one per line)</label>
          <textarea
            value={(p.brandingOptions ?? []).join('\n')}
            onChange={(e) =>
              setEditingItem({
                ...p,
                brandingOptions: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
              })
            }
            rows={3}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50 resize-none"
            placeholder="Embossed Logo&#10;Foil Stamping&#10;Custom Insert"
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Price from (shown on card)</label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={p.priceFrom}
            onChange={(e) => setEditingItem({ ...p, priceFrom: Number(e.target.value) || 0 })}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Pricing tiers</label>
          <div className="space-y-3">
            {(p.pricingTiers ?? []).map((tier, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                <input
                  type="text"
                  value={tier.name}
                  onChange={(e) => {
                    const tiers = [...(p.pricingTiers ?? [])];
                    tiers[idx] = { ...tier, name: e.target.value };
                    setEditingItem({ ...p, pricingTiers: tiers });
                  }}
                  placeholder="Tier name"
                  className="col-span-3 px-3 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] text-sm"
                />
                <input
                  type="text"
                  value={tier.quantity}
                  onChange={(e) => {
                    const tiers = [...(p.pricingTiers ?? [])];
                    tiers[idx] = { ...tier, quantity: e.target.value };
                    setEditingItem({ ...p, pricingTiers: tiers });
                  }}
                  placeholder="e.g. 25-49"
                  className="col-span-3 px-3 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] text-sm"
                />
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={tier.price}
                  onChange={(e) => {
                    const tiers = [...(p.pricingTiers ?? [])];
                    tiers[idx] = { ...tier, price: Number(e.target.value) || 0 };
                    setEditingItem({ ...p, pricingTiers: tiers });
                  }}
                  placeholder="Price"
                  className="col-span-3 px-3 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] text-sm"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setEditingItem({
                ...p,
                pricingTiers: [...(p.pricingTiers ?? []), { name: '', quantity: '', price: 0 }],
              })
            }
            className="mt-2 text-sm text-[#C8A45C] hover:underline"
          >
            + Add tier
          </button>
        </div>
      </div>
    );
  };

  const renderTestimonialEditForm = () => {
    const t = editingItem as Testimonial;
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Quote</label>
          <textarea
            value={t.quote}
            onChange={(e) => setEditingItem({ ...t, quote: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50 resize-none"
            placeholder="Customer review text..."
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Author name</label>
          <input
            type="text"
            value={t.author}
            onChange={(e) => setEditingItem({ ...t, author: e.target.value })}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
            placeholder="Sarah Mitchell"
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Role / title</label>
          <input
            type="text"
            value={t.role}
            onChange={(e) => setEditingItem({ ...t, role: e.target.value })}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
            placeholder="Marketing Lead"
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Company</label>
          <input
            type="text"
            value={t.company}
            onChange={(e) => setEditingItem({ ...t, company: e.target.value })}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
            placeholder="SaaS Company"
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Star rating (1–5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={t.rating ?? 5}
            onChange={(e) => setEditingItem({ ...t, rating: Math.min(5, Math.max(1, Number(e.target.value) || 5)) })}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
          />
        </div>
      </div>
    );
  };

  const renderCaseStudyEditForm = () => {
    const c = editingItem as CaseStudy;
    return (
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Title</label>
          <input
            type="text"
            value={c.title}
            onChange={(e) => setEditingItem({ ...c, title: e.target.value })}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Client</label>
          <input
            type="text"
            value={c.client}
            onChange={(e) => setEditingItem({ ...c, client: e.target.value })}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50"
          />
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Description</label>
          <textarea
            value={c.description}
            onChange={(e) => setEditingItem({ ...c, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50 resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#F4F1EC]/70 mb-2">Before image</label>
            <label className="block w-full cursor-pointer group">
              <div className={`relative w-full h-28 rounded-lg overflow-hidden border-2 border-dashed transition-colors ${c.beforeImage ? 'border-[#F4F1EC]/20 hover:border-[#C8A45C]/60' : 'border-[#C8A45C]/40 hover:border-[#C8A45C]/80'
                } bg-[#F4F1EC]/5 flex items-center justify-center`}>
                {uploadingImage === 'cs_before' ? (
                  <div className="flex flex-col items-center gap-1 text-[#C8A45C]">
                    <div className="w-5 h-5 border-2 border-[#C8A45C] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Uploading…</span>
                  </div>
                ) : c.beforeImage ? (
                  <>
                    <img src={c.beforeImage} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0B0B0D]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-4 h-4 text-[#C8A45C]" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-[#F4F1EC]/50 group-hover:text-[#C8A45C] transition-colors">
                    <Upload className="w-5 h-5" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingImage !== null}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const localPreview = URL.createObjectURL(file);
                  setEditingItem({ ...c, beforeImage: localPreview });
                  if (isSupabaseConfigured) {
                    setUploadingImage('cs_before');
                    const url = await uploadCaseStudyImage(c.id, 'before_image', file);
                    setUploadingImage(null);
                    if (url) {
                      setEditingItem({ ...c, beforeImage: url });
                      toast.success('Before image uploaded');
                    } else {
                      toast.error('Upload failed — using local preview');
                    }
                  } else {
                    toast.success('Image selected (local preview)');
                  }
                  e.target.value = '';
                }}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm text-[#F4F1EC]/70 mb-2">After image</label>
            <label className="block w-full cursor-pointer group">
              <div className={`relative w-full h-28 rounded-lg overflow-hidden border-2 border-dashed transition-colors ${c.afterImage ? 'border-[#F4F1EC]/20 hover:border-[#C8A45C]/60' : 'border-[#C8A45C]/40 hover:border-[#C8A45C]/80'
                } bg-[#F4F1EC]/5 flex items-center justify-center`}>
                {uploadingImage === 'cs_after' ? (
                  <div className="flex flex-col items-center gap-1 text-[#C8A45C]">
                    <div className="w-5 h-5 border-2 border-[#C8A45C] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Uploading…</span>
                  </div>
                ) : c.afterImage ? (
                  <>
                    <img src={c.afterImage} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0B0B0D]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-4 h-4 text-[#C8A45C]" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-[#F4F1EC]/50 group-hover:text-[#C8A45C] transition-colors">
                    <Upload className="w-5 h-5" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingImage !== null}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const localPreview = URL.createObjectURL(file);
                  setEditingItem({ ...c, afterImage: localPreview });
                  if (isSupabaseConfigured) {
                    setUploadingImage('cs_after');
                    const url = await uploadCaseStudyImage(c.id, 'after_image', file);
                    setUploadingImage(null);
                    if (url) {
                      setEditingItem({ ...c, afterImage: url });
                      toast.success('After image uploaded');
                    } else {
                      toast.error('Upload failed — using local preview');
                    }
                  } else {
                    toast.success('Image selected (local preview)');
                  }
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#F4F1EC]/70 mb-2">Results (one per line)</label>
          <textarea
            value={(c.results ?? []).join('\n')}
            onChange={(e) =>
              setEditingItem({
                ...c,
                results: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
              })
            }
            rows={3}
            className="w-full px-4 py-2 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-lg text-[#F4F1EC] focus:outline-none focus:border-[#C8A45C]/50 resize-none"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex">
      <aside className="admin-sidebar w-64 bg-[#0B0B0D] border-r border-[#F4F1EC]/10 flex-shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold text-[#F4F1EC]">Vendaa Admin</h1>
          <p className="text-sm text-[#F4F1EC]/50">Content Management</p>
        </div>
        <nav className="px-4 pb-4">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'products' ? 'bg-[#C8A45C]/20 text-[#C8A45C]' : 'text-[#F4F1EC]/70 hover:bg-[#F4F1EC]/5'
                }`}
            >
              <Package className="w-5 h-5" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'cases' ? 'bg-[#C8A45C]/20 text-[#C8A45C]' : 'text-[#F4F1EC]/70 hover:bg-[#F4F1EC]/5'
                }`}
            >
              <Briefcase className="w-5 h-5" />
              Case Studies
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'testimonials' ? 'bg-[#C8A45C]/20 text-[#C8A45C]' : 'text-[#F4F1EC]/70 hover:bg-[#F4F1EC]/5'
                }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Testimonials
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === 'settings' ? 'bg-[#C8A45C]/20 text-[#C8A45C]' : 'text-[#F4F1EC]/70 hover:bg-[#F4F1EC]/5'
                }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#F4F1EC]/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-[#F4F1EC]/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
      <main className="admin-content flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-[#F4F1EC] mb-6 capitalize">
              {activeTab === 'cases' ? 'Case Studies' : activeTab}
            </h2>
            {activeTab === 'products' && renderProductsTab()}
            {activeTab === 'cases' && renderCasesTab()}
            {activeTab === 'testimonials' && renderTestimonialsTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
        </div>
      </main>

      {isEditing && editingItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0B0B0D]/90 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0B0B0D] rounded-xl border border-[#F4F1EC]/10 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#F4F1EC]/10 flex-shrink-0">
              <h3 className="text-lg font-semibold text-[#F4F1EC]">
                {activeTab === 'cases' ? 'Edit Case Study' : activeTab === 'testimonials' ? 'Edit Testimonial' : 'Edit Product'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                }}
                className="p-2 rounded-lg bg-[#F4F1EC]/10 text-[#F4F1EC]/70 hover:bg-[#F4F1EC]/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto p-4">
              {activeTab === 'products' && 'name' in editingItem && renderProductEditForm()}
              {activeTab === 'testimonials' && 'quote' in editingItem && renderTestimonialEditForm()}
              {activeTab === 'cases' && 'title' in editingItem && renderCaseStudyEditForm()}
            </div>
            {/* Sticky footer: Save / Cancel always visible */}
            <div className="p-4 border-t border-[#F4F1EC]/10 bg-[#0B0B0D] flex-shrink-0 flex gap-3">
              {activeTab === 'testimonials' && editingItem && 'quote' in editingItem && (
                <>
                  <button
                    type="button"
                    onClick={handleSaveTestimonial}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#C8A45C] text-[#0B0B0D] rounded-lg font-medium hover:bg-[#D4B76A] transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Save testimonial
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setEditingItem(null); }}
                    className="flex-1 px-4 py-3 bg-[#F4F1EC]/10 text-[#F4F1EC] rounded-lg font-medium hover:bg-[#F4F1EC]/20 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              {activeTab === 'products' && editingItem && 'name' in editingItem && (
                <>
                  <button
                    type="button"
                    onClick={handleSaveProduct}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#C8A45C] text-[#0B0B0D] rounded-lg font-medium hover:bg-[#D4B76A] transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Save product
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setEditingItem(null); }}
                    className="flex-1 px-4 py-3 bg-[#F4F1EC]/10 text-[#F4F1EC] rounded-lg font-medium hover:bg-[#F4F1EC]/20 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              {activeTab === 'cases' && editingItem && 'title' in editingItem && (
                <>
                  <button
                    type="button"
                    onClick={handleSaveCaseStudy}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#C8A45C] text-[#0B0B0D] rounded-lg font-medium hover:bg-[#D4B76A] transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Save case study
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsEditing(false); setEditingItem(null); }}
                    className="flex-1 px-4 py-3 bg-[#F4F1EC]/10 text-[#F4F1EC] rounded-lg font-medium hover:bg-[#F4F1EC]/20 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
