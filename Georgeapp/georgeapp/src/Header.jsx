import './Header.css'

// This is the golden header at the top of the screen.
// It shows which chapter you're in and how far along you are.
function Header({ title = 'Chapter 1', progress = 20, onBack }) {
  return (
    <header className="header">
      <div className="header-top">
        {/* Back button — hidden on the very first slide */}
        {onBack ? (
          <button
            id="btn-header-back"
            className="header-back"
            onClick={onBack}
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
        ) : (
          <div className="header-spacer" />
        )}

        <span className="header-title">{title}</span>

        {/* Spacer keeps title centred whether back button is visible or not */}
        <div className="header-spacer" />
      </div>

      {/* Progress bar */}
      <div className="header-progress-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="header-progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  )
}

export default Header
