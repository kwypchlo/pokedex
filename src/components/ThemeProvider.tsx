import { createContext, useContext, useEffect, useState } from "react";
import { useSettingsStore } from "@/stores/useSettingsStore";

type Theme = "light" | "dark" | "auto";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	effectiveTheme: "light" | "dark";
	mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);
	const theme = useSettingsStore((state) => state.theme);
	const setThemeStore = useSettingsStore((state) => state.setTheme);

	const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(() => {
		// Initialize from current DOM state to avoid mismatch
		if (typeof window !== "undefined") {
			return document.documentElement.classList.contains("dark") ? "dark" : "light";
		}
		return "light";
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;

		// Determine the effective theme
		let applied: "light" | "dark" = "light";

		if (theme === "auto") {
			// Check system preference
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			applied = systemTheme;
		} else {
			applied = theme;
		}

		setEffectiveTheme(applied);

		// Apply theme to DOM
		root.classList.remove("light", "dark");
		root.classList.add(applied);

		// Listen for system theme changes when in auto mode
		if (theme === "auto") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = (e: MediaQueryListEvent) => {
				const newTheme = e.matches ? "dark" : "light";
				setEffectiveTheme(newTheme);
				root.classList.remove("light", "dark");
				root.classList.add(newTheme);
			};

			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme: setThemeStore, effectiveTheme, mounted }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return context;
}
