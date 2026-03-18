import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { Link } from "react-router-dom";

const ProductsComp = () => {
  const domain = window.API_BASE_URL;
  const API_URL = `${domain}api/products/`;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        setProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((p) => p.category?.name)),
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

  const loadMore = (category, total) => {
    setVisible((prev) => ({
      ...prev,
      [category]: Math.min(prev[category] + 4, total),
    }));
  };

  const loadLess = (category) => {
    setVisible((prev) => ({
      ...prev,
      [category]: 4,
    }));
  };

  // Skeleton loader while fetching
  if (loading) {
    return (
      <section className="container mx-auto px-5 py-12">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="mb-10 animate-pulse">
            {/* Category header skeleton */}
            <div className="flex justify-between items-center mb-5 bg-gray-100 p-3 rounded-xl">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>

            {/* Products grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((__, idy) => (
                <div
                  key={idy}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="w-full h-48 bg-gray-300 rounded-md mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-5 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="container mx-auto text-gray-700 body-font">
      <div className="mx-auto px-5 py-12">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (p) => p.category?.name === category,
          );
          const total = categoryProducts.length;

          return (
            <div key={category} className="mb-5">
              {/* Category Header */}
              <div className="flex justify-between items-center mb-5 bg-gray-100 p-3 rounded-xl">
                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                <Link
                  to={`/category/${category}`}
                  className="bg-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition"
                >
                  <FaArrowRight className="text-white" />
                </Link>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:ml-[1em]">
                {categoryProducts.slice(0, visible[category]).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}/${product.slug}`}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition hover:-translate-y-1"
                  >
                    <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-md mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-gray-500 text-sm">
                      {product.category?.name}
                    </h3>
                    <h2 className="text-gray-900 font-medium text-lg mt-1">
                      {product.name}
                    </h2>
                    <p className="text-gray-800 mt-1 font-semibold">
                      Rs. {product.discounted_price || product.price}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Load More / Less */}
              {total > 4 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() =>
                      visible[category] < total
                        ? loadMore(category, total)
                        : loadLess(category)
                    }
                    className="text-gray-600 hover:text-gray-800 transition"
                  >
                    {visible[category] < total ? (
                      <IoIosArrowDropdownCircle
                        size={30}
                        className="hover:scale-110 transition"
                      />
                    ) : (
                      <IoIosArrowDropupCircle
                        size={30}
                        className="hover:scale-110 transition"
                      />
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

export default ProductsComp;
