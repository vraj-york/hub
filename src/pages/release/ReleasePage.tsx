import { Card, CardContent } from "@/components/ui/card";
import {
	RELEASE_PAGE_CONTENT,
	RELEASE_TIMELINE_MOCK,
	ROUTES,
} from "@/const";
import { AppLayout } from "@/layout";
import { cn } from "@/lib/utils";

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
						{RELEASE_TIMELINE_MOCK.map((entry) => (
							<Card
								key={entry.id}
								className="border-border shadow-sm"
								size="sm"
							>
								<CardContent className="grid grid-cols-1 gap-0 p-0 sm:grid-cols-2">
									<div className="flex flex-col justify-start border-border p-5 sm:border-r">
										<div className="inline-flex max-w-full rounded-lg border border-border bg-muted/40 px-3 py-2">
											<p className="text-small text-text-foreground">
												<span className="font-medium text-text-secondary">
													{RELEASE_PAGE_CONTENT.plannedLabel}:{" "}
												</span>
												{entry.plannedDateDisplay}
											</p>
										</div>
									</div>
									<div className="flex flex-col justify-end border-t border-border p-5 pt-6 sm:border-t-0 sm:pt-5">
										<div className="inline-flex max-w-full rounded-lg border border-border bg-muted/40 px-3 py-2 sm:mt-6">
											<p className="text-small text-text-foreground">
												<span className="font-medium text-text-secondary">
													{RELEASE_PAGE_CONTENT.actualLabel}:{" "}
												</span>
												{entry.actualDateDisplay}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
