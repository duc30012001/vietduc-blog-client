"use client";

import { useRouter } from "@/i18n/navigation";
import { appRoutes } from "@/lib/utils";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function SearchInput() {
    const t = useTranslations("search");
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(appRoutes.search(query.trim()));
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative hidden md:block">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("placeholder")}
                    className="w-48 rounded-full border border-gray-300 bg-gray-50 py-2 pr-10 pl-4 text-sm text-gray-900 transition-all duration-200 placeholder:text-gray-500 focus:w-64 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    aria-label={t("placeholder")}
                >
                    <Search className="h-4 w-4" />
                </button>
            </div>
        </form>
    );
}
