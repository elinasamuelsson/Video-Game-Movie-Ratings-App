import {useCallback, useState} from "react";

import {View, Text, StyleSheet, Pressable} from "react-native";

import {useAuth} from "../context/authContext";
import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {Review} from "../types/review";
import {useFocusEffect} from "@react-navigation/native";
import Lucide from "@react-native-vector-icons/lucide";
import {navigationRef} from "../hooks/navigationRef";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		card: {
			backgroundColor: theme.surface,
			maxWidth: 450,
			padding: Size.medium,
			marginVertical: Size.small,
			borderRadius: Size.small,
		},
		header: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		username: {
			color: theme.textMuted,
			fontSize: 14,
		},
		rating: {
			color: theme.text,
			fontSize: 14,
			fontWeight: "600",
		},
		title: {
			color: theme.text,
			fontSize: 16,
			fontWeight: "600",
			marginTop: Size.small,
		},
		content: {
			color: theme.text,
			fontSize: 14,
			marginTop: 4,
		},
		containerInner: {
			flexDirection: "row",
			justifyContent: "space-between",
		},
		textWrapper: {
			maxWidth: 350,
		},
		actionsWrapper: {
			justifyContent: "flex-end",
			gap: Size.medium,
		},
		actionIcon: {
			color: theme.text,
			fontSize: Size.large,
		},
	});

type ReviewCardProps = {
	review: Review;
	onDeleted?: (reviewId: string) => void;
};

export default function ReviewCard({review, onDeleted}: ReviewCardProps) {
	const [username, setUsername] = useState<string | null>(null);
	const [movieTitle, setMovieTitle] = useState<string | null>(null);
	const styles = useThemedStyles(createStyles);
	const {token, user} = useAuth();
	const isOwner = user?.id === review.userId;

	const API_URL = process.env.EXPO_PUBLIC_API_URL;

	async function fetchUsername() {
		try {
			const response = await fetch(`${API_URL}/api/users/user?userId=${review.userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			return data.username;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async function fetchMovieName() {
		try {
			const response = await fetch(`${API_URL}/api/movies/movie?movieId=${review.movieId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			return data.title;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	useFocusEffect(
		useCallback(() => {
			Promise.all([fetchUsername(), fetchMovieName()])
				.then(([username, title]) => {
					setUsername(username);
					setMovieTitle(title);
				})
				.catch(console.error);
		}, [token, review.userId, review.movieId]),
	);

	async function deleteReview() {
		try {
			const response = await fetch(`${API_URL}/api/reviews/${review.id}`, {
				method: "DELETE",
				headers: {Authorization: `Bearer ${token}`},
			});

			if (response.ok) {
				onDeleted?.(review.id);
			} else {
				console.error(response.status, await response.text());
			}
		} catch (error) {
			console.error(error);
		}
	}

	function navigateToReview() {
		navigationRef.navigate("Review", {movieId: `${review.movieId}`, review: review});
	}

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.username}>
					{username} · {movieTitle}
				</Text>
				<Text style={styles.rating}>★ {review.rating}/5</Text>
			</View>
			<View style={styles.containerInner}>
				<View style={styles.textWrapper}>
					<Text style={styles.title} numberOfLines={1}>
						{review.title}
					</Text>
					<Text style={styles.content} numberOfLines={4}>
						{review.content}
					</Text>
				</View>

				{isOwner && (
					<View style={styles.actionsWrapper}>
						<Pressable onPress={navigateToReview}>
							<Lucide name="pen-line" style={styles.actionIcon} />
						</Pressable>
						<Pressable onPress={deleteReview}>
							<Lucide name="trash-2" style={styles.actionIcon} />
						</Pressable>
					</View>
				)}
			</View>
		</View>
	);
}
