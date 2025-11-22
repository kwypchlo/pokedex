import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "auto";
type Language = "en" | "pl";

interface QuizStats {
	highScore: number;
	totalCorrect: number;
	totalAttempts: number;
}

interface SettingsStore {
	// Theme
	theme: Theme;
	setTheme: (theme: Theme) => void;

	// Language
	language: Language;
	setLanguage: (language: Language) => void;

	// Quiz Settings
	autoNext: boolean;
	setAutoNext: (autoNext: boolean) => void;

	// Quiz Stats
	quizStats: QuizStats;
	updateQuizStats: (stats: Partial<QuizStats>) => void;
	resetQuizStats: () => void;

	// Favorites
	favorites: number[];
	toggleFavorite: (pokemonId: number) => boolean;
	isFavorite: (pokemonId: number) => boolean;

	// Caught Pokemon (for future use)
	caught: number[];
	toggleCaught: (pokemonId: number) => boolean;
	isCaught: (pokemonId: number) => boolean;
}

const DEFAULT_QUIZ_STATS: QuizStats = {
	highScore: 0,
	totalCorrect: 0,
	totalAttempts: 0,
};

export const useSettingsStore = create<SettingsStore>()(
	persist(
		(set, get) => ({
			// Theme
			theme: "auto",
			setTheme: (theme) => set({ theme }),

			// Language
			language: "en",
			setLanguage: (language) => set({ language }),

			// Quiz Settings
			autoNext: true,
			setAutoNext: (autoNext) => set({ autoNext }),

			// Quiz Stats
			quizStats: DEFAULT_QUIZ_STATS,
			updateQuizStats: (stats) =>
				set((state) => ({
					quizStats: { ...state.quizStats, ...stats },
				})),
			resetQuizStats: () => set({ quizStats: DEFAULT_QUIZ_STATS }),

			// Favorites
			favorites: [],
			toggleFavorite: (pokemonId) => {
				const { favorites } = get();
				const isFavorite = favorites.includes(pokemonId);

				if (isFavorite) {
					set({ favorites: favorites.filter((id) => id !== pokemonId) });
				} else {
					set({ favorites: [...favorites, pokemonId] });
				}

				return !isFavorite;
			},
			isFavorite: (pokemonId) => get().favorites.includes(pokemonId),

			// Caught Pokemon
			caught: [],
			toggleCaught: (pokemonId) => {
				const { caught } = get();
				const isCaught = caught.includes(pokemonId);

				if (isCaught) {
					set({ caught: caught.filter((id) => id !== pokemonId) });
				} else {
					set({ caught: [...caught, pokemonId] });
				}

				return !isCaught;
			},
			isCaught: (pokemonId) => get().caught.includes(pokemonId),
		}),
		{
			name: "pokemon-settings",
			// Only persist certain fields, not computed values
			partialize: (state) => ({
				theme: state.theme,
				language: state.language,
				autoNext: state.autoNext,
				quizStats: state.quizStats,
				favorites: state.favorites,
				caught: state.caught,
			}),
		},
	),
);
