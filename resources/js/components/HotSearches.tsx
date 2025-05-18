import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HotEntry {
  nickname: string;
  tagline: string;
  region: string;
  count: number;
}

type Period = 'today' | 'week' | 'month' | 'year' | 'all';
const periods: Period[] = ['today', 'week', 'month', 'year', 'all'];

function HotSearches() {
  const [period, setPeriod] = useState<Period>('today');
  const [hotList, setHotList] = useState<HotEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHot = (p: Period) => {
    setLoading(true);
    fetch(`/api/hot-searches?period=${p}`)
      .then((r) => r.json())
      .then((data: HotEntry[]) => {
        setHotList(data);
        setLoading(false);
      })
      .catch(() => {
        setHotList([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHot(period);
    const timer = setInterval(() => fetchHot(period), 60000);
    return () => clearInterval(timer);
  }, [period]);

  return (
    <section className="mt-8 max-w-lg mx-auto" aria-label="Hot searches by period">
      <nav aria-label="Select period for hot searches" className="flex space-x-2 mb-4">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              p === period
                ? 'bg-gradient-to-r from-[#64ddcd] to-[#3c8277] text-white'
                : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300'
            }`}
            aria-pressed={p === period}
            type="button"
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </nav>

      {loading ? (
        <div className="text-center py-4" role="status" aria-live="polite">
          Loading…
        </div>
      ) : hotList.length === 0 ? (
        <div className="text-center py-4" aria-live="polite">
          No searches this {period}.
        </div>
      ) : (
        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          className="space-y-2"
        >
          {hotList.map((entry, idx) => {
            const url = `/profile-search?nickname=${encodeURIComponent(
              entry.nickname
            )}&tagline=${encodeURIComponent(entry.tagline)}&region=${encodeURIComponent(entry.region)}`;
            return (
              <motion.li
                key={`${entry.nickname}-${entry.tagline}-${entry.region}`}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } },
                }}
                className="flex justify-between p-4 bg-white dark:bg-neutral-800 rounded-lg shadow hover:bg-neutral-100 dark:hover:bg-neutral-700 transition"
              >
                <a
                  href={url}
                  className="flex-grow flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
                  aria-label={`View profile of ${entry.nickname} hashtag ${entry.tagline} in region ${entry.region.toUpperCase()}, searched ${entry.count} times`}
                >
                  <div>
                    <span className="font-semibold">{idx + 1}.</span>{' '}
                    <span>{entry.nickname}#{entry.tagline}</span>
                    <span className="ml-2 text-sm text-gray-500">({entry.region.toUpperCase()})</span>
                  </div>
                  <div className="font-medium text-teal-500">{entry.count}</div>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </section>
  );
}

export default HotSearches;
