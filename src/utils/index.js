import { compareAsc, parseISO } from "date-fns";

export const cx = (...classNames) => classNames.filter(Boolean).join(' '); // Utility function to combine class names

export const sortBlogs = (blogs) => {
    return blogs
        .slice()
        .sort((a, b) => compareAsc(parseISO(a.publishedAt), parseISO(b.publishedAt)));
}