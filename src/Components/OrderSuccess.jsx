import { Link } from "react-router-dom";

const OrderSuccess = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h1 className="text-4xl font-extrabold mb-2">Order Confirmed!</h1>
    <p className="text-gray-600 mb-8 text-lg">Thank you for shopping with Hitech Furniture. <br/> Your order is being processed for delivery.</p>
    <div className="flex gap-4">
      <Link to="/my-orders" className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold">Track Order</Link>
      <Link to="/" className="bg-white border border-gray-300 px-8 py-3 rounded-xl font-bold">Continue Shopping</Link>
    </div>
  </div>
);

export default OrderSuccess;