import type { ReactNode } from "react";
import {
	Calendar,
	ChevronDown,
	History,
	Lock,
	Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	RELEASE_PAGE_CONTENT,
	RELEASE_TIMELINE_MOCK,
	type ReleaseTimelineEntry,
	ROUTES,
} from "@/const";
import { AppLayout } from "@/layout";
import { cn } from "@/lib/utils";

const plannedHeaderClass =
	"border-[#E8C96A] bg-gradient-to-r from-[#FFF9E6] to-white";
const plannedIconBoxClass = "bg-[#FAF6ED] text-[#78350F]";
const plannedEyebrowClass = "text-[#B45309]";

/** Timeline node + MVP badge — BSP brand blues. */
const timelineBlue = {
	ring: "bg-[var(--bspBlue100)]",
	dot: "bg-[var(--bspBlueBase)]",
	badge: "bg-[var(--bspBlueBase)] text-white",
} as const;

const actualThemes: Record<
	ReleaseTimelineEntry["actualHeaderTheme"],
	{
		wrap: string;
		icon: string;
		label: string;
		iconBox: string;
	}
> = {
	pink: {
		wrap: "border-[#F5C4C9] bg-[#FFF5F6]",
		icon: "text-[#DC2626]",
		label: "text-[#DC2626]",
		iconBox: "border-[#E8E8E8] bg-white",
	},
	teal: {
		wrap: "border-[#99F6E4] bg-[#F0FDFA]",
		icon: "text-[#0D9488]",
		label: "text-[#0F766E]",
		iconBox: "border-[#E8E8E8] bg-white",
	},
};

const headerGridClass =
	"mb-6 hidden pb-3 lg:grid lg:grid-cols-[minmax(0,1fr)_6.5rem_minmax(0,1fr)] lg:gap-x-8";

function PlannedDateGradientHeader({
	eyebrow,
	dateLine,
}: {
	eyebrow: string;
	dateLine: string;
}) {
	return (
		<div
			className={cn(
				"flex gap-3 rounded-xl border p-3.5 shadow-sm",
				plannedHeaderClass,
			)}
		>
			<div
				className={cn(
					"flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#E8D4A8]/60",
					plannedIconBoxClass,
				)}
			>
				<Calendar className="size-5" strokeWidth={2} aria-hidden />
			</div>
			<div className="min-w-0 flex flex-col justify-center gap-0.5">
				<p
					className={cn(
						"text-[10px] font-semibold uppercase tracking-wide",
						plannedEyebrowClass,
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

function ActualReleaseCard({ entry }: { entry: ReleaseTimelineEntry }) {
	if (!entry.actualCompleted) {
		return (
			<Card
				className="overflow-hidden border border-border bg-card shadow-sm"
				size="sm"
			>
				<CardContent className="flex min-h-[140px] items-center justify-center p-6 lg:min-h-[160px]">
					<p className="text-center text-small font-medium text-text-secondary">
						{RELEASE_PAGE_CONTENT.actualNotCompleted}
					</p>
				</CardContent>
			</Card>
		);
	}

	const th = actualThemes[entry.actualHeaderTheme];

	return (
		<Card className="overflow-hidden border border-border bg-card shadow-sm" size="sm">
			<CardContent className="flex flex-col gap-3 p-4 sm:p-5 lg:pt-6">
				<div
					className={cn(
						"flex gap-3 rounded-xl border p-3.5 shadow-sm",
						th.wrap,
					)}
				>
					<div
						className={cn(
							"flex size-10 shrink-0 items-center justify-center rounded-lg shadow-sm",
							th.iconBox,
						)}
					>
						<Calendar className={cn("size-5", th.icon)} strokeWidth={2} aria-hidden />
					</div>
					<div className="min-w-0 flex flex-col justify-center gap-1">
						<p
							className={cn(
								"text-[10px] font-bold uppercase tracking-wide",
								th.label,
							)}
						>
							{RELEASE_PAGE_CONTENT.actualHeaderEyebrow}
						</p>
						<p className="text-base font-semibold leading-snug text-text-foreground">
							{entry.actualDateDisplay}
						</p>
					</div>
				</div>

				<div className="rounded-xl border border-border bg-white p-3.5">
					<p className="text-[10px] font-bold uppercase tracking-wide text-text-secondary">
						{RELEASE_PAGE_CONTENT.actualNotesEyebrow}
					</p>
					<p className="mt-2 text-small font-normal leading-relaxed text-text-foreground">
						{entry.actualReleaseNotes}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

function AccordionBar({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-left",
				className,
			)}
		>
			{children}
		</div>
	);
}

function PlannedStatusBadge({ entry }: { entry: ReleaseTimelineEntry }) {
	if (entry.plannedStatus === "active") {
		return (
			<span
				className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-success/35 bg-success-bg px-2.5 py-1 text-xs font-medium text-success"
				data-slot="release-status-badge"
			>
				<span className="size-1.5 rounded-full bg-success" aria-hidden />
				{RELEASE_PAGE_CONTENT.plannedStatusActive}
				<Sparkles className="size-3.5 opacity-90" strokeWidth={2} aria-hidden />
			</span>
		);
	}
	if (entry.plannedStatus === "locked") {
		return (
			<span
				className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-destructive/30 bg-[#FEF2F2] px-2.5 py-1 text-xs font-medium text-destructive"
				data-slot="release-status-badge"
			>
				<span className="size-1.5 rounded-full bg-destructive" aria-hidden />
				{RELEASE_PAGE_CONTENT.plannedStatusLocked}
				<Lock className="size-3.5 opacity-90" strokeWidth={2} aria-hidden />
			</span>
		);
	}
	return (
		<span
			className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
			data-slot="release-status-badge"
		>
			<span className="size-1.5 rounded-full bg-muted-foreground/60" aria-hidden />
			{RELEASE_PAGE_CONTENT.plannedStatusDraft}
		</span>
	);
}

function PlannedReleaseCard({ entry }: { entry: ReleaseTimelineEntry }) {
	const revisionLabel =
		entry.revisionCount === 1
			? "1 revision"
			: `${entry.revisionCount} revisions`;

	return (
		<Card className="overflow-hidden border-border shadow-md" size="sm">
			<div className="h-1.5 w-full shrink-0 bg-destructive" aria-hidden />
			<CardContent className="space-y-5 p-5">
				<PlannedDateGradientHeader
					eyebrow={RELEASE_PAGE_CONTENT.plannedHeaderEyebrow}
					dateLine={entry.plannedDateRangeDisplay}
				/>

				<div className="flex flex-wrap items-center justify-between gap-3">
					<div className="flex min-w-0 items-center gap-3">
						<Avatar size="sm">
							<AvatarFallback className="bg-muted text-xs font-medium text-text-secondary">
								{entry.ownerInitials}
							</AvatarFallback>
						</Avatar>
						<span className="truncate text-small text-text-secondary">
							{entry.ownerName}
						</span>
					</div>
					<PlannedStatusBadge entry={entry} />
				</div>

				<div className="space-y-2">
					<Collapsible>
						<CollapsibleTrigger className="group w-full cursor-pointer">
							<AccordionBar>
								<span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
									{RELEASE_PAGE_CONTENT.accordionDescription}
								</span>
								<ChevronDown
									className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
									aria-hidden
								/>
							</AccordionBar>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<p className="text-muted-foreground border-border mt-2 rounded-lg border bg-muted/30 px-3 py-2.5 text-xs leading-relaxed">
								{RELEASE_PAGE_CONTENT.plannedDescriptionPlaceholder}
							</p>
						</CollapsibleContent>
					</Collapsible>

					<Collapsible>
						<CollapsibleTrigger className="group w-full cursor-pointer">
							<AccordionBar>
								<span className="flex items-center gap-2 text-small font-medium text-text-foreground">
									<History
										className="size-4 shrink-0 text-muted-foreground"
										aria-hidden
									/>
									{RELEASE_PAGE_CONTENT.accordionChangeHistory}
								</span>
								<ChevronDown
									className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
									aria-hidden
								/>
							</AccordionBar>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<p className="text-muted-foreground border-border mt-2 rounded-lg border bg-muted/30 px-3 py-2.5 text-xs leading-relaxed">
								{RELEASE_PAGE_CONTENT.plannedChangeHistoryPlaceholder}
							</p>
						</CollapsibleContent>
					</Collapsible>

					<Collapsible>
						<CollapsibleTrigger className="group w-full cursor-pointer">
							<AccordionBar>
								<span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5">
									<span className="text-small font-semibold text-text-foreground">
										{RELEASE_PAGE_CONTENT.accordionRevisionHistory}
									</span>
									<span className="text-xs text-text-secondary">
										{revisionLabel}
									</span>
									<span className="text-xs text-text-secondary">
										{RELEASE_PAGE_CONTENT.revisionLatestPrefix}{" "}
										<span className="font-semibold text-text-foreground">
											{entry.revisionLatestId}
										</span>
									</span>
								</span>
								<ChevronDown
									className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
									aria-hidden
								/>
							</AccordionBar>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<p className="text-muted-foreground border-border mt-2 rounded-lg border bg-muted/30 px-3 py-2.5 text-xs leading-relaxed">
								{RELEASE_PAGE_CONTENT.plannedRevisionNotesPlaceholder}
							</p>
						</CollapsibleContent>
					</Collapsible>
				</div>
			</CardContent>
		</Card>
	);
}

function TimelineNodeBlock({ version }: { version: string }) {
	return (
		<div className="flex w-full max-w-[6.5rem] flex-col items-center gap-2.5 px-0.5 py-1 text-center lg:gap-3 lg:pt-1">
			<div
				className={cn(
					"relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.6)_inset]",
					timelineBlue.ring,
				)}
				aria-hidden
			>
				<span
					className={cn(
						"size-4 rounded-full shadow-sm ring-2 ring-background",
						timelineBlue.dot,
					)}
				/>
			</div>
			<span className="relative z-[1] text-small font-bold leading-tight text-text-foreground">
				{version}
			</span>
			<span
				className={cn(
					"relative z-[1] rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
					timelineBlue.badge,
				)}
			>
				{RELEASE_PAGE_CONTENT.timelineMvpBadge}
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
			<div className="hidden lg:flex lg:gap-10 lg:items-start">
				<div className="min-w-0 flex-1 space-y-10">
					{RELEASE_TIMELINE_MOCK.map((entry) => (
						<PlannedReleaseCard key={`planned-${entry.id}`} entry={entry} />
					))}
				</div>

				<div className="relative flex w-[6.5rem] shrink-0 flex-col items-center gap-10 self-stretch">
					<div
						className="absolute top-0 bottom-0 left-1/2 z-0 w-px -translate-x-1/2 rounded-full bg-border"
						aria-hidden
					/>
					{RELEASE_TIMELINE_MOCK.map((entry) => (
						<TimelineNodeBlock key={`node-${entry.id}`} version={entry.version} />
					))}
				</div>

				<div className="min-w-0 flex-1 space-y-10">
					{RELEASE_TIMELINE_MOCK.map((entry) => (
						<ActualReleaseCard key={`actual-${entry.id}`} entry={entry} />
					))}
				</div>
			</div>

			{/* Mobile */}
			<div className="flex flex-col gap-10 lg:hidden">
				{RELEASE_TIMELINE_MOCK.map((entry) => (
					<div key={entry.id} className="flex flex-col gap-4">
						<PlannedReleaseCard entry={entry} />
						<TimelineNodeBlock version={entry.version} />
						<ActualReleaseCard entry={entry} />
					</div>
				))}
			</div>
		</AppLayout>
	);
}
