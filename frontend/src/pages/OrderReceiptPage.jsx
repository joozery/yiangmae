import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderReceiptPage() {
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          "https://servercoffee-d58c85f2052e.herokuapp.com/orders/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(res.data);
      } catch (err) {
        console.error("❌ ดึงข้อมูลออเดอร์ล้มเหลว:", err);
      }
    };

    if (token) fetchOrder();
  }, [token]);

  if (!order)
    return <p className="text-center mt-10 font-prompt">กำลังโหลดใบเสร็จ...</p>;

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const vat = subtotal * 0.07;
  const total = subtotal + vat;

  return (
    <div className="flex justify-center font-prompt">
      {/* ✅ ส่วนที่พิมพ์ */}
      <div className="print-area w-[320px] p-4 text-sm bg-white text-black print:text-xs">
        <div className="text-center border-b pb-2">
          <h1 className="font-bold text-base">☕ เถียงแม่ Coffee</h1>
          <p className="text-xs">123 หมู่บ้านกาแฟ ถ.สุขุมวิท กรุงเทพฯ</p>
          <p className="text-xs">โทร: 081-234-5678</p>
          <p className="text-xs">เลขประจำตัวผู้เสียภาษี: 1234567890123</p>
          <hr className="my-2" />
          <p className="text-xs">ใบเสร็จเลขที่: {order.order_id}</p>
          <p className="text-xs">พนักงาน: {order.username || "ไม่ทราบชื่อ"}</p>
          <p className="text-xs">
            วันที่:{" "}
            {order.created_at
              ? new Date(order.created_at).toLocaleDateString("th-TH")
              : "-"}
          </p>
        </div>

        <div className="mt-3 text-xs">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between mb-1 border-b pb-1"
            >
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{(item.price * item.quantity).toLocaleString()} ฿</span>
            </div>
          ))}
        </div>

        <hr className="my-2" />
        <div className="text-right text-xs space-y-1">
          <p>รวม: {subtotal.toLocaleString()} ฿</p>
          <p>VAT 7%: {vat.toFixed(2)} ฿</p>
          <p className="font-bold text-base">
            รวมทั้งหมด: {total.toLocaleString()} ฿
          </p>
        </div>

        <hr className="my-2" />
        <p className="text-center text-xs mt-4 italic">ขอบคุณที่อุดหนุน ❤️</p>
      </div>

      {/* ✅ ปุ่มปริ้น ซ่อนตอนพิมพ์ */}
      <div className="mt-6 text-center print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🖨 ปริ้นใบเสร็จ
        </button>
      </div>
    </div>
  );
}