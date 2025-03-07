import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    console.log("Product id:", id);  // Log the id to ensure it's being captured
    const [furniproduct, setFurniproduct] = useState(null);

    const domain = window.API_BASE_URL;
    const API_URL = `${domain}api/product/${id}/`;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(API_URL);
                console.log("API_URL response", response);
                if (!response.ok) throw new Error('Failed to fetch product data');
                const data = await response.json();
                console.log("API Data fetched:", data);
                setFurniproduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [API_URL]);

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(furniproduct);
        localStorage.setItem('cart', JSON.stringify(cart));
        Navigate('/cart');
    };

    if (!furniproduct) {
        return <div>Loading...</div>;  // Show loading until data is fetched
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold ">{furniproduct.product_name || "Product Name"}</h2>
            <p className="text-md text-gray-600 mb-4">{furniproduct.product_cat?.category_name || "Category not available"}</p>

            <div className="flex gap-4">
                <div className="w-1/2 relative">
                    <span className='absolute top-0 right-0 bg-orange-400 py-2 text-white pl-4 justify-end rounded-bl-full h-12 w-12 text-sm m-0'>{furniproduct.product_discountPercent}%</span>
                    <img
                        src={`${domain}${furniproduct.product_image || "default-image.jpg"}`}
                        alt={furniproduct.product_name || "Product image"}
                        className="w-full h-auto"
                    />
                </div>
                <div className="space-y-6">
                    <div
                        className="text-base text-gray-700"
                        dangerouslySetInnerHTML={{ __html: furniproduct.product_description || "No description available" }}
                    />
                    <div className="space-y-3">
                        <p className="text-xl font-semibold text-gray-800 flex gap-2 items-center">Price: Rs. {furniproduct.discount_price || "N/A"} <span className='line-through text-sm text-red-400'> {furniproduct.product_price || "N/A"} </span></p>
                        <p className="text-sm font-semibold text-gray-800">Available: <span className={furniproduct.product_available ? "text-green-600" : "text-red-600"}>
                            {furniproduct.product_available ? "In Stock" : "Out of Stock"}
                        </span></p>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                        <h3 className="font-semibold text-lg text-gray-800">Specifications</h3>
                        <p className="mt-2">Stock: {furniproduct.product_stock || "N/A"}</p>
                        <p className="mt-2">Weight: {furniproduct.product_weight || "N/A"}</p>
                    </div>
                    <button onClick={addToCart} className="cursor-pointer w-full py-3 mt-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
