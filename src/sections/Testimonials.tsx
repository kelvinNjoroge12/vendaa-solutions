import { Star } from 'lucide-react';
import { useCms } from '@/store/CmsContext';

export default function Testimonials() {
  const { testimonials } = useCms();
  return (
    <section
      id="testimonials"
      className="relative bg-[#0B0B0D] py-16 lg:py-24"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="heading-section text-[#F4F1EC] uppercase mb-3">
              Client{' '}
              <span className="text-gradient-gold">Success Stories</span>
            </h2>
            <p className="text-base sm:text-lg text-[#F4F1EC]/72 max-w-2xl mx-auto">
              Don't just take our word for it—hear from our clients.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-6 bg-[#F4F1EC]/5 rounded-2xl border border-[#F4F1EC]/10 hover:border-[#C8A45C]/30 transition-colors duration-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating ?? 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#C8A45C] text-[#C8A45C]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#F4F1EC]/80 text-sm mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div>
                  <div className="font-semibold text-[#F4F1EC]">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-[#F4F1EC]/60">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
