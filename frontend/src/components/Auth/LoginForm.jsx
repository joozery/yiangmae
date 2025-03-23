import { useState } from 'react';
import axios from 'axios';

export default function LoginForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://servercoffee-d58c85f2052e.herokuapp.com/auth/login', {
        email,
        password,
      });

      console.log('🎉 Login success:', response.data); // 🔍 debug

      const { token, username, message } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setEmail('');
        setPassword('');
        onClose(); // ✅ ปิด popup
      } else {
        setError(message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && !loading && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

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
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
      </button>
    </form>
  );
}
