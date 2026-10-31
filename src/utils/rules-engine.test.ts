import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEsportsPoints,
  calculateNetRunRate,
  checkAgeEligibility,
  calculateTournamentSeeding,
} from './rules-engine';

test('Esports Points: Free Fire Booyah (1st place) with 8 kills', () => {
  const result = calculateEsportsPoints('freefire', 1, 8);
  assert.equal(result.placementPoints, 12);
  assert.equal(result.killPoints, 8);
  assert.equal(result.totalPoints, 20);
});

test('Esports Points: Free Fire 2nd place with 3 kills', () => {
  const result = calculateEsportsPoints('freefire', 2, 3);
  assert.equal(result.placementPoints, 9);
  assert.equal(result.killPoints, 3);
  assert.equal(result.totalPoints, 12);
});

test('Esports Points: BGMI 1st place with 12 kills', () => {
  const result = calculateEsportsPoints('bgmi', 1, 12);
  assert.equal(result.placementPoints, 10);
  assert.equal(result.killPoints, 12);
  assert.equal(result.totalPoints, 22);
});

test('Esports Points: BGMI 8th place (0 placement) with 4 kills', () => {
  const result = calculateEsportsPoints('bgmi', 8, 4);
  assert.equal(result.placementPoints, 0);
  assert.equal(result.killPoints, 4);
  assert.equal(result.totalPoints, 4);
});

test('Cricket Net Run Rate calculation', () => {
  // Team A scored 180 runs in 20 overs (9.000 rpo)
  // Team A conceded 150 runs in 20 overs (7.500 rpo)
  // Expected NRR = 9.000 - 7.500 = +1.500
  const nrr = calculateNetRunRate(180, 20, 150, 20);
  assert.equal(nrr, 1.5);
});

test('Cricket Net Run Rate handles zero overs gracefully', () => {
  const nrr = calculateNetRunRate(100, 0, 100, 20);
  assert.equal(nrr, 0);
});

test('Age Eligibility: Under 19 tournament check', () => {
  // Born 2009-05-15 evaluated on 2026-10-31 is 17 years old
  const res1 = checkAgeEligibility('2009-05-15', 14, 18, '2026-10-31');
  assert.equal(res1.eligible, true);
  assert.equal(res1.calculatedAge, 17);

  // Born 2005-01-01 evaluated on 2026-10-31 is 21 years old -> Over maxAge 18
  const res2 = checkAgeEligibility('2005-01-01', 14, 18, '2026-10-31');
  assert.equal(res2.eligible, false);
  assert.equal(res2.calculatedAge, 21);
});

test('Tournament Seeding for Single Elimination', () => {
  // 12 teams need bracket of 16, resulting in 4 byes and 4 rounds
  const seed12 = calculateTournamentSeeding(12);
  assert.equal(seed12.bracketSize, 16);
  assert.equal(seed12.byes, 4);
  assert.equal(seed12.rounds, 4);

  // 8 teams is a perfect power of 2, 0 byes, 3 rounds
  const seed8 = calculateTournamentSeeding(8);
  assert.equal(seed8.bracketSize, 8);
  assert.equal(seed8.byes, 0);
  assert.equal(seed8.rounds, 3);
});
