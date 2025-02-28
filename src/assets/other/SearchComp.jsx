import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import products from "../../../MOCK_DATA.json";

const SearchComp = () => {
    const [query, setQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchRef = useRef(null);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    const filteredData = products.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    const toggleSearch = () => {
        setIsSearchVisible(true);
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsSearchVisible(false);
        }
    };

    // Attach event listener for clicks outside the search box
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={searchRef}>
            {/* Search Icon */}
            {!isSearchVisible && (
                <FaSearch
                    className="text-gray-600 cursor-pointer text-xl hover:text-gray-900 transition"
                    onClick={toggleSearch}
                />
            )}

            {/* Search Input Field */}
            {isSearchVisible && (
                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={handleSearch}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                    />

                    {/* Search Results Dropdown */}
                    {query && (
                        <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-50">
                            <ul className="max-h-60 overflow-y-auto no-scrollbar">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 text-gray-800 hover:bg-gray-200 transition duration-200 cursor-pointer"
                                        >
                                            <Link to={`/product/${item.id}`}>{item.title}</Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-gray-400">No results found</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchComp;
