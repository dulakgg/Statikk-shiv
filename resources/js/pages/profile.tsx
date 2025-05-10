import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

interface MatchDetail {
  metadata: {
    matchId: string;
  };
  info: {
    gameDuration: number;
    participants: any[];
  };
}

interface ProfilePageProps {
  data: MatchDetail[];
  puuid: string;
}

export default function Profile({ data, puuid }: ProfilePageProps) {
  return (
    <div className="dark:text-white min-h-screen bg-background text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto pt-20 px-6 space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold">Summoner Profile</h1>
          <p className="text-lg mt-2">PUUID: {puuid}</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Matches</h2>
          {data.length === 0 ? (
            <p>No matches found.</p>
          ) : (
            <ul className="space-y-4">
              {data.map((match) => (
                <li key={match.metadata.matchId} className="p-4 bg-card rounded-2xl shadow">
                  <p><strong>Match ID:</strong> {match.metadata.matchId}</p>
                  <p>
                    <strong>Duration:</strong> {Math.floor(match.info.gameDuration / 60)}m {match.info.gameDuration % 60}s
                  </p>
                  <p><strong>Players:</strong> {match.info.participants.length}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 mt-12">
        <Footer />
      </footer>
    </div>
  );
}
