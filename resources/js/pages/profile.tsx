import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Trophy, XCircle, Zap, Skull, Heart, ChevronDown, ChevronUp } from 'lucide-react';

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
}

interface MatchDetail {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    gameDuration: number;
    participants: Participant[];
  };
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
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const ddragonVersion = '13.9.1';
  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${summoner.profileIconId}.png`;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? 'Unknown Date'
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const toggleParticipants = (matchId: string) => {
    setExpandedMatchId(expandedMatchId === matchId ? null : matchId);
  };

  return (
    <div className="dark:text-white min-h-screen bg-background text-black">
      <Navbar />

      <main className="max-w-5xl mx-auto pt-20 px-8 space-y-10">
        {/* Profile Card */}
        <section className="flex items-center bg-card rounded-2xl shadow-lg p-8 space-x-8">
          <img
            src={iconUrl}
            alt={`${nickname} profile icon`}
            className="w-28 h-28 rounded-full border-4 border-primary"
          />
          <div>
            <h1 className="text-5xl font-bold">{nickname}#{tagline}</h1>
            <p className="text-xl mt-2">Level: <span className="font-semibold">{summoner.summonerLevel}</span></p>
            <p className="text-base text-muted mt-3">Account ID: {summoner.accountId}</p>
            <p className="text-base text-muted">Last Updated: {formatDate(summoner.revisionDate)}</p>
          </div>
        </section>

        {/* Recent Matches */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Recent Matches</h2>
          {data.length === 0 ? (
            <p className="text-lg">No matches found.</p>
          ) : (
            <ul className="space-y-10">
              {data.map((match) => {
                const player = match.info.participants.find((p) => p.puuid === puuid);
                if (!player) {
                  return (
                    <li key={match.metadata.matchId} className="p-6 bg-yellow-100 text-yellow-900 rounded-2xl shadow-md">
                      Could not find player data for match {match.metadata.matchId}.
                    </li>
                  );
                }

                const resultClass = player.win ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
                const ResultIcon = player.win ? Trophy : XCircle;
                const resultText = player.win ? 'Victory' : 'Defeat';
                const champIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${player.championName}.png`;

                return (
                  <li key={match.metadata.matchId} className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105">
                    {/* Header: Result + Date + Duration */}
                    <div className="flex flex-col md:flex-row">
                      <div className={`w-full md:w-1/4 p-6 flex flex-col items-center justify-center ${resultClass}`}>
                        <ResultIcon className="w-8 h-8 mb-1" />
                        <p className="font-bold text-2xl">{resultText}</p>
                        <p className="text-base mt-1">{formatDate(player.gameEndTimestamp)}</p>
                        <p className="text-sm mt-2">Duration: {Math.floor(match.info.gameDuration / 60)}m {match.info.gameDuration % 60}s</p>
                      </div>

                      {/* Player KDA & Champion */}
                      <div className="flex-1 p-6 space-y-4">
                        <div className="flex items-center space-x-6">
                          <img src={champIconUrl} alt={player.championName} className="w-16 h-16 rounded" />
                          <div>
                            <p className="font-semibold text-2xl">{player.championName}</p>
                            <p className="text-base text-muted uppercase mt-1">{player.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-8">
                          <div className="flex items-center space-x-1"><Zap className="w-5 h-5" /> <span>{player.kills}</span></div>
                          <div className="flex items-center space-x-1"><Skull className="w-5 h-5" /> <span>{player.deaths}</span></div>
                          <div className="flex items-center space-x-1"><Heart className="w-5 h-5" /> <span>{player.assists}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Participants List (Toggle) */}
                    <div className="p-6 border-t border-divider">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleParticipants(match.metadata.matchId)}>
                        <h3 className="text-2xl font-semibold">Participants</h3>
                        {expandedMatchId === match.metadata.matchId ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </div>
                      {expandedMatchId === match.metadata.matchId && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-6">
                          {match.info.participants.map((p) => {
                            const icon = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${p.championName}.png`;
                            return (
                              <div key={p.puuid} className="flex flex-col items-center bg-muted rounded-lg p-3">
                                <img src={icon} alt={p.championName} className="w-10 h-10 rounded mb-2" />
                                <p className="text-sm font-medium truncate" title={p.summonerName}>{p.summonerName}</p>
                                <p className="text-xs mt-1">{p.kills}/{p.deaths}/{p.assists}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>

      <footer className="max-w-5xl mx-auto px-8 mt-16">
        <Footer />
      </footer>
    </div>
  );
}
