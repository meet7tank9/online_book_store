import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FilterByPrice = () => {

    const navigate = useNavigate()

    const filter = [
        {
            id: 1,
            price: "100-300"
        },
        {
            id: 2,
            price: "400-600"
        },
        {
            id: 3,
            price: "700-1000"
        },
        {
            id: 4,
            price: "1000 above"
        },
        {
            id: 5,
            price: "Reset Filter"
        },
    ]

    const handleFilter = (e) => {
        const value = e.target.value

        if (value) {
            navigate(`/all-books?filterByPrice=${value}`)
        }
    }

    return (
        <>
            <div className='text-zinc-300 bg-zinc-900 w-full h-auto mt-4 px-4'>
                <h4 className='text-yellow-100 font-semibold text-2xl'>Filter Books (Price)</h4>
                <div className='flex md:flex-row flex-wrap justify-around items-center rounded-xl p-4 text-xl gap-3'>
                    {
                        filter.map((item, i) => (

                            <label htmlFor={item.price} className='cursor-pointer w-64 bg-zinc-800 text-sm sm:text-xl py-2 px-12 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 hover:text-black transition-all duration-200' key={i}>
                                <input type="radio" name="price" id={item.price} value={item.price} onClick={handleFilter} />
                                <div htmlFor="">{item.price != "Reset Filter" ? "₹" : ""} {item.price}</div>
                            </label>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default FilterByPrice