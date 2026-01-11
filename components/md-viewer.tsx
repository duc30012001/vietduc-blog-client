"use client";

import "@/styles/md-viewer.css";
import MarkdownPreview, {
    MarkdownPreviewProps,
    MarkdownPreviewRef,
} from "@uiw/react-markdown-preview";
import { useEffect, useState } from "react";

type Props = MarkdownPreviewProps & React.RefAttributes<MarkdownPreviewRef>;

function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof document === "undefined") return false;
        return document.documentElement.classList.contains("dark");
    });

    useEffect(() => {
        // Observe changes to the dark class
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    setIsDark(document.documentElement.classList.contains("dark"));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    return isDark ? "dark" : "light";
}

function MdViewer(props: Props) {
    const colorMode = useTheme();

    return (
        <div className="md-viewer" data-color-mode={colorMode}>
            <MarkdownPreview
                {...props}
                className="bg-transparent!"
                rehypeRewrite={(node, index, parent) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                        parent.children = parent.children.slice(1);
                    }
                }}
            />
        </div>
    );
}

export default MdViewer;
