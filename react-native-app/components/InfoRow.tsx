import {View, StyleSheet} from "react-native";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";

import ThemedText from "./ThemedText";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		infoRow: {
			flexDirection: "row",
			marginTop: Size.small,
			gap: Size.medium,
		},
		value: {
			flex: 1,
		},
	});

type InfoRowProps = {
	label: string;
	value: string[];
};

export default function InfoRow({label, value}: InfoRowProps) {
	const styles = useThemedStyles(createStyles);
	if (value.length === 0) return null;

	return (
		<View style={styles.infoRow}>
			<ThemedText text={label} bold={false} muted={false} />
			<View style={styles.value}>
				<ThemedText text={value.join(", ")} bold={false} muted={true} />
			</View>
		</View>
	);
}
