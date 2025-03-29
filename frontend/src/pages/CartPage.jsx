import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/cart", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setCartItems(res.data);
      } catch (err) {
        console.error("โหลดตะกร้าล้มเหลว", err);
      } finally {
        setLoading(false);
      }
    };

    if (userToken) fetchCart();
  }, [userToken]);

  const handleRemove = async (cartId) => {
    try {
      await axios.delete(`https://servercoffee-d58c85f2052e.herokuapp.com/cart/${cartId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
    } catch (err) {
      console.error("ลบสินค้าไม่สำเร็จ", err);
    }
  };

  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity < 1) return; // ห้ามลดน้อยกว่า 1

    try {
      await axios.put(
        `https://servercoffee-d58c85f2052e.herokuapp.com/cart/${cartId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("อัปเดตจำนวนไม่สำเร็จ", err);
    }
  };

  const grouped = cartItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 font-prompt">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🛒 ตะกร้าสินค้า</h2>

      {loading ? (
        <p className="text-center">กำลังโหลด...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-500">ยังไม่มีสินค้าในตะกร้า</p>
      ) : (
        <div className="space-y-8">
          {Object.keys(grouped).map((category) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{category}</h3>
              <div className="space-y-4">
                {grouped[category].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">ราคา: {item.price} บาท</p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-sm font-semibold text-blue-700 mt-1">
                          ราคารวม: {item.price * item.quantity} บาท
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      ลบ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 text-right space-y-4">
          <p className="text-xl font-bold text-gray-800">
            💰 ยอดรวมทั้งหมด: <span className="text-green-600">{totalAmount.toFixed(2)} บาท</span>
          </p>
          <button
            onClick={() => navigate("/payment", { state: { cartItems } })}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow"
          >
            ดำเนินการชำระเงิน
          </button>
        </div>
      )}
    </div>
  );
}