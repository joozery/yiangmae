import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiShoppingCart } from 'react-icons/fi';

export default function Bakery() {
  const [products, setProducts] = useState([]);
  const API_URL = 'https://servercoffee-d58c85f2052e.herokuapp.com/products';

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        const bakeryOnly = res.data.filter(item => item.category === 'เบเกอรี่');
        setProducts(bakeryOnly);
      })
      .catch(err => console.error('❌ โหลดข้อมูลเบเกอรี่ล้มเหลว:', err));
  }, []);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า");
      return;
    }

    try {
      await axios.post(
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

      alert("✅ เพิ่มเบเกอรี่ในตะกร้าแล้ว");
    } catch (error) {
      console.error("❌ เพิ่มเบเกอรี่ล้มเหลว:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };

  return (
    <div className="p-6 font-prompt max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🍰 เบเกอรี่</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-xl transition"
          >
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
}