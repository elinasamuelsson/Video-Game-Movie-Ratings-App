import {useState} from "react";

import {StyleSheet, Pressable, Text, TextInput, View} from "react-native";
import * as SecureStore from "expo-secure-store";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {StackActions, useNavigation} from "@react-navigation/native";

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
	const navigation = useNavigation();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

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
			if (response.ok) {
				await SecureStore.setItemAsync("sessionToken", data);
				navigation.dispatch(StackActions.replace("Home"));
			} else {
				console.error(data);
			}
		} catch (error) {
			console.error(error);
		}
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
			<Pressable style={styles.button}>
				<Text style={styles.buttonText}>Register</Text>
			</Pressable>
		</View>
	);
}
