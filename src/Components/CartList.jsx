import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { handleRemoveItem } from "./utils/cartOp";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const domain = window.API_BASE_URL || "http://localhost:8000/";
  const defaultImage = window.Logo_Url || "";

  const loadCart = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    
    // 🔹 1. Logged-in user
    if (token) {
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
            price: item.product?.discounted_price || item.product?.price || 0,
          }));

          setCartItems(cleanedCart);
          setCartCount(cartArray.length); 
          return;
        }
      } catch (error) {
        console.error("Error loading server cart:", error);
      }
    }

    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(localCart);
    setCartCount(
      localCart.reduce((acc, item) => acc + (item.quantity || 0), 0),
    );
  }, [domain]);

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [loadCart]);

  return (
    <div className="absolute top-[60px] right-0 w-[280px] flex flex-col max-h-[400px] rounded-xl border border-gray-200 shadow-2xl bg-white/95 backdrop-blur-md z-50 overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <span className="font-bold text-gray-700">My Cart</span>
        <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full">
          {cartCount} Items
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id || item.product_id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-white border border-gray-100 rounded-md overflow-hidden">
                <img
                  src={item.product_image || defaultImage}
                  alt={item.product_name}
                  className="w-full h-full object-contain"
                  onError={(e) => (e.target.src = defaultImage)}
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.product_id}`}
                  className="block text-sm font-medium text-gray-800 truncate hover:text-green-600"
                >
                  {item.product_name}
                </Link>

                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-xs font-semibold text-gray-700">
                    Rs. {item.price * item.quantity}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id, item.product_id, setCartItems)}
                className="p-2 ml-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <div className="py-10 text-center">
            <p className="text-gray-400 text-sm">Your cart is empty</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-3 bg-gray-50 border-t border-gray-100">
          <Link
            to="/checkout"
            className="flex items-center justify-center w-full py-2.5 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition-transform active:scale-95 shadow-md"
          >
            Go to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartList;
