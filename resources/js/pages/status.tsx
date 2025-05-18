import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';
import { Head } from '@inertiajs/react'; // import Head for SEO, or use next/head if using Next.js

interface RegionStatus {
  region: string;
  status: string;
  indicator: string;
  maintenances: any[];
  incidents: any[];
}

interface Props {
  statuses: RegionStatus[] | null; // nullable for loading state
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

const StatusPage: React.FC<Props> = ({ statuses }) => {
  if (!statuses) {
    return (
      <>
        <Head>
          <link rel="canonical" href="https://statikkshiv.com/status" />
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
        <link rel="canonical" href="https://statikkshiv.com/status" />
      </Head>
      <Navbar />
      <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center mx-auto w-fit">
        {statuses.map((regionStatus) => (
          <div key={regionStatus.region} className="border rounded-xl p-4 shadow-md">
            <h2 className="text-xl font-semibold">{regionStatus.region}</h2>
            <p>
              Status: <strong>{regionStatus.status}</strong>
            </p>
            <p>
              Indicator:{' '}
              <span
                className={`text-${regionStatus.indicator === 'none' ? 'green' : 'red'}-500`}
              >
                {regionStatus.indicator}
              </span>
            </p>

            {regionStatus.maintenances.length > 0 && (
              <div className="mt-2 text-sm text-yellow-600">
                <p className="font-semibold">Maintenance ongoing</p>
                <p>
                  {regionStatus.maintenances[0]?.titles?.[0]?.content ??
                    'Scheduled maintenance in progress.'}
                </p>
              </div>
            )}

            {regionStatus.incidents.length > 0 && (
              <div className="mt-2 text-sm text-red-600">
                <p className="font-semibold">Active incident reported</p>
                <p>
                  {regionStatus.incidents[0]?.titles?.[0]?.content ??
                    regionStatus.incidents[0]?.updates?.[0]?.translations?.[0]?.content ??
                    'An issue is affecting this region.'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default StatusPage;
