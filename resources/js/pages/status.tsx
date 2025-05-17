import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState, useMemo } from 'react';

interface RegionStatus {
  region: string;
  status: string;
  indicator: string;
  maintenances: any[];
  incidents: any[];
}

interface Props extends RegionStatus {
  statuses: RegionStatus[];
}

const StatusPage: React.FC<Props> = ({ statuses }) => {
  return (
    <div>
        <Navbar />
      <div className="py-12 grid grid-cols-3 gap-4 justify-center items-center mx-auto w-fit">
        {statuses.map((regionStatus) => (
          <div key={regionStatus.region} className="border rounded-xl p-4 shadow-md">
            <h2 className="text-xl font-semibold">{regionStatus.region}</h2>
            <p>Status: <strong>{regionStatus.status}</strong></p>
            <p>Indicator: <span className={`text-${regionStatus.indicator === 'none' ? 'green' : 'red'}-500`}>{regionStatus.indicator}</span></p>
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
    </div>
  );
};

export default StatusPage;
