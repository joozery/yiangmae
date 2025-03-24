import { Link } from "react-router-dom";
import drinksIcon from '../../assets/cat-drinks.jpg';
import bakeryIcon from '../../assets/cat-bakery.jpg';
import othersIcon from '../../assets/cat-others.jpg';

const categories = [
  { icon: drinksIcon, name: "เครื่องดื่ม", path: "/drinks" },
  { icon: bakeryIcon, name: "เบเกอรี่", path: "/bakery" },
  { icon: othersIcon, name: "สินค้าอื่นๆ", path: "/other" },
];

export default function CategorySection() {
  return (
    <section className="py-10 bg-[#F5F5F5]">
      <div className="max-w-[1200px] mx-auto px-4 text-center font-prompt">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">หมวดหมู่เมนูของเรา</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link
              to={cat.path}
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center hover:bg-[#FFEEDB]"
            >
              <div className="w-full h-32 rounded-md overflow-hidden mb-4">
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-semibold text-gray-800">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}