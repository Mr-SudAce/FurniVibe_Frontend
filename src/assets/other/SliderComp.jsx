import Slider from "react-slick";
import { useEffect, useState } from "react";
import defaultImag from "../images/om.png";

const base_url = window.API_BASE_URL;
const imagesAPI = `${base_url}api/more-images/`;

const SliderComponent = () => {
  const [moreImages, setMoreImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(imagesAPI);
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setMoreImages(data);
      } catch (err) {
        console.error("Error fetching more images:", err);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 2000,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="slider-container py-8 container mx-auto">
      <Slider {...settings}>
        {moreImages.map((img) => (
          <div
            key={img.id}
            className="flex justify-center items-center px-2"
          >
            <img
              className="h-[80vh] w-auto object-contain transition-transform duration-500 "
              src={img.image || defaultImag}
              alt={`Image ${img.id}`}
            />
          </div>
        ))}
      </Slider>

      {/* Optional CSS for Slick Center Mode */}
      <style>{`
        .slick-slide {
          display: flex !important;
          justify-content: center;
          align-items: center;
          opacity: 0.7;
          gap:10px;
          transform: scale(0.8);
          transition: all 0.5s;
          }
          .slick-center {
            opacity: 1;
            gap:10px;
          object-fit:contain;
          transform: scale(1.0);
        }
      `}</style>
    </div>
  );
};

export default SliderComponent;