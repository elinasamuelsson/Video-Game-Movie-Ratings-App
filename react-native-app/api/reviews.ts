import {request} from "./request";
import {Review} from "../types/review";

type ReviewData = {
	movieId: string;
	title: string;
	content: string;
	rating: number;
};

export async function createReview(token: string | null, data: ReviewData) {
	await request<void>("/api/reviews", {method: "POST", token, body: data});
}

export async function updateReview(token: string | null, reviewId: string, data: ReviewData) {
	await request<void>(`/api/reviews/${reviewId}`, {method: "PATCH", token, body: data});
}

export function getReviewsByMovie(movieId: string) {
	return request<Review[]>(`/api/reviews/movie?movieId=${movieId}`);
}

export function getReviewsByUser(userId: string, token: string | null) {
	return request<Review[]>(`/api/reviews/user?userId=${userId}`, {token});
}

export async function deleteReview(token: string | null, reviewId: string) {
	await request<void>(`/api/reviews/${reviewId}`, {method: "DELETE", token});
}
