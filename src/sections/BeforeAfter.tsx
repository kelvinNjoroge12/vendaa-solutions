import { ArrowRight } from 'lucide-react';
import { useCms } from '@/store/CmsContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function BeforeAfter() {
  const { caseStudies } = useCms();
  const sectionRef = useScrollReveal<HTMLDivElement>([caseStudies]);

  return (
    <section
      id="work"
      className="relative bg-[#0B0B0D] py-16 lg:py-24"
    >
      <div ref={sectionRef} className="px-4 sm:px-8 lg:px-[8vw]">
        {/* Heading */}
        <div className="mb-12 max-w-7xl mx-auto">
          <h2 className="heading-section text-[#F4F1EC] uppercase mb-3">
            Before &<span className="text-gradient-gold"> After</span>
          </h2>
          <p className="text-base sm:text-lg text-[#F4F1EC]/72 max-w-xl">
            See the transformation our branded solutions deliver.
          </p>
        </div>

        {/* Comparisons */}
        <div className="space-y-12 lg:space-y-16 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="scroll-reveal comparison-row"
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                {/* Before Card */}
                <div className="before-card group">
                  <div className="card-luxury relative overflow-hidden aspect-[4/3] bg-[#F4F1EC]/5">
                    <img
                      src={study.beforeImage}
                      alt={`${study.title} - Before`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#0B0B0D]/80 backdrop-blur-sm rounded-full">
                      <span className="text-micro text-[#F4F1EC]">Before</span>
                    </div>
                  </div>
                </div>

                {/* Arrow Icon (Desktop) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 arrow-icon z-10">
                  <div className="w-12 h-12 rounded-full bg-[#C8A45C] flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-[#0B0B0D]" />
                  </div>
                </div>

                {/* After Card */}
                <div className="after-card group">
                  <div className="card-luxury relative overflow-hidden aspect-[4/3] bg-[#F4F1EC]/5">
                    <img
                      src={study.afterImage}
                      alt={`${study.title} - After`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#C8A45C] backdrop-blur-sm rounded-full">
                      <span className="text-micro text-[#0B0B0D]">After</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 text-center">
                <h3 className="text-lg font-bold text-[#F4F1EC] mb-2">
                  {study.title}
                </h3>
                <p className="text-sm text-[#F4F1EC]/60">
                  {study.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
