/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Tournament } from '../data/mockData';
import {
  Gamepad2,
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  ShieldCheck,
  Info,
  Filter,
  Flame,
  Flag,
  CheckCircle2,
} from 'lucide-react';

export const EsportsSection: React.FC = () => {
  const {
    tournaments,
    userProfile,
    toggleSaveTournament,
    addReport,
  } = useApp();

  const [selectedGameFilter, setSelectedGameFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [selectedModalTournament, setSelectedModalTournament] = useState<Tournament | null>(null);
  const [reportModalTournament, setReportModalTournament] = useState<Tournament | null>(null);
  const [reportReason, setReportReason] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  const esportsTournaments = tournaments.filter((t) => t.type === 'esports');

  const filteredTournaments = esportsTournaments.filter((t) => {
    if (selectedGameFilter !== 'all' && t.gameOrSport !== selectedGameFilter) return false;
    if (formatFilter !== 'all' && t.formatType !== formatFilter) return false;
    return true;
  });

  const gamesList = ['all', 'Free Fire MAX', 'BGMI', 'Valorant', 'CS2', 'Rocket League'];

  const handleOpenReport = (t: Tournament) => {
    setReportModalTournament(t);
    setReportReason('');
    setReportSubmitted(false);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportModalTournament || !reportReason.trim()) return;
    addReport(reportModalTournament.title, reportReason);
    setReportSubmitted(true);
    setTimeout(() => {
      setReportModalTournament(null);
      setReportSubmitted(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12131f] via-[#101018] to-[#0d0d14] border border-[#27293d] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 mb-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>OFFICIAL ESPORTS SANCTIONED CIRCUITS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-heading">
              Esports Tournaments & Leagues
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
              Competitive circuits for Free Fire MAX, BGMI, Valorant, and major titles. All listed entries adhere to official organizer rules and anti-cheat policies.
            </p>
          </div>

          <div className="bg-[#0b0c13] border border-amber-500/30 rounded-xl p-3 text-xs text-zinc-300 max-w-xs shrink-0">
            <div className="flex items-center space-x-1.5 text-amber-400 font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>DATA INTEGRITY NOTICE</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Competitions are tagged with <span className="text-amber-300 font-mono font-bold">[DEMO]</span>. We never invent live prize pools or unauthorized schedules without official publisher confirmation.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-6 border-t border-[#222436] flex flex-wrap items-center justify-between gap-4">
          {/* Game filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-zinc-400 mr-1 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Game:</span>
            </span>
            {gamesList.map((game) => (
              <button
                key={game}
                onClick={() => setSelectedGameFilter(game)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedGameFilter === game
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-[#151624] text-zinc-300 hover:bg-[#1d1f30] border border-[#2b2e46]'
                }`}
              >
                {game === 'all' ? 'All Esports' : game}
              </button>
            ))}
          </div>

          {/* Format filter */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-zinc-400">Format:</span>
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Formats</option>
              <option value="Online">Online Server</option>
              <option value="LAN">LAN Arena</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTournaments.length === 0 ? (
          <div className="col-span-full bg-[#11121d] border border-[#222438] rounded-2xl p-12 text-center space-y-3">
            <Gamepad2 className="w-12 h-12 text-zinc-500 mx-auto" />
            <h3 className="text-base font-bold text-zinc-200">No tournaments match the selected filters</h3>
            <p className="text-xs text-zinc-400">Try changing the game or format filters above.</p>
          </div>
        ) : (
          filteredTournaments.map((tournament) => {
            const isSaved = userProfile.savedTournamentIds.includes(tournament.id);

            return (
              <div
                key={tournament.id}
                className="bg-[#11121d] border border-[#24273d] hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 transition-all space-y-4 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Demo pill, game badge, and save button */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                        DEMO EVENT
                      </span>
                      <span className="bg-[#1c1e2e] text-zinc-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {tournament.gameOrSport}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tournament.formatType === 'LAN'
                          ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                          : 'bg-blue-950 text-blue-300 border border-blue-500/30'
                      }`}>
                        {tournament.formatType}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => toggleSaveTournament(tournament.id)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-[#181926] text-zinc-400 hover:text-white border-[#2c2f46]'
                        }`}
                        title={isSaved ? 'Saved to Profile' : 'Save Competition'}
                        aria-label="Save Competition"
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleOpenReport(tournament)}
                        className="p-1.5 rounded-lg bg-[#181926] hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-[#2c2f46] transition-colors cursor-pointer"
                        title="Report incorrect details"
                        aria-label="Report incorrect details"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {tournament.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {tournament.description}
                  </p>
                </div>

                {/* Core Specifications Table */}
                <div className="space-y-2.5 bg-[#0b0c14] border border-[#1d1f30] rounded-xl p-3.5 text-xs">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-500 flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Organizer:</span>
                    </span>
                    <span className="font-semibold text-right">{tournament.organizer}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-500 flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Date & Time:</span>
                    </span>
                    <span className="font-medium text-right">{tournament.date} • {tournament.time}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-500 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Location:</span>
                    </span>
                    <span className="font-medium text-right">{tournament.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-500 flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Team Format:</span>
                    </span>
                    <span className="font-semibold text-amber-300">{tournament.teamFormat}</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-zinc-500 flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Reg Deadline:</span>
                    </span>
                    <span className="font-bold text-rose-300">{tournament.registrationDeadline}</span>
                  </div>

                  <div className="pt-2 border-t border-[#1d1f30] flex items-center justify-between">
                    <span className="text-zinc-400 font-medium">Prize Pool:</span>
                    {tournament.isPrizeConfirmed ? (
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{tournament.prizePool}</span>
                      </span>
                    ) : (
                      <span className="text-zinc-500 italic text-[11px]">To Be Confirmed officially</span>
                    )}
                  </div>
                </div>

                {/* Entry Requirements & Age Eligibility Callout */}
                <div className="bg-[#151624]/60 border border-[#24273d] rounded-lg p-2.5 text-[11px] text-zinc-300 space-y-1">
                  <p>
                    <strong className="text-zinc-200">Eligibility:</strong> {tournament.ageEligibility}
                  </p>
                  <p className="text-zinc-400">
                    <strong className="text-zinc-300">Requirements:</strong> {tournament.entryRequirements}
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate">
                    <strong>Rule Source:</strong> {tournament.sourceCitation}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#1e2030]">
                  <button
                    onClick={() => setSelectedModalTournament(tournament)}
                    className="text-xs text-zinc-300 hover:text-amber-400 font-semibold transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Full Details & Rules</span>
                  </button>

                  <a
                    href={tournament.officialRegistrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
                  >
                    <span>Register</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Full Details Modal */}
      {selectedModalTournament && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11121d] border border-[#272a42] rounded-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-amber-500/20 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                  DEMO COMPETITION DETAILS
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {selectedModalTournament.title}
                </h2>
                <p className="text-xs text-zinc-400">{selectedModalTournament.organizerOfficialStatus}</p>
              </div>
              <button
                onClick={() => setSelectedModalTournament(null)}
                className="text-zinc-400 hover:text-white p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-zinc-300">
              <div className="bg-[#0b0c14] p-4 rounded-xl space-y-2 border border-[#1e2030]">
                <p><strong>Organizer:</strong> {selectedModalTournament.organizer}</p>
                <p><strong>Match Schedule:</strong> {selectedModalTournament.date} at {selectedModalTournament.time}</p>
                <p><strong>Venue / Server:</strong> {selectedModalTournament.location} ({selectedModalTournament.formatType})</p>
                <p><strong>Team Composition:</strong> {selectedModalTournament.teamFormat}</p>
                <p><strong>Official Source Citation:</strong> {selectedModalTournament.sourceCitation}</p>
              </div>

              <div>
                <h4 className="font-bold text-amber-400 uppercase text-[11px] mb-1">Entry Requirements</h4>
                <p className="bg-[#161726] p-3 rounded-lg border border-[#24273d]">
                  {selectedModalTournament.entryRequirements}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-amber-400 uppercase text-[11px] mb-1">Age & Minor Participation Policy</h4>
                <p className="bg-[#161726] p-3 rounded-lg border border-[#24273d]">
                  {selectedModalTournament.ageEligibility}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-amber-400 uppercase text-[11px] mb-1">Verified Prize Pool Breakdown</h4>
                <p className="bg-[#161726] p-3 rounded-lg border border-[#24273d] text-emerald-400 font-semibold">
                  {selectedModalTournament.prizePool}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#1e2030]">
              <button
                onClick={() => setSelectedModalTournament(null)}
                className="px-4 py-2 rounded-lg bg-[#181a28] hover:bg-[#222438] text-zinc-300 text-xs font-semibold"
              >
                Close
              </button>
              <a
                href={selectedModalTournament.officialRegistrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5"
              >
                <span>Official Registration Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalTournament && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11121d] border border-[#272a42] rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Flag className="w-4 h-4 text-rose-400" />
              <span>Report Inaccurate Event Information</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Reporting for: <strong className="text-zinc-200">{reportModalTournament.title}</strong>
            </p>

            {reportSubmitted ? (
              <div className="bg-emerald-950/50 border border-emerald-500/30 p-4 rounded-xl text-center text-xs text-emerald-300">
                ✓ Report submitted to the Arena Hub verification team for review.
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    What needs correction? (Rule, Date, Organizer, Eligibility)
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="e.g., The registration deadline was extended on the official portal..."
                    className="w-full bg-[#161726] border border-[#272a42] rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setReportModalTournament(null)}
                    className="px-4 py-2 rounded-lg bg-[#181a28] text-zinc-400 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
