import { useState, useEffect } from "react";

const Footer = () => {
  const [detail, setDetails] = useState(null);
  
  // FIX: Added a fallback domain to prevent 'undefined' URL errors
  const domain = window.API_BASE_URL || "http://127.0.0.1:8000/";
  const API_URL = `${domain}api/other-details/`;

  useEffect(() => {
    const fetchOtherDetails = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Optimized: Only send Auth header if token exists
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          // Logic to handle both list and single object responses
          const result = Array.isArray(data) ? data[0] : data;
          setDetails(result);
        }
      } catch (error) {
        console.error("Footer fetch error:", error);
      }
    };
    fetchOtherDetails();
  }, [API_URL]);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div className="flex flex-col gap-2">
            <img
              src={detail?.logo || window.Logo_Url}
              alt={detail?.site_name || "FurniVibe Logo"}
              className="w-32 mx-auto md:mx-0"
            />
            
            {detail?.email && (
              <p className="text-sm text-gray-500">{detail.email}</p>
            )}
            {detail?.contact && (
              <p className="text-sm text-gray-500">{detail.contact}</p>
            )}
          </div>

          {/* Clean Navigation */}
          <nav className="justify-center gap-x-8 gap-y-2 text-sm font-medium text-gray-600 flex flex-col ">
            <a href="/" className="hover:text-black transition-colors text-center">Home</a>
            <a href="/shop" className="hover:text-black transition-colors text-center">Shop</a>
            <a href="/portfolio" className="hover:text-black transition-colors text-center">Portfolio</a>
            <a href="/contact" className="hover:text-black transition-colors text-center">Contact</a>
          </nav>

          {/* Socials & Copyright */}
          <div className="flex flex-col md:items-end gap-2">
            <div className="flex gap-4 justify-center md:justify-end">
              {detail?.facebook && (
                <a href={detail.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 text-xs transition-colors">
                  Facebook
                </a>
              )}
              {detail?.instagram && (
                <a href={detail.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 text-xs transition-colors">
                  Instagram
                </a>
              )}
            </div>
            <p className="text-xs text-gray-400">
              &copy; {currentYear} {detail?.site_name || "FurniVibe"}. All rights reserved.
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;