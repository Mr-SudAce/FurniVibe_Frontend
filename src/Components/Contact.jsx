import { useEffect, useState, useMemo } from "react";
import { FaWhatsapp, FaViber, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [detailData, setDetailData] = useState(null);
  const [showMap, setShowMap] = useState(false);

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
        setTimeout(() => setShowMap(true), 500);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [detailAPI]);

  const mapUrls = useMemo(() => {
    const rawLoc = detailData?.location || "";
    
    // Scenario A: Backend sends full <iframe> tag
    if (rawLoc.includes("<iframe")) {
      const match = rawLoc.match(/src="([^"]+)"/);
      const src = match ? match[1] : null;
      return { src, link: src ? src.replace("/embed", "") : "#" };
    }
    
    // Scenario B: Backend sends plain URL (like your current data)
    if (rawLoc.startsWith("http")) {
      return { 
        // Note: Google Maps plain links don't work in iframes for security (X-Frame-Options). 
        // We only use it as 'src' if it looks like an embeddable link.
        src: rawLoc.includes("google.com/maps/embed") ? rawLoc : null, 
        link: rawLoc 
      };
    }

    return { src: null, link: "#" };
  }, [detailData?.location]);

  return (
    <section className="w-full min-h-screen relative bg-[#FCFCFC] overflow-hidden">
      {/* 🗺️ FULLSCREEN BACKGROUND MAP */}
      <div className="absolute inset-0 z-0 grayscale contrast-125 opacity-40">
        {showMap && mapUrls.src ? (
          <iframe
            title="map"
            loading="lazy"
            src={mapUrls.src}
            className="w-full h-full border-0 transition-opacity duration-1000"
          ></iframe>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
             {/* Fallback if src is not embeddable */}
             <div className="text-gray-800 flex flex-col items-center gap-2">
                <FaMapMarkerAlt className="text-4xl" />
                <p className="text-[10px] uppercase tracking-widest font-bold">Location Preview Unavailable</p>
             </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#FCFCFC] via-[#FCFCFC]/80 to-transparent z-10"></div>

      <div className="relative z-20 flex items-center min-h-screen px-6 md:px-20 lg:px-32">
        <div className="w-full max-w-xl">
          <header className="mb-12 border-l-4 border-orange-500 pl-8">
            <span className="text-[10px] font-bold tracking-[0.4em] text-orange-500 uppercase block mb-2">
              Connect With Us
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 italic">
              Contact
            </h1>
          </header>

          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-gray-100 p-10 md:p-14 overflow-hidden relative group">
            <p className="text-gray-500 mb-10 text-lg font-light leading-relaxed max-w-sm">
              Whether it&apos;s a custom piece or a simple inquiry, our artisans are ready to assist.
            </p>

            {detailData ? (
              <div className="space-y-6">
                <a
                  href={`tel:+977${detailData.contact}`}
                  className="flex items-center justify-between group/btn w-full bg-gray-900 text-white p-6 rounded-2xl font-bold transition-all hover:bg-orange-600 active:scale-95"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-full">
                        <FaPhone className="text-sm" />
                    </div>
                    <span className="uppercase tracking-widest text-[11px]">Direct Line</span>
                  </div>
                  <span className="text-lg font-serif italic">{detailData.contact}</span>
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`https://wa.me/977${detailData.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 border border-gray-100 bg-gray-50/50 p-5 rounded-2xl transition-all hover:border-orange-200 active:scale-95"
                  >
                    <FaWhatsapp className="text-2xl text-green-500" />
                    <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">WhatsApp</p>
                        <p className="text-xs font-bold text-gray-800">Message Now</p>
                    </div>
                  </a>

                  <a
                    href={`viber://chat?number=977${detailData.viber}`}
                    className="flex items-center gap-4 border border-gray-100 bg-gray-50/50 p-5 rounded-2xl transition-all hover:border-orange-200 active:scale-95"
                  >
                    <FaViber className="text-2xl text-[#7360f2]" />
                    <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Viber</p>
                        <p className="text-xs font-bold text-gray-800">Chat with us</p>
                    </div>
                  </a>
                </div>

                <a
                  href={mapUrls.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-gray-200 text-gray-400 py-6 rounded-2xl font-bold hover:border-orange-500 hover:text-orange-500 transition-all active:scale-95"
                >
                  <FaMapMarkerAlt /> 
                  <span className="uppercase tracking-[0.2em] text-[10px]">Open in Google Maps</span>
                </a>
              </div>
            ) : (
              <div className="space-y-6 animate-pulse">
                <div className="h-20 bg-gray-100 rounded-2xl"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-16 bg-gray-100 rounded-2xl"></div>
                  <div className="h-16 bg-gray-100 rounded-2xl"></div>
                </div>
                <div className="h-20 bg-gray-100 rounded-2xl"></div>
              </div>
            )}

            <img 
                src={LogoUrl} 
                className="absolute -bottom-10 -right-10 w-40 opacity-[0.03] grayscale pointer-events-none" 
                alt="" 
            />
          </div>
          
          <p className="mt-10 text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">
            {detailData?.site_name || "Om Sai Furniture"} • Established 2004
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;