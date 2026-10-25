import {StyleSheet, Text} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		text: {
			color: theme.secondary,
			fontSize: Size.xLarge + 2,
		},
	});

type ThemedTextProps = {text: String};

export default function ThemedTextHeader({text}: ThemedTextProps) {
	const styles = useThemedStyles(createStyles);

	return (
		<Text style={styles.text} accessibilityRole="header">
			{text}
		</Text>
	);
}
