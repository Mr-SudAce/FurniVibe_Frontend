import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";

const SocialBar = () => {
  const [detail, setDetails] = useState(null);
  const domain = window.API_BASE_URL || "http://127.0.0.1:8000/";
  const detailUrl = `${domain}api/other-details/`;

  useEffect(() => {
    const fetchOtherDetails = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(detailUrl, {
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
        console.error("SocialBar fetch error:", error);
      }
    };

    fetchOtherDetails();
  }, []); // ✅ FIXED (run only once)

  // ✅ Prevent crash before data loads
  if (!detail) return null;

  const hasSocials = [
    detail.tiktok,
    detail.facebook,
    detail.instagram,
    detail.twitter,
    detail.whatsapp,
    detail.viber,
  ].some(Boolean);

  if (!hasSocials) return null;

  const size = 20;
  return (
    <>
      {detail.tiktok && (
        <a
          href={detail.tiktok}
          target="_blank"
          rel="noreferrer"
        >
          <FaTiktok size={size} />
        </a>
      )}

      {detail.facebook && (
        <a
          href={detail.facebook}
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF size={size} />
        </a>
      )}

      {detail.instagram && (
        <a
          href={detail.instagram}
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram size={size} />
        </a>
      )}

      {detail.twitter && (
        <a
          href={detail.twitter}
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter size={size} />
        </a>
      )}

      {detail.whatsapp && (
        <a
          href={detail.whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp size={size} />
        </a>
      )}
    </>
  );
};

export default SocialBar;
