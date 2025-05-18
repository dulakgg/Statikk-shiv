import NavBar from '../components/Navbar.jsx';
import HeroSection from '../components/HeroSection.jsx';
import Footer from '../components/Footer.jsx';
import { Head } from '@inertiajs/react';
import HotSearches from '@/components/HotSearches.js';

export default function Welcome() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <Head>
        <link rel="canonical" href="https://statikkshiv.com/" />
      </Head>
      <NavBar />
      <main className="flex-grow flex items-center justify-center px-6">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
