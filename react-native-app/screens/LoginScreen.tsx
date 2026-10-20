import {useState} from "react";

import {StyleSheet, Pressable, Text, TextInput, View} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAuth} from "../context/authContext";
import {navigationRef} from "../hooks/navigationRef";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		text: {
			color: theme.textMuted,
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
		textInput: {
			backgroundColor: theme.surface,
			color: theme.textMuted,
			marginVertical: Size.small,

			width: Size.xxLarge * 3,
		},
	});

export default function LoginScreen() {
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();
	const {signIn} = useAuth();

	const [username, setUsername] = useState<String>("");
	const [password, setPassword] = useState<String>("");

	const API_URL = process.env.EXPO_PUBLIC_API_URL;

	async function submitLoginDetails() {
		try {
			const response = await fetch(`${API_URL}/api/auth/session`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({username: username, password: password}),
			});

			const data = await response.text();
			if (response.ok && data) {
				await signIn(data);
			} else {
				console.error(data);
			}
		} catch (error) {
			console.error(error);
		}
	}

	function navigateToRegister() {
		navigationRef.navigate("Register");
	}

	return (
		<View style={[styles.container, {paddingBottom: insets.bottom, paddingTop: insets.top}]}>
			<View style={styles.container}>
				<View>
					<Text style={styles.text}>Username:</Text>
					<TextInput
						placeholder="username"
						placeholderTextColor="grey"
						onChangeText={setUsername}
						style={styles.textInput}
					/>
				</View>
				<View>
					<Text style={styles.text}>Password:</Text>
					<TextInput
						placeholder="password"
						placeholderTextColor="grey"
						onChangeText={setPassword}
						style={styles.textInput}
					/>
				</View>
				<Pressable style={styles.button} onPress={submitLoginDetails}>
					<Text style={styles.buttonText}>Login</Text>
				</Pressable>
			</View>
			<Pressable style={styles.button} onPress={navigateToRegister}>
				<Text style={styles.buttonText}>Register</Text>
			</Pressable>
		</View>
	);
}
