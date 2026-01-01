export const appConfig = {
    app: {
        title: process.env.NEXT_PUBLIC_APP_TITLE || "Duck BLog",
        description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Duck BLog",
        keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS || "Duck BLog",
        icon: process.env.NEXT_PUBLIC_APP_ICON || "/logo.png",
        background: process.env.NEXT_PUBLIC_APP_BACKGROUND || "/background.png",
        url: process.env.NEXT_PUBLIC_APP_URL || "https://vietduc.blog",
    },
};
