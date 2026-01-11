"use client";

import ListPost from "@/components/post/list-post";
import { getPosts } from "@/lib/api";
import { PaginatedResponse, PublicPost } from "@/lib/types";
import { useTranslations } from "next-intl";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";

type Props = {
    initialData: PaginatedResponse<PublicPost>;
    keyword?: string;
};

export default function SearchPostList({ initialData, keyword: defaultKeyword }: Props) {
    const [keyword] = useQueryState("keyword", parseAsString.withDefault(defaultKeyword || ""));
    const [data, setData] = useState<PaginatedResponse<PublicPost>>(initialData);
    const t = useTranslations("search");

    // Refetch posts when keyword changes
    useEffect(() => {
        const fetchData = async () => {
            const result = await getPosts({ page: 1, limit: 12, keyword: keyword || undefined });
            if (result?.data) {
                setData(result.data);
            }
        };

        // Only refetch if keyword differs from initial
        if (keyword !== defaultKeyword) {
            fetchData();
        }
    }, [keyword, defaultKeyword]);

    const fetchPosts = useCallback(
        async (page: number): Promise<PaginatedResponse<PublicPost> | null> => {
            const result = await getPosts({
                page,
                limit: 12,
                keyword: keyword || undefined,
            });
            return result?.data || null;
        },
        [keyword]
    );

    const title = keyword ? t("resultsFor", { keyword }) : t("title");

    return <ListPost initialData={data} fetchPosts={fetchPosts} title={title} />;
}
