import type {
    ApiResponse,
    PaginatedResponse,
    PaginationQuery,
    PublicCategory,
    PublicPost,
    PublicTag,
} from "@/lib/types";
import { fetchApi } from "./client";

// ==================== Categories API ====================

/**
 * Get all categories as tree structure
 */
export async function getCategories(): Promise<ApiResponse<PublicCategory[]> | null> {
    return fetchApi<ApiResponse<PublicCategory[]>>("/v1/public/categories", {});
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<ApiResponse<PublicCategory> | null> {
    return fetchApi<ApiResponse<PublicCategory>>(`/v1/public/categories/${slug}`);
}

/**
 * Get posts by category slug
 */
export async function getPostsByCategorySlug(
    slug: string,
    query?: PaginationQuery
): Promise<ApiResponse<PaginatedResponse<PublicPost>> | null> {
    return fetchApi<ApiResponse<PaginatedResponse<PublicPost>>>(
        `/v1/public/categories/${slug}/posts`,
        {
            params: query as Record<string, string | number | undefined>,
        }
    );
}

// ==================== Posts API ====================

export interface PostsQuery extends PaginationQuery {
    category_id?: string;
    category_slug?: string;
    tag_id?: string;
    tag_slug?: string;
}

/**
 * Get all published posts with pagination and filtering
 */
export async function getPosts(
    query?: PostsQuery
): Promise<ApiResponse<PaginatedResponse<PublicPost>> | null> {
    return fetchApi<ApiResponse<PaginatedResponse<PublicPost>>>("/v1/public/posts", {
        params: query as Record<string, string | number | undefined>,
    });
}

/**
 * Get a single post by slug (throws error for error page)
 */
export async function getPostBySlug(slug: string): Promise<ApiResponse<PublicPost> | null> {
    return fetchApi<ApiResponse<PublicPost>>(`/v1/public/posts/${slug}`);
}

/**
 * Get related posts
 */
export async function getRelatedPosts(slug: string): Promise<ApiResponse<PublicPost[]> | null> {
    return fetchApi<ApiResponse<PublicPost[]>>(`/v1/public/posts/${slug}/related`, {});
}

// ==================== Tags API ====================

/**
 * Get all tags with post counts
 */
export async function getTags(): Promise<ApiResponse<PublicTag[]> | null> {
    return fetchApi<ApiResponse<PublicTag[]>>("/v1/public/tags", {});
}

/**
 * Get a single tag by slug
 */
export async function getTagBySlug(slug: string): Promise<ApiResponse<PublicTag> | null> {
    return fetchApi<ApiResponse<PublicTag>>(`/v1/public/tags/${slug}`);
}

/**
 * Get posts by tag slug
 */
export async function getPostsByTagSlug(
    slug: string,
    query?: PaginationQuery
): Promise<ApiResponse<PaginatedResponse<PublicPost>> | null> {
    return fetchApi<ApiResponse<PaginatedResponse<PublicPost>>>(`/v1/public/tags/${slug}/posts`, {
        params: query as Record<string, string | number | undefined>,
    });
}
