const poses = [
  { id: 'confident', label: 'Confident', image: './assets/pose-confident.svg' },
  { id: 'fighting', label: 'Fighting', image: './assets/pose-fighting.svg' },
  { id: 'sitting-down', label: 'Sitting Down', image: './assets/pose-sitting-down.svg' },
  { id: 'thinking', label: 'Thinking', image: './assets/pose-thinking.svg' },
  { id: 'wave', label: 'Wave', image: './assets/pose-wave.svg' },
]

const backgrounds = [
  { id: 'studio', label: 'Studio', image: './assets/studio.png' },
  { id: 'paris', label: 'Paris', image: './assets/paris.png' },
]

const state = {
  pose: poses[0],
  background: backgrounds[0],
  size: 80,
  x: 50,
  y: 82,
}

const stage = document.querySelector('#stage')
const backgroundImage = document.querySelector('#backgroundImage')
const characterImage = document.querySelector('#characterImage')
const poseChoices = document.querySelector('#poseChoices')
const backgroundChoices = document.querySelector('#backgroundChoices')
const sizeSlider = document.querySelector('#sizeSlider')
const sizeValue = document.querySelector('#sizeValue')
const resetButton = document.querySelector('#resetButton')
const backButton = document.querySelector('#backButton')
const downloadButton = document.querySelector('#downloadButton')

let dragging = false

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function render() {
  backgroundImage.src = state.background.image
  characterImage.src = state.pose.image
  characterImage.style.left = `${state.x}%`
  characterImage.style.top = `${state.y}%`
  characterImage.style.width = `${state.size}%`
  sizeSlider.value = String(state.size)
  sizeValue.textContent = `${state.size}%`

  document.querySelectorAll('[data-pose]').forEach(button => {
    button.classList.toggle('is-active', button.dataset.pose === state.pose.id)
  })

  document.querySelectorAll('[data-background]').forEach(button => {
    button.classList.toggle('is-active', button.dataset.background === state.background.id)
  })
}

function makeChoice(item, type) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = `choice-card choice-card--${type}`
  button.dataset[type] = item.id
  button.setAttribute('aria-label', `Choose ${item.label}`)

  const image = document.createElement('img')
  image.src = item.image
  image.alt = ''
  image.draggable = false

  const label = document.createElement('span')
  label.textContent = item.label

  button.append(image, label)
  return button
}

function buildChoices() {
  poses.forEach(pose => {
    const button = makeChoice(pose, 'pose')
    button.addEventListener('click', () => {
      state.pose = pose
      render()
    })
    poseChoices.append(button)
  })

  backgrounds.forEach(background => {
    const button = makeChoice(background, 'background')
    button.addEventListener('click', () => {
      state.background = background
      render()
    })
    backgroundChoices.append(button)
  })
}

function setPositionFromPointer(event) {
  const rect = stage.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100

  state.x = clamp(Math.round(x), 8, 92)
  state.y = clamp(Math.round(y), 30, 98)
  render()
}

characterImage.addEventListener('pointerdown', event => {
  dragging = true
  characterImage.setPointerCapture(event.pointerId)
  setPositionFromPointer(event)
})

characterImage.addEventListener('pointermove', event => {
  if (!dragging) return
  setPositionFromPointer(event)
})

characterImage.addEventListener('pointerup', event => {
  dragging = false
  characterImage.releasePointerCapture(event.pointerId)
})

characterImage.addEventListener('pointercancel', () => {
  dragging = false
})

stage.addEventListener('click', event => {
  if (event.target === characterImage) return
  setPositionFromPointer(event)
})

sizeSlider.addEventListener('input', event => {
  state.size = Number(event.target.value)
  render()
})

resetButton.addEventListener('click', () => {
  state.size = 80
  state.x = 50
  state.y = 82
  render()
})

document.querySelectorAll('[data-nudge]').forEach(button => {
  button.addEventListener('click', () => {
    const direction = button.dataset.nudge
    const amount = 3

    if (direction === 'left') state.x = clamp(state.x - amount, 8, 92)
    if (direction === 'right') state.x = clamp(state.x + amount, 8, 92)
    if (direction === 'up') state.y = clamp(state.y - amount, 30, 98)
    if (direction === 'down') state.y = clamp(state.y + amount, 30, 98)

    render()
  })
})

backButton.addEventListener('click', () => {
  if (window.history.length > 1) {
    window.history.back()
  }
})

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function drawCoveredImage(context, image, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  const left = (width - drawWidth) / 2
  const top = (height - drawHeight) / 2

  context.drawImage(image, left, top, drawWidth, drawHeight)
}

downloadButton.addEventListener('click', async () => {
  const width = 1200
  const height = 1500
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  const [background, character] = await Promise.all([
    loadImage(state.background.image),
    loadImage(state.pose.image),
  ])

  drawCoveredImage(context, background, width, height)

  const characterWidth = width * (state.size / 100)
  const characterHeight = characterWidth * (character.naturalHeight / character.naturalWidth)
  const left = (width * state.x) / 100 - characterWidth / 2
  const top = (height * state.y) / 100 - characterHeight

  context.shadowColor = 'rgba(0, 0, 0, 0.24)'
  context.shadowBlur = 22
  context.shadowOffsetY = 10
  context.drawImage(character, left, top, characterWidth, characterHeight)

  const link = document.createElement('a')
  link.download = 'colour-me-in.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
})

buildChoices()
render()
