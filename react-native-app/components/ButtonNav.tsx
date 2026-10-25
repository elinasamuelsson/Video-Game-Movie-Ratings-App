import {Pressable, StyleSheet} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";

import Lucide from "@react-native-vector-icons/lucide";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		button: {
			backgroundColor: theme.primary,
			paddingHorizontal: Size.large,
			paddingVertical: Size.medium,
			borderRadius: Size.medium,
		},
		icon: {
			color: theme.textMuted,
			fontSize: Size.xLarge,
		},
	});

type ButtonNavProps = {
	icon: string;
	destination: string;
	onPress: () => void;
};

export default function Button({icon, destination, onPress}: ButtonNavProps) {
	const styles = useThemedStyles(createStyles);

	//red bar on Lucide attribute "name" unavoidable but works on render as valid name is send through props
	return (
		<Pressable onPress={onPress} hitSlop={10} accessibilityRole="button" accessibilityLabel={destination}>
			<Lucide name={icon} style={styles.icon} />
		</Pressable>
	);
}
