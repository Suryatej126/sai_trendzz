import React from "react";

/**
 * FloatingContact Component
 * 
 * Renders separate, persistent contact buttons:
 * - A Call Now button on the bottom-left corner (+91 9346305355).
 * - A Chat on WhatsApp button on the bottom-right corner.
 */
export default function FloatingContact() {
  return (
    <>
      {/* 1. Left Bottom - Direct Call Button */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center space-x-3 group">
        <a
          href="tel:+919346305355"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-gold-500 to-gold-600 text-white flex items-center justify-center shadow-lg border border-gold-400/20 hover:border-white transition-all duration-300 hover:scale-105 active:scale-95 hover:rotate-6 relative"
          aria-label="Call Us Now"
        >
          {/* Pulsing ring for aesthetic glow */}
          <span className="absolute inset-0 rounded-full bg-gold-400/20 dark:bg-gold-500/10 animate-ping -z-10" />
          
          <svg 
            className="w-6 h-6 fill-current" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.62 10.79a15.149 15.149 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.42 2.33.64 3.57.64a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.22 2.45.64 3.57a1 1 0 01-.28 1.11l-2.2 2.22z" />
          </svg>
        </a>
        <span className="bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-100 text-xs font-semibold px-3 py-1.5 rounded-sm shadow-md border border-charcoal-100 dark:border-charcoal-600 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 whitespace-nowrap select-none font-sans pointer-events-none">
          Call Us Now
        </span>
      </div>

      {/* 2. Right Bottom - WhatsApp Chat Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 flex-row-reverse space-x-reverse group">
        <a
          href="https://wa.me/919346305355?text=Hi!%20I'm%20interested%20in%20shopping%20at%20Sai%20Trends."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-lg border border-gold-400/20 hover:border-white transition-all duration-300 hover:scale-105 active:scale-95 hover:rotate-6 relative"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing ring for aesthetic glow */}
          <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping -z-10" />
          
          <svg 
            className="w-6 h-6 fill-current" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.788 2.012 14.317 1 11.993 1 6.558 1 2.13 5.37 2.127 10.8c-.001 1.777.476 3.502 1.382 5.02L2.531 21.5l5.882-1.53c1.52.888 3.1.134 4.544.884zm12.39-7.234c-.266-.134-1.573-.778-1.816-.865-.243-.09-.419-.134-.596.134-.176.268-.683.865-.838 1.04-.155.177-.311.198-.577.065-.266-.134-1.12-.414-2.137-1.327-.79-.708-1.323-1.582-1.478-1.85-.155-.267-.016-.411.118-.544.12-.12.266-.31.399-.466.133-.156.177-.267.266-.445.09-.177.044-.334-.022-.467-.067-.134-.596-1.437-.816-1.97-.216-.52-.468-.45-.64-.459-.165-.008-.354-.01-.543-.01-.19 0-.498.07-.759.354-.26.288-1 .978-1 2.387 0 1.41 1.024 2.77 1.168 2.96.143.19 2.017 3.08 4.886 4.318.682.296 1.216.473 1.632.605.69.22 1.318.19 1.815.115.553-.083 1.573-.642 1.794-1.26.22-.619.22-1.15.155-1.26-.067-.11-.244-.19-.51-.324z" />
          </svg>
        </a>
        <span className="bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-100 text-xs font-semibold px-3 py-1.5 rounded-sm shadow-md border border-charcoal-100 dark:border-charcoal-600 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 whitespace-nowrap select-none font-sans pointer-events-none">
          Chat on WhatsApp
        </span>
      </div>
    </>
  );
}
