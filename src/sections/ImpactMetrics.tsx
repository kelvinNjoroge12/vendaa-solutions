import { Shield, Clock, Award, RefreshCw } from 'lucide-react';

const metrics = [
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Every product meets our rigorous standards',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We hit deadlines—every time',
  },
  {
    icon: Award,
    title: 'Premium Materials',
    description: 'Sourced from trusted suppliers globally',
  },
  {
    icon: RefreshCw,
    title: 'Sustainable Practices',
    description: 'Eco-conscious sourcing and production',
  },
];

export default function ImpactMetrics() {
  return (
    <section
      id="impact"
      className="relative bg-[#0B0B0D] py-16 lg:py-20"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#F4F1EC] uppercase mb-3">
              Why Choose{' '}
              <span className="text-gradient-gold">Vendaa</span>
            </h2>
            <p className="text-base sm:text-lg text-[#F4F1EC]/72 max-w-2xl mx-auto">
              We don't just deliver products—we deliver results that matter.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="p-6 bg-[#F4F1EC]/5 rounded-2xl border border-[#F4F1EC]/10 hover:border-[#C8A45C]/30 transition-colors duration-200 group"
              >
                <div className="w-11 h-11 rounded-full bg-[#C8A45C]/10 flex items-center justify-center mb-4 group-hover:bg-[#C8A45C]/20 transition-colors duration-200">
                  <metric.icon className="w-5 h-5 text-[#C8A45C]" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-[#F4F1EC] mb-2">
                  {metric.title}
                </h3>
                <p className="text-sm text-[#F4F1EC]/60">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
