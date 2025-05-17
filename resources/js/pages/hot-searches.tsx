import NavBar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx';
import { Head } from '@inertiajs/react';
import HotSearches from '@/components/HotSearches.js';

export default function Search() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <Head title="Statikk Shiv" />
      <NavBar />
      <HotSearches />
      <Footer />
    </div>
  );
}
