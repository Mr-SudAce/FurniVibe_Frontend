import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, CreditCard } from "lucide-react";
import { handleRemoveItem } from "./utils/cartOp";
import * as Index from "../index.jsx";

// 1. Created a reusable Skeleton component for the list items
const SkeletonItem = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center animate-pulse">
    <div className="space-y-3">
      <div className="h-5 bg-slate-200 rounded w-48"></div>
      <div className="h-4 bg-slate-100 rounded w-24"></div>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
      <div className="w-4 h-6 bg-slate-100 rounded"></div>
      <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
    </div>
  </div>
);

const CheckoutList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryType, setDeliveryType] = useState("standard");
  const [initialFetch, setInitialFetch] = useState(true);
  const isSyncing = useRef(false);

  const navigate = useNavigate();
  const domain = window.API_BASE_URL || "http://127.0.0.1:8000/";

  const loadCart = useCallback(async () => {
    if (isSyncing.current) return;

    if (cartItems.length === 0) setInitialFetch(true);

    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${domain}api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      const cartArray = data.cart_items || [];
      const cleaned = cartArray.map((item) => ({
        id: item.id,
        product_id: item.product?.id || item.product_id,
        product_name: item.product?.name || "Unknown Product",
        quantity: item.quantity,
        stock: item.variant?.stock ?? 99,
        price: Number(item.price || 0),
      }));
      setCartItems(cleaned);
    } catch (err) {
      console.error("Cart load error:", err);
    } finally {
      setInitialFetch(false);
    }
  }, [domain, cartItems.length]);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [loadCart]);

  const updateQty = async (productId, delta) => {
    const token = localStorage.getItem("access_token");
    const item = cartItems.find((i) => i.product_id === productId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty < 1)
      return handleRemoveItem(item.id, item.product_id, setCartItems);
    if (newQty > item.stock) return alert("Max stock reached");

    setCartItems((prev) =>
      prev.map((i) =>
        i.product_id === productId ? { ...i, quantity: newQty } : i,
      ),
    );

    if (token) {
      isSyncing.current = true;
      try {
        const res = await fetch(`${domain}api/cart/update/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ item_id: item.id, quantity: newQty }),
        });
        if (!res.ok) throw new Error("Update failed");
        loadCart();
      } catch (err) {
        console.log("Error Loading Cart", err);
        loadCart();
      } finally {
        isSyncing.current = false;
      }
    }
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return alert("Please login");
    if (cartItems.length === 0) return alert("Cart is empty");
    if (!addressData?.id) {
      return alert("Please click 'Save Address' before placing your order.");
    }

    setLoading(true);
    try {
      const orderRes = await fetch(`${domain}api/orders/place/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipping_address_id: addressData.id,
          delivery_type: deliveryType,
          payment_method: paymentMethod,
        }),
      });

      if (orderRes.ok) {
        localStorage.removeItem("cart");
        navigate("/order-success");
      } else {
        const result = await orderRes.json();
        alert(result.detail || "Order failed");
      }
    } catch (e) {
      console.error("Order error:", e);
      alert("Error processing order.");
    } finally {
      setLoading(false);
    }
  };
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const getShippingFee = () => {
    if (subTotal > 5000 || subTotal === 0) return 0;
    if (deliveryType === "express") return 300;
    if (deliveryType === "installation") return 500;
    return 150;
  };

  const shippingFee = getShippingFee();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <h1 className="text-3xl font-black mb-8 text-slate-900">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4">
              {/* 2. Logic to show Skeleton or Items */}
              {initialFetch ? (
                <>
                  <SkeletonItem />
                  <SkeletonItem />
                  <SkeletonItem />
                </>
              ) : cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold">{item.product_name}</h3>
                      <p className="text-green-500 font-bold">
                        Rs. {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQty(item.product_id, -1)}
                        className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-indigo-600">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product_id, 1)}
                        className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                  Your cart is empty.
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
              <Index.ShippingAddress onAddressChange={setAddressData} />
            </div>
          </div>

          <div className="lg:col-span-4 sticky top-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h2 className="font-black text-xl mb-6 text-slate-900">
                Summary
                <div className="w-12 h-[1px] bg-[var(--primary-color)] mt-1"></div>
              </h2>

              <div className="flex justify-between mb-8">
                <span className="font-bold text-slate-500">Total</span>
                {initialFetch ? (
                  <div className="h-8 bg-slate-100 rounded w-32 animate-pulse"></div>
                ) : (
                  <span className="font-black text-3xl text-[var(--primary-color)]">
                    Rs. {(subTotal + shippingFee).toLocaleString()}
                  </span>
                )}
              </div>
              {/* PAYMENT DROPDOWN */}
              <div>
                <label className="text-sm font-semibold">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border p-2 rounded mt-1"
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="esewa">eSewa</option>
                  <option value="khalti">Khalti</option>
                  <option value="stripe">Stripe</option>
                </select>
              </div>

              {/* DELIVERY DROPDOWN */}
              <div>
                <label className="text-sm font-semibold">Delivery Type</label>
                <select
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="w-full border p-2 rounded mt-1"
                >
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                  <option value="installation">Installation</option>
                </select>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading || !addressData?.id || cartItems.length === 0}
                className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${
                  loading || !addressData?.id || cartItems.length === 0
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-[var(--primary-color)] shadow-lg active:scale-95"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <CreditCard size={20} /> Place Order
                  </>
                )}
              </button>

              {!addressData?.id && !initialFetch && (
                <p className="text-red-500 text-xs text-center mt-3 font-medium">
                  * Save address to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutList;
