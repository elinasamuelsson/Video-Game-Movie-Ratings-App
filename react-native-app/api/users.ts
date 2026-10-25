import {request} from "./request";
import {User} from "../types/user";
import {UserDetails} from "../types/userDetails";

export function getUser(userId: string, token: string | null) {
	return request<UserDetails>(`/api/users/user?userId=${userId}`, {token});
}

export function getMe(token: string | null) {
	return request<User>("/api/users/me", {token});
}

export async function updateMe(token: string | null, data: {bio: string}) {
	await request<void>("/api/users/me", {method: "PATCH", token, body: data});
}
