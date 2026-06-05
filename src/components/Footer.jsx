import React from "react";
import logoImg from "../assets/image.png";

/**
 * Footer Component
 * 
 * Props:
 * - setActivePage: function to switch active page
 * - setSelectedProductId: function to clear selected product details
 */
export default function Footer({ setActivePage, setSelectedProductId }) {

  // Helper to handle link navigation (smooth scroll to element ID)
  const handleFooterNav = (pageName) => {
    setSelectedProductId(null);
    setActivePage(pageName);

    if (pageName === "admin") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Wait for view switch if returning from details page
    setTimeout(() => {
      const element = document.getElementById(pageName);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <footer className="bg-charcoal-500 text-white font-sans border-t border-charcoal-100">

      {/* Upper Footer section with grid links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Column 1: Brand details */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 group select-none cursor-default">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gold-400 overflow-hidden shadow-md group-hover:border-gold-300 group-hover:rotate-12 transition-all duration-500">
                <img src={logoImg} alt="Sai Trends Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-display font-bold tracking-widest text-white group-hover:text-gold-400 transition-colors duration-300">
                  SAI TRENDS<span className="text-gold-400 inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-150">.</span>
                </h2>
                <p className="text-[8px] uppercase tracking-widest text-gold-400 font-semibold font-sans mt-0.5 leading-none transition-colors duration-300 group-hover:text-charcoal-300">
                  Made for Modern Men
                </p>
              </div>
            </div>
            <p className="text-charcoal-300 text-sm mt-4 leading-relaxed">
              Curating premium men's clothing that balances classic style with modern trends. We believe in providing comfort, elite quality, and affordability without compromise.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Shop Navigation
            </h3>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li>
                <button
                  onClick={() => handleFooterNav("home")}
                  className="hover:text-gold-300 hover:translate-x-1 transition-all duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFooterNav("collection")}
                  className="hover:text-gold-300 hover:translate-x-1 transition-all duration-200"
                >
                  Men's Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFooterNav("about")}
                  className="hover:text-gold-300 hover:translate-x-1 transition-all duration-200"
                >
                  About Our Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFooterNav("contact")}
                  className="hover:text-gold-300 hover:translate-x-1 transition-all duration-200"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFooterNav("admin")}
                  className="inline-block text-[11px] uppercase tracking-wider text-charcoal-400 border border-charcoal-400/80 px-2 py-0.5 hover:border-gold-400 hover:text-gold-400 rounded-sm transition-all duration-200 mt-2"
                >
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Contact Channels
            </h3>
            <ul className="space-y-2 text-sm text-charcoal-300">
              <li className="flex items-center space-x-2">
                <span className="text-gold-400">📞</span>
                <span>+91 9346305355</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gold-400">💬</span>
                <a
                  href="https://wa.me/919346305355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gold-400">📸</span>
                <a
                  href="https://www.instagram.com/sai_trendzzz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors"
                >
                  @SAI_TRENDZZZ on Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Store Location & Timings */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Flagship Store
            </h3>
            <p className="text-sm text-charcoal-300 leading-relaxed">
              SAI TRENDS , Ground Floor,<br />
              OPPOSITE NARAYANA SCHOOL<br />
              RAZOLE, SIVAKODU - 533242
            </p>
            <p className="text-xs text-charcoal-400 mt-2">
              Timings: 9:00 AM - 9:00 PM (Daily)
            </p>
          </div>

        </div>
      </div>

      {/* Lower Footer: Copyright & Decorative bar */}
      <div className="border-t border-charcoal-400 py-6 bg-charcoal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-charcoal-300 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Sai Trends. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Delivery Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
