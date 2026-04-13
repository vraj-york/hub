import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
	RELEASE_PAGE_CONTENT,
	RELEASE_TIMELINE_MOCK,
	ROUTES,
} from "@/const";
import { AppLayout } from "@/layout";
import { cn } from "@/lib/utils";

const plannedHeaderClass =
	"border-[#F0D48B] bg-gradient-to-r from-[#FFF9E5] to-white";
const plannedIconBoxClass = "bg-[#E8D4A8] text-[#92400E]";
const plannedEyebrowClass = "text-[#B45309]";

const actualVariants = {
	pink: {
		wrap: "border-[#F8D7DA] bg-gradient-to-r from-[#FFF1F1] to-white",
		iconBox: "bg-[#F5C6CB] text-[#9B2C2C]",
		eyebrow: "text-[#C53030]",
	},
	teal: {
		wrap: "border-[#B2F5EA] bg-gradient-to-r from-[#E6FFFA] to-white",
		iconBox: "bg-[#9AE6DE] text-[#234E52]",
		eyebrow: "text-[#2C7A7B]",
	},
} as const;

function ReleaseDateGradientHeader({
	eyebrow,
	dateLine,
	variant,
}: {
	eyebrow: string;
	dateLine: string;
	variant: "planned" | "pink" | "teal";
}) {
	const isPlanned = variant === "planned";
	const v = isPlanned ? null : actualVariants[variant];

	return (
		<div
			className={cn(
				"flex gap-3 rounded-xl border p-3 shadow-sm",
				isPlanned ? plannedHeaderClass : v?.wrap,
			)}
		>
			<div
				className={cn(
					"flex size-10 shrink-0 items-center justify-center rounded-lg",
					isPlanned ? plannedIconBoxClass : v?.iconBox,
				)}
			>
				<Calendar className="size-5" strokeWidth={2} aria-hidden />
			</div>
			<div className="min-w-0 flex flex-col justify-center gap-0.5">
				<p
					className={cn(
						"text-[10px] font-semibold uppercase tracking-wide",
						isPlanned ? plannedEyebrowClass : v?.eyebrow,
					)}
				>
					{eyebrow}
				</p>
				<p className="text-small font-semibold leading-snug text-text-foreground">
					{dateLine}
				</p>
			</div>
		</div>
	);
}

export function ReleasePage() {
	const breadcrumbs = [
		{
			label: RELEASE_PAGE_CONTENT.breadcrumbsTitle,
			path: ROUTES.release.root,
		},
	];

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="mb-6">
				<h1 className="text-heading-4 font-semibold text-text-foreground">
					{RELEASE_PAGE_CONTENT.title}
				</h1>
				<p className="text-small text-text-secondary">
					{RELEASE_PAGE_CONTENT.subtitle}
				</p>
			</div>

			<div className="flex flex-col gap-0 lg:flex-row lg:gap-10">
				{/* Timeline */}
				<div className="relative shrink-0 lg:w-44">
					<div
						className="absolute left-[11px] top-2 bottom-2 w-px bg-border lg:left-[11px]"
						aria-hidden
					/>
					<ul className="relative flex flex-row gap-6 overflow-x-auto pb-4 lg:flex-col lg:gap-8 lg:overflow-visible lg:pb-0 lg:pr-2">
						{RELEASE_TIMELINE_MOCK.map((entry, index) => (
							<li
								key={entry.id}
								className="flex min-w-[140px] gap-3 lg:min-w-0"
							>
								<div className="relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center">
									<span
										className={cn(
											"size-3 rounded-full border-2 border-primary bg-card shadow-sm",
											index === 0 && "bg-primary",
										)}
									/>
								</div>
								<div className="flex min-w-0 flex-col pt-0.5">
									<span className="text-small font-semibold text-text-foreground">
										{entry.version}
									</span>
									<span className="text-xs text-text-secondary">
										{entry.timelineDate}
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>

				{/* Cards + column headers */}
				<div className="min-w-0 flex-1 space-y-4">
					<div className="grid grid-cols-2 gap-4 border-b border-border pb-3 pl-1">
						<div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
							{RELEASE_PAGE_CONTENT.columnPlanned}
						</div>
						<div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
							{RELEASE_PAGE_CONTENT.columnActual}
						</div>
					</div>

					<div className="flex flex-col gap-6">
						{RELEASE_TIMELINE_MOCK.map((entry, rowIndex) => {
							const actualVariant =
								rowIndex % 2 === 0 ? ("pink" as const) : ("teal" as const);
							return (
								<Card
									key={entry.id}
									className="overflow-hidden border-border shadow-md"
									size="sm"
								>
									<CardContent className="grid grid-cols-1 gap-0 p-0 sm:grid-cols-2">
										<div className="flex flex-col border-border sm:border-r">
											<div
												className="h-1.5 w-full shrink-0 bg-destructive"
												aria-hidden
											/>
											<div className="p-5">
												<ReleaseDateGradientHeader
													eyebrow={RELEASE_PAGE_CONTENT.plannedHeaderEyebrow}
													dateLine={entry.plannedDateDisplay}
													variant="planned"
												/>
											</div>
										</div>
										<div className="flex flex-col justify-end border-t border-border sm:border-t-0">
											<div className="p-5 pt-6 sm:pt-8">
												<div className="sm:mt-4">
													<ReleaseDateGradientHeader
														eyebrow={
															RELEASE_PAGE_CONTENT.actualHeaderEyebrow
														}
														dateLine={entry.actualDateDisplay}
														variant={actualVariant}
													/>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
