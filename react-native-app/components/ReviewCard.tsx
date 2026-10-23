import {View, Text, StyleSheet} from "react-native";
import {useThemedStyles} from "../hooks/useTheme";
import {Review} from "../types/review";
import {ColorTheme, Size} from "../constants/theme";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		card: {
			backgroundColor: theme.surface,
			padding: Size.medium,
			marginVertical: Size.small,
			borderRadius: Size.small,
		},
		header: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		username: {
			color: theme.textMuted,
			fontSize: 14,
		},
		rating: {
			color: theme.text,
			fontSize: 14,
			fontWeight: "600",
		},
		title: {
			color: theme.text,
			fontSize: 16,
			fontWeight: "600",
			marginTop: Size.small,
		},
		content: {
			color: theme.text,
			fontSize: 14,
			marginTop: 4,
		},
	});

type ReviewCardProps = {
	review: Review;
};

export default function ReviewCard({review}: ReviewCardProps) {
	const styles = useThemedStyles(createStyles);

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.username}>UsernamePH</Text>
				<Text style={styles.rating}>★ {review.rating}/5</Text>
			</View>
			<Text style={styles.title} numberOfLines={1}>
				{review.title}
			</Text>
			<Text style={styles.content} numberOfLines={4}>
				{review.content}
			</Text>
		</View>
	);
}
