import { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://servercoffee-d58c85f2052e.herokuapp.com/auth/register', {
        username: name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess('สมัครสมาชิกสำเร็จ!');
        setName('');
        setEmail('');
        setPassword('');
        
        // ✅ แสดงข้อความสักพักแล้วปิด popup
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="ชื่อผู้ใช้"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <input
        type="email"
        placeholder="อีเมล"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        required
      />

      {/* ✅ แสดง error หรือ success */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        สมัครสมาชิก
      </button>
    </form>
  );
}
