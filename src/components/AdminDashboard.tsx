/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Tournament } from '../data/mockData';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  Building2,
  BookOpen,
  Calendar,
  ShieldAlert,
  Flag,
  Check,
  X,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdmin,
    setIsAdmin,
    adminCodeInput,
    setAdminCodeInput,
    verifyAdminCode,
    tournaments,
    addTournament,
    deleteTournament,
    updateTournament,
    trainingCentres,
    addTrainingCentre,
    ruleGuides,
    addRuleUpdate,
    reportedItems,
    resolveReport,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'events' | 'academies' | 'rules' | 'reports'
  >('events');

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddAcademyModal, setShowAddAcademyModal] = useState(false);
  const [showRuleUpdateModal, setShowRuleUpdateModal] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<'esports' | 'traditional'>('esports');
  const [newEventGame, setNewEventGame] = useState('Free Fire MAX');
  const [newEventOrganizer, setNewEventOrganizer] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-11-25');
  const [newEventTime, setNewEventTime] = useState('15:00 IST');
  const [newEventLocation, setNewEventLocation] = useState('Online Tournament Server');
  const [newEventFormatType, setNewEventFormatType] = useState<'Online' | 'LAN' | 'Hybrid'>('Online');
  const [newEventTeamFormat, setNewEventTeamFormat] = useState<'Squad (4v4)' | '5v5' | '11-a-side' | 'Solo' | 'Doubles' | 'Open Roster'>('Squad (4v4)');
  const [newEventRequirements, setNewEventRequirements] = useState('');
  const [newEventAgeEligibility, setNewEventAgeEligibility] = useState('16+ years old');
  const [newEventDeadline, setNewEventDeadline] = useState('2026-11-18');
  const [newEventRegUrl, setNewEventRegUrl] = useState('https://example.com/register');
  const [newEventPrizePool, setNewEventPrizePool] = useState('₹5,00,000 INR (Confirmed)');
  const [newEventSource, setNewEventSource] = useState('Official Governing Publisher Notification');
  const [newEventDescription, setNewEventDescription] = useState('');

  // New Academy Form State
  const [newAcademyName, setNewAcademyName] = useState('');
  const [newAcademyCategory, setNewAcademyCategory] = useState<'Esports' | 'Football' | 'Cricket' | 'Badminton' | 'Athletics' | 'Basketball' | 'Multi-Sport'>('Esports');
  const [newAcademyAddress, setNewAcademyAddress] = useState('');
  const [newAcademyCity, setNewAcademyCity] = useState('');
  const [newAcademyState, setNewAcademyState] = useState('');
  const [newAcademyPhone, setNewAcademyPhone] = useState('');
  const [newAcademyEmail, setNewAcademyEmail] = useState('');
  const [newAcademyWebsite, setNewAcademyWebsite] = useState('');
  const [newAcademyEvidence, setNewAcademyEvidence] = useState('');
  const [newAcademyCourses, setNewAcademyCourses] = useState('');

  // Rule Update State
  const [selectedRuleId, setSelectedRuleId] = useState(ruleGuides[0]?.id || '');
  const [ruleUpdateNote, setRuleUpdateNote] = useState('');
  const [ruleChangelogDate, setRuleChangelogDate] = useState('2026-10-31');

  const [authError, setAuthError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyAdminCode(adminCodeInput);
    if (!success) {
      setAuthError('Invalid Admin Passcode. Access denied.');
    } else {
      setAuthError('');
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    addTournament({
      title: `${newEventTitle} [DEMO]`,
      type: newEventType,
      gameOrSport: newEventGame,
      organizer: newEventOrganizer,
      organizerOfficialStatus: 'Verified Sanctioned Event Listing',
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation,
      formatType: newEventFormatType,
      teamFormat: newEventTeamFormat,
      entryRequirements: newEventRequirements,
      ageEligibility: newEventAgeEligibility,
      registrationDeadline: newEventDeadline,
      officialRegistrationUrl: newEventRegUrl,
      prizePool: newEventPrizePool,
      isPrizeConfirmed: true,
      isDemo: true,
      status: 'Open',
      sourceCitation: newEventSource,
      bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      description: newEventDescription,
    });
    setShowAddEventModal(false);
    // Reset form
    setNewEventTitle('');
    setNewEventRequirements('');
    setNewEventDescription('');
  };

  const handleCreateAcademy = (e: React.FormEvent) => {
    e.preventDefault();
    addTrainingCentre({
      name: newAcademyName,
      category: newAcademyCategory,
      address: newAcademyAddress,
      city: newAcademyCity,
      state: newAcademyState,
      country: 'India',
      availableCourses: newAcademyCourses.split(',').map((c) => c.trim()).filter(Boolean),
      ageGroups: ['Youth & Pro Divs'],
      verifiedContact: {
        phone: newAcademyPhone,
        email: newAcademyEmail,
        officeHours: '09:00 AM - 06:00 PM IST',
      },
      officialWebsite: newAcademyWebsite || 'https://arena.hub',
      facilities: ['High performance training center', 'Video review theatre'],
      headCoachOrDirector: 'Accredited Master Coach',
      accreditationEvidence: newAcademyEvidence,
      isVerified: true,
      rating: 5.0,
    });
    setShowAddAcademyModal(false);
    setNewAcademyName('');
    setNewAcademyAddress('');
    setNewAcademyCity('');
    setNewAcademyEvidence('');
  };

  const handlePublishRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleUpdateNote.trim()) return;
    addRuleUpdate(selectedRuleId, ruleUpdateNote, ruleChangelogDate);
    setShowRuleUpdateModal(false);
    setRuleUpdateNote('');
  };

  // If not authenticated as admin, show login
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <div className="bg-[#10111c] border border-[#222436] rounded-2xl p-8 space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white uppercase font-heading">
              Authorized Administrator Desk
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Access tournament publishing, rule modification, and data verification controls.
            </p>
          </div>

          {authError && (
            <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-300">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Security Passcode
              </label>
              <input
                type="password"
                required
                value={adminCodeInput}
                onChange={(e) => setAdminCodeInput(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-3 text-xs text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 cursor-pointer"
            >
              Verify & Enter Portal
            </button>
          </form>

          <div className="pt-3 border-t border-[#1e2030] text-[11px] text-zinc-500 text-center">
            <span>Restricted management portal for authorized administrators only.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* Admin Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12131f] via-[#101018] to-[#0d0d14] border border-[#27293d] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 mb-2">
              <Unlock className="w-3.5 h-3.5" />
              <span>ADMINISTRATOR DESK ACTIVE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase font-heading">
              Platform Governance & Content Manager
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1">
              Sanction competitions, verify accredited academies, publish rulebook amendments, and resolve community reports.
            </p>
          </div>

          <button
            onClick={() => setIsAdmin(false)}
            className="px-4 py-2 rounded-xl bg-[#161726] hover:bg-[#1f2133] border border-[#2b2d42] text-zinc-300 text-xs font-semibold shrink-0 cursor-pointer"
          >
            Exit Admin Session
          </button>
        </div>

        {/* Tab selection */}
        <div className="mt-6 pt-5 border-t border-[#222436] flex flex-wrap gap-2">
          {[
            { id: 'events', label: `Manage Competitions (${tournaments.length})`, icon: Calendar },
            { id: 'academies', label: `Verified Academies (${trainingCentres.length})`, icon: Building2 },
            { id: 'rules', label: 'Rulebook Revisions', icon: BookOpen },
            { id: 'reports', label: `Reported Discrepancies (${reportedItems.length})`, icon: Flag },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-[#151624] text-zinc-300 hover:bg-[#1e2030] border border-[#272a40]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Management */}
      {activeAdminTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              All Competitions & Tournament Nodes
            </h3>
            <button
              onClick={() => setShowAddEventModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Sanction New Competition</span>
            </button>
          </div>

          <div className="space-y-3">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-[#10111c] border border-[#222436] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold uppercase">
                      {t.type}
                    </span>
                    <span className="font-semibold text-zinc-300">{t.gameOrSport}</span>
                    <span className="text-zinc-500">• {t.date}</span>
                    <span className="text-emerald-400 font-semibold">{t.prizePool}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{t.title}</h4>
                  <p className="text-zinc-400 text-[11px]">
                    Organizer: {t.organizer} | Ref: {t.sourceCitation}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => {
                      const newPrize = prompt('Update Prize Pool:', t.prizePool);
                      if (newPrize !== null) updateTournament(t.id, { prizePool: newPrize });
                    }}
                    className="p-2 rounded-lg bg-[#161726] hover:bg-[#202235] text-zinc-300 border border-[#292c42]"
                    title="Edit event prize pool"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove tournament "${t.title}"?`)) {
                        deleteTournament(t.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30"
                    title="Delete tournament"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Academies Management */}
      {activeAdminTab === 'academies' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Accredited Training Centres
            </h3>
            <button
              onClick={() => setShowAddAcademyModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Verified Academy</span>
            </button>
          </div>

          <div className="space-y-3">
            {trainingCentres.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-[#10111c] border border-[#222436] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold uppercase">
                      {c.category}
                    </span>
                    <span className="font-semibold text-zinc-300">{c.city}, {c.state}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{c.name}</h4>
                  <p className="text-emerald-400 text-[11px]">
                    Evidence: {c.accreditationEvidence}
                  </p>
                </div>

                <div className="text-zinc-400 text-[11px] text-right">
                  <p>{c.verifiedContact.phone}</p>
                  <p>{c.verifiedContact.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rulebook Revisions */}
      {activeAdminTab === 'rules' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Publish Governing Rulebook Amendments
            </h3>
            <button
              onClick={() => setShowRuleUpdateModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish Rule Amendment</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ruleGuides.map((guide) => (
              <div
                key={guide.id}
                className="p-4 rounded-xl bg-[#10111c] border border-[#222436] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">{guide.name}</h4>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    Rev: {guide.lastUpdatedDate}
                  </span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Governing Body: {guide.officialSource}
                </p>
                <div className="text-zinc-300 text-[11px] bg-[#0c0d15] p-2.5 rounded-lg border border-[#1e2030] line-clamp-2">
                  Latest: {guide.advancedRules[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reported Information */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
            Community Discrepancy & Verification Reports
          </h3>

          <div className="space-y-3">
            {reportedItems.map((rep) => (
              <div
                key={rep.id}
                className="p-4 rounded-xl bg-[#10111c] border border-[#222436] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rep.status === 'Verified'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : rep.status === 'Dismissed'
                        ? 'bg-zinc-800 text-zinc-400'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                    }`}>
                      {rep.status}
                    </span>
                    <span className="text-zinc-400 font-semibold">{rep.date}</span>
                    <span className="text-zinc-500">• Reported by {rep.reportedBy}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{rep.targetTitle}</h4>
                  <p className="text-zinc-300 text-[11px]">
                    <strong>Flag details:</strong> "{rep.reason}"
                  </p>
                </div>

                {rep.status === 'Pending Review' && (
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => resolveReport(rep.id, 'Verified')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Verify & Accept</span>
                    </button>
                    <button
                      onClick={() => resolveReport(rep.id, 'Dismissed')}
                      className="px-3 py-1.5 rounded-lg bg-[#181a28] hover:bg-[#202235] text-zinc-400 font-semibold text-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Dismiss</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Tournament Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11121d] border border-[#272a42] rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#1e2030]">
              <h3 className="text-base font-bold text-white uppercase font-heading">
                Sanction New Competition Listing
              </h3>
              <button onClick={() => setShowAddEventModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-zinc-300 font-semibold mb-1">Tournament Title</label>
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="e.g. Free Fire All-Stars Cup 2026"
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Category</label>
                  <select
                    value={newEventType}
                    onChange={(e) => setNewEventType(e.target.value as any)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  >
                    <option value="esports">Esports Title</option>
                    <option value="traditional">Traditional Sport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Game or Sport</label>
                  <input
                    type="text"
                    required
                    value={newEventGame}
                    onChange={(e) => setNewEventGame(e.target.value)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Sanctioned Organizer</label>
                  <input
                    type="text"
                    required
                    value={newEventOrganizer}
                    onChange={(e) => setNewEventOrganizer(e.target.value)}
                    placeholder="e.g. Krafton India / State Association"
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Competition Date</label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Start Time</label>
                  <input
                    type="text"
                    required
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="e.g. 16:00 IST"
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Format Type</label>
                  <select
                    value={newEventFormatType}
                    onChange={(e) => setNewEventFormatType(e.target.value as any)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  >
                    <option value="Online">Online Server</option>
                    <option value="LAN">LAN Arena</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-300 font-semibold mb-1">Venue / Online Server Location</label>
                  <input
                    type="text"
                    required
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Registration Deadline</label>
                  <input
                    type="date"
                    required
                    value={newEventDeadline}
                    onChange={(e) => setNewEventDeadline(e.target.value)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Prize Pool (Confirmed only)</label>
                  <input
                    type="text"
                    required
                    value={newEventPrizePool}
                    onChange={(e) => setNewEventPrizePool(e.target.value)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-300 font-semibold mb-1">Age Eligibility Policy</label>
                  <input
                    type="text"
                    required
                    value={newEventAgeEligibility}
                    onChange={(e) => setNewEventAgeEligibility(e.target.value)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-300 font-semibold mb-1">Entry Requirements</label>
                  <input
                    type="text"
                    required
                    value={newEventRequirements}
                    onChange={(e) => setNewEventRequirements(e.target.value)}
                    placeholder="e.g. Account Level 40+, Diamond tier or AIFF player ID"
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-300 font-semibold mb-1">Official Rulebook / Citation Source</label>
                  <input
                    type="text"
                    required
                    value={newEventSource}
                    onChange={(e) => setNewEventSource(e.target.value)}
                    placeholder="e.g. Official VCT South Asia 2026 Rulebook clause 3"
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-300 font-semibold mb-1">Tournament Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#1e2030]">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161726] text-zinc-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider"
                >
                  Publish [DEMO] Competition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Academy Modal */}
      {showAddAcademyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11121d] border border-[#272a42] rounded-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1e2030]">
              <h3 className="text-base font-bold text-white uppercase font-heading">
                Register Accredited Academy
              </h3>
              <button onClick={() => setShowAddAcademyModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateAcademy} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Centre / Academy Name</label>
                <input
                  type="text"
                  required
                  value={newAcademyName}
                  onChange={(e) => setNewAcademyName(e.target.value)}
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Category</label>
                  <select
                    value={newAcademyCategory}
                    onChange={(e) => setNewAcademyCategory(e.target.value as any)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  >
                    <option value="Esports">Esports</option>
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Multi-Sport">Multi-Sport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newAcademyCity}
                    onChange={(e) => setNewAcademyCity(e.target.value)}
                    className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={newAcademyAddress}
                  onChange={(e) => setNewAcademyAddress(e.target.value)}
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">
                  Accreditation Evidence License # (Required)
                </label>
                <input
                  type="text"
                  required
                  value={newAcademyEvidence}
                  onChange={(e) => setNewAcademyEvidence(e.target.value)}
                  placeholder="e.g. AIFF 4-Star Accreditation #AIFF-2026-90"
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Available Courses (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={newAcademyCourses}
                  onChange={(e) => setNewAcademyCourses(e.target.value)}
                  placeholder="e.g. Tactical IGL Module, Aim Training, Physical Agility"
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#1e2030]">
                <button
                  type="button"
                  onClick={() => setShowAddAcademyModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161726] text-zinc-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider"
                >
                  Register Verified Centre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rule Update Modal */}
      {showRuleUpdateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11121d] border border-[#272a42] rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1e2030]">
              <h3 className="text-base font-bold text-white uppercase font-heading">
                Publish Governing Rule Amendment
              </h3>
              <button onClick={() => setShowRuleUpdateModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handlePublishRule} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Target Sport / Game</label>
                <select
                  value={selectedRuleId}
                  onChange={(e) => setSelectedRuleId(e.target.value)}
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                >
                  {ruleGuides.map((g) => (
                    <option key={g.id} value={g.id}>{g.name} ({g.officialSource})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Changelog Date</label>
                <input
                  type="date"
                  required
                  value={ruleChangelogDate}
                  onChange={(e) => setRuleChangelogDate(e.target.value)}
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Amendment Directive Text</label>
                <textarea
                  rows={3}
                  required
                  value={ruleUpdateNote}
                  onChange={(e) => setRuleUpdateNote(e.target.value)}
                  placeholder="e.g. Revised timeout allotment from 30 seconds to 60 seconds per map..."
                  className="w-full bg-[#151624] border border-[#2b2e46] rounded-xl p-2.5 text-zinc-100"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#1e2030]">
                <button
                  type="button"
                  onClick={() => setShowRuleUpdateModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161726] text-zinc-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider"
                >
                  Publish to Rulebook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
