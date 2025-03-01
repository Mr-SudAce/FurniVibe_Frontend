import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../../furnitureData.json";
const CatgProdDetail = () => {
    const { category } = useParams();
    const [sortOrder, setSortOrder] = useState("");



    const filteredProducts = products.filter(
        (product) => product.category === category
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === "low-high") {
            return a.price - b.price;
        } else if (sortOrder === "high-low") {
            return b.price - a.price;
        }
        return 0;
    });
    return (
        <>
            <h1 className="text-3xl font-bold text-center text-gray-950 mb-6 uppercase">{category} - Products</h1>
            <div className="p-4 flex flex-col lg:flex-row gap-5">
                <div className="w-full lg:w-1/5 md:w- max-h-[80vh]">
                    <div className="max-h-[500px] overflow-auto no-scrollbar p-2 space-y-2">
                        <h2 className="text-2xl font-bold text-center text-gray-950 mb-4">Categories</h2>
                        <ul className="space-y-2">
                            {[...new Set(products.map((cate) => cate.category))].map((category, index) => (
                                <li key={index} className="list-none border-t-2 border-b-2 border-gray-300 rounded-lg">
                                    <Link
                                        to={`/category/${category}`}
                                        className="block p-2 text-sm font-extrabold text-right hover:bg-gray-950 hover:text-white rounded-md transition duration-300"
                                        aria-label={`View products in ${category}`}
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="mt-4 w-75 my-5 flex">
                        <h3 className="text-lg font-bold text-gray-950 grid items-center w-full">Sort by Price</h3>
                        <select onChange={(e) => setSortOrder(e.target.value)} className="w-100 p-2 border border-gray-300 rounded-md">
                            <option value="">Select</option>
                            <option value="low-high">Low to High</option>
                            <option value="high-low">High to Low</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <div key={product.id} className="border border-gray-300 rounded-xl overflow-hidden transition-transform transform hover:scale-105">
                                    <Link to={`/product/${product.name}`}>
                                        <img src={product.images} alt={product.name} title={product.name} className="w-full h-48 object-cover" />
                                        <div className="p-4">
                                            <h3 className="text-lg text-black font-semibold mb-1 truncate">{product.title}</h3>
                                            <p className="text-black text-base font-bold">{product.price}</p>
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
