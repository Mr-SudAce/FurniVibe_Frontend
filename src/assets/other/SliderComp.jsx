import Slider from "react-slick";
import { useEffect, useState } from "react";
import defaultImag from "../images/om.png";

const base_url = window.API_BASE_URL;
const productsAPI = `${base_url}api/products/`;

const SliderComponent = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(productsAPI);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        let discountedProducts = data.filter(p => p.discount_percent > 0);
        if (discountedProducts.length === 0) discountedProducts = data;

        discountedProducts.sort((a, b) => b.discount_percent - a.discount_percent);

        const slidesData = discountedProducts.map(product => ({
          id: product.id,
          image: product.image || defaultImag,
          name: product.name,
          discount: product.discount_percent,
        }));

        setSlides(slidesData);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 2500,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // Skeleton loader array
  const skeletonSlides = [...Array(3)];

  return (
    <div className="slider-container py-10 container mx-auto">
      <Slider {...settings}>
        {loading
          ? skeletonSlides.map((_, idx) => (
              <div key={idx} className="px-3 animate-pulse">
                <div className="relative rounded-xl overflow-hidden border border-gray-300 bg-gray-200 h-[60vh] md:h-[45vh] w-full"></div>
              </div>
            ))
          : slides.map(slide => (
              <div key={slide.id} className="px-3">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.name}
                    loading="lazy"
                    className="lg:h-[60vh] md:h-[45vh] w-full object-cover rounded-xl"
                  />
                  {slide.discount > 0 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">
                      {slide.discount}% OFF
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white text-lg font-semibold">{slide.name}</h3>
                    {slide.discount > 0 && (
                      <p className="text-yellow-400 text-sm font-medium">
                        Save {slide.discount}%
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </Slider>

      <style>{`
        .slick-slide {
          opacity: 0.7;
          transform: scale(0.8);
          transition: all 0.5s;
        }
        .slick-center {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
};

export default SliderComponent;