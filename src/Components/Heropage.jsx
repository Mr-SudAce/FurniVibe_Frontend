import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import SlotCounter from "react-slot-counter";
import { CiShoppingCart } from "react-icons/ci";
import { useEffect, useState } from "react";
import * as Index from "../index.jsx";



const Heropage = () => {
  const [OtherDetails, setOtherDetails] = useState(null);
  
  
  useEffect(() => {
    const otherDetail = async () => {
      try {
        const response = await fetch(`${window.API_BASE_URL}api/other-details/`);
        const data = await response.json();
        setOtherDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    }
    otherDetail();
  }, [])
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
                to="/category/All"
                className="flex items-center gap-2 bg-orange-500 rounded-md shadow-md text-white hover:bg-orange-600 px-6 py-3 text-sm sm:text-base"
              >
                Shop
                <CiShoppingCart className="text-2xl sm:text-3xl font-extrabold" />
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-gray-700 font-semibold mt-4">
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-bold">
                  <SlotCounter value="15" />+
                </span>
                <p className="text-sm sm:text-base">Unique styles</p>
              </div>
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-bold">
                  <SlotCounter value="20" />+
                </span>
                <p className="text-sm sm:text-base">Variety of models</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 flex space-x-4 rounded-xl p-2 backdrop-blur-sm">
          <Link to={`${OtherDetails?.[0].twitter}`} target="_blank">
            <FaTiktok className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 cursor-pointer" />
          </Link>
          <Link to={`${OtherDetails?.[0].facebook}`} target="_blank">
            <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 cursor-pointer" />
          </Link>
          <Link to={`${OtherDetails?.[0].instagram}`} target="_blank">
            <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 cursor-pointer" />
          </Link>
        </div>
      </div>
        <Index.Shop/>
    </>
  );
};

export default Heropage;
