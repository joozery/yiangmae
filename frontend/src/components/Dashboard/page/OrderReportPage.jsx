import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "@agney/react-loading";

export default function OrderReportPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/orders/details", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);

        // รวมยอดขายทั้งหมด
        const total = res.data.reduce((sum, order) => sum + order.total_price, 0);
        setTotalSales(total);
      } catch (err) {
        console.error("❌ ดึงข้อมูลออเดอร์ล้มเหลว:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="p-6 font-prompt">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-2xl font-bold text-gray-800">📄 รายงานคำสั่งซื้อทั้งหมด</h2>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          🖨 ปริ้นรายงาน
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center mt-10">
          <ThreeDots width="40" color="#3b82f6" />
        </div>
      ) : (
        <div className="overflow-x-auto print-area">
          <table className="min-w-full bg-white rounded shadow text-sm border">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2 border">ลำดับ</th>
                <th className="p-2 border">เลขที่ออเดอร์</th>
                <th className="p-2 border">ลูกค้า</th>
                <th className="p-2 border">ช่องทางชำระ</th>
                <th className="p-2 border">วันที่</th>
                <th className="p-2 border">รายการสินค้า</th>
                <th className="p-2 border">ยอดรวม</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order.order_id} className="border-t hover:bg-gray-50">
                  <td className="p-2 border text-center">{idx + 1}</td>
                  <td className="p-2 border text-blue-700 font-semibold text-center">
                    #{order.order_id}
                  </td>
                  <td className="p-2 border">{order.username || "-"}</td>
                  <td className="p-2 border text-center">{order.payment_method}</td>
                  <td className="p-2 border text-center">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    <ul className="list-disc ml-4 space-y-1">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.name} ({item.category}) x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2 border text-right text-green-700 font-semibold">
                    {order.total_price.toLocaleString()} ฿
                  </td>
                </tr>
              ))}
              {/* รวมยอดขายทั้งหมด */}
              <tr className="bg-gray-100 font-bold">
                <td colSpan="6" className="p-3 text-right border">💰 ยอดขายรวมทั้งหมด:</td>
                <td className="p-3 text-right text-green-700 border">
                  {totalSales.toLocaleString()} ฿
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}