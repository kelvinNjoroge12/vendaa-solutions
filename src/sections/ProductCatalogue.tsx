import { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, X } from 'lucide-react';
import { useCms } from '@/store/CmsContext';
import { categories } from '@/data/products';
import type { Product } from '@/types';

interface ProductCatalogueProps {
  onProductClick: (product: Product) => void;
}

export default function ProductCatalogue({ onProductClick }: ProductCatalogueProps) {
  const { products, formatPrice } = useCms();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
        const matchesSearch = 
          searchQuery === '' ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .slice(0, 8);
  }, [products, activeCategory, searchQuery]);

  return (
    <section
      id="catalogue"
      className="relative bg-[#0B0B0D] py-16 lg:py-24"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="heading-section text-[#F4F1EC] uppercase mb-3">
            Product <span className="text-gradient-gold">Catalogue</span>
          </h2>
          <p className="text-base sm:text-lg text-[#F4F1EC]/72 max-w-xl">
            From everyday essentials to premium keepsakes.
          </p>
        </div>

        {/* Tabs and Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === category.slug
                    ? 'bg-[#C8A45C] text-[#0B0B0D]'
                    : 'bg-[#F4F1EC]/10 text-[#F4F1EC]/80 hover:bg-[#F4F1EC]/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-4">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 bg-[#F4F1EC]/10 rounded-full px-4 py-2 transition-all">
                <Search className="w-4 h-4 text-[#F4F1EC]/60" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[#F4F1EC] text-sm outline-none w-40 lg:w-56 placeholder:text-[#F4F1EC]/40"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  className="text-[#F4F1EC]/60 hover:text-[#F4F1EC] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#F4F1EC]/10 rounded-full text-sm text-[#F4F1EC]/80 hover:bg-[#F4F1EC]/20 transition-colors"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            )}
          </div>
        </div>

        {/* Product Grid - Optimized with simple hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              onClick={() => onProductClick(product)}
              className="product-card group cursor-pointer"
            >
              <div className="card-luxury bg-[#0B0B0D] border border-[#F4F1EC]/10 overflow-hidden transition-all duration-200 hover:border-[#C8A45C]/40 hover:-translate-y-1">
                {/* Image - Lazy loaded */}
                <div className="aspect-square overflow-hidden bg-[#F4F1EC]/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-micro text-[#C8A45C] mb-1.5 block">
                    {categories.find(c => c.slug === product.category)?.name}
                  </span>
                  <h3 className="text-base font-semibold text-[#F4F1EC] mb-1.5 group-hover:text-[#C8A45C] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#F4F1EC]/60 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#C8A45C] font-semibold text-sm">
                      From {formatPrice(product.priceFrom)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#F4F1EC]/60 group-hover:text-[#C8A45C] transition-colors">
                      View
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-10 h-10 text-[#F4F1EC]/30 mx-auto mb-3" />
            <p className="text-[#F4F1EC]/60 mb-3">No products found.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-[#C8A45C] hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* View More CTA (if needed) */}
        {filteredProducts.length === 8 && (
          <div className="text-center mt-8">
            <p className="text-[#F4F1EC]/50 text-sm">
              Showing 8 featured products
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
