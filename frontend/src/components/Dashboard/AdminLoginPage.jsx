import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://servercoffee-d58c85f2052e.herokuapp.com/auth/login", {
        email,
        password,
      });

      // 🟡 ตรวจสอบว่ามี role ส่งกลับมาหรือไม่
      if (!res.data.role) {
        alert("ไม่สามารถตรวจสอบสถานะผู้ใช้งานได้");
        return;
      }

      // 🔴 ถ้าไม่ใช่ admin
      if (res.data.role !== "admin") {
        alert("บัญชีนี้ไม่ใช่ผู้ดูแลระบบ");
        return;
      }

      // ✅ บันทึก token และข้อมูล
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);

      navigate("/admin/dashboard"); // ✅ หรือ "/dashboard" แล้วแต่ path ที่คุณตั้ง
    } catch (err) {
      console.error("❌ Login error:", err);
      alert("เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบอีเมลหรือรหัสผ่าน");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow rounded font-prompt">
      <h2 className="text-2xl font-bold text-center mb-6">เข้าสู่ระบบผู้ดูแล</h2>

      <input
        type="email"
        placeholder="อีเมล"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        เข้าสู่ระบบ
      </button>
    </div>
  );
}