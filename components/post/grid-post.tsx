"use client";

import { PublicPost } from "@/lib/types";
import { ReactNode } from "react";
import PostCard from "./post-card";

type Props = {
    data: PublicPost[];
    title: ReactNode;
    extra?: ReactNode;
};

function GridPost({ data, title, extra }: Props) {
    return (
        <section className="">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <div>{extra}</div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.map((relatedPost) => (
                    <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
            </div>
        </section>
    );
}

export default GridPost;
