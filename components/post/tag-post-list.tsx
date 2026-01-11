"use client";

import ListPost from "@/components/post/list-post";
import { getPostsByTagSlug } from "@/lib/api";
import { PaginatedResponse, PublicPost } from "@/lib/types";
import { notFound } from "next/navigation";
import { useCallback } from "react";

type Props = {
    initialData: PaginatedResponse<PublicPost>;
    slug: string;
    title?: string;
};

export default function TagPostList({ initialData, slug, title }: Props) {
    const fetchPosts = useCallback(
        async (page: number): Promise<PaginatedResponse<PublicPost> | null> => {
            const result = await getPostsByTagSlug(slug, {
                page,
                limit: 12,
            });
            return result?.data || null;
        },
        [slug]
    );

    if (!title) {
        return notFound();
    }

    return <ListPost initialData={initialData} fetchPosts={fetchPosts} title={title} />;
}
