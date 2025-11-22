import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

interface NoResultsProps {
	searchQuery: string;
	selectedType: string;
	showFavoritesOnly: boolean;
	onClearFilters: () => void;
}

export function NoResults({ searchQuery, selectedType, showFavoritesOnly, onClearFilters }: NoResultsProps) {
	const { t } = useTranslation();

	// Build dynamic message based on active filters
	const buildMessage = () => {
		// Build main message part
		let mainMessage: JSX.Element;

		if (searchQuery) {
			const baseText = t("pokedex.noResultsWithName", { query: "___QUERY___" });
			const parts = baseText.split("___QUERY___");

			if (showFavoritesOnly) {
				// With favorites prefix: "In your favorites I couldn't find..."
				mainMessage = (
					<>
						{t("pokedex.noResultsFavoritesPrefix")} {parts[0].toLowerCase()}
						<span className="font-semibold">{searchQuery}</span>
						{parts[1]}
					</>
				);
			} else {
				// Without favorites: "I couldn't find..."
				mainMessage = (
					<>
						{parts[0]}
						<span className="font-semibold">{searchQuery}</span>
						{parts[1]}
					</>
				);
			}
		} else {
			if (showFavoritesOnly) {
				// With favorites prefix: "In your favorites I couldn't find..."
				mainMessage = (
					<>
						{t("pokedex.noResultsFavoritesPrefix")} {t("pokedex.noResultsBase").toLowerCase()}
					</>
				);
			} else {
				// Without favorites: "I couldn't find..."
				mainMessage = t("pokedex.noResultsBase");
			}
		}

		// Build type condition
		const typeCondition =
			selectedType !== "all" ? (
				<>
					{t("pokedex.noResultsTypeCondition", { type: "___TYPE___" }).split("___TYPE___")[0]}
					<span className="font-semibold">{t(`types.${selectedType}`).toLowerCase()}</span>
					{t("pokedex.noResultsTypeCondition", { type: "___TYPE___" }).split("___TYPE___")[1]}
				</>
			) : null;

		return (
			<>
				{mainMessage}
				{typeCondition && <> {typeCondition}</>}.
			</>
		);
	};

	return (
		<div className="flex items-center justify-center py-16">
			<Empty className="border-0">
				<EmptyHeader>
					<EmptyMedia>
						<img
							src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
							alt="Psyduck"
							className="w-48 h-48 opacity-50"
						/>
					</EmptyMedia>
					<EmptyTitle>{t("pokedex.noResults")}</EmptyTitle>
					<EmptyDescription>{buildMessage()}</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button onClick={onClearFilters} className="gap-2">
						{t("pokedex.browseAll")}
					</Button>
				</EmptyContent>
			</Empty>
		</div>
	);
}
