/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Shield,
  ShieldCheck,
  Gamepad2,
  Trophy,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Bookmark,
  Award,
  Sparkles,
  GraduationCap,
  Trash2,
  Plus,
} from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    tournaments,
    toggleSaveTournament,
    tutorials,
    setActiveTab,
  } = useApp();

  const [nickname, setNickname] = useState(userProfile.nickname);
  const [gamerTag, setGamerTag] = useState(userProfile.gamerTag);
  const [role, setRole] = useState(userProfile.role);
  const [hideContactInfo, setHideContactInfo] = useState(userProfile.hideContactInfo);
  const [isMinor, setIsMinor] = useState(userProfile.isMinor);
  const [newTeam, setNewTeam] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableGames = ['Free Fire MAX', 'BGMI', 'Valorant', 'CS2', 'Rocket League', 'EA FC'];
  const availableSports = ['Cricket', 'Football', 'Basketball', 'Badminton', 'Volleyball', 'Athletics', 'Tennis'];

  const savedTournaments = tournaments.filter((t) =>
    userProfile.savedTournamentIds.includes(t.id)
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      nickname,
      gamerTag,
      role,
      hideContactInfo,
      isMinor,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const toggleFavoriteGame = (game: string) => {
    const exists = userProfile.favoriteGames.includes(game);
    const updated = exists
      ? userProfile.favoriteGames.filter((g) => g !== game)
      : [...userProfile.favoriteGames, game];
    updateUserProfile({ favoriteGames: updated });
  };

  const toggleFavoriteSport = (sport: string) => {
    const exists = userProfile.favoriteSports.includes(sport);
    const updated = exists
      ? userProfile.favoriteSports.filter((s) => s !== sport)
      : [...userProfile.favoriteSports, sport];
    updateUserProfile({ favoriteSports: updated });
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeam.trim()) return;
    if (!userProfile.favoriteTeams.includes(newTeam.trim())) {
      updateUserProfile({ favoriteTeams: [...userProfile.favoriteTeams, newTeam.trim()] });
    }
    setNewTeam('');
  };

  const handleRemoveTeam = (teamName: string) => {
    updateUserProfile({
      favoriteTeams: userProfile.favoriteTeams.filter((t) => t !== teamName),
    });
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12131f] via-[#101018] to-[#0d0d14] border border-[#27293d] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.nickname}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-xl shadow-amber-500/20"
              />
              <span className="absolute -bottom-2 -right-2 bg-amber-500 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                {userProfile.role}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-white font-heading">{userProfile.nickname}</h1>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {userProfile.gamerTag}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Arena Hub Competitive Athlete Profile • Member since Oct 2026
              </p>
              {isMinor && (
                <div className="inline-flex items-center space-x-1.5 text-[11px] text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Youth Athlete Protection Active (Contact Hidden)</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-[#1f2133]">
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Learning Progress</p>
              <p className="text-xl font-black text-amber-400 font-heading">
                {userProfile.completedTutorialExerciseIds.length} Drills Done
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
              {userProfile.completedTutorialIds.length} Modules Certified
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile Settings & Privacy */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSaveProfile} className="bg-[#10111c] border border-[#222436] rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2032]">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center space-x-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>Player Identity & Privacy Settings</span>
              </h3>
              {savedSuccess && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">User Nickname</label>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Gamer Tag / Riot / Krafton ID</label>
                <input
                  type="text"
                  required
                  value={gamerTag}
                  onChange={(e) => setGamerTag(e.target.value)}
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Role in Ecosystem</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Gamer">Competitive Gamer (Esports)</option>
                  <option value="Athlete">Traditional Sports Athlete</option>
                  <option value="Coach">Coach / Academy Trainer</option>
                  <option value="Tournament Organizer">Tournament Organizer</option>
                  <option value="Spectator">Fan / Spectator</option>
                </select>
              </div>
            </div>

            {/* Privacy Safeguards - CRITICAL FOR MINORS */}
            <div className="pt-4 border-t border-[#1e2032] space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Privacy & Minor Protection Guard</span>
              </h4>

              <div className="bg-[#0b0c14] border border-[#1e2030] rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-zinc-200">Youth / Minor Player Account</p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Enforces privacy compliance: minors under 18 will never have personal phone numbers, physical addresses, or school names published in public brackets.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isMinor}
                    onChange={(e) => setIsMinor(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-[#161726] border-[#2b2e46] mt-1 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-between gap-4 pt-3 border-t border-[#171928]">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-zinc-200">Hide Personal Contact Information</p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Masks email and mobile numbers from public spectator leaderboards and team searches.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={hideContactInfo}
                    onChange={(e) => setHideContactInfo(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-[#161726] border-[#2b2e46] mt-1 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              Update Profile Information
            </button>
          </form>

          {/* Favorite Games & Sports Selection */}
          <div className="bg-[#10111c] border border-[#222436] rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center space-x-2">
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              <span>Favorite Games & Sports</span>
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-zinc-300 mb-2">Esports Titles</p>
                <div className="flex flex-wrap gap-2">
                  {availableGames.map((game) => {
                    const isSelected = userProfile.favoriteGames.includes(game);
                    return (
                      <button
                        key={game}
                        type="button"
                        onClick={() => toggleFavoriteGame(game)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-black font-bold shadow-md'
                            : 'bg-[#151624] text-zinc-400 hover:bg-[#1d1f30] border border-[#282a40]'
                        }`}
                      >
                        {isSelected ? `✓ ${game}` : `+ ${game}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-zinc-300 mb-2">Traditional Sports</p>
                <div className="flex flex-wrap gap-2">
                  {availableSports.map((sport) => {
                    const isSelected = userProfile.favoriteSports.includes(sport);
                    return (
                      <button
                        key={sport}
                        type="button"
                        onClick={() => toggleFavoriteSport(sport)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-black font-bold shadow-md'
                            : 'bg-[#151624] text-zinc-400 hover:bg-[#1d1f30] border border-[#282a40]'
                        }`}
                      >
                        {isSelected ? `✓ ${sport}` : `+ ${sport}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Favorite Teams */}
            <div className="pt-4 border-t border-[#1e2032] space-y-3">
              <p className="text-xs font-semibold text-zinc-300">Favorite Teams & Franchises</p>
              <form onSubmit={handleAddTeam} className="flex gap-2">
                <input
                  type="text"
                  value={newTeam}
                  onChange={(e) => setNewTeam(e.target.value)}
                  placeholder="e.g. Sentinels, Team Soul, CSK, Real Madrid..."
                  className="flex-1 bg-[#151624] border border-[#2b2e46] rounded-xl px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-black text-xs font-bold uppercase cursor-pointer"
                >
                  Add Team
                </button>
              </form>

              <div className="flex flex-wrap gap-2 pt-1">
                {userProfile.favoriteTeams.map((team) => (
                  <span
                    key={team}
                    className="inline-flex items-center space-x-1.5 bg-[#171929] border border-[#272940] text-amber-300 text-xs px-2.5 py-1 rounded-lg"
                  >
                    <span>{team}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTeam(team)}
                      className="text-zinc-500 hover:text-rose-400 ml-1"
                      aria-label="Remove team"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Saved Competitions & Achievements */}
        <div className="lg:col-span-5 space-y-6">
          {/* Saved Competitions List */}
          <div className="bg-[#10111c] border border-[#222436] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2032]">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-amber-400" />
                <span>Saved Competitions ({savedTournaments.length})</span>
              </h3>
              <button
                onClick={() => setActiveTab('calendar')}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                Find More
              </button>
            </div>

            <div className="space-y-3">
              {savedTournaments.length === 0 ? (
                <p className="text-xs text-zinc-400 italic py-4 text-center">
                  No saved competitions yet. Bookmark tournaments in the Esports or Sports sections to track them here.
                </p>
              ) : (
                savedTournaments.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-xl bg-[#0d0e17] border border-[#1e2030] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded font-bold">
                          {t.gameOrSport}
                        </span>
                        <span className="text-[11px] text-zinc-400">{t.date}</span>
                      </div>
                      <h4 className="font-bold text-white truncate max-w-[200px]">{t.title}</h4>
                      <p className="text-[10px] text-emerald-400 font-semibold">{t.prizePool}</p>
                    </div>

                    <button
                      onClick={() => toggleSaveTournament(t.id)}
                      className="p-2 rounded-lg bg-[#161726] hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-[#282a40] transition-colors cursor-pointer"
                      title="Remove from saved"
                      aria-label="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Badges & Mastery */}
          <div className="bg-[#10111c] border border-[#222436] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Earned Arena Badges</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#0d0e17] border border-[#1e2030] text-center space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-zinc-200">Fair Play Certified</p>
                <p className="text-[10px] text-zinc-500">Agreed to governing rules</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0d0e17] border border-[#1e2030] text-center space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-zinc-200">Academy Cadet</p>
                <p className="text-[10px] text-zinc-500">Completed training drills</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
