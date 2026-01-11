"use client";

import { PaginatedResponse, PublicPost } from "@/lib/types";
import { useTranslations } from "next-intl";
import GridPost from "./grid-post";

type Props = {
    data: PaginatedResponse<PublicPost>;
};

function LastedPost({ data }: Props) {
    const messages = useTranslations();
    return (
        <div>
            <GridPost data={data.data} title={messages("post.latestPosts")} />
        </div>
    );
}

export default LastedPost;
