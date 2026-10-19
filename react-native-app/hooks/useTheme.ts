import {useMemo} from "react";
import {StyleSheet, useColorScheme} from "react-native";
import {Colors, Theme} from "../constants/theme";

export function useTheme() {
	const scheme = useColorScheme();
	const isDark = scheme === "dark";
	return {
		colors: isDark ? Colors.dark : Colors.light,
		isDark,
	};
}

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(factory: (colors: Theme) => T): T {
	const {colors} = useTheme();
	return useMemo(() => factory(colors), [colors, factory]);
}
