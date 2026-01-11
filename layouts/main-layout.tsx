"use client";

import { LocaleSwitcher } from "@/components/locale-switcher";
import ScrollToTop from "@/components/scroll-to-top";
import SearchInput from "@/components/search-input";
import { Link } from "@/i18n/navigation";
import { appConfig } from "@/lib/configs/app.config";
import { Locale, PublicCategory } from "@/lib/types";
import { appRoutes, getLocalizedName } from "@/lib/utils";
import {
    Dropdown,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { PropsWithChildren } from "react";

type Props = {
    categories: PublicCategory[];
} & PropsWithChildren;

function MainLayout({ children, categories }: Props) {
    const locale = useLocale() as Locale;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Header */}
            <Navbar rounded className="sticky top-0 z-50 rounded-none shadow">
                <NavbarBrand as={Link} href={appRoutes.home}>
                    <Image
                        src={appConfig.app.icon}
                        className="mr-3 h-6 sm:h-9"
                        alt={appConfig.app.title}
                        width={40}
                        height={40}
                    />
                    <h2 className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        {appConfig.app.title}
                    </h2>
                </NavbarBrand>
                <div className="flex items-center gap-2 md:order-2">
                    <SearchInput />
                    {/* <ThemeSwitcher /> */}
                    <LocaleSwitcher />
                    <NavbarToggle />
                </div>
                <NavbarCollapse>
                    {categories.map((category) =>
                        category.children && category.children.length > 0 ? (
                            <Dropdown
                                key={category.id}
                                inline
                                label=""
                                dismissOnClick
                                renderTrigger={() => (
                                    <NavbarLink
                                        as={Link}
                                        href={appRoutes.categoryDetail(category.slug)}
                                        className="flex items-center gap-1 text-base"
                                    >
                                        {getLocalizedName(category, locale)}
                                        <ChevronDown className="h-4 w-4" />
                                    </NavbarLink>
                                )}
                                trigger="hover"
                            >
                                {category.children.map((child) => (
                                    <DropdownItem
                                        key={child.id}
                                        as={Link}
                                        href={appRoutes.categoryDetail(child.slug)}
                                        className="w-46"
                                    >
                                        <span className="block truncate text-base">
                                            {getLocalizedName(child, locale)}
                                        </span>
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        ) : (
                            <NavbarLink
                                key={category.id}
                                as={Link}
                                href={appRoutes.categoryDetail(category.slug)}
                                className="text-base"
                            >
                                {getLocalizedName(category, locale)}
                            </NavbarLink>
                        )
                    )}
                </NavbarCollapse>
            </Navbar>
            <div className="">{children}</div>
            <ScrollToTop />
        </div>
    );
}

export default MainLayout;
