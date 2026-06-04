import React from "react";

/**
 * About Page Component
 * 
 * Displays the store values, brand narrative, and focus areas (Quality, Style, Comfort, Affordability).
 * 
 * Props:
 * - setActivePage: Callback function to change pages (used to send user to collection page from CTAs)
 */
export default function About({ setActivePage }) {
  
  const handleExplore = () => {
    const element = document.getElementById("collection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActivePage("collection");
  };

  return (
    <div className="bg-white dark:bg-charcoal-700 py-8 md:py-12 font-sans transition-colors duration-300" id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimized Heading Section */}
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-widest text-gold-600 font-bold mb-1">
            Our Journey & Philosophy
          </p>
          <h2 className="text-3xl font-display font-bold text-charcoal-500 dark:text-white">
            About Our Brand
          </h2>
          <div className="h-0.5 w-12 bg-gold-400 mx-auto mt-2" />
        </div>

        {/* Minimized split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Short story and bullet principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-display font-bold text-charcoal-500 dark:text-white">
                Redefining Men's Dressing
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
                Founded to bridge the gap between premium menswear and honest pricing, <strong>Sai Trends</strong> curates clothing that makes you feel confident, composed, and comfortable. We blend classic silhouettes with contemporary detailing for garments that adapt to any occasion.
              </p>
            </div>

            {/* Principles: Bullet Points */}
            <div className="space-y-3 border-t border-charcoal-100 dark:border-charcoal-600 pt-4">
              <h4 className="text-xs uppercase tracking-wider text-gold-600 font-bold">
                Core Principles
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-400 dark:text-charcoal-300">
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold">•</span>
                  <span><strong>Quality:</strong> Pre-shrunk cotton, Belgian linen, Merino wool.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold">•</span>
                  <span><strong>Style:</strong> Minimalist aesthetics and sharp modern cuts.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold">•</span>
                  <span><strong>Comfort:</strong> Fabric stretch and breathable ventilation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold-500 font-bold">•</span>
                  <span><strong>Value:</strong> Direct-to-consumer pricing without retail markups.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Minimal landscape picture and button */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="overflow-hidden bg-charcoal-100 dark:bg-charcoal-800 rounded-sm aspect-[16/10] border border-charcoal-100 dark:border-charcoal-600 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80"
                alt="Menswear details"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <button
              onClick={handleExplore}
              className="w-full py-2.5 bg-charcoal-500 dark:bg-gold-500 text-white hover:bg-gold-500 dark:hover:bg-gold-600 font-sans text-xs uppercase tracking-wider font-bold transition-colors shadow-sm cursor-pointer"
            >
              Explore Collection
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
