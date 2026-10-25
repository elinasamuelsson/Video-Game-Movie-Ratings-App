import {useEffect, useRef} from "react";

import {Animated, Pressable, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import {useThemedStyles} from "../hooks/useTheme";
import {ColorTheme, Size} from "../constants/theme";

const createStyles = (theme: ColorTheme) =>
	StyleSheet.create({
		toast: {
			position: "absolute",
			alignSelf: "center",
			flexDirection: "row",
			alignItems: "center",
			gap: Size.medium,
			maxWidth: 400,
			backgroundColor: theme.surface,
			borderColor: theme.border,
			borderWidth: 1,
			borderRadius: Size.small,
			paddingHorizontal: Size.medium,
			paddingVertical: Size.small,
		},
		text: {
			flexShrink: 1,
			color: theme.text,
			fontSize: 14,
		},
		button: {
			backgroundColor: theme.primary,
			borderRadius: Size.small,
			paddingHorizontal: Size.medium,
			paddingVertical: Size.small,
		},
		buttonText: {
			color: theme.background,
			fontSize: 14,
			fontWeight: "600",
		},
	});

type ToastProps = {
	message: string;
	onHide: () => void;
};

export default function Toast({message, onHide}: ToastProps) {
	const styles = useThemedStyles(createStyles);
	const insets = useSafeAreaInsets();
	const opacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(opacity, {toValue: 1, duration: 200, useNativeDriver: true}).start();
	}, []);

	function dismiss() {
		Animated.timing(opacity, {toValue: 0, duration: 150, useNativeDriver: true}).start(onHide);
	}

	return (
		<Animated.View
			style={[styles.toast, {bottom: insets.bottom + 100, opacity}]}
			accessibilityRole="alert"
			accessibilityLiveRegion="polite"
		>
			<Animated.Text style={styles.text}>{message}</Animated.Text>
			<Pressable style={styles.button} onPress={dismiss} hitSlop={8}>
				<Animated.Text style={styles.buttonText}>OK</Animated.Text>
			</Pressable>
		</Animated.View>
	);
}
