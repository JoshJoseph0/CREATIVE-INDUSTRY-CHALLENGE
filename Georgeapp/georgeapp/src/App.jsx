import { useState, useRef, useEffect, useCallback } from 'react'
import Header from './Header'
import { CHAPTERS } from './storyData'
import './App.css'

// This part helps us figure out where we are in the whole story
// so we can update the progress bar at the top.
const TOTAL_SLIDES = CHAPTERS.reduce((sum, ch) => sum + ch.slides.length, 0)

function getGlobalSlideIndex(chapterIdx, slideIdx) {
  let count = 0
  for (let i = 0; i < chapterIdx; i++) count += CHAPTERS[i].slides.length
  return count + slideIdx
}

// This is the big button you tap to play the audio for each slide.
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
      <span className="sound-label">
        {!audioSrc ? 'No audio for this slide' : playing ? 'Tap to pause' : 'Tap to listen'}
      </span>
    </div>
  )
}

// This is the special slide where people can write back to George.
// It shows a text box and a submit button.
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

    console.log('ANSWER SUBMITTED', {
      chapter: chapterLabel,
      slideId: slide.id,
      prompt: slide.interactionPrompt,
      answer: answer.trim(),
      submittedAt: new Date().toISOString(),
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

// This is the heart of the app. It keeps track of which chapter 
// and slide you're currently looking at.
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

  // These functions handle moving back and forth between slides.
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

  // This "key" helps React know when to play the slide-in animation.
  const cardKey = `${activeChapter}-${activeSlide}`

  return (
    <div className="app">
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

        {/* The little dots below the card */}
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

        {/* The big audio button */}
        <AudioButton audioSrc={slide.audio} accent={chapter.accent} />

        {/* The Previous and Next buttons at the very bottom */}
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
    </div>
  )
}
