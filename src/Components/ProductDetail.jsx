import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultImag from "../assets/images/om.png";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  const domain = window.API_BASE_URL;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${domain}api/products/${id}/`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct(data);

        // Combine primary + gallery images
        const allImages = [
          { image: data.image || defaultImag, id: "primary" },
          ...(data.images || []),
        ];

        setImages(allImages);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductDetails();
  }, [id, domain]);

  if (!product) {
    return (
      <div className="flex justify-center py-20 text-lg font-semibold">
        Loading Product...
      </div>
    );
  }

  const variant = product.variants?.[0];

  const handleImageClick = (index) => {
    const newImages = [...images];

    // swap clicked image with first image
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];

    setImages(newImages);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Product Title */}
      <h2 className="text-3xl font-bold mb-2">{product.name}</h2>

      <p className="text-gray-500 mb-6">Category: {product.category?.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE SECTION */}
        <div>
          {/* PRIMARY IMAGE */}
          <div className="relative">
            {product.discount_percent > 0 && (
              <span className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded text-xs">
                {product.discount_percent}% OFF
              </span>
            )}

            <img
              src={images[0]?.image}
              alt={product.name}
              className="w-full h-[420px] object-cover rounded-xl"
            />
          </div>

          {/* SECONDARY IMAGES */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {images.slice(1).map((img, index) => (
                <img
                  key={img.id || index}
                  src={img.image}
                  alt="thumbnail"
                  onClick={() => handleImageClick(index + 1)}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer border hover:border-green-600"
                />
              ))}
            </div>
          )}
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-6">
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
            <p className="font-semibold">
              <span
                className={
                  variant.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {variant.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          )}

          {/* Add to Cart */}
          <button
            disabled={variant?.stock === 0}
            className={`w-[220px] py-3 text-white font-semibold rounded-lg ${
              variant?.stock > 0
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
          <hr />

          <p className="text-gray-700 flex justify-content-between text-[10px] lg:text-sm md:text-sm">
            {variant && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(variant).map(([key, value]) => {
                  if (key === "id") return null; // skip internal keys

                  // Make label readable
                  const label = key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase());

                  // Custom formatting for stock
                  if (key === "is_made_to_order")
                    value = value ? "True" : "False";

                  return (
                    <div key={key} className="flex">
                      <div className="grid grid-cols-2">
                        <span className="font-semibold w-32">{label}</span>
                        <span>: {value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            )}
          </p>
        </div>
      </div>
        {/* Description */}
        <p className="mt-10">
          <span className="font-semibold">Description</span>
          <div
            className="text-gray-700 text-justify"
            dangerouslySetInnerHTML={{
              __html: product.description || "No description available",
            }}
          />
        </p>
    </div>
  );
};

export default ProductDetail;
