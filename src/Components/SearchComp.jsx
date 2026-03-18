import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const domain = window.API_BASE_URL;
const prod_API_URL = `${domain}api/products/`;

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);

  const [prodlist, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(prod_API_URL);
        const data = await response.json();
        setProductList(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
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
      const filtered =
        searchQuery.trim() === ""
          ? []
          : prodlist
              .filter((product) =>
                product.name?.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleProductClick = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProducts([]);
    setIsOpen(false);
  };

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
          />

          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>

        {isOpen && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
            {loading ? (
              /* Skeleton Loader */
              <ul className="max-h-70 overflow-y-auto">
                {[...Array(5)].map((_, idx) => (
                  <li key={idx} className="px-4 py-3 animate-pulse">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-4 w-40 bg-gray-300 rounded"></div>
                        <div className="h-3 w-24 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : filteredProducts.length > 0 ? (
              <ul className="max-h-70 overflow-y-auto no-scrollbar">
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <Link to={`/product/${product.id}/${product.slug}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {product.category?.name}
                          </p>
                        </div>
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