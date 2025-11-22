interface StatCardProps {
	label: string;
	value: string | number;
	emoji: string;
}

export function StatCard({ label, value, emoji }: StatCardProps) {
	return (
		<div className="flex flex-row lg:flex-row gap-x-2 lg:gap-x-3 items-center justify-center lg:justify-start">
			<div className="text-2xl lg:text-5xl flex-shrink-0 flex items-center justify-center">
				{emoji}
			</div>
			<div className="flex flex-row lg:flex-col gap-1 lg:gap-0 items-center lg:items-start lg:h-14 lg:justify-between">
				<dt className="text-sm lg:text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
				<dd className="text-sm lg:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white leading-none">
					{value}
				</dd>
			</div>
		</div>
	);
}
