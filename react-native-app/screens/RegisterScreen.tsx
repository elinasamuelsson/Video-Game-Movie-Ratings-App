import {useState} from "react";

import {StyleSheet, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {useThemedStyles} from "../hooks/useTheme";
import {navigationRef} from "../hooks/navigationRef";
import {ColorTheme, Size} from "../constants/theme";

import Button from "../components/Button";
import ThemedText from "../components/ThemedText";
import CustomTextInput from "../components/CustomTextInput";
import ThemedTextHeader from "../components/ThemedTextHeader";

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

export default function RegisterScreen() {
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();

	const [username, setUsername] = useState<String>("");
	const [password, setPassword] = useState<String>("");

	async function submitRegisterDetails() {
		try {
			const response = await fetch("http://192.168.50.248:8080/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({username: username, password: password}),
			});

			const data = await response.text();
			if (response.ok) {
				navigationRef.navigate("Login");
			} else {
				console.error(data);
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<View style={[styles.container, {paddingBottom: insets.bottom + 80, paddingTop: insets.top}]}>
			<ThemedTextHeader text="Register account:" />
			<View style={styles.container}>
				<View>
					<ThemedText text="Username:" bold={false} muted={false} />
					<CustomTextInput
						placeholder="username"
						placeholderColor="grey"
						password={false}
						onChangeText={setUsername}
					/>
				</View>
				<View>
					<ThemedText text="Password:" bold={false} muted={false} />
					<CustomTextInput
						placeholder="password"
						placeholderColor="grey"
						password={true}
						onChangeText={setPassword}
					/>
				</View>
				<Button text="Submit" onPress={submitRegisterDetails} />
			</View>
		</View>
	);
}
