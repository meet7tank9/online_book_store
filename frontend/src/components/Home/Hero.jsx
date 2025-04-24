import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='h-screen flex flex-col justify-start items-center gap-9 sm:h-[75vh] md:flex-row '>
            <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
                <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>
                    Discover Your Next Great Read
                </h1>
                <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
                    Uncover captivating stories, enriching knowledge and endless inspiration in our curated collection of books
                </p>
                <div className='mt-8'>
                    <Link to="/all-books" className='text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-8 py-3 md:px-10 md:py-3 hover:bg-zinc-800 rounded-full '>
                        Discover Books
                    </Link>
                </div>
            </div>
            <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
                <img src="./hero4.png" alt="hero" className='rounded-lg' />
            </div>
        </div>
    )
}

export default Hero