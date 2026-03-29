import { useEffect, useState, useMemo } from "react";
import { FaWhatsapp, FaViber, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [detailData, setDetailData] = useState(null);
  const [showMap, setShowMap] = useState(false); // Optimization: Delay iframe mount

  const LogoUrl = window.Logo_Url;
  const domain = window.API_BASE_URL;
  const detailAPI = `${domain}api/other-details/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(detailAPI, {
          method: "GET",
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
          },
        });
        const data = await response.json();
        setDetailData(Array.isArray(data) ? data[0] : data);
        
        // Delay map rendering by 500ms to let the main UI breathe
        setTimeout(() => setShowMap(true), 500);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [detailAPI]);

  // Memoize parsing to prevent regex running on every re-render
  const mapUrls = useMemo(() => {
    if (!detailData?.location) return { src: null, link: "#" };
    const match = detailData.location.match(/src="([^"]+)"/);
    const src = match ? match[1] : null;
    const link = src ? src.replace("/embed", "") : "#";
    return { src, link };
  }, [detailData?.location]);

  return (
    <section className="w-full min-h-screen relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gray-800">
        {showMap && mapUrls.src ? (
          <iframe
            title="map"
            loading="lazy"
            src={mapUrls.src}
            className="w-full h-full border-0 opacity-80 transition-opacity duration-1000"
          ></iframe>
        ) : (
          <div className="w-full h-full animate-pulse bg-gray-800" />
        )}
      </div>

      {/* 🌫️ DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10"></div>

      {/* 📦 CONTENT WRAPPER */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 md:justify-end md:pr-10 lg:pr-24">
        
        {/* 📦 CARD */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center transition-all duration-500 transform scale-100">
          <img
            src={LogoUrl}
            alt="Logo"
            loading="eager"
            className="w-48 object-contain mx-auto mb-6"
          />

          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Get In Touch</h1>
          <p className="text-gray-500 mb-8 text-sm">
            Have questions? We&apos;re just a click away.
          </p>

          {detailData ? (
            <div className="space-y-4">
              <a
                href={`tel:+977${detailData.contact}`}
                className="flex items-center justify-center gap-3 w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-colors"
              >
                <FaPhone className="text-sm" /> Call Now
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/977${detailData.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  <FaWhatsapp className="text-xl" /> WhatsApp
                </a>

                <a
                  href={`viber://chat?number=977${detailData.viber}`}
                  className="flex items-center justify-center gap-2 bg-[#7360f2] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  <FaViber className="text-xl" /> Viber
                </a>
              </div>

              <a
                href={mapUrls.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full border-2 border-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                <FaMapMarkerAlt className="text-red-500" /> View on Google Maps
              </a>
              
              <div className="pt-4 border-t border-gray-50 text-xs text-gray-400 flex justify-between">
                 <span>{detailData.contact}</span>
                 <span>{detailData.whatsapp && "Available 24/7"}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-pulse">
              <div className="h-14 bg-gray-100 rounded-xl"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-12 bg-gray-100 rounded-xl"></div>
                <div className="h-12 bg-gray-100 rounded-xl"></div>
              </div>
              <div className="h-14 bg-gray-100 rounded-xl"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;