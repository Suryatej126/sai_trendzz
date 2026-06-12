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
export default function Navbar({ activePage, setActivePage, selectedProductId, setSelectedProductId, theme, setTheme, setSelectedCategory }) {
  // state to manage the mobile hamburger menu open/close status
  const [isOpen, setIsOpen] = useState(false);
  // state to manage the mobile theme selector open/close status
  const [mobileThemeOpen, setMobileThemeOpen] = useState(false);
  // state to manage the mobile category selector accordion open/close status
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  // Helper function to handle navigation cleanly
  const handleNav = (pageName) => {
    setIsOpen(false); // Close mobile menu first
    setMobileThemeOpen(false); // Close mobile theme menu too
    setMobileCategoriesOpen(false); // Close mobile categories accordion too

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
          <div className="hidden md:flex space-x-8 items-center font-sans">
            <button
              onClick={() => {
                setSelectedCategory("All");
                handleNav("home");
              }}
              className={`text-sm uppercase tracking-wider font-semibold py-1 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 hover-gold-underline cursor-pointer ${
                activePage === "home"
                  ? "text-gold-500 font-bold border-b border-gold-500 scale-110 drop-shadow-[0_2px_8px_rgba(184,134,11,0.5)]"
                  : "text-charcoal-400 dark:text-charcoal-300 hover:text-charcoal-500 dark:hover:text-white hover:drop-shadow-[0_2px_5px_rgba(184,134,11,0.3)]"
              }`}
            >
              Home
            </button>
            
            <button
              onClick={() => {
                setSelectedCategory("All");
                handleNav("collection");
              }}
              className={`text-sm uppercase tracking-wider font-semibold py-1 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 hover-gold-underline cursor-pointer ${
                activePage === "collection"
                  ? "text-gold-500 font-bold border-b border-gold-500 scale-110 drop-shadow-[0_2px_8px_rgba(184,134,11,0.5)]"
                  : "text-charcoal-400 dark:text-charcoal-300 hover:text-charcoal-500 dark:hover:text-white hover:drop-shadow-[0_2px_5px_rgba(184,134,11,0.3)]"
              }`}
            >
              Collection
            </button>

            {/* Categories Dropdown Link */}
            <div className="relative group/categories flex items-center">
              <button
                className="text-sm uppercase tracking-wider font-semibold py-1 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 hover-gold-underline cursor-pointer text-charcoal-400 dark:text-charcoal-300 hover:text-charcoal-500 dark:hover:text-white flex items-center space-x-1"
              >
                <span>Categories</span>
                <span className="text-[10px] opacity-70">▼</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full mt-1.5 w-40 bg-white dark:bg-charcoal-800 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-xl py-1.5 opacity-0 invisible group-hover/categories:opacity-100 group-hover/categories:visible transition-all duration-300 z-50">
                {["Shirts", "Tracks", "Shorts", "Pants", "T-Shirts", "Slippers"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      handleNav("collection");
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-charcoal-400 dark:text-charcoal-200 hover:bg-charcoal-50 dark:hover:bg-charcoal-700 hover:text-gold-500 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNav("about")}
              className={`text-sm uppercase tracking-wider font-semibold py-1 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 hover-gold-underline cursor-pointer ${
                activePage === "about"
                  ? "text-gold-500 font-bold border-b border-gold-500 scale-110 drop-shadow-[0_2px_8px_rgba(184,134,11,0.5)]"
                  : "text-charcoal-400 dark:text-charcoal-300 hover:text-charcoal-500 dark:hover:text-white hover:drop-shadow-[0_2px_5px_rgba(184,134,11,0.3)]"
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNav("contact")}
              className={`text-sm uppercase tracking-wider font-semibold py-1 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 hover-gold-underline cursor-pointer ${
                activePage === "contact"
                  ? "text-gold-500 font-bold border-b border-gold-500 scale-110 drop-shadow-[0_2px_8px_rgba(184,134,11,0.5)]"
                  : "text-charcoal-400 dark:text-charcoal-300 hover:text-charcoal-500 dark:hover:text-white hover:drop-shadow-[0_2px_5px_rgba(184,134,11,0.3)]"
              }`}
            >
              Contact
            </button>
            
            {/* Theme selector dropdown */}
            <div className="relative group/theme flex items-center">
              <button
                className="p-2 rounded-full border border-charcoal-100 dark:border-charcoal-600 text-charcoal-400 dark:text-gold-300 hover:text-gold-500 hover:border-gold-400 transition-colors shadow-sm cursor-pointer flex items-center justify-center"
                aria-label="Select theme"
              >
                {/* Visual indicator of active theme icon / shape */}
                {theme === 'light' ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white dark:bg-charcoal-800 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-xl py-1.5 opacity-0 invisible group-hover/theme:opacity-100 group-hover/theme:visible transition-all duration-300 z-50">
                {[
                  { id: 'light', name: 'Light Gold', dot: 'bg-gold-50 border-gold-400' },
                  { id: 'navy', name: 'Blue', dot: 'bg-blue-950 border-blue-400' },
                  { id: 'classic', name: 'Classic Theme', dot: 'bg-slate-700 border-slate-400' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center space-x-2.5 hover:bg-charcoal-50 dark:hover:bg-charcoal-700 transition-colors cursor-pointer ${
                      theme === t.id ? "text-gold-500 font-bold bg-gold-50/20" : "text-charcoal-400 dark:text-charcoal-200"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border ${t.dot}`} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
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
            {/* Mobile Theme selector toggle */}
            <div className="relative flex items-center">
              <button
                onClick={() => {
                  setMobileThemeOpen(!mobileThemeOpen);
                  setIsOpen(false);
                }}
                className="p-2.5 rounded-full border border-charcoal-100 dark:border-charcoal-600 text-charcoal-450 dark:text-gold-300 hover:text-gold-500 hover:border-gold-400 transition-colors shadow-sm cursor-pointer flex items-center justify-center bg-charcoal-50/50 dark:bg-charcoal-800/40 active:scale-95"
                aria-label="Select theme"
              >
                <span className={`w-3.5 h-3.5 rounded-full border ${
                  theme === 'light' ? 'bg-gold-50 border-gold-400' :
                  theme === 'navy' ? 'bg-blue-900 border-blue-450' :
                  'bg-slate-700 border-slate-400'
                }`} />
              </button>
              
              {/* Mobile Theme Dropdown Menu */}
              {mobileThemeOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setMobileThemeOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-charcoal-800 border border-charcoal-100 dark:border-charcoal-600 rounded-md shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-250">
                    {[
                      { id: 'light', name: 'Light Gold', dot: 'bg-gold-50 border-gold-400' },
                      { id: 'navy', name: 'Blue', dot: 'bg-blue-950 border-blue-450' },
                      { id: 'classic', name: 'Classic Theme', dot: 'bg-slate-700 border-slate-400' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setMobileThemeOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center space-x-2.5 hover:bg-charcoal-50 dark:hover:bg-charcoal-700 transition-colors cursor-pointer ${
                          theme === t.id ? "text-gold-500 font-bold bg-gold-50/20" : "text-charcoal-400 dark:text-charcoal-200"
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full border ${t.dot}`} />
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setMobileThemeOpen(false);
                setMobileCategoriesOpen(false);
              }}
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
            <button
              onClick={() => {
                setSelectedCategory("All");
                handleNav("home");
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                activePage === "home"
                  ? "bg-gold-50 dark:bg-gold-900/20 text-gold-500 dark:text-gold-300 border-l-4 border-gold-500 font-bold shadow-[inset_4px_0_0_rgba(184,134,11,0.2),_0_2px_8px_rgba(184,134,11,0.15)]"
                  : "text-charcoal-400 dark:text-charcoal-300 hover:bg-charcoal-50 dark:hover:bg-charcoal-700/50 hover:text-charcoal-500 dark:hover:text-white"
              }`}
            >
              Home
            </button>
            
            <button
              onClick={() => {
                setSelectedCategory("All");
                handleNav("collection");
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                activePage === "collection"
                  ? "bg-gold-50 dark:bg-gold-900/20 text-gold-500 dark:text-gold-300 border-l-4 border-gold-500 font-bold shadow-[inset_4px_0_0_rgba(184,134,11,0.2),_0_2px_8px_rgba(184,134,11,0.15)]"
                  : "text-charcoal-400 dark:text-charcoal-300 hover:bg-charcoal-50 dark:hover:bg-charcoal-700/50 hover:text-charcoal-500 dark:hover:text-white"
              }`}
            >
              Collection
            </button>

            {/* Mobile Categories Accordion */}
            <div className="space-y-1">
              <button
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="w-full text-left px-4 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold text-charcoal-400 dark:text-charcoal-300 hover:bg-charcoal-50 dark:hover:bg-charcoal-700/50 hover:text-charcoal-500 dark:hover:text-white flex justify-between items-center"
              >
                <span>Categories</span>
                <span className="text-xs">{mobileCategoriesOpen ? "▲" : "▼"}</span>
              </button>
              
              {mobileCategoriesOpen && (
                <div className="pl-6 space-y-1 py-1 bg-charcoal-50/20 dark:bg-charcoal-800/10 rounded-md">
                  {["Shirts", "Tracks", "Shorts", "Pants", "T-Shirts", "Slippers"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        handleNav("collection");
                      }}
                      className="block w-full text-left px-4 py-2 text-xs uppercase tracking-wider font-semibold text-charcoal-400 dark:text-charcoal-350 hover:text-gold-500"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav("about")}
              className={`block w-full text-left px-4 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                activePage === "about"
                  ? "bg-gold-50 dark:bg-gold-900/20 text-gold-500 dark:text-gold-300 border-l-4 border-gold-500 font-bold shadow-[inset_4px_0_0_rgba(184,134,11,0.2),_0_2px_8px_rgba(184,134,11,0.15)]"
                  : "text-charcoal-400 dark:text-charcoal-300 hover:bg-charcoal-50 dark:hover:bg-charcoal-700/50 hover:text-charcoal-500 dark:hover:text-white"
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNav("contact")}
              className={`block w-full text-left px-4 py-2.5 rounded-md text-sm uppercase tracking-wider font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer ${
                activePage === "contact"
                  ? "bg-gold-50 dark:bg-gold-900/20 text-gold-500 dark:text-gold-300 border-l-4 border-gold-500 font-bold shadow-[inset_4px_0_0_rgba(184,134,11,0.2),_0_2px_8px_rgba(184,134,11,0.15)]"
                  : "text-charcoal-400 dark:text-charcoal-300 hover:bg-charcoal-50 dark:hover:bg-charcoal-700/50 hover:text-charcoal-500 dark:hover:text-white"
              }`}
            >
              Contact
            </button>
            
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
