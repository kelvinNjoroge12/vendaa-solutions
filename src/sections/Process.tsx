import { Search, Palette, Truck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover & Design',
    description: 'We learn your goals and create custom mockups.',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Produce',
    description: 'We source, print, and quality-check every unit.',
  },
  {
    number: '03',
    icon: Truck,
    title: 'Deliver',
    description: 'We ship on time—ready to impress.',
  },
];

export default function Process() {
  const containerRef = useScrollReveal();

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-[#0B0B0D] py-16 lg:py-24"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        {/* Heading */}
        <div className="mb-12 scroll-reveal">
          <h2 className="heading-section text-[#F4F1EC] uppercase mb-3">
            How We <span className="text-gradient-gold">Work</span>
          </h2>
          <p className="text-base sm:text-lg text-[#F4F1EC]/72 max-w-xl">
            A simple process. A remarkable result.
          </p>
        </div>

        {/* Steps - Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto scroll-reveal delay-100">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group"
            >
              <div className="relative p-6 bg-[#F4F1EC]/5 rounded-2xl border border-[#F4F1EC]/10 hover:border-[#C8A45C]/30 transition-colors duration-200 h-full">
                {/* Number */}
                <span className="text-micro text-[#C8A45C] mb-3 block">
                  Step {step.number}
                </span>

                {/* Icon */}
                <div className="w-11 h-11 rounded-full bg-[#C8A45C]/10 flex items-center justify-center mb-3 group-hover:bg-[#C8A45C]/20 transition-colors duration-200">
                  <step.icon className="w-5 h-5 text-[#C8A45C]" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#F4F1EC] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-[#F4F1EC]/60">
                  {step.description}
                </p>

                {/* Connector Arrow (not on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 text-[#F4F1EC]/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
