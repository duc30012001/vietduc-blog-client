"use client";

import { IconButton } from "@/components/ui/icon-button";
import { Copy, Printer, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type ShareButtonsProps = {
    url: string;
    title: string;
    vertical?: boolean;
};

function ShareButtons({ url, title, vertical = true }: ShareButtonsProps) {
    const t = useTranslations("share");
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        zalo: `https://zalo.me/share?u=${encodedUrl}&title=${encodedTitle}`,
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const containerClass = vertical
        ? "flex flex-col items-center gap-3"
        : "flex flex-wrap items-center gap-3";

    const tooltipPlacement = vertical ? "right" : "top";

    return (
        <div className={containerClass}>
            {/* Facebook */}
            <IconButton
                href={shareLinks.facebook}
                external
                tooltip={t("facebook")}
                tooltipPlacement={tooltipPlacement}
                icon={
                    <svg
                        className="h-5 w-5"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                    >
                        <title>Facebook</title>
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                    </svg>
                }
            />

            {/* Twitter */}
            <IconButton
                href={shareLinks.twitter}
                external
                tooltip={t("twitter")}
                tooltipPlacement={tooltipPlacement}
                icon={
                    <svg
                        className="h-5 w-5"
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                    >
                        <title>X</title>
                        <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
                    </svg>
                }
            />

            {/* LinkedIn */}
            <IconButton
                href={shareLinks.linkedin}
                external
                tooltip={t("linkedin")}
                tooltipPlacement={tooltipPlacement}
                icon={
                    <svg
                        className="h-5 w-5"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 93.06 93.06"
                        xmlSpace="preserve"
                        fill="currentColor"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <g>
                                    <path d="M11.185,0.08C5.004,0.08,0.001,5.092,0,11.259c0,6.173,5.003,11.184,11.186,11.184c6.166,0,11.176-5.011,11.176-11.184 C22.362,5.091,17.351,0.08,11.185,0.08z"></path>
                                    <rect
                                        x="1.538"
                                        y="30.926"
                                        width="19.287"
                                        height="62.054"
                                    ></rect>
                                    <path d="M69.925,29.383c-9.382,0-15.673,5.144-18.248,10.022h-0.258v-8.479H32.921H32.92v62.053h19.27V62.281 c0-8.093,1.541-15.932,11.575-15.932c9.89,0,10.022,9.256,10.022,16.451v30.178H93.06V58.942 C93.06,42.235,89.455,29.383,69.925,29.383z"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                }
            />

            {/* Zalo */}
            <IconButton
                href={shareLinks.zalo}
                external
                tooltip={t("zalo")}
                tooltipPlacement={tooltipPlacement}
                icon={<Share2 className="h-5 w-5" />}
            />

            {/* Copy Link */}
            <IconButton
                onClick={handleCopyLink}
                tooltip={copied ? t("copied") : t("copyLink")}
                tooltipPlacement={tooltipPlacement}
                variant={copied ? "success" : "default"}
                icon={<Copy className="h-5 w-5" />}
            />

            {/* Print */}
            <IconButton
                onClick={handlePrint}
                tooltip={t("print")}
                tooltipPlacement={tooltipPlacement}
                icon={<Printer className="h-5 w-5" />}
            />
        </div>
    );
}

export { ShareButtons };
