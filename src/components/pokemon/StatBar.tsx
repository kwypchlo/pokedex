import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatBarProps {
	label: string;
	value: number;
	maxValue?: number;
	index: number;
	description?: string;
}

export function StatBar({ label, value, maxValue = 255, index, description }: StatBarProps) {
	const percentage = (value / maxValue) * 100;

	// Google Sheets style red-yellow-green gradient (10 steps)
	// Red: #E67C73, Yellow: #FFD666, Green: #57BB8A
	const getColor = () => {
		if (percentage >= 90) return "bg-[#57BB8A]"; // Green
		if (percentage >= 80) return "bg-[#6FC77F]"; // Light Green
		if (percentage >= 70) return "bg-[#87D374]"; // Yellow-Green
		if (percentage >= 60) return "bg-[#A0DF6A]"; // Lime-Green
		if (percentage >= 50) return "bg-[#FFD666]"; // Yellow (midpoint)
		if (percentage >= 40) return "bg-[#F5C166]"; // Light Orange
		if (percentage >= 30) return "bg-[#EBAC67]"; // Orange
		if (percentage >= 20) return "bg-[#E1976A]"; // Dark Orange
		if (percentage >= 10) return "bg-[#E67C73]"; // Red
		return "bg-[#DB6B62]"; // Dark Red
	};

	const labelContent = <div className="w-24 text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</div>;

	return (
		<div className="flex items-center gap-3">
			{description ? (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="w-24 text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-help">{label}</div>
						</TooltipTrigger>
						<TooltipContent side="left" className="max-w-xs text-center">
							{description}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : (
				labelContent
			)}
			<div className="flex-1 flex items-center gap-2">
				<div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
					<motion.div
						className={`h-full ${getColor()}`}
						initial={{ width: 0 }}
						animate={{ width: `${percentage}%` }}
						transition={{
							duration: 0.3,
							delay: index * 0.03,
							ease: "easeOut",
						}}
					/>
				</div>
				<div className="w-12 text-right text-sm font-bold text-slate-800 dark:text-white">{value}</div>
			</div>
		</div>
	);
}
