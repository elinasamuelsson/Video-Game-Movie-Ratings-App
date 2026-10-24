import {useState} from "react";

import {View, TextInput, Pressable, StyleSheet} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {useAuth} from "../context/authContext";
import {navigationRef} from "../hooks/navigationRef";
import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {RootStackParamList} from "../App";
import ThemedTextHeader from "../components/ThemedTextHeader";
import Button from "../components/Button";
import ThemedText from "../components/ThemedText";
import CustomTextInput from "../components/CustomTextInput";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		containerOuter: {
			backgroundColor: theme.background,
			flex: 1,
			padding: Size.medium,
			justifyContent: "space-between",
			alignItems: "center",
		},
		containerInner: {
			alignItems: "center",
			justifyContent: "center",
			gap: Size.medium,
		},
		multilineInput: {
			backgroundColor: theme.surface,
			color: theme.textMuted,
			borderColor: theme.border,
			borderWidth: 1,
			borderRadius: Size.small,
			padding: Size.small,
			minHeight: 120,
			minWidth: 350,
			textAlignVertical: "top",
		},
		stars: {
			flexDirection: "row",
			justifyContent: "center",
			gap: Size.medium,
			paddingTop: Size.large,
			paddingBottom: Size.xxLarge,
		},
	});

type Props = NativeStackScreenProps<RootStackParamList, "Review">;

export default function ReviewFormScreen({route}: Props) {
	const {movieId, review} = route.params;
	const isEdit = review !== undefined;

	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();
	const {token} = useAuth();

	const [title, setTitle] = useState(review?.title ?? "");
	const [content, setContent] = useState(review?.content ?? "");
	const [rating, setRating] = useState(review?.rating ?? 0);

	const API_URL = process.env.EXPO_PUBLIC_API_URL;

	async function submit() {
		if (!title.trim() || !content.trim() || rating < 1) {
			console.error("Title, content and rating are required.");
			return;
		}

		try {
			const response = await fetch(isEdit ? `${API_URL}/api/reviews/${review.id}` : `${API_URL}/api/reviews`, {
				method: isEdit ? "PATCH" : "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({movieId, title, content, rating}),
			});

			if (response.ok) {
				navigationRef.goBack();
			} else {
				console.error(response.status, await response.text());
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<View style={[styles.containerOuter, {paddingTop: insets.top, paddingBottom: insets.bottom + 80}]}>
			<ThemedTextHeader text={isEdit ? "Edit review" : "Write a review"} />

			<View style={styles.containerInner}>
				<CustomTextInput placeholder="Title" placeholderColor="grey" password={false} onChangeText={setTitle} />
				<TextInput
					style={[styles.multilineInput]}
					placeholder="Type your review..."
					placeholderTextColor="grey"
					value={content}
					onChangeText={setContent}
					multiline
				/>
				<View style={styles.stars}>
					{[1, 2, 3, 4, 5].map((star) => (
						<Pressable key={star} onPress={() => setRating(star)}>
							<ThemedText text="★" bold={true} muted={star > rating} />
						</Pressable>
					))}
				</View>
				<View>
					<Button text={isEdit ? "Save changes" : "Post review"} onPress={submit} />
				</View>
			</View>
			<Button text="Cancel" onPress={() => navigationRef.goBack()} />
		</View>
	);
}
