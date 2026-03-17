import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultImag from "../assets/images/om.png";
import * as Index from "../index.jsx";

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

    // notify other components
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!product) {
    return (
      <div className="flex justify-center py-20">
        <Index.Loader />
      </div>
    );
  }

  const variant = product.variants?.[0];

  const handleImageClick = (index) => {
    const newImages = [...images];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setImages(newImages);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2">{product.name}</h2>

      <p className="text-gray-500 mb-6">Category: {product.category?.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={images[0]?.image}
            alt={product.name}
            className="w-full h-[420px] object-cover rounded-xl"
          />

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

        <div className="flex flex-col gap-6">
          <div className="text-2xl font-semibold">
            Rs. {product.discounted_price}
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
            className={`w-[220px] py-3 text-white font-semibold rounded-lg ${
              variant?.stock > 0
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <span className="font-semibold">Description</span>

        <div
          className="text-gray-700 text-justify"
          dangerouslySetInnerHTML={{
            __html: product.description || "No description available",
          }}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
