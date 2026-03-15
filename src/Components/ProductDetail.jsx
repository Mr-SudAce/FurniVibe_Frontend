import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultImag from "../assets/images/om.png";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const domain = window.API_BASE_URL;
  const API_URL = `${domain}api/products/${id}/`;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct(data);

        if (data.images?.length > 0) {
          setActiveImage(data.images[0].image);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductDetails();
  }, [API_URL]);

  if (!product) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const variant = product.variants?.[0];

  const images = product.images?.length > 0 ? product.images : [{ image: defaultImag }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        {product.name}
      </h2>

      <p className="text-gray-500 mb-6">
        Category: {product.category?.name}
      </p>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE SECTION */}
        <div>

          {/* Main Image */}
          <div className="relative">

            {product.discount_percent > 0 && (
              <span className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded text-xs sm:text-sm">
                {product.discount_percent}% OFF
              </span>
            )}

            <img
              src={activeImage || images[0].image}
              alt={product.name}
              className="w-full h-[280px] sm:h-[350px] lg:h-[420px] object-cover rounded-xl"
            />

          </div>

          {/* THUMBNAILS */}
          {images.length > 0 && (

            <div className="flex items-center gap-3 mt-4">

              {/* LEFT BUTTON */}
              {images.length > 5 && (
                <button
                  onClick={() =>
                    setStartIndex((prev) => Math.max(prev - 1, 0))
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ◀
                </button>
              )}

              {/* IMAGE LIST */}
              <div className="flex gap-3 overflow-hidden">

                {images
                  .slice(startIndex, startIndex + 5)
                  .map((img, index) => (
                    <img
                      key={index}
                      src={img.image}
                      alt="product"
                      onClick={() => setActiveImage(img.image)}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2
                        ${
                          activeImage === img.image
                            ? "border-green-600"
                            : "border-gray-200"
                        }`}
                    />
                  ))}

              </div>

              {/* RIGHT BUTTON */}
              {images.length > 5 && (
                <button
                  onClick={() =>
                    setStartIndex((prev) =>
                      Math.min(prev + 1, images.length - 5)
                    )
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ▶
                </button>
              )}

            </div>

          )}

        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-6">

          {/* Description */}
          <div
            className="text-gray-700 text-sm sm:text-base"
            dangerouslySetInnerHTML={{
              __html: product.description || "No description available",
            }}
          />

          {/* Price */}
          <div className="text-2xl font-semibold">

            Rs. {product.discounted_price}

            {product.discount_percent > 0 && (
              <span className="line-through text-red-400 text-sm ml-3">
                Rs. {product.price}
              </span>
            )}

          </div>

          {/* Stock */}
          {variant && (
            <p className="text-sm font-semibold">
              Available:{" "}
              <span
                className={
                  variant.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {variant.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          )}

          {/* Add to Cart */}
          <button className="w-full sm:w-[220px] py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
            Add to Cart
          </button>

          {/* Specifications */}
          {variant && (
            <div className="border-t pt-6">

              <h3 className="font-semibold text-lg mb-3">
                Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">

                <p><b>Model:</b> {variant.model}</p>
                <p><b>Material:</b> {variant.material}</p>
                <p><b>Color:</b> {variant.color}</p>

                <p>
                  <b>Size:</b> {variant.length} × {variant.width} × {variant.height}
                </p>

                <p><b>Weight:</b> {variant.weight_kg} kg</p>
                <p><b>Stock:</b> {variant.stock}</p>
                <p><b>Delivery:</b> {variant.delivery_days} days</p>

                <p>
                  <b>Warranty:</b> {product.warranty_years} year(s)
                </p>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;

