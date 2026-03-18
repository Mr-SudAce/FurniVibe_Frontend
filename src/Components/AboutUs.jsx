import aboutus1 from "../assets/images/aboutus.jpg";
import { FiUsers, FiAward } from "react-icons/fi";
import SlotCounter from "react-slot-counter";
import { useState, useEffect } from "react";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  const stats = [
    {
      icon: <FiUsers className="w-6 h-6" />,
      value: <SlotCounter value={600} />,
      label: "Happy Clients",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      value: <SlotCounter value={20} />,
      label: "Years Experience",
    },
  ];

  // simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5s loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-[98%] mx-auto px-4 sm:px-6 lg:px-8 py-5 mt-20">
        <div className="text-center">
          {loading ? (
            <div className="h-12 bg-gray-300 rounded w-40 mx-auto animate-pulse mb-15"></div>
          ) : (
            <h1 className="text-5xl md:text-5xl font-bold text-black mb-15 uppercase">
              About Us
            </h1>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {loading ? (
              <>
                <div className="h-10 bg-gray-300 w-1/3 rounded animate-pulse"></div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 bg-gray-300 rounded w-full animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-6 bg-white rounded-lg shadow-sm animate-pulse h-32"
                    ></div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-semibold text-black mb-4">
                  What We Do
                </h2>
                <p className="text-gray-700 leading-relaxed text-md text-justify">
                  At OM Sai Furniture [OSF], we take pride in offering
                  high-quality, durable furniture that blends style,
                  functionality, and affordability. Our collection includes a
                  wide range of pieces designed to enhance homes, offices, and
                  other spaces, ensuring comfort and elegance. We focus on
                  craftsmanship and attention to detail, using quality
                  materials to create furniture that not only looks great but
                  also stands the test of time. Whether you’re looking for a
                  classic design or something modern and trendy, our diverse
                  selection ensures you’ll find the perfect fit for your
                  needs. We understand that furniture is a long-term
                  investment, which is why we prioritize durability and
                  affordability. Our goal is to provide customers with stylish
                  yet sturdy furniture at competitive prices, making it easy to
                  find something that matches both your budget and personal
                  taste. With many styles and designs to choose from, we make
                  the shopping experience convenient and enjoyable. At OSF, we
                  are committed to helping you create a beautiful and
                  functional space with furniture that delivers lasting value.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="text-blue-600 mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-black">
                        {stat.value}+
                      </div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            {loading ? (
              <div className="w-full h-[500px] bg-gray-300 rounded-lg animate-pulse"></div>
            ) : (
              <img
                src={aboutus1}
                alt="images"
                className="rounded-lg shadow-md w-full h-[500px] object-cover transform hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
                width={500}
                height={500}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3";
                }}
              />
            )}
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;