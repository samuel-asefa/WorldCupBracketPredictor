import { useState, useEffect, useCallback } from 'react';
import { initialMatchups } from '../data/bracketData';

export function useBracketState() {
  const [picks, setPicks] = useState<Record<string, string>>({});
  
  // Load initial state from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const picksParam = params.get('picks');
    if (picksParam) {
      try {
        const decoded = JSON.parse(atob(picksParam));
        setPicks(decoded);
      } catch (e) {
        console.error("Invalid URL picks data", e);
      }
    }
  }, []);

  // Update URL whenever picks change
  useEffect(() => {
    if (Object.keys(picks).length > 0) {
      const encoded = btoa(JSON.stringify(picks));
      const url = new URL(window.location.href);
      url.searchParams.set('picks', encoded);
      window.history.replaceState({}, '', url.toString());
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('picks');
      window.history.replaceState({}, '', url.toString());
    }
  }, [picks]);

  // Handle picking a winner for a match
  const pickWinner = useCallback((matchId: string, teamId: string) => {
    setPicks((prev) => {
      const newPicks = { ...prev, [matchId]: teamId };
      
      // We also need to recursively clear any downstream picks if the path changed
      // For a simple implementation, if the user changes a pick earlier in the tree, 
      // we should theoretically invalidate future matches that depend on this one.
      const invalidateDownstream = (currentMatchId: string, picksState: Record<string, string>) => {
        const match = initialMatchups.find(m => m.id === currentMatchId);
        if (match && match.nextMatchId && picksState[match.nextMatchId]) {
          // If the downstream match was previously picking either the old winner or someone else
          // We just clear it to be safe.
          delete picksState[match.nextMatchId];
          invalidateDownstream(match.nextMatchId, picksState);
        }
      };

      if (prev[matchId] && prev[matchId] !== teamId) {
        invalidateDownstream(matchId, newPicks);
      }

      return newPicks;
    });
  }, []);

  // Clear all picks
  const clearPicks = useCallback(() => {
    setPicks({});
  }, []);

  return { picks, pickWinner, clearPicks };
}
