import "./Header.css"

function Header({ onBack, onDownload }) {
  return (
    <header className="header">
      <button className="header-btn back-btn" onClick={onBack} aria-label="Go back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="btn-label">Back</span>
      </button>

      <h1 className="header-title">🎨 Colour Me In</h1>

      <button className="header-btn download-btn" onClick={onDownload} aria-label="Download">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span className="btn-label">Download</span>
      </button>
    </header>
  )
}

export default Header
