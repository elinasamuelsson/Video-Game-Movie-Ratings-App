import {useEffect, useMemo, useState} from "react";

import {View, StyleSheet, FlatList} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {navigationRef} from "../hooks/navigationRef";
import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {Movie} from "../types/movie";

import MovieCard from "../components/MovieCard";
import Button from "../components/Button";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.background,
			flex: 1,
			alignItems: "center",
			paddingHorizontal: Size.medium,
		},
		genreList: {
			flexGrow: 0,
		},
		genreListContent: {
			gap: Size.small,
			paddingVertical: Size.small,
		},
		button: {
			backgroundColor: theme.secondary,
			paddingHorizontal: Size.large,
			paddingVertical: Size.medium,
			borderRadius: Size.medium,
		},
		buttonSelected: {
			backgroundColor: theme.primary,
		},
		buttonText: {
			color: theme.background,
		},
		buttonTextSelected: {
			color: theme.background,
		},
	});

export default function MoviesScreen() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();

	const API_URL = process.env.EXPO_PUBLIC_API_URL;

	useEffect(() => {
		async function fetchMovies(): Promise<Movie[]> {
			try {
				const response = await fetch(`${API_URL}/api/movies`, {
					method: "GET",
					headers: {"Content-Type": "application/json"},
				});

				const data = await response.json();

				return data as Movie[];
			} catch (error) {
				console.error(error);
				return [];
			}
		}

		fetchMovies().then(setMovies).catch(console.error);
	}, [API_URL]);

	const genres = useMemo(() => [...new Set(movies.flatMap((m) => m.genres))].sort(), [movies]);
	const filteredMovies = useMemo(
		() => (selectedGenre ? movies.filter((m) => m.genres.includes(selectedGenre)) : movies),
		[movies, selectedGenre],
	);

	function navigateToMovie(movie: Movie) {
		navigationRef.navigate("Movie", {movie});
	}

	function toggleGenre(genre: string) {
		setSelectedGenre((current) => (current === genre ? null : genre));
	}

	return (
		<View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom + 80}]}>
			<FlatList
				style={styles.genreList}
				contentContainerStyle={styles.genreListContent}
				data={genres}
				extraData={selectedGenre}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(genre) => genre}
				renderItem={({item}) => {
					return <Button text={item} onPress={() => toggleGenre(item)} />;
				}}
			/>
			<FlatList
				data={filteredMovies}
				keyExtractor={(movie) => movie.id}
				renderItem={({item}) => <MovieCard movie={item} onPress={() => navigateToMovie(item)} />}
			/>
		</View>
	);
}
