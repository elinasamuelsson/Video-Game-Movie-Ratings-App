import {useState} from "react";

import {View, TextInput, StyleSheet} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {useAuth} from "../context/authContext";
import {navigationRef} from "../hooks/navigationRef";
import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";
import {RootStackParamList} from "../App";
import ThemedTextHeader from "../components/ThemedTextHeader";
import Button from "../components/Button";
import {updateMe} from "../api/users";
import {useToast} from "../context/toastContext";

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
	});

type Props = NativeStackScreenProps<RootStackParamList, "UserEdit">;

export default function EditProfileScreen({route}: Props) {
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();
	const {token} = useAuth();
	const {userDetails} = route.params;

	const [bio, setBio] = useState(userDetails?.bio ?? "");

	const {dispatch: toastDispatch} = useToast();

	async function submit() {
		try {
			await updateMe(token, {bio});
			navigationRef.goBack();
		} catch (error) {
			toastDispatch({
				type: "SHOW",
				payload: error instanceof Error ? error.message : "Something went wrong",
			});
		}
	}

	return (
		<View style={[styles.containerOuter, {paddingTop: insets.top, paddingBottom: insets.bottom + 80}]}>
			<ThemedTextHeader text="Edit profile" />

			<View style={styles.containerInner}>
				<TextInput
					style={styles.multilineInput}
					placeholder="Write something about yourself..."
					placeholderTextColor="grey"
					value={bio}
					onChangeText={setBio}
					maxLength={500}
					multiline
				/>
				<View>
					<Button text="Save changes" onPress={submit} />
				</View>
			</View>
			<Button text="Cancel" onPress={() => navigationRef.goBack()} />
		</View>
	);
}
