import { useState, useEffect } from "react";  
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashbord from "./components/Dashboard/Dashbord";
import Home from "./pages/Home";
import AllMenu from './pages/AllMenu';
import CartPage from './pages/CartPage';
import PaymentPage from "./pages/PaymentPage";
import OrderReceiptPage from "./pages/OrderReceiptPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage"; 

// 📌 Import หน้าภายใน Dashboard
import DashboardOverview from "./components/Dashboard/page/DashboardOverview";
import Members from "./components/Dashboard/page/Members";
import Products from "./components/Dashboard/page/Products";
import Orders from "./components/Dashboard/page/Orders";
import AdminLoginPage from "./components/Dashboard/AdminLoginPage";

// 📌 Layout สำหรับหน้าเว็บหลัก
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen font-prompt">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
};

// 📌 Protected Route สำหรับการตรวจสอบว่าเป็น Admin หรือไม่
const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  // ถ้าไม่มี token หรือ role ไม่ใช่ admin ให้รีไดเร็กไปหน้า login
  if (!role || role !== "admin") {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ตรวจสอบว่า token และ role ถูกเก็บใน localStorage หรือไม่
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (role && token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* ✅ เส้นทาง Dashboard */}
        <Route path="/admin" element={<ProtectedRoute><Dashbord /></ProtectedRoute>}>
  <Route index element={<DashboardOverview />} /> {/* เส้นทาง /admin */}
  <Route path="dashboard" element={<DashboardOverview />} /> {/* เส้นทาง /admin/dashboard */}
  <Route path="members" element={<Members />} />
  <Route path="products" element={<Products />} />
  <Route path="orders" element={<Orders />} />
</Route>


        {/* ✅ เส้นทางสำหรับ Admin Login (แยกต่างหาก) */}
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* ✅ เส้นทางเว็บไซต์หลัก */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/menu" element={<Layout><AllMenu /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        <Route path="/payment" element={<Layout><PaymentPage /></Layout>} />
        <Route path="/payment-success" element={<Layout><PaymentSuccessPage /></Layout>} /> 
        <Route path="/receipt" element={<Layout><OrderReceiptPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;