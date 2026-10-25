import {StyleSheet, TextInput} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		textInput: {
			backgroundColor: theme.surface,
			borderColor: theme.border,
			borderWidth: 1,
			borderRadius: Size.small,
			color: theme.textMuted,
			marginVertical: Size.small,

			width: Size.xxLarge * 3,
		},
	});

type TextInputProps = {
	placeholder: string;
	placeholderColor: string;
	password: boolean;
	onChangeText: (text: string) => void;
	value?: string;
};

export default function CustomTextInput({
	placeholder,
	placeholderColor,
	password,
	onChangeText,
	value,
}: TextInputProps) {
	const styles = useThemedStyles(createStyles);

	return (
		<TextInput
			accessibilityLabel={placeholder}
			placeholder={placeholder}
			placeholderTextColor={placeholderColor}
			secureTextEntry={password}
			onChangeText={onChangeText}
			value={value}
			style={styles.textInput}
		/>
	);
}
