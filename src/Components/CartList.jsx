import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { handleRemoveItem } from "./utils/cartOp";
import { FiShoppingBag, FiX, FiArrowRight } from "react-icons/fi";

// 1. Sleek Skeleton for the mini-cart items
const CartSkeleton = () => (
  <div className="flex items-center gap-4 animate-pulse">
    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-gray-100 rounded w-3/4" />
      <div className="flex justify-between items-center pt-1">
        <div className="h-2 bg-gray-50 rounded w-12" />
        <div className="h-3 bg-gray-100 rounded w-16" />
      </div>
    </div>
  </div>
);

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 2. New loading state

  const domain = window.API_BASE_URL || "http://localhost:8000/";
  const defaultImage = window.Logo_Url || "";

  const loadCart = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    
    if (token) {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(`${domain}api/cart/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const cartArray = Array.isArray(data) ? data : data.cart_items || [];

          const cleanedCart = cartArray.map((item) => ({
            id: item.id,
            product_id: item.product?.id || item.product_id,
            product_name: item.product?.name || "Unknown Product",
            product_image: item.product?.image?.startsWith("http")
              ? item.product.image
              : `${domain}${item.product?.image}`,
            quantity: item.quantity || 1,
            price: item.price || 0,
          }));

          setCartItems(cleanedCart);
          setCartCount(cartArray.length);
          setIsLoading(false); // End loading
          return;
        }
      } catch (error) {
        console.error("Error loading server cart:", error);
      }
    }

    // LocalStorage Fallback
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(localCart);
    setCartCount(localCart.reduce((acc, item) => acc + (item.quantity || 0), 0));
    setIsLoading(false);
  }, [domain]);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [loadCart]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="absolute top-[-10px] right-[-10px] w-[320px] flex flex-col max-h-[500px] rounded-[0.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
      
      <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
            <FiShoppingBag className="text-[var(--primary-color)] w-4 h-4" />
            <span className="font-serif text-gray-600 text-lg">Your Selection</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
          {isLoading ? "..." : `${cartCount} ${cartCount === 1 ? 'Item' : 'Items'}`}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-white">
        {isLoading ? (
          <>
            <CartSkeleton />
            <CartSkeleton />
            <CartSkeleton />
          </>
        ) : cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id || item.product_id}
              className="flex items-center gap-4 group relative "
            >
              <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group-hover:border-orange-100 transition-colors">
                <img
                  src={item.product_image || defaultImage}
                  alt={item.product_name}
                  className="w-full h-full object-cover p-1 group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => (e.target.src = defaultImage)}
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.product_id}`}
                  className="block text-sm font-serif italic text-gray-800 truncate hover:text-[var(--primary-color)] transition-colors"
                >
                  {item.product_name}
                </Link>

                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    Rs. {item.price * item.quantity}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id, item.product_id, setCartItems)}
                className="opacity-0 group-hover:opacity-100 absolute -left-2 -top-1 bg-white shadow-md text-gray-400 hover:text-red-500 w-6 h-6 flex items-center justify-center rounded-full border border-gray-100 transition-all hover:scale-110 z-10"
              >
                <FiX className="w-3 h-3" />
              </button>
            </div>
          ))
        ) : (
          <div className="py-12 text-center flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                <FiShoppingBag className="w-6 h-6" />
            </div>
            <p className="text-gray-400 font-serif italic text-sm">Your gallery is empty.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {/* 4. Only show footer if not loading AND there are items */}
      {!isLoading && cartItems.length > 0 && (
        <div className="p-5 bg-white border-t border-gray-50 space-y-4">
          <div className="flex justify-between items-center px-1">
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Subtotal</span>
             <span className="text-lg font-bold text-gray-900">Rs. {subtotal}</span>
          </div>

          <Link
            to="/checkout"
            className="group flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--primary-color)] transition-all active:scale-95 shadow-gray-200"
          >
            Go to Checkout
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-[9px] text-center text-gray-400 uppercase tracking-widest">
            Excluding Delivery Fees
          </p>
        </div>
      )}
    </div>
  );
};

export default CartList;