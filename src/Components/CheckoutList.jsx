import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ShippingAddress } from "..";
import { handleRemoveItem } from "./utils/cartOp";

const CheckoutList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const navigate = useNavigate();
  const domain = window.API_BASE_URL || "http://127.0.0.1:8000/";

  const loadCart = useCallback(async () => {
    const token = localStorage.getItem("access_token");
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
            quantity: item.quantity || 1,
            // Simple check: make sure we keep track of current stock from the server
            stock: item.product?.stock ?? 99, 
            price: Number(item.product?.discounted_price || item.product?.price || 0),
          }));
          setCartItems(cleanedCart);
          return;
        }
      } catch (error) {
        console.error("Error loading server cart:", error);
      }
    }
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(localCart.map((item) => ({ ...item, price: Number(item.price) })));
  }, [domain]);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [loadCart]);

  const saveAndDispatch = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = (productId, delta) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.product_id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);
    saveAndDispatch(updatedCart);
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to remove all items?")) {
      saveAndDispatch([]);
    }
  };

  // --- 🛠️ SIMPLE PLACE ORDER WITH STOCK CHECK ---
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) return alert("Please login first.");
    if (cartItems.length === 0) return alert("Cart is empty.");
    if (!addressData?.address_line || !addressData?.phone_number) {
      return alert("Please fill in all shipping details.");
    }
    for (const item of cartItems) {
      if (item.stock <= 0 || item.quantity > item.stock) {
        return alert(`Insufficient stock for ${item.product_name}.`);
      }
    }

    setLoading(true);

    try {
      // 2. SAVE ADDRESS
      const addrRes = await fetch(`${domain}api/shipping-address/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      if (!addrRes.ok) throw new Error("Could not save address.");

      // 3. PLACE ORDER
      const orderRes = await fetch(`${domain}api/orders/place/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (orderRes.ok) {
        // SUCCESS: Clear cart and go to success page
        localStorage.removeItem("cart");
        setCartItems([]);
        window.dispatchEvent(new Event("cartUpdated"));
        navigate("/order-success");
      } else {
        // ERROR: Show backend error or stock error
        const errorData = await orderRes.json().catch(() => ({}));
        alert(errorData.detail || "Order failed. Insufficient stock.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const grandTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white shadow-xl rounded-3xl p-6 md:p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Review Order</h1>
              {cartItems.length > 0 && (
                <button onClick={clearCart} className="text-xs font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-full border border-red-100">
                  CLEAR CART
                </button>
              )}
            </div>

            <div className="overflow-hidden border border-gray-100 rounded-2xl mb-8">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-black">
                  <tr>
                    <th className="px-6 py-4">Item</th>
                    <th className="px-6 py-4 text-center">Qty</th>
                    <th className="px-6 py-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cartItems.map((item) => (
                    <tr key={item.id || item.product_id}>
                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-800">{item.product_name}</p>
                        <button onClick={() => handleRemoveItem(item.id, item.product_id, setCartItems)} className="text-xs text-red-400 font-bold">REMOVE</button>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center bg-gray-100 rounded-full w-max mx-auto p-1">
                          <button onClick={() => updateQty(item.product_id, -1)} className="w-7 h-7">−</button>
                          <span className="font-black px-4">{item.quantity}</span>
                          <button onClick={() => updateQty(item.product_id, 1)} className="w-7 h-7">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-black">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center bg-gray-900 rounded-2xl p-6 text-white">
              <div>
                <p className="text-gray-400 text-[10px] font-bold">Total</p>
                <p className="text-3xl font-black">Rs. {grandTotal.toLocaleString()}</p>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={loading || cartItems.length === 0}
                className={`px-10 py-4 rounded-xl font-black ${loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-500"}`}
              >
                {loading ? "PROCESSING..." : "PLACE ORDER"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <div className="bg-white shadow-xl rounded-3xl p-6 border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Shipping Address</h3>
              <ShippingAddress onAddressChange={(data) => setAddressData(data)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutList;