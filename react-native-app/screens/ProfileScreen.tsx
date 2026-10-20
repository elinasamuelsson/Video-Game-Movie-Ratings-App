import {View, Pressable, Text, StyleSheet} from "react-native";
import * as SecureStore from "expo-secure-store";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {useAuth} from "../context/authContext";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
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
	const {signOut} = useAuth();

	async function logout() {
		const sessionToken = await SecureStore.getItemAsync("sessionToken");
		const authorization = await ("Bearer " + sessionToken);

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
		<View style={styles.container}>
			<Pressable style={styles.button} onPress={logout}>
				<Text style={styles.buttonText}>Logout</Text>
			</Pressable>
		</View>
	);
}
