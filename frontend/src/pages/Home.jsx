import HeroSection from '../components/Hero/HeroSection'; // ปรับ path ให้ตรงกับโครงสร้างของคุณ
import CategorySection from '../components/CategorySection/CategorySection';
import RecommendedMenuSection from '../components/RecommendedMenuSection';

export default function Home() {
  return (
    <main className="bg-[#F9FAFB]">
      <HeroSection />
      <CategorySection />
      <RecommendedMenuSection />
    </main>
  );
}