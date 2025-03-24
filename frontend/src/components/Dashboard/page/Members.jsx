import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "@agney/react-loading"; // ✅ ใช้ spinner loading

export default function Members() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://servercoffee-d58c85f2052e.herokuapp.com/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("❌ โหลดสมาชิกล้มเหลว:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">👥 จัดการสมาชิก</h2>

      {loading ? (
        <div className="flex justify-center mt-10">
          <ThreeDots width="40" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded-md shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">ชื่อ</th>
                <th className="p-3 text-left">อีเมล</th>
                <th className="p-3 text-center">สถานะ</th>
                <th className="p-3 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 text-center text-green-600">ใช้งาน</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    ไม่มีสมาชิกในระบบ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}