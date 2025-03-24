import { useEffect, useState } from "react";
import axios from "axios";
import { FiShoppingCart } from "react-icons/fi";

const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const res = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/products");
        const filtered = res.data.filter((item) => item.category === "เครื่องดื่ม");
        setDrinks(filtered);
      } catch (err) {
        console.error("❌ โหลดข้อมูลเครื่องดื่มล้มเหลว:", err);
        setError("ไม่สามารถโหลดข้อมูลเครื่องดื่มได้");
      }
    };

    fetchDrinks();
  }, []);

  const handleAddToCart = async (product) => {
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนเพิ่มสินค้าลงตะกร้า");
      return;
    }

    try {
      const res = await axios.post(
        "https://servercoffee-d58c85f2052e.herokuapp.com/cart",
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("เพิ่มสินค้าในตะกร้าแล้ว");
    } catch (err) {
      console.error("❌ เพิ่มสินค้าล้มเหลว:", err);
      alert("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };

  return (
    <div className="p-6 font-prompt bg-gray-50 min-h-screen max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">☕ เมนูเครื่องดื่ม</h2>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {drinks.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-xl transition">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-500">{item.category}</p>
              <p className="text-blue-600 font-bold mt-2">{item.price} บาท</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 w-full"
              >
                <FiShoppingCart />
                ใส่ตะกร้า
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Drinks;