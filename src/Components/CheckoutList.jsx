import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CheckoutList = () => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cleanedCart = cart.map(item => ({ ...item, price: Number(item.price) }));
    setCartItems(cleanedCart);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  const updateCart = (updatedCart) => {
    const cleanedCart = updatedCart.map(item => ({ ...item, price: Number(item.price) }));
    localStorage.setItem("cart", JSON.stringify(cleanedCart));
    setCartItems(cleanedCart);
  };

  const increaseQty = (id) => {
    const cart = [...cartItems];
    const item = cart.find(p => p.id === id);
    if (item) {
      item.quantity += 1;
      updateCart(cart);
    }
  };

  const decreaseQty = (id) => {
    const cart = [...cartItems];
    const item = cart.find(p => p.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      updateCart(cart);
    }
  };

  const deleteItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const grandTotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">🛒 Checkout List</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 uppercase text-sm">
              <th className="py-3 px-5">Product</th>
              <th className="py-3 px-5">Price</th>
              <th className="py-3 px-5">Quantity</th>
              <th className="py-3 px-5">Subtotal</th>
              <th className="py-3 px-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <tr key={item.id} className="text-center border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-5 flex items-center justify-center gap-3">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      loading="lazy"
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                    <Link
                      to={`/product/${item.id}/${item.product_name}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {item.product_name}
                    </Link>
                  </td>
                  <td className="py-3 px-5 text-gray-700 font-semibold">Rs. {item.price.toFixed(2)}</td>
                  <td className="py-3 px-5">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                      >
                        −
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-5 font-semibold text-gray-800">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-3 px-5">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-600 font-medium transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400 font-medium">
                  Your cart is empty 😢
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-amber-400 text-gray-900 font-bold">
              <td colSpan={3} className="py-3 px-5 text-right">Grand Total</td>
              <td className="py-3 px-5">Rs. {grandTotal.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <button className="py-3 px-7 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutList;