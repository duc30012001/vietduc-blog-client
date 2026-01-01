export const appRoutes = {
    home: "/",
    about: "/about",
    contact: "/contact",
    post: "/post",
    postDetail: (slug: string) => `/post/${slug}`,
    category: "/category",
    categoryDetail: (slug: string) => `/category/${slug}`,
    tag: "/tag",
    tagDetail: (slug: string) => `/tag/${slug}`,
    search: (query: string) => `/search?q=${encodeURIComponent(query)}`,
};
