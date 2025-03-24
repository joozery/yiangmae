import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const cartItems = location.state?.cartItems || [];

  // คำนวณราคารวม
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const vat = subtotal * 0.07;
  const total = subtotal + vat;

  const handlePayment = async () => {
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product_id: item.product_id || item.id,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        total_price: total,
        payment_method: paymentMethod,
      };

      const res = await axios.post(
        "https://servercoffee-d58c85f2052e.herokuapp.com/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ คำสั่งซื้อถูกบันทึก", res.data);
      navigate("/payment-success");
    } catch (err) {
      console.error("❌ บันทึกคำสั่งซื้อไม่สำเร็จ", err);
      alert("เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-prompt">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">ชำระเงิน</h2>

      {/* แสดงรายการสินค้า */}
      <div className="mb-6 space-y-2 text-sm text-gray-700">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>
              {item.name} x {item.quantity || 1}
            </span>
            <span>{(item.price * (item.quantity || 1)).toLocaleString()} ฿</span>
          </div>
        ))}

        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>รวม</span>
          <span>{subtotal.toLocaleString()} ฿</span>
        </div>
        <div className="flex justify-between">
          <span>VAT 7%</span>
          <span>{vat.toFixed(2)} ฿</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-green-700">
          <span>รวมทั้งหมด</span>
          <span>{total.toLocaleString()} ฿</span>
        </div>
      </div>

      {/* เลือกช่องทางชำระเงิน */}
      <div className="space-y-4 mb-6">
        <label className="block text-lg font-medium">เลือกวิธีชำระเงิน:</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>ชำระเงินปลายทาง</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="qr"
              checked={paymentMethod === "qr"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>ชำระด้วย QR Code</span>
          </label>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md"
      >
        ยืนยันการชำระเงิน
      </button>
    </div>
  );
}