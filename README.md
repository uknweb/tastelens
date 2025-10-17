# TasteLens

**Fashion outfit analysis through different aesthetic taste profiles**

A polished demo showcasing how taste-powered outfit analysis can enhance virtual try-on experiences by helping users make better purchase decisions.

## What is TasteLens?

TasteLens analyzes outfit photos through three distinct aesthetic perspectives:

- **Refined Minimalist**: Quality over quantity, intentional simplicity
- **Maximalist Edge**: Fashion as art, bold self-expression
- **Contemporary Balanced**: Modern classics with wearable edge

Each profile provides:
- Overall score (0-10)
- What's working in the outfit
- What to adjust
- Key fashion principle

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Lucide React (icons)
- No backend required (pre-generated analyses)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
taste-lens/
├── src/
│   ├── components/      # React components
│   ├── data/           # Taste profiles & analyses
│   ├── utils/          # Helper functions
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
└── index.html          # HTML template
```

## Features

- Drag-and-drop image upload
- Simulated analysis with loading state
- Side-by-side comparison of three taste profiles
- Color-coded scores
- Detailed feedback and principles
- Mobile responsive design
- Premium, luxury aesthetic

## Design Philosophy

The UI follows luxury fashion app principles:
- Clean and minimal
- Generous white space
- Subtle shadows
- Smooth transitions
- Professional and polished

## Deployment

This app can be deployed to:
- Vercel (recommended)
- Netlify
- Any static hosting service

Simply connect your GitHub repository and deploy the `main` branch.

## Demo Purpose

This is a concept validation demo built for Doji pitch to demonstrate how taste-powered analysis can enhance virtual try-on experiences. It's not a full product but a polished proof-of-concept.

## License

MIT
