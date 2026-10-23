import {useEffect, useState} from "react";

import {FlatList, StyleSheet, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";

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

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		containerOuter: {
			backgroundColor: theme.background,
			flex: 1,
		},
		list: {
			flex: 1,
			paddingHorizontal: Size.medium,
		},
		containerTopRow: {
			flexDirection: "row",
			alignItems: "flex-start",
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
		meta: {
			color: theme.textMuted,
			fontSize: 14,
			marginTop: 4,
		},
		genres: {
			color: theme.textMuted,
			fontSize: 14,
			marginTop: Size.small,
		},
		sectionTitle: {
			color: theme.text,
			fontSize: 18,
			fontWeight: "600",
			marginTop: Size.large,
			marginBottom: Size.small,
		},
		text: {
			color: theme.text,
			fontSize: 14,
		},
		infoRow: {
			flexDirection: "row",
			marginTop: Size.small,
		},
		infoLabel: {
			color: theme.textMuted,
			fontSize: 14,
			width: 90,
		},
		infoValue: {
			color: theme.text,
			fontSize: 14,
			flex: 1,
		},
		reviewsHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "baseline",
			marginTop: Size.large,
			marginBottom: Size.small,
		},
		reviewsTitle: {
			color: theme.text,
			fontSize: 18,
			fontWeight: "600",
		},
		averageRating: {
			color: theme.text,
			fontSize: 14,
			fontWeight: "600",
		},
		emptyText: {
			color: theme.textMuted,
			fontSize: 14,
		},
		footer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			gap: Size.medium,
			paddingTop: Size.medium,
		},
		button: {
			backgroundColor: theme.primary,
			paddingHorizontal: Size.large,
			paddingVertical: Size.medium,
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
				headers: {"Content-Type": "application/json"},
			});

			const data = await response.json();

			return data as Review[];
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	async function postReview() {}

	useEffect(() => {
		fetchReviews().then(setReviews).catch(console.error);
	}, [movie.id]);

	function navigateToMovies() {
		navigationRef.navigate("Movies");
	}

	function formatRuntime(totalSeconds: number): string {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		if (hours === 0) return `${minutes}m`;
		return `${hours}h ${minutes}m`;
	}

	function formatReleaseDate(isoDate: string): string {
		return new Date(isoDate).toLocaleDateString("en-US", {
			month: "long",
			year: "numeric",
			timeZone: "UTC",
		});
	}

	function getAverageRating(reviews: Review[]): number | null {
		if (reviews.length === 0) return null;
		const sum = reviews.reduce((total, review) => total + review.rating, 0);
		return sum / reviews.length;
	}

	const averageRating = getAverageRating(reviews);

	const header = (
		<View>
			<ThemedTextHeader text={movie.title} />
			<View style={styles.containerTopRow}>
				<View style={styles.poster}>
					<Text style={styles.imgPlaceholder}>PH</Text>
				</View>
				<View style={styles.topInfo}>
					<ThemedText
						text={`${formatReleaseDate(movie.releaseDate)} · ${formatRuntime(movie.runtimeSeconds)}`}
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
				renderItem={({item}) => <ReviewCard review={item} />}
				ListHeaderComponent={header}
				ListEmptyComponent={<Text style={styles.emptyText}>No reviews yet.</Text>}
			/>
			<View style={[styles.footer, {paddingBottom: insets.bottom + 80}]}>
				<Button text="Post review" onPress={postReview} />
				<Button text="Back to movies" onPress={navigateToMovies} />
			</View>
		</View>
	);
}
