import React from "react";
import { Routes, Route } from "react-router-dom"; // ใช้ Routes และ Route สำหรับการแสดงหน้า

// ✅ Import component จาก Dashboard/page
import DashboardOverview from "./page/DashboardOverview";
import Members from "./page/Members";
import Products from "./page/Products";
import Orders from "./page/Orders";

const MainContent = () => {
  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-auto">
      {/* ใช้ Routes และ Route สำหรับการแสดงหน้า */}
      <Routes>
        <Route path="/admin/dashboard" element={<DashboardOverview />} />
        <Route path="/admin/members" element={<Members />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default MainContent;