const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1";

interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | undefined>;
}

class ApiError extends Error {
    status: number;
    data: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

/**
 * Build URL with query parameters
 */
function buildUrl(endpoint: string, params?: Record<string, string | number | undefined>): string {
    const url = new URL(`${API_BASE_URL}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                url.searchParams.append(key, String(value));
            }
        });
    }

    return url.toString();
}

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options;

    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
        ...fetchOptions,
        headers: {
            "Content-Type": "application/json",
            ...fetchOptions.headers,
        },
    });

    if (!response.ok) {
        let errorData: unknown;
        try {
            errorData = await response.json();
        } catch {
            errorData = await response.text();
        }
        throw new ApiError(
            `API Error: ${response.status} ${response.statusText}`,
            response.status,
            errorData
        );
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) {
        return {} as T;
    }

    return JSON.parse(text) as T;
}

export { ApiError, buildUrl, fetchApi };
