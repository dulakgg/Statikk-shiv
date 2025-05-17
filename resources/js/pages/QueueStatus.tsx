import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  statuses: RegionStatus[];
}

const QueueStatusPage: React.FC<Props> = ({ statuses }) => {
  const queues = {
    RANKED_SOLO_5x5: 'Ranked Solo/Duo',
    RANKED_FLEX_SR: 'Ranked Flex',
    ARAM: 'ARAM',
    NORMAL: 'Normal Draft',
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Regional Queue Status & Server Info</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statuses.map(({ region, status, indicator, queueStatus }) => (
            <div key={region} className="border rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">{region}</h2>
              <p>Status: <strong>{status}</strong></p>
              <p>Indicator: <span className={`font-bold text-${indicator === 'none' ? 'green' : 'red'}-600`}>{indicator}</span></p>

              <h3 className="mt-4 font-semibold">Queue Status</h3>
              <ul>
                {Object.entries(queues).map(([queueKey, queueName]) => (
                  <li key={queueKey} className="mb-1">
                    {queueName}: {' '}
                    <span className={`font-semibold ${queueStatus && queueStatus[queueKey] === 'Affected' ? 'text-red-600' : 'text-green-600'}`}>
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
    </div>
  );
};

export default QueueStatusPage;
