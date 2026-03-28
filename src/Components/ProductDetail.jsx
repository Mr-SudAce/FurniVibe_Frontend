import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const domain = window.API_BASE_URL;
  const defaultImage = window.Logo_Url;

  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000,
    );
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${domain}api/products/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
        if (data.variants && data.variants.length > 0)
          setSelectedVariant(data.variants[0]);
        const allImages = [
          { image: data.image || defaultImage, id: "primary" },
          ...(data.images || []),
        ];
        setImages(allImages);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProductDetails();
  }, [id, domain, defaultImage]);

  const handleAddToCart = async () => {
    if (!product) return;
    const addCartUrl = `${domain}api/cart/add/`;
    const token = localStorage.getItem("access_token");

    try {
      const payload = { product_id: product.id, quantity: 1 };
      if (token) {
        const response = await fetch(addCartUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const data = await response.json();
          showNotification(data.detail || "Failed to add to cart", "error");
          return;
        }
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.product_id === product.id);
      const price = Number(product.discounted_price || product.price);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          product_id: product.id,
          product_name: product.name,
          product_image: images[0]?.image || defaultImage,
          price: price,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      showNotification(`${product.name} added to cart!`, "success");
    } catch (error) {
      showNotification("Something went wrong. Check connection.", error);
    }
  };

  const handleImageClick = (index) => {
    const newImages = [...images];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setImages(newImages);
  };

  if (!product)
    return (
      <div className="container mx-auto px-4 py-12 animate-pulse text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="container px-4 mx-auto py-12 relative">
      {/* Top Section: Title and Category */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-2">
          Home / <Link to={`/category/${product.category?.name}`} >{product.category?.name}
          </Link> / {product.brand?.name}
        </nav>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          {product.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Images Section */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            <img
              src={images[0]?.image}
              alt={product.name}
              className="w-full h-[500px] object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
            {images.slice(1).map((img, index) => (
              <img
                key={img.id || index}
                src={img.image}
                alt="thumbnail"
                onClick={() => handleImageClick(index + 1)}
                className="w-24 h-24 object-cover rounded-xl cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all shadow-sm"
              />
            ))}
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-green-600">
                Rs. {product.discounted_price}
              </span>
              {product.discount_percent > 0 && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount_percent}% OFF
                </span>
              )}
            </div>
            <p className="text-gray-500 line-through text-lg">
              Rs. {product.price}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
              Quick Specs
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>
                <span className="text-gray-500">Brand:</span>{" "}
                {product.brand?.name}
              </p>
              <p>
                <span className="text-gray-500">Warranty:</span>{" "}
                {product.warranty_years} Years
              </p>
              {selectedVariant && (
                <>
                  <p>
                    <span className="text-gray-500">Dimensions:</span>{" "}
                    {selectedVariant.length} x {selectedVariant.width}
                  </p>
                  <p>
                    <span className="text-gray-500">Material:</span>{" "}
                    {selectedVariant.material}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className={`flex-1 py-4 text-white font-bold rounded-xl transition-all ${
                selectedVariant?.stock > 0
                  ? "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-200 active:scale-95"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {selectedVariant?.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
            <div className="text-right">
              <p
                className={`text-sm font-bold ${selectedVariant?.stock > 0 ? "text-green-600" : "text-red-500"}`}
              >
                {selectedVariant?.stock > 0
                  ? `● ${selectedVariant.stock} In Stock`
                  : "● Currently Unavailable"}
              </p>
              {selectedVariant?.is_made_to_order && (
                <p className="text-xs text-orange-500 font-medium">
                  Made to order: {selectedVariant.delivery_days} days
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-10 border-t py-5">
        {/* description */}
        <div className="bg-gray-500/10 rounded-xl p-4">
          <h3 className="text-lg font-bold mb-3">Description</h3>
          <p className="text-gray-600 leading-relaxed ">
            {product.description}
          </p>
        </div>
        {/* Bottom Section: Full Specifications Table */}
        {selectedVariant && (
          <div className="">
            <h2 className="text-2xl font-bold mb-8">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 ">
              {[
                { label: "Model", value: selectedVariant.model },
                { label: "Material", value: selectedVariant.material },
                { label: "Color", value: selectedVariant.color },
                {
                  label: "Dimensions",
                  value: `${selectedVariant.length} (L) x ${selectedVariant.width} (W) x ${selectedVariant.height} (H)`,
                },
                { label: "Weight", value: `${selectedVariant.weight_kg} kg` },
                { label: "Warranty", value: `${product.warranty_years} Years` },
              ].map((spec, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-3 border-b w-100 lg:w-75 md:w-75 border-gray-50"
                >
                  <span className="text-gray-500 font-medium">
                    {spec.label}
                  </span>
                  <span className="text-gray-900 font-semibold text-md md:text-md lg:text-sm">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-10 right-10 z-[999] transition-all duration-500 transform ${toast.show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"}`}
      >
        <div
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${toast.type === "success" ? "bg-green-600 border-green-400 text-white" : "bg-red-600 border-red-400 text-white"}`}
        >
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
