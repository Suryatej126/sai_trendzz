import React from "react";
import ProductCard from "../components/ProductCard";
import CloudinaryImage from "../components/CloudinaryImage";
import logoImg from "../assets/image.png";

/**
 * Home Page Component
 * 
 * Props:
 * - products: Dynamic list of products passed from App state
 * - setActivePage: Callback function to switch active tab page
 * - onSelectProduct: Callback function to view a specific product details
 * - onQuickView: Callback function to open Quick View modal
 */
export default function Home({ products, setActivePage, onSelectProduct, lookbook, onQuickView }) {
  
  // Filter products to only display the featured ones (featured: true)
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  // Scroll smoothly down to the collection section
  const handleShopNow = () => {
    setActivePage("collection");
  };

  return (
    <div className="bg-white dark:bg-charcoal-700 transition-colors duration-300">
      
      {/* 1. Hero Section - Premium brand logo backdrop with elegant light/dark gradients */}
      <section className="relative h-[45vh] min-h-[300px] md:h-[75vh] md:min-h-[500px] flex items-center justify-center bg-white dark:bg-charcoal-700 transition-colors duration-500 overflow-hidden">
        {/* Elegant Background with a light/dark gradient and glowing brand logo emblem */}
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-gold-50 via-white to-gold-100/40 dark:from-charcoal-800 dark:via-charcoal-700 dark:to-charcoal-900 transition-colors duration-500">
          {/* Ambient Glow behind the logo */}
          <div className="absolute w-[280px] h-[280px] md:w-[480px] md:h-[480px] bg-gold-400/20 dark:bg-gold-500/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse pointer-events-none" />
          
          {/* Large styled background logo badge with soft glow and pulse animation */}
          <div className="absolute w-[220px] h-[220px] md:w-[380px] md:h-[380px] rounded-full bg-white/40 dark:bg-charcoal-800/30 border border-gold-400/20 dark:border-gold-400/10 p-4 shadow-[0_0_50px_rgba(184,134,11,0.1)] dark:shadow-[0_0_60px_rgba(184,134,11,0.05)] opacity-[0.15] dark:opacity-[0.1] pointer-events-none select-none animate-[pulse_6s_ease-in-out_infinite] flex items-center justify-center">
            <img
              src={logoImg}
              alt=""
              className="w-full h-full object-contain filter grayscale dark:invert rounded-full mix-blend-multiply dark:mix-blend-screen"
            />
          </div>
        </div>

        {/* Hero Content Text Box */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-gold-600 dark:text-gold-300 font-bold">
            Elevate Your Style
          </p>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-widest text-charcoal-500 dark:text-white drop-shadow-sm">
            SAI TRENDS
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl font-light italic text-gold-800 dark:text-gold-100/90 font-display">
            Made for Modern Men
          </p>
          
          <p className="text-sm sm:text-base text-charcoal-400 dark:text-charcoal-100 max-w-lg mx-auto font-light leading-relaxed">
            Discover a curated collection of premium men's clothing designed for style, ultimate comfort, and unmatched quality.
          </p>

          <div className="pt-4">
            <button
              onClick={handleShopNow}
              className="px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs sm:text-sm uppercase tracking-wider font-bold shadow-lg hover:shadow-gold-500/20 transition-all duration-300 transform hover:-translate-y-0.5 rounded-sm"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </section>

      {/* 2. Featured Collection Section */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <p className="text-xs uppercase tracking-widest text-gold-600 font-bold">
            Curated Styles
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-500 dark:text-white">
            Featured Collection
          </h2>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-3" />
          <p className="text-sm text-charcoal-400 dark:text-charcoal-300 mt-2">
            Handpicked signature designs that represent the best of premium modern tailoring.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onSelect={onSelectProduct} 
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleShopNow}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-charcoal-500 dark:text-charcoal-200 hover:text-gold-500 dark:hover:text-gold-400 border-b-2 border-charcoal-500 dark:border-charcoal-400 hover:border-gold-500 dark:hover:border-gold-400 pb-1 transition-colors cursor-pointer"
          >
            <span>View All Products</span>
            <span>➔</span>
          </button>
        </div>
      </section>

      {/* 3. Value Proposition / Brand Benefits Section */}
      <section className="py-12 md:py-16 bg-charcoal-50 dark:bg-charcoal-800/40 border-y border-charcoal-100 dark:border-charcoal-600 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <p className="text-xs uppercase tracking-widest text-gold-600 font-bold">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-display font-bold text-charcoal-500 dark:text-white">
              The Sai Trends Promise
            </h2>
            <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Benefit 1: Quality */}
            <div className="bg-white dark:bg-charcoal-700 p-5 border border-charcoal-100 dark:border-charcoal-600 rounded-sm hover:border-gold-300 dark:hover:border-gold-400 transition-colors shadow-sm group">
              <div className="text-2xl text-gold-500 mb-2.5 group-hover:scale-110 transition-transform duration-300">👔</div>
              <h3 className="text-sm sm:text-base font-display font-bold text-charcoal-500 dark:text-white mb-1.5">Premium Quality</h3>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
                We select only the finest fabrics (Belgian linens, Merino wool, Combed cotton) to construct clothes that look and feel luxurious.
              </p>
            </div>

            {/* Benefit 2: Style */}
            <div className="bg-white dark:bg-charcoal-700 p-5 border border-charcoal-100 dark:border-charcoal-600 rounded-sm hover:border-gold-300 dark:hover:border-gold-400 transition-colors shadow-sm group">
              <div className="text-2xl text-gold-500 mb-2.5 group-hover:scale-110 transition-transform duration-300">✨</div>
              <h3 className="text-sm sm:text-base font-display font-bold text-charcoal-500 dark:text-white mb-1.5">Modern Style</h3>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
                Timeless wardrobe patterns reinvented with fresh, clean cuts, subtle highlights, and sharp modern silhouettes.
              </p>
            </div>

            {/* Benefit 3: Comfort */}
            <div className="bg-white dark:bg-charcoal-700 p-5 border border-charcoal-100 dark:border-charcoal-600 rounded-sm hover:border-gold-300 dark:hover:border-gold-400 transition-colors shadow-sm group">
              <div className="text-2xl text-gold-500 mb-2.5 group-hover:scale-110 transition-transform duration-300">☁️</div>
              <h3 className="text-sm sm:text-base font-display font-bold text-charcoal-500 dark:text-white mb-1.5">Maximum Comfort</h3>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
                Engineered with stretch fabrics and relaxed cuts so you can move naturally throughout the day, in absolute comfort.
              </p>
            </div>

            {/* Benefit 4: Price */}
            <div className="bg-white dark:bg-charcoal-700 p-5 border border-charcoal-100 dark:border-charcoal-600 rounded-sm hover:border-gold-300 dark:hover:border-gold-400 transition-colors shadow-sm group">
              <div className="text-2xl text-gold-500 mb-2.5 group-hover:scale-110 transition-transform duration-300">🏷️</div>
              <h3 className="text-sm sm:text-base font-display font-bold text-charcoal-500 dark:text-white mb-1.5">Affordability</h3>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
                By bypassing standard retail markups, we deliver luxury level fashion directly to you at sensible, honest prices.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Elegant Lookbook / Callout Section */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-charcoal-700 transition-colors duration-300">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-widest text-gold-600 font-bold">
            Season Lookbook
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-charcoal-500 dark:text-white leading-tight">
            {lookbook.heading}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
            {lookbook.description}
          </p>
          <div className="pt-2">
            <button
              onClick={handleShopNow}
              className="px-6 py-3 bg-charcoal-500 dark:bg-gold-500 text-white text-xs uppercase tracking-wider font-bold hover:bg-gold-500 dark:hover:bg-gold-600 transition-colors cursor-pointer"
            >
              Explore Styles
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-hidden bg-charcoal-100 dark:bg-charcoal-800 aspect-[3/4] rounded-sm shadow-md border border-charcoal-100 dark:border-charcoal-600">
            <CloudinaryImage
              src={lookbook.image1}
              alt="Premium blazer details"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              width={400}
              height={533}
            />
          </div>
          <div className="overflow-hidden bg-charcoal-100 dark:bg-charcoal-800 aspect-[3/4] rounded-sm shadow-md mt-8 border border-charcoal-100 dark:border-charcoal-600">
            <CloudinaryImage
              src={lookbook.image2}
              alt="Premium shirts collection"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              width={400}
              height={533}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
