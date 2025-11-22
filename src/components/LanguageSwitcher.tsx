import { useSettingsStore } from "@/stores/useSettingsStore";
import { Button } from "./ui/button";

export function LanguageSwitcher() {
	const language = useSettingsStore((state) => state.language);
	const setLanguage = useSettingsStore((state) => state.setLanguage);

	const toggleLanguage = () => {
		const newLang = language === "en" ? "pl" : "en";
		setLanguage(newLang);
	};

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={toggleLanguage}
			className="font-bold text-white hover:bg-white/30 gap-2 bg-black/20 backdrop-blur-sm"
			title={language === "en" ? "Switch to Polish" : "Przełącz na angielski"}
		>
			<span className="drop-shadow-md">{language === "en" ? "🇬🇧" : "🇵🇱"}</span>
			<span>{language === "en" ? "EN" : "PL"}</span>
		</Button>
	);
}
