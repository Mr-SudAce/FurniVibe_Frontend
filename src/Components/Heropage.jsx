import { Link } from "react-router-dom";
import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import SlotCounter from "react-slot-counter";
import { CiShoppingCart } from "react-icons/ci";
import { useEffect, useState } from "react";
import * as Index from "../index.jsx";

const HeroSkeleton = () => (
  <div className="flex -mt-20 items-center justify-center relative w-full min-h-screen bg-gray-50 px-4 md:px-8 lg:px-16 animate-pulse">
    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center lg:mt-20 md:mt-20 -mt-10">
      <div className="space-y-6 text-center md:text-left">
        {/* Title Skeleton */}
        <div className="space-y-3">
          <div className="h-10 bg-gray-300 rounded-md w-3/4 mx-auto md:mx-0"></div>
          <div className="h-10 bg-gray-300 rounded-md w-1/2 mx-auto md:mx-0"></div>
        </div>

        {/* Subtext Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto md:mx-0"></div>
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-center md:justify-start">
          <div className="h-12 w-32 bg-gray-300 rounded-md"></div>
        </div>

        {/* Counter Skeletons */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-8 mt-4">
          <div className="h-14 w-28 bg-gray-200 rounded-md"></div>
          <div className="h-14 w-28 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>

    {/* Social Icons Skeleton */}
    <div className="absolute bottom-4 right-4 flex space-x-4 p-2">
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
    </div>
  </div>
);

const Heropage = () => {
  const domain = window.API_BASE_URL;
  const API_URL = `${domain}api/other-details/`;

  const [otherDetails, setOtherDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOtherDetails = async () => {
      const token =
        localStorage.getItem("authToken") ||
        localStorage.getItem("access_token");

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOtherDetails(data);
        } else {
          console.error("Server error:", response.status);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOtherDetails();
  }, [API_URL]);

  if (loading) {
    return <HeroSkeleton />;
  }

  const details = otherDetails?.[0] || {};

  return (
    <>
      <div
        className="flex -mt-20 items-center justify-center relative w-full min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 lg:px-16"
        style={{
          backgroundImage: `url("https://static2.narpon.es/assets/images/parquets/2.jpg")`,
        }}
      >
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center lg:mt-20 md:mt-20 -mt-10">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
              Modernized and <br /> Minimalized Furniture Designs
            </h1>
            <p className="text-gray-600 text-base sm:text-lg md:text-lg">
              Get your living room decorated with the best modern designed
              furniture and also in affordable prices!
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                to="/shop"
                className="flex items-center gap-2 bg-orange-500 rounded-md shadow-md text-white hover:bg-orange-600 px-6 py-3 text-sm sm:text-base transition-colors"
              >
                Shop
                <CiShoppingCart className="text-2xl sm:text-3xl font-extrabold" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-gray-700 font-semibold mt-4">
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-bold flex items-center justify-center md:justify-start">
                  <SlotCounter value={15} />+
                </span>
                <p className="text-sm sm:text-base">Unique styles</p>
              </div>
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-bold flex items-center justify-center md:justify-start">
                  <SlotCounter value={20} />+
                </span>
                <p className="text-sm sm:text-base">Variety of models</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex space-x-4 rounded-xl p-2 backdrop-blur-sm bg-white/10">
          {details.tiktok && (
            <a href={details.tiktok} target="_blank" rel="noreferrer">
              <FaTiktok className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 hover:scale-110 transition-transform" />
            </a>
          )}
          {details.facebook && (
            <a href={details.facebook} target="_blank" rel="noreferrer">
              <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 hover:scale-110 transition-transform" />
            </a>
          )}
          {details.instagram && (
            <a href={details.instagram} target="_blank" rel="noreferrer">
              <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 hover:scale-110 transition-transform" />
            </a>
          )}
        </div>
      </div>
      <Index.Shop />
    </>
  );
};

export default Heropage;
