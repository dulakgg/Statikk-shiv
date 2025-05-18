import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Head } from '@inertiajs/react';

interface ErrorPlayerProfileProps {
  onRetry?: () => void;
  message?: string;
  loading?: boolean;
}

const Spinner = () => (
  <svg
    className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    role="img"
    aria-label="Loading"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const Error: React.FC<ErrorPlayerProfileProps> = ({
  onRetry,
  message = 'Player profile not found or there was an error fetching data or you’re just loading data too fast.',
  loading = false,
}) => {
  return (
    <>
    <Head>
        <link rel="canonical" href="https://statikkshiv.com/error" />
      </Head>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-background p-4" role="main">
        <section
          className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          <motion.h1
            className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8, ease: 'anticipate' }}
          >
            {loading ? 'Loading...' : '404'}
          </motion.h1>

          {loading ? (
            <Spinner />
          ) : (
            <motion.div
              className="flex justify-center mb-4 text-red-500"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              aria-hidden="true"
            >
              <AlertCircle size={36} />
            </motion.div>
          )}

          <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {loading ? 'Please wait...' : 'Oops!'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {loading
              ? 'Fetching data, hang tight.'
              : message}
          </p>

          {!loading && onRetry && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={onRetry}
            >
              <RefreshCw size={20} className="mr-2" />
              Retry
            </motion.button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Error;
