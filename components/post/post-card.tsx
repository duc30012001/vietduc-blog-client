import { Link } from "@/i18n/navigation";
import { Locale, PublicPost } from "@/lib/types";
import { getLocalizedExcerpt, getLocalizedName } from "@/lib/utils";
import { appRoutes } from "@/lib/utils/routes";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Badge } from "../ui/badge";

function PostCard({ post }: { post: PublicPost }) {
    const locale = useLocale() as Locale;

    return (
        <Link href={appRoutes.postDetail(post.slug)} className="group block">
            {post.thumbnail && (
                <div className="relative aspect-video overflow-hidden rounded-xl">
                    <Image
                        src={post.thumbnail}
                        alt={getLocalizedName(post, locale)}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {post.category && (
                        <div className="absolute top-3 left-3">
                            <Badge variant="glass">{getLocalizedName(post.category, locale)}</Badge>
                        </div>
                    )}
                </div>
            )}
            <div className="mt-2">
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
    );
}

export default PostCard;
