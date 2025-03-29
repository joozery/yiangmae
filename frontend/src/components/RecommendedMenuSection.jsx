import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecommendedMenuSection() {
  const [recommendedMenus, setRecommendedMenus] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await axios.get('https://servercoffee-d58c85f2052e.herokuapp.com/products');
        // ✅ สมมุติว่าเมนูแนะนำคือ 3 อันแรกของ response
        const topMenus = res.data.slice(0, 3);
        setRecommendedMenus(topMenus);
      } catch (err) {
        console.error("❌ โหลดเมนูแนะนำล้มเหลว", err);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 text-center font-prompt">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">เมนูแนะนำ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {recommendedMenus.map((menu, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={menu.image_url}
                alt={menu.name}
                className="w-full h-[220px] object-cover rounded-md mb-5"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{menu.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{menu.category}</p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}