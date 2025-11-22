import { type DragHandlers, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useMaxStats } from "@/hooks/useMaxStats";
import {
	useEvolutionChain,
	usePokemon,
	usePokemonSpecies,
} from "@/lib/api/pokemon";
import { StatBar } from "./StatBar";
import { TypeBadge } from "./TypeBadge";

interface EvolutionSpecies {
	name: string;
	url: string;
}

interface ChainLink {
	species: EvolutionSpecies;
	evolves_to: ChainLink[];
}

interface EvolutionChain {
	chain: ChainLink;
}

interface PokemonDetailProps {
	id: number;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onNext?: () => void;
	onPrev?: () => void;
	onSelectPokemon?: (id: number) => void;
	maxPokemonId?: number;
}

export function PokemonDetail({
	id,
	open,
	onOpenChange,
	onNext,
	onPrev,
	onSelectPokemon,
	maxPokemonId = 151,
}: PokemonDetailProps) {
	const { t, i18n } = useTranslation();
	const { data: pokemon } = usePokemon(id);
	const { data: species } = usePokemonSpecies(id);
	const { data: evolutionChain } = useEvolutionChain(
		species?.evolution_chain.url,
	);
	const { data: maxStats } = useMaxStats(maxPokemonId);

	const handleDragEnd: DragHandlers["onDragEnd"] = (_, info) => {
		// Swipe right -> previous
		if (info.offset.x > 100 && onPrev) {
			onPrev();
		}
		// Swipe left -> next
		else if (info.offset.x < -100 && onNext) {
			onNext();
		}
	};

	if (!open || !pokemon) return null;

	// Get Pokédex entry in current language
	// PokeAPI uses 'pl' for Polish, but also check 'en' as fallback
	const currentLang = i18n.language === "pl" ? "pl" : "en";

	const flavorText =
		species?.flavor_text_entries.find(
			(entry) => entry.language.name === currentLang,
		)?.flavor_text ||
		species?.flavor_text_entries.find((entry) => entry.language.name === "en")
			?.flavor_text ||
		"";

	// Get genus (e.g., "Seed Pokémon")
	// Note: PokeAPI doesn't provide Polish translations for genus
	// TODO: Add manual Polish translations in M12
	const genus =
		species?.genera.find((g) => g.language.name === "en")?.genus || "";

	// Get stat names and descriptions
	const statNames = [
		t("pokedex.hp"),
		t("pokedex.attack"),
		t("pokedex.defense"),
		t("pokedex.spAttack"),
		t("pokedex.spDefense"),
		t("pokedex.speed"),
	];

	const statDescriptions = [
		t("detail.hpDesc"),
		t("detail.attackDesc"),
		t("detail.defenseDesc"),
		t("detail.spAttackDesc"),
		t("detail.spDefenseDesc"),
		t("detail.speedDesc"),
	];

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-3">
						<span className="text-2xl font-black capitalize">
							{pokemon.name}
						</span>
						<span className="text-lg text-slate-500">
							#{id.toString().padStart(3, "0")}
						</span>
					</DialogTitle>
				</DialogHeader>

				<motion.div
					key={id}
					className="space-y-6"
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={0.2}
					onDragEnd={handleDragEnd}
					initial={{ opacity: 0, x: 10 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -10 }}
					transition={{ duration: 0.15, ease: "easeOut" }}
				>
					{/* Image and Basic Info */}
					<div className="flex flex-col md:flex-row gap-4 md:gap-6">
						{/* Image + Evolution thumbnails */}
						<div className="flex-shrink-0 w-full md:w-64 space-y-3">
							<motion.div
								className="w-full aspect-square bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg flex items-center justify-center"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<img
									src={
										pokemon.sprites.other["official-artwork"].front_default ||
										pokemon.sprites.front_default
									}
									alt={pokemon.name}
									className="w-full h-full object-contain p-2 md:p-4"
									loading="lazy"
								/>
							</motion.div>

							{/* Evolution Chain Thumbnails */}
							{evolutionChain && onSelectPokemon && (
								<EvolutionThumbnails
									chain={evolutionChain}
									currentId={id}
									onSelectPokemon={onSelectPokemon}
								/>
							)}
						</div>

						{/* Basic Info */}
						<div className="flex-1 space-y-3 md:space-y-4">
							{/* Genus */}
							{genus && (
								<div>
									<h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
										{t("detail.genus")}
									</h3>
									<p className="text-lg text-slate-800 dark:text-white">
										{genus}
									</p>
								</div>
							)}

							{/* Types */}
							<div>
								<h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
									{t("detail.type")}
								</h3>
								<div className="flex gap-2">
									{pokemon.types.map((type) => (
										<TypeBadge key={type.type.name} type={type.type.name} />
									))}
								</div>
							</div>

							{/* Height & Weight */}
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
										{t("detail.height")}
									</h3>
									<p className="text-lg font-bold text-slate-800 dark:text-white">
										{(pokemon.height / 10).toFixed(1)} m
									</p>
								</div>
								<div>
									<h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
										{t("detail.weight")}
									</h3>
									<p className="text-lg font-bold text-slate-800 dark:text-white">
										{(pokemon.weight / 10).toFixed(1)} kg
									</p>
								</div>
							</div>

							{/* Abilities */}
							<div>
								<h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
									{t("detail.abilities")}
								</h3>
								<div className="flex flex-wrap gap-2">
									{pokemon.abilities.map((ability) => (
										<Badge
											key={ability.ability.name}
											variant="secondary"
											className="capitalize px-3 py-1"
										>
											{ability.ability.name.replace("-", " ")}
										</Badge>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Pokédex Entry */}
					{flavorText && (
						<div>
							<h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
								{t("detail.about")}
							</h3>
							<p className="text-slate-700 dark:text-slate-300 leading-relaxed">
								{flavorText.replace(/\f/g, " ")}
							</p>
						</div>
					)}

					{/* Base Stats */}
					<div>
						<h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 md:mb-4">
							{t("detail.baseStats")}
						</h3>
						<div className="space-y-2 md:space-y-3">
							{pokemon.stats.map((stat, index) => {
								const statName = stat.stat.name as keyof typeof maxStats;
								const maxValue = maxStats?.[statName] || 255;
								return (
									<StatBar
										key={stat.stat.name}
										label={statNames[index]}
										value={stat.base_stat}
										maxValue={maxValue}
										index={index}
										description={statDescriptions[index]}
									/>
								);
							})}
						</div>
					</div>
				</motion.div>
			</DialogContent>
		</Dialog>
	);
}

// Helper component to display evolution thumbnails with hover cards
function EvolutionThumbnails({
	chain,
	currentId,
	onSelectPokemon,
}: {
	chain: EvolutionChain;
	currentId: number;
	onSelectPokemon: (id: number) => void;
}) {
	// Flatten the evolution chain into a simple array
	const getAllEvolutions = (evo: ChainLink): number[] => {
		const pokemonId = Number.parseInt(
			evo.species.url.split("/").slice(-2, -1)[0],
			10,
		);
		const ids = [pokemonId];

		for (const nextEvo of evo.evolves_to) {
			ids.push(...getAllEvolutions(nextEvo));
		}

		return ids;
	};

	const evolutionIds = getAllEvolutions(chain.chain);

	return (
		<div className="flex justify-center gap-2 flex-wrap">
			{evolutionIds.map((evoId) => (
				<EvolutionThumbnail
					key={evoId}
					pokemonId={evoId}
					isCurrent={evoId === currentId}
					onSelect={() => onSelectPokemon(evoId)}
				/>
			))}
		</div>
	);
}

// Individual evolution thumbnail
function EvolutionThumbnail({
	pokemonId,
	isCurrent,
	onSelect,
}: { pokemonId: number; isCurrent: boolean; onSelect: () => void }) {
	const { data: pokemon } = usePokemon(pokemonId);

	if (!pokemon) return null;

	return (
		<button
			type="button"
			onClick={onSelect}
			className={`w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer ${
				isCurrent
					? "ring-2 ring-yellow-500 dark:ring-yellow-400 shadow-lg"
					: "hover:ring-2 hover:ring-slate-300 dark:hover:ring-slate-600"
			}`}
			title={pokemon.name}
		>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
				alt={pokemon.name}
				className="w-full h-full object-contain p-1"
				loading="lazy"
			/>
		</button>
	);
}
