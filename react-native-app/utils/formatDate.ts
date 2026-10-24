export default function formatDate(isoDate: string): string {
	return new Date(isoDate).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	});
}
