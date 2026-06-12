import CloudinaryImage from "./CloudinaryImage";

/**
 * ProductCard Component
 * 
 * Props:
 * - product: Object containing product details (id, name, price, originalPrice, sizes, image, tag)
 * - onSelect: Callback function to view a specific product's details page
 */
export default function ProductCard({ product, onSelect }) {

  // Format prices to standard Indian Rupees (INR) format
  const formatPrice = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Open details in a new tab (short press/click)
  const handleNormalClick = () => {
    if (onSelect) {
      onSelect(product.id);
    } else {
      window.open(`?product=${product.id}`, "_blank");
    }
  };

  return (
    <div 
      onClick={handleNormalClick}
      className="group cursor-pointer bg-white dark:bg-charcoal-800 flex flex-col h-full border border-charcoal-100 dark:border-charcoal-700/80 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:border-gold-400 dark:hover:border-gold-500 hover:shadow-[0_8px_30px_rgba(184,134,11,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 ease-out relative"
    >
      {/* Product Tag Badge */}
      {product.tag && (
        <span className="absolute top-3 left-3 z-10 bg-charcoal-600/90 dark:bg-charcoal-900/90 text-white text-[8px] uppercase tracking-widest font-bold py-1 px-2.5 rounded-full border border-gold-400/30 backdrop-blur-sm shadow-sm">
          {product.tag}
        </span>
      )}

      {/* Product Image Wrapper */}
      <div className="aspect-[3/4] w-full overflow-hidden bg-charcoal-100 dark:bg-charcoal-900 relative">
        <CloudinaryImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          width={400}
          height={533}
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex-grow flex flex-col justify-between">
        <div className="space-y-0.5">
          <p className="text-[9px] uppercase tracking-widest text-gold-600 font-bold">
            {product.category}
          </p>
          <h3 className="text-xs sm:text-sm font-sans font-medium text-charcoal-500 dark:text-charcoal-200 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        <div className="mt-2.5 pt-2 border-t border-charcoal-50/80 dark:border-charcoal-700/80">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-sm sm:text-base font-sans font-bold text-charcoal-500 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-charcoal-300 dark:text-charcoal-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex flex-wrap gap-0.5">
              {product.sizes.map((size) => (
                <span 
                  key={size}
                  className="text-[8px] font-semibold border border-charcoal-100 dark:border-charcoal-700 text-charcoal-400 dark:text-charcoal-300 bg-charcoal-50/50 dark:bg-charcoal-800/40 py-0.5 px-1 rounded-sm"
                >
                  {size}
                </span>
              ))}
            </div>
            <span className="text-xs text-charcoal-300 dark:text-charcoal-500 group-hover:text-gold-500 dark:group-hover:text-gold-400 group-hover:translate-x-1 transition-all duration-300">
              ➔
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
