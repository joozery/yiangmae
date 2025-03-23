import React, { useState } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-b-lg p-4 flex justify-between items-center font-[Prompt]">
      {/* 🔹 ชื่อผู้ใช้ */}
      <h2 className="text-gray-800 font-bold text-lg">ADMIN</h2>

      {/* 🔹 เมนูด้านขวา */}
      <div className="relative">
        {/* 👤 Avatar (คลิกเพื่อเปิด Popup) */}
        <button
          className="text-gray-500 hover:text-gray-700 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaUserCircle size={22} />
        </button>

        {/* 🔽 Popup เมนู */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden z-50">
            <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              <FaCog size={16} /> ตั้งค่าโปรไฟล์
            </button>
            <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
              <FaSignOutAlt size={16} /> ออกจากระบบ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;