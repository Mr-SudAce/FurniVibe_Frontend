import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0); // total quantity

  // Load cart from localStorage
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ensure quantity is a number
    const cleanedCart = cart.map(item => ({ ...item, quantity: item.quantity || 1 }));

    setCartItems(cleanedCart);

    // Update total items count
    const totalItems = cleanedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  };

  useEffect(() => {
    loadCart();

    // Listen for cart updates from ProductDetail
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  // Count per unique product
  const productCounts = cartItems.reduce((acc, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {});

  const uniqueCartItems = Array.from(new Set(cartItems.map(item => item.id)))
    .map(id => cartItems.find(item => item.id === id));

  return (
    <div className="absolute top-[50px] right-0 w-[220px] p-3 max-h-[250px] overflow-auto rounded-lg border border-gray-300 shadow-lg bg-white/95 backdrop-blur-md space-y-2 z-50">
      
      {/* Optional: display cart count */}
      <div className="text-right text-sm font-semibold text-gray-700 mb-2">
        Total Items: {cartCount}
      </div>

      {uniqueCartItems.length > 0 ? (
        <>
          {uniqueCartItems.map((item) => (
            <div
              key={item.id}
              className="block px-4 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-600 hover:text-white text-right transition duration-200"
            >

              <img
                src={item.product_image}
                alt={item.product_name}
                className="inline-block w-10 h-10 mr-2 rounded"
              />

              <Link to={`/product/${item.id}/${item.product_name}`}>
                {item.product_name}

                <sup className="text-red-500 text-sm pl-2">
                  {productCounts[item.id] > 1 && `x${productCounts[item.id]}`}
                </sup>
              </Link>

            </div>
          ))}

          <Link
            to="/checkout"
            className="flex justify-center text-blue-500 pt-2"
          >
            Checkout
          </Link>
        </>
      ) : (
        <p className="text-center text-gray-800">Your cart is empty.</p>
      )}

    </div>
  );
};

export default CartList;