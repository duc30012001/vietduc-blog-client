import SearchPostList from "@/components/post/search-post-list";
import SearchPageInput from "@/components/search-page-input";
import { getPosts } from "@/lib/api";

type Props = {
    searchParams: Promise<{ keyword?: string }>;
};

export default async function SearchPage(props: Props) {
    const { keyword } = await props.searchParams;
    const posts = await getPosts({ page: 1, limit: 12, keyword });

    return (
        <div className="space-y-10 px-4 pt-14 pb-20">
            <div className="mx-auto max-w-6xl">
                <SearchPageInput defaultValue={keyword} />
                {posts && <SearchPostList initialData={posts.data} keyword={keyword} />}
            </div>
        </div>
    );
}
