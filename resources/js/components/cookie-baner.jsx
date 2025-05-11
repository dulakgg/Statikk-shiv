// components/CookieBanner.jsx
import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  // Check if cookie accepted
  const hasAccepted = () => document.cookie.split('; ').some(row => row.startsWith('cookies_accepted='));

  // Set cookie utility
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
  };

  useEffect(() => {
    if (!hasAccepted()) setVisible(true);
  }, []);

  const acceptCookies = () => {
    setCookie('cookies_accepted', 'true', 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 z-50">
      <p className="text-sm">
        We use cookies to enhance your experience and serve personalized ads. By continuing to browse, you agree to our{' '}
        {/* Open PDF in new tab */}
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-green-400 hover:text-green-300"
        >
          Privacy Policy
        </a>.
      </p>
      <button
        onClick={acceptCookies}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Accept
      </button>
    </div>
  );
}