import {Text, View, StyleSheet, Pressable, FlatList} from "react-native";

import {ColorTheme, Size} from "../constants/theme";
import {useThemedStyles} from "../hooks/useTheme";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../App";
import {navigationRef} from "../hooks/navigationRef";
import {Review} from "../types/review";
import {useEffect, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		containerOuter: {
			backgroundColor: theme.background,
			flex: 1,
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		containerInner: {
			flex: 1,
			alignItems: "center",
			justifyContent: "space-evenly",
			paddingBottom: Size.large,
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
	const [reviews, setReviews] = useState<Review[]>([]);
	const {movie} = route.params;
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();

	const API_URL = process.env.EXPO_PUBLIC_API_URL;

	async function fetchReviews(): Promise<Review[]> {
		try {
			const response = await fetch(`${API_URL}/api/reviews/movie?movieId=${movie.id}`, {
				method: "GET",
				headers: {"Content-Type:": "application/json"},
			});

			const data = await response.json();

			return data as Promise<Review[]>;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	useEffect(() => {
		fetchReviews().then(setReviews).catch(console.error);
	}, []);

	console.log(reviews);

	function navigateToMovies() {
		navigationRef.navigate("Movies");
	}

	return (
		<View style={[styles.containerOuter, {paddingTop: insets.top * 2}]}>
			<View style={{paddingBottom: Size.large * 2}}>
				<Text style={styles.text}>{movie.title}</Text>
			</View>
			<View style={styles.containerInner}>
				<FlatList
					data={reviews}
					keyExtractor={(review) => review.id}
					renderItem={({item}) => (
						<View style={styles.containerInner}>
							<Text style={styles.text}>{item.content}</Text>
						</View>
					)}
				/>
			</View>
			<View style={{paddingBottom: insets.bottom + 80}}>
				<Pressable style={styles.button} onPress={navigateToMovies}>
					<Text style={styles.buttonText}>Back to Movies</Text>
				</Pressable>
			</View>
		</View>
	);
}
