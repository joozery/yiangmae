import { useEffect, useState } from "react";
import axios from "axios";
import { useLoading, BallTriangle } from "@agney/react-loading";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  const API_URL = "https://servercoffee-d58c85f2052e.herokuapp.com/products";

  // 🎯 Loading animation setup
  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <BallTriangle width="50" />,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("โหลดสินค้าล้มเหลว", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      if (isEditing) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }

      setIsModalOpen(false);
      setIsEditing(false);
      setEditingId(null);
      setNewProduct({ name: "", price: "", category: "", image: null });

      fetchProducts();
    } catch (err) {
      console.error("เพิ่ม/แก้ไขสินค้าล้มเหลว", err);
    }
  };

  const handleEdit = (product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      image: null,
    });
    setEditingId(product.id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจว่าต้องการลบสินค้านี้?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("ลบสินค้าล้มเหลว", err);
      }
    }
  };

  return (
    <div className="p-6 font-prompt">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">จัดการสินค้า</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
            setNewProduct({ name: "", price: "", category: "", image: null });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          ➕ เพิ่มสินค้าใหม่
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? (
          <div
            {...containerProps}
            className="flex justify-center items-center p-8"
          >
            {indicatorEl}
          </div>
        ) : (
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ภาพ</th>
                <th className="px-6 py-3">ชื่อสินค้า</th>
                <th className="px-6 py-3">ราคา</th>
                <th className="px-6 py-3">หมวดหมู่</th>
                <th className="px-6 py-3 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.price} บาท</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-500 hover:underline mr-3"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:underline"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {isEditing ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="ชื่อสินค้า"
                value={newProduct.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="ราคา (บาท)"
                value={newProduct.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">เลือกหมวดหมู่</option>
                <option value="เครื่องดื่ม">เครื่องดื่ม</option>
                <option value="เบเกอรี่">เบเกอรี่</option>
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isEditing ? "บันทึกการแก้ไข" : "บันทึกสินค้า"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}