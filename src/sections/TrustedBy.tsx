import { Building2, Users, Trophy, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const stats = [
  { icon: Building2, value: '500+', label: 'Companies Served' },
  { icon: Users, value: '50K+', label: 'Items Delivered' },
  { icon: Trophy, value: '95%', label: 'Client Satisfaction' },
  { icon: TrendingUp, value: '3x', label: 'Repeat Business' },
];

export default function TrustedBy() {
  const containerRef = useScrollReveal();

  return (
    <section
      id="trusted"
      ref={containerRef}
      className="relative bg-[#0B0B0D] py-16 lg:py-20"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="heading-section text-[#F4F1EC] uppercase mb-3">
              Trusted By{' '}
              <span className="text-gradient-gold">Industry Leaders</span>
            </h2>
            <p className="text-base sm:text-lg text-[#F4F1EC]/72 max-w-2xl mx-auto">
              From startups to enterprises, we deliver merchandise that makes an impact.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 scroll-reveal delay-100">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-[#F4F1EC]/5 rounded-2xl border border-[#F4F1EC]/10 hover:border-[#C8A45C]/30 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-[#C8A45C]/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-[#C8A45C]" strokeWidth={2} />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-[#F4F1EC] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#F4F1EC]/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
