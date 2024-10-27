import { makeSource, defineDocumentType } from '@contentlayer/source-files'

const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: '**/**/*.mdx',
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
            type: 'string',
            required: true
        },
        // Used for filtering published blogs or soft deleting
        isPublished: {
            type: 'boolean',
            required: true
        },
        authors: {
            type: 'list',
            of: { type: 'string' },
            required: true
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
            required: true
        }
    },
    computedFields: {
        url : {
            type: 'string',
            resolve: (blog) => `/blogs/${blog._raw.flattenedPath}`
        },
        // TODO: compute LIX score for each article as misc
        // TODO: think about other Misc indicators to compute
    }
}))

export default makeSource({
    /* options */
    contentDirPath: 'content',
    documentTypes: [Blog],
})