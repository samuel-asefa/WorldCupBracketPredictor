import { useEffect, useRef, useState, useCallback } from 'react';
import { initialMatchups, teams } from '../data/bracketData';
import { MatchupCard } from './MatchupCard';

interface Props {
  picks: Record<string, string>;
  onPickWinner: (matchId: string, teamId: string) => void;
}

interface Line {
  d: string;       // SVG path
  active: boolean;
}

/* ── Round definitions ────────────────────────────────── */
const ROUNDS = [
  { label: 'Round of 32', ids: ['R32-1','R32-2','R32-3','R32-4','R32-5','R32-6','R32-7','R32-8',
                                  'R32-9','R32-10','R32-11','R32-12','R32-13','R32-14','R32-15','R32-16'] },
  { label: 'Round of 16', ids: ['R16-1','R16-2','R16-3','R16-4','R16-5','R16-6','R16-7','R16-8'] },
  { label: 'Quarter-Finals', ids: ['QF-1','QF-2','QF-3','QF-4'] },
  { label: 'Semi-Finals',    ids: ['SF-1','SF-2'] },
  { label: 'Final',          ids: ['F-1'] },
];

/* ── Resolve who is playing in a later-round match based on picks ── */
function resolveTeamId(
  matchId: string,
  slot: 1 | 2,
  picks: Record<string, string>
): string | null {
  const match = initialMatchups.find(m => m.id === matchId);
  if (!match) return null;

  // Early round: teams are fixed
  if (matchId.startsWith('R32')) {
    return slot === 1 ? match.team1Id : match.team2Id;
  }

  // Later round: winner comes from one of the two feeding matches
  const feeders = initialMatchups.filter(m => m.nextMatchId === matchId);
  if (feeders.length < 2) return null;
  return picks[feeders[slot - 1].id] ?? null;
}

export function Bracket({ picks, onPickWinner }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);

  /* ── Draw Bezier connector lines ───────────────────── */
  const drawLines = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cRect = container.getBoundingClientRect();
    const sx = container.scrollLeft;
    const sy = container.scrollTop;
    const newLines: Line[] = [];

    // For every match that has a nextMatchId, draw a line from it to the next
    initialMatchups.forEach(match => {
      if (!match.nextMatchId) return;

      const fromEl = document.getElementById(`match-${match.id}`);
      const toEl   = document.getElementById(`match-${match.nextMatchId}`);
      if (!fromEl || !toEl) return;

      const fr = fromEl.getBoundingClientRect();
      const tr = toEl.getBoundingClientRect();

      const x1 = fr.right  - cRect.left + sx;
      const y1 = fr.top + fr.height / 2 - cRect.top + sy;
      const x2 = tr.left   - cRect.left + sx;
      const y2 = tr.top + tr.height / 2 - cRect.top + sy;

      // Smooth S-curve via cubic bezier
      const cx = (x1 + x2) / 2;
      const d = `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`;

      newLines.push({ d, active: !!picks[match.id] });
    });

    // Line from Final to Champion box
    const finalEl    = document.getElementById('match-F-1');
    const championEl = document.getElementById('champion-box');
    if (finalEl && championEl) {
      const fr = finalEl.getBoundingClientRect();
      const tr = championEl.getBoundingClientRect();
      const x1 = fr.right  - cRect.left + sx;
      const y1 = fr.top + fr.height / 2 - cRect.top + sy;
      const x2 = tr.left   - cRect.left + sx;
      const y2 = tr.top + tr.height / 2 - cRect.top + sy;
      const cx = (x1 + x2) / 2;
      const d = `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`;
      newLines.push({ d, active: !!picks['F-1'] });
    }

    setLines(newLines);
  }, [picks]);

  useEffect(() => {
    drawLines();
    const t = setTimeout(drawLines, 150); // after fonts/flags settle
    window.addEventListener('resize', drawLines);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', drawLines);
    };
  }, [drawLines]);

  // Also redraw on scroll (lines must track with the container)
  const handleScroll = useCallback(() => drawLines(), [drawLines]);

  const champion = picks['F-1'] ? teams[picks['F-1']] : null;

  return (
    <div className="bracket-scroll" ref={scrollRef} onScroll={handleScroll}>
      {/* SVG connector layer — absolutely positioned over scroll area */}
      <svg
        className="svg-layer"
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible',
                 width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      >
        {lines.map((l, i) => (
          <path
            key={i}
            d={l.d}
            fill="none"
            stroke={l.active ? 'var(--line-active)' : 'var(--line-idle)'}
            strokeWidth={l.active ? 2.5 : 1.5}
            style={{
              transition: 'stroke 0.4s ease, stroke-width 0.3s ease',
              filter: l.active ? 'drop-shadow(0 0 5px rgba(240,192,64,0.5))' : 'none',
            }}
          />
        ))}
      </svg>

      {/* Bracket grid */}
      <div className="bracket" style={{ position: 'relative', zIndex: 1 }}>
        {ROUNDS.map(round => {
          const matchups = round.ids.map(id => initialMatchups.find(m => m.id === id)!).filter(Boolean);

          return (
            <div key={round.label} className="round-col">
              <div className="round-label">{round.label}</div>

              {/* Distribute matches evenly using flex */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  flex: 1,
                  gap: '1rem',
                }}
              >
                {matchups.map(match => {
                  const t1Id = resolveTeamId(match.id, 1, picks);
                  const t2Id = resolveTeamId(match.id, 2, picks);
                  const team1 = t1Id ? (teams[t1Id] ?? null) : null;
                  const team2 = t2Id ? (teams[t2Id] ?? null) : null;

                  return (
                    <div key={match.id} id={`match-${match.id}`}>
                      <MatchupCard
                        match={match}
                        team1={team1}
                        team2={team2}
                        winnerId={picks[match.id] ?? null}
                        onPick={(teamId) => onPickWinner(match.id, teamId)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ── Champion Display ─────────────────────────── */}
        <div
          id="champion-box"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '240px',
            alignSelf: 'center',
          }}
        >
          <div className="round-label">Champion</div>

          {champion ? (
            <div className="champion-card">
              <div className="champion-trophy">🏆</div>
              <img
                className="champion-flag"
                src={`https://flagcdn.com/72x54/${champion.flagCode}.png`}
                srcSet={`https://flagcdn.com/144x108/${champion.flagCode}.png 2x`}
                alt={`${champion.name} flag`}
              />
              <div className="champion-name">{champion.name}</div>
              <div className="champion-label">FIFA World Cup 2026</div>
            </div>
          ) : (
            <div className="champion-card">
              <div className="champion-empty">
                <div className="trophy-icon">🏆</div>
                <div className="tbd-label">TBD</div>
                <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', lineHeight: 1.5, color: 'var(--text-3)' }}>
                  Pick a winner in<br />every match to reveal
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
