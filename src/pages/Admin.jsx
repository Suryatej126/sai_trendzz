import React, { useState, useMemo, useEffect } from "react";

/**
 * Admin Page Component
 * 
 * Props:
 * - products: Dynamic product array passed from global state
 * - adminPasscode: Current admin passcode state
 * - onUpdatePasscode: Callback function to update the admin passcode
 * - onAddProduct: Function to insert a new product
 * - onUpdateProduct: Function to save edits to an existing product
 * - onDeleteProduct: Function to remove a product
 * - setActivePage: Function to switch current active page
 * - lookbook: Current lookbook content state
 * - onUpdateLookbook: Function to save lookbook changes
 */
export default function Admin({ 
  products, 
  adminPasscode, 
  onUpdatePasscode, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct, 
  setActivePage,
  lookbook,
  onUpdateLookbook
}) {
  
  // --- AUTHENTICATION STATES ---
  const [passcode, setPasscode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState("");

  // --- PASSCODE CHANGE STATES ---
  const [currentPasscode, setCurrentPasscode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmNewPasscode, setConfirmNewPasscode] = useState("");
  const [passcodeSuccess, setPasscodeSuccess] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  // --- CRUD & FORM STATES ---
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Individual form input states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("Shirts");
  const [customCategory, setCustomCategory] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [featured, setFeatured] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState(["M", "L", "XL"]);
  
  // Search state inside the admin catalog table list
  const [adminSearch, setAdminSearch] = useState("");

  // --- CLOUDINARY UPLOAD STATE & HANDLER ---
  const [uploadingState, setUploadingState] = useState({
    image: false,
    image2: false,
    image3: false
  });

  const handleCloudinaryUpload = async (e, fieldName, setFieldVal) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too large. Maximum size allowed is 10MB.");
      return;
    }

    setUploadingState(prev => ({ ...prev, [fieldName]: true }));

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dtrkppnvt";
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default";
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || "Upload failed");
      }

      const data = await response.json();
      setFieldVal(data.public_id);
    } catch (err) {
      console.error("[Sai Trends Cloudinary] Upload error:", err);
      alert(`Cloudinary Upload Failed: ${err.message}\n\nPlease ensure you have created an Unsigned Upload Preset in your Cloudinary Settings, and configured it in your .env.local file as VITE_CLOUDINARY_UPLOAD_PRESET.`);
    } finally {
      setUploadingState(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  // All sizes options for selection checklist
  const allSizesList = ["S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
  
  // Available standard categories list
  const defaultCategoriesList = ["Shirts", "T-Shirts", "Jackets", "Trousers", "Suits & Blazers", "Sweaters", "Footwear"];

  // --- LOOKBOOK EDIT STATES ---
  const [lbHeading, setLbHeading] = useState(lookbook ? lookbook.heading : "");
  const [lbDescription, setLbDescription] = useState(lookbook ? lookbook.description : "");
  const [lbImage1, setLbImage1] = useState(lookbook ? lookbook.image1 : "");
  const [lbImage2, setLbImage2] = useState(lookbook ? lookbook.image2 : "");

  useEffect(() => {
    if (lookbook) {
      setLbHeading(lookbook.heading);
      setLbDescription(lookbook.description);
      setLbImage1(lookbook.image1);
      setLbImage2(lookbook.image2);
    }
  }, [lookbook]);

  const handleLookbookSubmit = (e) => {
    e.preventDefault();
    onUpdateLookbook({
      heading: lbHeading.trim(),
      description: lbDescription.trim(),
      image1: lbImage1.trim(),
      image2: lbImage2.trim()
    });
    alert("Season Lookbook updated successfully!");
  };

  // --- HANDLERS & COMPUTATIONS ---

  // Handle Passcode verification login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passcode === adminPasscode) {
      setIsLoggedIn(true);
      setAuthError("");
      setPasscode("");
    } else {
      setAuthError("Incorrect passcode. Please try again.");
    }
  };

  // Handle passcode change submission
  const handlePasscodeChangeSubmit = (e) => {
    e.preventDefault();
    setPasscodeError("");
    setPasscodeSuccess("");

    // Validation checks
    if (currentPasscode !== adminPasscode) {
      setPasscodeError("Current passcode is incorrect.");
      return;
    }
    if (newPasscode.length < 4) {
      setPasscodeError("New passcode must be at least 4 characters long.");
      return;
    }
    if (newPasscode !== confirmNewPasscode) {
      setPasscodeError("New passcodes do not match.");
      return;
    }

    // Update passcode globally
    onUpdatePasscode(newPasscode);
    setPasscodeSuccess("Passcode updated successfully!");
    
    // Clear inputs
    setCurrentPasscode("");
    setNewPasscode("");
    setConfirmNewPasscode("");

    // Hide success alert after 4 seconds
    setTimeout(() => {
      setPasscodeSuccess("");
    }, 4000);
  };

  // Compute Dashboard stats metrics dynamically
  const stats = useMemo(() => {
    const totalCount = products.length;
    const totalVal = products.reduce((sum, item) => sum + Number(item.price), 0);
    const featuredCount = products.filter(item => item.featured).length;
    return { totalCount, totalVal, featuredCount };
  }, [products]);

  // Filter products for the admin table search
  const searchedProducts = useMemo(() => {
    if (!adminSearch.trim()) return products;
    const query = adminSearch.toLowerCase();
    return products.filter(
      p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
  }, [products, adminSearch]);

  // Toggle size selection checkboxes
  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Reset form inputs back to default blank states
  const resetForm = () => {
    setName("");
    setPrice("");
    setOriginalPrice("");
    setCategory("Shirts");
    setCustomCategory("");
    setImage("");
    setImage2("");
    setImage3("");
    setDescription("");
    setTag("");
    setFeatured(false);
    setSelectedSizes(["M", "L", "XL"]);
    setEditingProduct(null);
  };

  // Populate the form fields with an existing product's data to initiate Edit Mode
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setOriginalPrice(product.originalPrice || "");
    
    if (defaultCategoriesList.includes(product.category)) {
      setCategory(product.category);
      setCustomCategory("");
    } else {
      setCategory("Custom");
      setCustomCategory(product.category);
    }
    
    setImage(product.image);
    setImage2(product.image2 || "");
    setImage3(product.image3 || "");
    setDescription(product.description);
    setTag(product.tag || "");
    setFeatured(product.featured || false);
    setSelectedSizes(product.sizes || []);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  // Handles both Add and Update actions on submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !image || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    if (selectedSizes.length === 0) {
      alert("Please select at least one available size.");
      return;
    }

    const finalCategory = category === "Custom" ? customCategory.trim() : category;
    if (!finalCategory) {
      alert("Please specify a category.");
      return;
    }

    const productPayload = {
      name: name.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category: finalCategory,
      sizes: selectedSizes,
      image: image.trim(),
      image2: image2.trim() || null,
      image3: image3.trim() || null,
      description: description.trim(),
      featured: featured,
      tag: tag.trim() || null
    };

    if (editingProduct) {
      onUpdateProduct({ ...productPayload, id: editingProduct.id });
      alert(`"${name}" updated successfully!`);
    } else {
      onAddProduct(productPayload);
      alert(`"${name}" added to catalog successfully!`);
    }

    resetForm();
  };

  // Handle product deletion with prompt
  const handleDeleteClick = (id, productName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${productName}" from the store catalog?`);
    if (confirmDelete) {
      onDeleteProduct(id);
    }
  };

  // Indian Rupee formatting helper
  const formatPrice = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  };

  // --- RENDER 1: PASSCODE SCREEN (IF NOT LOGGED IN) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-charcoal-50 dark:bg-charcoal-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-charcoal-700 p-8 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-4xl">🔑</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-500 dark:text-white">
              Admin Portal
            </h2>
            <p className="text-xs uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
              Access Restricted
            </p>
          </div>
          
          {authError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/55 text-red-700 dark:text-red-300 text-xs rounded-sm text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="passcode" className="sr-only">Enter Passcode</label>
              <input
                id="passcode"
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Admin Passcode"
                className="w-full text-center tracking-widest text-lg font-sans bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white px-4 py-3 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-charcoal-500 hover:bg-gold-500 text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors rounded-sm"
            >
              Verify Passcode
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setActivePage("home")}
              className="text-xs text-charcoal-400 dark:text-charcoal-300 hover:text-gold-500 underline cursor-pointer"
            >
              Back to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER 2: MAIN DASHBOARD VIEW (IF LOGGED IN) ---
  return (
    <div className="bg-charcoal-50 dark:bg-charcoal-800 min-h-screen py-6 md:py-10 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-charcoal-200 dark:border-charcoal-600 pb-6 mb-8 gap-4 bg-white dark:bg-charcoal-700 p-4 sm:p-6 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-500 dark:text-white">
              Sai Trends Dashboard
            </h1>
            <p className="text-xs text-charcoal-400 dark:text-charcoal-300 font-bold uppercase tracking-wider mt-1">
              Store Control Panel
            </p>
          </div>
          
          <div className="flex space-x-3 self-end sm:self-auto">
            <button
              onClick={() => {
                setActivePage("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-4 py-2 border border-charcoal-200 dark:border-charcoal-500 hover:border-gold-400 dark:hover:border-gold-400 text-charcoal-400 dark:text-charcoal-200 hover:text-gold-500 dark:hover:text-gold-400 text-xs uppercase tracking-wider font-semibold bg-white dark:bg-charcoal-600 rounded-sm transition-colors cursor-pointer"
            >
              Go to Store
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 bg-charcoal-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-750 text-white text-xs uppercase tracking-wider font-bold rounded-sm transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white dark:bg-charcoal-700 p-6 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-sm flex items-center space-x-4">
            <span className="text-3xl p-3 bg-gold-50 dark:bg-gold-900/20 text-gold-500 rounded-sm">📦</span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">Total Products</p>
              <h3 className="text-2xl font-bold text-charcoal-500 dark:text-white">{stats.totalCount} items</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-charcoal-700 p-6 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-sm flex items-center space-x-4">
            <span className="text-3xl p-3 bg-gold-50 dark:bg-gold-900/20 text-gold-500 rounded-sm">💰</span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">Total Catalog Value</p>
              <h3 className="text-2xl font-bold text-charcoal-500 dark:text-white">{formatPrice(stats.totalVal)}</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-charcoal-700 p-6 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-sm flex items-center space-x-4">
            <span className="text-3xl p-3 bg-gold-50 dark:bg-gold-900/20 text-gold-500 rounded-sm">⭐</span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">Featured on Home</p>
              <h3 className="text-2xl font-bold text-charcoal-500 dark:text-white">{stats.featuredCount} products</h3>
            </div>
          </div>

        </div>

        {/* Main Panel - Form & Catalog Table split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Forms Column (Product form + Password settings form) (Spans 5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. Add/Edit Product Form */}
            <div className="bg-white dark:bg-charcoal-700 p-6 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-charcoal-100 dark:border-charcoal-600 pb-3 flex justify-between items-center">
                <h2 className="text-lg font-display font-bold text-charcoal-500 dark:text-white">
                  {editingProduct ? "Edit Product Details" : "Add New Product"}
                </h2>
                {editingProduct && (
                  <button
                    onClick={resetForm}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Premium Denim Vest"
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                      Selling Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 1499"
                      className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="e.g. 1999"
                      className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                      Category Selection <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 cursor-pointer"
                    >
                      {defaultCategoriesList.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="Custom">Custom...</option>
                    </select>
                  </div>
                  
                  {category === "Custom" && (
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                        Enter Custom Category <span className="text-red-500">*</span>
                      </label>
                        <input
                          type="text"
                          required
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          placeholder="e.g. Shoes"
                          className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                        />
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold flex justify-between items-center">
                    <span>Image URL / Public ID <span className="text-red-500">*</span></span>
                    {uploadingState.image && <span className="text-gold-500 animate-pulse text-[9px]">Uploading...</span>}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Paste image URL or enter Cloudinary Public ID"
                      className="flex-grow bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                    />
                    <label className="shrink-0 cursor-pointer bg-charcoal-100 hover:bg-gold-500 hover:text-white text-charcoal-500 dark:bg-charcoal-600 dark:text-charcoal-200 dark:hover:bg-gold-500 dark:hover:text-white text-[11px] font-semibold px-3 py-2 border border-charcoal-100 dark:border-charcoal-500 rounded-sm flex items-center justify-center transition-colors">
                      <span>📤 Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleCloudinaryUpload(e, "image", setImage)}
                        disabled={uploadingState.image}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold flex justify-between items-center">
                      <span>Additional Image 2 URL/ID</span>
                      {uploadingState.image2 && <span className="text-gold-500 animate-pulse text-[9px]">Uploading...</span>}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                        placeholder="Optional second photo"
                        className="flex-grow bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                      />
                      <label className="shrink-0 cursor-pointer bg-charcoal-100 hover:bg-gold-500 hover:text-white text-charcoal-500 dark:bg-charcoal-600 dark:text-charcoal-200 dark:hover:bg-gold-500 dark:hover:text-white text-[11px] font-semibold px-3 py-2 border border-charcoal-100 dark:border-charcoal-500 rounded-sm flex items-center justify-center transition-colors">
                        <span>📤</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleCloudinaryUpload(e, "image2", setImage2)}
                          disabled={uploadingState.image2}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold flex justify-between items-center">
                      <span>Additional Image 3 URL/ID</span>
                      {uploadingState.image3 && <span className="text-gold-500 animate-pulse text-[9px]">Uploading...</span>}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                        placeholder="Optional third photo"
                        className="flex-grow bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                      />
                      <label className="shrink-0 cursor-pointer bg-charcoal-100 hover:bg-gold-500 hover:text-white text-charcoal-500 dark:bg-charcoal-600 dark:text-charcoal-200 dark:hover:bg-gold-500 dark:hover:text-white text-[11px] font-semibold px-3 py-2 border border-charcoal-100 dark:border-charcoal-500 rounded-sm flex items-center justify-center transition-colors">
                        <span>📤</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleCloudinaryUpload(e, "image3", setImage3)}
                          disabled={uploadingState.image3}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                    Product Tag Badge
                  </label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. New Arrival, Best Seller (optional)"
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                    Select Available Sizes <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allSizesList.map((size) => {
                      const isChecked = selectedSizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeToggle(size)}
                            className={`text-xs px-2.5 py-1.5 border rounded-sm transition-all duration-150 ${
                              isChecked
                                ? "bg-charcoal-500 border-charcoal-500 dark:bg-gold-500 dark:border-gold-500 text-white font-bold"
                                : "bg-white dark:bg-charcoal-600 border-charcoal-100 dark:border-charcoal-500 text-charcoal-400 dark:text-charcoal-300 hover:border-gold-300 dark:hover:border-gold-400"
                            }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe material, fitting, washing care instructions..."
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 resize-y"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 text-gold-500 border-charcoal-100 rounded-sm focus:ring-gold-500 cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-xs text-charcoal-400 font-semibold cursor-pointer">
                    Feature this product on the Home Page
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-colors rounded-sm"
                  >
                    {editingProduct ? "Update Product Details" : "Add to Catalog"}
                  </button>
                </div>

              </form>
            </div>

            {/* 2. Change Passcode Settings Card */}
            <div className="bg-white dark:bg-charcoal-700 p-6 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-sm space-y-4">
              <div className="border-b border-charcoal-100 dark:border-charcoal-600 pb-2">
                <h2 className="text-base font-display font-bold text-charcoal-500 dark:text-white">
                  Security Settings
                </h2>
                <p className="text-[10px] text-charcoal-400 font-bold uppercase tracking-wider">
                  Update Admin Passcode
                </p>
              </div>

              {/* Status messages for password change */}
              {passcodeSuccess && (
                <div className="p-3 bg-gold-50 border border-gold-200 text-gold-800 text-xs rounded-sm text-center">
                  {passcodeSuccess}
                </div>
              )}
              {passcodeError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm text-center">
                  {passcodeError}
                </div>
              )}

              <form onSubmit={handlePasscodeChangeSubmit} className="space-y-3">
                {/* Current passcode input */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="current-pass" className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                    Current Passcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="current-pass"
                    type="password"
                    required
                    value={currentPasscode}
                    onChange={(e) => setCurrentPasscode(e.target.value)}
                    placeholder="Enter current passcode"
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                  />
                </div>

                {/* New passcode input */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="new-pass" className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                    New Passcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="new-pass"
                    type="password"
                    required
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="Min 4 characters"
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                  />
                </div>

                {/* Confirm new passcode input */}
                <div className="flex flex-col space-y-1">
                  <label htmlFor="confirm-pass" className="text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                    Confirm New Passcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="confirm-pass"
                    type="password"
                    required
                    value={confirmNewPasscode}
                    onChange={(e) => setConfirmNewPasscode(e.target.value)}
                    placeholder="Verify new passcode"
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-2 bg-charcoal-500 hover:bg-gold-500 text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors rounded-sm"
                  >
                    Change Passcode
                  </button>
                </div>
              </form>
            </div>

            {/* 3. Lookbook Settings Card */}
            <div className="bg-white dark:bg-charcoal-700 p-6 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-sm space-y-4">
              <div className="border-b border-charcoal-100 dark:border-charcoal-600 pb-2">
                <h2 className="text-base font-display font-bold text-charcoal-500 dark:text-white">
                  Lookbook Settings
                </h2>
                <p className="text-[10px] text-charcoal-400 dark:text-charcoal-300 font-bold uppercase tracking-wider">
                  Update Season Lookbook Content
                </p>
              </div>

              <form onSubmit={handleLookbookSubmit} className="space-y-3">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="lb-heading" className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                    Lookbook Heading <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lb-heading"
                    type="text"
                    required
                    value={lbHeading}
                    onChange={(e) => setLbHeading(e.target.value)}
                    placeholder="Enter heading"
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="lb-desc" className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="lb-desc"
                    required
                    rows="3"
                    value={lbDescription}
                    onChange={(e) => setLbDescription(e.target.value)}
                    placeholder="Enter lookbook description details"
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400 resize-y"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="lb-img1" className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                    Image 1 URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lb-img1"
                    type="text"
                    required
                    value={lbImage1}
                    onChange={(e) => setLbImage1(e.target.value)}
                    placeholder="Enter image 1 web address URL"
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="lb-img2" className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                    Image 2 URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lb-img2"
                    type="text"
                    required
                    value={lbImage2}
                    onChange={(e) => setLbImage2(e.target.value)}
                    placeholder="Enter image 2 web address URL"
                    className="bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-2 bg-charcoal-500 dark:bg-gold-500 hover:bg-gold-500 dark:hover:bg-gold-600 text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors rounded-sm cursor-pointer"
                  >
                    Update Lookbook
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Right Block: Catalog Table listing (Spans 7 Columns) */}
          <div className="lg:col-span-7 bg-white dark:bg-charcoal-700 p-6 border border-charcoal-100 dark:border-charcoal-600 rounded-sm shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-charcoal-100 dark:border-charcoal-600 pb-3 gap-3">
              <h2 className="text-lg font-display font-bold text-charcoal-500 dark:text-white">
                Catalog Listing
              </h2>
              
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full bg-white dark:bg-charcoal-600 border border-charcoal-100 dark:border-charcoal-500 text-charcoal-500 dark:text-white text-xs px-3 py-2 pl-8 rounded-sm focus:outline-none focus:border-gold-500 dark:focus:border-gold-400"
                />
                <span className="absolute left-2.5 top-2.5 text-xs text-charcoal-300">🔍</span>
              </div>
            </div>

            {searchedProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-charcoal-100 dark:border-charcoal-600 text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-charcoal-300 font-bold">
                      <th className="pb-3 w-16">Item</th>
                      <th className="pb-3 px-4">Title & Category</th>
                      <th className="pb-3 text-right hidden sm:table-cell">Price</th>
                      <th className="pb-3 text-center hidden sm:table-cell">Status</th>
                      <th className="pb-3 text-center w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-50 dark:divide-charcoal-600 text-xs text-charcoal-500 dark:text-charcoal-200">
                    {searchedProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-charcoal-50/50 dark:hover:bg-charcoal-600/30">
                        <td className="py-4">
                          <div className="w-12 h-16 bg-charcoal-100 dark:bg-charcoal-800 rounded-sm overflow-hidden border border-charcoal-100 dark:border-charcoal-600">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        </td>
                        
                        <td className="py-4 px-4">
                          <p className="font-semibold text-charcoal-500 dark:text-white line-clamp-1">{product.name}</p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                            <span className="text-[9px] uppercase tracking-wider text-gold-600 font-bold">
                              {product.category}
                            </span>
                            <span className="text-[10px] font-bold text-charcoal-500 dark:text-charcoal-350 sm:hidden">
                              • {formatPrice(product.price)}
                            </span>
                          </div>
                        </td>
                        
                        <td className="py-4 text-right hidden sm:table-cell">
                          <p className="font-bold">{formatPrice(product.price)}</p>
                          {product.originalPrice && (
                            <p className="text-[10px] text-charcoal-300 line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                        </td>

                        <td className="py-4 text-center hidden sm:table-cell">
                          {product.featured ? (
                            <span className="bg-gold-50 border border-gold-200 text-gold-700 text-[9px] uppercase tracking-wider font-semibold py-0.5 px-2 rounded-sm">
                              Featured
                            </span>
                          ) : (
                            <span className="text-[9px] text-charcoal-300 uppercase">
                              Standard
                            </span>
                          )}
                        </td>

                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="px-2 py-1 text-[10px] uppercase font-bold text-gold-600 border border-gold-300/40 hover:border-gold-500 rounded-sm hover:bg-gold-50 dark:hover:bg-charcoal-600/50 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(product.id, product.name)}
                              className="px-2 py-1 text-[10px] uppercase font-bold text-red-500 border border-red-200/50 hover:border-red-500 rounded-sm hover:bg-red-50 dark:hover:bg-charcoal-600/50 transition-colors"
                            >
                              Del
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 bg-charcoal-50/50 dark:bg-charcoal-800/50 border border-dashed border-charcoal-150 dark:border-charcoal-600 rounded-sm">
                <p className="text-xs text-charcoal-400 dark:text-charcoal-300">No products found in the catalog.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
