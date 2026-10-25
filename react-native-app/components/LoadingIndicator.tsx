import {ActivityIndicator, StyleSheet, View} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		container: {
			alignItems: "center",
			justifyContent: "center",
			padding: Size.large,
		},
		indicator: {
			color: theme.primary,
		},
	});

export default function LoadingIndicator() {
	const styles = useThemedStyles(createStyles);

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" />
		</View>
	);
}
