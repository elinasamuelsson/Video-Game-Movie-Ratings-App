import {createStaticNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {navigationRef} from "./hooks/navigationRef";
import {AuthProvider, useAuth, userIsSignedIn, userIsSignedOut} from "./context/authContext";
import {Movie} from "./types/movie";
import {Review} from "./types/review";
import {User} from "./types/user";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MoviesScreen from "./screens/MoviesScreen";
import MovieScreen from "./screens/MovieScreen";
import ReviewScreen from "./screens/ReviewScreen";
import UserEditScreen from "./screens/UserEditScreen";
import Navbar from "./components/Navbar";
import {UserDetails} from "./types/userDetails";

export type RootStackParamList = {
	Home: undefined;
	Login: undefined;
	Register: undefined;
	Profile: undefined;
	Movies: undefined;
	Movie: {movie: Movie};
	Review: {movieId: string; review?: Review};
	UserEdit: {user: User | null; userDetails: UserDetails | null};
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
		UserEdit: {
			if: userIsSignedIn,
			screen: UserEditScreen,
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
