import MdViewer from "@/components/md-viewer";
import GridPost from "@/components/post/grid-post";
import { ShareButtons } from "@/components/share-buttons";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/api";
import { appConfig } from "@/lib/configs/app.config";
import { Locale } from "@/lib/types";
import {
    appRoutes,
    calculateReadTime,
    formatPublishDate,
    getLocalizedContent,
    getLocalizedExcerpt,
    getLocalizedName,
} from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function PostDetailPage({ params }: Props) {
    const { slug } = await params;
    const locale = (await getLocale()) as Locale;
    const messages = await getTranslations();

    const [postRes, relatedPostsRes] = await Promise.all([
        getPostBySlug(slug),
        getRelatedPosts(slug),
    ]);

    const post = postRes?.data;
    if (!post) {
        notFound();
    }

    const relatedPosts = relatedPostsRes?.data || [];

    const publishDate = formatPublishDate(post.published_at, locale);
    const content = getLocalizedContent(post, locale);
    const readTime = calculateReadTime(content);

    return (
        <article className="container mx-auto px-4 py-10 pb-20">
            {/* Post Header */}
            <header className="mx-auto mb-8 max-w-5xl text-center">
                {/* Meta Info */}
                <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    {post.category && (
                        <Link
                            className="hover:underline"
                            href={appRoutes.categoryDetail(post.category.slug)}
                        >
                            <Badge>{getLocalizedName(post.category, locale)}</Badge>
                        </Link>
                    )}

                    {publishDate && (
                        <>
                            <span>•</span>
                            <span>{publishDate}</span>
                        </>
                    )}

                    <span>•</span>
                    <span>{messages("post.minRead", { value: readTime })}</span>

                    {post.view_count > 0 && (
                        <>
                            <span>•</span>
                            <span>{messages("post.views", { value: post.view_count })}</span>
                        </>
                    )}
                </div>

                {/* Title */}
                <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    {getLocalizedName(post, locale)}
                </h1>

                {/* Excerpt */}
                {getLocalizedExcerpt(post, locale) && (
                    <p className="leading-relaxed text-gray-600 italic dark:text-gray-300">
                        {getLocalizedExcerpt(post, locale)}
                    </p>
                )}
            </header>

            {/* Hero Section */}
            {post.thumbnail && (
                <div className="relative container mx-auto mb-8 aspect-video w-full overflow-hidden rounded-2xl md:aspect-21/9">
                    <Image
                        src={post.thumbnail}
                        alt={getLocalizedName(post, locale)}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="mx-auto grid max-w-6xl grid-cols-12 gap-10">
                {/* Actions */}
                <div className="col-span-1 hidden lg:block">
                    <div className="sticky top-20">
                        <ShareButtons
                            url={`${appConfig.app.url}${appRoutes.postDetail(post.slug)}`}
                            title={getLocalizedName(post, locale)}
                        />
                    </div>
                </div>

                {/* Post Content */}
                <div className="col-span-12 lg:col-span-8">
                    <MdViewer source={content} />
                </div>

                <div className="col-span-12 lg:col-span-3">
                    <div className="sticky top-20">
                        {post.tags.length > 0 && (
                            <div>
                                {/* Tags */}
                                <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                                    {messages("tag.name")}
                                </h2>
                                <div className="flex flex-wrap items-center gap-2">
                                    {post.tags?.map((tag) => (
                                        <Link
                                            className="hover:underline"
                                            key={tag.id}
                                            href={appRoutes.tagDetail(tag.slug)}
                                        >
                                            <Badge>{getLocalizedName(tag, locale)}</Badge>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="mx-auto mt-16 max-w-6xl border-t border-gray-300 pt-8 dark:border-gray-700">
                    <GridPost data={relatedPosts} title={messages("post.relatedPosts")} />
                </div>
            )}
        </article>
    );
}
