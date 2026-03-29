import aboutus1 from "../assets/images/aboutus.jpg";
import { FiUsers, FiAward } from "react-icons/fi";
import SlotCounter from "react-slot-counter";
import { useState } from "react";

const AboutUs = () => {
  // Remove the global loading state. 
  // Text should be instant; only the image needs a skeleton.
  const [imgLoaded, setImgLoaded] = useState(false);

  const stats = [
    {
      icon: <FiUsers className="w-6 h-6" />,
      value: <SlotCounter value={600} animateOnVisible />,
      label: "Happy Clients",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      value: <SlotCounter value={20} animateOnVisible />,
      label: "Years Experience",
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-[98%] mx-auto px-4 sm:px-6 lg:px-8 py-5 mt-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 uppercase tracking-tight">
            About Us
          </h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content - Renders Instantly */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-blue-600"></span>
                What We Do
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg text-justify">
                At <span className="font-semibold text-gray-900">OM Sai Furniture [OSF]</span>, 
                we take pride in offering high-quality, durable furniture that blends style, 
                functionality, and affordability. Our collection includes a wide range of pieces 
                designed to enhance homes, offices, and other spaces, ensuring comfort and elegance. 
                We focus on craftsmanship and attention to detail, using quality materials to create 
                furniture that not only looks great but also stands the test of time.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 group"
                >
                  <div className="text-blue-600 mb-4 transform group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-gray-900">
                    {stat.value}+
                  </div>
                  <div className="text-sm font-medium uppercase tracking-wider text-gray-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section with Smart Loading */}
          <div className="relative group">
            {/* Skeleton Overlay - only shows while imgLoaded is false */}
            {!imgLoaded && (
              <div className="w-full h-[500px] bg-gray-200 rounded-2xl animate-pulse absolute inset-0 z-10"></div>
            )}
            
            <img
              src={aboutus1}
              alt="Our Workshop"
              className={`rounded-2xl shadow-2xl w-full h-[500px] object-cover transition-opacity duration-700 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
              loading="eager" // About Us images are usually high priority
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174";
                setImgLoaded(true);
              }}
            />
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/10 rounded-full -z-10 group-hover:scale-110 transition-transform"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;