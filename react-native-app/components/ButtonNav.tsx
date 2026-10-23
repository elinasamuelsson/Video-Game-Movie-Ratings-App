import {Pressable, StyleSheet} from "react-native";
import {ColorTheme, Size} from "../constants/theme";
import {useThemedStyles} from "../hooks/useTheme";
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
	icon: String;
	onPress: () => void;
};

export default function Button({icon, onPress}: ButtonNavProps) {
	const styles = useThemedStyles(createStyles);

	//red bar on Lucide attribute "name" unavoidable but works on render as valid name is send through props
	return (
		<Pressable onPress={onPress}>
			<Lucide name={icon} style={styles.icon} />
		</Pressable>
	);
}
