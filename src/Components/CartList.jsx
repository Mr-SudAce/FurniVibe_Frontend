import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cleanedCart = cart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));

    setCartItems(cleanedCart);

    const totalItems = cleanedCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    setCartCount(totalItems);
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  return (
    <div className="absolute top-[50px] right-0 w-[220px] p-3 max-h-[250px] overflow-auto rounded-lg border border-gray-300 shadow-lg bg-white/95 backdrop-blur-md space-y-2 z-50">
      {cartItems.length > 0 ? (
        <>
          <div className="text-right text-sm font-semibold text-gray-700 mb-2">
            Total Items: {cartCount}
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-800 hover:bg-gray-600 hover:text-white transition"
            >
              <img
                src={item.product_image}
                alt={item.product_name}
                loading="lazy"
                className="w-10 h-10 rounded object-cover"
              />

              <Link
                to={`/product/${item.id}/${item.product_name}`}
                className="flex-1 text-sm truncate"
              >
                {item.product_name}

                {item.quantity > 1 && (
                  <sup className="text-red-500 pl-1">
                    x{item.quantity}
                  </sup>
                )}
              </Link>
            </div>
          ))}

          <Link
            to="/checkout"
            className="flex justify-center text-blue-500 pt-2 font-semibold hover:underline"
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