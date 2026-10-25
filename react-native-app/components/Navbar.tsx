import {View, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {navigationRef} from "../hooks/navigationRef";
import {useThemedStyles} from "../hooks/useTheme";
import {Size, ColorTheme} from "../constants/theme";
import {userIsSignedIn} from "../context/authContext";

import ButtonNav from "./ButtonNav";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		bar: {
			backgroundColor: theme.surface,
			position: "absolute",
			left: Size.large,
			right: Size.large,
			height: Size.xxLarge,
			borderRadius: Size.large,
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
			elevation: Size.medium,
		},
		icon: {
			color: theme.textMuted,
			fontSize: Size.xLarge,
		},
	});

export default function Navbar() {
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();

	const isSignedIn = userIsSignedIn();

	return (
		<View style={[styles.bar, {bottom: insets.bottom + 8}]}>
			<ButtonNav
				icon="house"
				destination="Home"
				onPress={() => navigationRef.isReady() && navigationRef.navigate("Home")}
			/>
			<ButtonNav
				icon="film"
				destination="Movies"
				onPress={() => navigationRef.isReady() && navigationRef.navigate("Movies")}
			/>

			{isSignedIn && (
				<ButtonNav
					icon="person-standing"
					destination="Profile"
					onPress={() => navigationRef.isReady() && navigationRef.navigate("Profile")}
				/>
			)}
		</View>
	);
}
