import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaUsers,
  FaReceipt,
  FaSearch,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#ff6b6b"];

export default function DashboardOverview() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const token = localStorage.getItem("token");

  const [topProducts, setTopProducts] = useState([]);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const productRes = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/products");
      setTotalProducts(productRes.data.length);

      const userRes = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalUsers(userRes.data.length);

      const ordersRes = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalOrders(ordersRes.data.length);

      const salesRes = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/orders/total-sales", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalRevenue(Number(salesRes.data.totalSales || 0));

      // ✅ Fetch top 3 products
      const topRes = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/orders/top-products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTopProducts(topRes.data);
    } catch (err) {
      console.error("❌ โหลดข้อมูลสถิติล้มเหลว:", err);
    }
  };

  fetchStats();
}, []);

  const stats = [
    {
      icon: <FaBoxOpen className="text-2xl text-blue-600" />,
      title: "สินค้าทั้งหมด",
      value: totalProducts,
      bg: "bg-blue-100",
    },
    {
      icon: <FaUsers className="text-2xl text-green-600" />,
      title: "ผู้ใช้ทั้งหมด",
      value: totalUsers,
      bg: "bg-green-100",
    },
    {
      icon: <FaReceipt className="text-2xl text-purple-600" />,
      title: "จำนวนออเดอร์",
      value: totalOrders,
      bg: "bg-purple-100",
    },
    {
      icon: <FaReceipt className="text-2xl text-red-600" />,
      title: "ยอดขายรวม",
      value: `${totalRevenue.toFixed(2)} บาท`,
      bg: "bg-red-100",
    },
  ];

  const barData = [
    { name: "Mon", revenue: 200 },
    { name: "Tue", revenue: 450 },
    { name: "Wed", revenue: 300 },
    { name: "Thu", revenue: 600 },
    { name: "Fri", revenue: 500 },
    { name: "Sat", revenue: 700 },
    { name: "Sun", revenue: 650 },
  ];

  const genderData = [
    { name: "ชาย", value: 60 },
    { name: "หญิง", value: 40 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-[Prompt]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📊 ภาพรวมระบบ</h1>
        <div className="relative">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหา..."
            className="pl-10 pr-4 py-2 border rounded-md shadow-sm bg-white"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow ${item.bg} flex items-center justify-between`}
          >
            <div>
              <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
              <p className="text-xl font-bold text-gray-800">{item.value}</p>
            </div>
            <div>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-700 mb-3">📈 รายรับต่อวัน</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-700 mb-3">👥 เพศของผู้ใช้</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                outerRadius={80}
                label
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            {/* Top Products */}
<div className="mt-8 bg-white p-4 rounded-lg shadow">
  <h2 className="text-lg font-bold text-gray-700 mb-4">🔥 สินค้าขายดี 3 อันดับ</h2>
  {topProducts.length > 0 ? (
    <ul className="space-y-2">
      {topProducts.map((item, index) => (
        <li
          key={index}
          className="flex justify-between items-center border-b pb-2"
        >
          <span className="font-medium text-gray-800">
            {index + 1}. {item.product_name}
          </span>
          <span className="text-sm text-blue-600">
            ขายไป {item.total_quantity} แก้ว
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">ยังไม่มีข้อมูลสินค้าขายดี</p>
  )}
</div>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}