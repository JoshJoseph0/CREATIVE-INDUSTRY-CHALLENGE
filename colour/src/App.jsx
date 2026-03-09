import { useState } from "react"
import "./App.css"
import Header from "./components/Header"

import posCat       from "./assets/pos_cat.png"
import posDog       from "./assets/pos_dog.png"
import posButterfly from "./assets/pos_butterfly.png"
import posRainbow   from "./assets/pos_rainbow.png"
import posDinosaur  from "./assets/pos_dinosaur.png"
import posRocket    from "./assets/pos_rocket.png"

import bgForest  from "./assets/bg_forest.png"
import bgBeach   from "./assets/bg_beach.png"
import bgSpace   from "./assets/bg_space.png"
import bgGarden  from "./assets/bg_garden.png"

const positions = [
  { id: "pos-1", label: "Cat",       img: posCat       },
  { id: "pos-2", label: "Dog",       img: posDog       },
  { id: "pos-3", label: "Butterfly", img: posButterfly },
  { id: "pos-4", label: "Rainbow",   img: posRainbow   },
  { id: "pos-5", label: "Dinosaur",  img: posDinosaur  },
  { id: "pos-6", label: "Rocket",    img: posRocket    },
]

const backgrounds = [
  { id: "bg-1", label: "Forest", img: bgForest },
  { id: "bg-2", label: "Beach",  img: bgBeach  },
  { id: "bg-3", label: "Space",  img: bgSpace  },
  { id: "bg-4", label: "Garden", img: bgGarden },
]

function App() {
  const [preview, setPreview] = useState(null)   // { img, label } | null

  const handleBack = () => {
    console.log("Back pressed")
  }

  const handleDownload = () => {
    console.log("Download pressed")
  }

  return (
    <div className="app-container">
      <Header onBack={handleBack} onDownload={handleDownload} />

      <div className="main">
        <p>Let's do some colouring</p>
      </div>

      {/* ── Positions row ── */}
      <section className="cards-section">
        <h2 className="section-title">Positions</h2>
        <div className="cards-row">
          {positions.map((item) => (
            <div
              key={item.id}
              className="card"
              onClick={() => setPreview(item)}
              role="button"
              aria-label={`Preview ${item.label}`}
            >
              <img src={item.img} alt={item.label} className="card-img" />
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
              className="card"
              onClick={() => setPreview(item)}
              role="button"
              aria-label={`Preview ${item.label}`}
            >
              <img src={item.img} alt={item.label} className="card-img" />
              <span className="card-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Lightbox / Preview overlay ── */}
      {preview && (
        <div
          className="lightbox-overlay"
          onClick={() => setPreview(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview of ${preview.label}`}
        >
          <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setPreview(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <img
              src={preview.img}
              alt={preview.label}
              className="lightbox-img"
            />
            <p className="lightbox-title">{preview.label}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
