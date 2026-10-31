/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Tournament } from '../data/mockData';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Filter,
  Search,
  Bookmark,
  BookmarkCheck,
  Download,
  List,
  Grid,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const CompetitionCalendar: React.FC = () => {
  const { tournaments, userProfile, toggleSaveTournament } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sportFilter, setSportFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');

  // Month navigation for Month View
  const [currentMonth, setCurrentMonth] = useState<number>(10); // Nov 2026 is month index 10 (0-indexed)
  const [currentYear] = useState<number>(2026);

  const statesList = [
    'all',
    'National Online',
    'Delhi NCR',
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
    'Telangana',
    'West Bengal',
  ];

  const sportsList = [
    'all',
    'Free Fire MAX',
    'BGMI',
    'Valorant',
    'CS2',
    'Rocket League',
    'Cricket',
    'Football',
    'Basketball',
    'Badminton',
    'Volleyball',
    'Athletics',
    'Tennis',
  ];

  const filteredEvents = tournaments.filter((t) => {
    if (categoryFilter !== 'all' && t.type !== categoryFilter) return false;
    if (sportFilter !== 'all' && t.gameOrSport !== sportFilter) return false;
    if (stateFilter !== 'all' && t.state !== stateFilter) return false;
    if (
      searchQuery &&
      !t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.gameOrSport.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Generate .ics calendar download file
  const handleExportIcs = (event: Tournament) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Arena Hub//Esports & Sports Calendar//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description} | Reg Deadline: ${event.registrationDeadline} | Rule Citation: ${event.sourceCitation}
LOCATION:${event.location}
DTSTART:20261120T090000Z
DTEND:20261120T170000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Month grid days calculation
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Calendar Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12131f] via-[#101018] to-[#0d0d14] border border-[#27293d] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>COMPETITION SCHEDULE & TIMETABLE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-heading">
              Competition Calendar
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
              Track upcoming qualifiers, LAN finals, registration closing windows, and venue schedules across India.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-[#0b0c14] border border-[#23263b] p-1.5 rounded-xl shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Timeline List</span>
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'month'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Month Grid</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-6 pt-5 border-t border-[#222436] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Text search */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event name, venue..."
              className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Disciplines (Esports & Traditional)</option>
              <option value="esports">Esports Tournaments Only</option>
              <option value="traditional">Traditional Sports Cups Only</option>
            </select>
          </div>

          {/* Sport / Game filter */}
          <div>
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Sports & Games</option>
              {sportsList.filter((s) => s !== 'all').map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* State filter */}
          <div>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Regions / States</option>
              {statesList.filter((st) => st !== 'all').map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Month View or List View */}
      {viewMode === 'month' ? (
        <div className="bg-[#10111c] border border-[#222436] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f2133]">
            <h3 className="text-lg font-bold text-white font-heading">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
                className="p-1.5 rounded-lg bg-[#161726] hover:bg-[#1f2135] text-zinc-300"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))}
                className="p-1.5 rounded-lg bg-[#161726] hover:bg-[#1f2135] text-zinc-300"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-400 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[90px] bg-[#0c0d14]/40 rounded-lg p-1.5 opacity-30"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const dayEvents = tournaments.filter((t) => t.date === dateStr);

              return (
                <div
                  key={`day-${dayNum}`}
                  className="min-h-[90px] bg-[#0e0f18] hover:bg-[#131522] border border-[#1d1f30] rounded-lg p-1.5 flex flex-col justify-between transition-colors"
                >
                  <span className="text-[11px] font-mono font-bold text-zinc-400 text-left">{dayNum}</span>
                  <div className="space-y-1">
                    {dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded px-1.5 py-0.5 text-[9px] font-bold text-amber-300 truncate"
                        title={`${evt.title} (${evt.time})`}
                      >
                        {evt.gameOrSport}: {evt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Timeline List View */
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="bg-[#11121d] border border-[#222438] rounded-2xl p-12 text-center space-y-3">
              <CalendarIcon className="w-12 h-12 text-zinc-500 mx-auto" />
              <h3 className="text-base font-bold text-zinc-200">No scheduled events match your search criteria</h3>
              <p className="text-xs text-zinc-400">Try loosening your sport or region filters.</p>
            </div>
          ) : (
            filteredEvents.map((event) => {
              const isSaved = userProfile.savedTournamentIds.includes(event.id);

              return (
                <div
                  key={event.id}
                  className="bg-[#10111c] border border-[#22253b] hover:border-amber-500/40 rounded-2xl p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  {/* Left: Date Badge */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-[#171826] border border-amber-500/30 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-[10px] uppercase font-bold text-amber-400">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-2xl font-black text-white font-heading leading-none">
                        {event.date.split('-')[2]}
                      </span>
                      <span className="text-[9px] text-zinc-500">{event.time}</span>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase">
                          DEMO EVENT
                        </span>
                        <span className="bg-[#181a29] text-zinc-300 text-[11px] font-semibold px-2 py-0.5 rounded">
                          {event.gameOrSport}
                        </span>
                        <span className="text-[10px] text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded">
                          {event.teamFormat}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {event.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{event.location}</span>
                        </span>
                        <span>•</span>
                        <span>Reg Deadline: <strong className="text-rose-300">{event.registrationDeadline}</strong></span>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold">{event.prizePool}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#1c1e30]">
                    <button
                      onClick={() => handleExportIcs(event)}
                      className="p-2 rounded-xl bg-[#171826] hover:bg-[#202235] border border-[#2b2d44] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      title="Download Calendar (.ics) reminder"
                      aria-label="Download calendar event"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleSaveTournament(event.id)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-[#171826] hover:bg-[#202235] border-[#2b2d44] text-zinc-400 hover:text-white'
                      }`}
                      title={isSaved ? 'Saved to profile' : 'Save to My Competitions'}
                      aria-label="Save event"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <a
                      href={event.officialRegistrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-amber-500/20"
                    >
                      <span>Official Desk</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
