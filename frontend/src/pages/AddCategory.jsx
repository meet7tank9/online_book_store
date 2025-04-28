import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { MdDeleteForever } from "react-icons/md";

const AddCategory = () => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    const navigate = useNavigate()
    const [category, setCategory] = useState([])

    const [data, setData] = useState({
        name: "",
    })

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const getCategory = async () => {

            const responseCategory = await axios.get(`http://localhost:3000/api/v1/category/get-category`)
            setCategory(responseCategory.data.data);

        }

        getCategory()
    }, [])

    const handleSubmitBook = async (e) => {
        e.preventDefault()

        setData(() => ({
            name: ""
        }))

        try {
            if (data.name == ""
            ) {
                alert("Catgory name is required to create new category.")
                return
            }

            const response = await axios.post(`http://localhost:3000/api/v1/category/add-category`, data, { headers })
            alert(response.data.message);

            const responseCategory = await axios.get(`http://localhost:3000/api/v1/category/get-category`)
            setCategory(responseCategory.data.data);

            navigate("/profile/add-category")
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    }

    const handleOnDelete = async (e, index) => {
        const name = category[index].name
        const result = confirm(`Are you sure you want to delete '${name}' category`)
        try {
            if (!result) { return }
            const responseCategory = await axios.delete(`http://localhost:3000/api/v1/category/delete-category`, { headers, data: { name } })

            const responseCat = await axios.get(`http://localhost:3000/api/v1/category/get-category`)
            setCategory(responseCat.data.data);

            alert(responseCategory.data.message)
        } catch (error) {
            alert(error.response.data.message)
        }

    }

    return (
        <>
            <h1 className='text-3xl text-gray-400 mb-6'>Add Category</h1>
            <div className='w-full bg-zinc-800 h-auto p-4 rounded-lg'>
                <form action="" method="POST" onSubmit={handleSubmitBook}>
                    <div className='p-3 w-full'>
                        <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Category</label>
                        <input type="text" name="name" placeholder='Enter category name' value={data.name} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} autoFocus />
                    </div>

                    <div className='p-3'>
                        <input type="submit" value="Add Category" className='outline-none w-min mt-2 bg-yellow-500 rounded-md font-semibold text-black py-2 px-4' />
                    </div>
                </form>
            </div>
            <div className='w-full bg-zinc-800 h-auto p-7 mt-4 rounded-lg'>
                <div className='w-full flex flex-col flex-wrap items-start justify-start gap-4'>
                    {
                        category.map((item, i) => {

                            return <div className='w-full md:w-3/6 px-8 py-2 bg-zinc-900 text-center flex items-center justify-between rounded-lg text-lg border border-zinc-500' key={i}>
                                <div className=''>{item?.name}</div>
                                <button className='flex items-center justify-center gap-1 outline-none w-min mt-2 bg-red-500 rounded-md font-semibold text-black sm:px-4 px-2 py-2' onClick={(e) => handleOnDelete(e, i)}><MdDeleteForever className='' />Delete</button>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default AddCategory