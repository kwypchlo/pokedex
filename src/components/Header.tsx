import { Link } from "@tanstack/react-router";
import { Home, Info, Menu, Search, Trophy, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PokedexLogo } from "./PokedexLogo";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<header
				className="sticky top-0 z-50 h-16 px-4 flex items-center justify-between text-white backdrop-blur-lg shadow-2xl drop-shadow-xl transition-all duration-300"
				style={{
					background: "linear-gradient(to right, rgb(37 99 235 / 0.75), rgb(220 38 38 / 0.75))",
				}}
			>
				<div className="flex items-center gap-4">
					<button
						type="button"
						onClick={() => setIsOpen(true)}
						className="p-2 hover:bg-white/20 rounded-lg transition-colors"
						aria-label="Open menu"
					>
						<Menu size={24} />
					</button>
					<Link to="/" className="hover:opacity-80 transition-opacity">
						<PokedexLogo className="h-8 w-auto" style="3d" />
					</Link>
				</div>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<LanguageSwitcher />
				</div>
			</header>

			<aside
				className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-900 to-red-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-white/20">
					<h2 className="text-xl font-bold">Navigation</h2>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="p-2 hover:bg-white/20 rounded-lg transition-colors"
						aria-label="Close menu"
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					<Link
						to="/"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors mb-2 text-blue-900 font-semibold",
						}}
					>
						<Home size={20} />
						<span className="font-medium">Home</span>
					</Link>

					<Link
						to="/pokedex"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors mb-2 text-blue-900 font-semibold",
						}}
					>
						<Search size={20} />
						<span className="font-medium">Pokédex</span>
					</Link>

					<Link
						to="/quiz"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors mb-2 text-blue-900 font-semibold",
						}}
					>
						<Trophy size={20} />
						<span className="font-medium">Quiz</span>
					</Link>

					<Link
						to="/about"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors mb-2 text-blue-900 font-semibold",
						}}
					>
						<Info size={20} />
						<span className="font-medium">About</span>
					</Link>
				</nav>
			</aside>
		</>
	);
}
