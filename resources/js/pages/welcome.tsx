import NavBar from '../components/Navbar.jsx'
import HeroSection from '../components/HeroSection.jsx';
import Footer from '../components/Footer.jsx';
import { Head } from '@inertiajs/react';
import HotSearches from '@/components/HotSearches.js';

export default function Welcome() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <Head title="Statikk Shiv" />
      <NavBar />
      <main className="flex-grow flex items-center justify-center px-6">
        <HeroSection />
        <script
            id="CookieDeclaration"
            src="https://consent.cookiebot.com/a016fc49-d0d9-4622-b0ef-7cd3ca33d2ec/cd.js"
            type="text/javascript"
        ></script>
      </main>
      <Footer />
    </div>
  );
}
