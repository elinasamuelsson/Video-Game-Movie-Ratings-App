type RequestOptions = {
	method?: string;
	token?: string | null;
	body?: unknown;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;

function parseJson(text: string): any {
	try {
		return JSON.parse(text);
	} catch (error) {
		return text;
	}
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const headers: Record<string, string> = {"Content-Type": "application/json"};
	if (options.token) {
		headers.Authorization = `Bearer ${options.token}`;
	}

	let response: Response;
	try {
		response = await fetch(`${API_URL}${path}`, {
			method: options.method ?? "GET",
			headers,
			body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
		});
	} catch (error) {
		throw new Error("Can't reach the server. Check your connection.");
	}

	const text = await response.text();
	console.log("API Response: ", response.status, JSON.stringify(text));
	const data = text ? parseJson(text) : null;

	if (!response.ok) {
		const fallback = "Something went wrong.";
		throw new Error(data?.message ?? fallback);
	}

	return data as T;
}
