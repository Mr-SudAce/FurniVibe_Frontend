import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo1.png";
// import SearchComp from "../assets/Components/SearchComp";
// import CartList from "../assets/Components/CartList";
import SearchComp from "../Components/SearchComp";
import CartList from "../Components/CartList";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const uniqueCartItems = Array.from(new Set(cartItems.map(item => item.id)))
            .map(id => cartItems.find(item => item.id === id));
        setCartCount(uniqueCartItems.length);
    }, [cartCount, setCartCount]);

    return (
        <>
            <nav className="z-50 fixed top-0 w-full bg-white/70 backdrop-blur-md shadow-md mb-20">
                <div className="mx-auto px-6 lg:px-10">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Link to="/">
                                <img src={logo} alt="Logo" className="w-[10rem] hover:opacity-80 transition" />
                            </Link>
                        </div>
                        <div className="hidden sm:flex items-center space-x-8">
                            <Link to="/" className="font-semibold text-gray-800 hover:text-blue-600 transition">Home</Link>
                            <Link to="/shop" className="font-semibold text-gray-800 hover:text-blue-600 transition">Shop</Link>
                            <Link to="/about" className="font-semibold text-gray-800 hover:text-blue-600 transition">About</Link>
                            <Link to="/contact" className="font-semibold text-gray-800 hover:text-blue-600 transition">Contact Us</Link>
                        </div>
                        <div className="flex items-center space-x-5 relative">
                            <SearchComp />
                            <div className="border-l border-gray-400 h-6"></div>
                            <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
                                <CiShoppingCart className="text-2xl text-gray-700 hover:text-gray-600 transition" />
                                <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                                {isCartOpen && (
                                    <CartList />
                                )}
                            </div>
                        </div>
                        <div className="sm:hidden">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-700 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white transition"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                            {isMenuOpen && (
                                <div className="absolute top-[60px] right-5 w-[92%] px-4 py-3 bg-gray-700 rounded-md shadow-lg transition-all duration-300">
                                    <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Home</Link>
                                    <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white transition">Shop</Link>
                                    <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white transition">About</Link>
                                    <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white transition">Contact Us</Link>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
