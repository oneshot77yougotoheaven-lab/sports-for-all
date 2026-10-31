/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { EsportsSection } from './components/EsportsSection';
import { TraditionalSportsSection } from './components/TraditionalSportsSection';
import { SportsRulesLibrary } from './components/SportsRulesLibrary';
import { CompetitionCalendar } from './components/CompetitionCalendar';
import { TrainingCentreDirectory } from './components/TrainingCentreDirectory';
import { TutorialCentre } from './components/TutorialCentre';
import { AiSportsAssistant } from './components/AiSportsAssistant';
import { UserProfileView } from './components/UserProfileView';
import { AdminDashboard } from './components/AdminDashboard';
import {
  Shield,
  Gamepad2,
  Trophy,
  BookOpen,
  Calendar,
  Building2,
  GraduationCap,
  Bot,
  ExternalLink,
  ShieldCheck,
  Heart,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-[#08080c] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && <HomeDashboard />}
        {activeTab === 'esports' && <EsportsSection />}
        {activeTab === 'sports' && <TraditionalSportsSection />}
        {activeTab === 'rules' && <SportsRulesLibrary />}
        {activeTab === 'calendar' && <CompetitionCalendar />}
        {activeTab === 'academies' && <TrainingCentreDirectory />}
        {activeTab === 'tutorials' && <TutorialCentre />}
        {activeTab === 'assistant' && <AiSportsAssistant />}
        {activeTab === 'profile' && <UserProfileView />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-[#07070b] border-t border-[#1c1d2e] mt-auto text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand Info */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-lg font-black tracking-wider text-white font-heading">
                  ARENA<span className="text-amber-400">HUB</span>
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                The premier sanctioned hub for competitive esports and traditional sports. Discover competitions, master official rules, and train with accredited coaches.
              </p>
              <div className="flex items-center space-x-2 text-[10px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Federation Verified Standards</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Competitive Sectors
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <button onClick={() => setActiveTab('esports')} className="hover:text-amber-400 transition-colors">
                    Free Fire MAX & BGMI Circuits
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('esports')} className="hover:text-amber-400 transition-colors">
                    Valorant & Tactical Shooters
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('sports')} className="hover:text-amber-400 transition-colors">
                    Cricket, Football & Badminton Cups
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('calendar')} className="hover:text-amber-400 transition-colors">
                    National Tournament Calendar
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Knowledge & Rules */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Official Knowledge
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <button onClick={() => setActiveTab('rules')} className="hover:text-amber-400 transition-colors">
                    Official Sports Rules Library
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('academies')} className="hover:text-amber-400 transition-colors">
                    Accredited Training Academies
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('tutorials')} className="hover:text-amber-400 transition-colors">
                    Tactical Masterclasses & Drills
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('assistant')} className="hover:text-amber-400 transition-colors">
                    AI Rules Specialist (English & தமிழ்)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Integrity Notice */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-heading">
                Sports Integrity Notice
              </h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Demonstration events are explicitly designated with [DEMO]. Official rules, statutes, and codes remain the intellectual property of their governing bodies (MCC, IFAB, FIBA, BWF, Krafton, Riot Games, Garena). Youth personal data is shielded under Arena Hub minor privacy protocols.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#181928] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
            <p>© 2026 ARENA HUB. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <button onClick={() => setActiveTab('profile')} className="hover:text-zinc-300">
                Privacy Safeguards
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('rules')} className="hover:text-zinc-300">
                Fair Play Code
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('admin')} className="text-amber-400/80 hover:text-amber-300">
                Admin Desk
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
