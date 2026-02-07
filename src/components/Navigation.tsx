import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Catalogue', href: '#catalogue' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation - Fixed height, no layout shift */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-16 flex items-center transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0D]/95 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="px-4 sm:px-8 lg:px-[8vw] w-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="text-lg font-bold text-[#F4F1EC] hover:text-[#C8A45C] transition-colors duration-200"
          >
            Vendaa Solutions
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-[#F4F1EC]/10 flex items-center justify-center text-[#F4F1EC] hover:bg-[#F4F1EC]/20 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#0B0B0D] md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-2xl font-bold text-[#F4F1EC] hover:text-[#C8A45C] transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary mt-4"
            >
              Request a Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}
