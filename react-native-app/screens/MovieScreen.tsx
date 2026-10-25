import {useCallback, useState} from "react";

import {FlatList, StyleSheet, Text, View} from "react-native";
import {useFocusEffect} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";

import {useToast} from "../context/toastContext";
import {getReviewsByMovie} from "../api/reviews";
import {navigationRef} from "../hooks/navigationRef";
import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {RootStackParamList} from "../App";
import {Review} from "../types/review";

import Button from "../components/Button";
import ReviewCard from "../components/ReviewCard";
import ThemedText from "../components/ThemedText";
import ThemedTextHeader from "../components/ThemedTextHeader";
import InfoRow from "../components/InfoRow";
import LoadingIndicator from "../components/LoadingIndicator";

import formatDate from "../utils/formatDate";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		containerOuter: {
			backgroundColor: theme.background,
			flex: 1,
		},
		containerTopRow: {
			flexDirection: "row",
			alignItems: "flex-start",
		},
		list: {
			flex: 1,
			width: "100%",
			maxWidth: 450,
			alignSelf: "center",
			paddingHorizontal: Size.medium,
		},
		poster: {
			width: 120,
			aspectRatio: 2 / 3,
			borderRadius: Size.small,
			backgroundColor: theme.surface,
			alignItems: "center",
			justifyContent: "center",
		},
		imgPlaceholder: {
			color: theme.textMuted,
		},
		topInfo: {
			flex: 1,
			marginLeft: Size.medium,
		},
		title: {
			color: theme.text,
			fontSize: 22,
			fontWeight: "700",
		},
		infoRow: {
			flexDirection: "row",
			marginTop: Size.small,
		},
		reviewsHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "baseline",
			marginTop: Size.large,
			marginBottom: Size.small,
		},
		footer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			gap: Size.medium,
			paddingTop: Size.medium,
		},
	});

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

export default function MovieScreen({route}: Props) {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const {movie} = route.params;
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();
	const {dispatch: toastDispatch} = useToast();

	useFocusEffect(
		useCallback(() => {
			async function loadReviews() {
				try {
					const data = await getReviewsByMovie(movie.id);
					setReviews(data);
				} catch (error) {
					toastDispatch({
						type: "SHOW",
						payload: error instanceof Error ? error.message : "Something went wrong",
					});
				} finally {
					setIsLoading(false);
				}
			}

			loadReviews();
		}, [movie.id]),
	);
	function navigateToMovies() {
		navigationRef.navigate("Movies");
	}

	function navigateToReview() {
		navigationRef.navigate("Review", {movieId: `${movie.id}`, review: undefined});
	}

	function formatRuntime(totalSeconds: number): string {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		if (hours === 0) return `${minutes}m`;
		return `${hours}h ${minutes}m`;
	}

	function getAverageRating(reviews: Review[]): number | null {
		if (reviews.length === 0) return null;
		const sum = reviews.reduce((total, review) => total + review.rating, 0);
		return sum / reviews.length;
	}

	const averageRating = getAverageRating(reviews);

	const header = (
		<View style={styles.containerOuter}>
			<ThemedTextHeader text={movie.title} />
			<View style={styles.containerTopRow}>
				<View style={styles.poster}>
					<Text style={styles.imgPlaceholder}>PH</Text>
				</View>
				<View style={styles.topInfo}>
					<ThemedText
						text={`${formatDate(movie.releaseDate)} · ${formatRuntime(movie.runtimeSeconds)}`}
						bold={false}
						muted={true}
					/>
					<ThemedText text={`${movie.genres.join(", ")}`} bold={false} muted={true} />
				</View>
			</View>

			<ThemedText text="Plot" bold={true} muted={false} />
			<ThemedText text={movie.plot} bold={false} muted={true} />

			<ThemedText text="Cast & crew" bold={true} muted={false} />
			<InfoRow label="Directed by" value={movie.directors} />
			<InfoRow label="Written by" value={movie.writers} />
			<InfoRow label="Starring" value={movie.actors} />

			<View style={styles.reviewsHeader}>
				<ThemedText text="Reviews" bold={true} muted={false} />
				{averageRating !== null && (
					<ThemedText
						text={`★ ${averageRating.toFixed(1)}/5 (${reviews.length})`}
						bold={false}
						muted={false}
					/>
				)}
			</View>
		</View>
	);

	return (
		<View style={[styles.containerOuter, {paddingTop: insets.top}]}>
			<FlatList
				style={styles.list}
				data={reviews}
				keyExtractor={(review) => review.id}
				renderItem={({item}) => (
					<ReviewCard
						review={item}
						onDeleted={(id) => setReviews((prev) => prev.filter((r) => r.id !== id))}
					/>
				)}
				ListHeaderComponent={header}
				ListEmptyComponent={
					isLoading ? <LoadingIndicator /> : <ThemedText text="No reviews yet..." muted={true} bold={false} />
				}
			/>
			<View style={[styles.footer, {paddingBottom: insets.bottom + 80}]}>
				<Button text="Post review" onPress={navigateToReview} />
				<Button text="Back to movies" onPress={navigateToMovies} />
			</View>
		</View>
	);
}
