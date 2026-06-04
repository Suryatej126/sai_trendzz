import React, { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";

/**
 * Collection Page Component
 * 
 * Props:
 * - products: Dynamic list of products passed from App state
 * - onSelectProduct: Callback function to open a specific product's details page
 */
export default function Collection({ products, onSelectProduct }) {
  // 1. State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // 2. State for sorting choice ('default', 'price-low-high', 'price-high-low')
  const [sortBy, setSortBy] = useState("default");
  
  // 3. State for search keyword
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically extract unique categories from products, adding "All" at the beginning
  const categories = useMemo(() => {
    const list = new Set(products.map((item) => item.category));
    return ["All", ...Array.from(list)];
  }, []);

  // Filter and sort products based on selected states
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category if a specific one is selected
    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by Search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Sort products
    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-white dark:bg-charcoal-700 min-h-screen py-6 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading & Header */}
        <div className="border-b border-charcoal-100 dark:border-charcoal-600 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold-600 font-bold mb-1">
              Browse Entire Catalog
            </p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-500 dark:text-white">
              Men's Collection
            </h1>
          </div>
          
          {/* Total Product Count display */}
          <p className="text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-semibold">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-6 mb-12">
          
          {/* Filter, Search & Sort Panel */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-charcoal-50 dark:bg-charcoal-800 p-4 border border-charcoal-100 dark:border-charcoal-600 rounded-sm transition-colors">
            
            {/* Search Input bar */}
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-charcoal-700 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white placeholder-charcoal-300 dark:placeholder-charcoal-400 text-xs px-4 py-2.5 pl-9 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 font-sans"
              />
              {/* Search Icon */}
              <span className="absolute left-3 top-3 text-xs text-charcoal-300 dark:text-charcoal-400">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-[10px] text-charcoal-400 dark:text-charcoal-300 hover:text-charcoal-500 dark:hover:text-white font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sorting Dropdown list */}
            <div className="flex items-center space-x-2 self-end md:self-auto">
              <label htmlFor="sort" className="text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                Sort By:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-charcoal-700 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 font-sans font-semibold cursor-pointer"
              >
                <option value="default">Featured & Latest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto border-b border-charcoal-50 dark:border-charcoal-700/50">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs uppercase tracking-widest font-semibold px-5 py-2.5 border rounded-sm whitespace-nowrap transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-gold-500 border-gold-500 text-white shadow-[0_4px_20px_rgba(184,134,11,0.4)]"
                    : "bg-white dark:bg-charcoal-700 border-charcoal-100 dark:border-charcoal-600 text-charcoal-400 dark:text-charcoal-200 hover:border-gold-400 dark:hover:border-gold-400 hover:text-gold-500 dark:hover:text-gold-400 hover:shadow-[0_4px_15px_rgba(184,134,11,0.15)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          // Empty State view when no products match filters
          <div className="text-center py-20 border border-dashed border-charcoal-100 dark:border-charcoal-600 bg-charcoal-50/50 dark:bg-charcoal-800/40 rounded-sm">
            <span className="text-4xl block mb-4">👔</span>
            <h3 className="text-lg font-display font-bold text-charcoal-500 dark:text-white mb-1">
              No products found
            </h3>
            <p className="text-sm text-charcoal-400 dark:text-charcoal-300 max-w-xs mx-auto mb-6">
              We couldn't find anything matching your filters or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setSortBy("default");
              }}
              className="px-5 py-2 bg-charcoal-500 text-white text-xs uppercase tracking-wider font-bold hover:bg-gold-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
