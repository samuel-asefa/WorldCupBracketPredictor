import type { Matchup, Team } from '../types';
import { calculateWinProbability } from '../data/bracketData';

interface Props {
  match: Matchup;
  team1: Team | null;
  team2: Team | null;
  winnerId: string | null;
  onPick: (teamId: string) => void;
}

export function MatchupCard({ match, team1, team2, winnerId, onPick }: Props) {
  const hasTeams = !!(team1 && team2);
  const probs = hasTeams
    ? calculateWinProbability(team1!.elo, team2!.elo)
    : { t1: 50, t2: 50 };

  const canPick = !!(team1 || team2); // at least one team known

  return (
    <div className="match-card" id={`match-${match.id}`}>
      {/* Date chip */}
      {match.date && (
        <div className="match-date">{formatDate(match.date)}</div>
      )}

      {/* Team 1 */}
      <TeamRow
        team={team1}
        isWinner={winnerId === team1?.id}
        prob={probs.t1}
        showProb={hasTeams}
        onClick={() => team1 && canPick && onPick(team1.id)}
        disabled={!team1}
      />

      {/* Probability bar */}
      {hasTeams && (
        <div className="prob-bar">
          <div className="prob-bar__fill prob-bar__t1" style={{ width: `${probs.t1}%` }} />
          <div className="prob-bar__fill prob-bar__t2" style={{ width: `${probs.t2}%` }} />
        </div>
      )}

      {/* Team 2 */}
      <TeamRow
        team={team2}
        isWinner={winnerId === team2?.id}
        prob={probs.t2}
        showProb={hasTeams}
        onClick={() => team2 && canPick && onPick(team2.id)}
        disabled={!team2}
        isBottom
      />

      {/* Group stage stats — only shown when both teams are known */}
      {hasTeams && (
        <div className="match-stats">
          <span className="stat-val-left">{team1!.stats.goalsScored}</span>
          <span className="stat-name">Goals</span>
          <span className="stat-val-right">{team2!.stats.goalsScored}</span>

          <span className="stat-val-left">{team1!.stats.possession}%</span>
          <span className="stat-name">Poss.</span>
          <span className="stat-val-right">{team2!.stats.possession}%</span>

          <span className="stat-val-left">{team1!.stats.shotsOnTarget}</span>
          <span className="stat-name">Shots</span>
          <span className="stat-val-right">{team2!.stats.shotsOnTarget}</span>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */

interface TeamRowProps {
  team: Team | null;
  isWinner: boolean;
  prob: number;
  showProb: boolean;
  onClick: () => void;
  disabled: boolean;
  isBottom?: boolean;
}

function TeamRow({ team, isWinner, prob, showProb, onClick, disabled, isBottom }: TeamRowProps) {
  const classes = [
    'team-row',
    isBottom ? 'team-row--bottom' : '',
    isWinner ? 'is-winner' : '',
    disabled ? 'team-row--disabled' : '',
  ].filter(Boolean).join(' ');

  if (!team) {
    return (
      <div className={classes} style={{ cursor: 'default' }}>
        <div className="flag-placeholder" />
        <span className="team-name-tbd">TBD</span>
      </div>
    );
  }

  return (
    <div className={classes} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <img
        className="flag-img"
        src={`https://flagcdn.com/24x18/${team.flagCode}.png`}
        srcSet={`https://flagcdn.com/48x36/${team.flagCode}.png 2x`}
        alt={`${team.name} flag`}
        loading="lazy"
      />
      <span className="team-name">{team.name}</span>
      {showProb && (
        <span className="win-pct">{prob}%</span>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */

function formatDate(raw: string): string {
  // Shorten verbose date strings like "Wednesday, July 1, 12:00 PM"
  // → "Wed · Jul 1 · 12:00 PM"
  return raw
    .replace(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/, (d) => d.slice(0, 3))
    .replace(',', ' ·')
    .replace(', ', ' · ');
}
