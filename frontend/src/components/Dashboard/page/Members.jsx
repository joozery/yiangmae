export default function Members() {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">จัดการสมาชิก</h2>
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">ชื่อ</th>
              <th className="p-2">อีเมล</th>
              <th className="p-2">สถานะ</th>
              <th className="p-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">สมชาย</td>
              <td className="p-2">somchai@example.com</td>
              <td className="p-2 text-green-600">ใช้งาน</td>
              <td className="p-2"><button className="text-red-500">ลบ</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }