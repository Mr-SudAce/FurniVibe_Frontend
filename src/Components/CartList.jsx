import { Link } from 'react-router-dom';

const CartList = () => {
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
                uniqueCartItems.map((item) => (
                    <div key={item.id}
                        className="block px-4 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-600 hover:text-white text-right transition duration-200"
                    >
                        <Link to={`/product/${item.id}/${item.product_name}`}>
                            {item.product_name}<sup className='text-red-500 text-sm pl-2'>{productCounts[item.id] > 1 && `x${productCounts[item.id]}`}</sup>
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-800">Your cart is empty.</p>
            )
            }
            {/* <div className='w-full justify-center bg-red-600'>
            </div> */}
            <Link to={'/checkout'} className='flex justify-center text-blue-500'>CheckOut</Link>
        </div >
    );
};

export default CartList;
