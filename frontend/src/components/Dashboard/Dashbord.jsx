import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header"; // ✅ เพิ่ม Header

const Dashbord = () => {
  return (
    <div className="flex h-screen">
      {/* ✅ Sidebar */}
      <div className="w-69 bg-white border-r">
        <Sidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 overflow-auto">
        {/* 🔹 Header (อยู่ด้านบนของเนื้อหาหลัก) */}
        <Header />

        {/* 🔹 Outlet ใช้แสดงหน้า Dashboard ต่างๆ */}
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashbord;