import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductsComp = () => {
  const domain = window.API_BASE_URL;
  const API_URL = `${domain}api/products/`;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token") || ""}`,
          },
        });
        const data = await response.json();
        const productsArray = Array.isArray(data) ? data : data.products || data.results || [];

        setProducts(productsArray);
        
        const uniqueCategories = [
          ...new Set(productsArray.map((p) => p.category?.name).filter(Boolean)),
        ];
        setCategories(uniqueCategories);

        const visibility = {};
        uniqueCategories.forEach((cat) => (visibility[cat] = 4));
        setVisible(visibility);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_URL]);
  const toggleVisibility = (category, total) => {
    setVisible((prev) => ({
      ...prev,
      [category]: prev[category] < total ? total : 4,
    }));
  };

  if (loading) return <SkeletonLoader />;

  return (
    <section className="bg-[#FCFCFC] py-24">
      <div className="container mx-auto px-6">
        {categories.map((category) => {
          const categoryProducts = products.filter((p) => p.category?.name === category);
          const total = categoryProducts.length;
          const isShowingAll = visible[category] >= total;

          return (
            <div key={category} className="mb-24">
              {/* Premium Category Header */}
              <div className="flex justify-between items-end mb-12 relative">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-12 bg-orange-500 rounded-full"></div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-orange-500 uppercase">Collection</span>
                    <h2 className="text-4xl font-serif text-gray-900 capitalize leading-none mt-1">{category}</h2>
                  </div>
                </div>
                <Link
                  to={`/category/${category}`}
                  className="pb-1 border-b-2 border-gray-900 text-xs font-black tracking-widest text-gray-900 uppercase"
                >
                  View Gallery
                </Link>
              </div>

              {/* Refined Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
                {categoryProducts.slice(0, visible[category]).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Static Toggle Button */}
              {total > 4 && (
                <div className="flex justify-center mt-16">
                  <button
                    onClick={() => toggleVisibility(category, total)}
                    className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase py-4 px-10 bg-gray-900 text-white rounded-full shadow-lg transition-transform active:scale-95"
                  >
                    {isShowingAll ? (
                      <>Collapse <FaChevronUp /></>
                    ) : (
                      <>Explore {total - 4} More <FaChevronDown /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const ProductCard = ({ product }) => (
  <Link
    to={`/product/${product.id}/${product.slug}`}
    className="block group"
  >
    <div className="relative aspect-[6/4] overflow-hidden bg-gray-100 rounded-3xl mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="object-cover w-full h-full"
      />
      {product.discount_percent > 20 && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter text-orange-600 shadow-sm border border-orange-100">
          {product.discount_percent}% OFF
        </div>
      )}
    </div>
    
    <div className="px-1 space-y-2">
      <div className="flex justify-between items-start">
        <div className="max-w-[70%]">
          <h3 className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">
            {product.category?.name}
          </h3>
          <h2 className="text-lg font-medium text-gray-800 leading-tight">
            {product.name}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-base font-bold text-gray-900">
            Rs. {product.discounted_price || product.price}
          </p>
          {product.discounted_price && (
             <p className="text-[10px] text-gray-400 line-through">Rs. {product.price}</p>
          )}
        </div>
      </div>
    </div>
  </Link>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discounted_price: PropTypes.number,
    discount_percent: PropTypes.number,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

// ... (PropTypes and Skeleton remain same but updated with rounded-3xl classes)
const SkeletonLoader = () => (
  <section className="container mx-auto px-6 py-24">
    {[...Array(1)].map((_, idx) => (
      <div key={idx} className="mb-20 animate-pulse">
        <div className="h-12 w-64 bg-gray-200 rounded-lg mb-12"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[...Array(4)].map((__, idy) => (
            <div key={idy}>
              <div className="aspect-[6/4] bg-gray-200 rounded-3xl mb-6"></div>
              <div className="h-4 bg-gray-200 w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-200 w-full mb-2"></div>
              <div className="h-4 bg-gray-200 w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </section>
);

export default ProductsComp;