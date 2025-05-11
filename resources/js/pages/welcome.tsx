import NavBar from '../components/Navbar.jsx'
import HeroSection from '../components/HeroSection.jsx';
import Footer from '../components/Footer.jsx';
import CookieBanner from '../components/cookie-baner.jsx';

export default function Welcome() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <NavBar />
      <main className="flex-grow flex items-center justify-center px-6">
        <HeroSection />
        <CookieBanner />
      </main>
      <Footer />
    </div>
  );
}
