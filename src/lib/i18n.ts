import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import pl from "@/locales/pl.json";
import { useSettingsStore } from "@/stores/useSettingsStore";

const resources = {
	en: {
		translation: en,
	},
	pl: {
		translation: pl,
	},
};

// Supported languages - only Polish and English
const SUPPORTED_LANGUAGES = ["pl", "en"] as const;

// Detect initial language from browser
const detectInitialLanguage = (): "pl" | "en" => {
	// First check if zustand store has persisted language
	const stored = useSettingsStore.getState().language;
	if (stored) return stored;

	// Otherwise detect from browser
	const browserLang =
		// biome-ignore lint/suspicious/noExplicitAny: Legacy browser API support
		navigator.language || (navigator as any).userLanguage || "";

	// Check if it starts with 'pl' (covers pl, pl-PL, pl-pl, etc.)
	if (browserLang.toLowerCase().startsWith("pl")) {
		// Set it in the store for future use
		useSettingsStore.getState().setLanguage("pl");
		return "pl";
	}

	// Default to English
	useSettingsStore.getState().setLanguage("en");
	return "en";
};

i18n
	// Pass the i18n instance to react-i18next
	.use(initReactI18next)
	// Init i18next
	.init({
		resources,
		lng: detectInitialLanguage(),
		fallbackLng: "en",
		supportedLngs: SUPPORTED_LANGUAGES,
		debug: false,
		interpolation: {
			escapeValue: false, // React already escapes values
		},
	});

// Subscribe to language changes in zustand store and sync to i18n
useSettingsStore.subscribe((state, prevState) => {
	if (state.language !== prevState.language) {
		i18n.changeLanguage(state.language);
	}
});

export default i18n;
