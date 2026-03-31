import { useEffect, useState } from "react";
import { CiShoppingCart, CiMenuBurger} from "react-icons/ci";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Index from "../index.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Used to highlight active links

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
      setCartCount(data.cart_items?.length || 0);
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

  // Helper for active link styling without hover
  const navLinkClass = (path) => 
    `relative px-1 py-2 text-sm font-semibold tracking-widest uppercase transition-colors ${
      location.pathname === path ? "text-green-700" : "text-gray-600"
    }`;

  const activeIndicator = (path) => 
    location.pathname === path && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-700 rounded-full"></span>
    );

  return (
    <nav className="z-50 fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={LogoUrl} alt="FurniVibe" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className={navLinkClass("/")}>
              Home {activeIndicator("/")}
            </Link>
            <Link to="/shop" className={navLinkClass("/shop")}>
              Shop {activeIndicator("/shop")}
            </Link>
            <Link to="/about" className={navLinkClass("/about")}>
              About {activeIndicator("/about")}
            </Link>
            <Link to="/contact" className={navLinkClass("/contact")}>
              Contact {activeIndicator("/contact")}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <Index.SearchComp />
            </div>

            <div className="relative flex items-center h-10 px-3 bg-gray-50 rounded-full border border-gray-100">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-1"
              >
                <CiShoppingCart className="text-2xl text-gray-800 cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white ">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <div className="mx-3 w-[1px] h-4 bg-gray-300"></div>

              {isLoggedIn ? (
                <button onClick={handleLogout} className="text-xs font-bold text-red-500 uppercase tracking-tighter cursor-pointer">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-xs font-bold text-green-700 uppercase tracking-tighter">
                  Sign In
                </Link>
              )}

              {isCartOpen && (
                <div className="absolute top-12 right-0 shadow-2xl">
                   <Index.CartList />
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-800"
            >
              <CiMenuBurger className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block px-4 py-3 text-lg font-medium border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block px-4 py-3 text-lg font-medium border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/profile" className="block px-4 py-3 text-lg font-medium border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
            {!isLoggedIn && (
               <div className="grid grid-cols-2 gap-4 mt-4 px-4">
                  <Link to="/login" className="text-center py-3 bg-gray-100 rounded-xl font-bold">Login</Link>
                  <Link to="/register" className="text-center py-3 bg-green-700 text-white rounded-xl font-bold">Join</Link>
               </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;