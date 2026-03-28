import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const domain = window.API_BASE_URL;

  useEffect(() => {
    fetch(`${domain}api/orders/${orderId}/`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("access_token")}` }
    })
    .then(res => res.json())
    .then(data => setOrder(data));
  }, [orderId]);

  if (!order) return <div className="p-20 text-center">Loading Order #{orderId}...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl my-10 border">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold">Order #{order.id}</h2>
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold uppercase">
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-gray-500 uppercase text-xs font-bold mb-2">Shipping To</h3>
          <p className="font-bold">{order.shipping_address?.full_name}</p>
          <p className="text-gray-600">{order.shipping_address?.address_line_1}</p>
          <p className="text-gray-600">{order.shipping_address?.city}, {order.shipping_address?.zip_code}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-gray-500 uppercase text-xs font-bold mb-2">Payment Info</h3>
          <p className="font-semibold">Method: <span className="uppercase">{order.payment?.payment_method}</span></p>
          <p className="font-semibold">Status: 
            <span className={order.payment?.payment_status === 'paid' ? "text-green-600" : "text-amber-600"}>
               {" "}{order.payment?.payment_status}
            </span>
          </p>
        </div>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="text-left text-gray-400 border-b text-sm">
            <th className="pb-2">Product</th>
            <th className="pb-2">Qty</th>
            <th className="pb-2 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="py-4">
                <p className="font-bold">{item.product_name}</p>
                <p className="text-xs text-gray-500">{item.variant_details}</p>
              </td>
              <td className="py-4">{item.quantity}</td>
              <td className="py-4 text-right">Rs. {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right border-t pt-4">
        <p className="text-gray-500">Total Amount</p>
        <p className="text-3xl font-bold text-green-600">Rs. {order.total_amount}</p>
      </div>
    </div>
  );
};

export default OrderDetail;