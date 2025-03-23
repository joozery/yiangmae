import heroImg from '../../assets/bgcoffee.jpg'; // เปลี่ยนชื่อให้ตรงกับรูปของคุณ

export default function HeroSection() {
  return (
    <section className="relative w-full font-prompt">
      <div className="relative">
        <img
          src={heroImg}
          alt="Coffee Hero Banner"
          className="w-full h-[500px] object-cover rounded-xl shadow-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
            ยินดีต้อนรับสู่ เตียงแม่ Coffee ☕
          </h1>
          <p className="text-white text-lg md:text-xl mb-6">
            สัมผัสรสชาติกาแฟแท้และขนมอร่อยๆ จากร้านของเรา
          </p>
          <button className="bg-white text-black px-6 py-2 rounded-lg shadow hover:bg-gray-100 font-semibold transition">
            ดูเมนูของเรา
          </button>
        </div>
      </div>
    </section>
  );
}