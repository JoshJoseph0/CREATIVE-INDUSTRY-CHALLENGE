<div align="center">

# 🎨 Colour Me In

**An interactive colouring app built for the Creative Industry Challenge**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

*Pick a character. Pick a background. Download your masterpiece.*

</div>

---

## ✨ What Is This?

**Colour Me In** is a fun, interactive web app that lets users build their own colourful scenes by selecting a character pose and a background environment. Once happy with their creation, they can **download it as a PNG** — all directly from the browser, no install required.

This project was created as part of the **Creative Industry Challenge**, aiming to make digital creativity accessible and enjoyable for everyone.

---

## 🖼️ Features

| Feature | Description |
|---|---|
| 🧍 **Character Selector** | Choose from multiple poses of *George* (Calm, 67, Sat, Waving) |
| 🌍 **Background Selector** | Pick a scene — Forest 🌲, Beach 🏖️, Space 🚀, or Garden 🌸 |
| 🖼️ **Live Preview Canvas** | See your character layered over your chosen background in real time |
| 💾 **Download as PNG** | Export your finished scene at full resolution with one click |
| ✕ **Clear & Start Again** | Reset your canvas instantly and try a new combination |
| 📱 **Responsive Header** | Clean header with Back and Download buttons that work on any screen size |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JoshJoseph0/CREATIVE-INDUSTRY-CHALLENGE.git
   cd CREATIVE-INDUSTRY-CHALLENGE/colour
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [`http://localhost:5173`](http://localhost:5173)

---

## 🛠️ Build for Production

```bash
npm run build
```
The output will be in the `dist/` folder, ready to deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Structure

```
colour/
├── public/                 # Static assets served as-is
├── src/
│   ├── assets/             # Images (character poses + backgrounds)
│   │   ├── pos_george_calm.png
│   │   ├── pos_george_67.png
│   │   ├── pos_george_sat.png
│   │   ├── pos_george_waving.png
│   │   ├── bg_forest.png
│   │   ├── bg_beach.png
│   │   ├── bg_space.png
│   │   └── bg_garden.png
│   ├── components/
│   │   ├── Header.jsx      # App header (Back + Download buttons)
│   │   └── Header.css      # Header styles
│   ├── App.jsx             # Main app component & scene logic
│   ├── App.css             # Global styles and layout
│   └── main.jsx            # React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎮 How to Use

1. **Pick a Position** — Browse the *Positions* row at the bottom and click a pose to place George on the canvas.
2. **Pick a Background** — Browse the *Backgrounds* row and click a scene to set the backdrop.
3. **Preview your scene** — Watch the canvas update live with your character layered over the background.
4. **Download** — Hit the **Download** button in the header to save your scene as a `.png` file.
5. **Start over** — Click the **✕ Clear** button on the canvas to reset and try again.

> 💡 **Tip:** You can select *just* a background, *just* a character, or both together!

---

## 🧰 Tech Stack

- **[React 19](https://react.dev/)** — Component-based UI
- **[Vite 7](https://vitejs.dev/)** — Lightning-fast dev server and bundler
- **Vanilla CSS** — Custom styling with no external UI libraries
- **HTML5 Canvas API** — Used server-side (offscreen) for compositing and PNG export

---

## 📸 How the Download Works

When you click **Download**, the app:
1. Creates an **offscreen HTML Canvas** matching the preview area's size.
2. Draws the selected **background** image (scaled to fill, cover-style).
3. Draws the selected **character** image on top (bottom-centred, with a subtle drop shadow).
4. Exports the result as a **PNG** and triggers a browser download.

This all happens client-side — no server, no uploads, no waiting.

---

## 🤝 Contributing

This is a challenge project, but feel free to fork it and experiment! If you'd like to suggest improvements:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/my-idea`)
3. Commit your changes (`git commit -m 'Add my idea'`)
4. Push to the branch (`git push origin feature/my-idea`)
5. Open a Pull Request

---

## 📄 Licence

This project was created for the **Creative Industry Challenge** and is intended for educational and demonstration purposes.

---

<div align="center">

Made with ❤️ for the Creative Industry Challenge

</div>
