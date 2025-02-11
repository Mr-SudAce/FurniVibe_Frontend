import { Link, useParams } from "react-router-dom";

import products from "../../MOCK_DATA.json";



const CatgProdDetail = () => {
    const { category } = useParams();  // Get category from URL

    const filteredProducts = products.filter(
        (product) => product.category === category
    );

    return (
        <div className="p-4 text-white">
            <h1 className="text-3xl font-bold text-center text-gray-950 mb-6 uppercase">{category} Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="border border-gray-300 rounded-xl  overflow-hidden transition-transform transform hover:scale-101">
                            <Link to={`/product/${product.id}`}>
                                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl text-black font-semibold mb-1">{product.title}</h3>
                                    <p className="text-black text-lg font-bold">{product.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-red-400">No products found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default CatgProdDetail;
