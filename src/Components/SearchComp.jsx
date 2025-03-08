import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const domain = window.API_BASE_URL;

const prod_API_URL = `${domain}api/product/all/`;

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const searchRef = useRef(null);

    const [prodlist, setProductList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(prod_API_URL);
                const data = await response.json();
                setProductList(data);
                console.log("Product List is here:", data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            const filtered = prodlist
                .filter((product) =>
                    product.product_name.toLowerCase().startsWith(searchQuery.toLowerCase())
                )
                .slice(0, 5);
            setFilteredProducts(filtered);
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery, prodlist]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setIsOpen(true);
    };

    const handleProductClick = (product) => {
        console.log("Selected product:", product);
        setIsOpen(false);
        setSearchQuery("");
    };

    const clearSearch = () => {
        setSearchQuery("");
        setFilteredProducts([]);
        setIsOpen(false);
    };

    // const formatPrice = (price) => {
    //     return new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: 'USD',
    //     }).format(price);
    // };

    return (
        <div className="max-w-2xl mx-auto p-4" ref={searchRef}>
            <div className="relative">
                <div className="relative flex items-center">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
                        aria-label="Search products"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            aria-label="Clear search"
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {isOpen && (
                    <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                        {filteredProducts.length > 0 ? (
                            <ul className="max-h-70 overflow-y-auto no-scrollbar">
                                {filteredProducts.map((product) => (
                                    <li
                                        key={product.id}
                                        onClick={() => handleProductClick(product)}
                                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                                        role="button"
                                        tabIndex="0"
                                    >
                                        <Link to={`/product/${product.id}/${product.product_name}`}>
                                            <div className="flex justify-between items-center ">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        {product.product_name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500">
                                                        {product.product_cat.category_name}
                                                    </p>
                                                </div>
                                                {/* <span className="text-sm font-semibold text-blue-600">
                                                    {formatPrice(product.product_price)}
                                                </span> */}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                No results found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
