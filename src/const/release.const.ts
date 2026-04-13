export const RELEASE_PAGE_CONTENT = {
	title: "Release",
	subtitle: "Planned and actual release dates by version.",
	breadcrumbsTitle: "Release",
	columnPlanned: "Planned Release",
	columnActual: "Actual Release",
	plannedLabel: "ReleaseDate",
	actualLabel: "Actual Release Date",
} as const;

export type ReleaseTimelineEntry = {
	id: string;
	version: string;
	timelineDate: string;
	plannedDateDisplay: string;
	actualDateDisplay: string;
};

/** Sample data — replace with API when available. */
export const RELEASE_TIMELINE_MOCK: ReleaseTimelineEntry[] = [
	{
		id: "1",
		version: "1.21.9",
		timelineDate: "Mar 30, 2026",
		plannedDateDisplay: "1st March 2026",
		actualDateDisplay: "4th March 2026",
	},
	{
		id: "2",
		version: "1.21.6",
		timelineDate: "Mar 25, 2026",
		plannedDateDisplay: "20th February 2026",
		actualDateDisplay: "25th March 2026",
	},
	{
		id: "3",
		version: "1.21.3",
		timelineDate: "Feb 14, 2026",
		plannedDateDisplay: "1st February 2026",
		actualDateDisplay: "14th February 2026",
	},
] as const;
