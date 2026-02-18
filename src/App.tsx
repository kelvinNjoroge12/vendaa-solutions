import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner';
import Navigation from '@/components/Navigation';
import ProductModal from '@/components/ProductModal';
import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';
import Hero from '@/sections/Hero';
import SignatureSolutions from '@/sections/SignatureSolutions';
import ProductCatalogue from '@/sections/ProductCatalogue';
import BeforeAfter from '@/sections/BeforeAfter';
import Process from '@/sections/Process';
import TrustedBy from '@/sections/TrustedBy';
import ImpactMetrics from '@/sections/ImpactMetrics';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import type { Product } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [quoteRequest, setQuoteRequest] = useState<{ id: number; message: string } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname === '/admin') setShowAdmin(true);
  }, []);

  useEffect(() => {
    if (!showAdmin || !isSupabaseConfigured || !supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsAdmin(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(Boolean(session));
    });
    return () => subscription.unsubscribe();
  }, [showAdmin]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleRequestQuote = (product?: Product) => {
    if (product) {
      setQuoteRequest({
        id: Date.now(),
        message: `Hello, I would like a quote for ${product.name}.\n\nCould you please provide pricing for:\n- Quantity: [Enter Quantity]\n- Branding: [Describe Branding Needs]\n\nThank you!`
      });
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAdminLogout = async () => {
    if (isSupabaseConfigured && supabase) await supabase.auth.signOut();
    setIsAdmin(false);
    window.location.href = '/';
  };

  // Admin Route
  if (showAdmin) {
    if (!isAdmin) {
      return (
        <>
          <Toaster position="top-center" richColors />
          <AdminLogin onLogin={handleAdminLogin} />
        </>
      );
    }
    return (
      <>
        <Toaster position="top-center" richColors />
        <AdminDashboard onLogout={handleAdminLogout} />
      </>
    );
  }

  // Main Website
  return (
    <>
      <Toaster position="top-center" richColors />

      {/* Grain Overlay - optimized with will-change removed */}
      <div className="grain-overlay" />

      <Helmet>
        <title>Vendaa Solutions | Premium Corporate Gifting &amp; Branded Merchandise Kenya</title>
        <meta
          name="description"
          content="Vendaa Solutions — Kenya's leading branded merchandise and corporate gifting company. Custom water bottles, luxury tote bags, premium apparel, promotional products, executive notebooks, event kits, and affordable branded items for businesses of all sizes."
        />
        <meta
          name="keywords"
          content="branded merchandise, corporate gifts, promotional products, custom branding, luxury gifts, premium merchandise, cheap promotional items, affordable branded products, expensive corporate gifts, branded water bottles, custom tote bags, branded apparel, custom t-shirts, event kits, welcome kits, onboarding kits, corporate gifting Kenya, promotional items Nairobi, branded notebooks, executive gifts, branded drinkware, custom tumblers, stainless steel bottles, branded backpacks, tech gifts, branded packaging, corporate swag, company merchandise, bulk promotional products, branded giveaways, trade show merchandise, conference merchandise, brand activation, brand visibility"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vendaa Solutions" />
        <meta property="og:title" content="Vendaa Solutions | Premium Corporate Gifting &amp; Branded Merchandise" />
        <meta
          property="og:description"
          content="Transform your brand with custom merchandise, luxury corporate gifts, promotional products, and curated event kits. Water bottles, tote bags, apparel, notebooks &amp; more."
        />
        <meta property="og:url" content="https://vendaa.com" />
        <meta property="og:image" content="https://vendaa.com/hero_branded_box.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_KE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vendaa Solutions | Premium Branded Merchandise" />
        <meta name="twitter:description" content="Custom branded merchandise, corporate gifts &amp; promotional products. Water bottles, tote bags, apparel, event kits &amp; more." />
        <meta name="twitter:image" content="https://vendaa.com/hero_branded_box.jpg" />
        <link rel="canonical" href="https://vendaa.com" />
      </Helmet>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <SignatureSolutions />
        <ProductCatalogue onProductClick={handleProductClick} />
        <BeforeAfter />
        <Process />
        <TrustedBy />
        <ImpactMetrics />
        <Testimonials />
        <Contact quoteRequest={quoteRequest} />
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
        onRequestQuote={handleRequestQuote}
      />

      {/* Admin Link (hidden in footer) */}
      <a
        href="/admin"
        className="fixed bottom-4 right-4 text-[#F4F1EC]/20 hover:text-[#C8A45C] text-xs transition-colors z-50"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = '/admin';
        }}
      >
        Admin
      </a>
    </>
  );
}

export default App;
