import { useEffect, useState, useRef } from "react";
import { CiShoppingCart, CiMenuBurger, CiUser } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Index from "../index.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const cartRef = useRef(null);

  const LogoUrl = window.Logo_Url;
  const domain = window.API_BASE_URL;
  const cartUrl = `${domain}api/cart/`;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateNavbarState = async () => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    if (token) {
      try {
        const response = await fetch(cartUrl, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCartCount(data.cart_items?.length || 0);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartCount(0);
      }
    }
  };

  useEffect(() => {
    updateNavbarState();
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="z-[100] fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 transition-transform hover:scale-105 duration-300">
            <Link to="/" className="flex items-center">
              <img
                src={LogoUrl}
                alt="FurniVibe"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`group relative py-2 text-[12px] font-black tracking-[0.15em] uppercase transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-green-800"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-green-700 transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full opacity-50"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3 md:space-x-6">
            <div className="hidden lg:block">
              <Index.SearchComp />
            </div>

            {/* Cart Dropdown */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all relative group"
              >
                <CiShoppingCart className="text-2xl text-gray-800 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-[-10px] right-0 bg-green-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {isCartOpen && (
                /* Removed 'overflow-hidden' to allow the list to be visible */
                <div className="absolute z-[110] top-14 right-0 w-80 bg-white shadow-2xl rounded-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  <Index.CartList />
                </div>
              )}
            </div>

            {/* User Account Capsule */}
            <div className="relative" ref={profileRef}>
              {isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center gap-2 p-1.5 pl-4 pr-1.5 border rounded-full transition-all duration-300 ${
                      isProfileOpen
                        ? "border-green-600 bg-green-50/30 ring-2 ring-green-100"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-[11px] font-black text-gray-700 uppercase tracking-tight hidden sm:inline">
                      My Account
                    </span>
                    <div className="bg-green-700 text-white p-1.5 rounded-full shadow-sm">
                      <CiUser className="text-lg" />
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute top-14 right-0 w-56 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 animate-in fade-in slide-in-from-top-4 duration-200 origin-top-right">
                      <div className="px-4 py-2 mb-2 border-b border-gray-50">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Dashboard
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/my-orders"
                        className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"
                      >
                        Order History
                      </Link>
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-green-800 text-white text-[11px] font-black uppercase tracking-[0.1em] rounded-full hover:bg-black transition-all shadow-lg shadow-green-100 hover:shadow-none active:scale-95"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Burger Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <IoCloseOutline className="text-3xl" />
              ) : (
                <CiMenuBurger className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[80px] bg-white z-[99] animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col h-full p-8">
            <div className="space-y-4">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className={`block text-3xl font-black tracking-tighter animate-in fade-in slide-in-from-left-4 ${
                    location.pathname === link.path
                      ? "text-green-700"
                      : "text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {!isLoggedIn && (
              <div className="mt-auto mb-20 grid grid-cols-1 gap-4">
                <Link
                  to="/login"
                  className="w-full py-5 text-center bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full py-5 text-center border-2 border-gray-900 rounded-2xl font-black uppercase tracking-widest text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
