/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EsportsScoreResult {
  placementPoints: number;
  killPoints: number;
  totalPoints: number;
}

/**
 * Free Fire MAX Official FFWS Placement Point Table:
 * 1st: 12, 2nd: 9, 3rd: 8, 4th: 7, 5th: 6, 6th: 5,
 * 7th: 4, 8th: 3, 9th: 2, 10th: 1, 11th-12th: 0
 */
export const FFWS_POINTS: Record<number, number> = {
  1: 12,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
};

/**
 * BGMI Official Krafton (BGIS / BMPS) 10-Point System:
 * 1st: 10, 2nd: 6, 3rd: 5, 4th: 4, 5th: 3, 6th: 2, 7th: 1, 8th+: 0
 */
export const BGMI_POINTS: Record<number, number> = {
  1: 10,
  2: 6,
  3: 5,
  4: 4,
  5: 3,
  6: 2,
  7: 1,
};

export function calculateEsportsPoints(
  game: 'freefire' | 'bgmi',
  placement: number,
  kills: number
): EsportsScoreResult {
  const safePlacement = Math.max(1, Math.floor(placement));
  const safeKills = Math.max(0, Math.floor(kills));

  let placementPoints = 0;
  if (game === 'freefire') {
    placementPoints = FFWS_POINTS[safePlacement] ?? 0;
  } else if (game === 'bgmi') {
    placementPoints = BGMI_POINTS[safePlacement] ?? 0;
  }

  const killPoints = safeKills * 1;
  return {
    placementPoints,
    killPoints,
    totalPoints: placementPoints + killPoints,
  };
}

/**
 * Net Run Rate (NRR) in Cricket
 * Formula: (Total Runs Scored / Total Overs Faced) - (Total Runs Conceded / Total Overs Bowled)
 */
export function calculateNetRunRate(
  runsScored: number,
  oversFaced: number,
  runsConceded: number,
  oversBowled: number
): number {
  if (oversFaced <= 0 || oversBowled <= 0) {
    return 0;
  }
  const forRate = runsScored / oversFaced;
  const againstRate = runsConceded / oversBowled;
  const nrr = forRate - againstRate;
  return Math.round(nrr * 1000) / 1000;
}

/**
 * Age Eligibility Calculator
 */
export function checkAgeEligibility(
  birthDateString: string,
  minAge: number,
  maxAge?: number,
  referenceDateString?: string
): { eligible: boolean; calculatedAge: number; message: string } {
  const birth = new Date(birthDateString);
  const ref = referenceDateString ? new Date(referenceDateString) : new Date('2026-10-31');

  if (isNaN(birth.getTime())) {
    return { eligible: false, calculatedAge: 0, message: 'Invalid birth date provided' };
  }

  let age = ref.getFullYear() - birth.getFullYear();
  const m = ref.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) {
    age--;
  }

  if (age < minAge) {
    return {
      eligible: false,
      calculatedAge: age,
      message: `Minimum age required is ${minAge}. Player is ${age} years old.`,
    };
  }

  if (maxAge !== undefined && age > maxAge) {
    return {
      eligible: false,
      calculatedAge: age,
      message: `Maximum age permitted is ${maxAge}. Player is ${age} years old.`,
    };
  }

  return {
    eligible: true,
    calculatedAge: age,
    message: `Player is ${age} years old and meets all eligibility criteria.`,
  };
}

/**
 * Tournament bracket calculations
 */
export function calculateTournamentSeeding(teamCount: number): {
  bracketSize: number;
  byes: number;
  rounds: number;
} {
  if (teamCount <= 1) {
    return { bracketSize: 1, byes: 0, rounds: 0 };
  }
  let power = 1;
  while (power < teamCount) {
    power *= 2;
  }
  const bracketSize = power;
  const byes = bracketSize - teamCount;
  const rounds = Math.log2(bracketSize);

  return { bracketSize, byes, rounds };
}
