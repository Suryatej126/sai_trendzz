import React, { useState, useEffect } from "react";
import CloudinaryImage from "../components/CloudinaryImage";

/**
 * ProductDetails Page Component
 * 
 * Props:
 * - productId: The ID of the currently selected product
 * - products: Dynamic list of products passed from App state
 * - setActivePage: Function to change the active page
 * - setSelectedProductId: Function to set/clear active product ID
 */
export default function ProductDetails({ productId, products, setActivePage, setSelectedProductId }) {
  // Find the specific product matching the ID passed
  const product = products.find((item) => item.id === Number(productId));

  // State to track the size selected by the user (defaults to the first available size)
  const [selectedSize, setSelectedSize] = useState("");
  // State to track active gallery image
  const [activeImg, setActiveImg] = useState("");

  // Set the default size and image when the product changes
  useEffect(() => {
    if (product) {
      setActiveImg(product.image);
      if (product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  // If product is not found, display a friendly error message
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-display font-bold text-charcoal-500 mb-4">Product Not Found</h2>
        <p className="text-sm text-charcoal-400 mb-6">The product you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => {
            setSelectedProductId(null);
            setActivePage("collection");
          }}
          className="px-5 py-2.5 bg-charcoal-500 text-white text-xs uppercase tracking-wider font-bold hover:bg-gold-500 transition-colors"
        >
          Back to Collection
        </button>
      </div>
    );
  }

  // Format Indian Rupees currency
  const formatPrice = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Calculate discount percentage
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Generate WhatsApp Order Link with a pre-filled custom message
  const handleWhatsAppOrder = () => {
    const phoneNumber = "919346305355"; // Replace with store's actual WhatsApp business number

    // Constructing a structured text message
    const message = `Hello Sai Trends! I would like to order:
*Product Name:* ${product.name}
*Size:* ${selectedSize}
*Price:* ${formatPrice(product.price)}

Please confirm availability and dispatch timeline. Thank you!`;

    // Encode text to safe URL characters
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, "_blank");
  };

  // Navigate back to the collection page
  const handleBack = () => {
    if (window.history.state && window.history.state.productId !== null && !window.history.state.deepLinked) {
      window.history.back();
    } else {
      setSelectedProductId(null);
      setActivePage("collection");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white dark:bg-charcoal-700 py-12 md:py-20 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
        {/* Back navigation button */}
        <button
          onClick={handleBack}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-charcoal-400 dark:text-charcoal-300 hover:text-gold-500 dark:hover:text-gold-400 mb-8 transition-colors group cursor-pointer"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to Collection</span>
        </button>
 
        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
 
          {/* Left Column: Product Image Gallery */}
          <div className="flex flex-col space-y-4 max-w-lg mx-auto lg:mx-0 w-full">
            <div className="bg-charcoal-50 dark:bg-charcoal-800 border border-charcoal-100 dark:border-charcoal-600 rounded-sm overflow-hidden aspect-[3/4] w-full relative shadow-sm">
              <CloudinaryImage
                src={activeImg || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                width={600}
                height={800}
              />
              {product.tag && (
                <span className="absolute top-4 left-4 bg-charcoal-500 text-white text-[10px] uppercase tracking-wider font-semibold py-1.5 px-4 border border-gold-300/30 shadow-md">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {(product.image2 || product.image3) && (
              <div className="flex gap-2.5 justify-center lg:justify-start overflow-x-auto py-1">
                {/* Thumbnail 1 */}
                <button
                  onClick={() => setActiveImg(product.image)}
                  className={`w-16 h-20 bg-charcoal-100 dark:bg-charcoal-800 border rounded-sm overflow-hidden transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    activeImg === product.image || !activeImg
                      ? "border-gold-500 ring-1 ring-gold-500 scale-105"
                      : "border-charcoal-100 dark:border-charcoal-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <CloudinaryImage src={product.image} alt="Main view" className="w-full h-full object-cover object-center" width={80} height={100} />
                </button>

                {/* Thumbnail 2 */}
                {product.image2 && (
                  <button
                    onClick={() => setActiveImg(product.image2)}
                    className={`w-16 h-20 bg-charcoal-100 dark:bg-charcoal-800 border rounded-sm overflow-hidden transition-all duration-200 cursor-pointer flex-shrink-0 ${
                      activeImg === product.image2
                        ? "border-gold-500 ring-1 ring-gold-500 scale-105"
                        : "border-charcoal-100 dark:border-charcoal-600 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <CloudinaryImage src={product.image2} alt="Additional view 2" className="w-full h-full object-cover object-center" width={80} height={100} />
                  </button>
                )}

                {/* Thumbnail 3 */}
                {product.image3 && (
                  <button
                    onClick={() => setActiveImg(product.image3)}
                    className={`w-16 h-20 bg-charcoal-100 dark:bg-charcoal-800 border rounded-sm overflow-hidden transition-all duration-200 cursor-pointer flex-shrink-0 ${
                      activeImg === product.image3
                        ? "border-gold-500 ring-1 ring-gold-500 scale-105"
                        : "border-charcoal-100 dark:border-charcoal-600 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <CloudinaryImage src={product.image3} alt="Additional view 3" className="w-full h-full object-cover object-center" width={80} height={100} />
                  </button>
                )}
              </div>
            )}
          </div>
 
          {/* Right Column: Product Info & Order Panel */}
          <div className="flex flex-col justify-between space-y-8">
 
            {/* Core Info */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-950/20 py-1 px-3 border border-gold-100 dark:border-gold-900/50 rounded-sm">
                {product.category}
              </span>
 
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-500 dark:text-white leading-tight">
                {product.name}
              </h1>
 
              {/* Price display with discount percentage tag */}
              <div className="flex items-center space-x-4 pt-2">
                <span className="text-3xl font-bold text-charcoal-500 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-charcoal-300 dark:text-charcoal-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-gold-100 dark:bg-gold-950/20 border border-gold-300/20 dark:border-gold-900/20 text-gold-700 dark:text-gold-300 text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
            </div>
 
            {/* Description */}
            <div className="border-t border-charcoal-100 dark:border-charcoal-600 pt-6 space-y-2">
              <h3 className="text-xs uppercase tracking-widest text-charcoal-400 dark:text-charcoal-300 font-bold">
                Product Description
              </h3>
              <p className="text-sm text-charcoal-400 dark:text-charcoal-300 leading-relaxed">
                {product.description}
              </p>
            </div>
 
            {/* Sizes Selection Selector */}
            <div className="border-t border-charcoal-100 dark:border-charcoal-600 pt-6 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs uppercase tracking-widest text-charcoal-400 dark:text-charcoal-300 font-bold">
                  Select Size
                </h3>
                <span className="text-[11px] text-gold-600 dark:text-gold-400 font-semibold underline cursor-pointer">
                  Size Guide
                </span>
              </div>
 
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 min-w-10 px-3 flex items-center justify-center border font-sans text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? "bg-charcoal-500 dark:bg-gold-500 border-charcoal-500 dark:border-gold-500 text-white shadow-sm font-bold scale-105"
                        : "bg-white dark:bg-charcoal-600 border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-charcoal-200 hover:border-gold-500 hover:text-gold-500 dark:hover:border-gold-400 dark:hover:text-gold-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
 
            {/* CTA Order Area */}
            <div className="border-t border-charcoal-100 dark:border-charcoal-600 pt-6 space-y-4">
 
              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center space-x-3 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans text-sm uppercase tracking-wider font-bold rounded-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                {/* Embedded WhatsApp Logo */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.66.986 3.296 1.489 4.887 1.491 5.378 0 9.751-4.358 9.754-9.71.002-2.593-1.002-5.031-2.83-6.861-1.829-1.83-4.27-2.834-6.86-2.835-5.383 0-9.757 4.359-9.76 9.712-.002 1.701.462 3.364 1.34 4.801l-.994 3.63 3.737-.98c1.472.88 3.102 1.35 4.666 1.352zm9.183-5.606c-.25-.124-1.477-.727-1.705-.81-.228-.083-.393-.124-.558.124-.166.248-.641.81-.786.973-.145.166-.29.186-.54.062-.25-.124-1.055-.389-2.01-1.243-.743-.663-1.245-1.48-1.39-1.729-.145-.248-.015-.383.11-.507.112-.111.25-.29.375-.436.125-.145.166-.248.25-.415.083-.166.042-.311-.02-.436-.063-.124-.558-1.346-.764-1.845-.2-.486-.403-.42-.558-.428-.145-.008-.31-.01-.476-.01t-.435.062c-.166.062-.634.248-.865.727-.232.48-.887 1.701-.887 4.148 0 2.448 1.78 4.811 2.028 5.142.249.331 3.507 5.355 8.497 7.505 1.187.512 2.115.817 2.839 1.047 1.192.378 2.277.325 3.134.197.954-.141 2.94-.1.177 3.072-.942.228-.962.393-.974.726-.012.333.104.908.207 1.156.103.249.25.372.5.249z" />
                </svg>
                <span>Order on WhatsApp</span>
              </button>
 
              {/* Trust badges below ordering */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-charcoal-400 dark:text-charcoal-300 font-semibold uppercase tracking-wider pt-2">
                <div className="p-2 border border-charcoal-50 dark:border-charcoal-600 bg-charcoal-50/50 dark:bg-charcoal-800/40 rounded-sm">
                  🚚 Free Shipping
                </div>
                <div className="p-2 border border-charcoal-50 dark:border-charcoal-600 bg-charcoal-50/50 dark:bg-charcoal-800/40 rounded-sm">
                  ⚡ COD Available
                </div>
                <div className="p-2 border border-charcoal-50 dark:border-charcoal-600 bg-charcoal-50/50 dark:bg-charcoal-800/40 rounded-sm">
                  🔁 7-Day Exchange
                </div>
              </div>
 
            </div>
 
          </div>
        </div>

      </div>
    </div>
  );
}
