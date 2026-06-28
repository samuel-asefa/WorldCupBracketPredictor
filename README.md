# 🏆 World Cup 2026 Bracket Predictor

A sleek, glassmorphic bracket predictor for the 2026 FIFA World Cup — built with React, TypeScript, and Vite.

Pick winners match-by-match from the Round of 32 all the way to the Final, share your bracket with a single link, and see live group-stage stats and win probabilities for every matchup.

---

## Features

- **Full knockout bracket** — all 16 Round of 32 matchups through the Final (July 19, 2026)
- **Win probability** — Elo-based percentages displayed on every matchup card
- **Group stage stats** — Goals, Possession, and Shots on Target shown inline
- **Shareable links** — your picks are encoded into the URL; share with anyone, no account needed
- **Glassmorphic UI** — dark World Cup theme with frosted-glass cards, animated Bezier connector lines, and a glowing champion reveal
- **Resets cleanly** — one click to clear all picks and start over

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Bundler | Vite 8 |
| Styling | Vanilla CSS (no Tailwind) |
| Icons / Flags | [flagcdn.com](https://flagcdn.com) |
| State | Custom hook + URL serialization |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The app runs at `http://localhost:5173` (or the next available port).

---

## How It Works

1. **Click a team** in any matchup card to advance them to the next round
2. Winners automatically populate the next round's card
3. Change your mind — clicking a different team resets all downstream picks
4. Hit **Share Bracket** to copy a URL encoding your full prediction
5. Open that URL on any device to restore exactly your picks

---

## Project Structure

```
src/
├── components/
│   ├── Bracket.tsx        # Main bracket layout + SVG connector lines
│   ├── Header.tsx         # Top bar with share + reset actions
│   └── MatchupCard.tsx    # Individual match card component
├── data/
│   └── bracketData.ts     # All 32 teams, matchup schedule, Elo ratings
├── hooks/
│   └── useBracketState.ts # Picks state + URL serialization
├── types.ts               # Shared TypeScript types
└── index.css              # Global design system (tokens, glass styles)
```

---

## Data Notes

Group stage statistics and win probabilities are calculated from Elo ratings and realistic mock group-stage data. As official 2026 World Cup stats become available they can be updated directly in `bracketData.ts`.

---

## License

MIT
