import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CatgProdDetail = () => {
  const { category } = useParams();

  const [sortOrder, setSortOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const domain = window.API_BASE_URL;

  const cat_API_URL = `${domain}api/categories/`;
  const prod_API_URL = `${domain}api/products/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // products
        const productResponse = await fetch(prod_API_URL);
        const productData = await productResponse.json();
        setProducts(productData);

        // categories
        const categoryResponse = await fetch(cat_API_URL);
        const categoryData = await categoryResponse.json();

        const uniqueCategories = categoryData.map((cat) => cat.name);
        setCategories(uniqueCategories);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [prod_API_URL, cat_API_URL]);

  // filter by category
  const filteredProducts = products.filter(
    (product) =>
      product.category?.name?.toLowerCase().trim() ===
      category.toLowerCase().trim()
  );

  // sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-high") {
      return a.price - b.price;
    }
    if (sortOrder === "high-low") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-950 mb-6 uppercase">
        {category} - Products
      </h1>

      <div className="p-4 flex flex-col lg:flex-row gap-5">

        {/* Sidebar */}
        <div className="w-full lg:w-1/5 max-h-[80vh]">

          <div className="max-h-[500px] overflow-auto no-scrollbar p-2 space-y-2">

            <h2 className="text-2xl font-bold text-center text-gray-950 mb-4">
              Categories
            </h2>

            <ul className="space-y-2">
              {categories.map((cat, index) => (
                <li
                  key={index}
                  className="border-t-2 border-b-2 border-gray-300 rounded-lg"
                >
                  <Link
                    to={`/category/${cat}`}
                    className="block p-2 text-sm font-extrabold text-right hover:bg-gray-950 hover:text-white rounded-md transition"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>

          </div>

        </div>

        {/* Products */}
        <div className="w-full">

          {/* Sort */}
          <div className="mt-4 my-5 flex gap-3 items-center">

            <h3 className="text-lg font-bold text-gray-950">
              Sort by Price
            </h3>

            <select
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="low-high">Low → High</option>
              <option value="high-low">High → Low</option>
            </select>

          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {sortedProducts.length > 0 ? (

              sortedProducts.map((product) => {

                const image =
                  product.images?.length > 0
                    ? product.images[0].image
                    : "https://via.placeholder.com/400";

                const variant = product.variants?.[0];

                return (
                  <div
                    key={product.id}
                    className="border border-gray-300 rounded-xl overflow-hidden hover:scale-105 transition"
                  >

                    <Link to={`/product/${product.id}/${product.slug}`}>

                      <img
                        src={image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />

                      <div className="p-4">

                        <h3 className="text-lg text-black font-semibold truncate">
                          {product.name}
                        </h3>

                        <p className="text-black text-base font-bold">
                          Rs. {product.discounted_price}
                        </p>

                        {variant && (
                          <p className="text-sm text-gray-500">
                            {variant.material} • {variant.color}
                          </p>
                        )}

                      </div>

                    </Link>

                  </div>
                );
              })

            ) : (
              <p className="text-center col-span-full text-red-400">
                No products found for this category.
              </p>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default CatgProdDetail;