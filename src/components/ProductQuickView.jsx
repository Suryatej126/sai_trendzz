import React, { useState, useEffect } from "react";
import CloudinaryImage from "./CloudinaryImage";
import OrderFormModal from "./OrderFormModal";

/**
 * ProductQuickView Modal Component
 * 
 * Props:
 * - product: Object containing active product data
 * - onClose: Callback to close the modal overlay
 */
export default function ProductQuickView({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImg, setActiveImg] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);


  // Set default values when product opens
  useEffect(() => {
    if (product) {
      setActiveImg(product.image);
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  if (!product) return null;

  // Format currency
  const formatPrice = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  };

  // Calculate discount
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Trigger WhatsApp order redirection modal
  const handleWhatsAppOrder = () => {
    setShowOrderModal(true);
  };

  // Execute actual WhatsApp order checkout (with optional user details)
  const executeWhatsAppOrder = (userData) => {
    setShowOrderModal(false);
    const phoneNumber = "919346305355";
    const itemLink = `${window.location.origin}?product=${product.id}`;

    let detailsText = "";
    if (userData) {
      detailsText = `
*Customer Name:* ${userData.name || "N/A"}
*Mobile:* ${userData.mobile || "N/A"}
*Address:* ${userData.address || "N/A"}
*Pin Code:* ${userData.pinCode || "N/A"}`;
    }

    const message = `Hello Sai Trends! I would like to order:
*Product Name:* ${product.name}
*Size:* ${selectedSize}
*Price:* ${formatPrice(product.price)}${detailsText}
*Link:* ${itemLink}

Please confirm availability and dispatch timeline. Thank you!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  // Open full details page in a new tab
  const handleViewFullDetails = () => {
    window.open(`?product=${product.id}`, "_blank");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-charcoal-700 text-charcoal-500 dark:text-white rounded-xl shadow-2xl relative max-w-3xl w-full max-h-[90vh] overflow-y-auto p-5 md:p-8 animate-[scaleUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)] border border-charcoal-100 dark:border-charcoal-600 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-charcoal-50 dark:bg-charcoal-800 hover:bg-gold-500 hover:text-white transition-colors cursor-pointer text-sm font-bold border border-charcoal-100 dark:border-charcoal-600 z-10"
          aria-label="Close Preview"
        >
          ✕
        </button>

        {/* Column 1: Image Gallery */}
        <div className="flex flex-col space-y-3">
          <div className="bg-charcoal-50 dark:bg-charcoal-800 border border-charcoal-100 dark:border-charcoal-600 rounded-lg overflow-hidden aspect-[3/4] w-full relative shadow-sm">
            <CloudinaryImage
              src={activeImg || product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
              width={400}
              height={533}
            />
            {product.tag && (
              <span className="absolute top-3 left-3 bg-charcoal-500/90 text-white text-[8px] uppercase tracking-wider font-semibold py-1 px-3 border border-gold-300/30 shadow-md">
                {product.tag}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {(product.image2 || product.image3) && (
            <div className="flex gap-2 justify-center md:justify-start overflow-x-auto py-1">
              <button
                onClick={() => setActiveImg(product.image)}
                className={`w-12 h-16 bg-charcoal-100 dark:bg-charcoal-800 border rounded-sm overflow-hidden transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  activeImg === product.image || !activeImg
                    ? "border-gold-500 ring-1 ring-gold-500 scale-105"
                    : "border-charcoal-100 dark:border-charcoal-600 opacity-70 hover:opacity-100"
                }`}
              >
                <CloudinaryImage src={product.image} alt="Main view" className="w-full h-full object-cover object-center" width={48} height={64} />
              </button>

              {product.image2 && (
                <button
                  onClick={() => setActiveImg(product.image2)}
                  className={`w-12 h-16 bg-charcoal-100 dark:bg-charcoal-800 border rounded-sm overflow-hidden transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    activeImg === product.image2
                      ? "border-gold-500 ring-1 ring-gold-500 scale-105"
                      : "border-charcoal-100 dark:border-charcoal-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <CloudinaryImage src={product.image2} alt="view 2" className="w-full h-full object-cover object-center" width={48} height={64} />
                </button>
              )}

              {product.image3 && (
                <button
                  onClick={() => setActiveImg(product.image3)}
                  className={`w-12 h-16 bg-charcoal-100 dark:bg-charcoal-800 border rounded-sm overflow-hidden transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    activeImg === product.image3
                      ? "border-gold-500 ring-1 ring-gold-500 scale-105"
                      : "border-charcoal-100 dark:border-charcoal-600 opacity-70 hover:opacity-100"
                  }`}
                >
                  <CloudinaryImage src={product.image3} alt="view 3" className="w-full h-full object-cover object-center" width={48} height={64} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Column 2: Info & Details Panel */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-[9px] uppercase tracking-widest text-gold-600 dark:text-gold-450 bg-gold-50 dark:bg-gold-950/20 py-0.5 px-2.5 border border-gold-100 dark:border-gold-900/50 rounded-sm font-semibold">
              {product.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-charcoal-500 dark:text-white leading-tight">
              {product.name}
            </h2>

            {/* Price display with discount percentage tag */}
            <div className="flex items-center space-x-3 pt-1">
              <span className="text-2xl font-bold text-charcoal-500 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-charcoal-300 dark:text-charcoal-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-gold-100 dark:bg-gold-950/20 border border-gold-300/20 dark:border-gold-900/20 text-gold-700 dark:text-gold-300 text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-charcoal-100 dark:border-charcoal-600 pt-3.5 space-y-1">
              <h3 className="text-[10px] uppercase tracking-widest text-charcoal-400 dark:text-charcoal-350 font-bold">
                Overview
              </h3>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-300 leading-relaxed max-h-24 overflow-y-auto">
                {product.description}
              </p>
            </div>

            {/* Sizes Selector */}
            <div className="border-t border-charcoal-100 dark:border-charcoal-600 pt-3.5 space-y-2">
              <h3 className="text-[10px] uppercase tracking-widest text-charcoal-400 dark:text-charcoal-350 font-bold">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-8 min-w-8 px-2.5 flex items-center justify-center border font-sans text-[10px] uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? "bg-charcoal-500 dark:bg-gold-500 border-charcoal-500 dark:border-gold-500 text-white font-bold scale-105"
                        : "bg-white dark:bg-charcoal-600 border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-charcoal-200 hover:border-gold-500 hover:text-gold-500 dark:hover:border-gold-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-charcoal-100 dark:border-charcoal-600 pt-4 space-y-2">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans text-xs uppercase tracking-wider font-bold rounded-sm shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.66.986 3.296 1.489 4.887 1.491 5.378 0 9.751-4.358 9.754-9.71.002-2.593-1.002-5.031-2.83-6.861-1.829-1.83-4.27-2.834-6.86-2.835-5.383 0-9.757 4.359-9.76 9.712-.002 1.701.462 3.364 1.34 4.801l-.994 3.63 3.737-.98c1.472.88 3.102 1.35 4.666 1.352zm9.183-5.606c-.25-.124-1.477-.727-1.705-.81-.228-.083-.393-.124-.558.124-.166.248-.641.81-.786.973-.145.166-.29.186-.54.062-.25-.124-1.055-.389-2.01-1.243-.743-.663-1.245-1.48-1.39-1.729-.145-.248-.015-.383.11-.507.112-.111.25-.29.375-.436.125-.145.166-.248.25-.415.083-.166.042-.311-.02-.436-.063-.124-.558-1.346-.764-1.845-.2-.486-.403-.42-.558-.428-.145-.008-.31-.01-.476-.01t-.435.062c-.166.062-.634.248-.865.727-.232.48-.887 1.701-.887 4.148 0 2.448 1.78 4.811 2.028 5.142.249.331 3.507 5.355 8.497 7.505 1.187.512 2.115.817 2.839 1.047 1.192.378 2.277.325 3.134.197.954-.141 2.94-.1.177 3.072-.942.228-.962.393-.974.726-.012.333.104.908.207 1.156.103.249.25.372.5.249z" />
              </svg>
              <span>Order on WhatsApp</span>
            </button>

            <button
              onClick={handleViewFullDetails}
              className="w-full py-3 bg-charcoal-500 dark:bg-charcoal-800 border border-charcoal-200 dark:border-charcoal-600 hover:border-gold-500 dark:hover:border-gold-500 hover:text-gold-500 dark:hover:text-gold-450 transition-colors text-charcoal-400 dark:text-charcoal-200 text-xs font-semibold uppercase tracking-wider rounded-sm cursor-pointer"
            >
              View Full Details
            </button>
          </div>
        </div>
      </div>

      {/* Animation Styles Inline for fade/scale */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      {/* Customer Delivery Details Modal */}
      <OrderFormModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onSubmit={executeWhatsAppOrder}
      />
    </div>
  );
}
