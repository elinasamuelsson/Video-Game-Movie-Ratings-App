import {Pressable, Text, StyleSheet, View} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {Movie} from "../types/movie";

import ThemedText from "./ThemedText";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		card: {
			backgroundColor: theme.surface,
			width: 380,
			padding: Size.medium,
			marginVertical: Size.small,
			borderRadius: Size.small,
		},
		containerRow: {
			flexDirection: "row",
			alignItems: "center",
		},
		cardImg: {
			width: Size.xxLarge,
			aspectRatio: 2 / 3,
			borderRadius: Size.small,
			backgroundColor: theme.background,
			alignItems: "center",
			justifyContent: "center",
		},
		imgPlaceholder: {
			color: theme.textMuted,
		},
		cardContent: {
			flex: 1,
			marginLeft: Size.medium,
		},
	});

type MovieCardProps = {
	movie: Movie;
	onPress: () => void;
};

export default function MovieCard({movie, onPress}: MovieCardProps) {
	const styles = useThemedStyles(createStyles);

	function formatReleaseDate(isoDate: string): string {
		return new Date(isoDate).toLocaleDateString("en-US", {
			month: "long",
			year: "numeric",
			timeZone: "UTC",
		});
	}

	return (
		<Pressable style={styles.card} onPress={onPress}>
			<View style={styles.containerRow}>
				<View style={styles.cardImg}>
					<Text style={styles.imgPlaceholder}>PH</Text>
				</View>
				<View style={styles.cardContent}>
					<ThemedText text={movie.title} bold={true} muted={false} />
					<ThemedText text={`${formatReleaseDate(movie.releaseDate)}`} bold={false} muted={true} />
				</View>
			</View>
		</Pressable>
	);
}
