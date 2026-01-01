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

/**
 * Format a number for display based on the current locale.
 * Supports compact notation for large numbers (e.g., 1.2K, 1.5M).
 */
export function formatNumber(
    value: number | null | undefined,
    locale: Locale,
    options?: {
        compact?: boolean;
        decimals?: number;
    }
): string {
    if (value == null) return "0";

    const localeStr = locale === "vi" ? "vi-VN" : "en-US";

    if (options?.compact) {
        return new Intl.NumberFormat(localeStr, {
            notation: "compact",
            maximumFractionDigits: options?.decimals ?? 1,
        }).format(value);
    }

    return new Intl.NumberFormat(localeStr, {
        maximumFractionDigits: options?.decimals ?? 0,
    }).format(value);
}
