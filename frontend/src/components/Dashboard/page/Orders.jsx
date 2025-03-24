import { useEffect, useState } from "react";
import axios from "axios";
import { FaReceipt, FaUser, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { ThreeDots } from "@agney/react-loading";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("❌ โหลดประวัติออเดอร์ล้มเหลว:", err);
        setError("ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setError("ไม่ได้เข้าสู่ระบบ");
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="p-6 font-prompt">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FaReceipt /> ประวัติคำสั่งซื้อ
      </h2>

      {loading ? (
        <div className="flex justify-center mt-10">
          <ThreeDots width="40" />
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white text-left">
              <tr>
                <th className="p-4">รหัสออเดอร์</th>
                <th className="p-4">ลูกค้า</th>
                <th className="p-4">ยอดรวม</th>
                <th className="p-4">สถานะ</th>
                <th className="p-4">วันที่</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-4 text-blue-800 font-semibold">#{order.id}</td>
                    <td className="p-4 flex items-center gap-2">
                      <FaUser /> {order.username || "ไม่ทราบชื่อ"}
                    </td>
                    <td className="p-4 text-green-600 font-semibold">
                      <FaMoneyBillWave className="inline-block mr-1" />
                      {order.total_price} บาท
                    </td>
                    <td className="p-4 text-center text-green-700 font-medium">
                      <FaCheckCircle className="inline-block mr-1" />
                      สำเร็จ
                    </td>
                    <td className="p-4">{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    ไม่มีคำสั่งซื้อในระบบ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}