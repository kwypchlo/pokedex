import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { usePokemon } from "@/lib/api/pokemon";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { TypeBadge } from "./TypeBadge";

interface PokemonCardProps {
	id: number;
	name: string;
	index: number;
	onClick?: () => void;
}

export function PokemonCard({ id, name, index, onClick }: PokemonCardProps) {
	const isFavorite = useSettingsStore((state) => state.isFavorite);
	const toggleFavorite = useSettingsStore((state) => state.toggleFavorite);
	const { t } = useTranslation();
	const { data: pokemon, isLoading } = usePokemon(id);

	if (isLoading) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: index * 0.02 }}
			>
				<Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-pulse">
					<CardContent className="p-4">
						<div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg mb-3" />
						<div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
						<div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
					</CardContent>
				</Card>
			</motion.div>
		);
	}

	if (!pokemon) return null;

	const favorite = isFavorite(id);

	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		toggleFavorite(id);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.4,
				delay: index * 0.02,
				type: "spring",
				stiffness: 100,
			}}
			whileHover={{
				scale: 1.05,
				transition: { type: "spring", stiffness: 300, damping: 20 },
			}}
			whileTap={{ scale: 0.95 }}
			onClick={onClick}
		>
			<Card className="overflow-hidden shadow-md cursor-pointer bg-white dark:bg-slate-800 border-2 h-full">
				<CardContent className="p-3">
					{/* Header: Pokédex Number and Favorite Button */}
					<div className="flex items-center justify-between mb-2">
						<div className="text-xs font-mono text-slate-400 dark:text-slate-500">
							#{index.toString().padStart(3, "0")}
						</div>
						<motion.button
							onClick={handleFavoriteClick}
							className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<motion.div animate={favorite ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
								<Heart
									size={18}
									className={favorite ? "fill-red-500 text-red-500" : "text-slate-400 dark:text-slate-500"}
								/>
							</motion.div>
						</motion.button>
					</div>

					{/* Pokémon Image */}
					<div className="relative aspect-square mb-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-center justify-center">
						<img
							src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
							alt={name}
							className="w-full h-full object-contain p-2 drop-shadow-lg"
							loading="lazy"
						/>
					</div>

					{/* Pokémon Name */}
					<h3 className="text-lg font-bold capitalize text-center mb-2 text-slate-800 dark:text-white">{name}</h3>

					{/* Type Badges */}
					<div className="flex gap-2 justify-center flex-wrap">
						{pokemon.types.map((type) => (
							<TypeBadge key={type.type.name} type={type.type.name} variant="small" />
						))}
					</div>

					{/* Stats Preview */}
					<div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-3 gap-2 text-xs text-center">
						<div>
							<div className="text-slate-500 dark:text-slate-400">{t("pokedex.hp")}</div>
							<div className="font-bold text-slate-800 dark:text-white">{pokemon.stats[0].base_stat}</div>
						</div>
						<div>
							<div className="text-slate-500 dark:text-slate-400">{t("pokedex.attack")}</div>
							<div className="font-bold text-slate-800 dark:text-white">{pokemon.stats[1].base_stat}</div>
						</div>
						<div>
							<div className="text-slate-500 dark:text-slate-400">{t("pokedex.defense")}</div>
							<div className="font-bold text-slate-800 dark:text-white">{pokemon.stats[2].base_stat}</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
