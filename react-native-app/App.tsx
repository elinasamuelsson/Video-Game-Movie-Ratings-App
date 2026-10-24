import {createStaticNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {navigationRef} from "./hooks/navigationRef";
import {AuthProvider, useAuth, userIsSignedIn, userIsSignedOut} from "./context/authContext";
import {Movie} from "./types/movie";
import {Review} from "./types/review";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MoviesScreen from "./screens/MoviesScreen";
import MovieScreen from "./screens/MovieScreen";
import ReviewScreen from "./screens/ReviewScreen";
import Navbar from "./components/Navbar";

export type RootStackParamList = {
	Home: undefined;
	Login: undefined;
	Register: undefined;
	Profile: undefined;
	Movies: undefined;
	Movie: {movie: Movie};
	Review: {movieId: string; review?: Review};
};

const RootStack = createNativeStackNavigator<RootStackParamList>({
	screenOptions: {
		headerShown: false,
	},
	screens: {
		Home: {
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
		Movies: {
			screen: MoviesScreen,
		},
		Movie: {
			screen: MovieScreen,
		},
		Review: {
			if: userIsSignedIn,
			screen: ReviewScreen,
		},
	},
});

const Navigation = createStaticNavigation(RootStack);

function Root() {
	const {isLoading} = useAuth();

	if (isLoading) return null;

	return (
		<>
			<Navigation ref={navigationRef} />
			<Navbar />
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
