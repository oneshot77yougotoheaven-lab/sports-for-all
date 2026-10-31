/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Tournament,
  RuleGuide,
  TrainingCentre,
  TutorialItem,
  INITIAL_TOURNAMENTS,
  RULE_GUIDES,
  TRAINING_CENTRES,
  TUTORIALS,
} from '../data/mockData';

export interface UserProfile {
  nickname: string;
  gamerTag: string;
  avatar: string;
  role: 'Gamer' | 'Athlete' | 'Coach' | 'Tournament Organizer' | 'Spectator';
  isMinor: boolean;
  hideContactInfo: boolean;
  favoriteGames: string[];
  favoriteSports: string[];
  favoriteTeams: string[];
  savedTournamentIds: string[];
  completedTutorialExerciseIds: string[];
  completedTutorialIds: string[];
}

export interface ReportedItem {
  id: string;
  targetTitle: string;
  reason: string;
  reportedBy: string;
  date: string;
  status: 'Pending Review' | 'Verified' | 'Dismissed';
}

interface AppContextType {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Search & Global filters
  globalSearch: string;
  setGlobalSearch: (s: string) => void;

  // Tournaments state
  tournaments: Tournament[];
  addTournament: (t: Omit<Tournament, 'id'>) => void;
  updateTournament: (id: string, updated: Partial<Tournament>) => void;
  deleteTournament: (id: string) => void;
  toggleSaveTournament: (id: string) => void;

  // Rules state
  ruleGuides: RuleGuide[];
  addRuleUpdate: (ruleId: string, updateNote: string, changelogDate: string) => void;

  // Training Centres
  trainingCentres: TrainingCentre[];
  addTrainingCentre: (c: Omit<TrainingCentre, 'id'>) => void;

  // Tutorials state
  tutorials: TutorialItem[];
  toggleTutorialExercise: (exerciseId: string) => void;
  markTutorialCompleted: (tutorialId: string) => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (p: Partial<UserProfile>) => void;

  // Admin Mode
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  adminCodeInput: string;
  setAdminCodeInput: (code: string) => void;
  verifyAdminCode: (code: string) => boolean;

  // Reports
  reportedItems: ReportedItem[];
  resolveReport: (id: string, newStatus: 'Verified' | 'Dismissed') => void;
  addReport: (targetTitle: string, reason: string) => void;

  // Assistant prompt prefill
  assistantInitialPrompt: string;
  setAssistantInitialPrompt: (prompt: string) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  nickname: 'ApexStriker',
  gamerTag: 'APEX#2026',
  avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
  role: 'Gamer',
  isMinor: false,
  hideContactInfo: true,
  favoriteGames: ['Free Fire MAX', 'BGMI', 'Valorant'],
  favoriteSports: ['Cricket', 'Football'],
  favoriteTeams: ['Team Soul', 'GodLike', 'Sentinels', 'Chennai Super Kings'],
  savedTournamentIds: ['esport-1', 'trad-1'],
  completedTutorialExerciseIds: ['ex-1', 'ex-10'],
  completedTutorialIds: ['tut-1'],
};

const INITIAL_REPORTS: ReportedItem[] = [
  {
    id: 'rep-1',
    targetTitle: 'Valorant South Asia Challengers Open [DEMO]',
    reason: 'Verification request for LAN spectator pass availability',
    reportedBy: 'user_vanguard99',
    date: '2026-10-30',
    status: 'Verified',
  },
  {
    id: 'rep-2',
    targetTitle: 'State Volleyball Spikers League [DEMO]',
    reason: 'Verify timing update from 15:00 to 16:00 IST',
    reportedBy: 'volleyball_ref_3',
    date: '2026-10-31',
    status: 'Pending Review',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [assistantInitialPrompt, setAssistantInitialPrompt] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminCodeInput, setAdminCodeInput] = useState<string>('');

  // Tournaments
  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    const saved = localStorage.getItem('arena_tournaments');
    return saved ? JSON.parse(saved) : INITIAL_TOURNAMENTS;
  });

  // Rule Guides
  const [ruleGuides, setRuleGuides] = useState<RuleGuide[]>(() => {
    const saved = localStorage.getItem('arena_rules');
    return saved ? JSON.parse(saved) : RULE_GUIDES;
  });

  // Training Centres
  const [trainingCentres, setTrainingCentres] = useState<TrainingCentre[]>(() => {
    const saved = localStorage.getItem('arena_centres');
    return saved ? JSON.parse(saved) : TRAINING_CENTRES;
  });

  // Tutorials
  const [tutorials] = useState<TutorialItem[]>(() => {
    const saved = localStorage.getItem('arena_tutorials');
    return saved ? JSON.parse(saved) : TUTORIALS;
  });

  // Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('arena_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // Reports
  const [reportedItems, setReportedItems] = useState<ReportedItem[]>(() => {
    const saved = localStorage.getItem('arena_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('arena_tournaments', JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem('arena_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('arena_reports', JSON.stringify(reportedItems));
  }, [reportedItems]);

  useEffect(() => {
    localStorage.setItem('arena_centres', JSON.stringify(trainingCentres));
  }, [trainingCentres]);

  useEffect(() => {
    localStorage.setItem('arena_rules', JSON.stringify(ruleGuides));
  }, [ruleGuides]);

  const addTournament = (t: Omit<Tournament, 'id'>) => {
    const newTournament: Tournament = {
      ...t,
      id: `custom-event-${Date.now()}`,
    };
    setTournaments((prev) => [newTournament, ...prev]);
  };

  const updateTournament = (id: string, updated: Partial<Tournament>) => {
    setTournaments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteTournament = (id: string) => {
    setTournaments((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleSaveTournament = (id: string) => {
    setUserProfile((prev) => {
      const exists = prev.savedTournamentIds.includes(id);
      const updated = exists
        ? prev.savedTournamentIds.filter((item) => item !== id)
        : [...prev.savedTournamentIds, id];
      return { ...prev, savedTournamentIds: updated };
    });
  };

  const addRuleUpdate = (ruleId: string, updateNote: string, changelogDate: string) => {
    setRuleGuides((prev) =>
      prev.map((r) =>
        r.id === ruleId
          ? {
              ...r,
              lastUpdatedDate: changelogDate,
              advancedRules: [
                `[Update: ${changelogDate}] ${updateNote}`,
                ...r.advancedRules,
              ],
            }
          : r
      )
    );
  };

  const addTrainingCentre = (c: Omit<TrainingCentre, 'id'>) => {
    const newCentre: TrainingCentre = {
      ...c,
      id: `tc-${Date.now()}`,
    };
    setTrainingCentres((prev) => [newCentre, ...prev]);
  };

  const toggleTutorialExercise = (exerciseId: string) => {
    setUserProfile((prev) => {
      const exists = prev.completedTutorialExerciseIds.includes(exerciseId);
      const updated = exists
        ? prev.completedTutorialExerciseIds.filter((id) => id !== exerciseId)
        : [...prev.completedTutorialExerciseIds, exerciseId];
      return { ...prev, completedTutorialExerciseIds: updated };
    });
  };

  const markTutorialCompleted = (tutorialId: string) => {
    setUserProfile((prev) => {
      if (prev.completedTutorialIds.includes(tutorialId)) return prev;
      return {
        ...prev,
        completedTutorialIds: [...prev.completedTutorialIds, tutorialId],
      };
    });
  };

  const updateUserProfile = (p: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...p }));
  };

  const verifyAdminCode = (code: string) => {
    if (code.trim().toUpperCase() === 'JOELFORAREASON') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const resolveReport = (id: string, newStatus: 'Verified' | 'Dismissed') => {
    setReportedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const addReport = (targetTitle: string, reason: string) => {
    const newReport: ReportedItem = {
      id: `rep-${Date.now()}`,
      targetTitle,
      reason,
      reportedBy: userProfile.nickname || 'anonymous_user',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Review',
    };
    setReportedItems((prev) => [newReport, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        globalSearch,
        setGlobalSearch,
        tournaments,
        addTournament,
        updateTournament,
        deleteTournament,
        toggleSaveTournament,
        ruleGuides,
        addRuleUpdate,
        trainingCentres,
        addTrainingCentre,
        tutorials,
        toggleTutorialExercise,
        markTutorialCompleted,
        userProfile,
        updateUserProfile,
        isAdmin,
        setIsAdmin,
        adminCodeInput,
        setAdminCodeInput,
        verifyAdminCode,
        reportedItems,
        resolveReport,
        addReport,
        assistantInitialPrompt,
        setAssistantInitialPrompt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
