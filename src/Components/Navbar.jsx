import { GoSearch } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import logo from "../assets/images/logo1.png";
import { Link } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    return (
        <>
            <nav className="z-9">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo Section */}
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-bold text-white">
                                <img src={logo} alt="Logo" className="w-[10rem]" />
                            </h1>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden sm:flex items-center space-x-8">
                            <Link to='/' className="font-semibold text-gray-950">Home</Link>
                            <Link to="/shop" className="font-semibold text-gray-950">Shop</Link>
                            <Link to='/about' className="font-semibold text-gray-950">About</Link>
                            <Link to='/contact' className="font-semibold text-gray-950">Contact Us</Link>
                        </div>

                        {/* Icons Section */}
                        <div className="flex items-center space-x-4">
                            <GoSearch className="cursor-pointer text-2xl text-black font-semibold" />
                            <div className="border-l border-gray-950 h-6 font-bold"></div>
                            <div className="flex items-center space-x-1 cursor-pointer text-black font-semibold relative">
                                <CiShoppingCart className="text-2xl font-semibold" onClick={() => setIsCartOpen(!isCartOpen)} />
                                <span>0</span>
                                {isCartOpen && (
                                    <div className="absolute top-[4vh] right-0 w-[180px] p-3 max-h-[200px] overflow-auto rounded-md border-2 no-scrollbar space-y-2 z-3 bg-gray-300">
                                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-600 hover:text-white text-center">Product 1</Link>
                                        <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-600 hover:text-white text-center">Product 2</Link>
                                        <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-600 hover:text-white text-center">Product 3</Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="sm:hidden">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-950 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                            {isMenuOpen && (
                                <div className="absolute top-[6vh] lg:top-[11vh] right-5 w-[92%] px-2 pt-2 pb-3 space-y-1 bg-gray-700 rounded-md shadow-lg">
                                    <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Home</Link>
                                    <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white">Products</Link>
                                    <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white">Shop Locations</Link>
                                    <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white">About</Link>
                                    <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white">Contact Us</Link>
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
