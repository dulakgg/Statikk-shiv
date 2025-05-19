import React, { useState, useEffect, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = players[selectedIndex];
  const [statSearch, setStatSearch] = useState('');
  const [allOpen, setAllOpen] = useState(false);
  const [compareIndex, setCompareIndex] = useState<number | null>(null);

  // Only show the top banner if both gameName and profileicon are present
  const showBanner = selected?.gameName && profileicon;

  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white">
      <NavBar />
      <main className="flex-grow flex flex-col items-center container mx-auto px-4 sm:px-6 py-8">
        {/* Static Profile Header */}
        {showBanner && (
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
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
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
                <span className="block font-bold">{p.summonerName}</span>
                <span className="block text-xs text-indigo-300">{p.gameName}#{p.tagLine}</span>
              </button>
            ))}
          </div>
        </nav>
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
              <div className="flex gap-6 justify-center md:justify-start">
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
            <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/40 dark:to-purple-900/40 p-6 rounded-xl mb-8 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                <span className="text-2xl">📈</span> Main Statistics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                  <span className="text-3xl font-extrabold text-blue-600 drop-shadow">⚔️</span>
                  <span className="text-2xl font-bold text-blue-600">{selected.stats.kills}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Kills</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                  <span className="text-3xl font-extrabold text-red-600 drop-shadow">💀</span>
                  <span className="text-2xl font-bold text-red-600">{selected.stats.deaths}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Deaths</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                  <span className="text-3xl font-extrabold text-green-600 drop-shadow">🤝</span>
                  <span className="text-2xl font-bold text-green-600">{selected.stats.assists}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Assists</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                  <span className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 drop-shadow">📊</span>
                  <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                    {((selected.stats.kills + selected.stats.assists) / Math.max(1, selected.stats.deaths)).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">KDA Ratio</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                  <span className="text-3xl font-extrabold text-yellow-600 drop-shadow">🪙</span>
                  <span className="text-2xl font-bold text-yellow-600">{selected.stats.goldEarned}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Gold</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                  <span className="text-3xl font-extrabold text-orange-500 drop-shadow">🔥</span>
                  <span className="text-2xl font-bold text-orange-500">{selected.stats.totalDamageDealtToChampions}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Dmg to Champs</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                  <span className="text-3xl font-extrabold text-pink-600 drop-shadow">👁️</span>
                  <span className="text-2xl font-bold text-pink-600">{selected.stats.visionScore}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">Vision</span>
                </div>
                <div className="flex flex-col items-center bg-white/80 dark:bg-neutral-800/80 rounded-xl p-4 shadow group hover:scale-105 transition-transform">
                  <span className="text-3xl font-extrabold text-teal-600 drop-shadow">🧹</span>
                  <span className="text-2xl font-bold text-teal-600">{selected.stats.totalMinionsKilled}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-300 group-hover:underline">CS</span>
                </div>
              </div>
            </div>
          {/* Grouped & Collapsible All Statistics with Search */}
          <div className="bg-gray-50 dark:bg-neutral-700/30 p-6 rounded-xl mb-8">
            <h3 className="text-lg font-semibold mb-4">All Statistics</h3>
            {/* Search Bar */}
            <div className="mb-6 flex justify-center">
              <input
                type="text"
                placeholder="Search statistics..."
                className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                value={statSearch}
                onChange={e => setStatSearch(e.target.value)}
              />
            </div>
            {/* Helper for filtering */}
            {(() => {
              const search = statSearch.trim().toLowerCase();
              const statFilter = (key: string, value: any) =>
                !search ||
                key.replace(/([A-Z])/g, ' $1').toLowerCase().includes(search) ||
                (value !== null && value !== undefined && value.toString().toLowerCase().includes(search));

              // --- Combat ---
              const combatStats = Object.entries({
                killingSprees: selected.stats.killingSprees,
                largestKillingSpree: selected.stats.largestKillingSpree,
                largestMultiKill: selected.stats.largestMultiKill,
                doubleKills: selected.stats.doubleKills,
                tripleKills: selected.stats.tripleKills,
                quadraKills: selected.stats.quadraKills,
                pentaKills: selected.stats.pentaKills,
                unrealKills: selected.stats.unrealKills,
                totalDamageDealt: selected.stats.totalDamageDealt,
                totalDamageDealtToChampions: selected.stats.totalDamageDealtToChampions,
                physicalDamageDealt: selected.stats.physicalDamageDealt,
                magicDamageDealt: selected.stats.magicDamageDealt,
                trueDamageDealt: selected.stats.trueDamageDealt,
                physicalDamageDealtToChampions: selected.stats.physicalDamageDealtToChampions,
                magicDamageDealtToChampions: selected.stats.magicDamageDealtToChampions,
                trueDamageDealtToChampions: selected.stats.trueDamageDealtToChampions,
                totalDamageTaken: selected.stats.totalDamageTaken,
                physicalDamageTaken: selected.stats.physicalDamageTaken,
                magicDamageTaken: selected.stats.magicDamageTaken,
                trueDamageTaken: selected.stats.trueDamageTaken,
                damageSelfMitigated: selected.stats.damageSelfMitigated
              }).filter(([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value));

              // --- Vision & Wards ---
              const visionStats = Object.entries({
                visionScore: selected.stats.visionScore,
                wardsPlaced: selected.stats.wardsPlaced,
                wardsKilled: selected.stats.wardsKilled,
                visionWardsBoughtInGame: selected.stats.visionWardsBoughtInGame,
                detectorWardsPlaced: selected.stats.detectorWardsPlaced,
                sightWardsBoughtInGame: selected.stats.sightWardsBoughtInGame,
                stealthWardsPlaced: selected.stats.stealthWardsPlaced
              }).filter(([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value));

              // --- Objectives ---
              const objectiveStats = Object.entries({
                baronKills: selected.stats.baronKills,
                dragonKills: selected.stats.dragonKills,
                inhibitorKills: selected.stats.inhibitorKills,
                inhibitorTakedowns: selected.stats.inhibitorTakedowns,
                inhibitorsLost: selected.stats.inhibitorsLost,
                turretKills: selected.stats.turretKills,
                turretTakedowns: selected.stats.turretTakedowns,
                turretsLost: selected.stats.turretsLost,
                nexusKills: selected.stats.nexusKills,
                nexusTakedowns: selected.stats.nexusTakedowns,
                nexusLost: selected.stats.nexusLost
              }).filter(([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value));

              // --- Pings & Communication ---
              const pingsStats = Object.entries({
                allInPings: selected.stats.allInPings,
                assistMePings: selected.stats.assistMePings,
                basicPings: selected.stats.basicPings,
                commandPings: selected.stats.commandPings,
                dangerPings: selected.stats.dangerPings,
                enemyMissingPings: selected.stats.enemyMissingPings,
                enemyVisionPings: selected.stats.enemyVisionPings,
                getBackPings: selected.stats.getBackPings,
                holdPings: selected.stats.holdPings,
                needVisionPings: selected.stats.needVisionPings,
                onMyWayPings: selected.stats.onMyWayPings,
                pushPings: selected.stats.pushPings,
                visionClearedPings: selected.stats.visionClearedPings
              }).filter(([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value));

              // --- Challenges ---
              const challengesStats = selected.stats.challenges
                ? Object.entries(selected.stats.challenges).filter(
                    ([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value)
                  )
                : [];

              // --- Player Score (Missions) ---
              const playerScoreStats = selected.stats.missions
                ? Object.entries(selected.stats.missions).filter(
                    ([key, value]) => value !== 0 && value !== null && value !== undefined && statFilter(key, value)
                  )
                : [];

              // --- Other & Raw Data ---
              const otherStats = Object.entries(selected.stats)
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
              const emptyStats = Object.entries(selected.stats)
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
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </span>
                            <span className="text-indigo-900 dark:text-indigo-100 text-lg font-mono">{value}</span>
                          </div>
                        ))}
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
                        const prettyKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
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
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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