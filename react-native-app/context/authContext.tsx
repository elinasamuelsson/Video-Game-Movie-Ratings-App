import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";

import * as SecureStore from "expo-secure-store";

type AuthState = {
	token: string | null;
	isLoading: boolean;
	signIn: (token: string) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		SecureStore.getItemAsync("sessionToken")
			.then(setToken)
			.finally(() => setIsLoading(false));
	}, []);

	const signIn = useCallback(async (newToken: string) => {
		await SecureStore.setItemAsync("token", newToken);
		setToken(newToken);
	}, []);

	const signOut = useCallback(async () => {
		await SecureStore.deleteItemAsync("token");
		setToken(null);
	}, []);

	return <AuthContext.Provider value={{token, isLoading, signIn, signOut}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider.");
	return context;
}

export const useIsSignedIn = () => useAuth().token !== null;
export const useIsSignedOut = () => useAuth().token === null;
