/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Gamepad2,
  Trophy,
  BookOpen,
  Calendar,
  Building2,
  GraduationCap,
  Bot,
  User,
  Lock,
  Menu,
  X,
  Search,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    globalSearch,
    setGlobalSearch,
    userProfile,
    isAdmin,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'esports', label: 'Esports', icon: Gamepad2 },
    { id: 'sports', label: 'Sports', icon: Trophy },
    { id: 'rules', label: 'Rules Library', icon: BookOpen },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'academies', label: 'Training Centres', icon: Building2 },
    { id: 'tutorials', label: 'Tutorials', icon: GraduationCap },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, isAi: true },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'admin', label: 'Admin', icon: Lock, isAdminOnly: true },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#222436] transition-all">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-amber-900/30 to-amber-950/60 border-b border-amber-500/20 px-4 py-1.5 text-xs text-amber-200/90 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">ARENA HUB VERIFIED</span>
          <span className="hidden sm:inline text-zinc-400">| Official Tournament Rules, Training Academies & Esports Calendar</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-amber-300 font-mono">DEMO ENVIRONMENT</span>
          <span className="text-zinc-400 hidden md:inline">English & தமிழ் Support</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group text-left focus:outline-none"
            aria-label="Arena Hub Home"
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-shadow">
              <div className="w-full h-full bg-[#0d0e15] rounded-[7px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-wider text-white font-heading">
                  ARENA<span className="text-amber-400">HUB</span>
                </span>
                <span className="bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold uppercase">PRO</span>
              </div>
              <p className="text-[10px] text-zinc-400 tracking-wider uppercase font-medium">Esports & Sports Ecosystem</p>
            </div>
          </button>

          {/* Quick Search Input */}
          <div className="hidden lg:flex items-center relative w-64 xl:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search tournaments, rules..."
              className="w-full bg-[#14151f] border border-[#2a2d42] text-zinc-200 text-xs rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-amber-500/60 transition-colors"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-2.5 text-zinc-400 hover:text-white text-xs"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                      : item.isAi
                      ? 'text-amber-300 hover:bg-amber-500/10 hover:text-amber-300'
                      : 'text-zinc-300 hover:bg-[#1a1b28] hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : item.isAi ? 'text-amber-400 animate-pulse' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                  {item.isAi && (
                    <Sparkles className="w-2.5 h-2.5 text-amber-400 ml-0.5" />
                  )}
                  {item.isAdminOnly && isAdmin && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Profile & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleNavClick('profile')}
              className="flex items-center space-x-2 bg-[#141520] hover:bg-[#1d1f2e] border border-[#27293d] rounded-lg p-1.5 sm:px-2.5 sm:py-1.5 transition-colors"
              aria-label="User Profile"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.nickname}
                className="w-7 h-7 rounded-md object-cover border border-amber-500/40"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-zinc-200 leading-tight truncate max-w-[100px]">{userProfile.nickname}</p>
                <p className="text-[10px] text-amber-400/80 leading-tight">{userProfile.role}</p>
              </div>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-[#141520] border border-[#27293d] text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0d0e16] border-b border-[#25283b] px-4 pt-3 pb-5 space-y-2">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search tournaments, rules, academies..."
              className="w-full bg-[#14151f] border border-[#2a2d42] text-zinc-200 text-xs rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all text-left ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'text-zinc-300 bg-[#12131e] hover:bg-[#1a1c2b]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
