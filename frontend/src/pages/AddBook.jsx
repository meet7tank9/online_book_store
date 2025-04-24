import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddBook = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const navigate = useNavigate()

  const [data, setData] = useState({
    title: "",
    author: "",
    url: "",
    price: "",
    language: "",
    description: ""
  })

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmitBook = async (e) => {
    e.preventDefault()
    try {
      if (data.title == "" ||
        data.author == "" ||
        data.url == "" ||
        data.price == "" ||
        data.language == "" ||
        data.description == ""
      ) {
        alert("All fields are required.")
        return
      }

      const response = await axios.post(`http://localhost:3000/api/v1/book/add-book`, data, { headers })
      alert(response.data.message);
      navigate("/profile/add-book")
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <h1 className='text-3xl text-gray-400 mb-6'>Add Book</h1>
      <div className='w-full bg-zinc-800 h-auto p-4'>
        <form action="" method="POST" onSubmit={handleSubmitBook}>
          <div className='p-3'>
            <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Title</label>
            <input type="text" name="title" placeholder='Enter book title' value={data.title} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
          </div>
          <div className='p-3'>
            <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Author</label>
            <input type="text" name="author" placeholder='Enter book author' value={data.author} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
          </div>
          <div className='p-3'>
            <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Image url</label>
            <input type="text" name="url" placeholder='Enter image url' value={data.url} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
          </div>
          <div className='flex w-full'>
            <div className='p-3 w-1/2'>
              <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Langauge</label>
              <input type="text" name="language" placeholder='Enter book language' value={data.language} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
            </div>
            <div className='p-3 w-1/2'>
              <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Price</label>
              <input type="text" name="price" placeholder='Enter book price' value={data.price} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
            </div>
          </div>
          <div className='p-3'>
            <label htmlFor="" className='text-zinc-400 text-lg ps-1'>Description</label>
            <textarea name="description" rows={7} placeholder='Enter book description' value={data.description} id="" className='outline-none w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded border border-gray-500' onChange={handleOnChange} />
          </div>
          <div className='p-3'>
            <input type="submit" value="Add Book" className='outline-none w-[20%] mt-2 bg-yellow-500 rounded-md font-semibold text-black p-2' />
          </div>
        </form>
      </div>
    </>
  )
}

export default AddBook