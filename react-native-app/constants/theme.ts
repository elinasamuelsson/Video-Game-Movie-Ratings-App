// template for color themes light and dark
export type ColorTheme = {
	background: string;
	surface: string;
	primary: string;
	secondary: string;
	text: string;
	textMuted: string;
	border: string;
};

export const Colors: Record<"light" | "dark", ColorTheme> = {
	light: {
		background: "#F9FAFB",
		surface: "#FFFFFF",
		primary: "#6D28D9",
		secondary: "#0891B2",
		text: "#111827",
		textMuted: "#4B5563",
		border: "#E5E7EB",
	},
	dark: {
		background: "#0D0E12",
		surface: "#1A1D24",
		primary: "#8B5CF6",
		secondary: "#06B6D4",
		text: "#F9FAFB",
		textMuted: "#9CA3AF",
		border: "#2A2F3A",
	},
} as const;

export const Size = {
	xSmall: 2,
	small: 4,
	medium: 8,
	large: 16,
	xLarge: 32,
	xxLarge: 64,
};
