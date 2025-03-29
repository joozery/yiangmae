import { Link } from "react-router-dom";

export default function PaymentSuccessPage() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center font-prompt">
      <h2 className="text-3xl font-bold text-green-700 mb-4">✅ การชำระเงินสำเร็จ</h2>
      <p className="text-gray-600 mb-6">ขอบคุณที่สั่งซื้อกับร้านเถียงแม่ Coffee ☕</p>

      {/* ✅ QR Code จริง */}
      <div className="mb-6">
        <p className="text-lg font-medium text-gray-700 mb-2">📱 โอนผ่าน QR Code:</p>
        <img
          src="/images/qrcode.jpg" // ✅ เปลี่ยน path นี้ตามของคุณ
          alt="QR Code สำหรับชำระเงิน"
          className="mx-auto w-60 h-60 object-contain border p-2 rounded-md shadow"
        />
        <p className="text-sm text-gray-500 mt-2">* กรุณาโอนเงินตามยอดที่แจ้ง และแนบสลิปในช่องแชท</p>
      </div>

      {/* 🔵 ปุ่มพิมพ์ใบเสร็จ */}
      <div className="flex flex-col gap-4 items-center">
        <Link
          to="/receipt"
          className="bg-gray-100 border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-200 text-gray-800 transition"
        >
          🖨 พิมพ์ใบเสร็จ
        </Link>

        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          กลับสู่หน้าแรก
        </Link>
      </div>
    </div>
  );
}