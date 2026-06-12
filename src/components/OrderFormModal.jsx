import React, { useState } from "react";

/**
 * OrderFormModal Component
 * 
 * Renders a skippable form popup requesting customer checkout information 
 * (Name, Mobile, Address, Pin Code) before placing an order on WhatsApp.
 * Supports theme variants dynamically (Light Gold / Dark Navy / Classic).
 */
export default function OrderFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    pinCode: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkip = () => {
    onSubmit(null); // Return null to signify the user chose to skip
  };

  const handleProceed = (e) => {
    e.preventDefault();
    onSubmit(formData); // Return entered details
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-modal-fade-in">
      {/* Click outside backdrop wrapper to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Form Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-charcoal-800 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-2xl p-6 z-10 animate-modal-scale-up font-sans">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-charcoal-400 dark:text-charcoal-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors text-base font-bold cursor-pointer"
          aria-label="Close form"
        >
          ✕
        </button>

        {/* Header Label & Title */}
        <div className="mb-5">
          <p className="text-[10px] uppercase tracking-widest text-gold-600 dark:text-gold-450 font-bold mb-1">
             Sai Trends Checkout
          </p>
          <h3 className="text-lg font-display font-bold text-charcoal-500 dark:text-white">
            Delivery Information
          </h3>
          <p className="text-xs text-charcoal-400 dark:text-charcoal-300 mt-1 leading-relaxed">
            Fill in your delivery details to automatically include them in the WhatsApp order message, or skip to order without sharing.
          </p>
        </div>

        {/* Input Fields Form */}
        <form onSubmit={handleProceed} className="space-y-4">
          
          {/* 1. Name Input */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-250 font-bold mb-1" htmlFor="modal-name">
              Full Name
            </label>
            <input
              type="text"
              id="modal-name"
              name="name"
              placeholder="e.g. Suryatej"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-charcoal-50/50 dark:bg-charcoal-700/40 border border-charcoal-200 dark:border-charcoal-600 rounded-sm px-3 py-2 text-xs text-charcoal-500 dark:text-white placeholder-charcoal-300 dark:placeholder-charcoal-400 focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 transition-colors font-sans"
            />
          </div>

          {/* 2. Mobile Input */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-250 font-bold mb-1" htmlFor="modal-mobile">
              Mobile Number
            </label>
            <input
              type="tel"
              id="modal-mobile"
              name="mobile"
              placeholder="e.g. 9346305355"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full bg-charcoal-50/50 dark:bg-charcoal-700/40 border border-charcoal-200 dark:border-charcoal-600 rounded-sm px-3 py-2 text-xs text-charcoal-500 dark:text-white placeholder-charcoal-300 dark:placeholder-charcoal-400 focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 transition-colors font-sans"
            />
          </div>

          {/* 3. Address Textarea */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-250 font-bold mb-1" htmlFor="modal-address">
              Delivery Address
            </label>
            <textarea
              id="modal-address"
              name="address"
              rows="2.5"
              placeholder="Enter your street, area, city, and landmarks..."
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-charcoal-50/50 dark:bg-charcoal-700/40 border border-charcoal-200 dark:border-charcoal-600 rounded-sm px-3 py-2 text-xs text-charcoal-500 dark:text-white placeholder-charcoal-300 dark:placeholder-charcoal-400 focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 transition-colors resize-none font-sans"
            />
          </div>

          {/* 4. Pin Code Input */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-250 font-bold mb-1" htmlFor="modal-pin">
              Pin Code
            </label>
            <input
              type="text"
              id="modal-pin"
              name="pinCode"
              placeholder="e.g. 533242"
              value={formData.pinCode}
              onChange={handleChange}
              className="w-full bg-charcoal-50/50 dark:bg-charcoal-700/40 border border-charcoal-200 dark:border-charcoal-600 rounded-sm px-3 py-2 text-xs text-charcoal-500 dark:text-white placeholder-charcoal-300 dark:placeholder-charcoal-400 focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 transition-colors font-sans"
            />
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-between gap-3 pt-3">
            <button
              type="button"
              onClick={handleSkip}
              className="flex-grow py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border border-charcoal-200 dark:border-charcoal-600 text-charcoal-400 dark:text-charcoal-300 rounded-sm hover:bg-charcoal-50 dark:hover:bg-charcoal-700/30 transition-colors active:scale-[0.98] cursor-pointer"
            >
              Skip & Order
            </button>
            <button
              type="submit"
              className="flex-grow py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-gold-500 hover:bg-gold-600 text-white rounded-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              Proceed to Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
