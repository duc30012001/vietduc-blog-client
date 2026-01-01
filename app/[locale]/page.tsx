import FeaturedPost from "@/components/post/featured-post";
import { getPosts } from "@/lib/api";

export default async function HomePage() {
    const posts = await getPosts({ page: 1, limit: 10 });

    const featuredPost = posts?.data.data[0];

    return <div>{featuredPost && <FeaturedPost data={featuredPost} />}</div>;
}
