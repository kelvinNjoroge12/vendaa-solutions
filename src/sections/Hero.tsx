import { useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useCms } from '@/store/CmsContext';
import { motion } from 'framer-motion';

export default function Hero() {
  const { settings } = useCms();
  const heroImageSrc = settings.heroImage || '/hero_branded_box.jpg';
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center"
    // Removed bg-[#0B0B0D] to allow fixed background to show through, but subsequent sections have bg so it works.
    >
      {/* 1. Fixed Background Image & Overlay (Parallax Effect) */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroImageSrc}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0B0D]/50" />
      </div>

      {/* 3. Golden Mist Animation Layers (Wave Style) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {/* Wave Layer 1 - Bottom Flow */}
        <motion.div
          className="absolute bottom-[-40%] left-[-20%] w-[180%] h-[100%] opacity-[0.18]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(200,164,92,0.9) 0%, transparent 60%)',
            filter: 'blur(100px)',
            borderRadius: '40%',
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['0%', '-10%', '0%'],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Wave Layer 2 - Top/Middle Flow (Counter-movement) */}
        <motion.div
          className="absolute top-[-30%] right-[-20%] w-[160%] h-[120%] opacity-[0.15]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(200,164,92,0.7) 0%, transparent 70%)',
            filter: 'blur(120px)',
            borderRadius: '45%',
          }}
          animate={{
            x: ['10%', '-10%', '10%'],
            y: ['5%', '-5%', '5%'],
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Wave Layer 3 - Central Swell */}
        <motion.div
          className="absolute top-[20%] left-[-10%] w-[120%] h-[80%] opacity-[0.12]"
          style={{
            background: 'radial-gradient(circle, rgba(200,164,92,0.5) 0%, transparent 60%)',
            filter: 'blur(90px)',
            borderRadius: '50%',
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: ['-5%', '5%', '-5%'],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>

      {/* 4. Content */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Heading - Staggered Words */}
          <div className="mb-6 overflow-hidden">
            <h1 className="heading-display text-[#F4F1EC] uppercase leading-[0.9] tracking-tight flex flex-wrap justify-center gap-x-4 gap-y-2">
              {['Transform', 'Your', 'Brand'].map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={word === 'Brand' ? 'text-gradient-gold' : ''}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subheading */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 0.8,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut", delay: 0.6 }
              }
            }}
            className="text-lg sm:text-2xl text-[#F4F1EC] max-w-2xl mb-10 font-light"
          >
            Branded merchandise and corporate kits that people remember.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut", delay: 0.8 }
              }
            }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={scrollToCatalogue}
              className="px-8 py-4 bg-[#F4F1EC] text-[#0B0B0D] rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-2"
            >
              EXPLORE CATALOGUE
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-transparent border border-[#F4F1EC] text-[#F4F1EC] rounded-full font-bold text-sm tracking-wide hover:bg-[#F4F1EC]/10 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              REQUEST QUOTE
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#F4F1EC]/40">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#F4F1EC]/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
