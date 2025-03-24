import { useEffect, useState, useRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import logo from "../../assets/logo.jpg";
import LoginPopup from "../Auth/LoginPopup";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    // ปิด dropdown เมื่อคลิกข้างนอก
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    setShowDropdown(false);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm font-prompt">
        {/* โลโก้ */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
          <h1 className="text-2xl font-bold text-gray-800">เถียงแม่ Coffee</h1>
        </div>

        {/* เมนูด้านขวา */}
        <ul className="flex items-center space-x-6 text-gray-600 font-medium text-lg">
          <li className="hover:text-black cursor-pointer">
            <a href="/">หน้าแรก</a>
          </li>
          <li className="hover:text-black cursor-pointer">
            <a href="/menu">เมนูทั้งหมด</a>
          </li>
          <li className="hover:text-black cursor-pointer">
            <a href="/drinks">เครื่องดื่ม</a>
          </li>
          <li className="hover:text-black cursor-pointer">
    <a href="/bakery">เบเกอรี่</a> {/* ✅ เพิ่มตรงนี้ */}
  </li>

          {/* ตะกร้าสินค้า */}
          <li className="relative cursor-pointer hover:text-black">
            <a href="/cart">
              <FiShoppingCart size={22} />
            </a>
          </li>

          {/* Login / Username dropdown */}
          {username ? (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center text-blue-600 hover:text-blue-800 space-x-1"
              >
                <span>{username}</span>
                <IoChevronDown />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg py-2 w-40 z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition"
              >
                เข้าสู่ระบบ
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* ✅ Login Popup */}
      {showLogin && (
        <LoginPopup
          onClose={() => {
            setShowLogin(false);
            const storedUsername = localStorage.getItem("username");
            if (storedUsername) setUsername(storedUsername);
          }}
        />
      )}
    </>
  );
}
