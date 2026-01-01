"use client";

import { Button, Dropdown, DropdownItem } from "flowbite-react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useSyncExternalStore } from "react";

// Subscribe function for useSyncExternalStore (no-op since we never update)
const emptySubscribe = () => () => {};

function useIsMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true, // Client: always mounted
        () => false // Server: not mounted
    );
}

type ThemeMode = "light" | "dark" | "auto";

// Use the same key as flowbite-react's ThemeModeScript to prevent flicker
const THEME_KEY = "flowbite-theme-mode";

function getSystemTheme(): "light" | "dark" {
    if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
}

function applyTheme(mode: ThemeMode) {
    const theme = mode === "auto" ? getSystemTheme() : mode;
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

function getInitialMode(): ThemeMode {
    if (typeof window === "undefined") return "auto";
    const savedMode = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    return savedMode || "auto";
}

export function ThemeSwitcher() {
    const t = useTranslations("theme");
    const [mode, setMode] = useState<ThemeMode>(getInitialMode);
    const mounted = useIsMounted();

    // Listen for system theme changes when in auto mode
    useEffect(() => {
        if (mode !== "auto") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => applyTheme("auto");
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [mode]);

    const handleModeChange = (newMode: ThemeMode) => {
        setMode(newMode);
        localStorage.setItem(THEME_KEY, newMode);
        applyTheme(newMode);
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <Button color="light" size="sm" pill disabled>
                <Monitor className="h-4 w-4" />
            </Button>
        );
    }

    const currentIcon =
        mode === "light" ? (
            <Sun className="h-4 w-4" />
        ) : mode === "dark" ? (
            <Moon className="h-4 w-4" />
        ) : (
            <Monitor className="h-4 w-4" />
        );

    return (
        <Dropdown
            label=""
            dismissOnClick
            renderTrigger={() => (
                <Button color="light" size="sm" pill className="cursor-pointer">
                    {currentIcon}
                </Button>
            )}
        >
            <DropdownItem onClick={() => handleModeChange("light")}>
                <Sun className="mr-2 h-4 w-4" />
                {t("light")}
            </DropdownItem>
            <DropdownItem onClick={() => handleModeChange("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                {t("dark")}
            </DropdownItem>
            <DropdownItem onClick={() => handleModeChange("auto")}>
                <Monitor className="mr-2 h-4 w-4" />
                {t("auto")}
            </DropdownItem>
        </Dropdown>
    );
}
