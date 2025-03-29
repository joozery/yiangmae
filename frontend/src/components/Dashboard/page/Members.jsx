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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `https://servercoffee-d58c85f2052e.herokuapp.com/auth/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error("❌ อัปเดตสถานะล้มเหลว", err);
    }
  };

  return (
    <div className="p-6 font-prompt">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        👥 จัดการสมาชิก
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
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-blue-600 text-white text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 text-left">ชื่อผู้ใช้</th>
                  <th className="px-6 py-4 text-left">อีเมล</th>
                  <th className="px-6 py-4 text-center">สถานะ</th>
                  <th className="px-6 py-4 text-center">เปลี่ยนสถานะ</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-semibold px-3 py-1 rounded-full text-xs ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : user.status === "banned"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {user.status === "active"
                            ? "เปิดใช้งาน"
                            : user.status === "banned"
                            ? "แบน"
                            : "ปิดใช้งาน"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <select
                          value={user.status || "active"}
                          onChange={(e) => handleStatusChange(user.id, e.target.value)}
                          className="px-3 py-1 border rounded-md text-sm bg-white"
                        >
                          <option value="active">เปิดใช้งาน</option>
                          <option value="inactive">ปิดใช้งาน</option>
                          <option value="banned">แบน</option>
                        </select>
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