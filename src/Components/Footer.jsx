import { useState, useEffect } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import * as index from "../index.jsx";

const Footer = () => {
  const [detail, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
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
      } finally {
        setIsLoading(false); // Stop loading regardless of success/error
      }
    };
    fetchOtherDetails();
  }, [API_URL]);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FCFCFC] border-t border-gray-100 pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Logo & Tagline Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-[var(--primary-color)] rounded-full"></div>
              {isLoading ? (
                <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <img
                  src={detail?.site_logo || window.Logo_Url}
                  alt="Logo"
                  className="h-10 object-contain hover:grayscale-0 transition-all duration-500"
                />
              )}
            </div>
            
            <div className="max-w-sm">
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-full"></div>
                  <div className="h-3 bg-gray-100 animate-pulse rounded w-2/3"></div>
                </div>
              ) : (
                <p className="text-gray-500 font-light leading-relaxed text-sm italic font-serif">
                  &quot;
                  {detail?.site_tag || "Crafting elegance for your home, one piece at a time."}
                  &quot;
                </p>
              )}
            </div>
            
            <div className="flex gap-4 text-gray-400">
              <index.SocialBar />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              Quicks Links
            </h4>
            <nav className="flex flex-col gap-4 text-sm font-bold text-gray-600 uppercase tracking-widest">
              {["Home", "Collection", "Gallery", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-[var(--primary-color)] transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-[var(--primary-color)] transition-all"></span>
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              Visit Our Showroom
            </h4>
            <div className="space-y-4 text-gray-500 font-light">
              {/* Email Skeleton */}
              {isLoading ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-40"></div>
                </div>
              ) : detail?.email && (
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-[var(--primary-color)] text-xs" />
                  <span className="text-sm">{detail.email}</span>
                </div>
              )}

              {/* Contact Skeleton */}
              {isLoading ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-32"></div>
                </div>
              ) : detail?.contact && (
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-[var(--primary-color)] text-xs" />
                  <span className="text-sm font-bold text-gray-800 tracking-wider">
                    +977 {detail.contact}
                  </span>
                </div>
              )}

              <p className="text-xs leading-loose text-gray-400 mt-4 max-w-xs">
                Open Sunday to Friday
                <br />
                10:00 AM — 07:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            {isLoading ? (
               <div className="h-3 bg-gray-50 animate-pulse rounded w-48"></div>
            ) : (
              <p>
                &copy; {currentYear}{" "}
                <span className="text-[var(--primary-color)] ">
                  {detail?.site_name || "Site Name"}
                </span>
                . All Rights Reserved.
              </p>
            )}
          </div>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-color)]">
            <span className="hover:text-[var(--primary-color)] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[var(--primary-color)] cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;