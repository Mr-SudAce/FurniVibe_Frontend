import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import * as Index from "../index.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const LogoUrl = window.Logo_Url;
  const domain = window.API_BASE_URL;
  const cartUrl = `${domain}api/cart/`;

  const updateNavbarState = async () => {
    try {
      const token = localStorage.getItem("access_token");

      setIsLoggedIn(!!token);
      const response = await fetch(cartUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });


      const data = await response.json();

      const totalQuantity = data.cart_items.length || 0;
      setCartCount(totalQuantity);
    } catch (error) {
      console.error("Navbar cart fetch error:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateNavbarState();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="z-50 fixed top-0 w-full bg-white/70 backdrop-blur-md shadow-md">
      <div className="mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img
                src={LogoUrl}
                alt="FurniVibe Logo"
                className="w-[10rem] hover:opacity-80 transition"
              />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden sm:flex items-center space-x-8">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-600 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-600 hover:text-white"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-600 hover:text-white"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-600 hover:text-white"
            >
              Contact Us
            </Link>
          
            <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-600 hover:text-white">
              <p>My Profile</p>
            </Link>

            {/* Dynamic Auth Links (Desktop) */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="font-semibold text-red-600 hover:text-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-5">
                <Link
                  to="/login"
                  className="font-semibold text-green-600 hover:text-green-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="font-semibold text-green-600 hover:text-green-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Search and Cart Icons */}
          <div className="flex items-center space-x-5 relative">
            <Index.SearchComp />

            <div className="border-l border-gray-400 h-6"></div>

            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <CiShoppingCart className="text-2xl text-gray-700 hover:text-green-600 transition" />
              {cartCount > 0 && (
                <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              {isCartOpen && <Index.CartList />}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute top-[60px] right-5 w-[92%] px-4 py-3 bg-white border border-gray-200 rounded-md shadow-xl z-50">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-600 hover:text-white"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-600 hover:text-white"
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-600 hover:text-white"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-600 hover:text-white"
                >
                  Contact Us
                </Link>

                <hr className="my-2 border-gray-100" />

                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-3 py-2 text-red-600 font-bold hover:bg-gray-100 rounded-md"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-green-600 font-bold hover:bg-gray-100 rounded-md"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 text-green-600 font-bold hover:bg-gray-100 rounded-md"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
