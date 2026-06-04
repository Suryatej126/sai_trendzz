import React, { useState } from "react";

/**
 * Contact Page Component
 * 
 * Provides store location details, physical address, business hours,
 * and direct links to Phone, WhatsApp, and Instagram. It also includes
 * a functional local contact form with submit notifications.
 */
export default function Contact() {

  // 1. Form state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Submit handler for Contact Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that inputs are not empty
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Since this is a static showcase app, we simulate database saving
    setIsSubmitted(true);

    // Clear the form fields
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");

    // Hide success alert after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-white dark:bg-charcoal-700 min-h-screen py-8 md:py-16 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16 space-y-3">
          <p className="text-xs uppercase tracking-widest text-gold-600 font-bold">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-charcoal-500 dark:text-white">
            Contact Us
          </h1>
          <div className="h-0.5 w-16 bg-gold-400 mx-auto mt-4" />
          <p className="text-sm text-charcoal-400 dark:text-charcoal-300">
            Have questions about sizing, delivery, or custom orders? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Panel: Direct Channels & Address Info (Spans 5 Columns) */}
          <div className="lg:col-span-5 space-y-8">

            <div className="bg-charcoal-50 dark:bg-charcoal-800 border border-charcoal-100 dark:border-charcoal-600 p-6 sm:p-8 rounded-sm space-y-6 transition-colors">
              <h2 className="text-xl font-display font-bold text-charcoal-500 dark:text-white border-b border-charcoal-100 dark:border-charcoal-600 pb-3">
                Flagship Outlet
              </h2>

              {/* Physical Address */}
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">Store Address</p>
                <p className="text-sm text-charcoal-500 dark:text-charcoal-200 leading-relaxed font-semibold">
                  SAI TRENDS, Ground Floor,<br />
                  OPPOSITE NARAYANA SCHOOL <br />
                  RAZOLE, SIVAKODU - 533244
                </p>
              </div>

              {/* Hours */}
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">Store Timings</p>
                <p className="text-sm text-charcoal-500 dark:text-charcoal-200">
                  Open Everyday: 9:00 AM - 9:00 PM
                </p>
              </div>
            </div>

            {/* Quick Action Channels Grid - Arranged side-by-side in 1 row on mobile */}
            <div className="grid grid-cols-3 gap-3">

              {/* Phone call channel */}
              <a
                href="tel:+919346305355"
                className="flex flex-col items-center justify-center py-4 px-2 border border-charcoal-100 dark:border-charcoal-600 rounded-sm bg-white dark:bg-charcoal-700 hover:border-gold-400 hover:shadow-md transition-all duration-300 text-center"
              >
                <span className="text-xl mb-1">📞</span>
                <span className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">Call</span>
              </a>

              {/* WhatsApp chat channel */}
              <a
                href="https://wa.me/919346305355?text=Hi!%20I'm%20contacting%20you%20from%20the%20Sai%20Trends%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-4 px-2 border border-charcoal-100 dark:border-charcoal-600 rounded-sm bg-white dark:bg-charcoal-700 hover:border-green-400 hover:shadow-md transition-all duration-300 text-center"
              >
                <span className="text-xl mb-1">💬</span>
                <span className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">WhatsApp</span>
              </a>

              {/* Instagram link channel */}
              <a
                href="https://www.instagram.com/sai_trendzzz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-4 px-2 border border-charcoal-100 dark:border-charcoal-600 rounded-sm bg-white dark:bg-charcoal-700 hover:border-pink-400 hover:shadow-md transition-all duration-300 text-center"
              >
                <span className="text-xl mb-1">📸</span>
                <span className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">Instagram</span>
              </a>

            </div>

            {/* Embedded maps simulator for premium brand presence */}
            <div className="bg-charcoal-100 dark:bg-charcoal-800 aspect-video rounded-sm overflow-hidden border border-charcoal-150 dark:border-charcoal-600 relative group">
              <iframe
                title="SAI TRENDZZ , SIVAKODU"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2804.372337972797!2d81.83513411184873!3d16.46365393910636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1780589969617!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale hover:grayscale-0 transition-all duration-500"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* Right Panel: Clean Contact Form (Spans 7 Columns) */}
          <div className="lg:col-span-7 bg-white dark:bg-charcoal-800 border border-charcoal-100 dark:border-charcoal-600 p-6 sm:p-8 rounded-sm shadow-sm transition-colors">
            <h2 className="text-xl font-display font-bold text-charcoal-500 dark:text-white border-b border-charcoal-100 dark:border-charcoal-600 pb-3 mb-6">
              Send a Direct Message
            </h2>

            {/* Form submission success banner */}
            {isSubmitted && (
              <div className="mb-6 p-4 bg-gold-50 dark:bg-gold-950/20 border border-gold-300 dark:border-gold-800 text-gold-800 dark:text-gold-300 text-sm rounded-sm">
                <strong>Thank you!</strong> Your message has been sent successfully. Our support team will get in touch with you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name field */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="form-name" className="text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-white dark:bg-charcoal-700 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 font-sans"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="form-email" className="text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-white dark:bg-charcoal-700 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 font-sans"
                />
              </div>

              {/* Phone field (optional) */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="form-phone" className="text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                  Phone Number (Optional)
                </label>
                <input
                  id="form-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="bg-white dark:bg-charcoal-700 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 font-sans"
                />
              </div>

              {/* Message text area */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="form-message" className="text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                  Message Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="form-message"
                  required
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="bg-white dark:bg-charcoal-700 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 font-sans resize-y"
                ></textarea>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-charcoal-500 dark:bg-gold-500 hover:bg-gold-500 dark:hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-colors rounded-sm cursor-pointer"
                >
                  Send Message
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
