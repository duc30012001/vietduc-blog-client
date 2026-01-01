import { ToastProvider } from "@/components/toast-provider";
import { routing } from "@/i18n/routing";
import MainLayout from "@/layouts/main-layout";
import { getCategories } from "@/lib/api";
import { appConfig } from "@/lib/configs/app.config";
import "@/styles/globals.css";
import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: appConfig.app.title,
    description: appConfig.app.description,
    icons: {
        icon: appConfig.app.icon,
    },
    keywords: appConfig.app.keywords,
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    const categories = await getCategories();
    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <ThemeModeScript />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700;800;900&display=swap"
                />
            </head>
            <body
                className={`${jetbrainsMono.variable} antialiased`}
                style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
                <ToastProvider />
                <NextIntlClientProvider>
                    <NextTopLoader />
                    <MainLayout categories={categories?.data || []}>{children}</MainLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
