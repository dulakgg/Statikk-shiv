import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Head } from '@inertiajs/react'; // or 'next/head' if Next.js

interface QueueStatus {
  [key: string]: string; // e.g. 'RANKED_SOLO_5x5': 'Operational' | 'Affected'
}

interface RegionStatus {
  region: string;
  status: string;
  indicator: string;
  queueStatus: QueueStatus;
}

interface Props {
  statuses: RegionStatus[] | null; // nullable to show loading
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <svg
      className="animate-spin h-10 w-10 text-teal-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="Loading"
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

const QueueStatusPage: React.FC<Props> = ({ statuses }) => {
  const queues = {
    RANKED_SOLO_5x5: 'Ranked Solo/Duo',
    RANKED_FLEX_SR: 'Ranked Flex',
    ARAM: 'ARAM',
    NORMAL: 'Normal Draft',
  };

  // Optional: local loading state if you fetch data here
  // if statuses is null, treat as loading
  if (!statuses) {
    return (
      <>
      <Head>
       <link rel="canonical" href="https://statikkshiv.com/queue" />
      </Head>
        <Navbar />
        <LoadingSpinner />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
       <link rel="canonical" href="https://statikkshiv.com/queue" />
      </Head>

      <Navbar />
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Regional Queue Status & Server Info</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statuses.map(({ region, status, indicator, queueStatus }) => (
            <div key={region} className="border rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">{region}</h2>
              <p>
                Status: <strong>{status}</strong>
              </p>
              <p>
                Indicator:{' '}
                <span className={`font-bold ${indicator === 'none' ? 'text-green-600' : 'text-red-600'}`}>
                  {indicator}
                </span>
              </p>

              <h3 className="mt-4 font-semibold">Queue Status</h3>
              <ul>
                {Object.entries(queues).map(([queueKey, queueName]) => (
                  <li key={queueKey} className="mb-1">
                    {queueName}:{' '}
                    <span
                      className={`font-semibold ${
                        queueStatus && queueStatus[queueKey] === 'Affected' ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {queueStatus ? queueStatus[queueKey] || 'Unknown' : 'Unknown'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QueueStatusPage;
