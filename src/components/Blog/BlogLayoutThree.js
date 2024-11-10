import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'


const BlogLayoutThree = ({ blog }) => {
    return (
        <div className='group flex flex-col items-center text-dark'>
            <Link href={blog.url} className='h-full rounded-xl overflow-hidden'>
            <Image
                src={blog.image.filePath.replace("../public", "")}
                alt={blog.title}
                placeholder="blur"
                blurDataURL={blog.image.blurhashDataUrl}
                width={blog.image.width}
                height={blog.image.height}
                className="aspect-[4/3] w-full h-full object-center object-cover 
                group-hover:scale-105 transition-all ease duration-300"
            />
            </Link>
            <div className='flex flex-col w-full mt-4'>
                <span className='uppercase text-accent font-semibold text-sm'>{blog.tags[0]}</span>
                <Link href={blog.url} className='inline-block my-1'>
                    <h2 className='text-lg font-semibold capitalize'>
                        <span className='bg-gradient-to-r
                                             from-accent/50 to-accent/50 bg-[length:0px_6px]
                                             group-hover:bg-[length:100%_6px] bg-left-bottom 
                                             bg-no-repeat transition-[background-size] duration-500'>
                            {blog.title}
                        </span>

                    </h2>
                </Link>

                <span className='capitalize text-dark/50 font-semibold text-base'>
                    {format(new Date(blog.publishedAt), 'MMMM dd, yyyy')}
                </span>
            </div>
        </div>
    )
}

export default BlogLayoutThree