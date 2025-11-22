import { useId } from "react";

type PokeballStyle = "flat" | "3d" | "anime" | "minimal" | "pixel";

export function PokedexLogo({ className = "", style = "flat" }: { className?: string; style?: PokeballStyle }) {
	const redGradientId = useId();
	const whiteGradientId = useId();

	return (
		<svg
			viewBox="0 0 210 50"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Pokédex logo"
		>
			<title>Pokédex logo</title>
			{style === "flat" && <FlatPokeball />}
			{style === "3d" && <ThreeDPokeball redGradientId={redGradientId} whiteGradientId={whiteGradientId} />}
			{style === "anime" && <AnimePokeball />}
			{style === "minimal" && <MinimalPokeball />}
			{style === "pixel" && <PixelPokeball />}

			{/* Text */}
			<text
				x="55"
				y="35"
				fontFamily="Inter, sans-serif"
				fontSize="28"
				fontWeight="700"
				fill="currentColor"
				letterSpacing="-0.02em"
			>
				Pokédex
			</text>
		</svg>
	);
}

// Original flat design
function FlatPokeball() {
	return (
		<g>
			<circle cx="20" cy="25" r="18" fill="#EF4444" />
			<circle cx="20" cy="25" r="18" stroke="#1F2937" strokeWidth="2" />
			<path d="M 2 25 L 38 25" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
			<circle cx="20" cy="25" r="6" fill="white" stroke="#1F2937" strokeWidth="2" />
			<circle cx="20" cy="25" r="3" fill="white" stroke="#1F2937" strokeWidth="1.5" />
		</g>
	);
}

// 3D effect with gradients and highlights
function ThreeDPokeball({ redGradientId, whiteGradientId }: { redGradientId: string; whiteGradientId: string }) {
	return (
		<g>
			<defs>
				<radialGradient id={redGradientId} cx="35%" cy="35%">
					<stop offset="0%" stopColor="#FCA5A5" />
					<stop offset="50%" stopColor="#EF4444" />
					<stop offset="100%" stopColor="#B91C1C" />
				</radialGradient>
				<radialGradient id={whiteGradientId} cx="35%" cy="35%">
					<stop offset="0%" stopColor="#FFFFFF" />
					<stop offset="70%" stopColor="#F3F4F6" />
					<stop offset="100%" stopColor="#D1D5DB" />
				</radialGradient>
			</defs>
			{/* Shadow */}
			<ellipse cx="20" cy="41" rx="16" ry="3" fill="#000000" opacity="0.2" />
			{/* Top red half */}
			<path d="M 20 7 A 18 18 0 0 1 38 25 L 2 25 A 18 18 0 0 1 20 7 Z" fill={`url(#${redGradientId})`} />
			{/* Bottom white half */}
			<path d="M 20 43 A 18 18 0 0 1 2 25 L 38 25 A 18 18 0 0 1 20 43 Z" fill={`url(#${whiteGradientId})`} />
			{/* Outline */}
			<circle cx="20" cy="25" r="18" stroke="#1F2937" strokeWidth="2" fill="none" />
			{/* Center black band */}
			<rect x="2" y="22" width="36" height="6" fill="#1F2937" />
			{/* Button */}
			<circle cx="20" cy="25" r="7" fill={`url(#${whiteGradientId})`} stroke="#1F2937" strokeWidth="2" />
			<circle cx="20" cy="25" r="4" fill="white" stroke="#6B7280" strokeWidth="1" />
			{/* Highlight */}
			<circle cx="15" cy="15" r="5" fill="white" opacity="0.4" />
		</g>
	);
}

// Anime style with sharp highlights
function AnimePokeball() {
	return (
		<g>
			{/* Red top */}
			<path d="M 20 7 A 18 18 0 0 1 38 25 L 2 25 A 18 18 0 0 1 20 7 Z" fill="#DC2626" />
			{/* White bottom */}
			<path d="M 20 43 A 18 18 0 0 1 2 25 L 38 25 A 18 18 0 0 1 20 43 Z" fill="#FFFFFF" />
			{/* Outline */}
			<circle cx="20" cy="25" r="18" stroke="#000000" strokeWidth="2.5" fill="none" />
			{/* Center black band */}
			<rect x="2" y="23" width="36" height="4" fill="#000000" />
			{/* Button outer ring */}
			<circle cx="20" cy="25" r="6" fill="#000000" />
			<circle cx="20" cy="25" r="5" fill="#FFFFFF" />
			{/* Button center */}
			<circle cx="20" cy="25" r="3" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
			{/* Anime shine */}
			<path d="M 12 12 L 15 10 L 13 13 Z" fill="white" opacity="0.9" />
			<ellipse cx="16" cy="14" rx="3" ry="5" fill="white" opacity="0.6" transform="rotate(-30 16 14)" />
		</g>
	);
}

// Minimal line art style
function MinimalPokeball() {
	return (
		<g>
			{/* Minimal outlines */}
			<circle cx="20" cy="25" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
			<path d="M 2 25 L 38 25" stroke="currentColor" strokeWidth="2" />
			<circle cx="20" cy="25" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
			<circle cx="20" cy="25" r="2.5" fill="currentColor" />
		</g>
	);
}

// Pixel art style
function PixelPokeball() {
	return (
		<g>
			{/* Pixelated red top */}
			<rect x="11" y="7" width="18" height="3" fill="#DC2626" />
			<rect x="8" y="10" width="24" height="3" fill="#DC2626" />
			<rect x="5" y="13" width="30" height="3" fill="#DC2626" />
			<rect x="3" y="16" width="34" height="3" fill="#DC2626" />
			<rect x="2" y="19" width="36" height="3" fill="#DC2626" />

			{/* Black band */}
			<rect x="2" y="22" width="36" height="6" fill="#1F2937" />

			{/* Pixelated white bottom */}
			<rect x="2" y="28" width="36" height="3" fill="#FFFFFF" />
			<rect x="3" y="31" width="34" height="3" fill="#FFFFFF" />
			<rect x="5" y="34" width="30" height="3" fill="#FFFFFF" />
			<rect x="8" y="37" width="24" height="3" fill="#FFFFFF" />
			<rect x="11" y="40" width="18" height="3" fill="#FFFFFF" />

			{/* Center button */}
			<rect x="15" y="20" width="10" height="10" fill="#FFFFFF" stroke="#1F2937" strokeWidth="1" />
			<rect x="18" y="23" width="4" height="4" fill="#1F2937" />

			{/* Outline */}
			<circle cx="20" cy="25" r="18" stroke="#1F2937" strokeWidth="1.5" fill="none" />
		</g>
	);
}
