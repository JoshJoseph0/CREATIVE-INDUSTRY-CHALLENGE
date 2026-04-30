import './Header.css'

function Header({ title = 'Chapter 1', progress = 13, onBack }) {
  return (
    <header className="header">
      <div className="header-top">
        <button className="header-back" onClick={onBack} aria-label="Go back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>

        <span className="header-title">{title}</span>

        {/* Spacer to keep title centred */}
        <div className="header-spacer" />
      </div>

      <div className="header-progress-bar-track">
        <div
          className="header-progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  )
}

export default Header
