import React from "react";
import { useLocation } from "react-router-dom";

// ✅ Import component จาก Dashboard/page
import DashboardOverview from "./page/DashboardOverview";
import Members from "./page/Members";
import Products from "./page/Products";
import Orders from "./page/Orders";

const MainContent = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-auto">
      {currentPath === "/dashboard" && <DashboardOverview />}
      {currentPath === "/dashboard/members" && <Members />}
      {currentPath === "/dashboard/products" && <Products />}
      {currentPath === "/dashboard/orders" && <Orders />}
    </div>
  );
};

export default MainContent;