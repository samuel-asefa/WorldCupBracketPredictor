import { useState } from 'react';

interface Props {
  pickCount: number;
  onClear: () => void;
}

export function Header({ pickCount, onClear }: Props) {
  const [toastVisible, setToastVisible] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <>
      <header className="site-header">
        {/* Left: Brand */}
        <div className="site-header__brand">
          <div className="brand-icon">🏆</div>
          <div className="brand-text">
            <span className="brand-text__title">World Cup 2026</span>
            <span className="brand-text__sub">Bracket Predictor</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="site-header__actions">
          {pickCount > 0 && (
            <span className="picks-badge">{pickCount} pick{pickCount !== 1 ? 's' : ''}</span>
          )}
          {pickCount > 0 && (
            <button className="btn-reset" onClick={onClear} title="Clear all picks">
              ↺ Reset
            </button>
          )}
          <button className="btn-share" onClick={handleShare} id="share-btn">
            <ShareIcon />
            Share Bracket
          </button>
        </div>
      </header>

      {/* Copied toast */}
      <div className={`toast${toastVisible ? ' show' : ''}`}>
        ✓ Link copied to clipboard
      </div>
    </>
  );
}

function ShareIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}
