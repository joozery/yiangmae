// src/components/Auth/LoginPopup.jsx
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginPopup({ onClose }) {
  const [isRegister, setIsRegister] = useState(false);

  if (!onClose) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          <IoClose />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">
          {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
        </h2>

        {/* ✅ ส่ง onClose ไปยังทั้ง LoginForm และ RegisterForm */}
        {isRegister ? (
          <RegisterForm onClose={onClose} />
        ) : (
          <LoginForm onClose={onClose} />
        )}

        <p className="text-sm text-center mt-4">
          {isRegister ? "มีบัญชีอยู่แล้ว?" : "ยังไม่มีบัญชี?"}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
          </span>
        </p>
      </div>
    </div>
  );
}
