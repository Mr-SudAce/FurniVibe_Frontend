import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const domain = window.API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${domain}api/orders/my/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [domain]);

  if (loading) return <div className="text-center py-20">Loading your orders...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link to="/" className="text-blue-600 font-bold hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Order Placed</p>
                  <p className="text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Total Amount</p>
                  <p className="text-sm font-bold text-green-600">Rs. {order.total_amount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Order Status</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Payment</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                    order.payment?.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.payment?.payment_status || 'Pending (COD)'}
                  </span>
                </div>
                <Link to={`/order-detail/${order.id}`} className="text-blue-600 text-sm font-bold hover:underline">
                  View Details
                </Link>
              </div>

              {/* Order Items Summary */}
              <div className="p-4">
                <div className="flex gap-4 overflow-x-auto">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex-shrink-0 flex items-center gap-3 bg-gray-50 p-2 rounded-lg border">
                       <div className="text-sm">
                          <p className="font-bold text-gray-800">{item.product_name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;