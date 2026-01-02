import { Link } from "@/i18n/navigation";
import { Locale, PublicPost } from "@/lib/types";
import {
    appRoutes,
    calculateReadTime,
    formatNumber,
    formatPublishDate,
    getLocalizedContent,
    getLocalizedExcerpt,
    getLocalizedName,
} from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "../ui/badge";

type Props = {
    data: PublicPost[];
};

function FeaturedPost1({ data }: Props) {
    const locale = useLocale() as Locale;
    const messages = useTranslations();

    const [firstPost, ...otherPosts] = data;

    const publishDate = formatPublishDate(firstPost.published_at, locale);
    const content = getLocalizedContent(firstPost, locale);
    const readTime = calculateReadTime(content);

    return (
        <div className="mx-auto max-w-6xl py-5">
            <div className="mx-auto mb-10 max-w-2xl text-center">
                <h2 className="text-3xl font-bold">{messages("post.featuredBlogTitle")}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {messages("post.featuredBlogDescription")}
                </p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* First post */}
                <Link
                    href={appRoutes.postDetail(firstPost.slug)}
                    className="group col-span-12 block md:col-span-6 lg:col-span-7"
                >
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:aspect-3/2">
                        {/* Background Image */}
                        <Image
                            src={firstPost.thumbnail || ""}
                            alt={getLocalizedName(firstPost, locale)}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end p-6">
                            {/* Title */}
                            <h2 className="mb-4 max-w-4xl text-xl leading-tight font-bold text-white md:text-2xl lg:text-3xl">
                                {getLocalizedName(firstPost, locale)}
                            </h2>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                {/* Left: Author & Date */}
                                <div className="flex flex-wrap items-center gap-10 text-sm text-white/80">
                                    {/* Publish Date */}
                                    {publishDate && (
                                        <div className="flex flex-col gap-2">
                                            <span className="font-medium text-white">
                                                {publishDate}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Tags & Read Time */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {/* Category */}
                                    {firstPost.category && (
                                        <Badge variant="glass">
                                            {getLocalizedName(firstPost.category, locale)}
                                        </Badge>
                                    )}

                                    {/* Tags */}
                                    {firstPost.tags?.slice(0, 2).map((tag) => (
                                        <Badge key={tag.id} variant="glass">
                                            {getLocalizedName(tag, locale)}
                                        </Badge>
                                    ))}

                                    {/* Read Time */}
                                    {readTime && (
                                        <Badge variant="glass">
                                            {messages("post.minRead", { value: readTime })}
                                        </Badge>
                                    )}

                                    {/* View */}
                                    {firstPost.view_count && (
                                        <Badge variant="glass">
                                            {messages("post.views", {
                                                value: formatNumber(firstPost.view_count, locale),
                                            })}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Excerpt */}
                            <p className="mt-6 max-w-4xl text-white/80">
                                {getLocalizedExcerpt(firstPost, locale)}
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Other posts */}
                <div className="col-span-12 space-y-5 md:col-span-6 lg:col-span-5">
                    {otherPosts.slice(0, 3).map((post) => (
                        <Link
                            key={post.id}
                            href={appRoutes.postDetail(post.slug)}
                            className="group grid grid-cols-2 gap-4"
                        >
                            {post.thumbnail && (
                                <div className="relative aspect-video overflow-hidden rounded-2xl">
                                    <Image
                                        src={post.thumbnail}
                                        alt={getLocalizedName(post, locale)}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />

                                    {post.category && (
                                        <div className="absolute top-3 left-3">
                                            <Badge variant="glass">
                                                {getLocalizedName(post.category, locale)}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className="">
                                <h3 className="line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                    {getLocalizedName(post, locale)}
                                </h3>
                                {getLocalizedExcerpt(post, locale) && (
                                    <p className="line-clamp-3 text-gray-600 dark:text-gray-400">
                                        {getLocalizedExcerpt(post, locale)}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FeaturedPost1;
