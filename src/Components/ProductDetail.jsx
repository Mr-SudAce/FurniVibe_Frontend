import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight, ShoppingCart, ShieldCheck,
  Truck, Package, Info, CheckCircle2
} from "lucide-react";

// --- Skeleton Component ---
const ProductSkeleton = () => (
  <div className="container mx-auto px-4 py-8 md:py-12 animate-pulse">
    {/* Breadcrumb Skeleton */}
    <div className="h-4 w-64 bg-slate-100 rounded-full mb-10"></div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      {/* Gallery Skeleton */}
      <div className="lg:col-span-7 space-y-6">
        <div className="aspect-[6/4] bg-slate-100 rounded-3xl"></div>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[90px] h-[90px] bg-slate-50 rounded-2xl"></div>
          ))}
        </div>
      </div>

      {/* Info Skeleton */}
      <div className="lg:col-span-5 space-y-8">
        <div className="h-6 w-24 bg-slate-100 rounded-full"></div>
        <div className="space-y-3">
          <div className="h-12 bg-slate-100 rounded-2xl w-full"></div>
          <div className="h-12 bg-slate-100 rounded-2xl w-3/4"></div>
        </div>
        <div className="h-16 w-48 bg-slate-100 rounded-2xl"></div>
        <div className="space-y-4">
          <div className="h-24 bg-slate-50 rounded-3xl w-full"></div>
          <div className="h-24 bg-slate-50 rounded-3xl w-full"></div>
        </div>
        <div className="h-20 bg-slate-200 rounded-2xl w-full"></div>
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImg, setActiveImg] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added Loading State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const domain = window.API_BASE_URL;
  const defaultImage = window.Logo_Url;

  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${domain}api/products/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setProduct(data);
        if (data.variants?.length > 0) setSelectedVariant(data.variants[0]);

        const allImages = [
          { image: data.image || defaultImage, id: "primary" },
          ...(data.images || []),
        ];
        setImages(allImages);
        setActiveImg(allImages[0].image);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        // Small delay to ensure smooth transition
        setTimeout(() => setIsLoading(false), 300);
      }
    };
    fetchProductDetails();
  }, [id, domain, defaultImage]);

  const handleAddToCart = async () => {
    if (!product) return;
    const token = localStorage.getItem("access_token");
    try {
      const payload = { product_id: product.id, quantity: 1 };
      if (token) {
        const response = await fetch(`${domain}api/cart/add/`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const data = await response.json();
          showNotification(data.detail || "Error adding to cart", "error");
          return;
        }
      }
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.product_id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          product_id: product.id,
          product_name: product.name,
          product_image: images[0]?.image,
          price: Number(product.discounted_price || product.price),
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      showNotification(`${product.name} added!`, "success");
    } catch (error) {
      showNotification("Connection error", error);
    }
  };

  // 1. Loading Guard
  if (isLoading) return <ProductSkeleton />;

  // 2. Error Guard (Optional)
  if (!product && !isLoading) return (
     <div className="h-screen flex items-center justify-center text-slate-500 font-black uppercase tracking-widest">
        Product not found
     </div>
  );

  const fullSpecs = [
    { label: "Brand", value: product.brand?.name },
    { label: "Model", value: selectedVariant?.model },
    { label: "Material", value: selectedVariant?.material },
    { label: "Color", value: selectedVariant?.color },
    { label: "Weight", value: selectedVariant?.weight_kg ? `${selectedVariant.weight_kg} kg` : null },
    { label: "Dimensions", value: selectedVariant?.length ? `${selectedVariant.length}L x ${selectedVariant.width}W` : null },
    { label: "Warranty", value: `${product.warranty_years} Years` },
  ].filter(spec => spec.value);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 antialiased selection:bg-indigo-100 selection:text-indigo-900 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400 mb-10 overflow-x-auto no-scrollbar">
        <Link to="/" className="hover:text-[var(--primary-color)] transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <Link to={`/category/${product.category?.name}`} className="hover:text-[var(--primary-color)]/80 font-bold">{product.category?.name}</Link>
        <ChevronRight size={12} />
        <span className="text-[var(--primary-color)] font-bold truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="aspect-[6/4] overflow-hidden bg-white flex items-center justify-center group rounded-2xl">
              <img 
                src={activeImg} 
                alt={product.name} 
                loading="lazy"
                className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700" 
              />
            </div>
            <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(img.image)}
                  className={`relative min-w-[90px] h-[90px] rounded-2xl overflow-hidden border-2 transition-all duration-300
                    ${activeImg === img.image ? "border-[var(--primary-color)] scale-105 border-[3px]" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img.image} alt="thumbnail" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info Column */}
        <div className="lg:col-span-5">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 bg-indigo-50 text-[var(--primary-color)] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
              {product.brand?.name}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-6 mb-10">
            <div className="flex flex-col">
              <span className="text-4xl font-black text-green-600">Rs. {product.discounted_price}</span>
              <span className="text-slate-400 line-through text-sm">Rs. {product.price}</span>
            </div>
            {product.discount_percent > 0 && (
              <div className="bg-rose-500 text-white px-4 py-2 rounded-2xl text-xs font-black shadow-lg shadow-rose-100">
                SAVE {product.discount_percent}%
              </div>
            )}
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-1 gap-4 mb-10">
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-[var(--primary-color)] transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[var(--primary-color)]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">{product.warranty_years} Years Protection</p>
                <p className="text-xs text-slate-500 font-medium">Full manufacturer warranty included</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-[var(--primary-color)] transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[var(--primary-color)]">
                <Truck size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">Express Delivery</p>
                <p className="text-xs text-slate-500 font-medium">Ships within 24-48 hours</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`flex items-center gap-2 text-sm font-black ${selectedVariant?.stock > 0 ? "text-emerald-600" : "text-rose-500"}`}>
              <span className={`h-2 w-2 rounded-full animate-pulse ${selectedVariant?.stock > 0 ? "bg-emerald-500" : "bg-rose-500"}`}></span>
              {selectedVariant?.stock > 0 ? `In Stock (${selectedVariant.stock} units)` : "Currently Unavailable"}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className={`w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all duration-300 active:scale-95 
                ${selectedVariant?.stock > 0 
                  ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-green-200 shadow-xl" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"}`}
            >
              <ShoppingCart size={22} />
              {selectedVariant?.stock > 0 ? "Add to Bag" : "Notify Me"}
            </button>
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="mt-16 pt-16 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="space-y-8 text-slate-600">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <Info className="text-[var(--primary-color)]" size={28} /> Product Details
            </h3>
            <div 
              className="prose prose-slate prose-indigo max-w-none text-slate-600 leading-relaxed 
              prose-headings:text-slate-900 prose-headings:font-black prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 h-fit ">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-tighter">
              <Package className="text-[var(--primary-color)]" size={24} /> Specifications
            </h3>
            <div className="grid grid-cols-1">
              {fullSpecs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0">
                  <span className="text-black font-bold text-sm uppercase tracking-widest">{spec.label}</span>
                  <span className="text-slate-500 font-black text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Toast */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-700 transform ${toast.show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}`}>
        <div className={`px-10 py-5 rounded-full shadow-2xl font-black text-white flex items-center gap-4 backdrop-blur-md ${toast.type === "success" ? "bg-slate-900/95" : "bg-rose-600/95"}`}>
          {toast.type === "success" ? <CheckCircle2 className="text-emerald-400" /> : <Info />}
          {toast.message}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;