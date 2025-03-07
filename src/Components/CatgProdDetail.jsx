// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";

// const CatgProdDetail = () => {
//     const { category } = useParams(); // Category from URL param
//     console.log("Category:", category);
//     const [sortOrder, setSortOrder] = useState("");
//     const [products, setProducts] = useState([]); // Renamed to avoid conflicts
//     const [categories, setCategories] = useState([]); // To store the unique categories
//     const domain = window.API_BASE_URL;

//     const cat_API_URL = `${domain}api/category/all/`;
//     const prod_API_URL = `${domain}api/product/all`; // Assuming this is the correct API for products

//     console.log("Product", prod_API_URL);
//     console.log("Category:", cat_API_URL);
//     // Fetch product data
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(prod_API_URL, cat_API_URL);
//                 const data = await response.json();
//                 setProducts(data);
//                 const uniqueCategories = [...new Set(data.map((prod) => prod.product_category))];
//                 setCategories(uniqueCategories);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             }
//         };
//         fetchData();
//     }, [prod_API_URL, cat_API_URL]); // Added dependency array

//     // Filter products by category (case-insensitive)
//     const filteredProducts = products.filter(
//         (product) => product.product_category.toLowerCase().trim() === category.toLowerCase().trim()
//     );

//     // Sort products by price
//     const sortedProducts = [...filteredProducts].sort((a, b) => {
//         if (sortOrder === "low-high") {
//             return a.price - b.price;
//         } else if (sortOrder === "high-low") {
//             return b.price - a.price;
//         }
//         return 0;
//     });

//     return (
//         <>
//             <h1 className="text-3xl font-bold text-center text-gray-950 mb-6 uppercase">{category} - Products</h1>
//             <div className="p-4 flex flex-col lg:flex-row gap-5">
//                 {/* Sidebar */}
//                 <div className="w-full lg:w-1/5 max-h-[80vh]">
//                     <div className="max-h-[500px] overflow-auto no-scrollbar p-2 space-y-2">
//                         <h2 className="text-2xl font-bold text-center text-gray-950 mb-4">Categories</h2>
//                         <ul className="space-y-2">
//                             {categories.map((cat, index) => (
//                                 <li key={index} className="list-none border-t-2 border-b-2 border-gray-300 rounded-lg">
//                                     <Link
//                                         to={`/category/${cat}`}
//                                         className="block p-2 text-sm font-extrabold text-right hover:bg-gray-950 hover:text-white rounded-md transition duration-300"
//                                         aria-label={`View products in ${cat}`}
//                                     >
//                                         {cat}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Product Listing */}
//                 <div className="w-full">
//                     <div className="mt-4 w-75 my-5 flex">
//                         <h3 className="text-lg font-bold text-gray-950 grid items-center w-full">Sort by Price</h3>
//                         <select
//                             onChange={(e) => setSortOrder(e.target.value)}
//                             className="w-100 p-2 border border-gray-300 rounded-md"
//                         >
//                             <option value="">Select</option>
//                             <option value="low-high">Low to High</option>
//                             <option value="high-low">High to Low</option>
//                         </select>
//                     </div>

//                     {/* Products Grid */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
//                         {sortedProducts.length > 0 ? (
//                             sortedProducts.map((product) => (
//                                 <div
//                                     key={product.id}
//                                     className="border border-gray-300 rounded-xl overflow-hidden transition-transform transform hover:scale-105"
//                                 >
//                                     <Link to={`/product/${product.name}`}>
//                                         <img
//                                             src={product.images}
//                                             alt={product.name}
//                                             title={product.name}
//                                             className="w-full h-48 object-cover"
//                                         />
//                                         <div className="p-4">
//                                             <h3 className="text-lg text-black font-semibold mb-1 truncate">
//                                                 {product.name}
//                                             </h3>
//                                             <p className="text-black text-base font-bold">${product.price}</p>
//                                         </div>
//                                     </Link>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-center col-span-full text-red-400">No products found for this category.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CatgProdDetail;


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CatgProdDetail = () => {
    const { category } = useParams(); // Category from URL param
    console.log("Category:", category);
    const [sortOrder, setSortOrder] = useState("");
    const [products, setProducts] = useState([]); // Renamed to avoid conflicts
    const [categories, setCategories] = useState([]); // To store the unique categories
    console.log("Categories:", categories);
    const domain = window.API_BASE_URL;

    const cat_API_URL = `${domain}api/category/all/`;
    const prod_API_URL = `${domain}api/product/all`; // Assuming this is the correct API for products

    console.log("Product", prod_API_URL);
    console.log("Category:", cat_API_URL);

    // Fetch product data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch product data
                const productResponse = await fetch(prod_API_URL);
                const productData = await productResponse.json();
                console.log("productData:", productData);

                setProducts(productData);

                // Fetch category data
                const categoryResponse = await fetch(cat_API_URL);
                const categoryData = await categoryResponse.json();
                console.log("categoryData:", categoryData);
                const uniqueCategories = [...new Set(categoryData.map((cat) => cat.category_name))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [prod_API_URL, cat_API_URL]); // Added dependency array

    // Filter products by category (case-insensitive)
    const filteredProducts = products.filter(
        (product) => product.product_cat.category_name.toLowerCase().trim() === category.toLowerCase().trim()
    );

    // Sort products by price
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === "low-high") {
            return a.product_price - b.product_price;
        } else if (sortOrder === "high-low") {
            return b.product_price - a.product_price;
        }
        return 0;
    });

    return (
        <>
            <h1 className="text-3xl font-bold text-center text-gray-950 mb-6 uppercase">{category} - Products</h1>
            <div className="p-4 flex flex-col lg:flex-row gap-5">
                {/* Sidebar */}
                <div className="w-full lg:w-1/5 max-h-[80vh]">
                    <div className="max-h-[500px] overflow-auto no-scrollbar p-2 space-y-2">
                        <h2 className="text-2xl font-bold text-center text-gray-950 mb-4">Categories</h2>
                        <ul className="space-y-2">
                            {categories.map((cat, index) => (
                                <li key={index} className="list-none border-t-2 border-b-2 border-gray-300 rounded-lg">
                                    <Link
                                        to={`/category/${cat}`}
                                        className="block p-2 text-sm font-extrabold text-right hover:bg-gray-950 hover:text-white rounded-md transition duration-300"
                                        aria-label={`View products in ${cat}`}
                                    >
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Product Listing */}
                <div className="w-full">
                    <div className="mt-4 w-75 my-5 flex">
                        <h3 className="text-lg font-bold text-gray-950 grid items-center w-full">Sort by Price</h3>
                        <select
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-100 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="low-high">Low to High</option>
                            <option value="high-low">High to Low</option>
                        </select>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="border border-gray-300 rounded-xl overflow-hidden transition-transform transform hover:scale-105"
                                >
                                    <Link to={`/product/${product.id}/${product.product_name}`}>
                                        <img
                                            src={`${domain}${product.product_image}`}
                                            alt={product.product_name}
                                            title={product.product_name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg text-black font-semibold mb-1 truncate">
                                                {product.product_name}
                                            </h3>
                                            <p className="text-black text-base font-bold">${product.product_price}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-red-400">No products found for this category.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CatgProdDetail;
