/**
 * Sai Trends - Mock Products Data
 * 
 * This file serves as the database for our clothing store website.
 * Each product has basic info (id, name, price, category), design assets (images),
 * details (description, available sizes), and flags like 'featured' to showcase on the home page.
 * 
 * Beginner Tip: To add or edit a product, simply update this array.
 */

export const products = [
  {
    id: 1,
    name: "Classic White Linen Shirt",
    price: 1899,
    originalPrice: 2499,
    category: "Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
    description: "Crafted from 100% premium Belgian linen, this classic white shirt offers unmatched breathability and a relaxed yet refined look. Features a clean mandarin collar, standard buttoned cuffs, and a curved hem. Perfect for hot summers and casual evening outings.",
    featured: true,
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Slim-Fit Charcoal Blazer",
    price: 4999,
    originalPrice: 6999,
    category: "Suits & Blazers",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    description: "A tailored slim-fit blazer in dark charcoal gray, designed to elevate your formal and semi-formal wear. Made from a premium wool-blend fabric with a soft inner lining, double vents, notch lapels, and custom brass-look button details. It pairs perfectly with chinos or dark denim.",
    featured: true,
    tag: "Premium Accent"
  },
  {
    id: 3,
    name: "Classic Navy Chino Trousers",
    price: 1499,
    originalPrice: 1999,
    category: "Trousers",
    sizes: ["30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80",
    description: "Constructed with mid-weight stretch cotton twill, these chinos deliver premium comfort and long-lasting durability. Featuring a mid-rise fit, flat front, side slip pockets, and a neat tapered silhouette. Pre-washed for a soft feel and zero shrinkage.",
    featured: false,
    tag: "Essential"
  },
  {
    id: 4,
    name: "Premium Merino Knit Sweater",
    price: 2799,
    originalPrice: 3599,
    category: "Sweaters",
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=800&auto=format&fit=crop&q=80",
    description: "Experience absolute luxury with this crewneck knit sweater made from ultra-soft Merino wool. Features a delicate ribbed knit pattern along the collar, hem, and cuffs. Lightweight yet insulating, making it an ideal layer over button-down shirts.",
    featured: true,
    tag: "Trending"
  },
  {
    id: 5,
    name: "Everyday Charcoal Crewneck Tee",
    price: 799,
    originalPrice: 999,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    description: "A wardrobe staple made from premium 100% combed cotton. Features a heavy-weight ribbed neckline, double-needle stitching, and a tailored chest drape. Designed to look polished even after dozens of washes.",
    featured: false,
    tag: "Essential"
  },
  {
    id: 6,
    name: "Gold-Accent Black Bomber Jacket",
    price: 3499,
    originalPrice: 4599,
    category: "Jackets",
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80",
    description: "A stunning modern take on the classic flight jacket. Features a clean matte black water-resistant outer shell with subtle luxury gold-zipper accents and hardware. Ribbed collar, cuffs, and hem keep you warm while maintaining a sleek, modern streetwear silhouette.",
    featured: true,
    tag: "Signature Piece"
  },
  {
    id: 7,
    name: "Vintage Indigo Denim Jacket",
    price: 2499,
    originalPrice: 3299,
    category: "Jackets",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    description: "Built from heavy-duty organic denim, this trucker jacket features a faded vintage wash. Includes classic chest button pockets, welt side pockets, and adjustable waist tabs. The perfect outer layer that only gets better with age.",
    featured: false,
    tag: "Classic"
  },
  {
    id: 8,
    name: "Premium Khaki Cargo Pants",
    price: 1699,
    originalPrice: 2299,
    category: "Trousers",
    sizes: ["30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=800&auto=format&fit=crop&q=80",
    description: "Practicality meets high-street style. These cargo pants are cut in a relaxed tapered fit from durable ripstop cotton. Equipped with flat-lay side cargo pockets, button closures, and utility detailing. Ideal for street style and weekend adventures.",
    featured: false,
    tag: "New Arrival"
  },
  {
    id: 9,
    name: "Tailored Royal Oxford Shirt",
    price: 1999,
    originalPrice: 2799,
    category: "Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=800&auto=format&fit=crop&q=80",
    description: "Woven in premium Royal Oxford weave, this dress shirt features a unique textured finish that is thick yet breathable. Cut in a modern slim-fit with a semi-spread collar, single cuffs, and elegant pearl-colored buttons. Suitable for boardrooms or weddings.",
    featured: false,
    tag: "Formal Elite"
  },
  {
    id: 10,
    name: "Tan Leather Cafe Racer Jacket",
    price: 5999,
    originalPrice: 7999,
    category: "Jackets",
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80",
    description: "An absolute masterpiece. Crafted from supple genuine sheepskin leather, this tan café racer jacket features a snap tab collar, zipped pockets, and diamond-stitched shoulder panels. A timeless investment in style.",
    featured: false,
    tag: "Luxury Accent"
  }
];
