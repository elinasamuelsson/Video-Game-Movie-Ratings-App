import {StyleSheet, Text, View} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme} from "../constants/theme";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		text: {
			color: theme.text,
		},
	});

export default function LoginScreen() {
	const styles = useThemedStyles(createStyles);

	return (
		<View style={[styles.container]}>
			<Text style={styles.text}>Welcome back!</Text>
		</View>
	);
}
