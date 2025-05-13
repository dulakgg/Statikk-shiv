import React, { useState, useMemo } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
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
  tagline: string;
  summoner: SummonerData;
}

export default function Profile({ data, puuid, summoner, nickname, tagline }: ProfilePageProps) {
  const [modalMatch, setModalMatch] = useState<MatchDetail | null>(null);
  const ddragonVersion = '15.9.1';
  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${summoner.profileIconId}.png`;

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="container mx-auto pt-16 px-6 pb-12">
        {/* Profile Banner */}
        <section className="relative rounded-2xl overflow-hidden shadow-lg mb-6">
          <div className="h-35 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
          <div className="absolute top-8 left-6 flex items-center space-x-4">
            <img src={iconUrl} alt={`${nickname} profile icon`} className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900" />
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                {nickname} <span className="text-sm font-medium text-gray-500">#{tagline}</span>
              </h1>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Level {summoner.summonerLevel}</p>
              <div className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-1"><Trophy className="w-5 h-5 text-yellow-500" /><span className="text-sm font-semibold">{stats.wins}</span></div>
                <div className="flex items-center space-x-1"><XCircle className="w-5 h-5 text-red-500" /><span className="text-sm font-semibold">{stats.losses}</span></div>
                <div className="flex items-center space-x-1"><Zap className="w-5 h-5 text-indigo-500" /><span className="text-sm font-semibold">{stats.avgKDA}</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Matches */}
        <section className="mt-4">
          <h2 className="text-2xl font-semibold mb-4">Recent Matches</h2>
          <div className="space-y-6">
            {data.map(match => {
              const player = match.info.participants.find(p => p.puuid === puuid);
              if (!player) return null;
              const resultIcon = player.win ? <Trophy className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />;

              const itemIds = [
                player.item0,
                player.item1,
                player.item2,
                player.item3,
                player.item4,
                player.item5,
                player.item6,
              ].filter(id => id && id !== 0);

              return (
                <div
                  key={match.metadata.matchId}
                  onClick={() => setModalMatch(match)}
                  className="group bg-white dark:bg-background rounded-xl shadow border cursor-pointer hover:ring-2 hover:ring-indigo-400"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left: Result */}
                    <div className="md:w-1/4 p-4 flex flex-col items-center justify-center bg-gray-100 dark:bg-background">
                      {resultIcon}
                      <p className="mt-1 font-semibold">{player.win ? 'Victory' : 'Defeat'}</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{formatDate(player.gameEndTimestamp)}</p>
                      <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{Math.floor(match.info.gameDuration / 60)}m {match.info.gameDuration % 60}s</p>
                    </div>

                    {/* Center: Champion + Stats */}
                    <div className="flex-1 p-4 flex flex-col justify-center space-y-4">
                      <div className="flex items-center space-x-4">
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${player.championName}.png`} alt={player.championName} className="w-12 h-12 rounded-md" />
                        <div>
                          <p className="font-semibold text-lg">{player.championName}</p>
                          <p className="text-sm text-gray-500 uppercase">{player.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1"><Zap className="w-5 h-5" /><span>{player.kills}</span></div>
                        <div className="flex items-center space-x-1"><Skull className="w-5 h-5" /><span>{player.deaths}</span></div>
                        <div className="flex items-center space-x-1"><Heart className="w-5 h-5" /><span>{player.assists}</span></div>
                      </div>
                    </div>

                    {/* Right: Items & Augments */}
                    <div className="md:w-1/4 p-4 border-l border-gray-200 dark:border-gray-700 flex flex-col justify-center space-y-2">
                      {itemIds.length > 0 && (
                        <div className="flex flex-wrap justify-end space-x-1 mb-2">
                          {itemIds.map(itemId => (
                            <img
                              key={itemId}
                              src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${itemId}.png`}
                              alt={`item-${itemId}`}
                              className="w-6 h-6"
                            />
                          ))}
                        </div>
                      )}
                      {player.augments?.length && (
                        <div className="flex flex-wrap justify-end space-x-2">
                          {player.augments.map((aug, idx) => (
                            <span key={idx} className="text-xs font-medium">{aug}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Participants Modal */}
        {modalMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-background rounded-2xl p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
              <button onClick={() => setModalMatch(null)} className="absolute top-4 right-4">
                <X className="w-6 h-6 text-gray-600" />
              </button>
              <h3 className="text-xl font-semibold mb-4">Participants</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {modalMatch.info.participants.map(p => (
                  <div key={p.puuid} className="flex flex-col items-center">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${p.championName}.png`} alt={p.championName} className="w-8 h-8 rounded" />
                    <span className="text-xs mt-1 truncate w-full text-center" title={p.summonerName}>{p.summonerName}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{p.kills}/{p.deaths}/{p.assists}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
