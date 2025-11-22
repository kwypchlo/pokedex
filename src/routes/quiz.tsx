import { createFileRoute, useNavigate } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatCard } from "@/components/quiz/StatCard";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { getPokemonIdFromUrl, usePokemon, usePokemonList } from "@/lib/api/pokemon";
import { useSettingsStore } from "@/stores/useSettingsStore";

export const Route = createFileRoute("/quiz")({ component: Quiz });

function Quiz() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const autoNextId = useId();
	const { data: pokemonList } = usePokemonList(151, 0);
	const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null);
	const [options, setOptions] = useState<number[]>([]);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [score, setScore] = useState(0);
	const [_questionsAnswered, setQuestionsAnswered] = useState(0);
	const [shake, setShake] = useState(false);
	const [streak, setStreak] = useState(0);
	const [showQuitDialog, setShowQuitDialog] = useState(false);
	const [countdown, setCountdown] = useState<number | null>(null);
	const [countdownMs, setCountdownMs] = useState<number>(0);

	// Get settings from Zustand store
	const autoNext = useSettingsStore((state) => state.autoNext);
	const setAutoNext = useSettingsStore((state) => state.setAutoNext);
	const quizStats = useSettingsStore((state) => state.quizStats);
	const updateQuizStats = useSettingsStore((state) => state.updateQuizStats);

	// Generate a new question
	const generateQuestion = useCallback(() => {
		if (!pokemonList) return;

		// Pick random Pokemon
		const randomIndex = Math.floor(Math.random() * pokemonList.results.length);
		const correctPokemon = pokemonList.results[randomIndex];
		const correctId = getPokemonIdFromUrl(correctPokemon.url);

		// Generate 3 wrong answers
		const wrongAnswers: number[] = [];
		while (wrongAnswers.length < 3) {
			const randomWrongIndex = Math.floor(Math.random() * pokemonList.results.length);
			const wrongId = getPokemonIdFromUrl(pokemonList.results[randomWrongIndex].url);
			if (wrongId !== correctId && !wrongAnswers.includes(wrongId)) {
				wrongAnswers.push(wrongId);
			}
		}

		// Shuffle options
		const allOptions = [correctId, ...wrongAnswers].sort(() => Math.random() - 0.5);

		setCurrentPokemonId(correctId);
		setOptions(allOptions);
		setSelectedAnswer(null);
	}, [pokemonList]);

	// Initialize first question
	useEffect(() => {
		if (pokemonList && !currentPokemonId) {
			generateQuestion();
		}
	}, [pokemonList, currentPokemonId, generateQuestion]);

	const handleAnswer = (pokemonId: number) => {
		if (selectedAnswer !== null) return; // Already answered

		setSelectedAnswer(pokemonId);
		const correct = pokemonId === currentPokemonId;
		setQuestionsAnswered((prev) => prev + 1);

		if (correct) {
			const newScore = score + 1;
			const newStreak = streak + 1;
			setScore(newScore);
			setStreak(newStreak);

			// Update high score if needed
			if (newStreak > quizStats.highScore) {
				updateQuizStats({ highScore: newStreak });
			}

			// Update total stats
			updateQuizStats({
				totalCorrect: quizStats.totalCorrect + 1,
				totalAttempts: quizStats.totalAttempts + 1,
			});

			// Confetti celebration!
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		} else {
			// Reset streak on wrong answer
			setStreak(0);

			// Update total attempts
			updateQuizStats({
				totalAttempts: quizStats.totalAttempts + 1,
			});

			// Shake animation on wrong answer
			setShake(true);
			setTimeout(() => setShake(false), 500);
		}

		// Start auto-next countdown if enabled
		if (autoNext) {
			setCountdown(5);
			setCountdownMs(5000);
		}
	};

	const handleNext = useCallback(() => {
		setCountdown(null);
		generateQuestion();
	}, [generateQuestion]);

	// Auto-next countdown effect with milliseconds
	useEffect(() => {
		if (countdown === null || countdown === 0 || !autoNext) return;

		const startTime = Date.now();
		const endTime = startTime + countdownMs;

		const interval = setInterval(() => {
			const now = Date.now();
			const remaining = endTime - now;

			if (remaining <= 0) {
				handleNext();
				clearInterval(interval);
			} else {
				setCountdownMs(remaining);
				const newCountdown = Math.ceil(remaining / 1000);
				if (newCountdown !== countdown) {
					setCountdown(newCountdown);
				}
			}
		}, 50); // Update every 50ms for smooth countdown

		return () => clearInterval(interval);
	}, [countdown, autoNext, countdownMs, handleNext]);

	// Cancel countdown when autoNext is disabled
	useEffect(() => {
		if (!autoNext && countdown !== null) {
			setCountdown(null);
		}
	}, [autoNext, countdown]);



	if (!pokemonList || !currentPokemonId) {
		return (
			<div className="min-h-[calc(100dvh-64px)] bg-gradient-to-b from-blue-50 to-red-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
				<div className="text-center">
					<div className="text-4xl mb-4">⚡</div>
					<p className="text-xl font-semibold dark:text-white">{t("common.loading")}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-[calc(100dvh-64px)] bg-gradient-to-b from-blue-50 to-red-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
			<div className="container mx-auto px-4 max-w-5xl w-full py-3 lg:py-6">
				<motion.div
					className="flex flex-col lg:flex-row items-center gap-3 lg:gap-8 w-full max-h-[calc(100dvh-80px)] overflow-y-auto lg:overflow-visible"
					animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
					transition={{ duration: 0.5 }}
				>
					{/* Left side: Pokemon Silhouette */}
					<div className="flex-1 flex items-center justify-center w-full max-w-[280px] lg:max-w-md mx-auto shrink-0">
						<Card className="w-full">
							<CardContent className="p-2 lg:p-6">
								<PokemonSilhouette pokemonId={currentPokemonId} revealed={selectedAnswer !== null} />
							</CardContent>
						</Card>
					</div>

					{/* Right side: Score + Options */}
					<div className="flex-1 flex flex-col justify-center w-full">
						{/* Score Display - Desktop only, always visible */}
						<dl className="hidden lg:grid grid-cols-3 gap-6 mb-6">
							<StatCard label={t("quiz.score")} value={score} emoji="🎯" />
							<StatCard label={t("quiz.streak")} value={streak} emoji="🔥" />
							<StatCard label={t("quiz.highScore")} value={quizStats.highScore} emoji="🏆" />
						</dl>

						{/* Divider - Desktop only */}
						<div className="hidden lg:block mb-6 h-px bg-slate-200 dark:bg-slate-700" />

						{/* Question OR Compact Stats (Mobile only) */}
						<div className="mb-3 lg:mb-6">
							{/* Mobile: Question before answer, compact stats after */}
							<div className="lg:hidden">
								{selectedAnswer === null ? (
									<h2 className="text-xl font-bold text-slate-800 dark:text-white text-center">{t("quiz.question")}</h2>
								) : (
									<div className="flex justify-center gap-4 text-sm">
										<span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
											<span className="text-lg">🎯</span>
											<span className="font-semibold">{score}</span>
										</span>
										<span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
											<span className="text-lg">🔥</span>
											<span className="font-semibold">{streak}</span>
										</span>
										<span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
											<span className="text-lg">🏆</span>
											<span className="font-semibold">{quizStats.highScore}</span>
										</span>
									</div>
								)}
							</div>

							{/* Desktop: Always show question */}
							<h2 className="hidden lg:block text-2xl font-bold text-slate-800 dark:text-white text-center">{t("quiz.question")}</h2>
						</div>

						{/* Answer Options */}
						<div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-4">
							{options.map((pokemonId) => (
								<AnswerOption
									key={pokemonId}
									pokemonId={pokemonId}
									onClick={() => handleAnswer(pokemonId)}
									selected={selectedAnswer === pokemonId}
									correct={selectedAnswer !== null && pokemonId === currentPokemonId}
									disabled={selectedAnswer !== null}
								/>
							))}
						</div>

						<Separator className="my-3 lg:my-4" />

						{/* Action Buttons - Always visible */}
						<div className="space-y-2 lg:space-y-3 pb-safe">
							<div className="flex gap-2 lg:gap-3">
								<Button variant="outline" onClick={() => setShowQuitDialog(true)} className="flex-1 gap-2 h-10 lg:h-11">
									<Home size={16} />
									<span className="hidden sm:inline">{t("quiz.quit")}</span>
								</Button>
								<div className="flex-[2] flex flex-col gap-2">
									<Button onClick={handleNext} disabled={selectedAnswer === null} className="gap-2 tabular-nums h-10 lg:h-11 w-full">
										{countdown !== null && autoNext && <Spinner />}
										{countdown !== null && autoNext ? (
											<>
												{t("quiz.next")} {t("quiz.nextIn")} {(countdownMs / 1000).toFixed(2)} {t("quiz.seconds")}
											</>
										) : (
											t("quiz.next")
										)}
									</Button>
									{/* Auto-Next Switch - Moved below buttons for better spacing */}
									<div className="flex items-center justify-center gap-2 pt-1">
										<Switch
											id={autoNextId}
											checked={autoNext}
											onCheckedChange={setAutoNext}
											aria-label={t("quiz.autoNext")}
										/>
										<Label htmlFor={autoNextId} className="cursor-pointer text-sm text-slate-600 dark:text-slate-400">
											{t("quiz.autoNext")}
										</Label>
									</div>
								</div>
							</div>
						</div>

						{/* Quit Confirmation Dialog */}
						<AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>{t("quiz.quitTitle")}</AlertDialogTitle>
									<AlertDialogDescription>{t("quiz.quitMessage")}</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
									<AlertDialogAction onClick={() => navigate({ to: "/" })}>{t("quiz.quitConfirm")}</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

// Silhouette Component
function PokemonSilhouette({ pokemonId, revealed }: { pokemonId: number; revealed: boolean }) {
	const { data: pokemon } = usePokemon(pokemonId);

	if (!pokemon) return null;

	return (
		<div className="relative aspect-square w-full">
			<img
				src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
				alt="Pokemon"
				className="w-full h-full object-contain"
				loading="lazy"
				style={{
					filter: revealed ? "none" : "brightness(0) contrast(1)",
				}}
			/>
		</div>
	);
}

// Answer Option Component
function AnswerOption({
	pokemonId,
	onClick,
	selected,
	correct,
	disabled,
}: {
	pokemonId: number;
	onClick: () => void;
	selected: boolean;
	correct: boolean;
	disabled: boolean;
}) {
	const { data: pokemon } = usePokemon(pokemonId);

	if (!pokemon) return null;

	const getButtonStyle = () => {
		if (!disabled)
			return "border-2 border-slate-300 dark:border-slate-600 hover:border-yellow-500 dark:hover:border-yellow-400";
		if (correct) return "border-2 border-green-500 bg-green-50 dark:bg-green-900/20";
		if (selected && !correct) return "border-2 border-red-500 bg-red-50 dark:bg-red-900/20";
		return "border-2 border-slate-300 dark:border-slate-600 opacity-50";
	};

	return (
		<motion.button
			onClick={onClick}
			disabled={disabled}
			whileHover={!disabled ? { scale: 1.02 } : {}}
			whileTap={!disabled ? { scale: 0.98 } : {}}
			className={`p-3 rounded-lg transition-all ${getButtonStyle()}`}
		>
			<div className="text-base font-bold capitalize text-slate-800 dark:text-white">{pokemon.name}</div>
		</motion.button>
	);
}
