export default function Orders() {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">ประวัติการสั่งซื้อ</h2>
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">รหัสออเดอร์</th>
              <th className="p-2">ลูกค้า</th>
              <th className="p-2">ยอดรวม</th>
              <th className="p-2">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">#00123</td>
              <td className="p-2">คุณสมหญิง</td>
              <td className="p-2">120 บาท</td>
              <td className="p-2 text-green-600">สำเร็จ</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }