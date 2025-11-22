// Pokémon type color mapping
export const typeColors: Record<string, { bg: string; text: string; border: string }> = {
	normal: {
		bg: "bg-slate-400",
		text: "text-slate-900",
		border: "border-slate-500",
	},
	fire: {
		bg: "bg-orange-500",
		text: "text-white",
		border: "border-orange-600",
	},
	water: {
		bg: "bg-blue-500",
		text: "text-white",
		border: "border-blue-600",
	},
	grass: {
		bg: "bg-green-500",
		text: "text-white",
		border: "border-green-600",
	},
	electric: {
		bg: "bg-yellow-400",
		text: "text-yellow-900",
		border: "border-yellow-500",
	},
	ice: {
		bg: "bg-cyan-400",
		text: "text-cyan-900",
		border: "border-cyan-500",
	},
	fighting: {
		bg: "bg-red-600",
		text: "text-white",
		border: "border-red-700",
	},
	poison: {
		bg: "bg-purple-500",
		text: "text-white",
		border: "border-purple-600",
	},
	ground: {
		bg: "bg-amber-600",
		text: "text-white",
		border: "border-amber-700",
	},
	flying: {
		bg: "bg-indigo-400",
		text: "text-white",
		border: "border-indigo-500",
	},
	psychic: {
		bg: "bg-pink-500",
		text: "text-white",
		border: "border-pink-600",
	},
	bug: {
		bg: "bg-lime-500",
		text: "text-lime-900",
		border: "border-lime-600",
	},
	rock: {
		bg: "bg-stone-600",
		text: "text-white",
		border: "border-stone-700",
	},
	ghost: {
		bg: "bg-purple-700",
		text: "text-white",
		border: "border-purple-800",
	},
	dragon: {
		bg: "bg-violet-600",
		text: "text-white",
		border: "border-violet-700",
	},
	dark: {
		bg: "bg-gray-800",
		text: "text-white",
		border: "border-gray-900",
	},
	steel: {
		bg: "bg-slate-500",
		text: "text-white",
		border: "border-slate-600",
	},
	fairy: {
		bg: "bg-pink-400",
		text: "text-pink-900",
		border: "border-pink-500",
	},
};

export function getTypeColor(type: string) {
	return typeColors[type.toLowerCase()] || typeColors.normal;
}
