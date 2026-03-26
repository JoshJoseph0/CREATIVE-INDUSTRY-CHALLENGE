import { useState, useRef } from 'react'
import Header from './Header'
import './App.css'

const CARDS = [
  {
    id: 1,
    chapter: 'Chapter 1',
    title: 'Who is George?',
    body: 'An exploration of identity, self, and the story only you can tell.',
    accent: '#D4607A', 
  },
  {
    id: 2,
    chapter: 'Chapter 1',
    title: 'The Beginning',
    body: 'Every story starts somewhere. Yours begins the moment you ask the question.',
    accent: '#7B9BD4', 
  },
  {
    id: 3,
    chapter: 'Chapter 1',
    title: 'Finding His Voice',
    body: 'To speak is to exist. To listen is to understand. Both are acts of courage.',
    accent: '#E8A84A', 
  },
  {
    id: 4,
    chapter: 'Chapter 1',
    title: 'Being a Teacher',
    body: 'What do you see when you look inward? The answer changes everything.',
    accent: '#A99ED4',
  },
]

export default function App() {
  const [index, setIndex] = useState(0)
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)

  const startX = useRef(null)
  const progress = Math.round(((index + 1) / CARDS.length) * 100)

  const onPointerDown = (e) => {

    e.currentTarget.setPointerCapture(e.pointerId)
    startX.current = e.clientX
    setDragging(true)
  }

  const onPointerMove = (e) => {
    if (startX.current === null) return
    setOffset(e.clientX - startX.current)
  }

  const onPointerUp = (e) => {
    if (startX.current === null) return

    const threshold = 60
    const delta = e.clientX - startX.current
    setDragging(false)
    setOffset(0)
    startX.current = null

    if (delta < -threshold && index < CARDS.length - 1) {
      setIndex(i => i + 1)
    } else if (delta > threshold && index > 0) {
      setIndex(i => i - 1)
    }
    setOffset(0)
    startX.current = null
  }

  const card = CARDS[index]

  return (
    <div className="app">
      <Header
        title={card.chapter}
        progress={progress}
        onBack={() => index > 0 && setIndex(i => i - 1)}
      />

      <main className="chapter-page">

        <div
          className="card-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className={`title-card ${dragging ? 'dragging' : ''}`}
            style={{ transform: `translateX(${offset}px)`, '--accent': card.accent }}
          >
            <span className="card-badge">{card.chapter}</span>
            <h1 className="chapter-title">{card.title}</h1>
            <div className="title-divider" />
            <p className="chapter-subtitle">{card.body}</p>

     
            <div className="swipe-hints">
              {index > 0 && <span className="hint-arrow left">‹</span>}
              {index < CARDS.length - 1 && <span className="hint-arrow right">›</span>}
            </div>
          </div>
        </div>

   
        <div className="dots-row">
          {CARDS.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <div className="sound-wrapper">
          <button
            className="sound-btn"
            aria-label="Sound"
            style={{ background: card.accent, boxShadow: `0 6px 24px ${card.accent}66` }}
            onPointerDown={e => e.currentTarget.classList.add('pressed')}
            onPointerUp={e => e.currentTarget.classList.remove('pressed')}
            onPointerLeave={e => e.currentTarget.classList.remove('pressed')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="sound-icon">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          </button>
          <span className="sound-label">Tap to listen</span>
        </div>
      </main>
    </div>
  )
}
