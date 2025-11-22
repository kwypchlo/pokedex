import { createFileRoute } from "@tanstack/react-router";
import Fuse from "fuse.js";
import { Heart, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NoResults } from "@/components/pokemon/NoResults";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonDetail } from "@/components/pokemon/PokemonDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPokemonIdFromUrl, usePokemon, usePokemonList } from "@/lib/api/pokemon";
import { useSettingsStore } from "@/stores/useSettingsStore";

export const Route = createFileRoute("/pokedex")({ component: Pokedex });

const POKEMON_TYPES = [
	"normal",
	"fire",
	"water",
	"grass",
	"electric",
	"ice",
	"fighting",
	"poison",
	"ground",
	"flying",
	"psychic",
	"bug",
	"rock",
	"ghost",
	"dragon",
	"dark",
	"steel",
	"fairy",
];

function Pokedex() {
	const { t } = useTranslation();
	const { data: pokemonList, isLoading, error } = usePokemonList(151, 0);
	const favorites = useSettingsStore((state) => state.favorites);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedType, setSelectedType] = useState<string>("all");
	const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
	const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);

	// Auto-disable favorites filter when no favorites exist
	useEffect(() => {
		if (showFavoritesOnly && favorites.length === 0) {
			setShowFavoritesOnly(false);
		}
	}, [favorites.length, showFavoritesOnly]);

	// Keyboard navigation for Pokemon detail modal
	useEffect(() => {
		if (!selectedPokemonId) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				const prevId = selectedPokemonId > 1 ? selectedPokemonId - 1 : 151;
				setSelectedPokemonId(prevId);
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				const nextId = selectedPokemonId < 151 ? selectedPokemonId + 1 : 1;
				setSelectedPokemonId(nextId);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedPokemonId]);

	// Fuzzy search with Fuse.js
	const fuse = useMemo(() => {
		if (!pokemonList) return null;

		return new Fuse(pokemonList.results, {
			keys: ["name"],
			threshold: 0.3, // Stricter matching
			location: 0, // Start searching from the beginning
			distance: 30, // Penalize matches far from the start
			ignoreLocation: false, // Penalize for location
			minMatchCharLength: 1, // No restriction on match length
			includeScore: true,
		});
	}, [pokemonList]);

	// Get search results
	const searchResults = useMemo(() => {
		if (!searchQuery || !fuse) return null;

		return new Set(fuse.search(searchQuery).map((result) => result.item.name));
	}, [searchQuery, fuse]);

	// Calculate visible count based on filters
	const visibleCount = useMemo(() => {
		if (!pokemonList) return 0;

		return pokemonList.results.filter((pokemon) => {
			const id = getPokemonIdFromUrl(pokemon.url);

			// Check search filter
			const matchesSearch = searchResults === null || searchResults.has(pokemon.name);
			if (!matchesSearch) return false;

			// Check favorites filter
			const matchesFavorites = !showFavoritesOnly || favorites.includes(id);
			if (!matchesFavorites) return false;

			// Type filter - we can't check this here without fetching pokemon data
			// So we'll skip this check and show the no results state even if type filter might exclude results
			return true;
		}).length;
	}, [pokemonList, searchResults, showFavoritesOnly, favorites]);

	if (isLoading) {
		return (
			<div className="h-full bg-gradient-to-b from-blue-50 to-red-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
				<div className="text-center">
					<div className="text-4xl mb-4">⚡</div>
					<p className="text-xl font-semibold dark:text-white">{t("pokedex.loading")}</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-full bg-gradient-to-b from-blue-50 to-red-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
				<div className="text-center">
					<div className="text-4xl mb-4">❌</div>
					<p className="text-xl font-semibold text-red-600">{t("pokedex.error")}</p>
					<p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{error.message}</p>
				</div>
			</div>
		);
	}

	const hasFilters = searchQuery || selectedType !== "all" || showFavoritesOnly;

	return (
		<div className="h-full bg-gradient-to-b from-blue-50 to-red-50 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
						{t("pokedex.title")}
					</h1>
					<p className="text-slate-600 dark:text-slate-300">
						{t("pokedex.found", { count: pokemonList?.results.length })}
					</p>
				</div>

				{/* Search and Filter */}
				<div className="max-w-6xl mx-auto mb-8">
					<div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
						{/* Search Bar */}
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
							<Input
								type="text"
								placeholder={t("pokedex.search")}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 pr-10 w-full"
							/>
							{searchQuery && (
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setSearchQuery("")}
									className="absolute right-1 top-1/2 -translate-y-1/2"
								>
									<X size={16} />
								</Button>
							)}
						</div>

						<div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
							{/* Type Filter */}
							<Select value={selectedType} onValueChange={setSelectedType}>
								<SelectTrigger className="w-[140px] md:w-[160px] shrink-0">
									<SelectValue placeholder={t("pokedex.filterByType")} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">{t("pokedex.allTypes")}</SelectItem>
									{POKEMON_TYPES.map((type) => (
										<SelectItem key={type} value={type}>
											{t(`types.${type}`)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							{/* Favorites Toggle */}
							<Button
								variant={showFavoritesOnly ? "default" : "outline"}
								size="sm"
								disabled={favorites.length === 0}
								onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
								className="gap-2 shrink-0"
							>
								<Heart size={16} className={showFavoritesOnly ? "fill-current" : ""} />
								<span className="hidden sm:inline">{t("pokedex.favorites")}</span>
								<span className="sm:hidden">Favs</span>
								<span>({favorites.length})</span>
							</Button>

							{/* Clear Filters */}
							<Button
								variant="outline"
								size="sm"
								disabled={!hasFilters}
								onClick={() => {
									setSearchQuery("");
									setSelectedType("all");
									setShowFavoritesOnly(false);
								}}
								className="gap-2 shrink-0"
							>
								<X size={16} />
								<span className="hidden sm:inline">{t("pokedex.clearFilters")}</span>
							</Button>
						</div>
					</div>
				</div>

				{/* Responsive Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 pb-safe">
					{pokemonList?.results.map((pokemon, index) => {
						const id = getPokemonIdFromUrl(pokemon.url);
						return (
							<PokemonCardWithFilters
								key={pokemon.name}
								id={id}
								name={pokemon.name}
								index={index + 1}
								selectedType={selectedType}
								searchResults={searchResults}
								showFavoritesOnly={showFavoritesOnly}
								favorites={favorites}
								onCardClick={() => setSelectedPokemonId(id)}
							/>
						);
					})}
				</div>

				{/* No Results State */}
				{hasFilters && visibleCount === 0 && (
					<NoResults
						searchQuery={searchQuery}
						selectedType={selectedType}
						showFavoritesOnly={showFavoritesOnly}
						onClearFilters={() => {
							setSearchQuery("");
							setSelectedType("all");
							setShowFavoritesOnly(false);
						}}
					/>
				)}
			</div>

			{/* Detail Modal */}
			{selectedPokemonId && (
				<PokemonDetail
					id={selectedPokemonId}
					open={!!selectedPokemonId}
					onOpenChange={(open) => !open && setSelectedPokemonId(null)}
					onNext={() => {
						const nextId = selectedPokemonId < 151 ? selectedPokemonId + 1 : 1;
						setSelectedPokemonId(nextId);
					}}
					onPrev={() => {
						const prevId = selectedPokemonId > 1 ? selectedPokemonId - 1 : 151;
						setSelectedPokemonId(prevId);
					}}
					onSelectPokemon={setSelectedPokemonId}
					maxPokemonId={151}
				/>
			)}
		</div>
	);
}

// Wrapper component that hides cards that don't match filters
// Always renders all Pokemon to keep hooks stable, uses CSS to hide filtered items
function PokemonCardWithFilters({
	id,
	name,
	index,
	selectedType,
	searchResults,
	showFavoritesOnly,
	favorites,
	onCardClick,
}: {
	id: number;
	name: string;
	index: number;
	selectedType: string;
	searchResults: Set<string> | null;
	showFavoritesOnly: boolean;
	favorites: number[];
	onCardClick: () => void;
}) {
	const { data: pokemon } = usePokemon(id);

	// Check if pokemon matches fuzzy search
	// If searchResults is null (no search query), show all
	// If searchResults exists, only show if name is in the set
	const matchesSearch = searchResults === null || searchResults.has(name);

	// Check if pokemon matches type filter
	const matchesType = selectedType === "all" || (pokemon?.types.some((t) => t.type.name === selectedType) ?? true);

	// Check if pokemon matches favorites filter
	const matchesFavorites = !showFavoritesOnly || favorites.includes(id);

	// Show card only if it matches all filters
	const isVisible = matchesSearch && matchesType && matchesFavorites;

	// Hide card with CSS instead of conditional render to keep hooks stable
	return (
		<div style={{ display: isVisible ? "block" : "none" }}>
			<PokemonCard id={id} name={name} index={index} onClick={onCardClick} />
		</div>
	);
}
