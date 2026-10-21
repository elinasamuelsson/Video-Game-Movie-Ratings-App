import {StyleSheet, Text, View, Pressable} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {navigationRef} from "../hooks/navigationRef";
import {userIsSignedIn} from "../context/authContext";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			flex: 1,
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		text: {
			color: theme.text,
			marginBottom: Size.medium,
		},
		button: {
			backgroundColor: theme.secondary,
			borderColor: theme.border,
			borderRadius: Size.medium,
			paddingVertical: Size.medium,
			paddingHorizontal: Size.large,
			marginBottom: Size.small,

			color: theme.background,
		},
		buttonText: {
			color: theme.background,
		},
	});

export default function LoginScreen() {
	const styles = useThemedStyles(createStyles);
	const isSignedIn = userIsSignedIn();

	function navigateToLogin() {
		navigationRef.navigate("Login");
	}
	function navigateToRegister() {
		navigationRef.navigate("Register");
	}

	return (
		<View style={[styles.container]}>
			<Text style={styles.text}>Welcome to the Video Game Movie Library</Text>
			{!isSignedIn && (
				<View>
					<Pressable style={styles.button} onPress={navigateToLogin}>
						<Text style={styles.buttonText}>Go to login</Text>
					</Pressable>
					<Pressable style={styles.button} onPress={navigateToRegister}>
						<Text style={styles.buttonText}>Go to register</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
}
