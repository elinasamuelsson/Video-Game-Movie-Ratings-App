import {request} from "./request";
import {User} from "../types/user";

export async function login(username: string, password: string) {
	const token = await request<string>("/api/auth/session", {
		method: "POST",
		body: {username, password},
	});
	const user = await request<User>("/api/users/me", {token});

	return {token, user};
}

export async function register(username: string, password: string) {
	await request<void>("/api/auth/register", {
		method: "POST",
		body: {username, password},
	});
}

export async function logout(token: string | null) {
	await request<void>("/api/auth/logout", {method: "POST", token});
}
