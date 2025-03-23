// src/components/Footer/Footer.jsx

export default function Footer() {
    return (
      <footer className="bg-[#f6f6f6] text-gray-700 py-8 font-prompt border-t">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          
          {/* ร้าน */}
          <div>
            <h3 className="text-lg font-semibold mb-2">เตียงแม่ Coffee ☕</h3>
            <p className="text-sm">
              ร้านกาแฟเล็กๆ ที่ใส่ใจทุกรายละเอียดของกาแฟ
              และขนมอบสดใหม่ทุกวัน
            </p>
          </div>
  
          {/* ลิงก์เมนู */}
          <div>
            <h3 className="text-lg font-semibold mb-2">เมนู</h3>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:text-black">หน้าแรก</a></li>
              <li><a href="#" className="hover:text-black">เครื่องดื่ม</a></li>
              <li><a href="#" className="hover:text-black">เบเกอรี่</a></li>
              <li><a href="#" className="hover:text-black">ติดต่อเรา</a></li>
            </ul>
          </div>
  
          {/* ช่องทางติดต่อ */}
          <div>
            <h3 className="text-lg font-semibold mb-2">ติดต่อเรา</h3>
            <ul className="text-sm space-y-1">
              <li>โทร: 081-234-5678</li>
              <li>Facebook: @tiangmaecoffee</li>
              <li>Line: @tiangmae</li>
              <li>เปิดทุกวัน 07.00 - 17.00 น.</li>
            </ul>
          </div>
        </div>
  
        <div className="text-center text-xs text-gray-500 mt-8 border-t pt-4">
          © {new Date().getFullYear()} เถียงแม่ Coffee. All rights reserved.
        </div>
      </footer>
    );
  }