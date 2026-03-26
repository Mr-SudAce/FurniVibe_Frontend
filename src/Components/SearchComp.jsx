import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const domain = window.API_BASE_URL;
const prod_API_URL = `${domain}api/products/`;

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const [prodlist, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(prod_API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "",
          },
        });

        const data = await response.json();

        // SAFE DATA PARSING: Handle arrays vs objects vs errors
        const productsArray = Array.isArray(data) 
          ? data 
          : (data.results || data.products || []);
          
        setProductList(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductList([]); // Fallback to empty
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced Filtering logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      // Ensure prodlist is an array before filtering
      const filtered = Array.isArray(prodlist) 
        ? prodlist
            .filter((product) =>
              product.name?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5)
        : [];

      setFilteredProducts(filtered);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, prodlist]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
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
            onFocus={() => searchQuery && setIsOpen(true)}
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
          />

          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>

        {isOpen && searchQuery.trim() !== "" && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : filteredProducts.length > 0 ? (
              <ul className="max-h-70 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.id}/${product.slug}`}
                      onClick={() => {
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {product.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {product.category?.name || "Uncategorized"}
                        </span>
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