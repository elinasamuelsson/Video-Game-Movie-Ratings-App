import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";

import * as SecureStore from "expo-secure-store";

type User = {
	id: string;
	username: string;
};

type AuthState = {
	token: string | null;
	user: User | null;
	isLoading: boolean;
	signIn: (token: string, user: User) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const [storedToken, storedUser] = await Promise.all([
					SecureStore.getItemAsync("sessionToken"),
					SecureStore.getItemAsync("user"),
				]);

				if (storedToken && storedUser) {
					setToken(storedToken);
					setUser(JSON.parse(storedUser) as User);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const signIn = useCallback(async (newToken: string, user: User) => {
		await Promise.all([
			SecureStore.setItemAsync("sessionToken", newToken),
			SecureStore.setItemAsync("user", JSON.stringify(user)),
		]);
		setToken(newToken);
		setUser(user);
	}, []);

	const signOut = useCallback(async () => {
		await Promise.all([SecureStore.deleteItemAsync("sessionToken"), SecureStore.deleteItemAsync("user")]);
		setToken(null);
		setUser(null);
	}, []);

	return <AuthContext.Provider value={{token, user, isLoading, signIn, signOut}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider.");
	return context;
}

export const userIsSignedIn = () => useAuth().token !== null;
export const userIsSignedOut = () => useAuth().token === null;
