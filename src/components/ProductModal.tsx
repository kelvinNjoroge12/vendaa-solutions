import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { useCms } from '@/store/CmsContext';
import type { Product } from '@/types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: () => void;
}

export default function ProductModal({ product, isOpen, onClose, onRequestQuote }: ProductModalProps) {
  const { formatPrice } = useCms();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    const content = contentRef.current;

    if (!modal || !content) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Animate in
      gsap.fromTo(
        modal,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        content,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    const modal = modalRef.current;
    const content = contentRef.current;

    if (!modal || !content) return;

    gsap.to(content, {
      y: 30,
      opacity: 0,
      scale: 0.98,
      duration: 0.25,
      ease: 'power2.in',
    });

    gsap.to(modal, {
      opacity: 0,
      duration: 0.2,
      delay: 0.1,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  if (!isOpen || !product) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B0B0D]/90 backdrop-blur-sm opacity-0"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0B0B0D] rounded-[22px] border border-[#F4F1EC]/10 shadow-2xl opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#F4F1EC]/10 flex items-center justify-center text-[#F4F1EC] hover:bg-[#F4F1EC]/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-square lg:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/60 via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8">
            <span className="text-micro text-[#C8A45C] mb-2 block">
              {product.category}
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#F4F1EC] mb-4">
              {product.name}
            </h2>
            <p className="text-[#F4F1EC]/72 mb-6">
              {product.description}
            </p>

            {/* Branding Options */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#F4F1EC] mb-3 uppercase tracking-wide">
                Branding Options
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.brandingOptions.map((option, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#F4F1EC]/10 text-[#F4F1EC]/80 text-sm rounded-full"
                  >
                    <Check className="w-3.5 h-3.5 text-[#C8A45C]" />
                    {option}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-[#F4F1EC] mb-3 uppercase tracking-wide">
                Pricing
              </h3>
              <div className="space-y-2">
                {product.pricingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#F4F1EC]/5 rounded-xl"
                  >
                    <div>
                      <span className="text-[#F4F1EC] font-medium">{tier.name}</span>
                      <span className="text-[#F4F1EC]/50 text-sm ml-2">({tier.quantity})</span>
                    </div>
                    <span className="text-[#C8A45C] font-bold">{formatPrice(tier.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  handleClose();
                  setTimeout(onRequestQuote, 300);
                }}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Request Quote
              </button>
              <button
                onClick={handleClose}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                Continue Browsing
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
