export interface TeamStats {
  goalsScored: number;
  goalsConceded: number;
  possession: number; // percentage e.g. 55
  shotsOnTarget: number;
}

export interface Team {
  id: string;
  name: string;
  flagCode: string; // ISO 3166-1 alpha-2 code for flags
  stats: TeamStats;
  elo: number; // Used to calculate mock probabilities
}

export interface Matchup {
  id: string; // e.g., "R32-1", "R16-1"
  team1Id: string | null; // null if TBD
  team2Id: string | null; // null if TBD
  nextMatchId: string | null; // Where the winner goes
  date?: string;
}

export interface BracketState {
  [matchId: string]: string | null; // matchId -> winnerTeamId
}
