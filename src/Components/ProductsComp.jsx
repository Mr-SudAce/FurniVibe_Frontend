import { useEffect, useState } from "react";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa6";
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
        console.log("Pordutc:::::::::::::::::::::::::", productsArray);
        
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
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        {categories.map((category) => {
          const categoryProducts = products.filter((p) => p.category?.name === category);
          const total = categoryProducts.length;
          const isShowingAll = visible[category] >= total;

          return (
            <div key={category} className="mb-20">
              {/* Modern Category Header */}
              <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">Discover</span>
                  <h2 className="text-4xl font-light text-gray-900 capitalize">{category}</h2>
                </div>
                <Link
                  to={`/category/${category}`}
                  className="flex items-center gap-2 text-sm font-bold hover:gap-4 transition-all text-gray-900"
                >
                  VIEW ALL <FaArrowRight size={14} />
                </Link>
              </div>

              {/* Refined Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {categoryProducts.slice(0, visible[category]).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {total > 4 && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => toggleVisibility(category, total)}
                    className="flex items-center gap-2 text-xs font-black tracking-widest uppercase py-3 px-8 border border-gray-200 hover:bg-black hover:text-white transition-all rounded-full"
                  >
                    {isShowingAll ? (
                      <>Show Less <FaChevronUp /></>
                    ) : (
                      <>Show More ({total - 4}+ Items) <FaChevronDown /></>
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
    className="group block"
  >
    <div className="relative aspect-[6/4] overflow-hidden bg-gray-50 rounded-2xl mb-4">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="object-cover w-full h-full transition-transform duration-700"
      />
      {product.discount_percent > 20 && (
        <div className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] font-black uppercase shadow-sm">
          Special Offer
        </div>
      )}
    </div>
    <div className="space-y-1">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
        {product.category?.name}
      </h3>
      <h2 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition">
        {product.name}
      </h2>
      <p className="text-sm font-black text-black">
        Rs. {product.discounted_price || product.price}
      </p>
    </div>
  </Link>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    slug: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    discount_percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    discounted_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

// Modular Skeleton Loader
const SkeletonLoader = () => (
  <section className="container mx-auto px-6 py-16">
    {[...Array(2)].map((_, idx) => (
      <div key={idx} className="mb-20 animate-pulse">
        <div className="h-10 w-48 bg-gray-100 rounded mb-10"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((__, idy) => (
            <div key={idy}>
              <div className="aspect-[4/5] bg-gray-100 rounded-2xl mb-4"></div>
              <div className="h-4 bg-gray-100 w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-100 w-full mb-2"></div>
              <div className="h-4 bg-gray-100 w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </section>
);

export default ProductsComp;