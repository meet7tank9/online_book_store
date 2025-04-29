import React, { useEffect, useState } from 'react'
import categoryImage4 from "../assets/category_img_4.jpg"
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import { Link } from 'react-router-dom'

const AllCategory = () => {
    const [category, setCategory] = useState()
    const [data, setData] = useState()
    useEffect(() => {
        const getCategory = async () => {

            const responseCategory = await axios.get(`http://localhost:3000/api/v1/category/get-category`)
            setCategory(responseCategory.data.data);

            const response = await axios.get(`http://localhost:3000/api/v1/book/get-books`)
            console.log(response.data.data);
            setData(response.data.data);

            
        }

        getCategory()
    }, [])

    return (
        <div className='bg-zinc-900 min-h-screen px-12 py-8'>
            <h4 className='text-yellow-100 font-semibold text-3xl'>All Category</h4>
            <div className='bg-zinc-900 w-full my-8 p-4 flex flex-col sm:flex-row gap-12 flex-wrap'>
                {
                    !category && <div className='flex items-center justify-center my-8 w-full'>
                        <Loader />
                    </div>
                }
                {
                    category && category.map((item, i) => (
                        <Link to={`/all-books?filterByCategory=${item?.name}`} >
                            <div className='bg-zinc-800 w-auto md:min-w-2/6 p-6 h-[14vh] rounded-xl text-zinc-300 flex items-center justify-center cursor-pointer shadow-md shadow-zinc-700 hover:shadow-md hover:shadow-yellow-100 hover:scale-105 transition-all duration-300 hover:text-yellow-100' key={i}>
                                <div className='flex items-center justify-center gap-5'>
                                    <img src={categoryImage4} alt="" width={50} className='rounded-2xl' />
                                    <div className='font-semibold text-2xl tracking-wide'>{item?.name}</div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default AllCategory