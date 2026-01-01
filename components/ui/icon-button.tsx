"use client";

import { Tooltip } from "flowbite-react";
import { forwardRef } from "react";

type IconButtonProps = {
    icon: React.ReactNode;
    tooltip?: string;
    tooltipPlacement?: "top" | "right" | "bottom" | "left";
    onClick?: () => void;
    href?: string;
    external?: boolean;
    className?: string;
    variant?: "default" | "primary" | "success" | "danger";
};

const variantClasses = {
    default:
        "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
    primary:
        "bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
    success:
        "bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300",
    danger: "bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300",
};

const tooltipTheme = {
    target: "w-fit",
    content: "whitespace-nowrap",
};

const IconButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(
    (
        {
            icon,
            tooltip,
            tooltipPlacement = "top",
            onClick,
            href,
            external = false,
            className = "",
            variant = "default",
        },
        ref
    ) => {
        const baseClass =
            "p-2 rounded-full inline-flex items-center justify-center cursor-pointer transition-colors";
        const buttonClass = `${baseClass} ${variantClasses[variant]} ${className}`;

        const content = href ? (
            <a
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={buttonClass}
                title={tooltip}
            >
                {icon}
            </a>
        ) : (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                type="button"
                onClick={onClick}
                className={buttonClass}
                title={tooltip}
            >
                {icon}
            </button>
        );

        if (tooltip) {
            return (
                <Tooltip content={tooltip} placement={tooltipPlacement} theme={tooltipTheme}>
                    {content}
                </Tooltip>
            );
        }

        return content;
    }
);

IconButton.displayName = "IconButton";

export { IconButton };
export type { IconButtonProps };
