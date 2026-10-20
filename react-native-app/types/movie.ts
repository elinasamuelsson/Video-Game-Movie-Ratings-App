export interface Movie {
	id: string;
	title: string;
	plot: string;
	posterImage: string;
	type: string;
	genres: string[];
	directors: string[];
	writers: string[];
	actors: string[];
	runtimeSeconds: number;
	releaseDate: string;
}
