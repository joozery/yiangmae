// src/components/RecommendedMenuSection.jsx
import espressoImg from '../assets/เอสเพรชโซ.jpg';
import latteImg from '../assets/ลาเต้.jpg';
import mochaImg from '../assets/มอคค่า.jpg';

const menus = [
  {
    name: "เอสเพรสโซ",
    description: "กาแฟเข้มข้นสำหรับคอกาแฟตัวจริง",
    image: espressoImg,
  },
  {
    name: "ลาเต้",
    description: "กาแฟนุ่มละมุน หอมละไม",
    image: latteImg,
  },
  {
    name: "มอคค่า",
    description: "กาแฟเข้มกับโกโก้สุดฟิน",
    image: mochaImg,
  },
];

export default function RecommendedMenuSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 text-center font-prompt">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">เมนูแนะนำ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="w-full h-[220px] object-cover rounded-md mb-5"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{menu.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{menu.description}</p>
              <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-all duration-200">
                สั่งเลย
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}