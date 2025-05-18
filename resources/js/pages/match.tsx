import React, { useState, useEffect, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Summoner {
  puuid: string;
  summonerName: string;
  profileIconId: number;
  gameName:   string;   // <- Riot account gameName
  tagLine:    string;   // <- Riot account tagLine
}

interface ParticipantStats {
  puuid: string;
  summonerName: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  role: string;
  gameEndTimestamp: number;
  gameDuration: number;
  gameVersion: string;
  champLevel: number;
  goldEarned: number;
  totalMinionsKilled: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  visionScore: number;
  wardsPlaced: number;
  wardsKilled: number;
  timeCCingOthers: number;
  summoner1Id: number;
  summoner2Id: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
}

interface MatchDetail {
  metadata: { matchId: string; participants: string[] };
  info: { gameDuration: number; participants: ParticipantStats[]; gameVersion: string };
}

interface PageProps {
  matchDetail: MatchDetail;
  participants: Summoner[];
  region: string;
  matchId: string;
  nickname: string;
  tagline: string;
  profileicon: string;
}
export default function Match({
  matchDetail,
  participants,
  region,
  matchId,
  nickname,
  tagline,
  profileicon,
}: PageProps) {
  const [ddragonVersion, setDdragonVersion] = useState('');
  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(res => res.json())
      .then((versions: string[]) => setDdragonVersion(versions[0] || ''))
      .catch(() => setDdragonVersion('15.9.1'));
  }, []);

  const players = useMemo(() => {
    const statMap = Object.fromEntries(
      matchDetail.info.participants.map(p => [p.puuid, p])
    );
    return participants.map(s => ({ ...s, stats: statMap[s.puuid] })).filter(p => p.stats);
  }, [matchDetail, participants]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = players[selectedIndex];
  const matchDate = useMemo(() => {
  const now = Date.now();
  const diff = now - selected.stats.gameEndTimestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `Just now`;
}, [selected.stats.gameEndTimestamp]);


  const prioritized = [
    { label: 'Victory', value: selected.stats.win ? 'Yes' : 'No' },
    { label: 'Kills', value: selected.stats.kills },
    { label: 'Deaths', value: selected.stats.deaths },
    { label: 'Assists', value: selected.stats.assists },
    { label: 'KDA', value: ((selected.stats.kills + selected.stats.assists) / Math.max(1, selected.stats.deaths)).toFixed(2) },
    { label: 'Champion Level', value: selected.stats.champLevel },
    { label: 'Gold Earned', value: selected.stats.goldEarned.toLocaleString() },
    { label: 'Minions Killed', value: selected.stats.totalMinionsKilled },
  ];

  const others = [
    { label: 'Damage to Champions', value: selected.stats.totalDamageDealtToChampions.toLocaleString() },
    { label: 'Damage Taken', value: selected.stats.totalDamageTaken.toLocaleString() },
    { label: 'Vision Score', value: selected.stats.visionScore },
    { label: 'Wards (Placed/Killed)', value: `${selected.stats.wardsPlaced}/${selected.stats.wardsKilled}` },
    { label: 'CC Duration (sec)', value: selected.stats.timeCCingOthers },
    { label: 'Game Duration (min)', value: (matchDetail.info.gameDuration / 60).toFixed(1) },
    { label: 'Game Version', value: matchDetail.info.gameVersion },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <NavBar />
      <main className="flex-grow flex flex-col items-center container mx-auto px-4 sm:px-6 py-8">
        {/* Static Profile Header */}
        <div className="w-full max-w-4xl bg-gradient-to-r from-[#2a3b5f] to-[#1a2338] text-white p-6 rounded-2xl mb-8 shadow-xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative overflow-hidden rounded-full border-4 border-white/20 w-24 h-24">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${profileicon}.png`}
                alt="Profile Icon"
                className="w-full h-full scale-110 object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {nickname}
                <span className="text-indigo-300 ml-2 text-xl">#{tagline}</span>
              </h1>
              <div className="mt-3 flex flex-wrap gap-3 justify-center">
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  Match ID: {matchId}
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  {matchDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Participant Tabs */}
        <nav className="w-full max-w-4xl mb-8">
          <div className="flex flex-wrap gap-2 justify-center px-1">
            {players.map((p, idx) => (
              <button
                key={p.puuid}
                onClick={() => setSelectedIndex(idx)}
                className={`px-4 py-2 rounded-lg font-medium transition-all min-w-[120px] truncate 
                  ${
                    idx === selectedIndex
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-neutral-700/50 hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-800 dark:text-gray-200'
                  }`}
              >
                {p.summonerName}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content Section */}
        <section className="w-full max-w-4xl bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl">
          {/* Champion Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${selected.stats.championName}.png`}
                alt={selected.stats.championName}
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">
                {selected.stats.championName}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-4">
                {selected.stats.role} • {region.toUpperCase()} • {selected.stats.win ? 'VICTORY' : 'DEFEAT'}
              </p>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {selected.stats.kills}/{selected.stats.deaths}/{selected.stats.assists}
                  </div>
                  <p className="text-sm text-gray-500">K/D/A</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {((selected.stats.kills + selected.stats.assists) / Math.max(1, selected.stats.deaths)).toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-500">KDA Ratio</p>
                </div>
              </div>
            </div>
          </div>


          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-neutral-700/30 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Profile</h3>
              <div className="flex items-center justify-center md:justify-start gap-4 bg-white/10 dark:bg-white/5 p-4 rounded-xl shadow-inner">
  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
    #
  </div>
  <div>
    <p className="text-sm uppercase text-gray-400 tracking-wide">Riot ID</p>
    <p className="text-xl font-bold text-white">
      {selected.gameName}
      <span className="text-indigo-300 ml-1 text-lg font-medium">#{selected.tagLine}</span>
    </p>
  </div>
</div>


            </div>

            <div className="bg-gray-50 dark:bg-neutral-700/30 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Economy</h3>
              <div className="grid grid-cols-2 gap-4">
                {prioritized.slice(5).map(stat => (
                  <div key={stat.label} className="space-y-1">
                    <p className="font-bold text-xl">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="bg-gray-50 dark:bg-neutral-700/30 p-6 rounded-xl mb-8">
            <h3 className="text-lg font-semibold mb-4">Advanced Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {others.map(stat => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                  <p className="font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Items Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Items Built</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[selected.stats.item0, selected.stats.item1, selected.stats.item2,
                selected.stats.item3, selected.stats.item4, selected.stats.item5,
                selected.stats.item6]
                .filter(id => id && id !== 0)
                .map(id => (
                  <img
                    key={id}
                    src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png`}
                    alt={`Item ${id}`}
                    className="w-12 h-12 rounded-lg border border-gray-200 dark:border-neutral-600 hover:scale-110 transition-transform"
                  />
                ))}
            </div>
          </div>

          {/* View Full Profile Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.get('/profile-search', { puuid: selected.puuid, region })}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              View Full Profile →
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}