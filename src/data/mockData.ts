/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Tournament {
  id: string;
  title: string;
  type: 'esports' | 'traditional';
  gameOrSport: string;
  organizer: string;
  organizerOfficialStatus: string;
  date: string;
  time: string;
  location: string;
  formatType: 'Online' | 'LAN' | 'Hybrid';
  teamFormat: 'Squad (4v4)' | '5v5' | '11-a-side' | 'Solo' | 'Doubles' | 'Open Roster';
  entryRequirements: string;
  ageEligibility: string;
  registrationDeadline: string;
  officialRegistrationUrl: string;
  prizePool: string;
  isPrizeConfirmed: boolean;
  isDemo: boolean;
  status: 'Open' | 'Closing Soon' | 'Live' | 'Completed';
  state?: string;
  city?: string;
  sourceCitation: string;
  bannerImage: string;
  description: string;
}

export interface RuleGuide {
  id: string;
  key: string;
  name: string;
  category: 'esports' | 'traditional';
  officialSource: string;
  sourceUrl: string;
  lastUpdatedDate: string;
  iconName: string;
  basicRules: string[];
  advancedRules: string[];
  playerPositions: { title: string; role: string; keyDuties: string }[];
  teamSizes: string;
  scoringSystem: string;
  foulsAndPenalties: string[];
  tournamentFormats: string[];
  fairPlayAndSportsmanship: string[];
}

export interface TrainingCentre {
  id: string;
  name: string;
  category: 'Esports' | 'Football' | 'Cricket' | 'Badminton' | 'Athletics' | 'Basketball' | 'Multi-Sport';
  address: string;
  city: string;
  state: string;
  country: string;
  availableCourses: string[];
  ageGroups: string[];
  verifiedContact: {
    phone: string;
    email: string;
    officeHours: string;
  };
  officialWebsite: string;
  facilities: string[];
  headCoachOrDirector: string;
  accreditationEvidence: string;
  isVerified: boolean;
  rating: number;
}

export interface TutorialItem {
  id: string;
  title: string;
  gameOrSport: string;
  category: 'esports' | 'traditional';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  author: string;
  videoUrlPlaceholder: string;
  summary: string;
  writtenGuideSteps: { title: string; explanation: string; proTip?: string }[];
  practiceExercises: { id: string; task: string; targetMetric: string }[];
}

export const INITIAL_TOURNAMENTS: Tournament[] = [
  // Esports
  {
    id: 'esport-1',
    title: 'Free Fire MAX National Championship 2026 [DEMO]',
    type: 'esports',
    gameOrSport: 'Free Fire MAX',
    organizer: 'Garena Esports Community Division',
    organizerOfficialStatus: 'Official Tournament Circuit Demo',
    date: '2026-11-20',
    time: '14:00 IST',
    location: 'Online Tournament Server',
    formatType: 'Online',
    teamFormat: 'Squad (4v4)',
    entryRequirements: 'Minimum Level 40 in-game account, Diamond tier or above in BR-Ranked season.',
    ageEligibility: '16+ years old (Minors 16-17 require verifiable legal guardian consent form).',
    registrationDeadline: '2026-11-15',
    officialRegistrationUrl: 'https://ff.garena.com/esports/demo-registration',
    prizePool: '₹25,00,000 INR (Confirmed Official Prize Pool)',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Open',
    state: 'National Online',
    city: 'All India',
    sourceCitation: 'Garena FFWS 2026 Official Rulebook Section 4.2',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    description: 'Premier national Battle Royale showcase with FFWS 12-point scoring system and anti-cheat client inspection.'
  },
  {
    id: 'esport-2',
    title: 'BGMI Champions Invitational Series [DEMO]',
    type: 'esports',
    gameOrSport: 'BGMI',
    organizer: 'Krafton India Esports League',
    organizerOfficialStatus: 'Sanctioned Esports Invitational Demo',
    date: '2026-11-28',
    time: '16:00 IST',
    location: 'LAN Finals - Indira Gandhi Arena, New Delhi',
    formatType: 'LAN',
    teamFormat: 'Squad (4v4)',
    entryRequirements: 'Account Level 35+, Crown rank in current squad season, Government ID verification at venue.',
    ageEligibility: '16+ years old with parent/guardian consent affidavit.',
    registrationDeadline: '2026-11-10',
    officialRegistrationUrl: 'https://esports.battlegroundsmobileindia.com/demo-entry',
    prizePool: '₹50,00,000 INR (Confirmed Official Prize Pool)',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Closing Soon',
    state: 'Delhi NCR',
    city: 'New Delhi',
    sourceCitation: 'Krafton Esports Official Rulebook v4.1',
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    description: '32 top tier squads battle across Erangel, Miramar, and Sanhok using the official 10-point scoring matrix.'
  },
  {
    id: 'esport-3',
    title: 'Valorant South Asia Challengers Open [DEMO]',
    type: 'esports',
    gameOrSport: 'Valorant',
    organizer: 'Riot Games & NODWIN Gaming',
    organizerOfficialStatus: 'Riot Games Tier-2 Registered Circuit Demo',
    date: '2026-12-05',
    time: '18:00 IST',
    location: 'Mumbai Arena LAN Stage & Online Qualifiers',
    formatType: 'Hybrid',
    teamFormat: '5v5',
    entryRequirements: 'Rank Ascendant 1 or higher in Episode 9, clean Riot Vanguard compliance status.',
    ageEligibility: '16+ years old. All players must sign Riot Games participant code of conduct.',
    registrationDeadline: '2026-11-25',
    officialRegistrationUrl: 'https://valorantesports.com/vct-challengers-demo',
    prizePool: '₹15,00,000 INR (Confirmed Official Prize Pool)',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Open',
    state: 'Maharashtra',
    city: 'Mumbai',
    sourceCitation: 'VCT Global Competition Policy 2026',
    bannerImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    description: 'Double elimination 5v5 tactical shooter tournament with standard MR12 regulation and overtime format.'
  },
  {
    id: 'esport-4',
    title: 'Counter-Strike 2 Masters Cup [DEMO]',
    type: 'esports',
    gameOrSport: 'CS2',
    organizer: 'ESL Challenger Partner League',
    organizerOfficialStatus: 'ESL Pro Tour Demo Qualifier',
    date: '2026-12-12',
    time: '17:00 IST',
    location: 'Bengaluru Tech Expo Centre',
    formatType: 'LAN',
    teamFormat: '5v5',
    entryRequirements: 'CS2 Premier Rating 15,000+ or Faceit Level 8+. Clean VAC history.',
    ageEligibility: '16+ years old.',
    registrationDeadline: '2026-12-01',
    officialRegistrationUrl: 'https://pro.eslgaming.com/cs2/demo',
    prizePool: '₹10,00,000 INR (Confirmed Official Prize Pool)',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Open',
    state: 'Karnataka',
    city: 'Bengaluru',
    sourceCitation: 'ESL CS2 Rulebook Section 2.4',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description: 'Premier MR12 CS2 competition with official map vetoes (Dust II, Mirage, Inferno, Nuke, Anubis, Ancient).'
  },
  {
    id: 'esport-5',
    title: 'Rocket League 3v3 Apex Trophy [DEMO]',
    type: 'esports',
    gameOrSport: 'Rocket League',
    organizer: 'Psyonix Community Circuit',
    organizerOfficialStatus: 'Official Community Sanction Demo',
    date: '2026-11-18',
    time: '19:00 IST',
    location: 'Online Asia-Pacific Server',
    formatType: 'Online',
    teamFormat: 'Open Roster',
    entryRequirements: 'Cross-platform enabled, Champion rank minimum.',
    ageEligibility: '13+ with guardian consent.',
    registrationDeadline: '2026-11-12',
    officialRegistrationUrl: 'https://esports.rocketleague.com/demo',
    prizePool: '₹3,00,000 INR (Confirmed Official Prize Pool)',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Closing Soon',
    state: 'Online',
    city: 'Online',
    sourceCitation: 'Psyonix RLCS Official Rules',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'High-speed 3v3 aerial vehicular soccer tournament played in standard 5-minute regulation matches.'
  },

  // Traditional Sports
  {
    id: 'trad-1',
    title: 'All-India Inter-Club T20 Trophy 2026 [DEMO]',
    type: 'traditional',
    gameOrSport: 'Cricket',
    organizer: 'State Cricket Association Affiliate',
    organizerOfficialStatus: 'Affiliated State Association Demo',
    date: '2026-11-22',
    time: '09:00 IST',
    location: 'M. Chinnaswamy Stadium, Bengaluru',
    formatType: 'LAN',
    teamFormat: '11-a-side',
    entryRequirements: 'Affiliated club registration ID, standard white ball kits, medical clearance certificate.',
    ageEligibility: 'Open Category (Under-19 and Senior Divisions).',
    registrationDeadline: '2026-11-14',
    officialRegistrationUrl: 'https://bcci.tv/domestic-cricket-demo',
    prizePool: 'Trophy + ₹5,00,000 INR Club Development Grant',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Open',
    state: 'Karnataka',
    city: 'Bengaluru',
    sourceCitation: 'MCC Laws of Cricket & BCCI T20 Playing Conditions 2026',
    bannerImage: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=800&q=80',
    description: 'Official 20-over white ball cricket tournament adhering strictly to MCC laws and ICC standard playing conditions.'
  },
  {
    id: 'trad-2',
    title: 'Premier State Youth Football Cup [DEMO]',
    type: 'traditional',
    gameOrSport: 'Football',
    organizer: 'All India Football Federation Affiliate',
    organizerOfficialStatus: 'AIFF Sanctioned Youth League Demo',
    date: '2026-11-30',
    time: '07:30 IST',
    location: 'Cooperage Football Ground, Mumbai',
    formatType: 'LAN',
    teamFormat: '11-a-side',
    entryRequirements: 'AIFF CRS Player ID registration, Shin guards mandatory, medical team sign-off.',
    ageEligibility: 'Under-18 (Born on or after Jan 1, 2008).',
    registrationDeadline: '2026-11-18',
    officialRegistrationUrl: 'https://the-aiff.com/competitions-demo',
    prizePool: 'Medals + ₹3,50,000 INR Team Training Sponsorship',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Open',
    state: 'Maharashtra',
    city: 'Mumbai',
    sourceCitation: 'IFAB Laws of the Game 2026/27 Edition',
    bannerImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    description: 'Full 90-minute regulation football matches conducted under official IFAB guidelines with qualified state referees.'
  },
  {
    id: 'trad-3',
    title: 'Metro 3x3 & 5v5 Basketball Championship [DEMO]',
    type: 'traditional',
    gameOrSport: 'Basketball',
    organizer: 'Basketball Federation District Committee',
    organizerOfficialStatus: 'FIBA Affiliated District Demo',
    date: '2026-12-08',
    time: '10:00 IST',
    location: 'Jawaharlal Nehru Indoor Stadium, Chennai',
    formatType: 'LAN',
    teamFormat: '5v5',
    entryRequirements: 'Verified government school/college ID or district association club card.',
    ageEligibility: 'Under-21 and Open Divisions.',
    registrationDeadline: '2026-11-27',
    officialRegistrationUrl: 'https://fiba.basketball/demo-championship',
    prizePool: '₹2,00,000 INR (Confirmed Official Prize Pool)',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Open',
    state: 'Tamil Nadu',
    city: 'Chennai',
    sourceCitation: 'FIBA Official Basketball Rules 2026',
    bannerImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    description: '4-quarter 10-minute FIBA clock matches with 24-second shot clocks and FIBA certified scorekeepers.'
  },
  {
    id: 'trad-4',
    title: 'Grandmaster Badminton Open Singles & Doubles [DEMO]',
    type: 'traditional',
    gameOrSport: 'Badminton',
    organizer: 'Badminton Association District Council',
    organizerOfficialStatus: 'BAI District Sanctioned Open Demo',
    date: '2026-12-15',
    time: '08:30 IST',
    location: 'GMC Balayogi Sports Complex, Hyderabad',
    formatType: 'LAN',
    teamFormat: 'Doubles',
    entryRequirements: 'BWF standard equipment, non-marking indoor court shoes mandatory.',
    ageEligibility: 'Under-17, Under-19, and Men/Women Open Categories.',
    registrationDeadline: '2026-12-05',
    officialRegistrationUrl: 'https://badmintonindia.org/events-demo',
    prizePool: '₹4,00,000 INR (Confirmed Official Prize Pool)',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Open',
    state: 'Telangana',
    city: 'Hyderabad',
    sourceCitation: 'BWF Statutes Section 4: Laws of Badminton',
    bannerImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    description: 'Best-of-3 sets to 21 points with 30-point golden cap under official BWF rally point rules.'
  },
  {
    id: 'trad-5',
    title: 'State Volleyball Spikers League [DEMO]',
    type: 'traditional',
    gameOrSport: 'Volleyball',
    organizer: 'State Volleyball Association',
    organizerOfficialStatus: 'FIVB Sanctioned State League Demo',
    date: '2026-11-26',
    time: '15:00 IST',
    location: 'Netaji Indoor Stadium, Kolkata',
    formatType: 'LAN',
    teamFormat: 'Squad (4v4)',
    entryRequirements: 'Registered district club or university sports quota player.',
    ageEligibility: 'Open category.',
    registrationDeadline: '2026-11-16',
    officialRegistrationUrl: 'https://fivb.com/competitions-demo',
    prizePool: '₹2,50,000 INR (Confirmed Official Prize Pool)',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Closing Soon',
    state: 'West Bengal',
    city: 'Kolkata',
    sourceCitation: 'FIVB Official Volleyball Rules 2025-2028',
    bannerImage: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    description: '5-set FIVB regulation indoor volleyball with libero rotations and official antennae boundaries.'
  },
  {
    id: 'trad-6',
    title: 'National Junior Athletics Sprint & Field Meet [DEMO]',
    type: 'traditional',
    gameOrSport: 'Athletics',
    organizer: 'Athletics Federation District Board',
    organizerOfficialStatus: 'World Athletics Affiliated Youth Demo',
    date: '2026-12-18',
    time: '06:30 IST',
    location: 'Jawaharlal Nehru Stadium, New Delhi',
    formatType: 'LAN',
    teamFormat: 'Solo',
    entryRequirements: 'Affiliated state body timing slip, spikes under 9mm for synthetic track.',
    ageEligibility: 'Under-16 and Under-20 divisions.',
    registrationDeadline: '2026-12-08',
    officialRegistrationUrl: 'https://indianathletics.in/demo-meet',
    prizePool: 'Medals & State Athletic Scholarships',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Open',
    state: 'Delhi NCR',
    city: 'New Delhi',
    sourceCitation: 'World Athletics Technical and Competition Rules Book C',
    bannerImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    description: '100m, 200m, 400m, Long Jump, High Jump, and Shot Put governed by World Athletics standards.'
  },
  {
    id: 'trad-7',
    title: 'Hardcourt Masters Tennis Cup [DEMO]',
    type: 'traditional',
    gameOrSport: 'Tennis',
    organizer: 'All India Tennis Association Affiliate',
    organizerOfficialStatus: 'AITA Talent Series Ranking Demo',
    date: '2026-12-20',
    time: '08:00 IST',
    location: 'DLTA Tennis Complex, New Delhi',
    formatType: 'LAN',
    teamFormat: 'Solo',
    entryRequirements: 'AITA Registration number, ITF approved balls provided at venue.',
    ageEligibility: 'Under-18 & Men Open Categories.',
    registrationDeadline: '2026-12-10',
    officialRegistrationUrl: 'https://aitatennis.com/demo-events',
    prizePool: '₹3,00,000 INR + National Ranking Points',
    isPrizeConfirmed: true,
    isDemo: true,
    status: 'Open',
    state: 'Delhi NCR',
    city: 'New Delhi',
    sourceCitation: 'ITF Rules of Tennis 2026 Edition',
    bannerImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
    description: 'Singles knockouts with 7-point tiebreak at 6-all in first two sets and 10-point match tiebreak in final set.'
  }
];

export const RULE_GUIDES: RuleGuide[] = [
  {
    id: 'rule-ff',
    key: 'freefire',
    name: 'Free Fire MAX',
    category: 'esports',
    officialSource: 'Garena Free Fire World Series (FFWS) Official Competitive Rulebook',
    sourceUrl: 'https://ff.garena.com/esports/rules',
    lastUpdatedDate: 'October 2026 (v8.4)',
    iconName: 'Flame',
    basicRules: [
      'Squads of 4 players drop onto Bermuda, Purgatory, Alpine, or NexTerra without initial weapons.',
      'A shrinking Safe Zone (Playzone) forces surviving teams into tighter combat boundaries over time.',
      'Damage outside the Safe Zone increases progressively each zone circle.',
      'Last team standing wins the Booyah and earns maximum placement points (12 points).',
      'Each confirmed opponent elimination awards 1 kill point to the squad total.'
    ],
    advancedRules: [
      'Gloo Wall limits: Maximum 2-3 walls placed consecutively before shield decay timers trigger.',
      'Skill Cooldowns: Active character abilities (e.g., Alok, Chrono, K) cannot be triggered while suffering EMP blast effects.',
      'Spectator delay: Official tournament streams must operate on minimum 3-minute broadcast delay.',
      'Third-party software, rooting/jailbreaking, and macros strictly cause immediate lifetime disqualification.'
    ],
    playerPositions: [
      { title: 'IGL (In-Game Leader)', role: 'Strategy & Rotations', keyDuties: 'Calls zone entries, drop locations, and team retreats.' },
      { title: 'Fragger / Assaulter', role: 'Entry Damage', keyDuties: 'Leads close-quarters combat with SMGs and ARs, breaks enemy Gloo walls.' },
      { title: 'Sniper / Support', role: 'Long-Range & Flank Watch', keyDuties: 'Suppresses enemies from high ground with AWM/M82B, watches blind rotations.' },
      { title: 'Medic / Anchor', role: 'Team Survivability', keyDuties: 'Carries revive kits, medkits, smoke grenades, and provides cover fire.' }
    ],
    teamSizes: '4 active squad members + up to 2 registered substitute players',
    scoringSystem: 'Official FFWS 12-point matrix: 1st: 12pts, 2nd: 9pts, 3rd: 8pts, 4th: 7pts, 5th: 6pts, 6th: 5pts, 7th: 4pts, 8th: 3pts, 9th: 2pts, 10th: 1pt, 11th-12th: 0pts. Plus 1pt per elimination.',
    foulsAndPenalties: [
      'Teaming / Collusion: Immediate forfeiture of all tournament points and 1-year circuit ban.',
      'Hardware manipulation or custom APKs: Permanent global hardware-ID ban.',
      'Unsportsmanlike conduct in match chat: Warning 1, deduction of 3 tournament points on Repeat.'
    ],
    tournamentFormats: [
      'Battle Royale Group Stage: 6 to 8 matches per matchday rotated across official maps.',
      'Point Matrix cumulative ranking across matchdays with Booyah count serving as primary tiebreaker.',
      'Grand Finals: Top 12 teams compete in 6-round championship bracket.'
    ],
    fairPlayAndSportsmanship: [
      'Mandatory pre-match camera check and screen recording at official LAN and verified online events.',
      'No intentional bug exploitation (e.g. clipping under map structures or vehicle invincibility glitches).'
    ]
  },
  {
    id: 'rule-bgmi',
    key: 'bgmi',
    name: 'BGMI (Battlegrounds Mobile India)',
    officialSource: 'Krafton India Esports Standard Competition Rulebook (BGIS / BMPS)',
    sourceUrl: 'https://esports.battlegroundsmobileindia.com/rules',
    lastUpdatedDate: 'September 2026 (v4.2)',
    category: 'esports',
    iconName: 'Crosshair',
    basicRules: [
      '16 squads (64 players total) parachute into 8x8km (Erangel, Miramar) or 4x4km (Sanhok) maps.',
      'Blue Zone restricts playable map area at timed intervals, dealing lethal damage outside.',
      'Weapons, body armor (Lv 1-3), helmets, attachments, and medical supplies are scavenged on the ground.',
      'Last remaining squad earns "Winner Winner Chicken Dinner" (WWCD) and 10 placement points.',
      'Each confirmed kill yields 1 elimination point.'
    ],
    advancedRules: [
      'Krafton 10-Point Scoring Matrix replaces the legacy 15-point system: 1st: 10pts, 2nd: 6pts, 3rd: 5pts, 4th: 4pts, 5th: 3pts, 6th: 2pts, 7th: 1pt, 8th+: 0pts.',
      'Vehicle damage physics: Exploding vehicles eliminate all occupants instantly.',
      'Hard drop protocol: Players must land within 2 minutes of plane departure or face penalty.',
      'Red Zone (artillery bombing) is strictly disabled in all official tournament custom rooms.'
    ],
    playerPositions: [
      { title: 'IGL (In-Game Leader)', role: 'Tactical Command', keyDuties: 'Vehicle management, split rotations, compound crash calls.' },
      { title: 'Entry Fragger', role: 'Breacher', keyDuties: 'First through doors, clears blind angles with aggressive M416/Beryl 762 sprays.' },
      { title: 'DMR / Sniper Support', role: 'Marksman', keyDuties: 'Long range picks with Mini14, SLR, or bolt action snipers.' },
      { title: 'Filter / Utility Specialist', role: 'Crowd Control', keyDuties: 'Carries 4+ smokes and 3+ frags for zone crosses and squad revives.' }
    ],
    teamSizes: '4 active squad members + 1 mandatory substitute',
    scoringSystem: 'Official 10-Point System: 1st: 10, 2nd: 6, 3rd: 5, 4th: 4, 5th: 3, 6th: 2, 7th: 1, 8th-16th: 0 points. Each kill = 1 point.',
    foulsAndPenalties: [
      'Use of emulators or unauthorized iPads (must play on verified smartphone displays): Immediate match disqualification.',
      'Intentionally leaving match before full squad elimination: Loss of all match points.',
      'Stream sniping or unauthorized voice communications during match: 6-month ban.'
    ],
    tournamentFormats: [
      'Round Robin League Stages (Top 32 split into groups A, B, C, D).',
      'Semi-Finals & Grand Finals: 18 matches played across 3 consecutive days.'
    ],
    fairPlayAndSportsmanship: [
      'All players must use official anti-cheat clients and provide referee webcam feeds.',
      'Respectful communication towards opposing players and referees at all times.'
    ]
  },
  {
    id: 'rule-valorant',
    key: 'valorant',
    name: 'Valorant',
    officialSource: 'Riot Games VCT Global Competition Policy & Official Rulebook',
    sourceUrl: 'https://valorantesports.com/rules',
    lastUpdatedDate: 'September 2026',
    category: 'esports',
    iconName: 'Shield',
    basicRules: [
      'Two teams of 5 players compete as Attackers or Defenders on competitive maps.',
      'Regulation consists of 24 rounds (MR12): 12 rounds on Attack, 12 on Defense.',
      'First team to win 13 rounds wins the map.',
      'If score reaches 12-12, Overtime (Win by 2) begins, with alternating attack/defense rounds and 5,000 Creds each.',
      'Attackers win by eliminating all defenders or successfully detonating the Spike (45 second detonation timer).',
      'Defenders win by defusing the Spike (7 seconds total, 3.5s half-defuse checkpoint) or eliminating all attackers before plant.'
    ],
    advancedRules: [
      'Tactical timeouts: Each team is allowed two 60-second tactical timeouts per map.',
      'Economy resets: Loss bonuses cap at 2,900 Creds after 3 consecutive round losses.',
      'Map vetoes: Best-of-3 format follows Ban-Ban-Pick-Pick-Ban-Ban-Decider sequence.',
      'Agent limits: Exactly 1 instance of any Agent per team roster (no duplicate agents on the same team).'
    ],
    playerPositions: [
      { title: 'Duelist (e.g. Jett, Raze)', role: 'Entry Fragger', keyDuties: 'Creates space on sites, takes aggressive first duels.' },
      { title: 'Initiator (e.g. Sova, Fade, Breach)', role: 'Information & Flashes', keyDuties: 'Gathers reconnaissance and displaces defenders with utility.' },
      { title: 'Controller (e.g. Omen, Viper)', role: 'Line of Sight Blocker', keyDuties: 'Deploys vision-blocking smokes to isolate angles and facilitate plants.' },
      { title: 'Sentinel (e.g. Killjoy, Cypher)', role: 'Site Lockdown & Flank Guard', keyDuties: 'Sets traps, prevents backstabs, delays enemy site pushes.' }
    ],
    teamSizes: '5 active players + 1 coach + 1 reserve substitute',
    scoringSystem: 'Match win by rounds: First to 13 rounds (regulation) or 2 rounds clear in Overtime.',
    foulsAndPenalties: [
      'Ghosting or sharing screen info: Forfeit of map and potential season suspension.',
      'Exploiting unintentional geometry bugs (pixel-walking): Round rewound or forfeited.',
      'Toxic behavior or hate speech: Fines and match suspensions according to Riot VCT Code.'
    ],
    tournamentFormats: [
      'GSL Dual Tournament / Double Elimination bracket with Upper and Lower finals.',
      'Swiss System Stage for 16-team international events.'
    ],
    fairPlayAndSportsmanship: [
      'Players must shake hands/fist bump after match conclusion.',
      'Headsets and white noise generators must remain on during all live rounds.'
    ]
  },
  {
    id: 'rule-cricket',
    key: 'cricket',
    name: 'Cricket (T20 & Limited Overs)',
    officialSource: 'MCC Laws of Cricket (2017 Code 3rd Edition - 2026 update) & ICC Playing Conditions',
    sourceUrl: 'https://www.lords.org/mcc/the-laws-of-cricket',
    lastUpdatedDate: 'August 2026',
    category: 'traditional',
    iconName: 'Trophy',
    basicRules: [
      'Two teams of 11 players each. One team bats to score runs while the other fields and bowls.',
      'A standard over consists of 6 legal deliveries bowled from one end of the 22-yard pitch.',
      'Batters can be dismissed in 10 legal ways (Bowled, Caught, LBW, Run Out, Stumped, Hit Wicket, etc.).',
      'The fielding team must maintain required field restrictions (e.g. Powerplay limits: max 2 fielders outside 30-yard circle in overs 1-6 of a T20).',
      'A match is won by the team scoring the most runs within their allotted overs or before losing 10 wickets.'
    ],
    advancedRules: [
      'Duckworth-Lewis-Stern (DLS) method is applied for rain-curtailed limited overs matches to revise target scores.',
      'Stop-Clock Rule: The fielding team must be ready to bowl the next over within 60 seconds; two warnings before a 5-run penalty.',
      'Concussion Substitute: Must be a like-for-like player approved by the ICC Match Referee.',
      'Super Over: In tie games, each team plays a 1-over tiebreaker (2 wickets max) to determine the victor.'
    ],
    playerPositions: [
      { title: 'Opening Batters (1 & 2)', role: 'Foundation', keyDuties: 'Face new ball swinging attacks, exploit powerplay fielding restrictions.' },
      { title: 'Middle Order (3, 4, 5)', role: 'Anchor & Acceleration', keyDuties: 'Stabilize innings, build partnerships against spin and medium pace.' },
      { title: 'All-Rounder / Finisher (6 & 7)', role: 'Dynamic Striker', keyDuties: 'Score rapid boundaries in death overs (overs 16-20) and bowl 2-4 crucial overs.' },
      { title: 'Wicketkeeper', role: 'Stumper & Captaincy Eye', keyDuties: 'Stumps, takes edge catches, guides field placement and DRS reviews.' },
      { title: 'Specialist Bowlers (Fast & Spin)', role: 'Wicket Takers', keyDuties: 'Deliver yorkers, bouncers, googlies, and maintain low economy rates.' }
    ],
    teamSizes: '11 on-field players + 1 nominated Impact Player / Concussion reserve + up to 4 substitutes',
    scoringSystem: 'Runs scored via physical running (1, 2, 3), boundaries (4 runs on ground, 6 runs over rope on full), and extras (wides, no-balls, byes, leg-byes).',
    foulsAndPenalties: [
      'Beamers (waist-high full toss): Immediate No-Ball, warning, repeated offense results in removal of bowler from bowling for match.',
      'Ball tampering: 5 penalty runs awarded to opponents, ball replaced, ball condition report submitted to ICC.',
      'Slow over rate: 1 additional fielder forced inside the 30-yard circle for remaining overs.'
    ],
    tournamentFormats: [
      'Round Robin League with Net Run Rate (NRR) tie-breaker.',
      'Page-Playoff system (Qualifier 1, Eliminator, Qualifier 2, Final).'
    ],
    fairPlayAndSportsmanship: [
      'Spirit of Cricket preamble in MCC laws mandates respect for umpires and opposing players.',
      'Strict adherence to DRS review timings (15 second limit).'
    ]
  },
  {
    id: 'rule-football',
    key: 'football',
    name: 'Football (Soccer)',
    officialSource: 'IFAB (International Football Association Board) Laws of the Game 2026/27',
    sourceUrl: 'https://www.theifab.com/laws-of-the-game/',
    lastUpdatedDate: 'July 2026',
    category: 'traditional',
    iconName: 'Activity',
    basicRules: [
      'Played between two teams of 11 players each, including one goalkeeper per team.',
      'Standard match duration is two equal halves of 45 minutes plus referee injury stoppage time.',
      'A goal is scored when the entire ball crosses the goal line between the goalposts and under the crossbar.',
      'Players (except goalkeepers inside their penalty area) cannot deliberately touch the ball with hands or arms.',
      'Law 11 (Offside): Player nearer to opponent goal line than ball and second-last opponent at moment of pass, interfering with play.'
    ],
    advancedRules: [
      'VAR (Video Assistant Referee) Protocol: Can only review 4 match-changing categories: Goals, Penalty decisions, Direct Red Cards, and Mistaken Identity.',
      'Semi-Automated Offside Technology (SAOT) tracks 29 player data points 50 times per second.',
      'Concussion substitutes: Up to two additional permanent concussion substitutions permitted outside regular 5-sub limits.',
      'Captain-only referee dialogue protocol: Only the team captain may approach the referee on contentious decisions.'
    ],
    playerPositions: [
      { title: 'Goalkeeper', role: 'Last Line of Defense', keyDuties: 'Shot stopping, aerial claims, commanding penalty box, initiating build-up.' },
      { title: 'Centre Backs (CB)', role: 'Central Defense', keyDuties: 'Tackles, aerial clearances, marking strikers, blocking shots.' },
      { title: 'Full Backs / Wing Backs (LB/RB)', role: 'Flank Defense & Width', keyDuties: 'Tracking wingers, overlapping on offense, delivering crosses into box.' },
      { title: 'Central Midfielders (CDM/CAM)', role: 'Engine Room', keyDuties: 'Distributing passes, breaking counterattacks, controlling tempo.' },
      { title: 'Strikers / Centre Forwards (ST)', role: 'Primary Goalscorers', keyDuties: 'Finishing in the box, hold-up play, pressing opponent defenders.' }
    ],
    teamSizes: '11 on the pitch + maximum 12 substitutes named on team sheet (5 substitutions in 3 windows)',
    scoringSystem: '1 point per valid goal scored. League standings award 3 points for a win, 1 point for a draw, 0 points for a loss.',
    foulsAndPenalties: [
      'Direct Free Kick: Awarded for reckless tackles, tripping, holding, or deliberate handball (Penalty kick if inside box).',
      'Yellow Card (Caution): Unsporting behaviour, dissent, tactical foul stopping promising attack.',
      'Red Card (Send-off): Serious foul play, violent conduct, spitting, denying an obvious goalscoring opportunity (DOGSO).'
    ],
    tournamentFormats: [
      'Group Stage followed by Single-Leg Knockouts.',
      'Knockout ties tied after 90 minutes proceed to two 15-minute Extra Time periods, then Penalty Shootout (Kicks from penalty mark).'
    ],
    fairPlayAndSportsmanship: [
      'No feigning injury or simulation (diving); punished by immediate yellow card.',
      'Fair play handshakes before and after match, respect for match officials.'
    ]
  },
  {
    id: 'rule-badminton',
    key: 'badminton',
    name: 'Badminton',
    officialSource: 'Badminton World Federation (BWF) Statutes - Section 4: Laws of Badminton',
    sourceUrl: 'https://corporate.bwfbadminton.com/statutes/',
    lastUpdatedDate: 'May 2026',
    category: 'traditional',
    iconName: 'Zap',
    basicRules: [
      'Rally point scoring: Points can be won regardless of who is serving.',
      'A match consists of the best of 3 games of 21 points each.',
      'If the score reaches 20-20, the side gaining a 2-point lead first wins the game (e.g., 22-20).',
      'If the score reaches 29-29, the side scoring the 30th point wins that game (sudden death cap at 30).',
      'The shuttlecock must be hit before it touches the court floor and must pass over the net.'
    ],
    advancedRules: [
      'Service Rule: At the instant of hitting the shuttle, the whole shuttlecock must be below 1.15 metres from the court surface (measured by fixed service height device).',
      'Intervals: A 60-second interval is allowed when the leading score reaches 11 points in each game.',
      'Court side changes: Sides change at the end of game 1, end of game 2, and when a side reaches 11 points in the decisive 3rd game.',
      'Hawkeye Instant Review System: Each player/pair receives 2 unsuccessful challenges per match.'
    ],
    playerPositions: [
      { title: 'Singles Player', role: 'Full Court Master', keyDuties: 'Court coverage, footwork stamina, deception drops, cross-court smashes.' },
      { title: 'Doubles Front-Court Player', role: 'Net Dominance', keyDuties: 'Interceptions, tight spinning net shots, setting up lifts for partner.' },
      { title: 'Doubles Rear-Court Player', role: 'Power Cannon', keyDuties: 'Continuous jump smashes, half-smashes, forcing weak defensive returns.' }
    ],
    teamSizes: '1 player per side in Singles, 2 players per side in Doubles / Mixed Doubles',
    scoringSystem: 'Best of 3 sets to 21 points (rally points), 2-point clear margin or first to 30 points.',
    foulsAndPenalties: [
      'Service Fault: Shuttle hit above 1.15m height limit or feet touching service court boundary lines.',
      'Net Touch: Racket, player body, or clothing touching the net or its supports while shuttle is in play.',
      'Double Hit: Racket deliberately striking shuttle twice in succession by the same player.'
    ],
    tournamentFormats: [
      'BWF World Tour Super 300/500/750/1000 single-elimination knockouts (32-draw bracket).',
      'Thomas & Uber Cup Group stages (3 singles + 2 doubles team ties).'
    ],
    fairPlayAndSportsmanship: [
      'Yellow card for deliberate delay of game or racket throwing; Red card yields point to opponent; Black card disqualifies.'
    ]
  },
  {
    id: 'rule-basketball',
    key: 'basketball',
    name: 'Basketball',
    officialSource: 'FIBA Official Basketball Rules 2026',
    sourceUrl: 'https://www.fiba.basketball/documents/official-basketball-rules',
    lastUpdatedDate: 'September 2026',
    category: 'traditional',
    iconName: 'CircleDot',
    basicRules: [
      'Two teams of 5 players on court try to score points by shooting ball through 10-foot elevated rim.',
      'Match played over 4 quarters of 10 minutes each (FIBA regulation).',
      'Shot Clock: Offense has 24 seconds to attempt a field goal that hits the rim; 14-second offensive rebound reset.',
      'Scoring: 2 points for regular field goals, 3 points for shots beyond 6.75m arc, 1 point per Free Throw.',
      'Overtime: 5 minutes extra periods played until a winner is determined in tie games.'
    ],
    advancedRules: [
      '8-second rule: Team must advance ball from backcourt to frontcourt within 8 seconds.',
      '5-second closely guarded rule: Player holding ball must pass, shoot, or dribble within 5 seconds when defended within 1 metre.',
      'Goaltending & Basket Interference: Once ball touches rim or is on downward flight towards basket, defense cannot touch it.'
    ],
    playerPositions: [
      { title: 'Point Guard (PG - 1)', role: 'Floor General', keyDuties: 'Ball handling, play calling, reading defensive schemes, delivering assists.' },
      { title: 'Shooting Guard (SG - 2)', role: 'Perimeter Scorer', keyDuties: 'Catch-and-shoot 3-pointers, curling off screens, perimeter defense.' },
      { title: 'Small Forward (SF - 3)', role: 'Two-Way Wing', keyDuties: 'Slashing to rim, defending multiple positions, transition running.' },
      { title: 'Power Forward (PF - 4)', role: 'Post Anchor / Stretch 4', keyDuties: 'Mid-range shooting, box-outs, pick-and-roll screen setting.' },
      { title: 'Center (C - 5)', role: 'Paint Protector', keyDuties: 'Rim protection, blocked shots, offensive and defensive rebounding.' }
    ],
    teamSizes: '5 players on court + up to 7 substitutes (12 player match roster)',
    scoringSystem: '1 point (Free Throw), 2 points (Inside 6.75m Arc), 3 points (Beyond 6.75m Arc).',
    foulsAndPenalties: [
      'Personal Fouls: 5 personal fouls disqualifies player from remainder of the game (6 in NBA).',
      'Team Fouls: After 4 team fouls in a quarter, all subsequent defensive fouls award 2 free throws (Penalty situation).',
      'Technical Foul: 1 free throw awarded to opponents + possession retained.',
      'Unsportsmanlike / Disqualifying Foul: 2 free throws + possession at throw-in line.'
    ],
    tournamentFormats: [
      'Group Round Robin followed by Quarter-finals, Semi-finals, and Bronze/Gold medal matches.'
    ],
    fairPlayAndSportsmanship: [
      'No baiting opponents or disrespectful gestures toward referees or coaching staffs.'
    ]
  }
];

export const TRAINING_CENTRES: TrainingCentre[] = [
  {
    id: 'tc-1',
    name: 'S8UL Esports Bootcamp & High-Performance Academy',
    category: 'Esports',
    address: 'Sector 8, Nerul, Navi Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    availableCourses: [
      'Battle Royale Micro-Rotations & IGL Strategy (BGMI & Free Fire MAX)',
      'Aim Mechanics & Crosshair Placement Mastery (PC & Mobile)',
      'Esports Psychology, Tilt Management & Physical Reflex Conditioning',
      'Tournament LAN Pressure Simulation & Team Comms Protocol'
    ],
    ageGroups: ['15-18 Years (Youth)', '18-24 Years (Senior/Pro)'],
    verifiedContact: {
      phone: '+91 22 2770 4100',
      email: 'academy@s8ulesports.in',
      officeHours: 'Mon-Sat 10:00 AM - 07:00 PM IST'
    },
    officialWebsite: 'https://s8ul.gg/academy',
    facilities: [
      'Dedicated 10Gbps dedicated fiber redundant line',
      '500Hz Alienware & ASUS ROG Esports tournament stations',
      'Reflex testing lab & mental performance coaching room',
      'Broadcast caster studio & review theatre'
    ],
    headCoachOrDirector: 'Director of Esports Performance & Certified Mental Coach',
    accreditationEvidence: 'Official Partner Academy of Asian Esports Federation (AESF) recognized coaches',
    isVerified: true,
    rating: 4.9
  },
  {
    id: 'tc-2',
    name: 'Reliance Foundation Young Champs Football Academy',
    category: 'Football',
    address: 'Ghansoli Knowledge Park, Thane-Belapur Road',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    country: 'India',
    availableCourses: [
      'AIFF Youth Elite Pathway (Under-13, Under-15, Under-18)',
      'Tactical Positional Play & Video Analytics',
      'Goalkeeping Specialized Elite Module',
      'Sports Science, Nutrition & Rehabilitation'
    ],
    ageGroups: ['Under-12 Grassroots', 'Under-15 Junior', 'Under-18 Elite Residency'],
    verifiedContact: {
      phone: '+91 22 4477 0000',
      email: 'admissions@rfyoungchamps.org',
      officeHours: 'Mon-Fri 09:00 AM - 06:00 PM IST'
    },
    officialWebsite: 'https://rfyoungchamps.org',
    facilities: [
      'FIFA Quality Pro 2-Star synthetic turf fields & natural grass pitch',
      'Cryotherapy recovery plunge pools & hydrotherapy spa',
      'GPS player-tracking Catapult monitoring equipment',
      'Residential school with CBSE accredited curriculum'
    ],
    headCoachOrDirector: 'UEFA Pro Licensed Academy Technical Director',
    accreditationEvidence: 'AIFF 5-Star Accredited Elite Residential Academy License #AIFF-AC-2024-001',
    isVerified: true,
    rating: 4.95
  },
  {
    id: 'tc-3',
    name: 'National Cricket Academy (NCA) High Performance Centre',
    category: 'Cricket',
    address: 'Near Kempegowda International Airport Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    availableCourses: [
      'BCCI Fast Bowling Specialized Clinic & Biomechanical Analysis',
      'Spin Bowling Variations & Arm Speed Optimization',
      'High-Performance Batting Against 145kmph+ Pace',
      'Fielding & Wicketkeeping Elite Reflex Conditioning'
    ],
    ageGroups: ['Under-16 State Select', 'Under-19 National Pool', 'Senior Emerging'],
    verifiedContact: {
      phone: '+91 80 2286 9900',
      email: 'nca.office@bcci.tv',
      officeHours: 'Mon-Fri 08:30 AM - 05:30 PM IST'
    },
    officialWebsite: 'https://bcci.tv/nca',
    facilities: [
      '40 natural grass practice pitches (red and black soil combinations)',
      'Indoor practice shed with 16 automated bowling machines and speed guns',
      'Sports science 3D motion-capture camera lab',
      'Olympic size hydrotherapy pool and world-class gym'
    ],
    headCoachOrDirector: 'BCCI Level 3 Master Coaches & Sports Science Specialists',
    accreditationEvidence: 'Official BCCI National Training Headquarters with certified ICC protocols',
    isVerified: true,
    rating: 5.0
  },
  {
    id: 'tc-4',
    name: 'Pullela Gopichand Badminton Academy',
    category: 'Badminton',
    address: 'ISB Road, Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    availableCourses: [
      'BWF International Circuit Intensive Training Program',
      'Junior Development Footwork & Core Agility Drills',
      'Singles Stroke Deception & Explosive Smash Program',
      'Doubles Rotation, Net Interception & Defensive Reflex'
    ],
    ageGroups: ['7-12 Years (Sub-Junior)', '13-17 Years (Junior)', '18+ Years (Elite)'],
    verifiedContact: {
      phone: '+91 40 2300 4500',
      email: 'info@gopichandacademy.com',
      officeHours: 'Mon-Sat 06:00 AM - 08:00 PM IST'
    },
    officialWebsite: 'https://gopichandacademy.com',
    facilities: [
      '14 BWF-certified wooden floating sub-floor courts with Yonex mats',
      'Specialized low-impact plyometrics agility area',
      'Physiotherapy and ice-bath recovery suite',
      'In-house high-nutrition cafeteria tailored for elite athletes'
    ],
    headCoachOrDirector: 'Padma Bhushan Pullela Gopichand & Dronacharya Awardee Coaches',
    accreditationEvidence: 'Badminton Association of India (BAI) National Centre of Excellence',
    isVerified: true,
    rating: 4.9
  },
  {
    id: 'tc-5',
    name: 'Inspire Institute of Sport (IIS)',
    category: 'Multi-Sport',
    address: 'Vidyanagar, Toranagallu, Ballari District',
    city: 'Vijayanagar',
    state: 'Karnataka',
    country: 'India',
    availableCourses: [
      'Olympic Boxing, Wrestling & Judo High Performance Elite Program',
      'Track & Field Sprinting, Javelin, and Long Jump Development',
      'Biomechanical Sports Science & Recovery Protocols',
      'Youth Athletic Foundation Multi-Discipline School'
    ],
    ageGroups: ['Under-14 Talent Hunt', 'Under-18 Junior Olympians', 'Senior National Athletes'],
    verifiedContact: {
      phone: '+91 8395 242 000',
      email: 'admissions@iis.ind.in',
      officeHours: 'Mon-Fri 09:00 AM - 06:00 PM IST'
    },
    officialWebsite: 'https://inspireinstituteofsport.com',
    facilities: [
      '400m 8-lane IAAF Level 1 certified synthetic track',
      'High-altitude environmental simulation sleep chambers',
      'Bespoke combat sports training arena with 6 competition rings/mats',
      'World-class DEXA body composition and VO2 max testing lab'
    ],
    headCoachOrDirector: 'International Olympic Coaches & Sports Science Directors',
    accreditationEvidence: 'Sports Authority of India (SAI) recognized High Performance Olympic Training Centre',
    isVerified: true,
    rating: 4.98
  }
];

export const TUTORIALS: TutorialItem[] = [
  {
    id: 'tut-1',
    title: 'Free Fire MAX: Perfect Gloo Wall Placement & Fast Recovery',
    gameOrSport: 'Free Fire MAX',
    category: 'esports',
    level: 'Beginner',
    durationMinutes: 12,
    author: 'Coach V0rtex (Ex-FFWS Regional Finalist)',
    videoUrlPlaceholder: 'https://youtube.com/embed/demo-ff-gloo',
    summary: 'Master the instant crouch Gloo Wall technique to absorb sniper hits and create immediate 360-degree safe revive zones.',
    writtenGuideSteps: [
      {
        title: 'Step 1: Custom HUD Setup',
        explanation: 'Enlarge your secondary Gloo Wall trigger button to 90% size and position it adjacent to your primary crouch button for instantaneous single-frame execution.',
        proTip: 'Enable "Smart Throw" in controls settings if you play on high sensitivity mobile displays.'
      },
      {
        title: 'Step 2: The Crouch-Drop Sequence',
        explanation: 'The moment you hear gunfire: simultaneously drag fire button down towards player feet, tap Crouch, and release Wall button.',
        proTip: 'Always drop the wall 1.5 metres ahead of your sprint line rather than directly against your hitbox to avoid getting pinned.'
      },
      {
        title: 'Step 3: Creating a V-Box Pocket',
        explanation: 'In open terrain, place two walls at a 60-degree angle to provide shielding from both forward opponents and high-ground snipers.',
        proTip: 'Carry at least 4 Gloo Melter grenades to destroy enemy defensive bubbles.'
      }
    ],
    practiceExercises: [
      { id: 'ex-1', task: 'Training Grounds: Place 20 consecutive crouch Gloo Walls under 0.4 seconds each', targetMetric: '20/20 Perfect Executions' },
      { id: 'ex-2', task: 'BR-Ranked: Successfully complete 3 safe teammate revives inside V-Box walls', targetMetric: '3 Completed Revives' },
      { id: 'ex-3', task: 'Survive an open field cross using zigzag Gloo Wall chain', targetMetric: 'Zero Damage Open Cross' }
    ]
  },
  {
    id: 'tut-2',
    title: 'BGMI: Erangel Compound Hold & Vehicle Shield Defensive Formations',
    gameOrSport: 'BGMI',
    category: 'esports',
    level: 'Intermediate',
    durationMinutes: 18,
    author: 'Captain Apex (Krafton Certified IGL)',
    videoUrlPlaceholder: 'https://youtube.com/embed/demo-bgmi-compound',
    summary: 'How professional esports squads lock down two-story Pochinki and Rozhok compounds with vehicle barricades and crossfires.',
    writtenGuideSteps: [
      {
        title: 'Step 1: Vehicle Parking & Tire Popping',
        explanation: 'Park Dacia and UAZ horizontally blocking ground-floor entrances, then pop the outer tires so opponents cannot shoot your team’s shins from underneath.',
        proTip: 'Never leave full-health cars unexploded near doors; grenade cookers can trigger a chain explosion that wipes your squad.'
      },
      {
        title: 'Step 2: 2-1-1 Defensive Split',
        explanation: 'Station 2 fraggers covering staircase choke point, 1 player watching the roof/balcony ladder, and 1 anchor holding opposite blindside windows.',
        proTip: 'Use flashbangs bouncing off door jambs right when attackers start ascending the stairs.'
      },
      {
        title: 'Step 3: Staggered Healing Crossfire',
        explanation: 'When one defender falls back to drink an energy drink or use a first aid kit, the partner immediately steps into the angle with pre-firing.',
        proTip: 'Never both reload at the same second!'
      }
    ],
    practiceExercises: [
      { id: 'ex-4', task: 'Custom Room: Successfully repel 3 full-squad compound crashes', targetMetric: '3 Successful Holds' },
      { id: 'ex-5', task: 'Master 100m DMR spray burst discipline (5-bullet taps)', targetMetric: '75% Headshot Accuracy' },
      { id: 'ex-6', task: 'Coordinate 4-vehicle rolling convoy into Zone 4 without single casualty', targetMetric: 'Zero Casualty Rotation' }
    ]
  },
  {
    id: 'tut-3',
    title: 'Valorant: Crosshair Placement & Deadzoning Mechanics',
    gameOrSport: 'Valorant',
    category: 'esports',
    level: 'Advanced',
    durationMinutes: 15,
    author: 'AstraNova (Radiant Tier Coach)',
    videoUrlPlaceholder: 'https://youtube.com/embed/demo-val-deadzone',
    summary: 'Eliminate moving inaccuracy with deadzoning (counter-strafing without stopping) and pre-aiming head height corners on Ascent and Haven.',
    writtenGuideSteps: [
      {
        title: 'Step 1: Environmental Head Height Markers',
        explanation: 'Use texture lines on walls, top edges of boxes, and door frames to keep crosshairs permanently aligned at head level before peeking.',
        proTip: 'On Ascent A-site, the blue stripe on Mid Courtyard bricks exactly matches standing agent eye levels.'
      },
      {
        title: 'Step 2: Deadzone Firing Window',
        explanation: 'When transitioning from pressing A to pressing D, there is an 8-frame window where your movement velocity hits 0. Fire your Vandal burst strictly in this instant.',
        proTip: 'Do not hold Shift while deadzoning; full running counter-strafe creates maximum displacement with zero aim penalty.'
      },
      {
        title: 'Step 3: Micro-Adjustments vs Flicking',
        explanation: 'Clear angles slice-by-slice ("slicing the pie") so your crosshair is already on the target before they appear, minimizing flick distance.',
        proTip: 'Set your eDPI (DPI * In-game sens) between 200 and 320 for optimal micro-adjust consistency.'
      }
    ],
    practiceExercises: [
      { id: 'ex-7', task: 'The Range: Hard Bots eliminate 22+ bots with Vandal one-taps', targetMetric: 'Score >= 22/30' },
      { id: 'ex-8', task: 'Deathmatch: Complete match using deadzone strafes only (no crouching)', targetMetric: 'Top 3 Finish, 65%+ HS%' },
      { id: 'ex-9', task: 'Practice Ascent A-main jiggle peek vs sniper angle 50 times', targetMetric: '50 Clean Info Jiggles' }
    ]
  },
  {
    id: 'tut-4',
    title: 'Cricket: Master the In-Swinging Yorker & Death Overs Field Placement',
    gameOrSport: 'Cricket',
    category: 'traditional',
    level: 'Intermediate',
    durationMinutes: 16,
    author: 'Coach R. Raman (BCCI Certified Level 3)',
    videoUrlPlaceholder: 'https://youtube.com/embed/demo-cricket-yorker',
    summary: 'Learn the biomechanics of late wrist flick, seam position, and bowling directly at the batter’s base of off-stump to stop death-over boundaries.',
    writtenGuideSteps: [
      {
        title: 'Step 1: Seam Angle & Grip Pressure',
        explanation: 'Grip ball with seam tilted slightly towards fine leg. Apply firm index finger pressure while relaxing middle finger slightly to induce late lateral curl.',
        proTip: 'Keep the shiny side on the off-side and rough side on the leg-side for reverse swing.'
      },
      {
        title: 'Step 2: Release Point Alignment',
        explanation: 'Delay your release point by a fraction of a millisecond with a high front-arm pull. Target the white crease line on the popping crease.',
        proTip: 'Place a shoe or coin on the crease during net practice and aim to hit it 4 out of 6 balls.'
      },
      {
        title: 'Step 3: Setting the T20 Death Field',
        explanation: 'Place Deep Point, Deep Square Leg, Long On, and Long Off on the boundary. Keep Short Third Man and Extra Cover inside the circle to cut off edges.',
        proTip: 'Bowl strictly to your field: if deep point is open, never bowl wide outside off.'
      }
    ],
    practiceExercises: [
      { id: 'ex-10', task: 'Net Practice: Bowl 6 consecutive yorkers landing within 1 foot of popping crease', targetMetric: 'At least 4/6 on target' },
      { id: 'ex-11', task: 'Practice Slower Ball Off-Cutter with identical arm speed', targetMetric: '15kmph speed drop disguised' },
      { id: 'ex-12', task: 'Match simulation: Defend 12 runs in the final over with only 4 fielders outside', targetMetric: 'Win 3/5 simulations' }
    ]
  },
  {
    id: 'tut-5',
    title: 'Football: Beating the Offside Trap with Third-Man Runs',
    gameOrSport: 'Football',
    category: 'traditional',
    level: 'Advanced',
    durationMinutes: 14,
    author: 'Coach Diego M. (UEFA A Licensed)',
    videoUrlPlaceholder: 'https://youtube.com/embed/demo-football-offside',
    summary: 'How Pep Guardiola and modern tactical teams crack high defensive lines using third-man diagonal blindside sprints.',
    writtenGuideSteps: [
      {
        title: 'Step 1: The First Pass Bait',
        explanation: 'Central midfielder passes to the dropping striker who is marked tightly by the opposing centre back. This draws the defensive line forward.',
        proTip: 'The striker plays first-touch backward to the second midfielder with their body shielding the ball.'
      },
      {
        title: 'Step 2: The Blindside Curved Sprint',
        explanation: 'The winger (third man) starts their sprint from behind the full-back’s shoulder, timing their acceleration just as the second pass is struck.',
        proTip: 'Run diagonally parallel to the offside line before cutting in to stay onside.'
      },
      {
        title: 'Step 3: The Weight of the Through Ball',
        explanation: 'The ball must be lofted or threaded into the space ahead of the runner so the goalkeeper cannot rush out and claim it.',
        proTip: 'Strike with the instep curl to guide the ball away from the tracking defender.'
      }
    ],
    practiceExercises: [
      { id: 'ex-13', task: 'Tactical Grid 4v4+3: Execute 5 successful third-man combinations on goal', targetMetric: '5 Verified Goals' },
      { id: 'ex-14', task: 'Agility: Complete 10 curved timing sprints with zero offside infractions', targetMetric: '10/10 Onside Timings' },
      { id: 'ex-15', task: 'First-time finishing drill: 1-touch volley/slot into bottom corner', targetMetric: '8/10 On Target' }
    ]
  },
  {
    id: 'tut-6',
    title: 'Badminton: Fast Footwork Recovery & Cross-Court Deceptive Drop',
    gameOrSport: 'Badminton',
    category: 'traditional',
    level: 'Beginner',
    durationMinutes: 11,
    author: 'Coach Ananya S. (Former State Champion)',
    videoUrlPlaceholder: 'https://youtube.com/embed/demo-badminton-footwork',
    summary: 'Build world-class court coverage with split-steps, lunges, and master the deceptive slice drop that freezes opponents.',
    writtenGuideSteps: [
      {
        title: 'Step 1: The Essential Split-Step',
        explanation: 'The split-step is a small hop taken just as the opponent strikes the shuttle, landing with knees bent and weight on balls of feet.',
        proTip: 'Never remain flat-footed between rallies; maintain a constant rhythm bounce.'
      },
      {
        title: 'Step 2: Preparing the Full Smash Motion',
        explanation: 'Take a high backswing identical to your full jump smash. This forces the opponent to back up onto their heels anticipating a heavy drive.',
        proTip: 'Keep your chest open and non-racket arm pointing towards the descending shuttlecock.'
      },
      {
        title: 'Step 3: Slice and Cushion at Contact',
        explanation: 'At the final second, slice across the feather skirt rather than driving through the cork, reducing shuttle speed and making it drop steeply over net.',
        proTip: 'Aim for the shuttle to graze the top tape by less than 5 centimetres.'
      }
    ],
    practiceExercises: [
      { id: 'ex-16', task: '6-Corner Shadow Footwork: Complete 3 sets of 20 corner visits with split-step', targetMetric: 'Sub 45 seconds per set' },
      { id: 'ex-17', task: 'Feeding drill: Execute 15 deceptive drops landing inside service box', targetMetric: '12/15 Inside Target Box' },
      { id: 'ex-18', task: 'Match drill: Win 5 points directly using net drops after deep lifts', targetMetric: '5 Points Won' }
    ]
  }
];
