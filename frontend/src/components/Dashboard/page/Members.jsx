import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "@agney/react-loading";

export default function Members() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
        console.error("❌ โหลดสมาชิกล้มเหลว:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    } else {
      setError("ไม่พบ token หรือหมดอายุ");
      setLoading(false);
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("คุณแน่ใจว่าต้องการลบสมาชิกนี้?")) return;

    try {
      await axios.delete(`https://servercoffee-d58c85f2052e.herokuapp.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("❌ ลบสมาชิกไม่สำเร็จ:", err);
    }
  };

  return (
    <div className="p-6 font-prompt">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        👥 <span>จัดการสมาชิก</span>
      </h2>

      {loading ? (
        <div className="flex justify-center mt-10">
          <ThreeDots width="40" />
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-blue-600 text-white text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 text-left">👤 ชื่อ</th>
                  <th className="px-6 py-4 text-left">📧 อีเมล</th>
                  <th className="px-6 py-4 text-center">✅ สถานะ</th>
                  <th className="px-6 py-4 text-center">⚙️ จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-3">{user.username}</td>
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3 text-center text-green-600 font-semibold">ใช้งาน</td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full text-xs font-medium transition"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
                      ไม่มีสมาชิกในระบบ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}