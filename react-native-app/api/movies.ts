import {request} from "./request";
import {Movie} from "../types/movie";

export function getMovies() {
	return request<Movie[]>("/api/movies");
}

export function getMovie(movieId: string, token: string | null) {
	return request<Movie>(`/api/movies/movie?movieId=${movieId}`, {token});
}
