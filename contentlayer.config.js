import { makeSource, defineDocumentType } from '@contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import GithubSlugger from 'github-slugger';


const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: '**/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true
        },
        publishedAt: {
            type: 'date',
            required: true
        },
        updatedAt: {
            type: 'date',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        image: {
            type: 'image',
            required: true
        },
        // Used for filtering published blogs or soft deleting
        isPublished: {
            type: 'boolean',
            required: true
        },
        author: {
            type: 'string',
            required: true
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
            required: true
        }
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (blog) => `/blogs/${blog._raw.flattenedPath}`
        },
        // TODO: compute LIX score for each article as misc
        // TODO: think about other Misc indicators to compute
        readingTime: {
            type: 'json',
            resolve: (blog) => readingTime(blog.body.raw)
        },
        toc: {
            type: 'json',
            resolve: async (post) => {
                const headingRegExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
                const slugger = new GithubSlugger();

                const headings = Array.from(post.body.raw.matchAll(headingRegExp)).map(({ groups }) => {
                    const flag = groups?.flag;
                    const content = groups?.content;

                    return {
                        level: flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
                        text: content,
                        slug: content ? slugger.slug(content) : undefined
                    }

                })

                return headings;
            }
        }
    }
}))

const codeOptions = {
    theme: 'github-dark'
}

export default makeSource({
    /* options */
    contentDirPath: 'content',
    documentTypes: [Blog],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "append" }],
            [rehypePrettyCode, codeOptions]
        ]
    }

    //  disableImportAliasWarning: true, // NOTE: might want to remove this in production
})