import { useId } from "react";

interface IconProps {
	className?: string;
}

// Pokédex icon - based on the original red Game Boy-like device
export function PokedexIcon({ className = "" }: IconProps) {
	const screenGradientId = useId();
	const bodyGradientId = useId();

	return (
		<svg
			viewBox="0 0 100 100"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Pokédex device icon"
		>
			<title>Pokédex</title>
			<defs>
				<radialGradient id={bodyGradientId} cx="35%" cy="35%">
					<stop offset="0%" stopColor="#FCA5A5" />
					<stop offset="50%" stopColor="#EF4444" />
					<stop offset="100%" stopColor="#B91C1C" />
				</radialGradient>
				<linearGradient id={screenGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="#60A5FA" />
					<stop offset="100%" stopColor="#1E40AF" />
				</linearGradient>
			</defs>

			{/* Main body */}
			<rect
				x="15"
				y="10"
				width="70"
				height="80"
				rx="6"
				fill={`url(#${bodyGradientId})`}
				stroke="#1F2937"
				strokeWidth="2"
			/>

			{/* Top black bar */}
			<rect x="15" y="10" width="70" height="8" rx="6" fill="#1F2937" />

			{/* Camera lens - top left */}
			<circle cx="25" cy="14" r="3" fill="#3B82F6" stroke="#1F2937" strokeWidth="1" />

			{/* Indicator lights */}
			<circle cx="35" cy="14" r="1.5" fill="#EF4444" />
			<circle cx="40" cy="14" r="1.5" fill="#FBBF24" />
			<circle cx="45" cy="14" r="1.5" fill="#10B981" />

			{/* Screen */}
			<rect
				x="20"
				y="22"
				width="60"
				height="35"
				rx="3"
				fill={`url(#${screenGradientId})`}
				stroke="#1F2937"
				strokeWidth="2"
			/>

			{/* Screen highlight */}
			<rect x="23" y="25" width="20" height="8" rx="2" fill="white" opacity="0.3" />

			{/* D-pad */}
			<g transform="translate(28, 65)">
				{/* Horizontal bar */}
				<rect x="3" y="6" width="14" height="5" rx="1" fill="#374151" />
				{/* Vertical bar */}
				<rect x="7.5" y="1.5" width="5" height="14" rx="1" fill="#374151" />
				{/* Center circle */}
				<circle cx="10" cy="8.5" r="2.5" fill="#1F2937" />
			</g>

			{/* Action buttons */}
			<circle cx="60" cy="67" r="4" fill="#3B82F6" stroke="#1F2937" strokeWidth="1" />
			<circle cx="70" cy="67" r="4" fill="#3B82F6" stroke="#1F2937" strokeWidth="1" />

			{/* Speaker grills */}
			<line x1="50" y1="75" x2="74" y2="75" stroke="#1F2937" strokeWidth="1.5" opacity="0.3" />
			<line x1="50" y1="78" x2="74" y2="78" stroke="#1F2937" strokeWidth="1.5" opacity="0.3" />
			<line x1="50" y1="81" x2="74" y2="81" stroke="#1F2937" strokeWidth="1.5" opacity="0.3" />

			{/* Green indicator button */}
			<rect x="22" y="75" width="20" height="8" rx="2" fill="#10B981" stroke="#1F2937" strokeWidth="1" />
		</svg>
	);
}

// Quiz Icon: Pikachu Silhouette (hand-crafted based on official artwork)
export function QuizIcon({ className = "" }: IconProps) {
	return (
		<svg
			viewBox="0 0 100 100"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Quiz - Who's that Pokémon?"
		>
			<title>Who's that Pokémon?</title>

			{/* Pikachu silhouette - carefully crafted */}
			<g fill="#1F2937">
				{/* Left ear */}
				<path d="M 28 35 Q 22 30 18 20 Q 16 12 20 8 Q 23 6 26 10 Q 30 16 32 25 Q 33 30 30 33 Z" />

				{/* Right ear */}
				<path d="M 72 35 Q 78 30 82 20 Q 84 12 80 8 Q 77 6 74 10 Q 70 16 68 25 Q 67 30 70 33 Z" />

				{/* Head */}
				<ellipse cx="50" cy="50" rx="24" ry="22" />

				{/* Left cheek */}
				<circle cx="32" cy="52" r="8" />

				{/* Right cheek */}
				<circle cx="68" cy="52" r="8" />

				{/* Body (lower part) */}
				<ellipse cx="50" cy="72" rx="18" ry="14" />

				{/* Left arm */}
				<ellipse cx="36" cy="68" rx="6" ry="10" transform="rotate(-20 36 68)" />

				{/* Right arm */}
				<ellipse cx="64" cy="68" rx="6" ry="10" transform="rotate(20 64 68)" />

				{/* Tail (lightning bolt shape) */}
				<path d="M 75 65 L 82 58 L 78 58 L 85 48 L 88 42 L 82 48 L 85 48 L 78 58 L 80 58 L 73 68 Z" />
			</g>
		</svg>
	);
}

// Quiz Option 1: Question Mark in Pokéball
export function QuizIconOption1({ className = "" }: IconProps) {
	const redGradientId = useId();
	const whiteGradientId = useId();

	return (
		<svg
			viewBox="0 0 100 100"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Quiz icon"
		>
			<title>Quiz</title>
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

			{/* Pokéball */}
			<circle cx="50" cy="50" r="40" fill={`url(#${redGradientId})`} />
			<path d="M 10 50 L 90 50" stroke="#1F2937" strokeWidth="6" />
			<circle cx="50" cy="50" r="40" stroke="#1F2937" strokeWidth="3" fill="none" />

			{/* Bottom half white */}
			<path d="M 50 90 A 40 40 0 0 1 10 50 L 90 50 A 40 40 0 0 1 50 90 Z" fill={`url(#${whiteGradientId})`} />

			{/* Center button */}
			<circle cx="50" cy="50" r="12" fill={`url(#${whiteGradientId})`} stroke="#1F2937" strokeWidth="3" />

			{/* Question mark */}
			<text
				x="50"
				y="62"
				fontFamily="Inter, sans-serif"
				fontSize="40"
				fontWeight="900"
				fill="#1F2937"
				textAnchor="middle"
			>
				?
			</text>
		</svg>
	);
}

// Quiz Option 2: Silhouette with Question
export function QuizIconOption2({ className = "" }: IconProps) {
	return (
		<svg
			viewBox="0 0 100 100"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Quiz icon"
		>
			<title>Quiz - Mystery Pokémon</title>

			{/* Background circle */}
			<circle cx="50" cy="50" r="40" fill="#FBBF24" opacity="0.3" />

			{/* Pikachu silhouette (simplified) */}
			<g fill="#1F2937">
				{/* Ear left */}
				<path d="M 30 35 L 25 15 L 35 30 Z" />
				{/* Ear right */}
				<path d="M 70 35 L 75 15 L 65 30 Z" />
				{/* Head */}
				<circle cx="50" cy="50" r="20" />
				{/* Cheek bumps */}
				<circle cx="35" cy="52" r="6" />
				<circle cx="65" cy="52" r="6" />
			</g>

			{/* Question marks floating around */}
			<text x="20" y="35" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#EF4444">
				?
			</text>
			<text x="75" y="40" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#EF4444">
				?
			</text>
			<text x="70" y="75" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill="#EF4444">
				?
			</text>
		</svg>
	);
}

// Quiz Option 3: Trophy with Pokéball
export function QuizIconOption3({ className = "" }: IconProps) {
	const goldGradientId = useId();

	return (
		<svg
			viewBox="0 0 100 100"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Quiz icon"
		>
			<title>Quiz Trophy</title>
			<defs>
				<linearGradient id={goldGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="#FCD34D" />
					<stop offset="50%" stopColor="#FBBF24" />
					<stop offset="100%" stopColor="#D97706" />
				</linearGradient>
			</defs>

			{/* Trophy base */}
			<rect
				x="35"
				y="75"
				width="30"
				height="8"
				rx="2"
				fill={`url(#${goldGradientId})`}
				stroke="#92400E"
				strokeWidth="2"
			/>

			{/* Trophy stem */}
			<rect x="45" y="60" width="10" height="15" fill={`url(#${goldGradientId})`} stroke="#92400E" strokeWidth="2" />

			{/* Trophy cup */}
			<path
				d="M 30 30 L 30 45 Q 30 55 50 60 Q 70 55 70 45 L 70 30 Z"
				fill={`url(#${goldGradientId})`}
				stroke="#92400E"
				strokeWidth="2"
			/>

			{/* Trophy handles */}
			<path d="M 30 32 Q 20 32 20 40 Q 20 45 25 45 L 30 45" fill="none" stroke="#92400E" strokeWidth="2" />
			<path d="M 70 32 Q 80 32 80 40 Q 80 45 75 45 L 70 45" fill="none" stroke="#92400E" strokeWidth="2" />

			{/* Small Pokéball on trophy */}
			<circle cx="50" cy="40" r="10" fill="#EF4444" />
			<path d="M 40 40 L 60 40" stroke="#1F2937" strokeWidth="2.5" />
			<circle cx="50" cy="40" r="10" stroke="#1F2937" strokeWidth="2" fill="none" />
			<path d="M 50 50 A 10 10 0 0 1 40 40 L 60 40 A 10 10 0 0 1 50 50 Z" fill="white" />
			<circle cx="50" cy="40" r="3.5" fill="white" stroke="#1F2937" strokeWidth="1.5" />

			{/* Sparkles */}
			<text x="15" y="25" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#FBBF24">
				★
			</text>
			<text x="78" y="25" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#FBBF24">
				★
			</text>
		</svg>
	);
}

// Quiz Option 4: Brain with Electric Bolts
export function QuizIconOption4({ className = "" }: IconProps) {
	return (
		<svg
			viewBox="0 0 100 100"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Quiz icon"
		>
			<title>Quiz - Brain Power</title>

			{/* Brain outline */}
			<path
				d="M 35 25 Q 25 25 25 35 Q 25 40 30 42 Q 25 45 25 50 Q 25 60 30 65 Q 30 70 35 72 L 65 72 Q 70 70 70 65 Q 75 60 75 50 Q 75 45 70 42 Q 75 40 75 35 Q 75 25 65 25 Q 60 20 50 20 Q 40 20 35 25 Z"
				fill="#A78BFA"
				stroke="#5B21B6"
				strokeWidth="2"
			/>

			{/* Brain details (simplified folds) */}
			<path d="M 42 30 Q 45 35 42 40" stroke="#5B21B6" strokeWidth="2" fill="none" strokeLinecap="round" />
			<path d="M 58 30 Q 55 35 58 40" stroke="#5B21B6" strokeWidth="2" fill="none" strokeLinecap="round" />
			<path d="M 35 50 Q 40 52 35 56" stroke="#5B21B6" strokeWidth="2" fill="none" strokeLinecap="round" />
			<path d="M 65 50 Q 60 52 65 56" stroke="#5B21B6" strokeWidth="2" fill="none" strokeLinecap="round" />

			{/* Electric bolt 1 */}
			<path d="M 20 45 L 15 50 L 20 50 L 15 60 L 25 52 L 20 52 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />

			{/* Electric bolt 2 */}
			<path d="M 80 45 L 85 50 L 80 50 L 85 60 L 75 52 L 80 52 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
		</svg>
	);
}
