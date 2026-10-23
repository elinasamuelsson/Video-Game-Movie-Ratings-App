import {Text, Pressable, StyleSheet} from "react-native";
import {ColorTheme, Size} from "../constants/theme";
import {useThemedStyles} from "../hooks/useTheme";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		button: {
			backgroundColor: theme.primary,
			paddingHorizontal: Size.large,
			paddingVertical: Size.medium,
			marginBottom: Size.small,
			borderRadius: Size.medium,
		},
		buttonPressed: {
			backgroundColor: theme.primary,
			paddingHorizontal: Size.large,
			paddingVertical: Size.medium,
			marginBottom: Size.small,
			borderRadius: Size.medium,
		},
		buttonText: {
			color: theme.background,
			fontSize: Size.large + 1,
			textAlign: "center",
		},
	});

type ButtonProps = {
	text: String;
	onPress: () => void;
};

export default function Button({text, onPress}: ButtonProps) {
	const styles = useThemedStyles(createStyles);

	return (
		<Pressable style={({pressed}) => [!pressed ? styles.button : styles.buttonPressed]} onPress={onPress}>
			<Text style={[styles.buttonText]}>{text}</Text>
		</Pressable>
	);
}
