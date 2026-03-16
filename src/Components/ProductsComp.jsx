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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        setProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((p) => p.category?.name)),
        ];

        setCategories(uniqueCategories);

        const visibility = {};
        uniqueCategories.forEach((cat) => {
          visibility[cat] = 4;
        });

        setVisible(visibility);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (p) => p.category?.name === category,
          );

          const total = categoryProducts.length;

          return (
            <div key={category} className="mb-10">
              {/* Category Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex justify-between bg-gray-300 p-3 rounded-r-3xl">
                <span>{category}</span>

                <Link
                  to={`/category/${category}`}
                  className="bg-gray-700 w-7 rounded-full flex items-center justify-center hover:scale-105"
                >
                  <FaArrowRight className="text-white" />
                </Link>
              </h2>

              {/* Products */}
              <div className="flex flex-wrap -m-4">
                {categoryProducts.slice(0, visible[category]).map((product) => {
                  const variant = product.variants?.[0];
                  const image = product.image

                  return (
                    <div
                      key={product.id}
                      className="lg:w-1/4 md:w-1/2 w-full p-4"
                    >
                      <Link to={`/product/${product.id}/${product.slug}`}>
                        <img
                          className="h-48 w-full object-cover rounded"
                          src={image}
                          alt={product.name}
                        />

                        <h3 className="text-gray-500 text-xs mt-2">
                          {product.category?.name}
                        </h3>

                        <h2 className="text-gray-900 text-lg font-medium">
                          {product.name}
                        </h2>

                        <p className="text-gray-700">
                          Rs. {product.discounted_price}
                        </p>

                        {variant && (
                          <div className="text-sm text-gray-500 mt-1">
                            <p>
                              {variant.material} • {variant.color}
                            </p>

                            <p>
                              {variant.length} × {variant.width} ×{" "}
                              {variant.height}
                            </p>

                            <p>
                              Stock:{" "}
                              {variant.stock > 0 ? "Available" : "Out of stock"}
                            </p>
                          </div>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Load More / Less */}
              <div className="flex justify-center mt-4">
                {total > 4 && (
                  <button
                    onClick={() =>
                      visible[category] < total
                        ? loadMore(category, total)
                        : loadLess(category)
                    }
                  >
                    {visible[category] < total ? (
                      <IoIosArrowDropdownCircle
                        size={30}
                        className="hover:scale-110"
                      />
                    ) : (
                      <IoIosArrowDropupCircle
                        size={30}
                        className="hover:scale-110"
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsComp;
