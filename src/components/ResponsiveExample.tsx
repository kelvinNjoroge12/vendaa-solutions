import React from 'react';

/**
 * Sample Responsive Card Component
 * 
 * This component demonstrates mobile-first responsive design with Tailwind CSS:
 * - Mobile (default): Single column, smaller text
 * - Tablet (md): Two columns
 * - Desktop (lg): Three columns, larger text
 */

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-start p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-gray-900">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

/**
 * Responsive Grid Container
 * 
 * Grid layout that adapts to screen size:
 * - Mobile: 1 column
 * - Tablet (md: 768px): 2 columns
 * - Desktop (lg: 1024px): 3 columns
 */
export const ResponsiveExample: React.FC = () => {
  const features = [
    {
      icon: "🎨",
      title: "Custom Design",
      description: "Tailored solutions that match your brand identity perfectly with premium materials."
    },
    {
      icon: "📦",
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising on quality or attention to detail."
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description: "Only the finest materials and craftsmanship for your corporate gifting needs."
    },
    {
      icon: "🌍",
      title: "Sustainable",
      description: "Eco-friendly options that align with your company's sustainability goals."
    },
    {
      icon: "🤝",
      title: "Dedicated Support",
      description: "Personal account managers to guide you through every step of the process."
    },
    {
      icon: "✨",
      title: "Innovative",
      description: "Stay ahead with cutting-edge designs and the latest corporate gifting trends."
    }
  ];

  return (
    <section className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-gray-50">
      {/* Container with max-width for readability */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Responsive text sizes */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
            Why Choose Vendaa Solutions?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Experience excellence in corporate gifting with our comprehensive solutions
          </p>
        </div>

        {/* Responsive Grid
            - grid-cols-1: Mobile (default) - 1 column
            - md:grid-cols-2: Tablet (768px+) - 2 columns
            - lg:grid-cols-3: Desktop (1024px+) - 3 columns
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Call to Action - Responsive button */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveExample;
