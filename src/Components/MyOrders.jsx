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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 animate-pulse">Fetching your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Order History</h1>
        <p className="text-gray-500 mt-2">Check the status of recent orders or manage returns.</p>
      </header>

      {orders.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 p-16 rounded-3xl text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-gray-800">No orders found</h2>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">
            Looks like you haven&apos;t discovered your next favorite thing yet.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Order Metadata Header */}
              <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Order Placed</p>
                  <p className="text-sm font-medium text-gray-700">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Total Amount</p>
                  <p className="text-sm font-bold text-gray-900">Rs. {order.total_amount.toLocaleString()}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-black">Ship To</p>
                  <p className="text-sm text-gray-600 truncate">Order #{order.id.toString().slice(-6)}</p>
                </div>
                <div className="text-right">
                  <Link
                    to={`/order-detail/${order.id}`}
                    className="inline-block text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-xl">
                          🛍️
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 leading-tight">{item.product_name}</p>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                             Qty: <span className="text-gray-900 font-medium">{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Badges Section */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="flex flex-col items-start md:items-end">
                       <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</span>
                       <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                        order.status === "delivered" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-blue-100 text-blue-700"
                      }`}>
                        • {order.status}
                      </span>
                    </div>

                    <div className="flex flex-col items-start md:items-end ml-auto md:ml-0">
                       <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">Payment</span>
                       <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                        order.payment?.payment_status === "paid" 
                        ? "bg-emerald-50 text-emerald-600" 
                        : "bg-orange-50 text-orange-600"
                      }`}>
                        {order.payment?.payment_status || "COD"}
                      </span>
                    </div>
                  </div>
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