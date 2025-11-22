# 🎮 Pokédex Explorer

An interactive Pokémon encyclopedia and quiz game built for kids, featuring all 151 Generation I Pokémon.

![Pokémon](https://img.shields.io/badge/Pok%C3%A9mon-Gen%201-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-19.x-61DAFB)
![Bun](https://img.shields.io/badge/Bun-1.x-black)

## ✨ Features

### 🔍 Interactive Pokédex
- **Complete Gen 1 Collection**: Browse all 151 original Pokémon
- **Detailed Information**: View stats, types, abilities, and evolution chains
- **Advanced Filtering**: Search by name and filter by type
- **Favorites System**: Mark and filter your favorite Pokémon
- **Swipe Navigation**: Swipe left/right to browse Pokémon (touch-optimized)

### 🎯 "Who's That Pokémon?" Quiz
- **Silhouette Recognition**: Identify Pokémon from their silhouettes
- **Multiple Choice**: 4 answer options per question
- **Score Tracking**: Track your score and streak
- **High Score System**: Beat your personal best
- **Fun Animations**: Confetti on correct answers, shake on wrong ones
- **Persistent Stats**: Your progress is saved locally

### 🌙 Modern UI/UX
- **Dark Mode**: Automatic, light, and dark themes
- **Multilingual**: Full English and Polish translations
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Powered by Framer Motion
- **Accessible**: Proper touch targets and keyboard navigation

## 🚀 Tech Stack

- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime
- **Framework**: [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- **UI Library**: [React 19](https://react.dev) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **i18n**: [react-i18next](https://react.i18next.com)
- **API**: [PokéAPI](https://pokeapi.co)

## 📦 Installation

### Prerequisites
- [Bun](https://bun.sh) 1.x or higher

### Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd poke
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── components/
│   ├── pokemon/
│   │   ├── PokemonCard.tsx       # Pokemon grid card
│   │   ├── PokemonDetail.tsx     # Detail modal with swipe
│   │   ├── StatBar.tsx           # Animated stat bars
│   │   └── TypeBadge.tsx         # Pokemon type badges
│   ├── Header.tsx                # Navigation header
│   ├── LanguageSwitcher.tsx      # EN/PL toggle
│   └── ThemeToggle.tsx           # Light/Dark/Auto theme
├── routes/
│   ├── __root.tsx                # Root layout
│   ├── index.tsx                 # Home page
│   ├── pokedex.tsx               # Pokédex grid
│   ├── quiz.tsx                  # Quiz game
│   └── about.tsx                 # About page
├── lib/
│   ├── api/
│   │   └── pokemon.ts            # PokéAPI integration
│   ├── storage.ts                # LocalStorage utilities
│   └── i18n.ts                   # i18next config
├── stores/
│   └── useFavoritesStore.ts      # Zustand favorites store
├── hooks/
│   └── useFavorites.ts           # Favorites hook
└── locales/
    ├── en.json                   # English translations
    └── pl.json                   # Polish translations
```

## 🎮 Usage

### Browsing Pokémon
1. Navigate to **Pokédex** from the menu
2. Use the search bar to find Pokémon by name
3. Filter by type using the dropdown
4. Click on any Pokémon to view detailed information
5. Swipe left/right in the detail view to browse

### Playing the Quiz
1. Navigate to **Quiz** from the menu
2. Identify the Pokémon from its silhouette
3. Select from 4 multiple choice answers
4. Watch your streak and try to beat your high score!

### Managing Favorites
1. Click the heart icon on any Pokémon card
2. Toggle "Favorites" filter to view only favorited Pokémon
3. Favorites are saved locally and persist across sessions

### Switching Languages
- Click the language toggle in the header (EN/PL)
- All text, including Pokémon descriptions, will update

### Changing Theme
- Click the theme toggle in the header
- Choose from: Light, Dark, or Auto (follows system)

## 🌐 API

This app uses [PokéAPI](https://pokeapi.co) for all Pokémon data:
- Pokémon sprites (official artwork)
- Stats, types, and abilities
- Evolution chains
- Pokédex descriptions

## 💾 Local Storage

The app stores the following data locally:
- **Favorites**: List of favorited Pokémon IDs
- **Quiz Stats**: High score, total correct, total attempts
- **Theme**: User's theme preference
- **Language**: User's language preference

## 🎨 Design Philosophy

Built with kids in mind:
- **Colorful and Playful**: Vibrant gradients and animations
- **Easy to Use**: Large touch targets and intuitive navigation
- **Educational**: Learn about Pokémon stats and evolution
- **Engaging**: Interactive quiz with instant feedback

## 🛠️ Development

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Lint code with Biome
- `bun run format` - Format code with Biome
- `bun run check` - Check code quality

### Adding Components

```bash
bunx shadcn@latest add <component-name>
```

## 📄 License

This project is for educational purposes. Pokémon and Pokémon character names are trademarks of Nintendo.

## 🙏 Credits

- **Pokémon Data**: [PokéAPI](https://pokeapi.co)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide](https://lucide.dev)
- **Pokémon**: © Nintendo/Creatures Inc./GAME FREAK inc.

## 🤝 Contributing

This is a personal project built for learning. Feel free to fork and modify for your own use!

---

**Made with ❤️ for Pokémon fans everywhere**
