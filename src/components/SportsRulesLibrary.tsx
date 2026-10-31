/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  calculateEsportsPoints,
  calculateNetRunRate,
  checkAgeEligibility,
} from '../utils/rules-engine';
import {
  BookOpen,
  Calendar,
  ExternalLink,
  Shield,
  Users,
  Target,
  AlertTriangle,
  Scale,
  Sparkles,
  Calculator,
  Search,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

export const SportsRulesLibrary: React.FC = () => {
  const { ruleGuides, globalSearch } = useApp();

  const [selectedSportKey, setSelectedSportKey] = useState<string>('freefire');
  const [activeSubTab, setActiveSubTab] = useState<
    'basic' | 'advanced' | 'positions' | 'scoring' | 'fouls' | 'formats' | 'sportsmanship' | 'calculator'
  >('basic');

  // Calculator states
  const [calcGame, setCalcGame] = useState<'freefire' | 'bgmi'>('freefire');
  const [calcPlacement, setCalcPlacement] = useState<number>(1);
  const [calcKills, setCalcKills] = useState<number>(6);

  // Cricket NRR states
  const [nrrRunsScored, setNrrRunsScored] = useState<number>(185);
  const [nrrOversFaced, setNrrOversFaced] = useState<number>(20);
  const [nrrRunsConceded, setNrrRunsConceded] = useState<number>(150);
  const [nrrOversBowled, setNrrOversBowled] = useState<number>(20);

  // Age eligibility calculator states
  const [calcBirthDate, setCalcBirthDate] = useState<string>('2009-06-15');
  const [calcMinAge, setCalcMinAge] = useState<number>(16);
  const [calcMaxAge, setCalcMaxAge] = useState<number>(19);

  const currentGuide = ruleGuides.find((r) => r.key === selectedSportKey) || ruleGuides[0];

  const subTabs = [
    { id: 'basic', label: 'Basic Rules', icon: BookOpen },
    { id: 'advanced', label: 'Advanced Rules', icon: Shield },
    { id: 'positions', label: 'Player Positions', icon: Users },
    { id: 'scoring', label: 'Scoring System', icon: Target },
    { id: 'fouls', label: 'Fouls & Penalties', icon: AlertTriangle },
    { id: 'formats', label: 'Tournament Formats', icon: Trophy },
    { id: 'sportsmanship', label: 'Fair Play & Conduct', icon: Scale },
    { id: 'calculator', label: 'Interactive Calculators', icon: Calculator, isSpecial: true },
  ];

  const esportsResult = calculateEsportsPoints(calcGame, calcPlacement, calcKills);
  const nrrResult = calculateNetRunRate(nrrRunsScored, nrrOversFaced, nrrRunsConceded, nrrOversBowled);
  const eligibilityResult = checkAgeEligibility(calcBirthDate, calcMinAge, calcMaxAge);

  return (
    <div className="space-y-8 pb-12">
      {/* Library Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12131f] via-[#101018] to-[#0d0d14] border border-[#27293d] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>OFFICIAL GOVERNING CODE REPOSITORY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-heading">
              Sports & Esports Rules Library
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
              Authentic rulebooks and competitive codes cited directly from global governing bodies (Garena, Krafton, Riot Games, MCC, IFAB, FIBA, BWF).
            </p>
          </div>

          {/* Source Citation Badge */}
          <div className="bg-[#0b0c14] border border-amber-500/30 rounded-xl p-3 text-xs max-w-sm shrink-0 space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
              <Calendar className="w-4 h-4" />
              <span>Latest Official Rule Revision:</span>
            </div>
            <p className="text-zinc-200 font-semibold">{currentGuide.lastUpdatedDate}</p>
            <p className="text-[11px] text-zinc-400 truncate">
              Source: {currentGuide.officialSource}
            </p>
          </div>
        </div>

        {/* Sport Selection Tabs */}
        <div className="mt-6 pt-5 border-t border-[#222436] flex flex-wrap gap-2">
          {ruleGuides.map((guide) => (
            <button
              key={guide.key}
              onClick={() => setSelectedSportKey(guide.key)}
              className={`text-xs px-3.5 py-2 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                selectedSportKey === guide.key
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-[#151624] text-zinc-300 hover:bg-[#1e2033] border border-[#272a40]'
              }`}
            >
              <span>{guide.name}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                selectedSportKey === guide.key ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {guide.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Guide Card Header */}
      <div className="bg-[#10111c] border border-[#222436] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1e2032]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
              {currentGuide.category.toUpperCase()} RULEBOOK
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
              {currentGuide.name} Official Competitive Codex
            </h2>
            <p className="text-xs text-zinc-400">
              Authority: <strong className="text-zinc-200">{currentGuide.officialSource}</strong>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={currentGuide.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3.5 py-2 rounded-lg bg-[#181a28] hover:bg-[#23263a] border border-[#2d3049] text-amber-300 font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <span>View Primary Source Document</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#1e2032] pb-3">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : tab.isSpecial
                    ? 'bg-[#181a29] text-amber-300 hover:bg-[#222538] border border-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-[#161726]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Content Area */}
        <div className="pt-2">
          {/* Basic Rules */}
          {activeSubTab === 'basic' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Foundational Playing Rules</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentGuide.basicRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0d0e17] border border-[#1e2030] text-xs text-zinc-300 flex items-start space-x-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Rules */}
          {activeSubTab === 'advanced' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Advanced Competitive Regulations</span>
              </h3>
              <div className="space-y-3">
                {currentGuide.advancedRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0d0e17] border border-[#1e2030] text-xs text-zinc-300 flex items-start space-x-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Player Positions */}
          {activeSubTab === 'positions' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Designated Roles & Tactical Positions</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentGuide.playerPositions.map((pos, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0d0e17] border border-[#1e2030] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{pos.title}</h4>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        {pos.role}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {pos.keyDuties}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scoring System */}
          {activeSubTab === 'scoring' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Sanctioned Scoring Framework</span>
              </h3>
              <div className="p-5 rounded-xl bg-[#0d0e17] border border-[#1e2030] text-xs text-zinc-200 leading-relaxed space-y-3">
                <p className="text-sm font-semibold text-amber-300">{currentGuide.scoringSystem}</p>
                <div className="p-3 bg-[#151624] rounded-lg border border-[#27293d] text-zinc-300 text-xs">
                  <strong>Team Roster Limits:</strong> {currentGuide.teamSizes}
                </div>
              </div>
            </div>
          )}

          {/* Fouls & Penalties */}
          {activeSubTab === 'fouls' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Fouls, Infractions & Disciplinary Penalties</span>
              </h3>
              <div className="space-y-3">
                {currentGuide.foulsAndPenalties.map((foul, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-zinc-300 flex items-start space-x-3"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{foul}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tournament Formats */}
          {activeSubTab === 'formats' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Approved Competitive Formats</span>
              </h3>
              <div className="space-y-3">
                {currentGuide.tournamentFormats.map((fmt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0d0e17] border border-[#1e2030] text-xs text-zinc-300 flex items-start space-x-3"
                  >
                    <Trophy className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{fmt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fair Play & Sportsmanship */}
          {activeSubTab === 'sportsmanship' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                <Scale className="w-4 h-4" />
                <span>Fair Play Code & Sportsmanship Directives</span>
              </h3>
              <div className="space-y-3">
                {currentGuide.fairPlayAndSportsmanship.map((code, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-zinc-300 flex items-start space-x-3"
                  >
                    <Scale className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{code}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Calculators Tab */}
          {activeSubTab === 'calculator' && (
            <div className="space-y-8">
              {/* Esports Point Matrix Calculator */}
              <div className="p-5 rounded-xl bg-[#0d0e17] border border-[#1e2030] space-y-4">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  <span>Interactive Battle Royale Points Calculator</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Calculate points instantly using the official Garena FFWS 12-point table or Krafton BGMI 10-point system.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Game System</label>
                    <select
                      value={calcGame}
                      onChange={(e) => setCalcGame(e.target.value as any)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2 focus:outline-none focus:border-amber-500"
                    >
                      <option value="freefire">Free Fire MAX (FFWS Matrix)</option>
                      <option value="bgmi">BGMI (Krafton 10-Point)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Match Placement (Rank #)</label>
                    <input
                      type="number"
                      min={1}
                      max={16}
                      value={calcPlacement}
                      onChange={(e) => setCalcPlacement(parseInt(e.target.value, 10) || 1)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Squad Eliminations (Kills)</label>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={calcKills}
                      onChange={(e) => setCalcKills(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="bg-[#151624] p-4 rounded-xl border border-amber-500/30 flex items-center justify-around text-center">
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase">Placement Points</p>
                    <p className="text-xl font-bold text-white font-heading">{esportsResult.placementPoints}</p>
                  </div>
                  <span className="text-xl text-zinc-600 font-bold">+</span>
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase">Kill Points</p>
                    <p className="text-xl font-bold text-white font-heading">{esportsResult.killPoints}</p>
                  </div>
                  <span className="text-xl text-zinc-600 font-bold">=</span>
                  <div>
                    <p className="text-[10px] text-amber-400 uppercase font-bold">Total Match Score</p>
                    <p className="text-2xl font-black text-amber-400 font-heading">{esportsResult.totalPoints} pts</p>
                  </div>
                </div>
              </div>

              {/* Cricket Net Run Rate Calculator */}
              <div className="p-5 rounded-xl bg-[#0d0e17] border border-[#1e2030] space-y-4">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  <span>Cricket Net Run Rate (NRR) Official Calculator</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Calculates tournament group stage tiebreakers according to ICC standard tournament playing condition clause 16.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Runs Scored</label>
                    <input
                      type="number"
                      value={nrrRunsScored}
                      onChange={(e) => setNrrRunsScored(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Overs Faced</label>
                    <input
                      type="number"
                      value={nrrOversFaced}
                      onChange={(e) => setNrrOversFaced(parseFloat(e.target.value) || 1)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Runs Conceded</label>
                    <input
                      type="number"
                      value={nrrRunsConceded}
                      onChange={(e) => setNrrRunsConceded(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Overs Bowled</label>
                    <input
                      type="number"
                      value={nrrOversBowled}
                      onChange={(e) => setNrrOversBowled(parseFloat(e.target.value) || 1)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="bg-[#151624] p-3.5 rounded-xl border border-amber-500/30 flex items-center justify-between text-xs">
                  <span className="text-zinc-300">
                    Net Run Rate: <strong className="text-zinc-100 font-mono">({nrrRunsScored}/{nrrOversFaced}) - ({nrrRunsConceded}/{nrrOversBowled})</strong>
                  </span>
                  <span className={`text-base font-black font-mono ${nrrResult >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {nrrResult >= 0 ? `+${nrrResult.toFixed(3)}` : nrrResult.toFixed(3)}
                  </span>
                </div>
              </div>

              {/* Tournament Age Eligibility Checker */}
              <div className="p-5 rounded-xl bg-[#0d0e17] border border-[#1e2030] space-y-4">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Shield className="w-4 h-4" />
                  <span>Age Eligibility Verification Tool</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Verify whether a player satisfies Under-16, Under-19, or Open age regulations on the competition cut-off date.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={calcBirthDate}
                      onChange={(e) => setCalcBirthDate(e.target.value)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Min Age Permitted</label>
                    <input
                      type="number"
                      value={calcMinAge}
                      onChange={(e) => setCalcMinAge(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Max Age Permitted</label>
                    <input
                      type="number"
                      value={calcMaxAge}
                      onChange={(e) => setCalcMaxAge(parseInt(e.target.value, 10) || 99)}
                      className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border text-xs flex items-center space-x-2.5 ${
                  eligibilityResult.eligible
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                }`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{eligibilityResult.message}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
