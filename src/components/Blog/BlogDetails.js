import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import RenderMdx from './RenderMdx';

const BlogDetails = ({ blog, slug }) => {
    return (
        <article>

            <div className='px-10 bg-accent text-light py-2 flex items-center justify-around flex-wrap text-xl font-medium
    mx-10 rounded-lg'>
                <time className='m-3'>
                    {format(parseISO(blog.publishedAt), "LLLL, d, yyyy")}
                </time>
                <span className='m-3'>10 views</span>
                <div className='m-3'>
                    {blog.readingTime.text}
                </div>
                <Link href={`categories/${blog.tags[0]}`} className='m-3'>
                    #{blog.tags[0]}
                </Link>
            </div>

            <div className='grid grid-cols-12 gap-16 mt-8 px-10'>
                <div className='col-span-4'>
                    <details className='border-[1px] border-solid border-dark text-darkr rounded-lg p-4 sticky top-6
                    max-h-[80vh] overflow-hidden overflow-y-auto'
                        open >
                        <summary className='text-lg font-semibold capitalize cursor-pointer' >Table of Contents</summary>
                        <ul className='mt-4 font-in text-base'>
                            {blog.toc.map((heading) => {
                                return <li key={`${heading.slug}`} className='py-1'>
                                    <a href={`#${heading.slug}`}
                                        data-level={heading.level}
                                        className="data-[level=two]:pl-0 data-[level=two]:pt-2
                                                    data-[level=two]:border-t border-solid border-dark/40
                                                    data-[level=three]:pl-6
                                                    flex items-center justify-start"> 
                                        {heading.level === 'three' ? <span className='flex w-1 h-1 rounded-full bg-dark mr-2'>&nbsp;</span> : null}
                                        <span className='hover:underline'>{heading.text}</span>
                                    </a>
                                </li>
                            })
                            }
                        </ul>
                    </details>
                </div>
                <RenderMdx blog={blog} />
            </div>
        </article>

    )
}

export default BlogDetails