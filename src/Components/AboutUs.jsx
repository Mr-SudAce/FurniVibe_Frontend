import aboutus1 from "../assets/images/aboutus.jpg";
import { FiUsers, FiAward } from "react-icons/fi";
import SlotCounter from "react-slot-counter";
import { useState } from "react";

const AboutUs = () => {
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
    <div className="w-full bg-[#FCFCFC] min-h-screen">
      <div className="container mx-auto px-6 py-24 mt-10"> 
        <header className="mb-20 border-b border-gray-100 pb-12">
          <div className="flex items-center gap-5">
            <div className="w-1.5 h-20 bg-[var(--primary-color)] rounded-full"></div>
            <div>
              <span className="text-[11px] font-bold tracking-[0.4em] text-[var(--primary-color)] uppercase">
                Our Heritage
              </span>
              <h1 className="text-6xl md:text-7xl font-serif text-[var(--text-color)] capitalize mt-1">
                About Us
              </h1>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-[var(--primary-color)]"></span>
                The Craftsmanship
              </h2>
              <p className="text-gray-600 leading-[1.8] text-xl font-light">
                At <span className="font-bold text-gray-900 ">OM Sai Furniture [OSF]</span>, 
                we take pride in offering high-quality, durable furniture that blends style, 
                functionality, and affordability. 
              </p>
              <p className="text-gray-500 leading-relaxed text-lg mt-6 text-justify">
                Our collection includes a wide range of pieces designed to enhance homes, 
                offices, and other spaces, ensuring comfort and elegance. We focus on 
                craftsmanship and attention to detail, using quality materials to create 
                furniture that not only looks great but also stands the test of time.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-10 bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-500 "
                >
                  <div className="text-[var(--primary-color)] mb-6 transform group-hover:rotate-12 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-serif text-[var(--text-color)]  ">
                    {stat.value}<span className="text-[var(--primary-color)] text-2xl ml-1">+</span>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group lg:sticky lg:top-28">
            {!imgLoaded && (
              <div className="aspect-[4/5] bg-gray-200 rounded-[2rem] animate-pulse absolute inset-0 z-10"></div>
            )}
            
            <div className="relative overflow-hidden rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[5px] border-[var(--primary-color)]">
              <img
                src={aboutus1}
                alt="Our Workshop"
                className={`w-full aspect-[6/5] object-cover transition-all duration-1000${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1497215728101-856f4ea42174";
                  setImgLoaded(true);
                }}
              />
            </div>
            
            <div className="absolute -bottom-10 -right-5 bg-[var(--primary-color)] text-white p-8 rounded-[2rem] shadow-2xl hidden md:block animate-bounce-slow">
               <p className="text-[10px] font-black uppercase tracking-widest">Established</p>
               <p className="text-2xl font-serif italic">Since 2004</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUs;