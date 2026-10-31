/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy,
  Gamepad2,
  BookOpen,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  Flame,
  Award,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const {
    setActiveTab,
    tournaments,
    ruleGuides,
    trainingCentres,
    tutorials,
    userProfile,
    setAssistantInitialPrompt,
  } = useApp();

  const featuredTournaments = tournaments.slice(0, 4);
  const latestTutorials = tutorials.slice(0, 3);
  const featuredCentres = trainingCentres.slice(0, 3);

  const quickCategories = [
    { name: 'Free Fire MAX', type: 'esports', icon: Flame, tab: 'esports' },
    { name: 'BGMI', type: 'esports', icon: Gamepad2, tab: 'esports' },
    { name: 'Valorant', type: 'esports', icon: Trophy, tab: 'esports' },
    { name: 'Cricket', type: 'traditional', icon: Award, tab: 'sports' },
    { name: 'Football', type: 'traditional', icon: Trophy, tab: 'sports' },
    { name: 'Badminton', type: 'traditional', icon: Sparkles, tab: 'sports' },
  ];

  const handleAskAssistant = (prompt: string) => {
    setAssistantInitialPrompt(prompt);
    setActiveTab('assistant');
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12131f] via-[#101018] to-[#0a0a0f] border border-[#27293d] p-6 sm:p-10 lg:p-12 esports-grid-bg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-600/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Welcome back, Commander {userProfile.nickname}!</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-wide uppercase font-heading leading-tight">
            THE SANCTIONED ARENA FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              ESPORTS & SPORTS ATHLETES
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            Discover verified tournaments, master official governing rulebooks, locate high-performance training academies, and elevate your mechanics with structured pro tutorials.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('esports')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Explore Tournaments</span>
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className="px-5 py-2.5 rounded-xl bg-[#191a27] hover:bg-[#222436] border border-[#2f324a] text-zinc-200 font-semibold text-xs tracking-wider flex items-center space-x-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Official Rules Library</span>
            </button>
            <button
              onClick={() => setActiveTab('assistant')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-950/60 to-[#191a27] hover:border-amber-500/50 border border-amber-500/30 text-amber-300 font-semibold text-xs tracking-wider flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Ask AI Sports Specialist (EN / தமிழ்)</span>
            </button>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="mt-8 pt-6 border-t border-[#222436] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#0e0f17]/80 rounded-xl p-3 border border-[#1f2130]">
            <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Active Competitions</p>
            <p className="text-2xl font-black text-amber-400 font-heading">{tournaments.length}</p>
            <p className="text-[10px] text-zinc-500">Esports & Traditional Cups</p>
          </div>
          <div className="bg-[#0e0f17]/80 rounded-xl p-3 border border-[#1f2130]">
            <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Governing Rulebooks</p>
            <p className="text-2xl font-black text-amber-400 font-heading">{ruleGuides.length}</p>
            <p className="text-[10px] text-zinc-500">Official Sanctioned Guides</p>
          </div>
          <div className="bg-[#0e0f17]/80 rounded-xl p-3 border border-[#1f2130]">
            <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Verified Academies</p>
            <p className="text-2xl font-black text-amber-400 font-heading">{trainingCentres.length}</p>
            <p className="text-[10px] text-zinc-500">Licensed High-Perf Centres</p>
          </div>
          <div className="bg-[#0e0f17]/80 rounded-xl p-3 border border-[#1f2130]">
            <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Pro Masterclasses</p>
            <p className="text-2xl font-black text-amber-400 font-heading">{tutorials.length}</p>
            <p className="text-[10px] text-zinc-500">With interactive drills</p>
          </div>
        </div>
      </section>

      {/* Popular Sports & Games Quick Switcher */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-4 bg-amber-400 rounded-sm"></div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-heading">
              Popular Disciplines
            </h2>
          </div>
          <span className="text-xs text-zinc-400">Select any discipline to jump to events</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickCategories.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.tab)}
                className="group p-3.5 rounded-xl bg-[#12131d] hover:bg-[#1a1c2b] border border-[#242638] hover:border-amber-500/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {item.type}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-200 group-hover:text-amber-300 transition-colors">{item.name}</p>
                  <p className="text-[10px] text-zinc-400 flex items-center space-x-1 mt-0.5">
                    <span>View Events & Rules</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Tournaments Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-4 bg-amber-400 rounded-sm"></div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-heading">
              Featured Tournaments & Competitions
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('calendar')}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
          >
            <span>View Full Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="rounded-xl bg-[#11121c] border border-[#24273b] hover:border-amber-500/40 transition-all p-5 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Demo Badge Banner */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                    DEMO EVENT
                  </span>
                  <span className="text-[11px] font-medium text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">
                    {tournament.gameOrSport}
                  </span>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  tournament.status === 'Closing Soon'
                    ? 'bg-rose-950/70 text-rose-300 border border-rose-500/30'
                    : 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {tournament.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {tournament.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {tournament.description}
                </p>
              </div>

              {/* Tournament Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 bg-[#0d0e17] p-3 rounded-lg border border-[#1e202f] mb-4">
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{tournament.date} ({tournament.time})</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{tournament.location}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{tournament.teamFormat}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate font-semibold text-emerald-300">
                    {tournament.prizePool}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1d1f2e] text-xs">
                <div className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                  Reg Deadline: <strong className="text-zinc-200">{tournament.registrationDeadline}</strong>
                </div>
                <button
                  onClick={() => setActiveTab(tournament.type === 'esports' ? 'esports' : 'sports')}
                  className="inline-flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Details & Eligibility</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Assistant Callout Prompt Chips */}
      <section className="rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#131420] to-[#11121d] border border-amber-500/30 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>AI SPORTS & ESPORTS SPECIALIST</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Got a Rule Dispute or Tactical Question?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              Get immediate rule clarifications cited from official governing bodies (IFAB, MCC, Krafton, Riot, Garena). Supports English & Tamil (தமிழ்).
            </p>
          </div>

          <button
            onClick={() => setActiveTab('assistant')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-lg shadow-amber-500/20"
          >
            Open Assistant
          </button>
        </div>

        {/* Quick prompt chips */}
        <div className="mt-5 pt-4 border-t border-amber-500/20 flex flex-wrap gap-2">
          <button
            onClick={() => handleAskAssistant('Explain Valorant economy rules in detail')}
            className="text-xs bg-[#1a1b2a] hover:bg-amber-500/20 hover:text-amber-300 text-zinc-300 px-3 py-1.5 rounded-lg border border-[#2b2d42] transition-colors"
          >
            🎯 Valorant Economy System
          </button>
          <button
            onClick={() => handleAskAssistant('How does the DLS Duckworth-Lewis-Stern method work in Cricket?')}
            className="text-xs bg-[#1a1b2a] hover:bg-amber-500/20 hover:text-amber-300 text-zinc-300 px-3 py-1.5 rounded-lg border border-[#2b2d42] transition-colors"
          >
            🏏 Cricket DLS Method
          </button>
          <button
            onClick={() => handleAskAssistant('Explain the Free Fire MAX tournament point scoring system in Tamil')}
            className="text-xs bg-[#1a1b2a] hover:bg-amber-500/20 hover:text-amber-300 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors"
          >
            🔥 ஃப்ரீ பயர் புள்ளி முறை (Tamil)
          </button>
          <button
            onClick={() => handleAskAssistant('What is Law 11 Offside in Football and what are the exceptions?')}
            className="text-xs bg-[#1a1b2a] hover:bg-amber-500/20 hover:text-amber-300 text-zinc-300 px-3 py-1.5 rounded-lg border border-[#2b2d42] transition-colors"
          >
            ⚽ Football Offside Law 11
          </button>
        </div>
      </section>

      {/* Tutorials & Training Academy Quick Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Latest Tutorials */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-4 bg-amber-400 rounded-sm"></div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-heading">
                Latest Pro Tutorials
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('tutorials')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
            >
              <span>All Tutorials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {latestTutorials.map((tut) => (
              <div
                key={tut.id}
                onClick={() => setActiveTab('tutorials')}
                className="p-4 rounded-xl bg-[#11121d] hover:bg-[#171826] border border-[#222438] hover:border-amber-500/30 transition-all cursor-pointer flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-bold">
                      {tut.level}
                    </span>
                    <span className="text-[11px] text-zinc-400 truncate">{tut.gameOrSport}</span>
                    <span className="text-[11px] text-zinc-500">• {tut.durationMinutes} min read</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-100 hover:text-amber-300 transition-colors truncate">
                    {tut.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">
                    {tut.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Training Centres */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-4 bg-amber-400 rounded-sm"></div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-heading">
                Verified Training Centres
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('academies')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
            >
              <span>Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {featuredCentres.map((centre) => (
              <div
                key={centre.id}
                onClick={() => setActiveTab('academies')}
                className="p-4 rounded-xl bg-[#11121d] hover:bg-[#171826] border border-[#222438] hover:border-amber-500/30 transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold text-zinc-100 truncate max-w-[220px]">
                      {centre.name}
                    </h4>
                  </div>
                  <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Verified Evidence</span>
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-1">
                  📍 {centre.address}, {centre.city}, {centre.state}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#1e202f]">
                  <span className="text-zinc-500 truncate max-w-[240px]">
                    {centre.accreditationEvidence}
                  </span>
                  <span className="text-amber-400 font-semibold flex items-center space-x-1">
                    <span>View Courses</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
