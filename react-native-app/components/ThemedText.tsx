import {StyleSheet, Text} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		base: {
			fontSize: Size.large + 1,
		},
		text: {
			color: theme.text,
		},
		textMuted: {
			color: theme.textMuted,
		},
		textBold: {
			fontWeight: 600,
		},
	});

type ThemedTextProps = {
	text: String;
	bold: boolean;
	muted: boolean;
};

export default function ThemedText({text, bold, muted}: ThemedTextProps) {
	const styles = useThemedStyles(createStyles);

	return <Text style={[styles.base, bold && styles.textBold, muted ? styles.textMuted : styles.text]}>{text}</Text>;
}
