"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "flowbite-react";
import { useLocale } from "next-intl";
import Image from "next/image";

export function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const nextLocale = locale === "vi" ? "en" : "vi";
        router.replace(pathname, { locale: nextLocale });
    };

    const localeName = locale === "vi" ? "VI" : "EN";
    const localeImage = locale === "vi" ? "/lang/vi.png" : "/lang/en.png";

    return (
        <Button
            onClick={toggleLocale}
            color="light"
            size="sm"
            className="flex items-center gap-1"
            pill
        >
            <Image src={localeImage} alt={localeName} width={20} height={20} />
            {localeName}
        </Button>
    );
}
