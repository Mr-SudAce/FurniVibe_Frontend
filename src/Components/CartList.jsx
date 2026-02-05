import {  useEffect } from 'react';
import { Link } from 'react-router-dom';




const CartList = () => {
    
    // const domain = window.API_BASE_URL;
    // const apiurl = `${domain}api/cart/all/`;

    // useEffect(()     => {
    //     const fetchCartItems = async () => {
    //         try {
    //             const response = await fetch(apiurl);
    //             if (!response.ok) throw new Error("Failed to fetch cart items");

    //             const data = await response.json();
    //             console.log("(CartList.jsx)Cart items data:", data);
    //         } catch (error) {
    //             console.error('Error fetching cart items:', error);
    //         }
    //     };
    //     fetchCartItems();
    // }, [apiurl]);
    
    


    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Count the occurrences of each product
    const productCounts = cartItems.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + 1;
        return acc;
    },
        {});

    // Get unique product IDs (to display each product only once)
    const uniqueCartItems = Array.from(new Set(cartItems.map(item => item.id)))
        .map(id => cartItems.find(item => item.id === id));

    return (
        <div className="absolute top-[50px] right-0 w-[220px] p-3 max-h-[250px] overflow-auto rounded-lg border border-gray-300 shadow-lg bg-white/95 backdrop-blur-md space-y-2 z-50 transition-all duration-300 ease-in-out">
            {uniqueCartItems.length > 0 ? (
                <>
                    {uniqueCartItems.map((item) => (
                        <div
                            key={item.id}
                            className="block px-4 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-600 hover:text-white text-right transition duration-200"
                        >
                            <a href={`/cart/${item.id}/delete/`} className="text-red-500 hover:text-red-700">
                                Delete
                            </a>





                            <img src={`${item.product_image}`} alt={item.product_name} className="inline-block w-10 h-10 mr-2 rounded" />

                            <Link to={`/product/${item.id}/${item.product_name}`}>
                                {item.product_name}
                                <sup className="text-red-500 text-sm pl-2">
                                    {productCounts[item.id] > 1 && `x${productCounts[item.id]}`}
                                </sup>
                            </Link>
                        </div>
                    ))}

                    <Link to="/checkout" className="flex justify-center text-blue-500">
                        Checkout
                    </Link>
                </>
            ) : (
                <p className="text-center text-gray-800">Your cart is empty.</p>
            )}
        </div>
    );
}

export default CartList;
