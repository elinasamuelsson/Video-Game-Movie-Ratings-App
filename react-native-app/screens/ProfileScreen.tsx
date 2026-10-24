import {useCallback, useState} from "react";

import {useFocusEffect} from "@react-navigation/native";
import {View, Text, StyleSheet, FlatList, Pressable} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {useAuth} from "../context/authContext";
import {useThemedStyles} from "../hooks/useTheme";
import {navigationRef} from "../hooks/navigationRef";
import {ColorTheme, Size} from "../constants/theme";
import {UserDetails} from "../types/userDetails";
import {Review} from "../types/review";

import Button from "../components/Button";
import ReviewCard from "../components/ReviewCard";
import ThemedText from "../components/ThemedText";
import ThemedTextHeader from "../components/ThemedTextHeader";
import Lucide from "@react-native-vector-icons/lucide";
import {User} from "../types/user";
import formatDate from "../utils/formatDate";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		containerOuter: {
			backgroundColor: theme.background,
			flex: 1,
		},
		list: {
			paddingHorizontal: Size.medium,
		},
		profileTop: {
			flexDirection: "row",
			alignItems: "center",
			marginVertical: Size.medium,
		},
		avatar: {
			width: 96,
			height: 96,
			borderRadius: 48,
			backgroundColor: theme.surface,
			alignItems: "center",
			justifyContent: "center",
		},
		imgPlaceholder: {
			color: theme.textMuted,
			fontSize: 24,
		},
		profileInfo: {
			flex: 1,
			marginLeft: Size.medium,
		},
		bio: {
			marginBottom: Size.medium,
			justifyContent: "center",
		},
		bioHeader: {
			flexDirection: "row",
			gap: Size.medium,
		},
		bioEdit: {
			color: theme.text,
			fontSize: Size.large,
			paddingTop: Size.small,
		},
		reviewsHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		emptyText: {
			color: theme.textMuted,
			textAlign: "center",
			marginTop: Size.medium,
		},
		footer: {
			paddingHorizontal: Size.medium,
			paddingTop: Size.small,
			alignItems: "center",
		},
	});

export default function ProfileScreen() {
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();
	const {token, user, signOut} = useAuth();

	const API_URL = process.env.EXPO_PUBLIC_API_URL;

	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const [reviews, setReviews] = useState<Review[] | null>([]);

	async function fetchUser() {
		try {
			const response = await fetch(`${API_URL}/api/users/user?userId=${user?.id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			return data as UserDetails;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async function fetchUserReviews() {
		try {
			const response = await fetch(`${API_URL}/api/reviews/user?userId=${user?.id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.json();

			return data as Review[];
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	useFocusEffect(
		useCallback(() => {
			Promise.all([fetchUser(), fetchUserReviews()])
				.then(([userData, reviewData]) => {
					setUserDetails(userData);
					setReviews(reviewData);
				})
				.catch(console.error);
		}, [user?.id, token]),
	);

	async function logout() {
		const authorization = "Bearer " + token;

		const API_URL = process.env.EXPO_PUBLIC_API_URL;
		try {
			const response = await fetch(`${API_URL}/api/auth/logout`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${authorization}`,
				},
			});

			if (response.ok) {
				await signOut();
			} else {
				console.error(response);
			}
		} catch (error) {
			console.error(error);
		}
	}

	function navigateToUserEdit() {
		navigationRef.navigate("UserEdit", {user, userDetails});
	}

	const header = (
		<View>
			<View style={styles.profileTop}>
				<View style={styles.avatar}>
					<Text style={styles.imgPlaceholder}>PH</Text>
				</View>
				<View style={styles.profileInfo}>
					<ThemedTextHeader text={`${userDetails?.username}`} />
					<ThemedText
						text={userDetails?.createdAt ? `Member since: ${formatDate(userDetails.createdAt)}` : ""}
						bold={false}
						muted={true}
					/>
				</View>
			</View>

			<View style={styles.bio}>
				<View style={styles.bioHeader}>
					<ThemedText text="Bio" bold={true} muted={false} />
					<Pressable onPress={() => navigateToUserEdit()}>
						<Lucide name="pen-line" style={styles.bioEdit} />
					</Pressable>
				</View>
				<ThemedText
					text={!userDetails?.bio ? "This user hasn't written a bio yet..." : `${userDetails.bio}`}
					bold={false}
					muted={true}
				/>
			</View>

			<View style={styles.reviewsHeader}>
				<ThemedText text="Your reviews" bold={true} muted={false} />
				{reviews != null && reviews.length > 0 && (
					<ThemedText text={`(${reviews.length})`} bold={false} muted={true} />
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
				ListEmptyComponent={<Text style={styles.emptyText}>You haven't posted any reviews yet.</Text>}
			/>
			<View style={[styles.footer, {paddingBottom: insets.bottom + 80}]}>
				<Button text="Logout" onPress={logout} />
			</View>
		</View>
	);
}
