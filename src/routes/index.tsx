import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const { t } = useTranslation();

	return (
		<div className="min-h-[calc(100dvh-64px)] bg-gradient-to-b from-blue-50 to-red-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
			<div className="container mx-auto px-4">
				<div className="text-center mb-6 md:mb-12">
					<h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
						{t("home.title")}
					</h1>
					<p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-2">{t("home.subtitle")}</p>
					<Badge variant="secondary" className="text-base md:text-lg px-4 py-1">
						{t("home.generation")}
					</Badge>
				</div>

				<div className="max-w-4xl mx-auto grid gap-4 md:gap-6 md:grid-cols-2 mb-12">
					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="text-2xl">🔍 {t("home.exploreTitle")}</CardTitle>
							<CardDescription>{t("home.exploreDescription")}</CardDescription>
						</CardHeader>
						<CardContent>
							<Link to="/pokedex">
								<Button className="w-full" size="lg">
									{t("home.exploreButton")}
								</Button>
							</Link>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="text-2xl">🎯 {t("home.quizTitle")}</CardTitle>
							<CardDescription>{t("home.quizDescription")}</CardDescription>
						</CardHeader>
						<CardContent>
							<Link to="/quiz">
								<Button className="w-full" size="lg" variant="secondary">
									{t("home.quizButton")}
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>

				<div className="text-center">
					<p className="text-sm text-slate-500 dark:text-slate-400">
						{t("home.poweredBy")}{" "}
						<a
							href="https://pokeapi.co"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-blue-600"
						>
							PokéAPI
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
