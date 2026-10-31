/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrainingCentre } from '../data/mockData';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Award,
  Layers,
  Map,
} from 'lucide-react';

export const TrainingCentreDirectory: React.FC = () => {
  const { trainingCentres } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMapModalCentre, setActiveMapModalCentre] = useState<TrainingCentre | null>(null);

  const categories = ['all', 'Esports', 'Football', 'Cricket', 'Badminton', 'Multi-Sport'];
  const states = ['all', 'Maharashtra', 'Karnataka', 'Telangana'];

  const filteredCentres = trainingCentres.filter((c) => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    if (selectedState !== 'all' && c.state !== selectedState) return false;
    if (
      searchQuery &&
      !c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.availableCourses.some((course) => course.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Directory Top Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12131f] via-[#101018] to-[#0d0d14] border border-[#27293d] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>OFFICIALLY ACCREDITED HIGH PERFORMANCE ACADEMIES</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-heading">
              Training Centre Directory
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
              Discover verified high-performance esports bootcamps and sanctioned sports academies. Each institution features documented accreditation evidence and certified coaches.
            </p>
          </div>

          <div className="bg-[#0b0c14] border border-emerald-500/30 rounded-xl p-3 text-xs max-w-xs shrink-0 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>VERIFICATION POLICY</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Arena Hub never lists unverified training academies. Accreditation licenses and federated affiliations are verified before publication.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 pt-5 border-t border-[#222436] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-zinc-400 mr-1 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Academy Type:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-[#151624] text-zinc-300 hover:bg-[#1d1f30] border border-[#2b2e46]'
                }`}
              >
                {cat === 'all' ? 'All Academies' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, cities..."
                className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All States</option>
              {states.filter((s) => s !== 'all').map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCentres.map((centre) => (
          <div
            key={centre.id}
            className="bg-[#10111c] border border-[#24273e] hover:border-amber-500/40 rounded-2xl p-6 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div>
              {/* Badge & Category */}
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <span className="text-[10px] font-mono uppercase bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold px-2 py-0.5 rounded">
                  {centre.category} ACADEMY
                </span>

                <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Credentials</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                {centre.name}
              </h3>

              <p className="text-xs text-zinc-400 flex items-center space-x-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{centre.address}, {centre.city}, {centre.state}</span>
              </p>
            </div>

            {/* Courses & Age Groups */}
            <div className="space-y-3 bg-[#0c0d15] p-4 rounded-xl border border-[#1e2030] text-xs">
              <div>
                <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Available Programs & Modules</span>
                </p>
                <ul className="space-y-1">
                  {centre.availableCourses.map((c, i) => (
                    <li key={i} className="text-zinc-300 flex items-start space-x-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#1d1f30] flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] text-zinc-400 font-semibold mr-1">Target Age Groups:</span>
                {centre.ageGroups.map((age, i) => (
                  <span key={i} className="bg-[#171926] text-zinc-300 px-2 py-0.5 rounded text-[10px]">
                    {age}
                  </span>
                ))}
              </div>
            </div>

            {/* Coach & Accreditation Evidence Note */}
            <div className="bg-[#151624]/60 border border-[#26283d] rounded-xl p-3 text-[11px] space-y-1.5">
              <div className="flex items-center space-x-1.5 text-zinc-300">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Leadership: <strong className="text-zinc-100">{centre.headCoachOrDirector}</strong></span>
              </div>
              <div className="flex items-start space-x-1.5 text-emerald-400/90 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Accreditation Evidence: <strong className="text-emerald-300">{centre.accreditationEvidence}</strong></span>
              </div>
            </div>

            {/* Verified Contact Details & Actions */}
            <div className="pt-2 border-t border-[#1d1f30] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5 text-zinc-400 text-[11px]">
                <p className="flex items-center space-x-1.5">
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span className="text-zinc-200 font-mono">{centre.verifiedContact.phone}</span>
                </p>
                <p className="flex items-center space-x-1.5">
                  <Mail className="w-3 h-3 text-amber-400" />
                  <span className="text-zinc-300 truncate">{centre.verifiedContact.email}</span>
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveMapModalCentre(centre)}
                  className="px-3 py-2 rounded-xl bg-[#171826] hover:bg-[#202235] border border-[#2b2d44] text-zinc-300 hover:text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Map className="w-3.5 h-3.5 text-amber-400" />
                  <span>Map & Facilities</span>
                </button>

                <a
                  href={centre.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
                >
                  <span>Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map & Facility Overview Modal */}
      {activeMapModalCentre && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11121d] border border-[#272a42] rounded-2xl max-w-xl w-full p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  VERIFIED TRAINING CAMPUS
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeMapModalCentre.name}
                </h3>
                <p className="text-xs text-zinc-400">
                  {activeMapModalCentre.address}, {activeMapModalCentre.city}, {activeMapModalCentre.state}
                </p>
              </div>
              <button
                onClick={() => setActiveMapModalCentre(null)}
                className="text-zinc-400 hover:text-white p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Stylized Interactive Map Preview */}
            <div className="h-48 rounded-xl bg-[#0b0c14] border border-[#222438] relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
              <div className="absolute inset-0 opacity-20 esports-grid-bg"></div>
              <div className="relative z-10 space-y-2">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center mx-auto text-amber-400 animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-zinc-200">
                  {activeMapModalCentre.name} Campus
                </p>
                <p className="text-[11px] text-zinc-400 max-w-xs">
                  {activeMapModalCentre.address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    activeMapModalCentre.name + ' ' + activeMapModalCentre.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-amber-400 hover:text-amber-300 text-xs font-semibold pt-1"
                >
                  <span>Open in Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Facilities List */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-amber-400 uppercase text-[11px]">Campus Facilities & Technology</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeMapModalCentre.facilities.map((f, i) => (
                  <div key={i} className="bg-[#161726] p-2.5 rounded-lg border border-[#24273d] text-zinc-300 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1e2030] text-xs text-zinc-400">
              <span>Office: {activeMapModalCentre.verifiedContact.officeHours}</span>
              <button
                onClick={() => setActiveMapModalCentre(null)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
