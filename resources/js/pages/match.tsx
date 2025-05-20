import React, { useState, useEffect, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from "framer-motion";
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MatchDetail {
  metadata: { matchId: string; participants: string[] };
  info: { gameDuration: number; participants: Participant[]; gameVersion: string };
}

interface Summoner {
  puuid: string;
  summonerName: string;
  profileIconId: number;
  gameName: string;
  tagLine: string;
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
interface Challenges { [key: string]: any }

interface PerkSelection {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}

interface Style {
  description: string;
  selections: PerkSelection[];
  style: number;
}

interface Perks {
  statPerks: {
    defense: number;
    flex: number;
    offense: number;
  };
  styles: Style[];
}

interface Participant {
  allInPings: number;
  assistMePings: number;
  assists: number;
  baronKills: number;
  basicPings: number;
  bountyLevel: number;
  challenges: Challenges;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  championTransform: number;
  commandPings: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  dangerPings: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  eligibleForProgression: boolean;
  enemyMissingPings: number;
  enemyVisionPings: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  getBackPings: number;
  goldEarned: number;
  goldSpent: number;
  holdPings: number;
  individualPosition: string;
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  missions: {
    playerScore0: number;
    playerScore1: number;
    playerScore2: number;
    playerScore3: number;
    playerScore4: number;
    playerScore5: number;
    playerScore6: number;
    playerScore7: number;
    playerScore8: number;
    playerScore9: number;
    playerScore10: number;
    playerScore11: number;
  };
  needVisionPings: number;
  neutralMinionsKilled: number;
  nexusKills: number;
  nexusLost: number;
  nexusTakedowns: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  onMyWayPings: number;
  participantId: number;
  pentaKills: number;
  perks: Perks;
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  placement: number;
  playerAugment1: number;
  playerAugment2: number;
  playerAugment3: number;
  playerAugment4: number;
  playerAugment5: number;
  playerAugment6: number;
  playerSubteamId: number;
  profileIcon: number;
  pushPings: number;
  puuid: string;
  quadraKills: number;
  riotIdGameName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  stealthWardsPlaced: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  subteamPlacement: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: number;
  teamPosition: string;
  timeCCingOthers: number;
  timePlayed: number;
  totalAllyJungleMinionsKilled: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalEnemyJungleMinionsKilled: number;
  totalHeal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretTakedowns: number;
  turretsLost: number;
  unrealKills: number;
  visionClearedPings: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}

interface GameData {
  endOfGameResult: string;
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: Participant[];
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

  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [statSearch, setStatSearch] = useState('');
  const [allOpen, setAllOpen] = useState(false);

  // Helper to group by team
  const teams = [
    players.filter(p => p.stats.teamId === 100),
    players.filter(p => p.stats.teamId === 200),
  ];

  // Calculate max damage for each team for the bar
  const teamMaxDamage = [
    Math.max(...teams[0].map(p => p.stats.totalDamageDealtToChampions)),
    Math.max(...teams[1].map(p => p.stats.totalDamageDealtToChampions)),
  ];

  const globalMaxDamage = Math.max(
    ...players.map(p => p.stats.totalDamageDealtToChampions ?? 0),
    1
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <NavBar />
      <main className="flex flex-col lg:flex-row items-start container mx-auto px-4 sm:px-6 py-8 gap-8">
        {/* Left: Teams Overview */}
        <div className="flex-1 w-full max-w-4xl bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Teams Overview
          </h2>
          {teams.map((team, teamIdx) => {
            // Determine if this team won (at least one participant has win: true)
            const teamWon = team.some(p => p.stats.win);

            return (
              <div key={teamIdx} className="mb-4">
                <div className="flex items-center gap-3 font-bold text-lg px-2 py-1 text-blue-400 uppercase">
                  Team {teamIdx + 1}
                  {teamWon ? (
                    <span className="ml-2 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">Victory</span>
                  ) : (
                    <span className="ml-2 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">Defeat</span>
                  )}
                </div>
                {team.map((p, idx) => {
                  const globalIdx = teamIdx * 5 + idx;
                  const teamDamageMax = teamMaxDamage[teamIdx];
                  const damage = p.stats.totalDamageDealtToChampions;
                  const damagePercent = Math.round((damage / globalMaxDamage) * 100);

                  return (
                    <div key={p.puuid} className="border-b border-neutral-800">
                      <button
                        className={`w-full flex flex-col sm:flex-row items-center gap-2 px-2 py-3 hover:bg-neutral-800 transition group ${expandedIdx === globalIdx ? 'bg-neutral-900' : ''}`}
                        onClick={() => setExpandedIdx(expandedIdx === globalIdx ? null : globalIdx)}
                      >
                        {/* Champion Icon + Name */}
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${p.stats.championName}.png`}
                            alt={p.stats.championName}
                            className="w-8 h-8 rounded-full border-2 border-blue-400"
                          />
                          <span className="font-semibold text-blue-200 group-hover:underline">{p.stats.championName}</span>
                        </div>
                        {/* Summoner Name + Tag */}
                        <div className="flex flex-col min-w-[140px]">
                          <span className="font-semibold text-white">{p.summonerName}</span>
                          <span className="text-xs text-indigo-300">{p.gameName}#{p.tagLine}</span>
                        </div>
                        {/* Items */}
                        <div className="flex gap-1 min-w-[110px]">
                          {[p.stats.item0, p.stats.item1, p.stats.item2, p.stats.item3, p.stats.item4, p.stats.item5]
                            .filter(id => id && id !== 0)
                            .map(id => (
                              <img
                                key={id}
                                src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png`}
                                alt={`Item ${id}`}
                                className="w-5 h-5 rounded border border-gray-300 dark:border-neutral-700"
                              />
                            ))}
                        </div>
                        {/* KDA */}
                        <div className="flex flex-col items-center min-w-[60px]">
                          <span className="font-bold text-blue-300">{p.stats.kills}/{p.stats.deaths}/{p.stats.assists}</span>
                          <span className="text-xs text-gray-400">K/D/A</span>
                        </div>
                        {/* KDA Ratio */}
                        <div className="flex flex-col items-center min-w-[50px]">
                          <span className="font-bold text-green-400">
                            {((p.stats.kills + p.stats.assists) / Math.max(1, p.stats.deaths)).toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400">KDA</span>
                        </div>
                        {/* CS */}
                        <div className="flex flex-col items-center min-w-[40px]">
                          <span className="font-bold text-teal-300">{p.stats.totalMinionsKilled}</span>
                          <span className="text-xs text-gray-400">CS</span>
                        </div>
                        {/* Gold */}
                        <div className="flex flex-col items-center min-w-[50px]">
                          <span className="font-bold text-yellow-400">{p.stats.goldEarned}</span>
                          <span className="text-xs text-gray-400">Gold</span>
                        </div>
                        {/* Damage Bar */}
                        <div className="flex flex-col items-center min-w-[120px] w-[120px]">
                          <div className="w-full h-3 bg-neutral-700 rounded-full overflow-hidden relative">
                            <div
                              className="h-3 bg-gradient-to-r from-orange-400 to-red-600 rounded-full"
                              style={{ width: `${damagePercent}%` }}
                            />
                          </div>
                          <span className="text-xs text-orange-300 font-bold">{damage.toLocaleString()} dmg</span>
                        </div>
                        {/* Expand/Collapse Arrow */}
                        <span className="ml-2 text-lg text-gray-400">{expandedIdx === globalIdx ? "▲" : "▼"}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {expandedIdx === globalIdx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden bg-neutral-900 px-4 py-6 rounded-b-xl"
                          >
                            {/* --- BEGIN: ALL PROFILE/STATISTICS/SEARCH/ITEMS --- */}
                            <section className="w-full max-w-4xl mx-auto">
                              {/* Profile Header */}
                              <div className="w-full bg-gradient-to-r from-[#2a3b5f] to-[#1a2338] text-white p-6 rounded-2xl mb-8 shadow-xl">
                                <div className="flex flex-col items-center gap-4 text-center">
                                  <div className="relative overflow-hidden rounded-full border-4 border-white/20 w-24 h-24">
                                    <img
                                      src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${p.profileIconId}.png`}
                                      alt="Profile Icon"
                                      className="w-full h-full scale-110 object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h1 className="text-3xl font-bold tracking-tight">
                                      {p.summonerName}
                                      <span className="text-indigo-300 ml-2 text-xl">#{p.tagLine}</span>
                                    </h1>
                                    <div className="mt-3 flex flex-wrap gap-3 justify-center">
                                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                        Match ID: {matchId}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Stat Panel */}
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
                                        {p.gameName}
                                        <span className="text-indigo-300 ml-1 text-lg font-medium">#{p.tagLine}</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-neutral-700/30 p-6 rounded-xl flex flex-col gap-4 items-center justify-center">
                                  <h3 className="text-lg font-semibold mb-2">Statystyki - Panel</h3>
                                  <div className="flex gap-2">
                                    <button
                                      className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                                      onClick={() => setAllOpen(false)}
                                    >
                                      Roll All
                                    </button>
                                    <button
                                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                                      onClick={() => setAllOpen(true)}
                                    >
                                      Unroll All
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/* Main Statistics */}
                              <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/40 dark:to-purple-900/40 p-6 rounded-xl mb-8 shadow-lg">
                                <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                                  <span className="text-2xl">📈</span> Main Statistics
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                  <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                                    <span className="text-3xl font-extrabold text-blue-600 drop-shadow">⚔️</span>
                                    <span className="text-2xl font-bold text-blue-600">{p.stats.kills}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Kills</span>
                                  </div>
                                  <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                                    <span className="text-3xl font-extrabold text-red-600 drop-shadow">💀</span>
                                    <span className="text-2xl font-bold text-red-600">{p.stats.deaths}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Deaths</span>
                                  </div>
                                  <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                                    <span className="text-3xl font-extrabold text-green-600 drop-shadow">🤝</span>
                                    <span className="text-2xl font-bold text-green-600">{p.stats.assists}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Assists</span>
                                  </div>
                                  <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                                    <span className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow">📊</span>
                                    <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                                      {((p.stats.kills + p.stats.assists) / Math.max(1, p.stats.deaths)).toFixed(2)}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">KDA Ratio</span>
                                  </div>
                                  <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                                    <span className="text-3xl font-extrabold text-yellow-600 drop-shadow">🪙</span>
                                    <span className="text-2xl font-bold text-yellow-600">{p.stats.goldEarned}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Gold</span>
                                  </div>
                                  <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                                    <span className="text-3xl font-extrabold text-orange-500 drop-shadow">🔥</span>
                                    <span className="text-2xl font-bold text-orange-500">{p.stats.totalDamageDealtToChampions}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Dmg to Champs</span>
                                  </div>
                                  <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                                    <span className="text-3xl font-extrabold text-pink-600 drop-shadow">👁️</span>
                                    <span className="text-2xl font-bold text-pink-600">{p.stats.visionScore}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Vision</span>
                                  </div>
                                  <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                                    <span className="text-3xl font-extrabold text-teal-600 drop-shadow">🧹</span>
                                    <span className="text-2xl font-bold text-teal-600">{p.stats.totalMinionsKilled}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">CS</span>
                                  </div>
                                </div>
                              </div>
                              {/* All Statistics, Search, Categories */}
                              <div className="bg-gray-50 dark:bg-neutral-700/30 p-6 rounded-xl mb-8">
                                <h3 className="text-lg font-semibold mb-4">All Statistics</h3>
                                <div className="mb-6 flex justify-center">
                                  <input
                                    type="text"
                                    placeholder="Search statistics..."
                                    className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                    value={statSearch}
                                    onChange={e => setStatSearch(e.target.value)}
                                  />
                                </div>
                              
                                {(() => {
                                  const search = statSearch.trim().toLowerCase();
                                  const statFilter = (key: string, value: any) =>
                                    !search ||
                                    key.replace(/([A-Z])/g, ' $1').toLowerCase().includes(search) ||
                                    (value !== null && value !== undefined && value.toString().toLowerCase().includes(search));

                                  // --- Combat ---
                                  const combatStats = Object.entries({
                                    killingSprees: p.stats.killingSprees,
                                    largestKillingSpree: p.stats.largestKillingSpree,
                                    largestMultiKill: p.stats.largestMultiKill,
                                    doubleKills: p.stats.doubleKills,
                                    tripleKills: p.stats.tripleKills,
                                    quadraKills: p.stats.quadraKills,
                                    pentaKills: p.stats.pentaKills,
                                    unrealKills: p.stats.unrealKills,
                                    totalDamageDealt: p.stats.totalDamageDealt,
                                    totalDamageDealtToChampions: p.stats.totalDamageDealtToChampions,
                                    physicalDamageDealt: p.stats.physicalDamageDealt,
                                    magicDamageDealt: p.stats.magicDamageDealt,
                                    trueDamageDealt: p.stats.trueDamageDealt,
                                    physicalDamageDealtToChampions: p.stats.physicalDamageDealtToChampions,
                                    magicDamageDealtToChampions: p.stats.magicDamageDealtToChampions,
                                    trueDamageDealtToChampions: p.stats.trueDamageDealtToChampions,
                                    totalDamageTaken: p.stats.totalDamageTaken,
                                    physicalDamageTaken: p.stats.physicalDamageTaken,
                                    magicDamageTaken: p.stats.magicDamageTaken,
                                    trueDamageTaken: p.stats.trueDamageTaken,
                                    damageSelfMitigated: p.stats.damageSelfMitigated
                                  }).filter(([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value));

                                  // --- Vision & Wards ---
                                  const visionStats = Object.entries({
                                    visionScore: p.stats.visionScore,
                                    wardsPlaced: p.stats.wardsPlaced,
                                    wardsKilled: p.stats.wardsKilled,
                                    visionWardsBoughtInGame: p.stats.visionWardsBoughtInGame,
                                    detectorWardsPlaced: p.stats.detectorWardsPlaced,
                                    sightWardsBoughtInGame: p.stats.sightWardsBoughtInGame,
                                    stealthWardsPlaced: p.stats.stealthWardsPlaced
                                  }).filter(([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value));

                                  // --- Objectives ---
                                  const objectiveStats = Object.entries({
                                    baronKills: p.stats.baronKills,
                                    dragonKills: p.stats.dragonKills,
                                    inhibitorKills: p.stats.inhibitorKills,
                                    inhibitorTakedowns: p.stats.inhibitorTakedowns,
                                    inhibitorsLost: p.stats.inhibitorsLost,
                                    turretKills: p.stats.turretKills,
                                    turretTakedowns: p.stats.turretTakedowns,
                                    turretsLost: p.stats.turretsLost,
                                    nexusKills: p.stats.nexusKills,
                                    nexusTakedowns: p.stats.nexusTakedowns,
                                    nexusLost: p.stats.nexusLost
                                  }).filter(([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value));

                                  // --- Pings & Communication ---
                                  const pingsStats = Object.entries({
                                    allInPings: p.stats.allInPings,
                                    assistMePings: p.stats.assistMePings,
                                    basicPings: p.stats.basicPings,
                                    commandPings: p.stats.commandPings,
                                    dangerPings: p.stats.dangerPings,
                                    enemyMissingPings: p.stats.enemyMissingPings,
                                    enemyVisionPings: p.stats.enemyVisionPings,
                                    getBackPings: p.stats.getBackPings,
                                    holdPings: p.stats.holdPings,
                                    needVisionPings: p.stats.needVisionPings,
                                    onMyWayPings: p.stats.onMyWayPings,
                                    pushPings: p.stats.pushPings,
                                    visionClearedPings: p.stats.visionClearedPings
                                  }).filter(([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value));

                                  // --- Challenges ---
                                  const challengesStats = p.stats.challenges
                                    ? Object.entries(p.stats.challenges).filter(
                                        ([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value)
                                      )
                                    : [];

                                  // --- Player Score (Missions) ---
                                  const playerScoreStats = p.stats.missions
                                    ? Object.entries(p.stats.missions).filter(
                                        ([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value)
                                      )
                                    : [];

                                  // --- Other & Raw Data ---
                                  const otherStats = Object.entries(p.stats)
                                    .filter(([key, value]) =>
                                      ![
                                        'kills','deaths','assists','goldEarned','totalDamageDealtToChampions','visionScore','totalMinionsKilled',
                                        'killingSprees','largestKillingSpree','largestMultiKill','doubleKills','tripleKills','quadraKills','pentaKills','unrealKills',
                                        'totalDamageDealt','physicalDamageDealt','magicDamageDealt','trueDamageDealt',
                                        'physicalDamageDealtToChampions','magicDamageDealtToChampions','trueDamageDealtToChampions',
                                        'totalDamageTaken','physicalDamageTaken','magicDamageTaken','trueDamageTaken','damageSelfMitigated',
                                        'wardsPlaced','wardsKilled','visionWardsBoughtInGame','detectorWardsPlaced','sightWardsBoughtInGame','stealthWardsPlaced',
                                        'baronKills','dragonKills','inhibitorKills','inhibitorTakedowns','inhibitorsLost',
                                        'turretKills','turretTakedowns','turretsLost','nexusKills','nexusTakedowns','nexusLost',
                                        'allInPings','assistMePings','basicPings','commandPings','dangerPings','enemyMissingPings','enemyVisionPings',
                                        'getBackPings','holdPings','needVisionPings','onMyWayPings','pushPings','visionClearedPings',
                                        'challenges','missions','puuid','summonerId','riotIdGameName','riotIdTagline'
                                      ].includes(key)
                                      && value !== 0 && value !== '' && value !== null && value !== undefined
                                      && statFilter(key, value)
                                    );

                                  // --- Empty/0 Stats ---
                                  const emptyStats = Object.entries(p.stats)
                                    .filter(([key, value]) =>
                                      (value === 0 || value === '' || value === null || value === undefined)
                                      && !['puuid','summonerId','riotIdGameName','riotIdTagline'].includes(key)
                                      && statFilter(key, value)
                                    );

                                  return (
                                    <>
                                      {/* Combat */}
                                      <details open={allOpen} className="mb-2" style={{ display: combatStats.length ? undefined : 'none' }}>
                                        <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300 text-base py-2 px-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                                          Combat
                                        </summary>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                                          {combatStats.map(([key, value]) => (
                                            <div key={key} className="flex flex-col bg-white/70 dark:bg-neutral-800/70 rounded-lg p-3 shadow-inner">
                                              <span className="font-semibold text-gray-700 dark:text-gray-200">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.charAt(0).toUpperCase() + str.slice(1))}
                                              </span>
                                              <span className="text-indigo-700 dark:text-indigo-300 text-lg font-mono">{value}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </details>
                                      {/* Vision & Wards */}
                                      <details open={allOpen} className="mb-2" style={{ display: visionStats.length ? undefined : 'none' }}>
                                        <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300 text-base py-2 px-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                                          Vision & Wards
                                        </summary>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                                          {visionStats.map(([key, value]) => (
                                            <div key={key} className="flex flex-col bg-white/70 dark:bg-neutral-800/70 rounded-lg p-3 shadow-inner">
                                              <span className="font-semibold text-gray-700 dark:text-gray-200">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.charAt(0).toUpperCase() + str.slice(1))}
                                              </span>
                                              <span className="text-indigo-700 dark:text-indigo-300 text-lg font-mono">{value}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </details>
                                      {/* Objectives */}
                                      <details open={allOpen} className="mb-2" style={{ display: objectiveStats.length ? undefined : 'none' }}>
                                        <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300 text-base py-2 px-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                                          Objectives
                                        </summary>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                                          {objectiveStats.map(([key, value]) => (
                                            <div key={key} className="flex flex-col bg-white/70 dark:bg-neutral-800/70 rounded-lg p-3 shadow-inner">
                                              <span className="font-semibold text-gray-700 dark:text-gray-200">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.charAt(0).toUpperCase() + str.slice(1))}
                                              </span>
                                              <span className="text-indigo-700 dark:text-indigo-300 text-lg font-mono">{value}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </details>
                                      {/* Pings & Communication */}
                                      {pingsStats.length > 0 && (
                                        <details open={allOpen} className="mb-2">
                                          <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300 text-base py-2 px-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                                            Pings & Communication
                                          </summary>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                                            {pingsStats.map(([key, value]) => (
                                              <div key={key} className="flex flex-col bg-white/70 dark:bg-neutral-800/70 rounded-lg p-3 shadow-inner">
                                                <span className="font-semibold text-gray-700 dark:text-gray-200">
                                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.charAt(0).toUpperCase() + str.slice(1))}
                                                </span>
                                                <span className="text-indigo-700 dark:text-indigo-300 text-lg font-mono">{value}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </details>
                                      )}
                                      {/* Challenges */}
                                      {challengesStats.length > 0 && (
                                        <details open={allOpen} className="mb-2">
                                          <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300 text-base py-2 px-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                                            Challenges
                                          </summary>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                                            {challengesStats.map(([key, value]) => (
                                              <div key={key} className="flex flex-col bg-white/80 dark:bg-neutral-800/80 rounded-lg p-3 shadow-inner">
                                                <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.charAt(0).toUpperCase() + str.slice(1))}
                                                </span>
                                                <span className="text-indigo-900 dark:text-indigo-100 text-lg font-mono">{value}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </details>
                                      )}
                                      {/* Player Score (Missions) */}
                                      {playerScoreStats.length > 0 && (
                                        <details open={allOpen} className="mb-2">
                                          <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300 text-base py-2 px-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                                            Player Score
                                          </summary>
                                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                                            {playerScoreStats.map(([key, value]) => (
                                              <div key={key} className="flex flex-col bg-white/80 dark:bg-neutral-800/80 rounded-lg p-3 shadow-inner">
                                                <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.charAt(0).toUpperCase() + str.slice(1))}
                                                </span>
                                                <span className="text-indigo-900 dark:text-indigo-100 text-lg font-mono">{value}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </details>
                                      )}
                                      {/* Perks & Runes */}
                                      {p.stats.perks && (
                                        <details open={allOpen} className="mb-2">
                                          <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300 text-base py-2 px-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                                            Perks & Runes
                                          </summary>
                                          <div className="flex flex-col gap-4 py-2">
                                            {/* Stat Perks */}
                                            <div className="flex flex-col bg-white/80 dark:bg-neutral-800/80 rounded-lg p-3 shadow-inner">
                                              <span className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Stat Perks</span>
                                              <div className="flex gap-3">
                                                {Object.entries(p.stats.perks.statPerks).map(([k, v]) => (
                                                  <span key={k} className="text-indigo-700 dark:text-indigo-300 text-sm font-mono bg-indigo-100/60 dark:bg-indigo-900/40 px-2 py-1 rounded">
                                                    {k}: {v}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                            {/* Styles */}
                                            <div className="flex flex-wrap gap-4">
                                              {p.stats.perks.styles && p.stats.perks.styles.map((style, i) => (
                                                <div key={i} className="flex-1 min-w-[180px] bg-white/80 dark:bg-neutral-800/80 rounded-lg p-3 shadow-inner">
                                                  <span className="font-semibold text-gray-700 dark:text-gray-200 mb-1 block">{style.description}</span>
                                                  <div className="flex flex-col gap-1">
                                                    {style.selections.map((sel, j) => (
                                                      <span key={j} className="text-indigo-700 dark:text-indigo-300 text-xs font-mono">
                                                        Perk: {sel.perk} <span className="text-gray-400">({sel.var1}/{sel.var2}/{sel.var3})</span>
                                                      </span>
                                                    ))}
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </details>
                                      )}
                                      {/* Other & Raw Data */}
                                      <details open={allOpen} style={{ display: otherStats.length ? undefined : 'none' }}>
                                        <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300 text-base py-2 px-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition">
                                          Other & Raw Data
                                        </summary>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                                          {otherStats.map(([key, value]) => {
                                            const prettyKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.charAt(0).toUpperCase() + str.slice(1));
                                            if (typeof value === 'object' && value !== null) {
                                              return (
                                                <details key={key} className="bg-white/70 dark:bg-neutral-800/70 rounded-lg p-3 shadow-inner">
                                                  <summary className="cursor-pointer font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                                                    {prettyKey}
                                                  </summary>
                                                  <div className="text-xs text-gray-700 dark:text-gray-200 whitespace-pre-wrap break-all">
                                                    {JSON.stringify(value, null, 2)}
                                                  </div>
                                                </details>
                                              );
                                            }
                                            return (
                                              <div key={key} className="flex flex-col bg-white/70 dark:bg-neutral-800/70 rounded-lg p-3 shadow-inner">
                                                <span className="font-semibold text-gray-700 dark:text-gray-200">{prettyKey}</span>
                                                <span className="text-indigo-700 dark:text-indigo-300 text-lg font-mono">{value?.toString()}</span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </details>
                                      {/* Empty/0 Stats */}
                                      <details open={allOpen} style={{ display: emptyStats.length ? undefined : 'none' }}>
                                        <summary className="cursor-pointer font-semibold text-gray-500 dark:text-gray-400 text-base py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800/30 transition">
                                          Empty / 0 Stats
                                        </summary>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                                          {emptyStats.map(([key]) => (
                                            <div key={key} className="flex flex-col bg-white/40 dark:bg-neutral-800/40 rounded-lg p-3 shadow-inner">
                                              <span className="font-semibold text-gray-400 dark:text-gray-500">
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.charAt(0).toUpperCase() + str.slice(1))}
                                              </span>
                                              <span className="text-gray-400 dark:text-gray-500 text-lg font-mono">Empty</span>
                                            </div>
                                          ))}
                                        </div>
                                      </details>
                                    </>
                                  );
                                })()}
                              </div>
                              {/* Items Section */}
                              <div className="text-center">
                                <h3 className="text-lg font-semibold mb-4">Items Built</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                  {[p.stats.item0, p.stats.item1, p.stats.item2,
                                    p.stats.item3, p.stats.item4, p.stats.item5,
                                    p.stats.item6]
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
                                  onClick={() => router.get('/profile-search', { puuid: p.puuid, region })}
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
                                >
                                  View Full Profile →
                                </button>
                              </div>
                            </section>
                            {/* --- END: ALL PROFILE/STATISTICS/SEARCH/ITEMS --- */}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="w-full lg:w-[420px] mt-8 lg:mt-0 pt-44">
          <div className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 rounded-2xl shadow-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">Team Comparison</h2>
            <div className="grid grid-cols-3 gap-4 items-center text-center">
              {/* Team 1 */}
              <div>
                <div className="text-lg font-bold text-blue-300 mb-2">Team 1</div>
                <div className="text-3xl font-extrabold text-green-400 mb-1">
                  {teams[0].some(p => p.stats.win) ? "Victory" : "Defeat"}
                </div>
              </div>
              {/* Stat Labels */}
              <div className="flex flex-col gap-3 text-base font-semibold text-gray-200">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {/* Team 2 */}
              <div>
                <div className="text-lg font-bold text-purple-300 mb-2">Team 2</div>
                <div className="text-3xl font-extrabold text-green-400 mb-1">
                  {teams[1].some(p => p.stats.win) ? "Victory" : "Defeat"}
                </div>
              </div>
            </div>
            {/* Stat Values */}
            <div className="grid grid-cols-3 gap-4 items-center text-center mt-2 text-xl font-mono">
              {/* Team 1 values */}
              <div className="flex flex-col gap-3 text-blue-200">
                <span>{teams[0].reduce((a, p) => a + (p.stats?.kills ?? 0), 0)}</span>
                <span>{teams[0].reduce((a, p) => a + (p.stats?.deaths ?? 0), 0)}</span>
                <span>{teams[0].reduce((a, p) => a + (p.stats?.assists ?? 0), 0)}</span>
                <span>{teams[0].reduce((a, p) => a + (p.stats?.goldEarned ?? 0), 0).toLocaleString()}</span>
                <span>{teams[0].reduce((a, p) => a + (p.stats?.totalDamageDealtToChampions ?? 0), 0).toLocaleString()}</span>
                <span>{teams[0].reduce((a, p) => a + (p.stats?.totalMinionsKilled ?? 0), 0)}</span>
              </div>
              {/* Spacer */}
              <div className="flex flex-col gap-3 text-gray-400 font-bold">
                <span>Kills</span>
                <span>Deaths</span>
                <span>Assists</span>
                <span>Gold</span>
                <span>Damage</span>
                <span>CS</span>
              </div>
              {/* Team 2 values */}
              <div className="flex flex-col gap-3 text-purple-200">
                <span>{teams[1].reduce((a, p) => a + (p.stats?.kills ?? 0), 0)}</span>
                <span>{teams[1].reduce((a, p) => a + (p.stats?.deaths ?? 0), 0)}</span>
                <span>{teams[1].reduce((a, p) => a + (p.stats?.assists ?? 0), 0)}</span>
                <span>{teams[1].reduce((a, p) => a + (p.stats?.goldEarned ?? 0), 0).toLocaleString()}</span>
                <span>{teams[1].reduce((a, p) => a + (p.stats?.totalDamageDealtToChampions ?? 0), 0).toLocaleString()}</span>
                <span>{teams[1].reduce((a, p) => a + (p.stats?.totalMinionsKilled ?? 0), 0)}</span>
              </div>
            </div>
            {/* Bar Comparison */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-center">Total Damage to Champions</h3>
              <div className="flex items-center gap-2">
                {(() => {
                  const t1 = teams[0].reduce((a, p) => a + (p.stats?.totalDamageDealtToChampions ?? 0), 0);
                  const t2 = teams[1].reduce((a, p) => a + (p.stats?.totalDamageDealtToChampions ?? 0), 0);
                  const max = Math.max(t1, t2, 1);
                  return (
                    <>
                      <div className="flex-1 h-4 bg-blue-700 rounded-full relative overflow-hidden">
                        <div
                          className="h-4 bg-gradient-to-r from-orange-400 to-red-600 rounded-full"
                          style={{ width: `${(100 * t1) / max}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-orange-200 px-2">{t1.toLocaleString()}</span>
                      <span className="text-xs font-bold text-orange-200 px-2">{t2.toLocaleString()}</span>
                      <div className="flex-1 h-4 bg-purple-700 rounded-full relative overflow-hidden">
                        <div
                          className="h-4 bg-gradient-to-l from-orange-400 to-red-600 rounded-full"
                          style={{ width: `${(100 * t2) / max}%` }}
                        />
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}