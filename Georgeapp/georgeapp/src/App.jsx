import { useState, useRef, useEffect } from 'react'
import Header from './Header'
import { CHAPTERS } from './storyData'
import { sendAnswerToDashboard } from './supabaseAnswers'
import './App.css'

// ─────────────────────────────────────────────────────────────────────────────
// Helper: flat index across all slides (used for the header progress bar)
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// AudioButton
// ─────────────────────────────────────────────────────────────────────────────
function AudioButton({ audioSrc, accent }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  // Reset when audio source changes (new slide)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlaying(false)
    }
  }, [audioSrc])
  const toggle = () => {
    if (!audioSrc) return
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }
  const onEnded = () => setPlaying(false)
  return (
    <div className="sound-wrapper">
      {audioSrc && <audio ref={audioRef} src={audioSrc} onEnded={onEnded} />}
      <button
        id="audio-btn"
        className={`sound-btn ${playing ? 'playing' : ''} ${!audioSrc ? 'no-audio' : ''}`}
        aria-label={playing ? 'Pause audio' : 'Play audio'}
        style={{
          background: accent,
          boxShadow: `0 6px 24px ${accent}66`,
        }}
        onClick={toggle}
        onPointerDown={e => e.currentTarget.classList.add('pressed')}
        onPointerUp={e => e.currentTarget.classList.remove('pressed')}
        onPointerLeave={e => e.currentTarget.classList.remove('pressed')}
      >
        {/* Speaker icon when paused / idle */}
        {!playing && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="sound-icon">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
        {/* Pause icon when playing */}
        {playing && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="sound-icon">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
      </button>
    </div>
  )
}
// ─────────────────────────────────────────────────────────────────────────────
// InteractionSlide — textarea + submit
// ─────────────────────────────────────────────────────────────────────────────
function InteractionSlide({ slide, accent, chapterLabel }) {
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  // Reset when navigating to a different interaction slide
  useEffect(() => {
    setAnswer('')
    setSubmitted(false)
  }, [slide.id])
  const handleSubmit = () => {
    if (!answer.trim()) return
    const answerPayload = {
      chapter: chapterLabel,
      slideId: slide.id,
      questionTitle: slide.title,
      prompt: slide.interactionPrompt,
      answer: answer.trim(),
      submittedAt: new Date().toISOString(),
    }

    console.log('ANSWER SUBMITTED', answerPayload)
    void sendAnswerToDashboard(answerPayload).catch(error => {
      console.warn('Could not save answer to Supabase.', error)
    })
    setSubmitted(true)
  }
  return (
    <div className="interaction-slide">
      <p className="interaction-prompt">{slide.interactionPrompt}</p>
      {!submitted ? (
        <>
          <textarea
            id={`textarea-${slide.id}`}
            className="interaction-textarea"
            placeholder={slide.interactionPlaceholder}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            rows={5}
            style={{ borderColor: accent }}
            /* Mobile keyboard UX */
            autoCapitalize="sentences"
            autoCorrect="on"
            autoComplete="off"
            spellCheck={true}
            enterKeyHint="done"
            /* Scroll card into view when keyboard opens on iOS/Android */
            onFocus={e => {
              setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }, 350) // delay lets iOS keyboard finish animating
            }}
          />
          <button
            id={`submit-${slide.id}`}
            className="interaction-submit"
            style={{ background: accent, boxShadow: `0 4px 16px ${accent}55` }}
            onClick={handleSubmit}
            disabled={!answer.trim()}
          >
            Send to George
          </button>
        </>
      ) : (
        <div className="interaction-thanks" style={{ borderColor: accent }}>
          <span className="thanks-emoji">✉️</span>
          <p>George received your message. Thank you!</p>
        </div>
      )}
    </div>
  )
}
// ─────────────────────────────────────────────────────────────────────────────
// ColourActivity — fullscreen colouring overlay (covers the whole screen)
// ─────────────────────────────────────────────────────────────────────────────
function ColourActivity({ accent, onBack }) {
  const colourAppUrl = 'colour-app/index.html?v=2026-05-19-poses'

  return (
    <div className="colour-fullscreen">
      {/* Top bar with back button */}
      <div className="colour-topbar" style={{ background: accent }}>
        <button
          className="colour-back-btn"
          onClick={onBack}
          aria-label="Back to story"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20" height="20">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to Story
        </button>
        <span className="colour-topbar-title">🎨 Colour Me In!</span>
        <a
          href={colourAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="colour-open-btn"
          aria-label="Open in new tab"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18">
            <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
          </svg>
        </a>
      </div>
      {/* Fullscreen iframe */}
      <iframe
        src={colourAppUrl}
        title="Colour Me In – George"
        className="colour-fullscreen-frame"
        allow="downloads"
      />
    </div>
  )
}
// ─────────────────────────────────────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeChapter, setActiveChapter] = useState(0) // 0-indexed
  const [activeSlide, setActiveSlide]     = useState(0) // 0-indexed within chapter
  // Derived data
  const chapter  = CHAPTERS[activeChapter]
  const slide    = chapter.slides[activeSlide]
  const isFirst  = activeChapter === 0 && activeSlide === 0
  const isLastSlideInChapter = activeSlide === chapter.slides.length - 1
  const isLastChapter        = activeChapter === CHAPTERS.length - 1
  const isLast   = isLastSlideInChapter && isLastChapter
  // Progress: based on chapter completion (chapter / total chapters)
  const progress = Math.round(((activeChapter + 1) / CHAPTERS.length) * 100)
  // ── Navigation ─────────────────────────────────────────────────────────────
  const goNext = () => {
    if (!isLastSlideInChapter) {
      setActiveSlide(s => s + 1)
    } else if (!isLastChapter) {
      setActiveChapter(c => c + 1)
      setActiveSlide(0)
    }
  }
  const goPrev = () => {
    if (activeSlide > 0) {
      setActiveSlide(s => s - 1)
    } else if (activeChapter > 0) {
      const prevChapter = CHAPTERS[activeChapter - 1]
      setActiveChapter(c => c - 1)
      setActiveSlide(prevChapter.slides.length - 1)
    }
  }
  // ── Card animation key (triggers re-mount / fade on navigation) ────────────
  const cardKey = `${activeChapter}-${activeSlide}`
  return (
    <div className="app">
      {/* ── Fullscreen Colour Activity (renders over everything) ────────────── */}
      {slide.isColourActivity ? (
        <ColourActivity
          accent={chapter.accent}
          onBack={goPrev}
        />
      ) : (
        <>
          <Header
            title={chapter.label}
            progress={progress}
            onBack={!isFirst ? goPrev : null}
          />
          <main className="chapter-page">
            {/* The main white card with all the text */}
            <div className="card-track">
              <div
                key={cardKey}
                className="title-card slide-in"
                style={{ '--accent': chapter.accent }}
              >
                <span className="card-badge">{chapter.label}</span>
                <h1 className="chapter-title">{slide.title}</h1>
                <div className="title-divider" />
                {slide.isInteraction ? (
                  <InteractionSlide
                    slide={slide}
                    accent={chapter.accent}
                    chapterLabel={chapter.label}
                  />
                ) : (
                  <p className="chapter-subtitle">{slide.body}</p>
                )}
              </div>
            </div>
            {/* ── Slide dots ────────────────────────────────────────────── */}
            <div className="dots-row" role="tablist" aria-label="Slides">
              {chapter.slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeSlide}
                  aria-label={`Slide ${i + 1}`}
                  className={`dot ${i === activeSlide ? 'active' : ''}`}
                  style={i === activeSlide ? { background: chapter.accent } : {}}
                  onClick={() => setActiveSlide(i)}
                />
              ))}
            </div>
            {/* ── Audio button ─────────────────────────────────────────── */}
            <AudioButton audioSrc={slide.audio} accent={chapter.accent} />
            {/* ── Prev / Next chapter navigation ───────────────────────── */}
            <nav className="chapter-nav" aria-label="Chapter navigation">
              <button
                id="btn-prev"
                className="nav-btn nav-btn--prev"
                onClick={goPrev}
                disabled={isFirst}
                aria-label="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                Previous
              </button>
              <button
                id="btn-next"
                className="nav-btn nav-btn--next"
                onClick={goNext}
                disabled={isLast}
                style={{ background: chapter.accent, boxShadow: `0 4px 14px ${chapter.accent}55` }}
                aria-label="Next"
              >
                {isLastSlideInChapter && !isLastChapter
                  ? `Start ${CHAPTERS[activeChapter + 1].label}`
                  : 'Next'}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </button>
            </nav>
          </main>
        </>
      )}
    </div>
  )
}
