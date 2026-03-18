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

  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    const price = Number(product.discounted_price || product.price);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        product_name: product.name,
        product_image: images[0]?.image || defaultImag,
        price: price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleImageClick = (index) => {
    const newImages = [...images];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setImages(newImages);
  };

  const variant = product?.variants?.[0];

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 w-3/4 bg-gray-300 rounded mb-2 animate-pulse"></div>
        <div className="h-4 w-1/4 bg-gray-300 rounded mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="w-full h-[420px] bg-gray-300 rounded mb-4 animate-pulse"></div>
            <div className="flex gap-3 flex-wrap">
              <div className="w-20 h-20 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-20 h-20 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-20 h-20 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-12 w-56 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="mt-12">
          <div className="h-6 w-48 bg-gray-300 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-full bg-gray-300 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-full bg-gray-300 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Product Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-500 mb-8">Category: {product.category?.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <img
              src={images[0]?.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-[420px] object-contain transition-transform duration-300 p-2"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {images.slice(1).map((img, index) => (
                <img
                  key={img.id || index}
                  src={img.image}
                  alt="thumbnail"
                  loading="lazy"
                  onClick={() => handleImageClick(index + 1)}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer border border-gray-200 hover:border-green-600 transition"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div className="text-2xl font-semibold text-gray-800">
            Rs. {product.discounted_price || product.price}
          </div>

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

          <button
            onClick={handleAddToCart}
            disabled={variant?.stock === 0}
            className={`w-56 py-3 text-white font-semibold rounded-lg transition ${
              variant?.stock > 0
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>

          {/* Variant Details */}
          {variant && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h3 className="text-gray-700 font-semibold mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                {Object.entries(variant)
                  .filter(([key]) => key !== "id" && key !== "is_made_to_order")
                  .map(([key, value]) => {
                    const label = key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase());

                    return (
                      <div key={key} className="flex justify-between">
                        <span className="font-semibold">{label}</span>
                        <span>{value}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <div
          className="text-gray-700 text-justify leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: product.description || "No description available",
          }}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
