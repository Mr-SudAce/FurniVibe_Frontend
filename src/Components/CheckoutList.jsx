import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CheckoutList = () => {
    const [productData, setProductData] = useState([]);


    const domain = window.API_BASE_URL;
    const productAPI_URL = `${domain}api/product/all/`;

    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await fetch(productAPI_URL);
                const data = await response.json();
                console.log("Product Data:", data);
                setProductData(data);
            } catch (error) {
                console.error("Error Fetching Data", error);
            }
        };
        FetchData();
    }, [productAPI_URL]);

    const calculateTotal = (price, discount) => {
        return price - (price * discount) / 100;
    };

    const grandTotal = productData.reduce(
        (acc, product) => acc + calculateTotal(product.product_price, product.product_discountPercent),
        0
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Checkout List</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 border">Product Name</th>
                            <th className="py-2 px-4 border">Price</th>
                            <th className="py-2 px-4 border">Items</th>
                            <th className="py-2 px-4 border">Discount</th>
                            <th className="py-2 px-4 border">Sub_Total</th>
                            <th className="py-2 px-4 border">Total</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((product, index) => (
                            <tr key={index} className="text-center border-b">
                                <td className="py-2 px-4 border">{product.product_name}</td>
                                <td className="py-2 px-4 border">Rs. {product.product_price.toFixed(2)}</td>
                                <td className="py-2 px-4 border">{product.product_discountPercent}%</td>
                                <td className="py-2 px-4 border">Rs. {calculateTotal(product.product_price, product.product_discountPercent).toFixed(2)}</td>
                                <td className="py-2 px-4 border">
                                    <Link to={`/product/${product.id}/${product.product_name}`} className="text-blue-500 hover:text-blue-600 mr-4">View Details</Link>
                                    <button className="text-red-500 hover:text-red-600">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-amber-400 text-gray-900 font-semibold">
                            <td colSpan={4} className="py-2 px-4 border text-right">Grand Total:</td>
                            <td className="py-2 px-4 border">Rs. {grandTotal.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="flex justify-end mt-4">
                <Link to={'/checkout'} className="py-3 px-6 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 transition">
                    Proceed to Checkout
                </Link>
            </div>
        </div>
    );
};

export default CheckoutList;
