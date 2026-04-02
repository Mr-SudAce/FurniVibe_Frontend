import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const domain = window.API_BASE_URL || "http://127.0.0.1:8000/";

  const orderStatusStyles = {
    pending: "bg-amber-100 text-amber-700",
    paid: "bg-blue-100 text-blue-700",
    shipped: "bg-indigo-100 text-indigo-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const formatStatus = (status) =>
    status?.charAt(0).toUpperCase() + status?.slice(1);

  useEffect(() => {
    fetch(`${domain}api/orders/${orderId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error("Error fetching order:", err));
  }, [orderId, domain]);

  if (!order)
    return (
      <div className="p-20 text-center text-gray-500 animate-pulse">
        Loading Order #{orderId}...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white shadow-sm rounded-2xl p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 border border-slate-100">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Order #{order.id}
          </h2>
          <p className="text-sm text-slate-500">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
            orderStatusStyles[order.status] || "bg-slate-100 text-slate-700"
          }`}
        >
          • {formatStatus(order.status)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SHIPPING CARD */}
        <div className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
            Shipping To
          </h3>
          <div className="space-y-1">
            <p className="font-bold text-slate-800">
              {order.shipping_address?.full_name || "N/A"}
            </p>
            <p className="text-sm text-slate-600">
              {order.shipping_address?.address_line}
            </p>
            <p className="text-sm text-slate-600">
              {order.shipping_address?.city}, {order.shipping_address?.zip_code}
            </p>
          </div>
        </div>

        {/* DELIVERY CARD */}
        <div className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
            Delivery Method
          </h3>
          <p className="font-bold text-slate-800 capitalize">
            {order.delivery_type || "Standard"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {order.delivery_type === "express"
              ? "1-2 Business Days"
              : "3-5 Business Days"}
          </p>
        </div>

        {/* PAYMENT CARD */}
        <div className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
            Payment Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Method:</span>
              <span className="font-bold uppercase text-slate-900">
                {order.payment?.payment_method || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-mono font-bold text-indigo-600">
                {order.payment?.transaction_id || "PENDING"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span
                className={`font-bold ${
                  order.payment?.payment_status === "completed"
                    ? "text-green-600"
                    : "text-amber-600"
                }`}
              >
                {formatStatus(order.payment?.payment_status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ITEMS CARD */}
      <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-slate-100">
        <div className="p-6 border-b border-slate-50">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Order Items
          </h3>
        </div>

        <div className="divide-y divide-slate-50">
          {order.items?.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-400">
                  IMG
                </div>
                <div>
                  <p className="font-bold text-slate-800">
                    {item.product_name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.variant_details}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">
                  Rs. {Number(item.price).toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOTAL CARD */}
      <div className="bg-slate-900 rounded-3xl p-8 flex justify-between items-center text-white shadow-xl shadow-slate-200">
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
            Total Amount Paid
          </p>
          <p className="text-3xl font-black">
            Rs. {Number(order.total_amount).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
