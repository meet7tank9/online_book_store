import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const FilterByCategory = () => {

    const navigate = useNavigate()
    const [category, setCategory] = useState([])

    useEffect(() => {
        const getCategory = async () => {

            const responseCategory = await axios.get(`http://localhost:3000/api/v1/category/get-category`)
            setCategory(responseCategory.data.data);

        }

        getCategory()
    }, [])

    const handleFilter = (e) => {
        const value = e.target.value
        
        if (value) {
            navigate(`/all-books?filterByCategory=${value}`)
        }
    }

    return (
        <>
            <div className='text-zinc-300 bg-zinc-900 w-full h-auto mt-4 px-4'>
                <h4 className='text-yellow-100 font-semibold text-2xl'>Filter Books (Category)</h4>
                <div className='flex md:flex-row flex-wrap justify-around items-center rounded-xl p-4 text-xl gap-3'>
                    {
                        category.map((item, i) => (

                            <label htmlFor={item?.name} className='cursor-pointer w-64 bg-zinc-800 text-sm sm:text-xl py-2 px-12 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 hover:text-black transition-all duration-200' key={i}>
                                <input type="radio" name="price" id={item?.name} value={item?.name} onClick={handleFilter} />
                                <div>{item?.name}</div>
                            </label>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default FilterByCategory