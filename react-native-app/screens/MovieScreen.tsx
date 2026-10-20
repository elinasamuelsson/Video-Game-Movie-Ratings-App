import {Text, View, StyleSheet, Pressable} from "react-native";

import {ColorTheme, Size} from "../constants/theme";
import {useThemedStyles} from "../hooks/useTheme";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";
import {navigationRef} from "../hooks/navigationRef";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			flex: 1,
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		text: {
			color: theme.text,
		},
		button: {
			backgroundColor: theme.primary,
			paddingHorizontal: Size.large,
			paddingVertical: Size.medium,
			marginHorizontal: Size.small,
			borderRadius: Size.medium,
		},
		buttonText: {
			color: theme.background,
		},
	});

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

export default function MovieScreen({route}: Props) {
	const {movie} = route.params;
	const styles = useThemedStyles(createStyles);

	function navigateToMovies() {
		navigationRef.navigate("Movies");
	}

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.text}>{movie.title}</Text>
			</View>
			<View>
				<Pressable style={styles.button} onPress={navigateToMovies}>
					<Text style={styles.buttonText}>Back to Movies</Text>
				</Pressable>
			</View>
		</View>
	);
}
