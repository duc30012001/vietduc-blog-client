import { Link } from "@/i18n/navigation";
import { Locale, PublicPost } from "@/lib/types";
import {
    appRoutes,
    calculateReadTime,
    formatPublishDate,
    getLocalizedContent,
    getLocalizedExcerpt,
    getLocalizedName,
} from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Badge } from "../ui/badge";

type Props = {
    data: PublicPost;
};

function FeaturedPost({ data }: Props) {
    const locale = useLocale() as Locale;
    const messages = useTranslations();

    const publishDate = formatPublishDate(data.published_at, locale);
    const content = getLocalizedContent(data, locale);
    const readTime = calculateReadTime(content);

    return (
        <Link href={appRoutes.postDetail(data.slug)} className="group block">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:aspect-21/9 md:rounded-none">
                {/* Background Image */}
                <Image
                    src={data.thumbnail || ""}
                    alt={getLocalizedName(data, locale)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end p-6 md:p-10">
                    {/* Title */}
                    <h2 className="mb-8 max-w-4xl text-2xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
                        {getLocalizedName(data, locale)}
                    </h2>

                    {/* Excerpt */}
                    <p className="mb-8 max-w-4xl text-lg text-white/80">
                        {getLocalizedExcerpt(data, locale)}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Left: Author & Date */}
                        <div className="flex flex-wrap items-center gap-10 text-sm text-white/80">
                            {/* Author */}
                            {/* {data.author && (
                                <div className="flex gap-2 flex-col">
                                    <span className="text-white/60">
                                        {messages("post.writtenBy")}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {data.author.avatar && (
                                            <Image
                                                src={data.author.avatar}
                                                alt={data.author.name}
                                                width={24}
                                                height={24}
                                                className="rounded-full"
                                            />
                                        )}
                                        <span className="font-medium text-white">
                                            {data.author.name}
                                        </span>
                                    </div>
                                </div>
                            )} */}

                            {/* Publish Date */}
                            {publishDate && (
                                <div className="flex flex-col gap-2">
                                    <span className="font-medium text-white">{publishDate}</span>
                                </div>
                            )}
                        </div>

                        {/* Right: Tags & Read Time */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Category */}
                            {data.category && (
                                <Badge variant="glass">
                                    {getLocalizedName(data.category, locale)}
                                </Badge>
                            )}

                            {/* Tags */}
                            {data.tags?.slice(0, 2).map((tag) => (
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
                            {data.view_count && (
                                <Badge variant="glass">
                                    {messages("post.views", { value: data.view_count })}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default FeaturedPost;
