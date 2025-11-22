import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

export function ThemeToggle() {
	const { theme, setTheme, mounted } = useTheme();

	// Don't render until mounted to avoid hydration mismatch
	if (!mounted) {
		return (
			<Button
				variant="ghost"
				size="sm"
				className="font-bold text-white gap-2 bg-black/20 backdrop-blur-sm opacity-0"
				disabled
			>
				<span className="text-base">🌗</span>
				<span className="hidden sm:inline">...</span>
			</Button>
		);
	}

	const cycleTheme = () => {
		const themes: Array<"light" | "dark" | "auto"> = ["light", "dark", "auto"];
		const currentIndex = themes.indexOf(theme);
		const nextIndex = (currentIndex + 1) % themes.length;
		setTheme(themes[nextIndex]);
	};

	const getIcon = () => {
		switch (theme) {
			case "light":
				return "☀️";
			case "dark":
				return "🌙";
			case "auto":
				return "🌗";
		}
	};

	const getLabel = () => {
		switch (theme) {
			case "light":
				return "Light";
			case "dark":
				return "Dark";
			case "auto":
				return "Auto";
		}
	};

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={cycleTheme}
			className="font-bold text-white hover:bg-white/30 gap-2 bg-black/20 backdrop-blur-sm"
			title={`Theme: ${getLabel()} (click to cycle)`}
		>
			<span className="text-base drop-shadow-md">{getIcon()}</span>
			<span className="hidden sm:inline">{getLabel()}</span>
		</Button>
	);
}
