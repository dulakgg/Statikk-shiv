import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Head } from '@inertiajs/react';

const regions = [
  "br1", "eun1", "euw1", "jp1", "kr", "la1", "la2", "me1", "na1", "oc1", "ru", "sg2", "tr1", "tw2", "vn2"
];

export default function MatchSearch() {
  const [matchId, setMatchId] = useState("");
  const [region, setRegion] = useState("eun1");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchId.trim()) {
      setError("Please enter a match ID.");
      return;
    }
    setError("");
    window.location.href = `/match?matchId=${encodeURIComponent(matchId)}&region=${region}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Head>
        <meta property="og:url" content="https://statikkshiv.com/match-search" />
        <link rel="canonical" href="https://statikkshiv.com/match-search" />
      </Head>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center py-16 px-4">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Search for a Match</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="font-semibold dark:text-white" htmlFor="matchId">
              Match ID
            </label>
            <input
              id="matchId"
              type="text"
              value={matchId}
              onChange={e => setMatchId(e.target.value)}
              placeholder="Enter match ID"
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              required
            />

            <label className="font-semibold dark:text-white" htmlFor="region">
              Region
            </label>
            <select
              id="region"
              value={region}
              onChange={e => setRegion(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              required
            >
              {regions.map(r => (
                <option key={r} value={r}>{r.toUpperCase()}</option>
              ))}
            </select>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-md hover:scale-105 transition"
            >
              Search Match
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}