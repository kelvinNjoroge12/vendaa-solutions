import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MessageCircle, Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);


export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;
    const contactInfo = contactInfoRef.current;

    if (!section || !heading || !form || !contactInfo) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        form,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );

      // Contact info animation
      gsap.fromTo(
        contactInfo,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.1,
          scrollTrigger: {
            trigger: contactInfo,
            start: 'top 85%',
            end: 'top 65%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const RECIPIENT_EMAIL = 'njoroge.kelvin@strathmore.edu';
  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formspreeId?.trim()) {
        const res = await fetch(`https://formspree.io/f/${formspreeId.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            message: formData.message,
            _replyto: formData.email,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Request failed: ${res.status}`);
        }
        toast.success('Message sent successfully! We\'ll be in touch soon.');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        const subject = encodeURIComponent('Contact from Vendaa website');
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
        );
        window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
        toast.success('Your email client will open. Send the message to complete.');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send. Try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0B0B0D] z-[90] py-20 lg:py-32"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <h2 className="heading-section text-[#F4F1EC] uppercase mb-4">
            Let's Build Your <span className="text-gradient-gold">Next Kit.</span>
          </h2>
          <p className="text-lg text-[#F4F1EC]/72 max-w-xl mx-auto">
            Tell us what you're planning. We'll reply with ideas, options, and pricing.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#F4F1EC]/80 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-xl text-[#F4F1EC] placeholder:text-[#F4F1EC]/40 focus:outline-none focus:border-[#C8A45C]/50 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#F4F1EC]/80 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-xl text-[#F4F1EC] placeholder:text-[#F4F1EC]/40 focus:outline-none focus:border-[#C8A45C]/50 transition-colors"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-[#F4F1EC]/80 mb-2">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-xl text-[#F4F1EC] placeholder:text-[#F4F1EC]/40 focus:outline-none focus:border-[#C8A45C]/50 transition-colors"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#F4F1EC]/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-[#F4F1EC]/5 border border-[#F4F1EC]/10 rounded-xl text-[#F4F1EC] placeholder:text-[#F4F1EC]/40 focus:outline-none focus:border-[#C8A45C]/50 transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0B0B0D]/30 border-t-[#0B0B0D] rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div ref={contactInfoRef} className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-[#F4F1EC] mb-4">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:njoroge.kelvin@strathmore.edu"
                  className="flex items-center gap-3 text-[#F4F1EC]/70 hover:text-[#C8A45C] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EC]/5 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  njoroge.kelvin@strathmore.edu
                </a>
                <a
                  href="tel:+254703667888"
                  className="flex items-center gap-3 text-[#F4F1EC]/70 hover:text-[#C8A45C] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EC]/5 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  0703667888
                </a>
              </div>
            </div>

            <div className="p-6 bg-[#C8A45C]/10 rounded-[22px] border border-[#C8A45C]/20">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-[#C8A45C]" />
                <h4 className="font-semibold text-[#F4F1EC]">Prefer WhatsApp?</h4>
              </div>
              <p className="text-[#F4F1EC]/60 text-sm mb-4">
                Get a quick response on WhatsApp Business.
              </p>
              <a
                href="https://wa.me/254703667888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C8A45C] font-medium hover:underline"
              >
                Chat on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-8 border-t border-[#F4F1EC]/10">
              <p className="text-sm text-[#F4F1EC]/50">
                © Vendaa Solutions — Built for brands that want to be remembered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
