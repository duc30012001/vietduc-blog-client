import TagPostList from "@/components/post/tag-post-list";
import { getPostsByTagSlug, getTagBySlug } from "@/lib/api";
import { Locale } from "@/lib/types";
import { getLocalizedName } from "@/lib/utils";
import { getLocale } from "next-intl/server";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function PostByTagPage(props: Props) {
    const { slug } = await props.params;
    const locale = await getLocale();

    const [tag, posts] = await Promise.all([
        getTagBySlug(slug),
        getPostsByTagSlug(slug, { page: 1, limit: 12 }),
    ]);

    const tagName = getLocalizedName(tag?.data || { name_en: "", name_vi: "" }, locale as Locale);

    return (
        <div className="space-y-10 px-4 pt-14 pb-20">
            <div className="mx-auto max-w-6xl">
                <TagPostList
                    initialData={
                        posts?.data || {
                            data: [],
                            meta: {
                                total: 0,
                                page: 1,
                                limit: 12,
                                totalPages: 1,
                                hasNextPage: false,
                                hasPreviousPage: false,
                            },
                        }
                    }
                    slug={slug}
                    title={tagName}
                />
            </div>
        </div>
    );
}
