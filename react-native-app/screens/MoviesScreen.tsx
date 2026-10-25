import {useEffect, useMemo, useState} from "react";

import {View, StyleSheet, FlatList} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {useToast} from "../context/toastContext";
import {getMovies} from "../api/movies";
import {navigationRef} from "../hooks/navigationRef";
import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {Movie} from "../types/movie";

import MovieCard from "../components/MovieCard";
import Button from "../components/Button";
import LoadingIndicator from "../components/LoadingIndicator";
import ThemedText from "../components/ThemedText";

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
	});

export default function MoviesScreen() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();
	const {dispatch: toastDispatch} = useToast();

	useEffect(() => {
		async function loadMovies() {
			try {
				const data = await getMovies();
				setMovies(data);
			} catch (error) {
				toastDispatch({
					type: "SHOW",
					payload: error instanceof Error ? error.message : "Something went wrong",
				});
			} finally {
				setIsLoading(false);
			}
		}

		loadMovies();
	}, []);

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
				ListEmptyComponent={
					isLoading ? (
						<LoadingIndicator />
					) : (
						<ThemedText muted={true} bold={false} text="No movies found..." />
					)
				}
			/>
		</View>
	);
}
