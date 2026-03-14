import { useState, useRef } from "react"
import "./App.css"
import Header from "./components/Header"

import posGeorgeCalm   from "./assets/pos_george_calm.png"
import posGeorge67     from "./assets/pos_george_67.png"
import posGeorgeSat    from "./assets/pos_george_sat.png"
import posGeorgeWaving from "./assets/pos_george_waving.png"

import bgForest  from "./assets/bg_forest.png"
import bgBeach   from "./assets/bg_beach.png"
import bgSpace   from "./assets/bg_space.png"
import bgGarden  from "./assets/bg_garden.png"

const positions = [
  { id: "pos-1", label: "Calm",   img: posGeorgeCalm   },
  { id: "pos-2", label: "67",     img: posGeorge67     },
  { id: "pos-3", label: "Sat",    img: posGeorgeSat    },
  { id: "pos-4", label: "Waving", img: posGeorgeWaving },
]

const backgrounds = [
  { id: "bg-1", label: "Forest", img: bgForest },
  { id: "bg-2", label: "Beach",  img: bgBeach  },
  { id: "bg-3", label: "Space",  img: bgSpace  },
  { id: "bg-4", label: "Garden", img: bgGarden },
]

function App() {
  const [selectedBg,        setSelectedBg]        = useState(null)  // background item
  const [selectedCharacter, setSelectedCharacter] = useState(null)  // position/character item
  const canvasRef = useRef(null)

  const handleBack = () => {
    console.log("Back pressed")
  }

  const handleDownload = () => {
    if (!selectedBg && !selectedCharacter) return

    // Use the rendered canvas div's size for pixel dimensions
    const container = canvasRef.current
    const W = container ? container.clientWidth  : 800
    const H = container ? container.clientHeight : 600

    const offscreen = document.createElement("canvas")
    offscreen.width  = W * window.devicePixelRatio
    offscreen.height = H * window.devicePixelRatio
    const ctx = offscreen.getContext("2d")
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const drawAndSave = (bgDone) => {
      if (!selectedCharacter) { bgDone(); return }

      const charImg = new Image()
      charImg.crossOrigin = "anonymous"
      charImg.onload = () => {
        // Mirror the CSS: bottom-centred, large character
        const maxW = W * 0.90
        const maxH = H * 0.95
        const ratio = Math.min(maxW / charImg.naturalWidth, maxH / charImg.naturalHeight)
        const cw = charImg.naturalWidth  * ratio
        const ch = charImg.naturalHeight * ratio
        const cx = (W - cw) / 2
        const cy = H - ch
        // Drop shadow to match CSS
        ctx.shadowColor   = "rgba(0,0,0,0.3)"
        ctx.shadowBlur    = 12
        ctx.shadowOffsetY = 4
        ctx.drawImage(charImg, cx, cy, cw, ch)
        ctx.shadowColor = "transparent"
        bgDone()
      }
      charImg.onerror = bgDone
      charImg.src = selectedCharacter.img
    }

    const save = () => {
      const link = document.createElement("a")
      link.download = "colour-me-in.png"
      link.href = offscreen.toDataURL("image/png")
      link.click()
    }

    if (selectedBg) {
      const bgImg = new Image()
      bgImg.crossOrigin = "anonymous"
      bgImg.onload = () => {
        // Fill canvas with background (cover)
        const scale = Math.max(W / bgImg.naturalWidth, H / bgImg.naturalHeight)
        const bw = bgImg.naturalWidth  * scale
        const bh = bgImg.naturalHeight * scale
        const bx = (W - bw) / 2
        const by = (H - bh) / 2
        ctx.drawImage(bgImg, bx, by, bw, bh)
        drawAndSave(save)
      }
      bgImg.onerror = () => drawAndSave(save)
      bgImg.src = selectedBg.img
    } else {
      // No background – fill with the canvas tint colour
      ctx.fillStyle = "#ede9fe"
      ctx.fillRect(0, 0, W, H)
      drawAndSave(save)
    }
  }

  return (
    <div className="app-container">
      <Header onBack={handleBack} onDownload={handleDownload} />

      {/* ── Colouring canvas ── */}
      <div className="main">
        <div
          ref={canvasRef}
          className={`colouring-canvas ${selectedBg || selectedCharacter ? "has-content" : ""}`}
          style={selectedBg ? { backgroundImage: `url(${selectedBg.img})` } : {}}
        >
          {!selectedBg && !selectedCharacter && (
            <span className="canvas-placeholder">Let's do some colouring</span>
          )}

          {selectedCharacter && (
            <img
              src={selectedCharacter.img}
              alt={selectedCharacter.label}
              className="canvas-character"
            />
          )}

          {/* Clear button – only show when something is selected */}
          {(selectedBg || selectedCharacter) && (
            <button
              className="canvas-clear-btn"
              onClick={() => { setSelectedBg(null); setSelectedCharacter(null) }}
              aria-label="Clear selection"
              title="Clear"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Positions row ── */}
      <section className="cards-section">
        <h2 className="section-title">Positions</h2>
        <div className="cards-row">
          {positions.map((item) => (
            <div
              key={item.id}
              className={`card ${selectedCharacter?.id === item.id ? "card--active" : ""}`}
              onClick={() =>
                setSelectedCharacter(prev => prev?.id === item.id ? null : item)
              }
              role="button"
              aria-label={`Select ${item.label}`}
            >
              <img src={item.img} alt={item.label} className="card-img card-img--pos" />
              <span className="card-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Backgrounds row ── */}
      <section className="cards-section">
        <h2 className="section-title">Backgrounds</h2>
        <div className="cards-row">
          {backgrounds.map((item) => (
            <div
              key={item.id}
              className={`card ${selectedBg?.id === item.id ? "card--active" : ""}`}
              onClick={() =>
                setSelectedBg(prev => prev?.id === item.id ? null : item)
              }
              role="button"
              aria-label={`Select ${item.label} background`}
            >
              <img src={item.img} alt={item.label} className="card-img" />
              <span className="card-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
