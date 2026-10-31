/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TutorialItem } from '../data/mockData';
import {
  GraduationCap,
  Play,
  CheckSquare,
  Square,
  BookOpen,
  Filter,
  CheckCircle2,
  Clock,
  UserCheck,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const TutorialCentre: React.FC = () => {
  const {
    tutorials,
    userProfile,
    toggleTutorialExercise,
    markTutorialCompleted,
  } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTutorial, setActiveTutorial] = useState<TutorialItem>(tutorials[0]);

  const filteredTutorials = tutorials.filter((tut) => {
    if (selectedLevel !== 'all' && tut.level !== selectedLevel) return false;
    if (selectedCategory !== 'all' && tut.category !== selectedCategory) return false;
    return true;
  });

  // Calculate user overall progress
  const totalExercises = tutorials.reduce((acc, t) => acc + t.practiceExercises.length, 0);
  const completedExercises = userProfile.completedTutorialExerciseIds.length;
  const progressPercent = Math.min(100, Math.round((completedExercises / (totalExercises || 1)) * 100));

  const isCurrentTutorialCompleted = userProfile.completedTutorialIds.includes(activeTutorial.id);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#12131f] via-[#101018] to-[#0d0d14] border border-[#27293d] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>COACHING & MASTERY CURRICULUM</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white uppercase font-heading">
              Tutorial & Training Academy
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl">
              Tiered instructional modules for beginners to competitive professionals. Study tactical playbooks, execute verified drills, and track your athletic progress.
            </p>
          </div>

          {/* User Progress Widget */}
          <div className="bg-[#0b0c14] border border-amber-500/30 rounded-2xl p-4 min-w-[260px] space-y-2 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">Your Training Progress</span>
              <span className="font-mono text-amber-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#1c1d2c] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>{completedExercises} of {totalExercises} Drills Cleared</span>
              <span>{userProfile.completedTutorialIds.length} Modules Done</span>
            </div>
          </div>
        </div>

        {/* Level Filters */}
        <div className="mt-6 pt-5 border-t border-[#222436] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-zinc-400 mr-1 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Skill Level:</span>
            </span>
            {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-[#151624] text-zinc-300 hover:bg-[#1d1f30] border border-[#2b2e46]'
                }`}
              >
                {lvl === 'all' ? 'All Levels' : lvl}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-zinc-400">Domain:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#151624] border border-[#2b2e46] text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All (Esports & Sports)</option>
              <option value="esports">Esports Tutorials</option>
              <option value="traditional">Traditional Sports</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Split: Left Sidebar List / Right Full Lesson Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left List of Lessons */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1">
            Curated Masterclasses ({filteredTutorials.length})
          </h3>

          <div className="space-y-2">
            {filteredTutorials.map((tut) => {
              const isActive = activeTutorial.id === tut.id;
              const isDone = userProfile.completedTutorialIds.includes(tut.id);

              return (
                <button
                  key={tut.id}
                  onClick={() => setActiveTutorial(tut)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#171927] border-amber-500/60 shadow-lg shadow-amber-500/10'
                      : 'bg-[#10111c] hover:bg-[#141523] border-[#222438]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded font-bold">
                      {tut.level}
                    </span>
                    <span className="text-[11px] text-zinc-400 font-semibold">{tut.gameOrSport}</span>
                    {isDone && (
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  <h4 className={`text-xs font-bold transition-colors leading-snug line-clamp-2 ${
                    isActive ? 'text-amber-300' : 'text-zinc-200'
                  }`}>
                    {tut.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2 pt-2 border-t border-[#1d1f30]">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{tut.durationMinutes} mins</span>
                    </span>
                    <span className="text-zinc-400 truncate max-w-[140px]">{tut.author}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Lesson View */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#10111c] border border-[#222436] rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="space-y-3 pb-5 border-b border-[#1e2032]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded uppercase">
                  {activeTutorial.level} LEVEL
                </span>
                <span className="bg-[#191a29] text-zinc-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {activeTutorial.gameOrSport}
                </span>
                <span className="text-xs text-zinc-400 flex items-center space-x-1">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instructor: {activeTutorial.author}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                {activeTutorial.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeTutorial.summary}
              </p>
            </div>

            {/* Video Lesson Stage Preview */}
            <div className="relative rounded-2xl overflow-hidden bg-[#09090f] border border-[#26283d] aspect-video flex flex-col items-center justify-center p-6 text-center group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 pointer-events-none"></div>
              <div className="relative z-10 space-y-3 max-w-md">
                <div className="w-16 h-16 rounded-full bg-amber-500 text-black flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-black ml-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Interactive Tactical Video Guide</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Frame-by-frame breakdown of {activeTutorial.gameOrSport} mechanics, recoil control, and spatial positioning.
                  </p>
                </div>
                <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  <span>HD 1080p 60FPS Coaching Feed</span>
                </div>
              </div>
            </div>

            {/* Written Guide Steps */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                  Step-by-Step Tactical Guide
                </h3>
              </div>

              <div className="space-y-3">
                {activeTutorial.writtenGuideSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0d0e17] border border-[#1e2030] space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-100">{step.title}</h4>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed pl-8">
                      {step.explanation}
                    </p>
                    {step.proTip && (
                      <div className="ml-8 mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start space-x-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span><strong>Pro Tip:</strong> {step.proTip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Exercises & Drills */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                    Verified Practice Drills & Checklist
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-400">Click to check off verified completions</span>
              </div>

              <div className="space-y-2.5">
                {activeTutorial.practiceExercises.map((drill) => {
                  const isChecked = userProfile.completedTutorialExerciseIds.includes(drill.id);

                  return (
                    <button
                      key={drill.id}
                      onClick={() => toggleTutorialExercise(drill.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                          : 'bg-[#0d0e17] hover:bg-[#151624] border-[#1e2030] text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-zinc-500 shrink-0" />
                        )}
                        <span className={`text-xs ${isChecked ? 'line-through text-zinc-400' : 'text-zinc-200'}`}>
                          {drill.task}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-300 shrink-0">
                        Goal: {drill.targetMetric}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Finish Lesson Button */}
            <div className="pt-4 border-t border-[#1e2032] flex items-center justify-between">
              <p className="text-xs text-zinc-400">
                Completed all drills for this module? Mark as finished to earn profile badges.
              </p>
              <button
                onClick={() => markTutorialCompleted(activeTutorial.id)}
                disabled={isCurrentTutorialCompleted}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${
                  isCurrentTutorialCompleted
                    ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300 cursor-default'
                    : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20 cursor-pointer'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCurrentTutorialCompleted ? 'Module Completed' : 'Mark Module Complete'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
