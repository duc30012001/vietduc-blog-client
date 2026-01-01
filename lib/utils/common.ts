import { Locale } from "../types";

/**
 * Format a date for display based on the current locale.
 * Returns null if the date is not provided.
 */
export function formatPublishDate(
    date: Date | string | null | undefined,
    locale: Locale
): string | null {
    if (!date) return null;
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

/**
 * Calculate estimated read time in minutes based on content.
 * Assumes roughly 200 words per minute reading speed.
 */
export function calculateReadTime(content: string | null | undefined): number {
    const wordCount = content?.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(wordCount / 200));
}
