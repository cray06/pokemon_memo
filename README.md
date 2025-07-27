# Pokemon Memory Game

A Pokemon-themed memory card game built with modern web technologies. Players flip cards to find matching pairs of Pokemon, with customizable game configurations and score tracking.

## Features

- **Pokemon Memory Game**: Find matching pairs of Pokemon cards
- **Customizable Board**: Configurable board size and number of Pokemon
- **Score Tracking**: Real-time score and best score persistence
- **Game Configuration**: Adjustable difficulty settings
- **Help System**: In-game rules and instructions
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Smooth loading animations and overlays
- **Confetti Effects**: Celebration animations for successful matches

## How to Play

1. Click on cards to flip them and reveal Pokemon
2. Try to find matching pairs of Pokemon
3. When you find a match, your score increases
4. The game tracks your best score across sessions
5. Use the help button (top-left) to view detailed rules

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon_memory
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS + Material-UI (MUI)
- **API**: PokeAPI for Pokemon data
- **Effects**: Canvas Confetti for celebrations
- **Build Tools**: ESLint, Prettier for code quality

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/             # Reusable UI components
│   ├── CardGrid.tsx       # Main game board
│   ├── CardItem.tsx       # Individual card component
│   ├── GameConfigDialog.tsx # Game setup dialog
│   ├── Header.tsx         # Score display
│   └── ...
├── container/interface/    # TypeScript interfaces
└── modules/API/pokemon/    # Pokemon API integration
```

## Dependencies

### Main Dependencies
- **Next.js**: React framework for production
- **React**: UI library
- **Material-UI**: Component library for React
- **TailwindCSS**: Utility-first CSS framework
- **pokeapi-types**: TypeScript types for PokeAPI
- **canvas-confetti**: Celebration effects

### Development Dependencies
- **TypeScript**: Type-safe JavaScript
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Contributing

Gabriel Decloquement - Full Stack Developer

## License

This project is private and not intended for public distribution.
