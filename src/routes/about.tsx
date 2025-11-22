import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/about")({ component: About });

function About() {
	const { t } = useTranslation();

	return (
		<div className="h-full bg-gradient-to-b from-blue-50 to-red-50 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto px-4 py-8 md:py-16">
				<div className="max-w-3xl mx-auto space-y-6">
					<div className="text-center mb-6 md:mb-8">
						<h1 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent">
							{t("about.title")}
						</h1>
						<p className="text-lg md:text-xl text-slate-600 dark:text-slate-300">{t("about.subtitle")}</p>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>{t("about.features")}</CardTitle>
							<CardDescription>{t("about.featuresDescription")}</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-start gap-3">
								<Badge className="mt-1">🔍</Badge>
								<div>
									<h3 className="font-semibold text-slate-800 dark:text-white">{t("about.feature1Title")}</h3>
									<p className="text-sm text-slate-600 dark:text-slate-400">{t("about.feature1Desc")}</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Badge className="mt-1">🎯</Badge>
								<div>
									<h3 className="font-semibold text-slate-800 dark:text-white">{t("about.feature2Title")}</h3>
									<p className="text-sm text-slate-600 dark:text-slate-400">{t("about.feature2Desc")}</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Badge className="mt-1">❤️</Badge>
								<div>
									<h3 className="font-semibold text-slate-800 dark:text-white">{t("about.feature3Title")}</h3>
									<p className="text-sm text-slate-600 dark:text-slate-400">{t("about.feature3Desc")}</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Badge className="mt-1">🌙</Badge>
								<div>
									<h3 className="font-semibold text-slate-800 dark:text-white">{t("about.feature4Title")}</h3>
									<p className="text-sm text-slate-600 dark:text-slate-400">{t("about.feature4Desc")}</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Badge className="mt-1">🌍</Badge>
								<div>
									<h3 className="font-semibold text-slate-800 dark:text-white">{t("about.feature5Title")}</h3>
									<p className="text-sm text-slate-600 dark:text-slate-400">{t("about.feature5Desc")}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>{t("about.techTitle")}</CardTitle>
							<CardDescription>{t("about.techDescription")}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								<Badge variant="secondary">Bun</Badge>
								<Badge variant="secondary">TanStack Start</Badge>
								<Badge variant="secondary">React</Badge>
								<Badge variant="secondary">TypeScript</Badge>
								<Badge variant="secondary">Tailwind CSS</Badge>
								<Badge variant="secondary">shadcn/ui</Badge>
								<Badge variant="secondary">Framer Motion</Badge>
								<Badge variant="secondary">TanStack Query</Badge>
								<Badge variant="secondary">i18next</Badge>
								<Badge variant="secondary">Zustand</Badge>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>{t("about.creditsTitle")}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div>
								<h3 className="font-semibold text-slate-800 dark:text-white">{t("about.dataSource")}</h3>
								<p className="text-sm text-slate-600 dark:text-slate-400">
									{t("about.dataSourceDesc")}{" "}
									<a
										href="https://pokeapi.co"
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 dark:text-blue-400 hover:underline"
									>
										PokéAPI
									</a>
								</p>
							</div>
							<div>
								<h3 className="font-semibold text-slate-800 dark:text-white">{t("about.pokemon")}</h3>
								<p className="text-sm text-slate-600 dark:text-slate-400">{t("about.pokemonDesc")}</p>
							</div>
							<div>
								<h3 className="font-semibold text-slate-800 dark:text-white">{t("about.builtBy")}</h3>
								<p className="text-sm text-slate-600 dark:text-slate-400">{t("about.builtByDesc")}</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
