import React, { Suspense } from 'react';
import { Head } from '@inertiajs/react';

const NavBar = React.lazy(() => import('../components/Navbar.jsx'));
const Footer = React.lazy(() => import('../components/Footer.jsx'));
const HeroSection = React.lazy(() => import('../components/HeroSection.jsx'));

export default function Welcome() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <Head>
        <meta property="og:url" content="https://statikkshiv.com/" />
        <link rel="canonical" href="https://statikkshiv.com/" />
      </Head>
      <Suspense fallback={<div>Loading navigation...</div>}>
        <NavBar />
      </Suspense>
      <main className="flex-grow flex items-center justify-center px-6">
        <Suspense fallback={<div>Loading...</div>}>
          <HeroSection />
        </Suspense>
      </main>
      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
