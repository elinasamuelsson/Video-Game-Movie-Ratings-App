import {useEffect, useState} from "react";

import {View, Text, StyleSheet} from "react-native";

import {useAuth} from "../context/authContext";
import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {Review} from "../types/review";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		card: {
			backgroundColor: theme.surface,
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
	});

type ReviewCardProps = {
	review: Review;
};

export default function ReviewCard({review}: ReviewCardProps) {
	const [username, setUsername] = useState<string | null>(null);
	const styles = useThemedStyles(createStyles);
	const {token} = useAuth();

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

			const data = await response.text();

			setUsername(data);
			return data;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	useEffect(() => {
		fetchUsername();
	}, []);

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<Text style={styles.username}>{username}</Text>
				<Text style={styles.rating}>★ {review.rating}/5</Text>
			</View>
			<Text style={styles.title} numberOfLines={1}>
				{review.title}
			</Text>
			<Text style={styles.content} numberOfLines={4}>
				{review.content}
			</Text>
		</View>
	);
}
