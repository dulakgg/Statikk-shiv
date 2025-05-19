import React, { useState, useEffect, useMemo, useRef } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { clsx } from 'clsx';

import { Trophy, XCircle, Zap, Skull, Heart, X } from 'lucide-react';

interface Participant {
  puuid: string;
  summonerName: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  role: string;
  gameEndTimestamp: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  augments?: string[];
}

interface MatchDetail {
  metadata: { matchId: string; participants: string[] };
  info: { gameDuration: number; participants: Participant[] };
}

interface SummonerData {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

interface ProfilePageProps {
  data: MatchDetail[];
  puuid: string;
  nickname: string;
  region: string;
  tagline: string;
  summoner: SummonerData;
  profileiconid: string;
}

function Spinner() {
  return (
    <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export default function Profile({ data, puuid, summoner, nickname, tagline, region, profileiconid }: ProfilePageProps) {
  const [modalMatch, setModalMatch] = useState<MatchDetail | null>(null);
  const [ddragonVersion, setDdragonVersion] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [matches, setMatches] = useState<MatchDetail[]>(data);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(data.length >= 10);
  const [initialLoading, setInitialLoading] = useState(true); // NEW
  const [custom, setCustom] = useState(null);
  const pageRef = useRef(1);

  useEffect(() => {
    // Simulate loading or fetch ddragonVersion here
    // When done, setInitialLoading(false);
    // Example:
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(res => res.json())
      .then(versions => {
        setDdragonVersion(versions[0]);
        setInitialLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/profile-customization/${puuid}`)
      .then(res => res.json())
      .then(setCustom);
  }, [puuid]);

  const stats = useMemo(() => {
    let wins = 0, losses = 0, totalKills = 0, totalDeaths = 0, totalAssists = 0;
    data.forEach(match => {
      const p = match.info.participants.find(p => p.puuid === puuid);
      if (p) {
        p.win ? wins++ : losses++;
        totalKills += p.kills;
        totalDeaths += p.deaths;
        totalAssists += p.assists;
      }
    });
    const kda = totalDeaths === 0
      ? (totalKills + totalAssists).toFixed(2)
      : ((totalKills + totalAssists) / totalDeaths).toFixed(2);
    return { wins, losses, avgKDA: kda };
  }, [data, puuid]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? 'Unknown Date'
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatRevisionDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? 'Unknown'
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const loadMoreMatches = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/profile-matches?puuid=${puuid}&region=${region}&page=${pageRef.current + 1}`
      );
      if (!res.ok) throw new Error('Failed to load more matches');
      const json = await res.json();
      setMatches(prev => [...prev, ...json.matches]);
      // Only set hasMore to false if the backend returns 0 matches
      setHasMore(json.matches.length > 0);
      pageRef.current += 1;
    } catch (e) {
      setHasMore(false);
    }
    setLoadingMore(false);
  };

  if (initialLoading || !ddragonVersion) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Spinner />
        <p className="text-lg text-center text-gray-700 dark:text-gray-200 px-4">
          Loading your profile and matches...<br />
          <span className="text-sm text-gray-500">
            This may take a while depending on your match history and statistics.
          </span>
        </p>
      </div>
    );
  }

  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${summoner.profileIconId}.png`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto pt-20 px-4 pb-12 max-w-7xl">
        {/* Profile Header */}
        <section className="relative rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-noise opacity-10" />
          <div className="p-6 flex items-center gap-6 relative">
            <div className="relative">
              <img
                src={iconUrl}
                alt={`${nickname} profile icon`}
                className="w-24 h-24 rounded-2xl border-4 border-white/30 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Lv. {summoner.summonerLevel}
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">
                {nickname}
                <span className="text-xl font-medium text-white/80 ml-2">#{tagline}</span>
              </h1>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="text-white font-semibold">{stats.wins}W</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                  <XCircle className="w-5 h-5 text-red-300" />
                  <span className="text-white font-semibold">{stats.losses}L</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                  <Zap className="w-5 h-5 text-blue-300" />
                  <span className="text-white font-semibold">{stats.avgKDA} KDA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Matches Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white/90">Recent Matches</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {matches.map(match => {
              const player = match.info.participants.find(p => p.puuid === puuid);
              if (!player) return null;
              const isWin = player.win;
              const kda = ((player.kills + player.assists) / Math.max(player.deaths, 1)).toFixed(2);

              return (
                <div 
                onClick={() => {
                    router.get('/match', {
                      nickname,
                      region: 'eun1', // or use a prop/variable if dynamic
                      tagline,
                      matchId: match.metadata.matchId,
                      profileiconwow: profileiconid,
                    });
                  }}
                  key={match.metadata.matchId}
                  className={clsx(
                    "group relative bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg transition-all",
                    "hover:shadow-xl hover:-translate-y-0.5 border-2 cursor-pointer",
                    isWin 
                      ? "border-green-500/20 hover:border-green-500/30" 
                      : "border-red-500/20 hover:border-red-500/30"
                  )}
                >
                  <div className="flex gap-4 items-center">
                    {/* Match Result */}
                    <div className="w-20 flex flex-col items-center">
                      <div className={clsx(
                        "text-2xl font-black uppercase tracking-wide",
                        isWin ? "text-green-600" : "text-red-600"
                      )}>
                        {isWin ? "W" : "L"}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {Math.floor(match.info.gameDuration / 60)}m
                      </p>
                    </div>

                    {/* Champion Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${player.championName}.png`}
                        alt={player.championName}
                        className="w-14 h-14 rounded-full border-2 border-gray-200 dark:border-gray-700"
                      />
                      <div>
                        <h3 className="font-bold text-lg dark:text-white">{player.championName}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300 uppercase">
                          {player.role.replace(/^_/, '')} • {player.kills}/{player.deaths}/{player.assists}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span className={clsx(
                            "px-2 py-1 rounded-full text-xs font-semibold",
                            isWin ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          )}>
                            KDA {kda}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Items Grid */}
                    <div className="hidden md:grid grid-cols-3 gap-1 w-24">
                      {[player.item0, player.item1, player.item2, player.item3, player.item4, player.item5]
                        .filter(id => id > 0)
                        .map((id, i) => (
                          <img
                            key={i}
                            src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png`}
                            alt={`Item ${id}`}
                            className="w-8 h-8 rounded border border-gray-100 dark:border-gray-700"
                          />
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMoreMatches}
                disabled={loadingMore}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-all disabled:opacity-60"
              >
                {loadingMore ? 'Loading...' : 'Load More Matches'}
              </button>
            </div>
          )}
        </section>

        {/* Match Modal */}
        {modalMatch && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <button 
                onClick={() => setModalMatch(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-6 dark:text-white">
                  Match Details
                </h3>

                {/* Participants Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {modalMatch.info.participants.map(p => (
                    <div
                      key={p.puuid}
                      className="flex flex-col items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${p.championName}.png`}
                        alt={p.championName}
                        className="w-12 h-12 rounded-full mb-2 border-2 border-white/20"
                      />
                      <span className="text-sm font-medium text-center dark:text-white">
                        {p.summonerName}
                      </span>
                      <div className="flex gap-1 mt-1">
                        <span className="text-xs text-green-600">{p.kills}</span>
                        <span className="text-xs text-red-600">{p.deaths}</span>
                        <span className="text-xs text-blue-600">{p.assists}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
            {loadingMore && (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40">
    <Spinner />
    <p className="text-lg text-center text-white px-4">
      Loading more matches...<br />
      <span className="text-sm text-gray-200">
        This may take a while depending on your match history and statistics.
      </span>
    </p>
  </div>
)}
      <Footer />

    </div>
  );
}
