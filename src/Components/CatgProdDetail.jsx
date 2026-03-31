import { useEffect, useState, useMemo, useRef } from "react"; // Added useRef
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { CiSliderHorizontal } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6"; // Added for dropdown arrow

const CatgProdDetail = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false); // New state for dropdown
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const sortRef = useRef(null); // Ref for click-outside

  const sortOptions = [
    { label: "Featured", value: "" },
    { label: "Price: Low - High", value: "low-high" },
    { label: "Price: High - Low", value: "high-low" },
  ];

  // Handle click outside to close sort menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const itemsPerPage = 9;
  const domain = window.API_BASE_URL;
  const defaultImg = window.Logo_Url;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${domain}api/products/`, { headers }),
          fetch(`${domain}api/categories/`, { headers }),
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData);
        setCategories(["All", ...catData.map((c) => c.name)]);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [domain]);

  const filteredItems = useMemo(() => {
    let result =
      (category || "All").toLowerCase() === "all"
        ? [...products]
        : products.filter(
            (p) => p.category?.name?.toLowerCase() === category.toLowerCase(),
          );

    if (sortOrder === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "high-low") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, sortOrder]);

  const displayProducts = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen">
      <div className="container mx-auto px-6 py-20">
        {/* 1. Header Section */}
        <header className="mb-16 border-b border-gray-100 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-16 bg-orange-500 rounded-full"></div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.3em] text-orange-500 uppercase">
                  Boutique Collection
                </span>
                <h1 className="text-5xl font-serif text-gray-900 capitalize mt-1 italic">
                  {category || "All Pieces"}
                </h1>
              </div>
            </div>

            {/* ENHANCED CUSTOM SORT DROPDOWN */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-4 bg-white border border-gray-200 px-6 py-3 rounded-full shadow-sm active:scale-95 transition-all"
              >
                <CiSliderHorizontal className="text-orange-500 text-xl" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800">
                  Sort: {sortOptions.find(o => o.value === sortOrder)?.label || "Featured"}
                </span>
                <FaChevronDown 
                  className={`text-[10px] text-gray-400 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-50 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="py-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortOrder(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors
                          ${sortOrder === option.value 
                            ? "bg-orange-50 text-orange-600 border-r-4 border-orange-500" 
                            : "text-gray-500 active:bg-gray-50"
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* 2. Sidebar */}
          <aside className="w-full lg:w-60 shrink-0">
            <div className="sticky top-32">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 mb-8 border-l-2 border-orange-500 pl-4">
                Categories
              </h3>
              <ul className="flex flex-wrap lg:flex-col gap-3 lg:gap-5">
                {categories.map((cat) => {
                  const isActive =
                    (category || "All").toLowerCase() === cat.toLowerCase();
                  return (
                    <li key={cat}>
                      <Link
                        to={`/category/${cat}`}
                        className={`text-sm tracking-wide transition-all ${
                          isActive
                            ? "text-gray-900 font-bold pl-2 border-l-2 border-gray-900"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {cat}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* 3. Product Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
              {loading ? (
                Array(6).fill(0).map((_, i) => <Skeleton key={i} />)
              ) : displayProducts.length > 0 ? (
                displayProducts.map((p) => (
                  <ProductCard key={p.id} p={p} defaultImg={defaultImg} />
                ))
              ) : (
                <div className="col-span-full py-32 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem]">
                  <p className="text-gray-400 font-serif italic text-lg">
                    No products found in this category.
                  </p>
                </div>
              )}
            </div>

            {/* 4. Pagination */}
            {!loading && filteredItems.length > itemsPerPage && (
              <div className="mt-24 pt-10 border-t border-gray-100 flex justify-center items-center gap-10">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-[10px] font-black uppercase tracking-widest disabled:opacity-20 transition active:scale-90"
                >
                  Previous
                </button>

                <div className="flex gap-6">
                  {[...Array(Math.ceil(filteredItems.length / itemsPerPage))].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`text-sm transition-all ${
                        currentPage === i + 1
                          ? "text-orange-500 font-bold border-b-2 border-orange-500"
                          : "text-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(filteredItems.length / itemsPerPage)}
                  className="text-[10px] font-black uppercase tracking-widest disabled:opacity-20 transition active:scale-90"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ p, defaultImg }) => (
  <Link to={`/product/${p.id}/${p.slug}`} className="block group">
    <div className="relative aspect-[6/4] overflow-hidden bg-gray-100 rounded-[2.5rem] mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
      <img
        src={p.images?.[0]?.image || defaultImg}
        alt={p.name}
        className="w-full h-full object-cover"
      />
      {p.discount_percent > 20 && (
        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter text-orange-600 border border-orange-100 shadow-sm">
          Special Offer
        </div>
      )}
    </div>

    <div className="px-1 space-y-2">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-1">
            {p.category?.name}
          </h3>
          <h2 className="text-lg font-medium text-gray-800 leading-tight">
            {p.name}
          </h2>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-bold text-gray-900">
            Rs. {p.discounted_price || p.price}
          </p>
          {p.discounted_price && (
            <p className="text-[10px] text-gray-400 line-through">
              Rs. {p.price}
            </p>
          )}
        </div>
      </div>
    </div>
  </Link>
);

ProductCard.propTypes = {
  p: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discounted_price: PropTypes.number,
    discount_percent: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
      })
    ),
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  defaultImg: PropTypes.string.isRequired,
};

const Skeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[6/4] bg-gray-200 rounded-[2.5rem] mb-6" />
    <div className="h-4 bg-gray-200 rounded-full w-1/3 mb-2" />
    <div className="h-6 bg-gray-200 rounded-full w-full mb-2" />
    <div className="h-4 bg-gray-200 rounded-full w-1/4" />
  </div>
);

export default CatgProdDetail;