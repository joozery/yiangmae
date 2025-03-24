import React, { useEffect, useState } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("ADMIN");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/admin-login"; // ✅ หรือใช้ useNavigate ถ้าต้องการ
  };

  return (
    <div className="bg-white shadow-md rounded-b-lg p-4 flex justify-between items-center font-[Prompt]">
      {/* 🔹 ชื่อผู้ใช้ */}
      <h2 className="text-gray-800 font-bold text-lg">{username.toUpperCase()}</h2>

      {/* 🔹 เมนูด้านขวา */}
      <div className="relative">
        <button
          className="text-gray-500 hover:text-gray-700 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaUserCircle size={22} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden z-50">
            <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              <FaCog size={16} /> ตั้งค่าโปรไฟล์
            </button>
            <button
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={16} /> ออกจากระบบ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;