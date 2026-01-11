"use client";

import { appRoutes } from "@/lib/utils";
import { Button, TextInput } from "flowbite-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

type Props = {
    defaultValue?: string;
};

export default function SearchPageInput({ defaultValue = "" }: Props) {
    const messages = useTranslations();
    const router = useRouter();
    const [inputValue, setInputValue] = useState(defaultValue);
    const [, setKeyword] = useQueryState("keyword", parseAsString.withDefault(""));

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            // Update the URL and trigger server-side refetch
            setKeyword(trimmedValue);
        } else {
            // If empty, navigate to search page without keyword
            router.push(appRoutes.search("").replace("?keyword=", ""));
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-8">
            <div className="flex items-center gap-2">
                <TextInput
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={messages("search.placeholder")}
                    className="flex-1"
                    style={{
                        fontSize: "1rem",
                    }}
                />
                <Button
                    type="submit"
                    aria-label={messages("search.placeholder")}
                    className="cursor-pointer text-base"
                >
                    {messages("search.label")}
                </Button>
            </div>
        </form>
    );
}
