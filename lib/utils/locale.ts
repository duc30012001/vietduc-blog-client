import { Locale } from "../types";

type LocalizedByName = { name_en: string; name_vi: string };
type LocalizedByTitle = { title_en: string; title_vi: string };
type LocalizedItem = LocalizedByName | LocalizedByTitle;

/**
 * Get the localized text based on the current locale.
 * Works with objects that have name_en/name_vi or title_en/title_vi fields.
 */
export function getLocalizedName<T extends LocalizedItem>(item: T, locale: Locale): string {
    if ("name_en" in item) {
        return locale === "en" ? item.name_en : item.name_vi;
    }
    return locale === "en" ? item.title_en : item.title_vi;
}

/**
 * Get the localized excerpt based on the current locale.
 */
export function getLocalizedExcerpt(
    item: { excerpt_en: string | null; excerpt_vi: string | null },
    locale: Locale
): string | null {
    return locale === "en" ? item.excerpt_en : item.excerpt_vi;
}

/**
 * Get the localized content based on the current locale.
 */
export function getLocalizedContent(
    item: { content_en: string; content_vi: string },
    locale: Locale
): string {
    return locale === "en" ? item.content_en : item.content_vi;
}
