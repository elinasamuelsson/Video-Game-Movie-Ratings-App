import {StyleSheet, View} from "react-native";

import {useAuth, userIsSignedIn} from "../context/authContext";
import {useThemedStyles} from "../hooks/useTheme";
import {navigationRef} from "../hooks/navigationRef";
import {ColorTheme, Size} from "../constants/theme";

import Button from "../components/Button";
import ThemedTextHeader from "../components/ThemedTextHeader";
import ThemedText from "../components/ThemedText";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			flex: 1,
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		row: {
			flexDirection: "row",
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
	const {user} = useAuth();

	function navigateToLogin() {
		navigationRef.navigate("Login");
	}
	function navigateToRegister() {
		navigationRef.navigate("Register");
	}

	return (
		<View style={[styles.container]}>
			<View>
				<View style={styles.row}>
					<ThemedTextHeader text="Welcome " />
					{user && <ThemedTextHeader text={`${user.username}`} />}
				</View>
				<ThemedText text="to the Video Game Movie Library" bold={true} muted={true} />
			</View>
			{!isSignedIn && (
				<View>
					<Button text="Go to login" onPress={navigateToLogin} />
					<Button text="Register new account" onPress={navigateToRegister} />
				</View>
			)}
		</View>
	);
}
