import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { getTypeColor } from "@/lib/type-colors";

interface TypeBadgeProps {
	type: string;
	variant?: "default" | "small";
}

export function TypeBadge({ type, variant = "default" }: TypeBadgeProps) {
	const { t } = useTranslation();
	const colors = getTypeColor(type);

	const sizeClasses = variant === "small" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

	return (
		<Badge
			className={`${colors.bg} ${colors.text} border ${colors.border} ${sizeClasses} font-semibold capitalize`}
			variant="outline"
		>
			{t(`types.${type}`)}
		</Badge>
	);
}
