import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashbord from "./components/Dashboard/Dashbord";
import Home from "./pages/Home";
import AllMenu from './pages/AllMenu';
import CartPage from './pages/CartPage';

// 📌 Import หน้าภายใน Dashboard
import DashboardOverview from "./components/Dashboard/page/DashboardOverview";
import Members from "./components/Dashboard/page/Members";
import Products from "./components/Dashboard/page/Products";
import Orders from "./components/Dashboard/page/Orders";

// 📌 Layout สำหรับหน้าเว็บหลัก
const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen font-prompt">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ เส้นทาง Dashboard */}
        <Route path="/dashboard/*" element={<Dashbord />}>
          <Route index element={<DashboardOverview />} />
          <Route path="members" element={<Members />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* ✅ เส้นทางเว็บไซต์หลัก */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/menu" element={<Layout><AllMenu /></Layout>} />
        <Route path="/cart" element={<Layout><CartPage /></Layout>} />
    {/* หน้าอื่นๆ */}
      </Routes>
    </Router>
  );
}

export default App;