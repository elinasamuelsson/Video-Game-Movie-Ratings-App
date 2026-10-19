import {createStaticNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";

import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import {navigationRef} from "./hooks/navigationRef";
import {AuthProvider, useAuth, useIsSignedIn, useIsSignedOut} from "./context/authContext";
import LoginScreen from "./screens/LoginScreen";

const RootStack = createNativeStackNavigator({
	screenOptions: {
		headerShown: false,
	},
	screens: {
		Home: {
			if: useIsSignedIn,
			screen: HomeScreen,
		},
		Login: {
			if: useIsSignedOut,
			screen: LoginScreen,
		},
	},
});

const Navigation = createStaticNavigation(RootStack);

function Root() {
	const {isLoading} = useAuth();
	const isSignedIn = useIsSignedIn();

	if (isLoading) return null;

	return (
		<>
			<Navigation ref={navigationRef} />
			{isSignedIn && <Navbar />}
		</>
	);
}

export default function App() {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<Root />
			</AuthProvider>
		</SafeAreaProvider>
	);
}
