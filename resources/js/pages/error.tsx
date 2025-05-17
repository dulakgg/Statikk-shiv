import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

interface ErrorPlayerProfileProps {
  onRetry?: () => void;
  message?: string;
}

const error: React.FC<ErrorPlayerProfileProps> = ({
  onRetry,
  message = 'Player profile not found or there was an error fetching data or your just loading data too fast.',
}) => {
  return (
    <>
    <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, ease: 'anticipate' }}
        >
          404
        </motion.h1>

        {/* Error icon and message */}
        <motion.div
          className="flex justify-center mb-4 text-red-500"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <AlertCircle size={36} />
        </motion.div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Oops!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>

        {/* Retry button */}
        {onRetry && (
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
      </motion.div>
    </div>
    <Footer />
    </>
  );
};

export default error;
