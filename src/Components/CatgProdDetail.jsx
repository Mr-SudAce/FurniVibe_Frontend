import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const CatgProdDetail = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
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
    let result = (category || "All").toLowerCase() === "all"
      ? products
      : products.filter(p => p.category?.name?.toLowerCase() === category.toLowerCase());

    if (sortOrder === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "high-low") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, sortOrder]);

  const displayProducts = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-12 font-sans">
      {/* 1. Header Section */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8">
        <div>
          <nav className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Collection</nav>
          <h1 className="text-5xl font-black text-gray-900 capitalize tracking-tighter">
            {category || "All Products"}
          </h1>
        </div>
        
        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg">
          <span className="text-xs font-bold text-gray-400 uppercase ml-2">Sort</span>
          <select 
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer"
          >
            <option value="">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* 2. Sidebar Filter */}
        <aside className="w-full lg:w-56 shrink-0">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-6">Categories</h3>
          <ul className="flex flex-wrap lg:flex-col gap-2">
            {categories.map((cat) => {
              const active = (category || "All").toLowerCase() === cat.toLowerCase();
              return (
                <li key={cat}>
                  <Link
                    to={`/category/${cat}`}
                    className={`block px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      active ? "bg-black text-white" : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* 3. Product Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
            {loading ? (
              Array(6).fill(0).map((_, i) => <Skeleton key={i} />)
            ) : displayProducts.length > 0 ? (
              displayProducts.map((p) => <ProductCard key={p.id} p={p} defaultImg={defaultImg} />)
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 italic">
                No items found in this category.
              </div>
            )}
          </div>

          {/* 4. Minimalist Pagination */}
          {!loading && filteredItems.length > itemsPerPage && (
            <div className="mt-20 flex justify-center items-center gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-black hover:text-white transition disabled:opacity-20"
              >
                &larr;
              </button>
              {[...Array(Math.ceil(filteredItems.length / itemsPerPage))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition ${
                    currentPage === i + 1 ? "bg-black text-white shadow-lg" : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= Math.ceil(filteredItems.length / itemsPerPage)}
                className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-black hover:text-white transition disabled:opacity-20"
              >
                &rarr;
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Clean Sub-components
const ProductCard = ({ p, defaultImg }) => (
  <Link to={`/product/${p.id}/${p.slug}`} className="group block">
    <div className="relative aspect-[6/4] overflow-hidden bg-gray-100 rounded-2xl mb-4">
      <img
        src={p.images?.[0]?.image || defaultImg}
        alt={p.name}
        className="w-full h-full object-cover transition-transform duration-700 "
      />
      {p.discounted_price && (
        <div className="absolute top-4 left-4 bg-white text-[10px] font-black uppercase tracking-tighter px-2 py-1 shadow-sm">
          Sale
        </div>
      )}
    </div>
    <div className="px-1">
      <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-gray-600 transition">
        {p.name}
      </h3>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm font-black text-black">Rs. {p.discounted_price || p.price}</span>
        {p.discounted_price && (
          <span className="text-xs text-gray-400 line-through">Rs. {p.price}</span>
        )}
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
    images: PropTypes.arrayOf(PropTypes.shape({
      image: PropTypes.string,
    })),
  }).isRequired,
  defaultImg: PropTypes.string.isRequired,
};

const Skeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[4/5] bg-gray-200 rounded-2xl mb-4" />
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/4" />
  </div>
);

export default CatgProdDetail;