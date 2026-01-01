import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | undefined>;
    /**
     * If true, show toast on error instead of throwing (for list endpoints)
     * If false, throw error (for detail endpoints - will show error page)
     */
    showToastOnError?: boolean;
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
 * @param showToastOnError - If true, shows toast and returns null on error (for lists)
 *                           If false, throws error (for detail pages)
 */
async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T | null> {
    const { params, showToastOnError = true, ...fetchOptions } = options;

    const url = buildUrl(endpoint, params);

    try {
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
                errorData = await response.clone().json();
            } catch {
                errorData = await response.text();
            }

            const error = new ApiError(
                `API Error: ${response.status} ${response.statusText}`,
                response.status,
                errorData
            );

            if (showToastOnError) {
                // Show toast and return null for list endpoints
                const message =
                    response.status === 404 ? "Data not found" : `Error: ${response.statusText}`;
                // toast.error(message);
                return null;
            }

            // Throw error for detail endpoints (will be caught by error boundary)
            throw error;
        }

        // Handle empty responses
        const text = await response.text();
        if (!text) {
            return {} as T;
        }

        return JSON.parse(text) as T;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        // Network or other errors
        if (showToastOnError) {
            toast.error("Network error. Please try again.");
            return null;
        }

        throw error;
    }
}

export { ApiError, buildUrl, fetchApi };
