import FeaturedPost1 from "@/components/post/featured-post-1";
import LastedPost from "@/components/post/lasted-post";
import { getPosts } from "@/lib/api";

export default async function HomePage() {
    const posts = await getPosts({ page: 1, limit: 12 });

    const featuredPost = posts?.data.data[0];

    return (
        <div className="space-y-10 px-4 pt-14 pb-20">
            {featuredPost && <FeaturedPost1 data={posts?.data.data} />}

            {posts && (
                <div className="mx-auto mt-10 max-w-6xl border-t border-gray-300 pt-8 dark:border-gray-700">
                    <LastedPost data={posts.data} />
                </div>
            )}
        </div>
    );
}
