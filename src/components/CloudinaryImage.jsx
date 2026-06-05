import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

// Initialize Cloudinary instance using environment variable or fallback to provided cloud name
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dtrkppnvt";
const cld = new Cloudinary({ cloud: { cloudName } });

/**
 * CloudinaryImage Component
 * 
 * Automatically detects whether the `src` string is a Cloudinary public ID
 * or a standard HTTP/HTTPS/local path URL.
 * 
 * If it's a Cloudinary public ID, it renders the optimized image with lazy loading,
 * auto-format, and auto-quality transformation.
 * If dimensions (width/height) are provided, it performs a smart responsive crop/resize.
 * 
 * Otherwise, it falls back to a standard <img> tag.
 */
export default function CloudinaryImage({ src, alt, className, width, height, ...props }) {
  if (!src) return null;

  // Check if the source is a public ID vs. a full URL/local path
  const isPublicId = !src.startsWith("http://") && 
                     !src.startsWith("https://") && 
                     !src.startsWith("/") && 
                     !src.startsWith("data:");

  if (isPublicId) {
    try {
      let img = cld.image(src)
        .format("auto")
        .quality("auto");

      // Apply dimensions if supplied
      if (width && height) {
        img = img.resize(auto().gravity(autoGravity()).width(width).height(height));
      } else if (width) {
        img = img.resize(auto().width(width));
      } else if (height) {
        img = img.resize(auto().height(height));
      }

      return (
        <AdvancedImage 
          cldImg={img} 
          className={className} 
          alt={alt} 
          {...props} 
        />
      );
    } catch (error) {
      console.error("[Sai Trends Cloudinary] Image transformation failed:", error);
    }
  }

  // Fallback to standard img tag for external web address URLs or local assets
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      loading="lazy" 
      {...props} 
    />
  );
}
