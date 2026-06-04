import React, { useState } from "react";
import logoImg from "../assets/image.png";

/**
 * Navbar Component
 * 
 * Props:
 * - activePage: the current active page string ('home', 'collection', 'about', 'contact')
 * - setActivePage: function to change the active page
 * - selectedProductId: active product details ID (null if main storefront view is open)
 * - setSelectedProductId: function to clear/set selected product (so clicking a link takes you out of product details)
 * - theme: current active theme string ('light' or 'dark')
 * - setTheme: function to change active theme mode
 */
export default function Navbar({ activePage, setActivePage, selectedProductId, setSelectedProductId, theme, setTheme }) {
  // state to manage the mobile hamburger menu open/close status
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to handle navigation cleanly (smooth scroll to element ID)
  const handleNav = (pageName) => {
    setIsOpen(false); // Close mobile menu first

    // If navigating to Admin Portal
    if (pageName === "admin") {
      setSelectedProductId(null);
      setActivePage("admin");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // If currently on a product's details page, close it first to return to main scroll layout
    if (selectedProductId !== null) {
      setSelectedProductId(null);
      // Wait a brief moment for the main page elements to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(pageName);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(pageName);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setActivePage(pageName);
  };

  // List of navigation links for cleaner rendering
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "collection", label: "Collection" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-charcoal-700/95 backdrop-blur-md border-b border-charcoal-100 dark:border-charcoal-600 shadow-sm transition-all duration-300">
      {/* Decorative ultra-thin top border in subtle gold */}
      <div className="h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Brand Logo - Styled with elegant spacing and a gold period accent */}
          <div 
            onClick={() => handleNav("home")}
            className="flex-shrink-0 cursor-pointer flex items-center space-x-3 select-none group"
          >
            {/* Small logo icon on the opposite side of the brand name text */}
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gold-400 overflow-hidden shadow-md group-hover:border-gold-300 group-hover:rotate-12 transition-all duration-500">
              <img src={logoImg} alt="Sai Trends Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl sm:text-2xl font-display font-bold tracking-widest text-charcoal-500 dark:text-white group-hover:text-gold-500 transition-colors duration-300">
                SAI TRENDS<span className="text-gold-500 inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-150">.</span>
              </h1>
              <p className="text-[8px] uppercase tracking-widest text-gold-600 font-semibold font-sans mt-0.5 leading-none transition-colors duration-300 group-hover:text-charcoal-500 dark:group-hover:text-charcoal-200">
                Made for Modern Men
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-sm uppercase tracking-wider font-semibold font-sans py-1 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 hover-gold-underline cursor-pointer ${
                  activePage === link.id
                    ? "text-gold-500 font-bold border-b border-gold-500 scale-110 drop-shadow-[0_2px_8px_rgba(184,134,11,0.5)]" // Selected: bold, scaled up, and gold glow drop shadow
                    : "text-charcoal-400 dark:text-charcoal-300 hover:text-charcoal-500 dark:hover:text-white hover:drop-shadow-[0_2px_5px_rgba(184,134,11,0.3)]"
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {/* Theme switcher toggle button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-full border border-charcoal-100 dark:border-charcoal-600 text-charcoal-400 dark:text-gold-300 hover:text-gold-500 hover:border-gold-400 transition-colors shadow-sm cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>
            
            {/* Call to action: Quick WhatsApp trigger in header */}
            <a
              href="https://wa.me/919346305355?text=Hi!%20I'm%20interested%20in%20shopping%20at%20Sai%20Trends."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-charcoal-500 dark:bg-gold-500 text-white border border-charcoal-500 dark:border-gold-500 hover:bg-white hover:text-charcoal-500 dark:hover:bg-charcoal-700 dark:hover:text-gold-300 dark:hover:border-gold-400 rounded-sm transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Order Online
            </a>
          </div>

          {/* Mobile Menu Button - Hamburger Icon */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Theme switcher toggle button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-1.5 rounded-full border border-charcoal-100 dark:border-charcoal-600 text-charcoal-400 dark:text-gold-300 hover:text-gold-500 hover:border-gold-400 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal-400 dark:text-charcoal-300 hover:text-gold-500 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // "Close" Icon (X)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // "Menu" Icon (Hamburger)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-charcoal-800 border-b border-charcoal-100 dark:border-charcoal-600 transition-all duration-300">
          <div className="px-4 pt-3 pb-6 space-y-3 shadow-inner">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm uppercase tracking-wider font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                  activePage === link.id
                    ? "bg-gold-50 dark:bg-gold-900/20 text-gold-500 dark:text-gold-300 border-l-4 border-gold-500 font-bold shadow-[inset_4px_0_0_rgba(184,134,11,0.2),_0_2px_8px_rgba(184,134,11,0.15)]"
                    : "text-charcoal-400 dark:text-charcoal-300 hover:bg-charcoal-50 dark:hover:bg-charcoal-700/50 hover:text-charcoal-500 dark:hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-2 px-4">
              <a
                href="https://wa.me/919346305355?text=Hi!%20I'm%20interested%20in%20shopping%20at%20Sai%20Trends."
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full px-5 py-3 text-xs uppercase tracking-wider font-semibold bg-gold-500 text-white rounded-sm hover:bg-gold-600 transition-colors shadow-md animate-pulse"
              >
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
