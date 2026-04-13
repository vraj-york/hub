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

const headerGridClass =
	"mb-6 hidden pb-3 lg:grid lg:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,1fr)] lg:gap-x-8";

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

function TimelineNodeBlock({
	version,
	timelineDate,
}: {
	version: string;
	timelineDate: string;
}) {
	return (
		<div className="flex flex-col items-center pt-1 text-center lg:pt-0">
			<div
				className="relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full bg-success-bg shadow-[0_0_0_1px_rgba(255,255,255,0.5)_inset]"
				aria-hidden
			>
				<span className="size-3.5 rounded-full bg-success shadow-sm ring-2 ring-background" />
			</div>
			<span className="relative z-[1] mt-2 text-small font-bold text-text-foreground">
				{version}
			</span>
			<span className="relative z-[1] mt-0.5 text-xs text-text-secondary">
				{timelineDate}
			</span>
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

			<div className="mb-6 border-b border-border pb-3 lg:mb-8">
				<div className="space-y-3 lg:hidden">
					<p className="text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
						{RELEASE_PAGE_CONTENT.columnTimeline}
					</p>
					<div className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase tracking-wide text-text-secondary">
						<div>{RELEASE_PAGE_CONTENT.columnPlanned}</div>
						<div className="text-end">
							{RELEASE_PAGE_CONTENT.columnActual}
						</div>
					</div>
				</div>
				<div className={headerGridClass}>
					<div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
						{RELEASE_PAGE_CONTENT.columnPlanned}
					</div>
					<div className="text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
						{RELEASE_PAGE_CONTENT.columnTimeline}
					</div>
					<div className="text-xs font-semibold uppercase tracking-wide text-text-secondary lg:text-end">
						{RELEASE_PAGE_CONTENT.columnActual}
					</div>
				</div>
			</div>

			{/* Desktop: planned | timeline | actual */}
			<div className="hidden lg:flex lg:gap-8 lg:items-start">
				<div className="min-w-0 flex-1 space-y-10">
					{RELEASE_TIMELINE_MOCK.map((entry) => (
						<Card
							key={`planned-${entry.id}`}
							className="overflow-hidden border-border shadow-md"
							size="sm"
						>
							<div className="h-1.5 w-full shrink-0 bg-success" aria-hidden />
							<CardContent className="p-5">
								<ReleaseDateGradientHeader
									eyebrow={RELEASE_PAGE_CONTENT.plannedHeaderEyebrow}
									dateLine={entry.plannedDateDisplay}
									variant="planned"
								/>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="relative flex w-[5.5rem] shrink-0 flex-col items-center gap-10 self-stretch">
					<div
						className="absolute top-0 bottom-0 left-1/2 z-0 w-px -translate-x-1/2 rounded-full bg-border"
						aria-hidden
					/>
					{RELEASE_TIMELINE_MOCK.map((entry) => (
						<TimelineNodeBlock
							key={`node-${entry.id}`}
							version={entry.version}
							timelineDate={entry.timelineDate}
						/>
					))}
				</div>

				<div className="min-w-0 flex-1 space-y-10">
					{RELEASE_TIMELINE_MOCK.map((entry, rowIndex) => {
						const actualVariant =
							rowIndex % 2 === 0 ? ("pink" as const) : ("teal" as const);
						return (
							<Card
								key={`actual-${entry.id}`}
								className="overflow-hidden border-border shadow-md"
								size="sm"
							>
								<CardContent className="p-5 lg:pt-7">
									<div className="lg:mt-1">
										<ReleaseDateGradientHeader
											eyebrow={RELEASE_PAGE_CONTENT.actualHeaderEyebrow}
											dateLine={entry.actualDateDisplay}
											variant={actualVariant}
										/>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>

			{/* Mobile: stacked blocks per release (planned → timeline → actual) */}
			<div className="flex flex-col gap-10 lg:hidden">
				{RELEASE_TIMELINE_MOCK.map((entry, rowIndex) => {
					const actualVariant =
						rowIndex % 2 === 0 ? ("pink" as const) : ("teal" as const);
					return (
						<div key={entry.id} className="flex flex-col gap-4">
							<Card
								className="overflow-hidden border-border shadow-md"
								size="sm"
							>
								<div className="h-1.5 w-full shrink-0 bg-success" aria-hidden />
								<CardContent className="p-5">
									<ReleaseDateGradientHeader
										eyebrow={RELEASE_PAGE_CONTENT.plannedHeaderEyebrow}
										dateLine={entry.plannedDateDisplay}
										variant="planned"
									/>
								</CardContent>
							</Card>
							<TimelineNodeBlock
								version={entry.version}
								timelineDate={entry.timelineDate}
							/>
							<Card
								className="overflow-hidden border-border shadow-md"
								size="sm"
							>
								<CardContent className="p-5">
									<ReleaseDateGradientHeader
										eyebrow={RELEASE_PAGE_CONTENT.actualHeaderEyebrow}
										dateLine={entry.actualDateDisplay}
										variant={actualVariant}
									/>
								</CardContent>
							</Card>
						</div>
					);
				})}
			</div>
		</AppLayout>
	);
}
