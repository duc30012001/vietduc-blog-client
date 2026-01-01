import { PropsWithChildren } from "react";

type BadgeVariant = "glass" | "default";

type BadgeProps = {
    variant?: BadgeVariant;
    className?: string;
} & PropsWithChildren;

const variantStyles: Record<BadgeVariant, string> = {
    glass: "border border-white/30 text-white bg-white/20 backdrop-blur-sm",
    default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
};

function Badge({ children, variant = "default", className = "" }: BadgeProps) {
    return (
        <span className={`rounded-xl px-3 py-1 text-sm ${variantStyles[variant]} ${className}`}>
            {children}
        </span>
    );
}

Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps };
