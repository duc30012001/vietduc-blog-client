// ==================== Common Types ====================

// Pagination meta matching server's PaginationMeta
export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

// Paginated response matching server's PaginatedResponseDto
export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

// API response wrapper matching server's TransformInterceptor
export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
}

// Wrapped paginated response (what the API actually returns)
export type ApiPaginatedResponse<T> = ApiResponse<PaginatedResponse<T>>;

export interface PaginationQuery {
    page?: number;
    limit?: number;
    keyword?: string;
}

// ==================== Category Types ====================

export interface PublicCategory {
    id: string;
    slug: string;
    name_vi: string;
    name_en: string;
    description?: string;
    order: number;
    parent_id?: string;
    children?: PublicCategory[];
    post_count: number;
}

// ==================== Tag Types ====================

export interface PublicTag {
    id: string;
    slug: string;
    name_vi: string;
    name_en: string;
    post_count: number;
}

// ==================== Post Types ====================

export interface AuthorBrief {
    id: string;
    name: string;
    avatar?: string;
}

export interface CategoryBrief {
    id: string;
    slug: string;
    name_vi: string;
    name_en: string;
}

export interface TagBrief {
    id: string;
    slug: string;
    name_vi: string;
    name_en: string;
}

export interface PublicPost {
    id: string;
    slug: string;
    title_vi: string;
    title_en: string;
    excerpt_vi: string | null;
    excerpt_en: string | null;
    content_vi: string;
    content_en: string;
    thumbnail: string | null;
    view_count: number;
    published_at: string | null;
    category: CategoryBrief | null;
    tags: TagBrief[];
    author?: AuthorBrief;
    created_at: string;
}
