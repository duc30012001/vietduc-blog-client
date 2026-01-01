// Import global styles and fonts
import { appConfig } from "@/lib/configs/app.config";
import { appRoutes } from "@/lib/utils";
import "@/styles/globals.css";
import { Button } from "flowbite-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: appConfig.app.title,
    description: appConfig.app.description,
    icons: {
        icon: appConfig.app.icon,
    },
    keywords: appConfig.app.keywords,
};

export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body>
                <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                    <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">404</h1>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                        Page Not Found
                    </h2>
                    <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
                        The page you are looking for might have been removed, had its name changed,
                        or is temporarily unavailable.
                    </p>
                    <Link href={appRoutes.home}>
                        <Button className="cursor-pointer text-base">Go to Home</Button>
                    </Link>
                </div>
            </body>
        </html>
    );
}
