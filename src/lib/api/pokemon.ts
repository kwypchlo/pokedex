// PokeAPI Service Layer
import { useQuery } from "@tanstack/react-query";
import type { EvolutionChain, Pokemon, PokemonListResponse, PokemonSpecies, SimplifiedPokemon, Type } from "./types";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

// Fetch Pokemon list (Gen 1: 151 Pokemon)
export async function fetchPokemonList(limit = 151, offset = 0): Promise<PokemonListResponse> {
	const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
	if (!response.ok) {
		throw new Error("Failed to fetch Pokemon list");
	}
	return response.json();
}

// Fetch individual Pokemon details
export async function fetchPokemon(id: number | string): Promise<Pokemon> {
	const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch Pokemon: ${id}`);
	}
	return response.json();
}

// Fetch Pokemon species (for Pokedex entries)
export async function fetchPokemonSpecies(id: number | string): Promise<PokemonSpecies> {
	const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${id}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch Pokemon species: ${id}`);
	}
	return response.json();
}

// Fetch evolution chain
export async function fetchEvolutionChain(url: string): Promise<EvolutionChain> {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch evolution chain: ${url}`);
	}
	return response.json();
}

// Fetch type information (for translations)
export async function fetchType(name: string): Promise<Type> {
	const response = await fetch(`${POKEAPI_BASE_URL}/type/${name}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch type: ${name}`);
	}
	return response.json();
}

// Helper: Extract Pokemon ID from URL
export function getPokemonIdFromUrl(url: string): number {
	const matches = url.match(/\/pokemon\/(\d+)\//);
	return matches ? Number.parseInt(matches[1], 10) : 0;
}

// Helper: Convert Pokemon to simplified format
export function simplifyPokemon(pokemon: Pokemon): SimplifiedPokemon {
	return {
		id: pokemon.id,
		name: pokemon.name,
		sprite: pokemon.sprites.front_default,
		officialArtwork: pokemon.sprites.other["official-artwork"].front_default,
		types: pokemon.types.map((t) => t.type.name),
	};
}

// ===== TanStack Query Hooks =====

// Hook: Fetch Pokemon list
export function usePokemonList(limit = 151, offset = 0) {
	return useQuery({
		queryKey: ["pokemon-list", limit, offset],
		queryFn: () => fetchPokemonList(limit, offset),
		staleTime: Number.POSITIVE_INFINITY, // Pokemon list never changes
	});
}

// Hook: Fetch individual Pokemon
export function usePokemon(id: number | string) {
	return useQuery({
		queryKey: ["pokemon", id],
		queryFn: () => fetchPokemon(id),
		enabled: !!id,
		staleTime: Number.POSITIVE_INFINITY, // Pokemon data never changes
	});
}

// Hook: Fetch Pokemon species
export function usePokemonSpecies(id: number | string) {
	return useQuery({
		queryKey: ["pokemon-species", id],
		queryFn: () => fetchPokemonSpecies(id),
		enabled: !!id,
		staleTime: Number.POSITIVE_INFINITY,
	});
}

// Hook: Fetch evolution chain
export function useEvolutionChain(url: string | undefined) {
	return useQuery({
		queryKey: ["evolution-chain", url],
		queryFn: () => {
			if (!url) throw new Error("Evolution chain URL is required");
			return fetchEvolutionChain(url);
		},
		enabled: !!url,
		staleTime: Number.POSITIVE_INFINITY,
	});
}

// Hook: Fetch type information
export function useType(name: string) {
	return useQuery({
		queryKey: ["type", name],
		queryFn: () => fetchType(name),
		enabled: !!name,
		staleTime: Number.POSITIVE_INFINITY,
	});
}
