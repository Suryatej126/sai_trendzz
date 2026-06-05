import React, { useState, useEffect, useRef } from "react";
// Import our shared navigation components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import our standalone pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";

// Import the static mock database for initial load
import { products as initialProducts } from "./data/products";
// Import brand logo image for the transition loader
import logoImg from "./assets/image.png";

/**
 * Main App Component
 * 
 * Root component of the Sai Trends application. Handles page navigation,
 * local storage synchronization, product CRUD state, passcode settings,
 * and single-page scroll behavior with an active Scroll Spy.
 */
function App() {
  // State for Website Intro Landing Animation (Double blink logo intro)
  const [showIntro, setShowIntro] = useState(true);
  const [introFadeOut, setIntroFadeOut] = useState(false);

  // 1. State for active navbar highlighting ('home', 'collection', 'about', 'contact', 'admin')
  const [currentPage, setCurrentPage] = useState("home");

  // Lock scroll and handle intro screen timings
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    }

    const fadeTimer = setTimeout(() => {
      setIntroFadeOut(true);
    }, 2000); // Dissolves the black background overlay in sync with the elements fading out

    const removeTimer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = "";
    }, 2400); // Completely unmounts at 2.4 seconds

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  
  // 2. State to track active product details view (holds product ID, null if not active)
  const [selectedProductId, setSelectedProductId] = useState(null);

  // 3. State for Admin Passcode (persisted in localStorage, defaults to '123456')
  const [adminPasscode, setAdminPasscode] = useState(() => {
    const savedCode = localStorage.getItem("sai_trends_admin_passcode");
    return savedCode || "123456";
  });

  // 4. State to hold the active list of products (persisted in localStorage)
  const [productsList, setProductsList] = useState(() => {
    const saved = localStorage.getItem("sai_trends_products");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Failed to parse products from local storage", error);
      }
    }
    return initialProducts;
  });

  // 5. State for Light/Dark Theme Mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("sai_trends_theme") || "light";
  });

  // 6. State for Lookbook (persisted in localStorage)
  const [lookbook, setLookbook] = useState(() => {
    const defaultLookbook = {
      heading: "Redefining the Gentleman's Dress Code",
      description: "Our latest collection focuses on versatile wardrobe structures. Mix, match, and transition effortlessly from a casual morning zoom call to an evening social event. High-quality details are not just added; they are integrated into every stitch.",
      image1: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80",
      image2: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=500&auto=format&fit=crop&q=80"
    };
    const saved = localStorage.getItem("sai_trends_lookbook");
    return saved ? JSON.parse(saved) : defaultLookbook;
  });

  // 7. State for transition loader (when opening product details)
  const [isNavigating, setIsNavigating] = useState(false);

  // Ref to prevent history sync loops when back button is pressed
  const isPopStateRef = useRef(false);

  // History sync hook 1: Handle popstate events (e.g. back button clicks)
  useEffect(() => {
    const handlePopState = (event) => {
      isPopStateRef.current = true;
      
      const state = event.state;
      let targetPage = "home";
      let targetProductId = null;
      
      if (state) {
        targetPage = state.page || "home";
        targetProductId = state.productId !== undefined ? state.productId : null;
      } else {
        const params = new URLSearchParams(window.location.search);
        const productQuery = params.get("product");
        const pageQuery = params.get("page");
        targetPage = pageQuery || "home";
        targetProductId = productQuery ? Number(productQuery) : null;
      }
      
      setSelectedProductId(targetProductId);
      setCurrentPage(targetPage);
      
      setTimeout(() => {
        isPopStateRef.current = false;
      }, 50);
    };

    window.addEventListener("popstate", handlePopState);
    
    // Check initial URL parameters for deep links
    const params = new URLSearchParams(window.location.search);
    const productQuery = params.get("product");
    const pageQuery = params.get("page");
    
    if (productQuery) {
      setSelectedProductId(Number(productQuery));
    }
    if (pageQuery) {
      setCurrentPage(pageQuery);
    }
    
    // Set initial state
    if (!window.history.state) {
      window.history.replaceState({ 
        page: pageQuery || "home", 
        productId: productQuery ? Number(productQuery) : null,
        deepLinked: true
      }, "");
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // History sync hook 2: Push/Replace history states when React state changes
  useEffect(() => {
    if (isPopStateRef.current) return;

    const currentHistoryState = window.history.state;
    const targetPage = currentPage;
    const targetProductId = selectedProductId;

    // Check if history state is already in sync to avoid duplicate updates
    if (currentHistoryState && 
        currentHistoryState.page === targetPage && 
        currentHistoryState.productId === targetProductId) {
      return;
    }

    let newUrl = "/";
    if (targetProductId !== null) {
      newUrl = `?product=${targetProductId}`;
    } else if (targetPage === "admin") {
      newUrl = "?page=admin";
    }

    // Push state when entering product details or admin portal.
    // Replace state when scrolling storefront sections to keep history stack clean.
    const shouldPush = (targetProductId !== null) || (targetPage === "admin");

    if (shouldPush) {
      window.history.pushState({ page: targetPage, productId: targetProductId }, "", newUrl);
    } else {
      window.history.replaceState({ page: targetPage, productId: targetProductId }, "", newUrl);
    }
  }, [currentPage, selectedProductId]);

  // History sync hook 3: Smooth scroll-back effect when exiting product details page
  useEffect(() => {
    if (selectedProductId === null && currentPage !== "admin") {
      // Small timeout to allow component rendering before scrolling
      setTimeout(() => {
        const element = document.getElementById(currentPage);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [selectedProductId]);

  // Synchronization Hooks
  useEffect(() => {
    localStorage.setItem("sai_trends_products", JSON.stringify(productsList));
  }, [productsList]);

  useEffect(() => {
    localStorage.setItem("sai_trends_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("sai_trends_lookbook", JSON.stringify(lookbook));
  }, [lookbook]);

  // 6. Scroll Spy Hook: Highlights the active section in the Navbar as the user scrolls the page
  useEffect(() => {
    // Scroll Spy should only run on the main single-page view, not on ProductDetails or Admin
    if (selectedProductId !== null || currentPage === "admin") {
      return;
    }

    const sections = ["home", "collection", "about", "contact"];
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // If a section occupies the viewport near the center, set it as the current active page
        if (entry.isIntersecting) {
          setCurrentPage(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null, // relative to the browser viewport
      rootMargin: "-45% 0px -45% 0px", // Trigger when the section borders pass the center
      threshold: 0 // trigger as soon as it enters
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer on unmount or view change
    return () => {
      observer.disconnect();
    };
  }, [selectedProductId, currentPage, productsList]);

  // --- CRUD STATE HANDLERS ---

  const handleAddProduct = (newProduct) => {
    const nextId = productsList.length > 0 
      ? Math.max(...productsList.map(p => p.id)) + 1 
      : 1;
    const productWithId = { ...newProduct, id: nextId };
    setProductsList([productWithId, ...productsList]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProductsList(
      productsList.map((product) => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = (id) => {
    setProductsList(productsList.filter((product) => product.id !== id));
    if (selectedProductId === id) {
      setSelectedProductId(null);
    }
  };

  const handleUpdatePasscode = (newPasscode) => {
    setAdminPasscode(newPasscode);
    localStorage.setItem("sai_trends_admin_passcode", newPasscode);
  };

  // Helper to view a specific product's details (with randomized loader delay of 0.8s)
  const handleSelectProduct = (id) => {
    const showLoader = Math.random() < 0.6; // 60% chance of showing the loader
    console.log("[Sai Trends Debug] handleSelectProduct clicked. ID:", id, "showLoader:", showLoader);
    if (showLoader) {
      setIsNavigating(true);
      console.log("[Sai Trends Debug] Loader activated, setting timeout of 800ms");
      setTimeout(() => {
        console.log("[Sai Trends Debug] Timeout completed. Setting selectedProductId to:", id);
        setSelectedProductId(id);
        setIsNavigating(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 800); // 800ms loading delay (0.5s - 1s)
    } else {
      console.log("[Sai Trends Debug] Transitioning immediately. Setting selectedProductId to:", id);
      setSelectedProductId(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Helper function to render active page content based on React state
  const renderActivePage = () => {
    // If a product details is selected, show ProductDetails page first (full-page view)
    if (selectedProductId !== null) {
      return (
        <ProductDetails
          productId={selectedProductId}
          products={productsList}
          setActivePage={setCurrentPage}
          setSelectedProductId={setSelectedProductId}
        />
      );
    }

    // If active page is admin, show Admin Portal (full-page view)
    if (currentPage === "admin") {
      return (
        <Admin
          products={productsList}
          adminPasscode={adminPasscode}
          onUpdatePasscode={handleUpdatePasscode}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          setActivePage={setCurrentPage}
          lookbook={lookbook}
          onUpdateLookbook={setLookbook}
        />
      );
    }

    // Default: Render all sections stacked vertically (One-Page Scroll)
    return (
      <div className="flex flex-col">
        {/* Section 1: Home */}
        <section id="home">
          <Home
            products={productsList}
            setActivePage={setCurrentPage}
            onSelectProduct={handleSelectProduct}
            lookbook={lookbook}
          />
        </section>

        {/* Section 2: Collection */}
        <section id="collection">
          <Collection
            products={productsList}
            onSelectProduct={handleSelectProduct}
          />
        </section>

        {/* Section 3: About */}
        <section id="about">
          <About
            setActivePage={setCurrentPage}
          />
        </section>

        {/* Section 4: Contact */}
        <section id="contact">
          <Contact />
        </section>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-charcoal-700 text-charcoal-500 dark:text-white transition-colors duration-300">
      {/* Header Navigation */}
      <Navbar
        activePage={currentPage}
        setActivePage={setCurrentPage}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Page Content */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setCurrentPage}
        setSelectedProductId={setSelectedProductId}
      />

      {/* Full-Screen Page Transition Loader */}
      {isNavigating && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 dark:bg-charcoal-700/90 backdrop-blur-md animate-fade-in transition-all duration-300">
          <div className="relative flex items-center justify-center">
            {/* Glowing golden backdrop */}
            <div className="absolute w-32 h-32 bg-gold-400/20 dark:bg-gold-500/15 rounded-full blur-xl animate-pulse -z-10" />
            
            {/* Custom spinner outer ring */}
            <div className="w-20 h-20 border-2 border-gold-200/30 dark:border-gold-800/30 border-t-gold-500 dark:border-t-gold-400 rounded-full animate-spin shadow-[0_0_15px_rgba(184,134,11,0.15)]" />
            
            {/* Center pulsing brand logo with a distinct gold glow */}
            <div className="absolute w-12 h-12 rounded-full overflow-hidden border border-gold-400 shadow-[0_0_15px_rgba(184,134,11,0.45)] dark:shadow-[0_0_20px_rgba(211,178,102,0.55)] animate-pulse bg-white">
              <img src={logoImg} alt="Sai Trends Loader" className="w-full h-full object-cover scale-110" />
            </div>
          </div>
          <p className="mt-4 text-xs font-display tracking-widest text-gold-600 dark:text-gold-450 uppercase font-bold animate-pulse drop-shadow-[0_2px_8px_rgba(184,134,11,0.3)]">
            Sai Trends
          </p>
        </div>
      )}

      {/* Full-Screen Landing Introduction Screen */}
      {showIntro && (
        <div 
          className={`fixed inset-0 z-[9999] bg-[#070707] transition-all duration-500 ease-in-out ${
            introFadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            flexDirection: "column"
          }}
        >
          {/* Subtle Ambient Golden Glow Behind the Logo */}
          <div className="absolute w-72 h-72 bg-gold-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
          
          {/* Centered Brand Logo with Slow Glow & Fade-in Animation */}
          <div className="animate-intro-logo w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center border-2 border-gold-400 overflow-hidden select-none p-2.5">
            <img src={logoImg} alt="Sai Trends Brand Logo" className="w-full h-full object-contain scale-100" />
          </div>

          {/* Title and Subtitle Animation (Slow Glow Fade-in and Fade-out) */}
          <div className="mt-8 select-none w-full flex flex-col items-center justify-center px-4" style={{ textAlign: "center" }}>
            <h1 
              className="animate-intro-text text-3xl sm:text-4xl font-display font-bold tracking-[0.3em] mr-[-0.3em] text-white"
              style={{ textAlign: "center" }}
            >
              SAI TRENDS
            </h1>
            <p 
              className="animate-intro-subtitle text-[10px] sm:text-xs uppercase tracking-[0.4em] mr-[-0.4em] text-gold-300 font-semibold font-sans mt-3"
              style={{ textAlign: "center" }}
            >
              Made for Modern Men
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
