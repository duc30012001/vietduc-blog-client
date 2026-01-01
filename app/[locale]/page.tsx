import FeaturedPost from "@/components/post/featured-post";
import LastedPost from "@/components/post/lasted-post";
import { getPosts } from "@/lib/api";

export default async function HomePage() {
    const posts = await getPosts({ page: 1, limit: 24 });

    const featuredPost = posts?.data.data[0];

    return (
        <div className="">
            {featuredPost && <FeaturedPost data={featuredPost} />}

            {posts && (
                <div className="mx-auto max-w-6xl px-4 py-10 pb-20">
                    <LastedPost data={posts.data} />
                </div>
            )}
        </div>
    );
}
