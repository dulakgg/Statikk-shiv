import NavBar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx';
import { useState, useEffect } from 'react';
import HotSearches from '@/components/HotSearches.js';
import { Head } from '@inertiajs/react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-6" role="status" aria-label="Loading">
    <svg
      className="animate-spin h-8 w-8 text-teal-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
);

export default function Search() {
  const [loading, setLoading] = useState(true);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // fake delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <Head>
        <link rel="canonical" href="https://statikkshiv.com/hot-searches" />
      </Head>
      <NavBar />
      {loading ? <LoadingSpinner /> : <HotSearches />}
      <Footer />
    </div>
  );
}
