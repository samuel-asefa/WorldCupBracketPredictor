import type { Team, Matchup } from '../types';

// Helper to generate mock stats
const generateMockStats = (elo: number) => {
  const isGood = elo > 1700;
  return {
    goalsScored: isGood ? Math.floor(Math.random() * 5) + 4 : Math.floor(Math.random() * 3) + 2,
    goalsConceded: isGood ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 4) + 2,
    possession: Math.floor(Math.random() * 20) + 40,
    shotsOnTarget: Math.floor(Math.random() * 15) + 10,
  };
};

export const teams: Record<string, Team> = {
  ZAF: { id: 'ZAF', name: 'South Africa', flagCode: 'za', elo: 1500, stats: generateMockStats(1500) },
  CAN: { id: 'CAN', name: 'Canada', flagCode: 'ca', elo: 1600, stats: generateMockStats(1600) },
  NLD: { id: 'NLD', name: 'Netherlands', flagCode: 'nl', elo: 1950, stats: generateMockStats(1950) },
  MAR: { id: 'MAR', name: 'Morocco', flagCode: 'ma', elo: 1750, stats: generateMockStats(1750) },
  DEU: { id: 'DEU', name: 'Germany', flagCode: 'de', elo: 1900, stats: generateMockStats(1900) },
  PRY: { id: 'PRY', name: 'Paraguay', flagCode: 'py', elo: 1650, stats: generateMockStats(1650) },
  FRA: { id: 'FRA', name: 'France', flagCode: 'fr', elo: 2050, stats: generateMockStats(2050) },
  SWE: { id: 'SWE', name: 'Sweden', flagCode: 'se', elo: 1700, stats: generateMockStats(1700) },
  BEL: { id: 'BEL', name: 'Belgium', flagCode: 'be', elo: 1920, stats: generateMockStats(1920) },
  SEN: { id: 'SEN', name: 'Senegal', flagCode: 'sn', elo: 1720, stats: generateMockStats(1720) },
  USA: { id: 'USA', name: 'USA', flagCode: 'us', elo: 1780, stats: generateMockStats(1780) },
  BIH: { id: 'BIH', name: 'Bosnia and Herzegovina', flagCode: 'ba', elo: 1620, stats: generateMockStats(1620) },
  ESP: { id: 'ESP', name: 'Spain', flagCode: 'es', elo: 2000, stats: generateMockStats(2000) },
  PRT: { id: 'PRT', name: 'Portugal', flagCode: 'pt', elo: 1980, stats: generateMockStats(1980) },
  HRV: { id: 'HRV', name: 'Croatia', flagCode: 'hr', elo: 1850, stats: generateMockStats(1850) },
  BRA: { id: 'BRA', name: 'Brazil', flagCode: 'br', elo: 2100, stats: generateMockStats(2100) },
  JPN: { id: 'JPN', name: 'Japan', flagCode: 'jp', elo: 1800, stats: generateMockStats(1800) },
  CIV: { id: 'CIV', name: 'Côte d\'Ivoire', flagCode: 'ci', elo: 1680, stats: generateMockStats(1680) },
  NOR: { id: 'NOR', name: 'Norway', flagCode: 'no', elo: 1710, stats: generateMockStats(1710) },
  MEX: { id: 'MEX', name: 'Mexico', flagCode: 'mx', elo: 1760, stats: generateMockStats(1760) },
  ECU: { id: 'ECU', name: 'Ecuador', flagCode: 'ec', elo: 1740, stats: generateMockStats(1740) },
  ENG: { id: 'ENG', name: 'England', flagCode: 'gb-eng', elo: 2020, stats: generateMockStats(2020) }, // note: 'gb-eng' might need specific icon or just 'gb'
  COD: { id: 'COD', name: 'DR Congo', flagCode: 'cd', elo: 1550, stats: generateMockStats(1550) },
  CHE: { id: 'CHE', name: 'Switzerland', flagCode: 'ch', elo: 1820, stats: generateMockStats(1820) },
  COL: { id: 'COL', name: 'Colombia', flagCode: 'co', elo: 1860, stats: generateMockStats(1860) },
  GHA: { id: 'GHA', name: 'Ghana', flagCode: 'gh', elo: 1640, stats: generateMockStats(1640) },
  AUS: { id: 'AUS', name: 'Australia', flagCode: 'au', elo: 1670, stats: generateMockStats(1670) },
  EGY: { id: 'EGY', name: 'Egypt', flagCode: 'eg', elo: 1690, stats: generateMockStats(1690) },
  ARG: { id: 'ARG', name: 'Argentina', flagCode: 'ar', elo: 2080, stats: generateMockStats(2080) },
  CPV: { id: 'CPV', name: 'Cabo Verde', flagCode: 'cv', elo: 1520, stats: generateMockStats(1520) },
};

// Generating initial matches based on screenshot structure
export const initialMatchups: Matchup[] = [
  // Round of 32 (16 matches)
  { id: 'R32-1', team1Id: 'ZAF', team2Id: 'CAN', nextMatchId: 'R16-1', date: 'Sunday, June 28, 3:00 PM' },
  { id: 'R32-2', team1Id: 'NLD', team2Id: 'MAR', nextMatchId: 'R16-1', date: 'Monday, June 29, 9:00 PM' },
  { id: 'R32-3', team1Id: 'DEU', team2Id: 'PRY', nextMatchId: 'R16-2', date: 'Monday, June 29, 4:30 PM' },
  { id: 'R32-4', team1Id: 'FRA', team2Id: 'SWE', nextMatchId: 'R16-2', date: 'Tuesday, June 30, 5:00 PM' },
  { id: 'R32-5', team1Id: 'BEL', team2Id: 'SEN', nextMatchId: 'R16-3', date: 'Wednesday, July 1, 4:00 PM' },
  { id: 'R32-6', team1Id: 'USA', team2Id: 'BIH', nextMatchId: 'R16-3', date: 'Wednesday, July 1, 8:00 PM' },
  { id: 'R32-7', team1Id: 'ESP', team2Id: null, nextMatchId: 'R16-4', date: 'Thursday, July 2, 3:00 PM' },
  { id: 'R32-8', team1Id: 'PRT', team2Id: 'HRV', nextMatchId: 'R16-4', date: 'Thursday, July 2, 7:00 PM' },
  { id: 'R32-9', team1Id: 'BRA', team2Id: 'JPN', nextMatchId: 'R16-5', date: 'Monday, June 29, 1:00 PM' },
  { id: 'R32-10', team1Id: 'CIV', team2Id: 'NOR', nextMatchId: 'R16-5', date: 'Tuesday, June 30, 1:00 PM' },
  { id: 'R32-11', team1Id: 'MEX', team2Id: 'ECU', nextMatchId: 'R16-6', date: 'Tuesday, June 30, 9:00 PM' },
  { id: 'R32-12', team1Id: 'ENG', team2Id: 'COD', nextMatchId: 'R16-6', date: 'Wednesday, July 1, 12:00 PM' },
  { id: 'R32-13', team1Id: 'CHE', team2Id: null, nextMatchId: 'R16-7', date: 'Thursday, July 2, 11:00 PM' },
  { id: 'R32-14', team1Id: 'COL', team2Id: 'GHA', nextMatchId: 'R16-7', date: 'Friday, July 3, 9:30 PM' },
  { id: 'R32-15', team1Id: 'AUS', team2Id: 'EGY', nextMatchId: 'R16-8', date: 'Friday, July 3, 2:00 PM' },
  { id: 'R32-16', team1Id: 'ARG', team2Id: 'CPV', nextMatchId: 'R16-8', date: 'Friday, July 3, 6:00 PM' },

  // Round of 16 (8 matches)
  { id: 'R16-1', team1Id: null, team2Id: null, nextMatchId: 'QF-1', date: 'Saturday, July 4, 1:00 PM' },
  { id: 'R16-2', team1Id: null, team2Id: null, nextMatchId: 'QF-1', date: 'Saturday, July 4, 5:00 PM' },
  { id: 'R16-3', team1Id: null, team2Id: null, nextMatchId: 'QF-2', date: 'Sunday, July 5, 1:00 PM' },
  { id: 'R16-4', team1Id: null, team2Id: null, nextMatchId: 'QF-2', date: 'Sunday, July 5, 5:00 PM' },
  { id: 'R16-5', team1Id: null, team2Id: null, nextMatchId: 'QF-3', date: 'Monday, July 6, 1:00 PM' },
  { id: 'R16-6', team1Id: null, team2Id: null, nextMatchId: 'QF-3', date: 'Monday, July 6, 5:00 PM' },
  { id: 'R16-7', team1Id: null, team2Id: null, nextMatchId: 'QF-4', date: 'Tuesday, July 7, 1:00 PM' },
  { id: 'R16-8', team1Id: null, team2Id: null, nextMatchId: 'QF-4', date: 'Tuesday, July 7, 5:00 PM' },

  // Quarter Finals (4 matches)
  { id: 'QF-1', team1Id: null, team2Id: null, nextMatchId: 'SF-1', date: 'Thursday, July 9, 2:00 PM' },
  { id: 'QF-2', team1Id: null, team2Id: null, nextMatchId: 'SF-1', date: 'Friday, July 10, 2:00 PM' },
  { id: 'QF-3', team1Id: null, team2Id: null, nextMatchId: 'SF-2', date: 'Saturday, July 11, 2:00 PM' },
  { id: 'QF-4', team1Id: null, team2Id: null, nextMatchId: 'SF-2', date: 'Saturday, July 11, 6:00 PM' },

  // Semi Finals (2 matches)
  { id: 'SF-1', team1Id: null, team2Id: null, nextMatchId: 'F-1', date: 'Tuesday, July 14, 3:00 PM' },
  { id: 'SF-2', team1Id: null, team2Id: null, nextMatchId: 'F-1', date: 'Wednesday, July 15, 3:00 PM' },

  // Final (1 match)
  { id: 'F-1', team1Id: null, team2Id: null, nextMatchId: null, date: 'Sunday, July 19, 3:00 PM' },
];

export const calculateWinProbability = (team1Elo: number, team2Elo: number): { t1: number, t2: number } => {
  const eloDiff = team2Elo - team1Elo;
  const p1 = 1 / (1 + Math.pow(10, eloDiff / 400));
  const t1Pct = Math.round(p1 * 100);
  return { t1: t1Pct, t2: 100 - t1Pct };
};
