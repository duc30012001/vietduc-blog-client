"use client";

import { PaginatedResponse, PublicPost } from "@/lib/types";
import { Pagination } from "flowbite-react";
import { useTranslations } from "next-intl";
import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback, useMemo, useState } from "react";
import GridPost from "./grid-post";

type Props = {
    initialData: PaginatedResponse<PublicPost>;
    fetchPosts: (page: number) => Promise<PaginatedResponse<PublicPost> | null>;
    title?: string;
};

function ListPost({ initialData, fetchPosts, title }: Props) {
    console.log(initialData);
    const messages = useTranslations();
    const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

    // Create a stable key from initialData to detect when it changes
    const initialDataKey = useMemo(() => JSON.stringify(initialData.meta), [initialData]);

    // Use initialDataKey as part of state initialization to reset when initialData changes
    const [stateKey, setStateKey] = useState(initialDataKey);
    const [data, setData] = useState<PaginatedResponse<PublicPost>>(initialData);

    // When initialDataKey changes, reset state synchronously using the "store previous in state" pattern
    if (stateKey !== initialDataKey) {
        setStateKey(initialDataKey);
        setData(initialData);
        setPage(1);
    }

    const handlePageChange = useCallback(
        async (targetPage: number) => {
            setPage(targetPage);

            if (targetPage === 1) {
                setData(initialData);
                return;
            }

            const result = await fetchPosts(targetPage);
            if (result) {
                setData(result);
            }
        },
        [fetchPosts, initialData, setPage]
    );

    return (
        <div>
            <GridPost data={data.data} title={title || messages("post.latestPosts")} />

            {data.data.length === 0 && (
                <div className="py-12 text-center">
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                        {messages("search.noResults")}
                    </p>
                </div>
            )}

            {data.meta.totalPages > 1 && (
                <>
                    {/* Mobile: navigation layout */}
                    <div className="mt-8 flex items-center justify-center md:hidden">
                        <Pagination
                            layout="navigation"
                            currentPage={page}
                            totalPages={data.meta.totalPages}
                            onPageChange={handlePageChange}
                            nextLabel={messages("pagination.next")}
                            previousLabel={messages("pagination.previous")}
                            showIcons
                        />
                    </div>
                    {/* Desktop: pagination layout */}
                    <div className="mt-8 hidden items-center justify-center md:flex">
                        <Pagination
                            layout="pagination"
                            currentPage={page}
                            totalPages={data.meta.totalPages}
                            onPageChange={handlePageChange}
                            nextLabel={messages("pagination.next")}
                            previousLabel={messages("pagination.previous")}
                            showIcons
                            theme={{
                                pages: {
                                    selector: {
                                        active: "bg-primary-600 text-white hover:bg-primary-700! hover:text-white! dark:bg-primary-600 dark:hover:bg-primary-500",
                                    },
                                },
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default ListPost;
