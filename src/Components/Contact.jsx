import { useEffect, useState } from "react";
import { FaWhatsapp, FaViber, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [detailData, setDetailData] = useState(null);

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
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "",
          },
        });
        const data = await response.json();
        setDetailData(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [detailAPI]);

  // 🔥 Extract map src from iframe string
  const getMapSrc = (iframeString) => {
    if (!iframeString) return null;
    const match = iframeString.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  };

  // 🔥 Convert embed → normal link
  const getMapLink = (iframeString) => {
    const src = getMapSrc(iframeString);
    return src ? src.replace("/embed", "") : "#";
  };

  return (
    <section className="w-full min-h-screen relative">
      {/* 🌍 MAP BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {detailData?.location ? (
          <iframe
            title="map"
            loading="lazy"
            src={getMapSrc(detailData.location)}
            className="w-full h-full border-0"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="w-[90%] h-[90%] bg-gray-800 rounded-lg"></div>
          </div>
        )}
      </div>

      {/* 🌫️ DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* 📦 CONTENT WRAPPER */}
      <div
        className="
        relative z-20
        flex items-center justify-center
        min-h-screen px-4
        md:justify-end md:pr-10
        lg:pr-20
      "
      >
        {/* 📦 CARD */}
        <div
          className="
          w-full max-w-md
          bg-white rounded-2xl shadow-2xl
          p-6 sm:p-8
          text-center

          md:max-w-sm md:mr-6
          lg:max-w-md lg:mr-0

          max-h-[90vh] overflow-y-auto
        "
        >
          {/* 🔷 LOGO */}
          <img
            src={LogoUrl}
            alt="Logo"
            className="w-60 object-contain mx-auto mb-4"
          />

          {/* 🧾 TITLE */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Let’s get connected. Reach us anytime.
          </p>

          {/* 📞 BUTTONS */}
          {detailData ? (
            <div className="space-y-3">
              {/* Call */}
              <a
                href={`tel:+977${detailData.contact}`}
                className="flex items-center justify-center gap-3 w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800"
              >
                <FaPhone />
                Call Now
              </a>

              {/* WhatsApp + Viber */}
              <div className="flex gap-2 flex-col sm:flex-row lg:flex-col">
                <a
                  href={`https://wa.me/977${detailData.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>

                <a
                  href={`viber://chat?number=977${detailData.viber}`}
                  className="flex items-center justify-center gap-3 w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700"
                >
                  <FaViber />
                  Viber
                </a>
              </div>

              {/* 📍 Map Button */}
              <a
                href={getMapLink(detailData.location)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100"
              >
                <FaMapMarkerAlt />
                Open Location
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-full h-12 bg-gray-300 rounded-lg"
                ></div>
              ))}
            </div>
          )}

          {/* 📌 EXTRA INFO */}
          {detailData && (
            <div className="mt-6 text-sm text-gray-500">
              <p>📞 +977 {detailData.contact || "N/A"}</p>
              <p>💬 WhatsApp: +977 {detailData.whatsapp || "N/A"}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;