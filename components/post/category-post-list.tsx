"use client";

import ListPost from "@/components/post/list-post";
import { getPostsByCategorySlug } from "@/lib/api";
import { PaginatedResponse, PublicPost } from "@/lib/types";
import { notFound } from "next/navigation";
import { useCallback } from "react";

type Props = {
    initialData: PaginatedResponse<PublicPost>;
    slug: string;
    title?: string;
};

export default function CategoryPostList({ initialData, slug, title }: Props) {
    const fetchPosts = useCallback(
        async (page: number): Promise<PaginatedResponse<PublicPost> | null> => {
            const result = await getPostsByCategorySlug(slug, {
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
