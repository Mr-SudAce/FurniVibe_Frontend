
import { GoSearch } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import logo from "../assets/images/logo1.png";

const Navbar = () => {
    return (
        <>
            <nav className=" text-white">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo Section */}
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-bold text-white">
                                <img src={logo} alt="" className="w-[10rem]" />
                            </h1>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden sm:flex items-center space-x-8">
                            <a href="#" className="font-semibold text-orange-400">Home</a>
                            <a href="#" className="hover:text-orange-400">Products</a>
                            <a href="#" className="hover:text-orange-400">Shop Locations</a>
                            <a href="#" className="hover:text-orange-400">About</a>
                            <a href="#" className="hover:text-orange-400">Contact Us</a>
                        </div>

                        {/* Icons Section */}
                        <div className="flex items-center space-x-4">
                            <GoSearch className="w-5 h-5 cursor-pointer text-gray-300 hover:text-white" />
                            <div className="border-l border-gray-500 h-6"></div>
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                                <CiShoppingCart className="w-5 h-5" />
                                <span>(0)</span>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="sm:hidden">
                            <button type="button" className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="sm:hidden px-2 pt-2 pb-3 space-y-1 bg-gray-700">
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Home</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white">Products</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white">Shop Locations</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white">About</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-600 hover:text-white">Contact Us</a>
                </div>
            </nav>

        </>
    );
};

export default Navbar;
