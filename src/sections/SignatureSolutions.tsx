import { ArrowRight, Shirt, Package, Calendar, FileText } from 'lucide-react';

const services = [
  { icon: Shirt, label: 'Branded Merchandise' },
  { icon: Package, label: 'Corporate Kits' },
  { icon: Calendar, label: 'Event Activations' },
  { icon: FileText, label: 'Packaging & Inserts' },
];

export default function SignatureSolutions() {
  const scrollToCatalogue = () => {
    const catalogueSection = document.getElementById('catalogue');
    if (catalogueSection) {
      catalogueSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="solutions"
      className="relative bg-[#0B0B0D] py-16 lg:py-24"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div>
            {/* Headline */}
            <div className="mb-8">
              <h2 className="heading-section text-[#F4F1EC] uppercase leading-none">
                Signature{' '}
                <span className="text-gradient-gold">Solutions</span>
              </h2>
              <p className="text-base sm:text-lg text-[#F4F1EC]/72 mt-4 max-w-md">
                Merchandise, kits, and campaigns—designed to earn attention.
              </p>
            </div>

            {/* Services List */}
            <div className="space-y-3.5 mb-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-[#F4F1EC]/80 hover:text-[#C8A45C] transition-colors duration-200 cursor-pointer group"
                >
                  <service.icon className="w-5 h-5 text-[#C8A45C] group-hover:scale-110 transition-transform duration-200" strokeWidth={2} />
                  <span className="text-sm sm:text-base font-medium">{service.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={scrollToCatalogue}
              className="flex items-center gap-2 text-[#C8A45C] font-semibold hover:gap-3 transition-all duration-200"
            >
              See the full catalogue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Image Card */}
          <div className="relative">
            <div className="card-luxury relative overflow-hidden aspect-[4/3]">
              <img
                src="/solutions_caps.jpg"
                alt="Branded merchandise collection"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0B0B0D]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
