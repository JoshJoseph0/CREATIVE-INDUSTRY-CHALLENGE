import fs from 'fs'
import path from 'path'

const outputDir = path.resolve('output')
const outputPath = path.join(outputDir, 'georgeapp-summary.pdf')

fs.mkdirSync(outputDir, { recursive: true })

const page = {
  width: 595.28,
  height: 841.89,
  margin: 40,
}

const sections = [
  {
    title: 'What it is',
    lines: [
      'Georgeapp is a single-page React + Vite interface for browsing a short set of chapter-style story cards about George.',
      'The current repo shows a touch-friendly reading experience with progress tracking and a placeholder listen action, not a full content platform.',
    ],
  },
  {
    title: "Who it's for",
    lines: [
      'Primary persona: a mobile-first reader or listener exploring a chapter-based narrative about George.',
    ],
  },
  {
    title: 'What it does',
    lines: [
      '- Shows four in-memory chapter cards with title, body copy, and accent color.',
      '- Lets users swipe left/right between cards with pointer events and snap thresholds.',
      '- Supports back navigation to the previous card from the fixed header.',
      '- Displays reading progress as a header progress bar tied to the active card.',
      '- Offers clickable progress dots for direct card selection.',
      '- Renders a prominent "Tap to listen" button with press/hover animation.',
      '- Applies mobile-oriented visual styling with fixed header, dotted background, and card motion effects.',
    ],
  },
  {
    title: 'How it works',
    lines: [
      'Browser -> index.html mounts React at #root -> src/main.jsx renders App inside StrictMode.',
      'App.jsx stores the chapter data locally in a CARDS array and manages active index, drag offset, and dragging state with React hooks.',
      'Header.jsx receives title, progress, and onBack props from App and renders the fixed top bar.',
      'App.css and Header.css provide layout, animations, and touch-focused presentation.',
      'Services/API/persistence/audio playback: Not found in repo.',
    ],
  },
  {
    title: 'How to run',
    lines: [
      '1. Open a terminal in georgeapp/.',
      '2. Install dependencies: npm install',
      '3. Start local dev server: npm run dev',
      '4. Open the local Vite URL shown in the terminal.',
      'Build/preview scripts exist in package.json: npm run build and npm run preview.',
    ],
  },
]

function escapePdfText(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/)
  const lines = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length <= maxChars) {
      current = next
    } else {
      if (current) lines.push(current)
      current = word
    }
  }

  if (current) lines.push(current)
  return lines
}

const content = []

function line(text) {
  content.push(text)
}

function drawText(text, x, y, size = 11, font = 'F1') {
  line('BT')
  line(`/${font} ${size} Tf`)
  line(`${x.toFixed(2)} ${y.toFixed(2)} Td`)
  line(`(${escapePdfText(text)}) Tj`)
  line('ET')
}

function drawWrappedText(text, x, y, options = {}) {
  const size = options.size ?? 11
  const leading = options.leading ?? 14
  const font = options.font ?? 'F1'
  const maxChars = options.maxChars ?? 82
  const lines = wrapText(text, maxChars)
  let currentY = y

  for (const item of lines) {
    drawText(item, x, currentY, size, font)
    currentY -= leading
  }

  return currentY
}

function drawSectionTitle(title, x, y, width) {
  line('0.96 0.84 0.72 rg')
  line(`${x.toFixed(2)} ${(y - 18).toFixed(2)} ${width.toFixed(2)} 22 re f`)
  drawText(title, x + 10, y - 3, 12, 'F2')
}

drawText('Georgeapp Repo Summary', page.margin, page.height - 46, 22, 'F2')
drawText('One-page evidence-based overview generated from the repository.', page.margin, page.height - 66, 10, 'F1')

let y = page.height - 102
const sectionWidth = page.width - page.margin * 2

for (const section of sections) {
  drawSectionTitle(section.title, page.margin, y, sectionWidth)
  y -= 32

  for (const item of section.lines) {
    y = drawWrappedText(item, page.margin + 8, y, {
      size: 10.5,
      leading: 13,
      font: 'F1',
      maxChars: 88,
    })
    y -= 5
  }

  y -= 10
}

drawText('Repo notes: README is still the default Vite template; no backend, database, auth, or audio implementation is present.', page.margin, 32, 8.5, 'F1')

const stream = content.join('\n')

const objects = []

function addObject(body) {
  objects.push(body)
  return objects.length
}

const catalogId = addObject('<< /Type /Catalog /Pages 2 0 R >>')
const pagesId = addObject('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
const pageId = addObject(
  `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
)
const fontRegularId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
const fontBoldId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>')
const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`)

if (catalogId !== 1 || pagesId !== 2 || pageId !== 3 || fontRegularId !== 4 || fontBoldId !== 5 || contentId !== 6) {
  throw new Error('Unexpected PDF object ordering')
}

let pdf = '%PDF-1.4\n'
const offsets = [0]

for (let i = 0; i < objects.length; i += 1) {
  offsets.push(Buffer.byteLength(pdf, 'utf8'))
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`
}

const xrefStart = Buffer.byteLength(pdf, 'utf8')
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'

for (let i = 1; i < offsets.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}

pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

fs.writeFileSync(outputPath, pdf, 'binary')
console.log(outputPath)
