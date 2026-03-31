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

  const defaultImg = window.Logo_Url;

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
        const productsArray = Array.isArray(data) 
          ? data 
          : (data.results || data.products || []);
          
        setProductList(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductList([]);
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
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      const filtered = Array.isArray(prodlist) 
        ? prodlist
            .filter((product) =>
              product.name?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 6) // Showing top 6
        : [];

      setFilteredProducts(filtered);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, prodlist]);

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredProducts([]);
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto relative px-4" ref={searchRef}>
      <div className="relative group">
        {/* 1. Boutique Search Bar */}
        <div className="relative flex items-center transition-all duration-500">
          <FiSearch className={`absolute left-5 transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-gray-400'}`} />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setIsOpen(true); }}
            onFocus={() => searchQuery && setIsOpen(true)}
            placeholder="Search our collection..."
            className="w-full pl-14 pr-12 py-4 bg-white border border-gray-100 rounded-full text-sm tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.02)] focus:shadow-[0_15px_40px_rgba(0,0,0,0.05)] focus:border-orange-200 outline-none transition-all placeholder:text-gray-300 placeholder:italic"
          />

          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-5 text-gray-300 hover:text-orange-500 transition-colors"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* 2. Boutique Results Dropdown */}
        {isOpen && searchQuery.trim() !== "" && (
          <div className="absolute w-full bg-white rounded-[2rem] shadow-[0_30px_90px_rgba(0,0,0,0.12)] border border-gray-50 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-4 border-b border-gray-50 bg-gray-50/30">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 px-2">
                    Search Results
                </span>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                 <div className="animate-spin h-5 w-5 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <ul className="max-h-[450px] overflow-y-auto custom-scrollbar">
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.id}/${product.slug}`}
                      onClick={clearSearch}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-orange-50/50 transition-all group/item"
                    >
                      {/* Image Preview */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-50">
                        <img 
                            src={product.images?.[0]?.image || defaultImg} 
                            alt="" 
                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex flex-col flex-1">
                        <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-0.5">
                          {product.category?.name || "Furniture"}
                        </span>
                        <span className="text-base font-serif italic text-gray-800 leading-tight">
                          {product.name}
                        </span>
                        <span className="text-[11px] font-bold text-gray-400 mt-1">
                           Rs. {product.discounted_price || product.price}
                        </span>
                      </div>
                      
                      <div className="opacity-0 group-hover/item:opacity-100 transition-opacity pr-2 text-orange-500">
                         <FiSearch className="w-4 h-4" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-400 font-serif italic text-lg">No pieces found.</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-300 mt-2">Try a different keyword</p>
              </div>
            )}
            
            {/* View All Footer */}
            {filteredProducts.length > 0 && (
                <div className="p-4 bg-gray-50/50 border-t border-gray-50 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Scroll to see more pieces
                    </p>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;