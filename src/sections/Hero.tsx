import { useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Single entrance animation on mount - completes instantly
    const content = contentRef.current;
    if (!content) return;

    const elements = content.querySelectorAll('.animate-in');
    
    // Use CSS animation classes instead of GSAP for better performance
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-visible');
      }, index * 50); // Stagger 50ms
    });
  }, []);

  const scrollToCatalogue = () => {
    const catalogueSection = document.getElementById('catalogue');
    if (catalogueSection) {
      catalogueSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative bg-[#0B0B0D] min-h-[75vh] flex items-center justify-center overflow-hidden"
    >
      {/* Content Container */}
      <div 
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 py-20 max-w-6xl mx-auto"
      >
        {/* Headline */}
        <div className="mb-6 animate-in">
          <h1 className="heading-display text-[#F4F1EC] uppercase leading-tight">
            Transform Your{' '}
            <span className="text-gradient-gold">Brand</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-[#F4F1EC]/72 max-w-xl mb-8 animate-in">
          Branded merchandise and corporate kits that people remember.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-in">
          <button 
            onClick={scrollToCatalogue} 
            className="btn-primary flex items-center justify-center gap-2"
          >
            Explore the Catalogue
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollToContact} 
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Request a Quote
          </button>
        </div>

        {/* Product Card Preview */}
        <div className="w-full max-w-2xl animate-in">
          <div className="card-luxury relative overflow-hidden aspect-[16/10]">
            <img
              src="/hero_branded_box.jpg"
              alt="Premium branded merchandise"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/60 via-transparent to-transparent" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 animate-in">
          <div className="flex flex-col items-center gap-2 opacity-60">
            <span className="text-micro text-[#F4F1EC]/50">Scroll to Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#C8A45C] to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Background gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C8A45C]/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
