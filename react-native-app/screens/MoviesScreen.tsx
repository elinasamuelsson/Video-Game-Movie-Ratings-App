import {Text, View, StyleSheet, FlatList, Pressable} from "react-native";
import {useEffect, useMemo, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {ColorTheme, Size} from "../constants/theme";
import {useThemedStyles} from "../hooks/useTheme";
import {Movie} from "../types/movie";
import {navigationRef} from "../hooks/navigationRef";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
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
		card: {
			backgroundColor: theme.surface,
			width: 350,
			padding: Size.medium,
			marginVertical: Size.medium,
			borderRadius: Size.small,
		},
		cardText: {
			color: theme.text,
		},
	});

export default function MoviesScreen() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<string | null>();
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();

	async function fetchMovies(): Promise<Movie[]> {
		try {
			const response = await fetch("http://192.168.50.248:8080/api/movies", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();

			return data as Promise<Movie[]>;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	useEffect(() => {
		fetchMovies().then(setMovies).catch(console.error);
	}, []);

	const genres = useMemo(() => [...new Set(movies.flatMap((m) => m.genres))].sort(), [movies]);
	const filteredMovies = useMemo(
		() => (selectedGenre ? movies.filter((m) => m.genres.includes(selectedGenre)) : movies),
		[movies, selectedGenre],
	);

	function navigateToMovie(movie: Movie) {
		navigationRef.navigate("Movie", {movie});
	}

	return (
		<View style={[styles.container, {paddingTop: insets.top}, {paddingBottom: insets.bottom + 80}]}>
			<FlatList
				data={genres}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(genre) => genre}
				renderItem={({item}) => (
					<Pressable style={styles.button} onPress={() => setSelectedGenre(item)}>
						<Text style={styles.buttonText}>{item}</Text>
					</Pressable>
				)}
			/>
			<FlatList
				data={filteredMovies}
				keyExtractor={(movie) => movie.id}
				renderItem={({item}) => (
					<Pressable
						style={styles.card}
						onPress={() => {
							navigateToMovie(item);
						}}
					>
						<Text style={styles.cardText}>{item.title}</Text>
					</Pressable>
				)}
			/>
		</View>
	);
}
