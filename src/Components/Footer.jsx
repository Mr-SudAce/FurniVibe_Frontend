import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  const [detail, setDetails] = useState(null);
  
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
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        
        if (response.ok) {
          const data = await response.json();
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
    <footer className="bg-[#FCFCFC] border-t border-gray-100 pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
               <div className="w-1 h-12 bg-orange-500 rounded-full"></div>
               <img
                src={detail?.logo || window.Logo_Url}
                alt="Logo"
                className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <p className="text-gray-500 font-light leading-relaxed max-w-sm text-lg italic font-serif">
               &quot;{detail?.site_tag || "Crafting elegance for your home, one piece at a time."}&quot;
            </p>
            <div className="flex gap-4">
                {detail?.facebook && (
                    <a href={detail.facebook} target="_blank" rel="noreferrer" 
                       className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm">
                        <FaFacebookF size={14} />
                    </a>
                )}
                {detail?.instagram && (
                    <a href={detail.instagram} target="_blank" rel="noreferrer" 
                       className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm">
                        <FaInstagram size={14} />
                    </a>
                )}
                {detail?.whatsapp && (
                    <a href={`https://wa.me/${detail.whatsapp}`} target="_blank" rel="noreferrer" 
                       className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-all shadow-sm">
                        <FaWhatsapp size={14} />
                    </a>
                )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Navigation</h4>
            <nav className="flex flex-col gap-4 text-sm font-bold text-gray-600 uppercase tracking-widest">
              <a href="/" className="hover:text-orange-500 transition-colors inline-flex items-center gap-2 group">
                <span className="w-0 group-hover:w-4 h-[1px] bg-orange-500 transition-all"></span> Home
              </a>
              <a href="/shop" className="hover:text-orange-500 transition-colors inline-flex items-center gap-2 group">
                <span className="w-0 group-hover:w-4 h-[1px] bg-orange-500 transition-all"></span> Collection
              </a>
              <a href="/portfolio" className="hover:text-orange-500 transition-colors inline-flex items-center gap-2 group">
                <span className="w-0 group-hover:w-4 h-[1px] bg-orange-500 transition-all"></span> Gallery
              </a>
              <a href="/contact" className="hover:text-orange-500 transition-colors inline-flex items-center gap-2 group">
                <span className="w-0 group-hover:w-4 h-[1px] bg-orange-500 transition-all"></span> Contact
              </a>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Visit Our Showroom</h4>
            <div className="space-y-4 text-gray-500 font-light">
                {detail?.email && (
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-orange-500 text-xs" />
                        <span className="text-sm">{detail.email}</span>
                    </div>
                )}
                {detail?.contact && (
                    <div className="flex items-center gap-3">
                        <FaPhoneAlt className="text-orange-500 text-xs" />
                        <span className="text-sm font-bold text-gray-800 tracking-wider">
                            +977 {detail.contact}
                        </span>
                    </div>
                )}
                <p className="text-xs leading-loose text-gray-400 mt-4 max-w-xs">
                    Open Sunday to Friday<br/>
                    10:00 AM — 07:00 PM
                </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            &copy; {currentYear} <span className="text-gray-900">{detail?.site_name || "Om Sai Furniture"}</span>. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">
             <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
             <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;