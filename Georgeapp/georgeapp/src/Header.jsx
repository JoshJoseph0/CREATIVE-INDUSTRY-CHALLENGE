import './Header.css'

function Header({ title = 'CHAPTER ONE', progress = 13, onBack }) {
  return (
    <header className="header">
      <button className="header-back" onClick={onBack} aria-label="Go back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>

      <span className="header-title">{title}</span>

      <span className="header-progress">{progress}%</span>
    </header>
  )
}

export default Header
