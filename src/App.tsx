import { useState, useEffect } from 'react';
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

  const handleRequestQuote = () => {
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
        <Contact />
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
