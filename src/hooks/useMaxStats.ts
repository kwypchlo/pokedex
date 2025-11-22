import { useQuery } from "@tanstack/react-query";

interface MaxStats {
	hp: number;
	attack: number;
	defense: number;
	"special-attack": number;
	"special-defense": number;
	speed: number;
}

interface PokemonStat {
	base_stat: number;
	stat: {
		name: string;
	};
}

async function calculateMaxStats(maxPokemonId: number): Promise<MaxStats> {
	const maxStats: MaxStats = {
		hp: 0,
		attack: 0,
		defense: 0,
		"special-attack": 0,
		"special-defense": 0,
		speed: 0,
	};

	// Fetch all Pokemon stats in parallel
	const promises = Array.from({ length: maxPokemonId }, (_, i) => {
		const id = i + 1;
		return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then((res) => res.json())
			.catch(() => null);
	});

	const allPokemon = await Promise.all(promises);

	// Find max for each stat
	allPokemon.forEach((pokemon) => {
		if (!pokemon) return;

		pokemon.stats.forEach((stat: PokemonStat) => {
			const statName = stat.stat.name as keyof MaxStats;
			if (statName in maxStats) {
				maxStats[statName] = Math.max(maxStats[statName], stat.base_stat);
			}
		});
	});

	return maxStats;
}

export function useMaxStats(maxPokemonId: number = 151) {
	return useQuery({
		queryKey: ["maxStats", maxPokemonId],
		queryFn: () => calculateMaxStats(maxPokemonId),
		staleTime: Infinity, // These values won't change
		gcTime: Infinity,
	});
}
