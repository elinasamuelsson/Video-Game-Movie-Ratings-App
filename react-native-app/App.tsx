import {createStaticNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from "react-native-safe-area-context";

import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import {navigationRef} from "./hooks/navigationRef";
import {AuthProvider, useAuth, userIsSignedIn, userIsSignedOut} from "./context/authContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

const RootStack = createNativeStackNavigator({
	screenOptions: {
		headerShown: false,
	},
	screens: {
		Home: {
			if: userIsSignedIn,
			screen: HomeScreen,
		},
		Login: {
			if: userIsSignedOut,
			screen: LoginScreen,
		},
		Register: {
			screen: RegisterScreen,
		},
		Profile: {
			if: userIsSignedIn,
			screen: ProfileScreen,
		},
	},
});

const Navigation = createStaticNavigation(RootStack);

function Root() {
	const {isLoading, token} = useAuth();
	const isSignedIn = userIsSignedIn();

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
