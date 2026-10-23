import {View, Text, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {useAuth} from "../context/authContext";
import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";

import Button from "../components/Button";

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
		},
		button: {
			backgroundColor: theme.secondary,
			borderColor: theme.border,
			borderRadius: Size.medium,
			paddingVertical: Size.medium,
			paddingHorizontal: Size.large,

			color: theme.background,
		},
		buttonText: {
			color: theme.background,
		},
	});

export default function ProfileScreen() {
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();
	const {token, signOut} = useAuth();

	async function logout() {
		const authorization = "Bearer " + token;

		const API_URL = process.env.EXPO_PUBLIC_API_URL;
		try {
			const response = await fetch(`${API_URL}/api/auth/logout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${authorization}`,
				},
			});

			if (response.ok) {
				await signOut();
			} else {
				console.error(response);
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<View style={[styles.container, {paddingTop: insets.top}, {paddingBottom: insets.bottom + 80}]}>
			<View>
				<Text style={styles.text}>User details</Text>
				<Text style={styles.text}>User posted reviews</Text>
			</View>
			<Button text="Logout" onPress={logout} />
		</View>
	);
}
