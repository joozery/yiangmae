import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiShoppingCart } from 'react-icons/fi';

export default function AllMenu() {
  const [products, setProducts] = useState([]);
  const API_URL = 'https://servercoffee-d58c85f2052e.herokuapp.com/products';

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setProducts(res.data))
      .catch(err => console.error('โหลดข้อมูลเมนูล้มเหลว', err));
  }, []);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า");
      return;
    }

    try {
      console.log("📦 กำลังเพิ่มสินค้า:", product.name, "ID:", product.id);
      console.log("🛡️ ใช้ token:", token);

      const response = await axios.post(
        'https://servercoffee-d58c85f2052e.herokuapp.com/cart',
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log("✅ เพิ่มในตะกร้าสำเร็จ", response.data);
      alert("เพิ่มสินค้าในตะกร้าแล้ว");

    } catch (error) {
      console.error("❌ เพิ่มสินค้าล้มเหลว", error);
      if (error.response) {
        // แสดงข้อความ error ที่ได้จาก backend
        alert(error.response.data.message || "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์");
      } else {
        alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
      }
    }
  };

  // ✅ แยกหมวดหมู่
  const drinks = products.filter((p) => p.category === 'เครื่องดื่ม');
  const bakery = products.filter((p) => p.category === 'เบเกอรี่');

  const renderSection = (title, items) => (
    <div className="mb-10">
      <h3 className="text-2xl font-bold text-gray-700 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-xl transition">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-blue-600 font-bold mt-2">{product.price} บาท</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 w-full"
            >
              <FiShoppingCart />
              ใส่ตะกร้า
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 font-prompt max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">เมนูทั้งหมด</h2>
      {renderSection("☕ เครื่องดื่ม", drinks)}
      {renderSection("🍞 เบเกอรี่", bakery)}
    </div>
  );
}