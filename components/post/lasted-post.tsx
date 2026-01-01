"use client";

import { Link } from "@/i18n/navigation";
import { PaginatedResponse, PublicPost } from "@/lib/types";
import { appRoutes } from "@/lib/utils";
import { useTranslations } from "next-intl";
import GridPost from "./grid-post";

type Props = {
    data: PaginatedResponse<PublicPost>;
};

function LastedPost({ data }: Props) {
    const messages = useTranslations();
    return (
        <div>
            <GridPost
                data={data.data}
                title={messages("post.latestPosts")}
                extra={
                    <Link href={appRoutes.post} className="hover:text-blue-500 hover:underline">
                        {messages("post.viewMore")}
                    </Link>
                }
            />
        </div>
    );
}

export default LastedPost;
