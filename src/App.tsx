import { useBracketState } from './hooks/useBracketState';
import { Header } from './components/Header';
import { Bracket } from './components/Bracket';

function App() {
  const { picks, pickWinner, clearPicks } = useBracketState();
  const pickCount = Object.keys(picks).length;

  return (
    <>
      {/* Animated background layer */}
      <div className="app-bg" aria-hidden="true" />

      <div className="app-shell">
        <Header pickCount={pickCount} onClear={clearPicks} />
        <Bracket picks={picks} onPickWinner={pickWinner} />
      </div>
    </>
  );
}

export default App;
