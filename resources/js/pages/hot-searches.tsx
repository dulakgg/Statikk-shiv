import React, { Suspense, useState, useEffect } from 'react';
const NavBar = React.lazy(() => import('../components/Navbar.jsx'));
const Footer = React.lazy(() => import('../components/Footer.jsx'));
const HotSearches = React.lazy(() => import('@/components/HotSearches.js'));
import { Head } from '@inertiajs/react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12" role="status" aria-label="Loading">
    <svg
      className="animate-spin h-12 w-12 text-teal-500"
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <Head>
        <meta property="og:url" content="https://statikkshiv.com/hot-searches" />
        <link rel="canonical" href="https://statikkshiv.com/hot-searches" />
        <title>Statikk Shiv – Hot Searches: Trending League of Legends Summoners and Matches</title>
      </Head>
      
      <Suspense fallback={<div>Loading navigation...</div>}>
        <NavBar />
      </Suspense>

      <main className="flex-grow flex flex-col items-center justify-start px-4 md:px-6 py-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-balance">
            Hot Searches
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-teal-600 dark:text-teal-400">
            Trending Summoners & Matches
          </h2>
        </div>

        <div className="mb-12 w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Info Cards */}
          {[{
            title: "What is Hot Searches?",
            content: "See which League of Legends summoners and matches are getting the most attention right now. This page updates regularly to show you what's trending on Statikk Shiv."
          }, {
            title: "Why Check?",
            content: (
              <ul className="space-y-3 pl-4">
                <li className="list-disc">Spot trending players and matches</li>
                <li className="list-disc">Analyze top gameplay</li>
                <li className="list-disc">Stay updated with the latest action</li>
              </ul>
            )
          }, {
            title: "How to Use",
            content: "Browse the list below and click any entry for more details and stats."
          }].map((card, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col gap-4 transition-all hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-black dark:text-white">
                {card.title}
              </h3>
              <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {card.content}
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Suspense fallback={<div className="text-lg py-12">Loading hot searches...</div>}>
            <HotSearches />
          </Suspense>
        )}
      </main>

      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}