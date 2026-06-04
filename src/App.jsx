import React, { useState, useEffect } from "react";
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

/**
 * Main App Component
 * 
 * Root component of the Sai Trends application. Handles page navigation,
 * local storage synchronization, product CRUD state, passcode settings,
 * and single-page scroll behavior with an active Scroll Spy.
 */
function App() {
  // 1. State for active navbar highlighting ('home', 'collection', 'about', 'contact', 'admin')
  const [currentPage, setCurrentPage] = useState("home");
  
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

  // Helper to view a specific product's details
  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    </div>
  );
}

export default App;
