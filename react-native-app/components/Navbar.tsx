import {View, Pressable, Text, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {navigationRef} from "../hooks/navigationRef";
import {useThemedStyles} from "../hooks/useTheme";
import {Size, ColorTheme} from "../constants/theme";
import {userIsSignedIn} from "../context/authContext";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		bar: {
			backgroundColor: theme.surface,
			position: "absolute",
			left: Size.large,
			right: Size.large,
			height: Size.xxLarge,
			borderRadius: Size.large,
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
			elevation: Size.medium,
		},
		text: {
			color: theme.textMuted,
		},
	});

export default function Navbar() {
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();

	const isSignedIn = userIsSignedIn();

	return (
		<View style={[styles.bar, {bottom: insets.bottom + 8}]}>
			<Pressable onPress={() => navigationRef.isReady() && navigationRef.navigate("Home")}>
				<Text style={styles.text}>Home</Text>
			</Pressable>
			<Pressable onPress={() => navigationRef.isReady() && navigationRef.navigate("Movies")}>
				<Text style={styles.text}>Movies</Text>
			</Pressable>
			{isSignedIn && (
				<Pressable onPress={() => navigationRef.isReady() && navigationRef.navigate("Profile")}>
					<Text style={styles.text}>Profile</Text>
				</Pressable>
			)}
		</View>
	);
}
