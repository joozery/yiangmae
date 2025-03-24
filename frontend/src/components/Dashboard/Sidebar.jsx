import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaChartPie,
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const role = localStorage.getItem("role");

  // Admin menu items
  const adminMenuItems = [
    { path: "/admin/dashboard", icon: <FaChartPie />, label: "Dashboard Overview" },
    { path: "/admin/members", icon: <FaUsers />, label: "จัดการสมาชิก" },
    { path: "/admin/products", icon: <FaBoxOpen />, label: "จัดการสินค้า" },
    { path: "/admin/orders", icon: <FaClipboardList />, label: "ประวัติการสั่งซื้อ" },
  ];

  // User menu items
  const userMenuItems = [
    { path: "/dashboard", icon: <FaChartPie />, label: "Dashboard" },
    { path: "/orders", icon: <FaClipboardList />, label: "Orders" },
  ];

  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <div
      className={`h-screen bg-white shadow-md flex flex-col transition-all duration-300 font-prompt ${
        isOpen ? "w-72" : "w-16"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <h2
          className={`text-xl font-bold text-blue-700 transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </h2>
        <FaBars
          className="text-gray-600 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {isOpen && (
        <div className="relative p-4">
          <FaSearch className="absolute left-6 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาเมนู..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md outline-none text-gray-700 focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 pb-6">
        <ul className="space-y-2">
          {menuItems
            .filter((item) =>
              item.label.toLowerCase().includes(searchTerm)
            )
            .map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span className="truncate">{item.label}</span>}
              </NavLink>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;