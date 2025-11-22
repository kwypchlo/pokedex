// PokeAPI Type Definitions

export interface PokemonListItem {
	name: string;
	url: string;
}

export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonListItem[];
}

export interface PokemonSprites {
	front_default: string;
	front_shiny: string;
	other: {
		"official-artwork": {
			front_default: string;
			front_shiny: string;
		};
		dream_world: {
			front_default: string;
		};
	};
}

export interface PokemonType {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

export interface PokemonStat {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
}

export interface PokemonAbility {
	is_hidden: boolean;
	slot: number;
	ability: {
		name: string;
		url: string;
	};
}

export interface Pokemon {
	id: number;
	name: string;
	height: number;
	weight: number;
	sprites: PokemonSprites;
	types: PokemonType[];
	stats: PokemonStat[];
	abilities: PokemonAbility[];
	species: {
		name: string;
		url: string;
	};
}

// Pokemon Species (for Pokédex entries and evolutions)
export interface FlavorTextEntry {
	flavor_text: string;
	language: {
		name: string;
		url: string;
	};
	version: {
		name: string;
		url: string;
	};
}

export interface PokemonSpeciesName {
	name: string;
	language: {
		name: string;
		url: string;
	};
}

export interface PokemonSpecies {
	id: number;
	name: string;
	order: number;
	gender_rate: number;
	capture_rate: number;
	base_happiness: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	evolution_chain: {
		url: string;
	};
	flavor_text_entries: FlavorTextEntry[];
	genera: Array<{
		genus: string;
		language: {
			name: string;
		};
	}>;
	names: PokemonSpeciesName[];
}

// Evolution Chain
export interface EvolutionDetail {
	min_level: number | null;
	trigger: {
		name: string;
		url: string;
	};
	item: {
		name: string;
		url: string;
	} | null;
}

export interface ChainLink {
	is_baby: boolean;
	species: {
		name: string;
		url: string;
	};
	evolution_details: EvolutionDetail[];
	evolves_to: ChainLink[];
}

export interface EvolutionChain {
	id: number;
	chain: ChainLink;
}

// Type information (for translations)
export interface TypeName {
	name: string;
	language: {
		name: string;
		url: string;
	};
}

export interface Type {
	id: number;
	name: string;
	names: TypeName[];
	damage_relations: {
		double_damage_from: Array<{ name: string; url: string }>;
		double_damage_to: Array<{ name: string; url: string }>;
		half_damage_from: Array<{ name: string; url: string }>;
		half_damage_to: Array<{ name: string; url: string }>;
		no_damage_from: Array<{ name: string; url: string }>;
		no_damage_to: Array<{ name: string; url: string }>;
	};
}

// Helper type for simplified Pokemon display
export interface SimplifiedPokemon {
	id: number;
	name: string;
	sprite: string;
	officialArtwork: string;
	types: string[];
}
